// @vitest-environment node
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/contact/route'
import { CLAIM_SCRIPT, FINISH_SCRIPT, RATE_SCRIPT, clientAddress, resetContactStoreForTests } from '@/lib/contact/store'
import { contactConfirmationEmail, contactEmail } from '@/lib/email'
import { contactFormSchema } from '@/lib/validations/contact'

const crm = vi.hoisted(() => ({ upsert: vi.fn().mockResolvedValue({}) }))
vi.mock('@/lib/database_final', () => ({ prisma: { lead: crm } }))
const data = { nom: 'Marie Dupont', email: 'marie@gmail.com', telephone: '06 12 34 56 78', entreprise: 'Atelier Dupont', service: 'seo-local' as const, budget: '1000-3000' as const, message: 'Je souhaite améliorer la visibilité de mon entreprise.', rgpd: true, website_check: '' }
const uuid = () => crypto.randomUUID()
function request(body: unknown = data, id = uuid(), headers: Record<string, string> = {}) {
  return new NextRequest('https://litus.test/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://litus.test', 'Idempotency-Key': id, 'x-vercel-forwarded-for': '198.51.100.1', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) })
}

// Boundary fake: no network, email, Redis credentials or real CRM writes.
// Production Redis executes the exported Lua scripts atomically via EVAL.
function infrastructure() {
  const submissions = new Map<string, { fingerprint: string; owner: string; status: string }>()
  const rates = new Map<string, number>()
  const emails: { body: ReturnType<typeof contactEmail>; key: string }[] = []
  let provider: () => Promise<Response> = async () => Response.json({ id: uuid() })
  const fetcher = vi.fn(async (url: string | URL | Request, options?: RequestInit) => {
    if (url === 'https://api.resend.com/emails') {
      emails.push({ body: JSON.parse(String(options?.body)), key: new Headers(options?.headers).get('Idempotency-Key')! })
      return provider()
    }
    expect(String(url)).toBe('https://redis.test')
    const command = JSON.parse(String(options?.body))
    expect(command[0]).toBe('EVAL')
    let result: string | number
    if (command[1] === RATE_SCRIPT) {
      const [, , , global, ip, globalLimit, , ipLimit] = command
      if ((rates.get(global) || 0) >= globalLimit || (rates.get(ip) || 0) >= ipLimit) result = 900
      else { rates.set(global, (rates.get(global) || 0) + 1); rates.set(ip, (rates.get(ip) || 0) + 1); result = 0 }
    } else if (command[1] === CLAIM_SCRIPT) {
      const [, , , key, fingerprint, owner] = command
      const old = submissions.get(key)
      if (old && old.fingerprint !== fingerprint) result = 'conflict'
      else if (old?.status === 'sent') result = 'sent'
      else if (old?.status === 'pending') result = 'pending'
      else { submissions.set(key, { fingerprint, owner, status: 'pending' }); result = 'claimed' }
    } else {
      expect(command[1]).toBe(FINISH_SCRIPT)
      const [, , , key, owner, status] = command
      const old = submissions.get(key)
      if (old && old.owner === owner) { old.status = status; result = 1 } else result = 0
    }
    return Response.json({ result })
  })
  vi.stubGlobal('fetch', fetcher)
  return { fetcher, emails, submissions, setProvider: (fn: typeof provider) => { provider = fn } }
}
beforeEach(() => {
  for (const [key, value] of Object.entries({ RESEND_API_KEY: 'test-api-key', RESEND_FROM_EMAIL: 'contact@notifications.litus.test', CONTACT_ALLOWED_ORIGINS: 'https://litus.test', UPSTASH_REDIS_REST_URL: 'https://redis.test', UPSTASH_REDIS_REST_TOKEN: 'test-redis-token', CONTACT_HASH_SECRET: 'test-secret-only-'.repeat(3), VERCEL: '1', CONTACT_RATE_IP_LIMIT: '5', CONTACT_RATE_IP_WINDOW_SECONDS: '900', CONTACT_RATE_GLOBAL_LIMIT: '30', CONTACT_RATE_GLOBAL_WINDOW_SECONDS: '60', CONTACT_REDIS_PREFIX: 'contact:test' })) vi.stubEnv(key, value)
  vi.spyOn(console, 'error').mockImplementation(() => {})
  crm.upsert.mockClear()
})
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks() })

