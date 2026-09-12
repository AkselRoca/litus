import assert from 'node:assert/strict'

const base = process.argv[2] || 'http://127.0.0.1:3100'
const pages = ['/blog', '/blog-sitemap.xml', '/api/cron/editorial', '/api/admin/editorial', '/api/admin/blog', '/api/debug-config']
for (const path of pages) {
  const response = await fetch(new URL(path, base))
  const text = await response.text()
  if (path.startsWith('/api/')) assert.equal(response.status, 401, `${path}: anonymous access must be denied`)
  else assert.equal(response.status, 200, path)
  if (path === '/blog') {
    assert.equal((text.match(/<h1\b/g) || []).length, 1)
    assert.match(text, /rel="canonical"[^>]+href="https:\/\/litus.fr\/blog"/)
    assert.match(text, /Build 1\.03\.a/)
    assert.match(text, /Pagination des articles/)
  }
  if (path === '/blog-sitemap.xml') {
    assert.match(text, /<urlset/)
    assert.match(text, /<lastmod>/)
    assert.ok(!text.includes('/admin/') && !text.includes('/api/'))
    const url = text.match(/<loc>(.*?)<\/loc>/)?.[1]
    assert.ok(url)
    const article = await fetch(new URL(new URL(url).pathname, base))
    assert.equal(article.status, 200)
    const html = await article.text()
    assert.equal((html.match(/<h1\b/g) || []).length, 1)
    assert.match(html, /property="og:type" content="article"/)
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1])).flat()
    assert.ok(schemas.some(s => s['@type'] === 'BlogPosting'))
    assert.ok(schemas.some(s => s['@type'] === 'BreadcrumbList'))
    console.log(`Article rendering: HTTP 200, unique H1, canonical, Open Graph, valid BlogPosting + BreadcrumbList`)
  }
  console.log(`${path}: ${response.status}, assertions passed`)
}
if (process.env.CRON_SECRET) {
  const response = await fetch(new URL('/api/admin/editorial?mode=test', base), { headers: { Authorization: `Bearer ${process.env.CRON_SECRET}` } })
  assert.equal(response.status, 200)
  const data = await response.json()
  assert.ok(data.items.every(i => i.status !== 'PUBLISHED' && i.publishedAt === null), 'Private test must never publish')
  console.log(`Private calendar: ${data.items.length} items; zero public test publications`)
}
