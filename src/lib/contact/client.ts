'use client'

// One key per exact payload, retained for retries (including a reload). No form
// data is written to browser storage, only its SHA-256 fingerprint and UUID.
const inFlight = new Map<string, Promise<Response>>()
const memoryKeys = new Map<string, string>()
export async function submitContact(payload: object): Promise<Response> {
  const body = JSON.stringify({ website_check: '', ...payload })
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body))
  const fingerprint = Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('')
  const existing = inFlight.get(fingerprint)
  if (existing) return (await existing).clone()
  const storageKey = `litus-contact:${fingerprint}`
  let key = memoryKeys.get(fingerprint)
  try { key ||= sessionStorage.getItem(storageKey) || undefined } catch { /* Private browsing: keep the key in this tab's memory. */ }
  key ||= crypto.randomUUID()
  memoryKeys.set(fingerprint, key)
  try { sessionStorage.setItem(storageKey, key) } catch { /* Memory fallback only for client deduplication, never rate limiting. */ }
  const sending = fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key }, body, signal: AbortSignal.timeout(28000) }).then(async response => {
    if (response.ok && (await response.clone().json()).success !== true) throw new Error('Contact delivery not confirmed')
    return response
  })
  inFlight.set(fingerprint, sending)
  try { return (await sending).clone() } finally { inFlight.delete(fingerprint) }
}
