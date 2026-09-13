import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { generateMarketAnalysis, type MarketAnalysis } from '@/lib/gemini'
import { contactConfiguration } from '@/lib/contact/config'
import { checkRate, claimSubmission, clientAddress, digest, finishSubmission, submissionKey } from '@/lib/contact/store'
import { sendMarketAnalysisEmails } from '@/lib/market-analysis-email'

export const runtime = 'nodejs'
export const maxDuration = 60
const schema = z.object({
  metier: z.string().trim().min(2).max(100).regex(/^[^\x00-\x1f\x7f]+$/),
  ville: z.string().trim().min(2).max(100).regex(/^[^\x00-\x1f\x7f]+$/),
  email: z.string().trim().toLowerCase().email().max(254),
  website_check: z.literal(''),
  page_path: z.string().max(300).regex(/^\/(?!\/)[^?#\s]*$/).default('/'),
}).strict()
const estimateSchema = z.object({
  recherchesMensuelles: z.number().finite().nonnegative().max(2_000_000_000),
  potentielMensuel: z.number().finite().nonnegative().max(2_000_000_000),
  potentielAnnuel: z.number().finite().nonnegative().max(2_000_000_000),
  panierMoyen: z.number().finite().nonnegative().max(2_000_000_000),
  tauxCapture: z.number().finite().min(0).max(1), cpc: z.number().finite().nonnegative(),
  concurrence: z.enum(['Faible', 'Moyenne', 'Forte']), tendance: z.enum(['Hausse', 'Stable', 'Baisse']),
  analyse: z.string().min(1).max(5000).refine(value => !value.includes('[MODE DÉGRADÉ]')),
  keyword: z.string().min(1).max(300),
})
const json = (body: object, status = 200, headers: Record<string, string> = {}) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } })
const unavailable = () => json({ success: false, error: 'L’estimation ou son envoi est indisponible pour le moment. Vos champs sont conservés : réessayez dans une minute, ou contactez Litus.' }, 503)

async function readBody(request: Request) {
  if (Number(request.headers.get('content-length')) > 8192 || !request.body) throw new Error('body')
  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  const timer = setTimeout(() => { void reader.cancel().catch(() => {}) }, 5000)
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 8192) { await reader.cancel(); throw new Error('body') }
      chunks.push(value)
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown
  } finally { clearTimeout(timer); reader.releaseLock() }
}

async function generate(metier: string, ville: string): Promise<MarketAnalysis> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    const analysis = await Promise.race([
      generateMarketAnalysis(metier, ville),
      new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error('timeout')), 25000) }),
    ])
    return estimateSchema.parse(analysis)
  } finally { clearTimeout(timer) }
}

