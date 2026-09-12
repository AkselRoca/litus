import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { sendContactEmails, type ContactTechnicalInfo } from '@/lib/email'
import { contactSubmissionSchema as contactFormSchema } from '@/lib/validations/contact'
import { contactConfiguration } from '@/lib/contact/config'
import { checkRate, claimSubmission, clientAddress, digest, finishSubmission, submissionKey } from '@/lib/contact/store'

export const runtime = 'nodejs'
export const maxDuration = 30
const MAX_BYTES = 24 * 1024
const schema = contactFormSchema.extend({
  website_check: z.string().max(500).optional(),
  page_url: z.string().url().max(2048).optional().or(z.literal('')),
  referrer: z.string().url().max(2048).optional().or(z.literal('')),
}).strict()
const json = (body: object, status: number, headers: Record<string, string> = {}) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } })
const unavailable = () => json({ success: false, error: 'L’envoi est temporairement indisponible. Vos informations sont conservées. Contactez-nous au 07 44 98 55 21 ou à litusagency@gmail.com.' }, 503)

function headerValue(headers: Headers, name: string) {
  const value = headers.get(name)?.trim()
  if (!value || /[\r\n\x00-\x1f\x7f]/.test(value)) return ''
  return value.slice(0, 500)
}

function decodedHeader(headers: Headers, name: string) {
  const value = headerValue(headers, name)
  if (!value) return ''
  try { return decodeURIComponent(value).slice(0, 500) } catch { return value }
}

