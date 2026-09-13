import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'
import https from 'node:https'

export function isPublicAddress(address: string) {
  if (address.includes(':')) return /^(2|3)[0-9a-f]{3}:/i.test(address) && !/^2001:(?:db8|0):/i.test(address)
  if (isIP(address) !== 4) return false
  const [a, b] = address.split('.').map(Number)
  return !(a === 0 || a === 10 || a === 127 || a >= 224 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && [0, 168].includes(b) || a === 100 && b >= 64 && b <= 127 || a === 198 && [18, 19, 51].includes(b) || a === 203 && b === 0)
}
/** DNS is pinned to the validated address; every redirect is revalidated. */
export async function fetchPublic(urlValue: string, options: { image?: boolean; redirects?: number } = {}): Promise<{ body: Buffer; url: string; contentType: string }> {
  const url = new URL(urlValue)
  if (url.protocol !== 'https:' || url.username || url.password || url.port && url.port !== '443' || (options.redirects ?? 0) > 4) throw new Error('Unsafe source URL')
  const addresses = await lookup(url.hostname, { all: true })
  if (!addresses.length || addresses.some(a => !isPublicAddress(a.address))) throw new Error('Private source address blocked')
  const address = addresses.find(a => a.family === 4) ?? addresses[0]
  return new Promise((resolve, reject) => {
    const request = https.get(url, { headers: { 'User-Agent': 'LitusEditorial/1.0 (+https://www.litus.fr/contact)', Accept: options.image ? 'image/*' : 'text/html,application/json,text/plain' },
      lookup: ((_host: string, options: { all?: boolean }, cb: (...args: unknown[]) => void) => options.all ? cb(null, [address]) : cb(null, address.address, address.family)) as never,
    }, response => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode ?? 0) && response.headers.location) {
        response.resume()
        fetchPublic(new URL(response.headers.location, url).href, { ...options, redirects: (options.redirects ?? 0) + 1 }).then(resolve, reject)
        return
      }
      if (response.statusCode !== 200) { response.resume(); reject(new Error(`Source HTTP ${response.statusCode}`)); return }
      const contentType = String(response.headers['content-type'] ?? '')
      if (!(options.image ? /^image\/(jpeg|png|webp)/ : /text\/html|text\/plain|application\/json/).test(contentType)) { response.resume(); reject(new Error('Unsupported source type')); return }
      const chunks: Buffer[] = []
      let size = 0
      response.on('data', chunk => { size += chunk.length; if (size > (options.image ? 8_000_000 : 2_000_000)) request.destroy(new Error('Source too large')); else chunks.push(chunk) })
      response.on('end', () => resolve({ body: Buffer.concat(chunks), url: url.href, contentType }))
      response.on('error', reject)
    })
    request.setTimeout(20_000, () => request.destroy(new Error('Source timeout')))
    const timer = setTimeout(() => request.destroy(new Error('Source total timeout')), 25_000)
    request.on('close', () => clearTimeout(timer))
    request.on('error', reject)
  })
}
export function plainText(html: string) {
  return html.replace(/<(script|style|nav|footer|header)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => Number(n) <= 0x10ffff ? String.fromCodePoint(Number(n)) : '')
    .replace(/\s+/g, ' ').trim()
}