export async function POST(request: NextRequest) {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return json({ success: false, error: 'Format invalide.' }, 415)
  if (request.headers.get('sec-fetch-site') === 'cross-site') return json({ success: false, error: 'Origine invalide.' }, 403)
  let raw: unknown
  try { raw = await readBody(request) } catch { return json({ success: false, error: 'Demande invalide ou trop volumineuse.' }, 400) }
  if (raw && typeof raw === 'object' && 'website_check' in raw && raw.website_check !== '') return json({ message: 'Demande prise en compte.' }, 202)
  const parsed = schema.safeParse(raw)
  if (!parsed.success) return json({ success: false, error: 'Une activité, une ville et une adresse email valide sont obligatoires.' }, 400)
  const id = z.string().uuid().safeParse(request.headers.get('idempotency-key'))
  if (!id.success) return json({ success: false, error: 'Actualisez la page puis réessayez.' }, 400)
  const settings = contactConfiguration()
  if (!settings.config) return unavailable()
  const config = { ...settings.config, CONTACT_REDIS_PREFIX: `${settings.config.CONTACT_REDIS_PREFIX}:market` }
  if (!config.origins.includes(request.headers.get('origin') || '')) return json({ success: false, error: 'Origine invalide.' }, 403)
  const { website_check: _honeypot, ...data } = parsed.data
  const fingerprint = digest(config, JSON.stringify(data))
  const key = submissionKey(config, id.data)
  const owner = randomUUID()
  let claimed = false
  try {
    const address = clientAddress(request.headers)
    const retry = await checkRate(config, address)
    if (retry > 0) return json({ success: false, error: 'Trop de demandes rapprochées. Patientez quelques minutes.' }, 429, { 'Retry-After': String(retry) })
    // A second shared bucket also limits mail sent to one recipient across IPs.
    const recipientRetry = await checkRate({ ...config, CONTACT_REDIS_PREFIX: `${config.CONTACT_REDIS_PREFIX}:email` }, data.email)
    if (recipientRetry > 0) return json({ success: false, error: 'Une demande récente concerne déjà cette adresse. Patientez quelques minutes.' }, 429, { 'Retry-After': String(recipientRetry) })
    const claim = await claimSubmission(config, key, fingerprint, owner)
    if (claim !== 'claimed' && claim !== 'sent') return json({ success: false, error: claim === 'pending' ? 'Votre estimation est déjà en cours. Réessayez dans une minute.' : 'Cette demande a expiré ou a été modifiée. Recommencez une estimation.' }, 409)
    claimed = claim === 'claimed'
    const { prisma } = await import('@/lib/database_final')
    const leadId = `market_${id.data}`
    const existing = await prisma.lead.findUnique({ where: { id: leadId } })
    const snapshot = existing ? JSON.parse(existing.data) : null
    if (snapshot && snapshot.fingerprint !== fingerprint) throw new Error('binding')
    if (claim === 'sent' && !snapshot) return unavailable()
    const analysis = snapshot ? estimateSchema.parse(snapshot.analysis) : await generate(data.metier, data.ville)
    if (claim === 'sent') return json({ success: true, analysis: { ...analysis, isEstimation: true } })
    const requestedAt = snapshot?.requestedAt || new Date().toISOString()
    // Persist the exact analysis before email; retries reuse the same snapshot.
    await prisma.lead.upsert({ where: { id: leadId }, update: {}, create: {
      id: leadId, type: 'market-analysis', email: data.email, phone: null,
      data: JSON.stringify({ ...data, fingerprint, analysis, requestedAt }), source: 'Estimateur de marché local', status: 'new', treated: false,
    } })
    await prisma.marketAnalysis.upsert({ where: { id: leadId }, update: {}, create: {
      id: leadId, metier: data.metier, ville: data.ville, email: data.email, leadId,
      keyword: analysis.keyword, searchVolume: Math.round(analysis.recherchesMensuelles), cpc: analysis.cpc,
      competition: analysis.concurrence === 'Forte' ? 'HIGH' : analysis.concurrence === 'Moyenne' ? 'MEDIUM' : 'LOW',
      competitionIndex: analysis.concurrence === 'Forte' ? 85 : analysis.concurrence === 'Moyenne' ? 50 : 20,
      dataSource: 'gemini_estimation', panierMoyen: Math.round(analysis.panierMoyen), tauxConversion: 0,
      tauxCapture: analysis.tauxCapture, potentielMensuel: Math.round(analysis.potentielMensuel), potentielAnnuel: Math.round(analysis.potentielAnnuel),
      tendance: analysis.tendance, analyse: analysis.analyse, conseils: '[]',
    } })
    await sendMarketAnalysisEmails(data, analysis, config, id.data, requestedAt)
    await finishSubmission(config, key, owner, true)
    return json({ success: true, analysis: { ...analysis, isEstimation: true } }, 201)
  } catch {
    if (claimed) { try { await finishSubmission(config, key, owner, false) } catch { /* lease expires */ } }
    console.error('[market-analysis] Estimation ou envoi non confirmé ; reprise possible avec la même clé')
    return unavailable()
  }
}
