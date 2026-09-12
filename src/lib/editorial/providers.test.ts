// @vitest-environment node
import { afterEach, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { googleSearch, groundedGoogleSearch, model } from './providers'

afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs() })
it('refuses a search response without actual Google grounding traces', async () => {
  vi.stubEnv('GEMINI_API_KEY', 'test-key')
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: 'Trust me, I searched.' }] } }] }))))
  await expect(groundedGoogleSearch('test')).rejects.toThrow('grounding incomplete')
})
it('keeps Google-grounded sources without inventing SERP positions', async () => {
  vi.stubEnv('GEMINI_API_KEY', 'test-key')
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', groundingMetadata: { webSearchQueries: ['real query'], groundingChunks: [{ web: { uri: 'https://developers.google.com/source', title: 'Official source' } }, { web: { uri: 'https://web.dev/source', title: 'Web source' } }] } }] }))))
  const result = await groundedGoogleSearch('test')
  expect(result.results).toHaveLength(2)
  expect(result.results.every(r => r.rank === 0)).toBe(true)
})
it('uses the second real search provider after exhausted DataForSEO credits', async () => {
  vi.stubEnv('DATAFORSEO_LOGIN', 'test'); vi.stubEnv('DATAFORSEO_PASSWORD', 'test'); vi.stubEnv('GEMINI_API_KEY', 'test'); vi.stubEnv('EDITORIAL_SEARCH_PROVIDER', '')
  const fetcher = vi.fn().mockResolvedValueOnce(new Response('', { status: 402 })).mockResolvedValueOnce(new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', groundingMetadata: { webSearchQueries: ['actual query'], groundingChunks: [{ web: { uri: 'https://web.dev/a' } }, { web: { uri: 'https://web.dev/b' } }] } }] })))
  vi.stubGlobal('fetch', fetcher)
  expect((await googleSearch('a precise query')).results).toHaveLength(2)
  expect(fetcher).toHaveBeenCalledTimes(2)
})
it('rejects invalid or truncated model output', async () => {
  vi.stubEnv('GEMINI_API_KEY', 'test')
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ candidates: [{ finishReason: 'MAX_TOKENS', content: { parts: [{ text: '{' }] } }] }))))
  await expect(model('write', {}, z.object({ text: z.string() }))).rejects.toThrow('incomplete')
})
it('uses a compact API schema but enforces complete local constraints', async () => {
  vi.stubEnv('GEMINI_API_KEY', 'test')
  const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify({ text: 'longer than permitted' }) }] } }] })))
  vi.stubGlobal('fetch', fetcher)
  await expect(model('write', {}, z.object({ text: z.string().max(5) }))).rejects.toThrow()
  const body = JSON.parse(fetcher.mock.calls[0][1].body)
  expect(body.generationConfig.responseJsonSchema.properties.text.maxLength).toBe(5)
  expect(body.generationConfig.responseJsonSchema.properties.text.type).toBe('string')
})
