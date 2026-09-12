import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { createClient } from '@libsql/client'
import { z } from 'zod'
import { contactConfiguration } from '@/lib/contact/config'
import { clientAddress, digest } from '@/lib/contact/store'
import { activeQuestions, activeSteps, cleanAnswers, createDocument, questionError, STEPS, type Answers } from '@/lib/brief/model'
import { sendBriefEmails, type BriefEnvelope } from '@/lib/brief/email'

export const runtime = 'nodejs'
export const maxDuration = 60
const schema = z.object({
  submissionId: z.string().uuid(),
  answers: z.record(z.string().max(60), z.union([z.string().max(2000), z.array(z.string().max(160)).max(20)])),
  contact: z.object({ fullName: z.string().trim().min(2).max(150), email: z.string().trim().email().max(254).transform(v => v.toLowerCase()), company: z.string().trim().max(150).optional(), phone: z.string().trim().max(40).optional() }).strict(),
  consent: z.literal(true), website: z.string().max(500).default(''), elapsedMs: z.number().finite().min(0), pageUrl: z.string().max(2048), referrer: z.string().max(2048).default(''),
}).strict()
function safeUrl(value: string) { try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) ? `${url.origin}${url.pathname}`.slice(0, 500) : '' } catch { return '' } }
function geo(value: string | null) { if (!value) return ''; try { return decodeURIComponent(value).slice(0, 100) } catch { return '' } }
function answerErrors(input: Answers) {
  const all = new Map(STEPS.flatMap(s => s.questions.map(q => [q.id, q] as const)))
  const errors: Record<string, string> = {}
  for (const [id, value] of Object.entries(input)) {
    const q = all.get(id)
    if (!q) { errors[id] = 'Question inconnue.'; continue }
    if (q.kind === 'multi' ? !Array.isArray(value) || value.some(v => !q.options?.includes(v)) : typeof value !== 'string' || (q.kind === 'single' && !q.options?.includes(value))) errors[id] = 'Choix non valide.'
  }
  const answers = cleanAnswers(input)
  for (const s of activeSteps(answers)) for (const q of activeQuestions(s, answers)) { const error = questionError(q, answers[q.id]); if (error) errors[q.id] = error }
  return { answers, errors }
}
async function boundedJson(request: NextRequest) {
  const reader = request.body?.getReader()
  if (!reader) throw new Error('empty')
  const chunks: Uint8Array[] = []; let length = 0
  const timeout = setTimeout(() => { void reader.cancel() }, 5000)
  try {
    for (;;) { const chunk = await reader.read(); if (chunk.done) break; length += chunk.value.byteLength; if (length > 48000) { await reader.cancel(); throw new Error('large') }; chunks.push(chunk.value) }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } finally { clearTimeout(timeout); reader.releaseLock() }
}
const reply = (body: object, status = 200, retry?: number) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...(retry ? { 'Retry-After': String(retry) } : {}) } })

