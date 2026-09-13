// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import { marketAnalysisEmails, sendMarketAnalysisEmails } from '@/lib/market-analysis-email'
import type { ContactConfig } from '@/lib/contact/config'
const config = { RESEND_FROM_EMAIL: 'contact@litus.fr', RESEND_API_KEY: 'test-key' } as ContactConfig
const data = { metier: '<script>artisan</script>', ville: 'Lorient', email: 'client@example.com', page_path: '/' }
const analysis = { recherchesMensuelles: 120, concurrence: 'Moyenne' as const, tendance: 'Stable' as const, potentielAnnuel: 12000, potentielMensuel: 1000, panierMoyen: 200, tauxCapture: 0.05, cpc: 2, keyword: 'artisan Lorient', analyse: '<b>Estimation indicative.</b>' }
const date = '2026-09-13T18:00:00.000Z'
afterEach(() => vi.unstubAllGlobals())
describe('Market analysis emails', () => {
  it('includes the logo, results and escaped content in two separate emails', () => {
    const [customer, internal] = marketAnalysisEmails(data, analysis, config.RESEND_FROM_EMAIL, date)
    expect(customer.to).toEqual(['client@example.com']); expect(internal.to).toEqual(['litusagency@gmail.com'])
    expect(internal.reply_to).toBe('client@example.com'); expect(customer.reply_to).toBe('litusagency@gmail.com')
    expect(customer.html).toContain('logo-sans-fond.png'); expect(customer.html).toContain('&lt;script&gt;')
    expect(customer.html).not.toContain('<script>'); expect(customer.text).toContain('12'); expect(customer.text).toContain('garantie')
    expect(internal.html).toContain('Honeypot'); expect(customer.html).not.toContain('Informations techniques')
  })
  it('sends to both recipients using distinct, stable idempotency keys', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 'accepted-mail' }) }); vi.stubGlobal('fetch', fetchMock)
    await sendMarketAnalysisEmails(data, analysis, config, 'submission-id', date)
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).to).toEqual(['litusagency@gmail.com'])
    expect(JSON.parse(fetchMock.mock.calls[1][1].body).to).toEqual(['client@example.com'])
    expect(fetchMock.mock.calls[0][1].headers['Idempotency-Key']).toBe('market/submission-id/notification')
    expect(fetchMock.mock.calls[1][1].headers['Idempotency-Key']).toBe('market/submission-id/customer')
  })
  it('propagates provider refusal rather than claiming delivery', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: 'refused' }) }))
    await expect(sendMarketAnalysisEmails(data, analysis, config, 'submission-id', date)).rejects.toThrow('Email not accepted')
  })
})
