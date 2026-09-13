// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
const mocks = vi.hoisted(() => ({ generate: vi.fn(), send: vi.fn(), rate: vi.fn(), claim: vi.fn(), finish: vi.fn(), find: vi.fn(), lead: vi.fn(), market: vi.fn() }))
vi.mock('@/lib/gemini', () => ({ generateMarketAnalysis: mocks.generate }))
vi.mock('@/lib/market-analysis-email', () => ({ sendMarketAnalysisEmails: mocks.send }))
vi.mock('@/lib/contact/config', () => ({ contactConfiguration: () => ({ config: { origins: ['https://www.litus.fr'], CONTACT_REDIS_PREFIX: 'test-market' } }) }))
vi.mock('@/lib/contact/store', () => ({ checkRate: mocks.rate, claimSubmission: mocks.claim, finishSubmission: mocks.finish, clientAddress: () => '127.0.0.1', digest: (_: unknown, value: string) => value, submissionKey: (_: unknown, id: string) => id }))
vi.mock('@/lib/database_final', () => ({ prisma: { lead: { findUnique: mocks.find, upsert: mocks.lead }, marketAnalysis: { upsert: mocks.market } } }))
import { POST } from '@/app/api/market-analysis/route'
const data = { metier: 'Plombier', ville: 'Lorient', email: 'client@example.com', website_check: '', page_path: '/' }
const analysis = { recherchesMensuelles: 120, concurrence: 'Moyenne', tendance: 'Stable', potentielAnnuel: 12000, potentielMensuel: 1000, panierMoyen: 200, tauxCapture: 0.05, cpc: 2, keyword: 'Plombier Lorient', analyse: 'Estimation indicative.' }
function request(body: unknown, origin = 'https://www.litus.fr') { return new NextRequest('https://www.litus.fr/api/market-analysis', { method: 'POST', headers: { 'content-type': 'application/json', origin, 'idempotency-key': 'fd190398-1411-4a3a-b8df-23c75a4ee8ee' }, body: JSON.stringify(body) }) }
beforeEach(() => { vi.resetAllMocks(); mocks.rate.mockResolvedValue(0); mocks.claim.mockResolvedValue('claimed'); mocks.find.mockResolvedValue(null); mocks.generate.mockResolvedValue(analysis); mocks.send.mockResolvedValue(undefined) })
describe('Market estimate server gate', () => {
  it.each([undefined, '', 'invalid'])('rejects missing or invalid email %s', async email => {
    expect((await POST(request({ ...data, email }))).status).toBe(400)
    expect(mocks.generate).not.toHaveBeenCalled(); expect(mocks.send).not.toHaveBeenCalled()
  })
  it('rejects the old analysisId bypass', async () => {
    expect((await POST(request({ ...data, analysisId: 'old-record' }))).status).toBe(400)
    expect(mocks.find).not.toHaveBeenCalled()
  })
  it('discards filled honeypots before processing', async () => {
    const response = await POST(request({ ...data, website_check: 'spam.example' }))
    expect(response.status).toBe(202); expect((await response.json()).analysis).toBeUndefined()
    expect(mocks.rate).not.toHaveBeenCalled(); expect(mocks.send).not.toHaveBeenCalled()
  })
  it('requires a present, empty honeypot', async () => {
    expect((await POST(request({ ...data, website_check: undefined }))).status).toBe(400)
  })
  it('rejects untrusted origins', async () => {
    expect((await POST(request(data, 'https://spam.example'))).status).toBe(403)
    expect(mocks.generate).not.toHaveBeenCalled()
  })
  it('limits requests before generation and mail', async () => {
    mocks.rate.mockResolvedValue(120)
    const response = await POST(request(data)); expect(response.status).toBe(429)
    expect(response.headers.get('Retry-After')).toBe('120'); expect(mocks.generate).not.toHaveBeenCalled()
  })
  it('limits mail for the same recipient across IPs', async () => {
    mocks.rate.mockResolvedValueOnce(0).mockResolvedValueOnce(180)
    expect((await POST(request(data))).status).toBe(429); expect(mocks.send).not.toHaveBeenCalled()
  })
  it('persists the lead and only returns the estimate after confirmed email sends', async () => {
    const response = await POST(request(data)); expect(response.status).toBe(201)
    expect((await response.json()).analysis.potentielAnnuel).toBe(12000)
    expect(mocks.lead).toHaveBeenCalled(); expect(mocks.market).toHaveBeenCalled(); expect(mocks.send).toHaveBeenCalledOnce()
    expect(mocks.finish.mock.calls[0][3]).toBe(true)
  })
  it('does not expose an estimate when email delivery is uncertain, and reuses the snapshot', async () => {
    mocks.send.mockRejectedValueOnce(new Error('timeout'))
    const failed = await POST(request(data)); expect(failed.status).toBe(503)
    expect((await failed.json()).analysis).toBeUndefined()
    const saved = mocks.lead.mock.calls[0][0].create
    mocks.find.mockResolvedValue(saved)
    const retried = await POST(request(data)); expect(retried.status).toBe(201)
    expect(mocks.generate).toHaveBeenCalledOnce()
    expect(mocks.send.mock.calls[0]).toEqual(mocks.send.mock.calls[1])
  })
  it('returns a sent request without resending or regenerating', async () => {
    await POST(request(data)); mocks.find.mockResolvedValue(mocks.lead.mock.calls[0][0].create); mocks.claim.mockResolvedValue('sent')
    expect((await POST(request(data))).status).toBe(200)
    expect(mocks.generate).toHaveBeenCalledOnce(); expect(mocks.send).toHaveBeenCalledOnce()
  })
  it('does not process a concurrent request', async () => {
    mocks.claim.mockResolvedValue('pending'); expect((await POST(request(data))).status).toBe(409)
    expect(mocks.generate).not.toHaveBeenCalled()
  })
  it('does not deliver a fabricated fallback after AI failure', async () => {
    mocks.generate.mockResolvedValue({ ...analysis, analyse: '[MODE DÉGRADÉ] Unavailable' })
    expect((await POST(request(data))).status).toBe(503); expect(mocks.send).not.toHaveBeenCalled()
  })
})