describe('contact API', () => {
  it('awaits provider acceptance and sends branded notification and prospect confirmation', async () => {
    const infra = infrastructure()
    let accept!: (value: Response) => void
    let call = 0
    infra.setProvider(() => ++call === 1 ? new Promise(resolve => { accept = resolve }) : Promise.resolve(Response.json({ id: 'confirmation-accepted' })))
    let finished = false
    const sending = POST(request({ ...data, page_url: 'https://litus.test/contact', referrer: 'https://google.test/search?q=litus' }, uuid(), {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
      'x-vercel-ip-country': 'FR',
      'x-vercel-ip-city': 'Lorient',
      referer: 'https://litus.test/contact',
    })).then(value => { finished = true; return value })
    await vi.waitFor(() => expect(infra.emails).toHaveLength(1))
    expect(finished).toBe(false)
    accept(Response.json({ id: 'resend-accepted' }))
    const response = await sending
    expect(response.status).toBe(201)
    expect((await response.json()).success).toBe(true)
    expect(infra.emails[0].body).toMatchObject({ to: ['litusagency@gmail.com'], from: 'Litus <contact@notifications.litus.test>', reply_to: data.email, subject: 'Nouvelle demande de contact — Marie Dupont — SEO local' })
    expect(infra.emails[0].body.text).toContain('Informations techniques')
    expect(infra.emails[0].body.text).toContain('Adresse IP :\n198.51.100.1')
    expect(infra.emails[0].body.text).toContain('Page d’origine :\nhttps://litus.test/contact')
    expect(infra.emails[0].body.text).toContain('Pays / ville approximative :\nLorient, FR')
    expect(infra.emails[0].body.text).toContain('Honeypot :\nChamp présent et vide')
    expect(infra.emails[0].body.html).toContain('Informations techniques')
    expect(infra.emails).toHaveLength(2)
    expect(infra.emails[1].body).toMatchObject({ to: [data.email], from: 'Litus <contact@notifications.litus.test>', reply_to: 'litusagency@gmail.com', subject: 'Nous avons bien reçu votre demande — Litus' })
    expect(infra.emails[0].key).toMatch(/\/notification$/)
    expect(infra.emails[1].key).toMatch(/\/confirmation$/)
    expect(crm.upsert).toHaveBeenCalledOnce()
  })
  it.each(['spam', ' ', null, 42])('silently discards populated honeypot %s before any external call', async trap => {
    const infra = infrastructure()
    const response = await POST(request({ ...data, website_check: trap }))
    expect(response.status).toBe(202)
    expect(await response.json()).toEqual({ message: 'Demande prise en compte.' })
    expect(infra.fetcher).not.toHaveBeenCalled()
    expect(crm.upsert).not.toHaveBeenCalled()
  })
  it.each([{ nom: 'x' }, { nom: 'Marie\r\nBcc:foo@evil.test' }, { email: 'invalide' }, { telephone: '' }, { telephone: 'garbage' }, { entreprise: 'x'.repeat(201) }, { service: 'arbitrary' }, { budget: '123' }, { message: 'court' }, { message: 'x'.repeat(5001) }, { rgpd: false }, { to: 'evil@example.com' }])('rejects invalid or unexpected fields %j', async invalid => {
    const infra = infrastructure()
    const response = await POST(request({ ...data, ...invalid }))
    expect(response.status).toBe(400)
    expect(infra.emails).toHaveLength(0)
  })
  it('allows Gmail and Outlook for legitimate prospects', () => {
    for (const email of ['client@gmail.com', 'client@outlook.com']) expect(contactFormSchema.safeParse({ ...data, email }).success).toBe(true)
  })
  it('rejects malformed, oversized (without Content-Length), cross-origin and non-JSON requests', async () => {
    const infra = infrastructure()
    expect((await POST(request('{'))).status).toBe(400)
    expect((await POST(request({ ...data, message: 'x'.repeat(25000) }))).status).toBe(413)
    expect((await POST(request(data, uuid(), { Origin: 'https://evil.test' }))).status).toBe(403)
    expect((await POST(request(data, uuid(), { 'Content-Type': 'text/plain' }))).status).toBe(415)
    expect(infra.emails).toHaveLength(0)
  })
  it('limits 5 attempts per IP including validation failures', async () => {
    const infra = infrastructure()
    for (let i = 0; i < 5; i++) expect((await POST(request({ ...data, nom: '' }))).status).toBe(400)
    const limited = await POST(request())
    expect(limited.status).toBe(429)
    expect(limited.headers.get('Retry-After')).toBe('900')
    expect(infra.emails).toHaveLength(0)
  })
  it('limits global bursts across different IPs', async () => {
    vi.stubEnv('CONTACT_RATE_GLOBAL_LIMIT', '2')
    infrastructure()
    for (let i = 1; i <= 3; i++) expect((await POST(request(data, uuid(), { 'x-vercel-forwarded-for': `198.51.100.${i}` }))).status).toBe(i <= 2 ? 201 : 429)
  })
  it('deduplicates replay and rejects changed payload with the same key', async () => {
    const infra = infrastructure(), id = uuid()
    expect((await POST(request(data, id))).status).toBe(201)
    expect((await POST(request(data, id))).status).toBe(200)
    expect((await POST(request({ ...data, nom: 'Autre personne' }, id))).status).toBe(409)
    expect(infra.emails).toHaveLength(2)
    expect(crm.upsert).toHaveBeenCalledOnce()
  })
  it('rejects a concurrent duplicate while the first send is pending', async () => {
    const infra = infrastructure(), id = uuid()
    let accept!: (value: Response) => void
    let call = 0
    infra.setProvider(() => ++call === 1 ? new Promise(resolve => { accept = resolve }) : Promise.resolve(Response.json({ id: 'confirmation-accepted' })))
    const first = POST(request(data, id))
    await vi.waitFor(() => expect(infra.emails).toHaveLength(1))
    expect((await POST(request(data, id))).status).toBe(409)
    accept(Response.json({ id: 'accepted' }))
    expect((await first).status).toBe(201)
    expect(infra.emails).toHaveLength(2)
  })
  it.each(['error', 'timeout', 'missing-id'])('never confirms %s from Resend; retry keeps the provider key', async mode => {
    const infra = infrastructure(), id = uuid()
    infra.setProvider(async () => { if (mode === 'timeout') throw new Error('secret technical error'); return Response.json({ error: 'secret details' }, { status: mode === 'error' ? 500 : 200 }) })
    const failed = await POST(request(data, id))
    expect(failed.status).toBe(503)
    expect(await failed.text()).not.toContain('secret')
    expect(crm.upsert).not.toHaveBeenCalled()
    infra.setProvider(async () => Response.json({ id: 'accepted' }))
    expect((await POST(request(data, id))).status).toBe(201)
    expect(infra.emails[0].key).toBe(infra.emails[1].key)
  })
  it('fails closed for missing configuration and unavailable Redis', async () => {
    const infra = infrastructure()
    vi.stubEnv('RESEND_API_KEY', '')
    expect((await POST(request())).status).toBe(503)
    expect(infra.fetcher).not.toHaveBeenCalled()
    vi.stubEnv('RESEND_API_KEY', 'test-api-key')
    infra.fetcher.mockRejectedValueOnce(new Error('Redis offline'))
    expect((await POST(request())).status).toBe(503)
    expect(infra.emails).toHaveLength(0)
  })
  it('uses the shared Turso store when Upstash is not configured', async () => {
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
    vi.stubEnv('TURSO_DATABASE_URL', 'file::memory:?cache=shared')
    vi.stubEnv('TURSO_AUTH_TOKEN', 'local-test-token')
    try {
      const infra = infrastructure()
      const response = await POST(request())
      expect(response.status).toBe(201)
      expect(infra.emails).toHaveLength(2)
    } finally {
      await resetContactStoreForTests()
    }
  })
  it('does not trust spoofed forwarding headers; IPv6 /64 is shared', () => {
    expect(clientAddress(new Headers({ 'x-vercel-forwarded-for': '198.51.100.1', 'x-forwarded-for': 'evil' }))).toBe('198.51.100.1')
    expect(() => clientAddress(new Headers({ 'x-forwarded-for': '198.51.100.2' }))).toThrow()
    expect(clientAddress(new Headers({ 'x-vercel-forwarded-for': '2001:db8:abcd:1234::1' }))).toBe(clientAddress(new Headers({ 'x-vercel-forwarded-for': '2001:db8:abcd:1234:aaaa:bbbb:cccc:dddd' })))
    expect(clientAddress(new Headers({ 'x-vercel-forwarded-for': '::ffff:198.51.100.1' }))).toBe('198.51.100.1')
  })
  it('escapes every user value in HTML while retaining plain text', () => {
    const email = contactEmail({ ...data, nom: '<b>Marie</b>', entreprise: '<img src=x onerror="alert(1)">', message: 'Projet <script>alert(1)</script> & devis' }, 'contact@litus.test')
    expect(email.html).not.toContain('<script>')
    expect(email.html).not.toContain('<img src=x')
    expect(email.html).toContain('&lt;b&gt;Marie&lt;/b&gt;')
    expect(email.text).toContain('Projet <script>alert(1)</script> & devis')
    const confirmation = contactConfirmationEmail({ ...data, nom: '<b>Marie</b>' }, 'contact@litus.test')
    expect(confirmation.html).not.toContain('<b>Marie</b>')
    expect(confirmation.html).toContain('&lt;b&gt;Marie&lt;/b&gt;')
  })
})
