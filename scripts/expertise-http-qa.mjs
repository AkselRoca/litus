import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'

const base = process.argv[2] || 'http://127.0.0.1:3100'
const slugs = ['nextjs', 'react', 'typescript', 'tailwind', 'framer', 'vercel', 'stripe', 'shopify', 'wordpress']
const urls = ['/expertise', ...slugs.map(slug => `/expertise/${slug}`)]
const seenTitles = new Set()
const seenDescriptions = new Set()
const internal = new Set()
const localAssets = new Set()
const report = []

for (const path of urls) {
  const response = await fetch(new URL(path, base))
  assert.equal(response.status, 200, path)
  // Scripts are not executed: this is the actual server HTML, not a hydrated DOM.
  const dom = new JSDOM(await response.text())
  const document = dom.window.document
  const main = document.querySelector('main')
  assert(main, `${path}: main`)
  assert.equal(main.querySelectorAll('h1').length, 1, `${path}: unique H1`)
  const title = document.title
  const description = document.querySelector('meta[name="description"]')?.content
  assert(title && !seenTitles.has(title), `${path}: unique title`)
  assert(description && !seenDescriptions.has(description), `${path}: unique description`)
  seenTitles.add(title); seenDescriptions.add(description)
  assert.equal(document.querySelector('link[rel="canonical"]')?.href, `https://litus.fr${path}`)
  assert.equal(document.querySelector('meta[property="og:url"]')?.content, `https://litus.fr${path}`)
  assert(document.querySelector('meta[name="twitter:card"]'), `${path}: Twitter`)
  assert(!document.querySelector('meta[name="robots"]')?.content.includes('noindex'), `${path}: indexable`)
  const schemas = [...main.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent))
  assert(schemas.some(schema => schema['@graph']?.some(node => node['@type'] === 'BreadcrumbList')), `${path}: breadcrumb schema`)
  if (path !== '/expertise') {
    assert(main.querySelectorAll('.ex-faq details').length >= 5, `${path}: FAQ in server HTML`)
    assert(main.querySelectorAll('.ex-section').length >= 5, `${path}: completed sections`)
    assert(main.querySelector('.ex-visual'), `${path}: tool illustration`)
    assert(main.querySelector('.ex-workflow ol')?.children.length >= 5, `${path}: semantic workflow`)
    assert(schemas.some(schema => schema['@graph']?.some(node => node['@type'] === 'Service')), `${path}: Service schema`)
  }
  const ids = [...main.querySelectorAll('[id]')].map(node => node.id)
  assert.equal(new Set(ids).size, ids.length, `${path}: unique IDs`)
  for (const link of main.querySelectorAll('a[href]')) {
    const href = link.getAttribute('href')
    if (href.startsWith('#')) assert(document.getElementById(decodeURIComponent(href.slice(1))), `${path}: missing anchor ${href}`)
    else if (href.startsWith('/')) internal.add(href.split('#')[0].split('?')[0])
  }
  for (const img of main.querySelectorAll('img')) {
    assert(img.hasAttribute('alt') && img.getAttribute('width') && img.getAttribute('height'), `${path}: image attributes`)
    if (img.src.startsWith('/')) localAssets.add(img.src)
  }
  assert(document.body.textContent.includes(`Build ${process.env.EXPECTED_BUILD || '1.06.a'}`), `${path}: build`)
  report.push({ path, h1: main.querySelector('h1').textContent, sections: main.querySelectorAll('.ex-section').length, schemas: schemas.length, serverHtml: true })
  dom.window.close()
}

for (const path of new Set([...internal, ...localAssets])) {
  if (urls.includes(path)) continue
  const response = await fetch(new URL(path, base))
  assert(response.ok, `Broken internal destination ${path}: ${response.status}`)
  await response.arrayBuffer()
}
const home = new JSDOM(await fetch(new URL('/', base)).then(response => response.text()))
for (const slug of slugs) assert(home.window.document.querySelector(`.technology-strip a[href="/expertise/${slug}"]`), `Unlinked logo ${slug}`)
assert.equal(home.window.document.querySelectorAll('.technology-track ul[aria-hidden="true"] a:not([tabindex="-1"])').length, 0, 'Duplicate marquee links must not receive keyboard focus')
home.window.close()
for (const service of ['/creation-site-internet', '/creation-site-ecommerce', '/developpement-web-sur-mesure']) {
  const html = await fetch(new URL(service, base)).then(response => response.text())
  assert(html.includes('ex-service-links'), `Missing contextual inbound links: ${service}`)
}
const sitemap = await fetch(new URL('/sitemap-0.xml', base)).then(response => response.text())
for (const path of urls) assert(sitemap.includes(`https://litus.fr${path}</loc>`), `Missing sitemap URL ${path}`)
const unknown = await fetch(new URL('/expertise/inconnue', base))
assert.equal(unknown.status, 404, 'Unknown expertise must return 404')
console.log(JSON.stringify({ base, pages: report, internalDestinationsChecked: internal.size, assetsChecked: localAssets.size, sitemap: true, logoLinks: 9, unknownRoute: 404 }, null, 2))
