import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const policy = JSON.parse(readFileSync(new URL('../src/lib/seo/legacy-urls.json', import.meta.url), 'utf8'))
const base = process.argv[2] || 'http://localhost:3101'
const failures = []
let checked = 0
const request = (path, options = {}) => fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(15000), ...options })
async function check(label, work) {
  try { await work(); checked++; console.log(`PASS ${label}`) }
  catch (error) { failures.push({ label, message: error.message }); console.error(`FAIL ${label}: ${error.message}`) }
}

await check('mapping: exact sources, no loops, no homepage fallback', async () => {
  const sources = new Set(policy.redirects.map(row => row.source))
  assert.equal(sources.size, policy.redirects.length)
  for (const { source, destination } of policy.redirects) {
    assert.notEqual(destination, '/')
    assert(!sources.has(new URL(destination, base).pathname), `Redirect chain at ${source}`)
    assert(!policy.gone.includes(source), `Retired URL also redirected: ${source}`)
  }
})

for (const { source, destination } of policy.redirects) {
  for (const suffix of ['', '/']) await check(`301 ${source}${suffix}`, async () => {
    const response = await request(`${source}${suffix}?utm_source=legacy-audit&probe=1`)
    assert.equal(response.status, 301)
    const location = new URL(response.headers.get('location'), base)
    const expected = new URL(destination, base)
    assert.equal(location.pathname, expected.pathname)
    assert.equal(location.hash, expected.hash)
    assert.equal(location.searchParams.get('utm_source'), 'legacy-audit')
    assert.equal(location.searchParams.get('probe'), '1')
  })
}

for (const source of policy.gone) {
  for (const suffix of ['', '/']) await check(`410 ${source}${suffix}`, async () => {
    let response = await request(`${source}${suffix}`)
    if (suffix && response.status === 308) response = await request(response.headers.get('location'))
    assert.equal(response.status, 410)
    assert.match(response.headers.get('x-robots-tag') ?? '', /noindex/)
    assert.match(await response.text(), /CONTENU RETIRÉ/)
  })
}

for (const path of policy.noindex.filter(path => path !== '/contenu-retire')) await check(`noindex ${path}`, async () => {
  const response = await request(path)
  assert.equal(response.status, 200)
  assert.match(response.headers.get('x-robots-tag') ?? '', /noindex/)
  const html = await response.text()
  assert.match(html, /<meta name="robots" content="noindex, follow"/)
  assert.match(html, /<meta name="googlebot" content="noindex, follow"/)
  if (path === '/politique-confidentialite') assert.match(html, /id="cookies"/)
})

await check('sitemap excludes redirects, retired pages and legal pages', async () => {
  const response = await request('/sitemap-0.xml')
  assert.equal(response.status, 200)
  const xml = await response.text()
  const paths = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname))
  for (const path of [...policy.noindex, ...policy.gone, ...policy.redirects.map(row => row.source)]) assert(!paths.has(path), path)
})

await check('robots allows crawlers to read legal noindex', async () => {
  const response = await request('/robots.txt')
  const text = await response.text()
  for (const path of policy.noindex) assert(!text.includes(`Disallow: ${path}`), path)
})

// Verify destination availability last: a pre-existing compilation failure on a
// destination must not hide the results of the independent routing assertions.
for (const path of new Set(policy.redirects.map(row => new URL(row.destination, base).pathname))) await check(`destination ${path}`, async () => {
  const response = await request(path)
  assert.equal(response.status, 200)
})

console.log(JSON.stringify({ checked, failures }, null, 2))
process.exitCode = failures.length ? 1 : 0