function userAgentDetails(userAgent: string) {
  const browsers: [RegExp, string][] = [
    [/Edg\/([\d.]+)/, 'Microsoft Edge'],
    [/Chrome\/([\d.]+)/, 'Chrome'],
    [/Firefox\/([\d.]+)/, 'Firefox'],
    [/Version\/([\d.]+).*Safari\//, 'Safari'],
  ]
  const browser = browsers.find(([pattern]) => pattern.test(userAgent))
  const device = /Mobile|Android|iPhone|iPad/i.test(userAgent) ? 'Mobile / tablette possible' : userAgent ? 'Ordinateur probable' : 'Non déductible'
  return {
    browser: browser ? `${browser[1]} ${userAgent.match(browser[0])?.[1] || ''}`.trim() : 'Non déductible',
    device,
  }
}

function technicalInfo(request: NextRequest, ipAddress: string, raw: Record<string, unknown>, rateStatus: string, submissionStatus: string): ContactTechnicalInfo {
  const userAgent = headerValue(request.headers, 'user-agent') || 'Non transmis'
  const details = userAgentDetails(userAgent)
  const country = headerValue(request.headers, 'x-vercel-ip-country')
  const city = decodedHeader(request.headers, 'x-vercel-ip-city')
  const pageUrl = typeof raw.page_url === 'string' && raw.page_url ? raw.page_url : 'Non transmis'
  const browserReferrer = typeof raw.referrer === 'string' && raw.referrer ? raw.referrer : ''
  const headerReferrer = headerValue(request.headers, 'referer')
  return {
    ipAddress,
    submittedAt: new Date().toISOString(),
    userAgent,
    browser: details.browser,
    device: details.device,
    pageUrl,
    requestUrl: request.url,
    location: country || city ? [city, country].filter(Boolean).join(', ') : 'Non déductible',
    referrer: browserReferrer || headerReferrer || 'Non transmis',
    honeypot: 'Champ présent et vide',
    protections: [rateStatus, submissionStatus, `Origine validée : ${headerValue(request.headers, 'origin') || 'Non transmise'}`].join('\n'),
  }
}

async function readBody(request: Request) {
  if (Number(request.headers.get('content-length')) > MAX_BYTES) throw new Error('too-large')
  if (!request.body) throw new Error('invalid-json')
  const reader = request.body.getReader()
  let size = 0
  const chunks: Uint8Array[] = []
  const timeout = setTimeout(() => { void reader.cancel().catch(() => {}) }, 5000)
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BYTES) { await reader.cancel(); throw new Error('too-large') }
      chunks.push(value)
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown
  } finally { clearTimeout(timeout); reader.releaseLock() }
}
export async function POST(request: NextRequest) {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return json({ success: false, error: 'Format de demande invalide.' }, 415)
  if (request.headers.get('sec-fetch-site') === 'cross-site') return json({ success: false, error: 'Origine de la demande invalide.' }, 403)
  let raw: unknown
  try { raw = await readBody(request) } catch (error) {
    return json({ success: false, error: 'Vérifiez le contenu et la taille de votre demande.' }, error instanceof Error && error.message === 'too-large' ? 413 : 400)
  }
  // Neutral rejection: no delivery claim and no indication of the trap field.
  if (raw && typeof raw === 'object' && 'website_check' in raw && raw.website_check !== '' && raw.website_check !== undefined) return json({ message: 'Demande prise en compte.' }, 202)
  const { config, missing } = contactConfiguration()
  if (!config) { console.error('[contact] Configuration absente ou invalide :', missing.join(', ')); return unavailable() }
  if (!config.origins.includes(request.headers.get('origin') || '')) return json({ success: false, error: 'Origine de la demande invalide.' }, 403)
  let ipAddress: string
  let rateStatus = 'Rate limit validé'
  try {
    ipAddress = clientAddress(request.headers)
    const retryAfter = await checkRate(config, ipAddress)
    if (retryAfter > 0) return json({ success: false, error: 'Trop de tentatives rapprochées. Patientez quelques minutes avant de réessayer.' }, 429, { 'Retry-After': String(retryAfter) })
  } catch (error) { console.error('[contact] Protection antispam indisponible', error instanceof Error ? error.message : 'unknown'); return unavailable() }
  const parsed = schema.safeParse(raw)
  if (!parsed.success) return json({ success: false, error: 'Vérifiez les champs du formulaire.', errors: parsed.error.flatten().fieldErrors }, 400)
  const id = z.string().uuid().safeParse(request.headers.get('idempotency-key'))
  if (!id.success) return json({ success: false, error: 'Demande invalide. Actualisez la page puis réessayez.' }, 400)
  const data = contactFormSchema.parse(parsed.data)
  const key = submissionKey(config, id.data)
  const owner = randomUUID()
  try {
    const claim = await claimSubmission(config, key, digest(config, JSON.stringify(data)), owner)
    if (claim === 'sent') return json({ success: true, message: 'Votre demande a bien été envoyée.' }, 200)
    if (claim !== 'claimed') return json({ success: false, error: claim === 'pending' ? 'Un envoi est déjà en cours. Patientez quelques instants avant de réessayer.' : 'Cette demande ne peut pas être renvoyée. Contactez-nous directement si vous avez un doute sur sa réception.' }, 409, { 'Retry-After': '10' })
  } catch (error) { console.error('[contact] Vérification de la demande indisponible', error instanceof Error ? error.message : 'unknown'); return unavailable() }
  try {
    await sendContactEmails(data, config, `contact/${id.data}`, technicalInfo(request, ipAddress, parsed.data, rateStatus, 'Idempotence validée'))
    await finishSubmission(config, key, owner, true)
  } catch {
    // An uncertain delivery keeps its fingerprint and Resend idempotency key.
    try { await finishSubmission(config, key, owner, false) } catch { /* lease expires safely */ }
    console.error('[contact] Envoi non confirmé ; nouvelle tentative possible avec la même clé')
    return unavailable()
  }
  // Preserve the existing CRM, with a deterministic ID and no unawaited work.
  try {
    const { prisma } = await import('@/lib/database_final')
    await prisma.lead.upsert({ where: { id: `contact_${id.data}` }, update: {}, create: {
      id: `contact_${id.data}`, type: 'contact', email: data.email, phone: data.telephone || null,
      data: JSON.stringify(data), source: 'Formulaire de contact', treated: false,
    } })
  } catch { console.error('[contact] Notification envoyée, copie CRM indisponible') }
  return json({ success: true, message: 'Votre demande a bien été envoyée.' }, 201)
}