export async function POST(request: NextRequest) {
  const { config } = contactConfiguration()
  if (!config) return reply({ error: 'Le service d’envoi est momentanément indisponible. Contactez Litus au 07 44 98 55 21.' }, 503)
  const origin = request.headers.get('origin') || ''
  const allowed = config.CONTACT_ALLOWED_ORIGINS.split(',').map(v => v.trim().replace(/\/$/, ''))
  if (!allowed.includes(origin) || request.headers.get('sec-fetch-site') === 'cross-site') return reply({ error: 'Origine de la demande non autorisée.' }, 403)
  if (!request.headers.get('content-type')?.includes('application/json')) return reply({ error: 'Format non pris en charge.' }, 415)
  const ip = clientAddress(request.headers)
  if (!ip) return reply({ error: 'Impossible de sécuriser la demande. Veuillez réessayer.' }, 503)
  let raw: unknown
  try { raw = await boundedJson(request) } catch { return reply({ error: 'La demande est invalide ou trop volumineuse.' }, 400) }
  const parsed = schema.safeParse(raw)
  if (!parsed.success) return reply({ error: 'Vérifiez les informations du formulaire avant l’envoi.' }, 400)
  const input = parsed.data
  if (input.website || input.elapsedMs < 5000) return reply({ error: 'La demande n’a pas pu être validée. Veuillez réessayer.' }, 400)
  const { answers, errors } = answerErrors(input.answers)
  if (Object.keys(errors).length) return reply({ error: 'Certaines réponses sont manquantes ou invalides. Revenez aux étapes concernées.', fields: errors }, 400)
  const pageUrl = safeUrl(input.pageUrl)
  if (pageUrl !== `${origin}/ressources/cahier-des-charges`) return reply({ error: 'Page d’envoi non reconnue.' }, 400)
  const dbUrl = config.TURSO_DATABASE_URL || (process.env.NODE_ENV !== 'production' ? 'file:prisma/dev.db' : '')
  if (!dbUrl) return reply({ error: 'Le service de sauvegarde est momentanément indisponible.' }, 503)
  const db = createClient({ url: dbUrl, authToken: config.TURSO_AUTH_TOKEN })
  const id = `brief_${input.submissionId}`
  const owner = randomUUID()
  const fingerprint = digest(config, JSON.stringify({ answers, contact: input.contact, consent: input.consent }))
  const ipKey = digest(config, `brief-ip:${ip}`)
  const now = Math.floor(Date.now() / 1000)
  let claimed = false
  let envelope: BriefEnvelope | null = null
  try {
    await db.execute('CREATE TABLE IF NOT EXISTS BriefSubmissionState (id TEXT PRIMARY KEY, fingerprint TEXT NOT NULL, owner TEXT NOT NULL, status TEXT NOT NULL, created INTEGER NOT NULL, lockedUntil INTEGER NOT NULL)')
    await db.execute('CREATE TABLE IF NOT EXISTS BriefRateEvent (id TEXT PRIMARY KEY, ip TEXT NOT NULL, created INTEGER NOT NULL)')
    await db.execute('CREATE INDEX IF NOT EXISTS BriefRateEvent_created ON BriefRateEvent(created)')
    const tx = await db.transaction('write')
    try {
      const existing = (await tx.execute({ sql: 'SELECT * FROM BriefSubmissionState WHERE id = ?', args: [id] })).rows[0]
      if (existing && existing.fingerprint !== fingerprint) { await tx.rollback(); return reply({ error: 'Cette référence correspond à un autre contenu. Rechargez le parcours avant une nouvelle demande.' }, 409) }
      if (existing && existing.status === 'sent') {
        const saved = (await tx.execute({ sql: 'SELECT data FROM Lead WHERE id = ?', args: [id] })).rows[0]
        await tx.rollback()
        if (!saved) return reply({ error: 'Le document envoyé n’est plus disponible dans ce parcours. Consultez votre email.' }, 410)
        const data = JSON.parse(String(saved.data)) as { brief: BriefEnvelope }
        return reply({ document: data.brief.document })
      }
      if (existing && now - Number(existing.created) > 82800) { await tx.rollback(); return reply({ error: 'Cette tentative a plus de 23 heures. Contactez Litus avant de relancer pour éviter un double envoi.' }, 410) }
      if (existing && Number(existing.lockedUntil) > now) { await tx.rollback(); return reply({ error: 'Votre envoi est déjà en cours. Patientez une minute puis réessayez.' }, 409, 60) }
      const ipWindow = config.CONTACT_RATE_IP_WINDOW_SECONDS
      const globalWindow = config.CONTACT_RATE_GLOBAL_WINDOW_SECONDS
      await tx.execute({ sql: 'DELETE FROM BriefRateEvent WHERE created < ?', args: [now - Math.max(ipWindow, globalWindow)] })
      const counts = (await tx.execute({ sql: 'SELECT SUM(CASE WHEN ip = ? AND created >= ? THEN 1 ELSE 0 END) AS localCount, SUM(CASE WHEN created >= ? THEN 1 ELSE 0 END) AS globalCount FROM BriefRateEvent', args: [ipKey, now - ipWindow, now - globalWindow] })).rows[0]
      if (Number(counts?.localCount || 0) >= config.CONTACT_RATE_IP_LIMIT || Number(counts?.globalCount || 0) >= config.CONTACT_RATE_GLOBAL_LIMIT) { await tx.rollback(); return reply({ error: 'Trop de tentatives rapprochées. Patientez avant de réessayer ; vos réponses restent sur cette page.' }, 429, ipWindow) }
      await tx.execute({ sql: 'INSERT INTO BriefRateEvent (id, ip, created) VALUES (?, ?, ?)', args: [randomUUID(), ipKey, now] })
      if (existing) {
        const saved = (await tx.execute({ sql: 'SELECT data FROM Lead WHERE id = ?', args: [id] })).rows[0]
        if (!saved) throw new Error('Missing saved brief')
        envelope = (JSON.parse(String(saved.data)) as { brief: BriefEnvelope }).brief
        await tx.execute({ sql: 'UPDATE BriefSubmissionState SET owner = ?, status = ?, lockedUntil = ? WHERE id = ?', args: [owner, 'sending', now + 90, id] })
      } else {
        const createdAt = new Date().toISOString()
        envelope = { document: createDocument(answers, input.contact, `LITUS-${input.submissionId.slice(0, 8).toUpperCase()}`, createdAt), technical: { ip, receivedAt: createdAt, userAgent: (request.headers.get('user-agent') || '').slice(0, 600), pageUrl, referrer: safeUrl(input.referrer), country: process.env.VERCEL === '1' ? geo(request.headers.get('x-vercel-ip-country')) : '', city: process.env.VERCEL === '1' ? geo(request.headers.get('x-vercel-ip-city')) : '', protections: 'Honeypot présent et vide ; délai minimal respecté ; origine autorisée ; validation serveur des choix ; quota IP/global respecté ; envoi idempotent. Consentement au traitement du projet donné.' } }
        const leadData = JSON.stringify({ fullName: input.contact.fullName, company: input.contact.company || '', magnetId: 'cahier-des-charges', magnetTitle: 'Cahier des charges personnalisé', consent: true, consentVersion: 'brief-2026-09-v1', brief: envelope })
        await tx.execute({ sql: 'INSERT INTO Lead (id, type, email, phone, data, source, treated, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', args: [id, 'lead-magnet', input.contact.email, input.contact.phone || null, leadData, '/ressources/cahier-des-charges', 0, 'new', createdAt, createdAt] })
        await tx.execute({ sql: 'INSERT INTO BriefSubmissionState (id, fingerprint, owner, status, created, lockedUntil) VALUES (?, ?, ?, ?, ?, ?)', args: [id, fingerprint, owner, 'sending', now, now + 90] })
      }
      await tx.commit(); claimed = true
    } finally { tx.close() }
    if (!envelope) throw new Error('Missing brief payload')
    await sendBriefEmails(config, envelope, input.submissionId)
    await db.execute({ sql: 'UPDATE BriefSubmissionState SET status = ?, lockedUntil = 0 WHERE id = ? AND owner = ?', args: ['sent', id, owner] })
    return reply({ document: envelope.document })
  } catch {
    if (claimed) { try { await db.execute({ sql: 'UPDATE BriefSubmissionState SET status = ?, lockedUntil = 0 WHERE id = ? AND owner = ?', args: ['retry', id, owner] }) } catch { /* The timed lock permits a safe retry. */ } }
    console.error('[project-brief] Delivery unavailable', { reference: id })
    return reply({ error: 'L’envoi n’a pas pu être confirmé. Vos réponses sont conservées : réessayez dans une minute, sans fermer la page.' }, 503, 60)
  } finally { db.close() }
}
