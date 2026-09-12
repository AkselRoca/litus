import { JSDOM } from 'jsdom';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.ARTISAN_TEST_ORIGIN || 'http://localhost:3102';
const slugs = ['plombier', 'electricien', 'chauffagiste-climatisation', 'couvreur', 'menuisier', 'peintre', 'carreleur', 'macon', 'paysagiste', 'renovation-interieure'];
const paths = ['/artisan', ...slugs.map(slug => `/artisan/${slug}`)];
const reports = [], failures = [];
const titles = new Set(), descriptions = new Set(), internal = new Set();
for (const path of paths) {
  const response = await fetch(`${base}${path}`);
  const { document } = new JSDOM(await response.text()).window;
  const main = document.querySelector('.trade-page');
  const errors = [];
  const assert = (condition, message) => { if (!condition) errors.push(message); };
  assert(response.status === 200, `HTTP ${response.status}`);
  assert(document.querySelectorAll('h1').length === 1, 'Exactly one H1 required');
  const title = document.title, description = document.querySelector('meta[name="description"]')?.content;
  assert(title && !titles.has(title), 'Missing or duplicate title'); titles.add(title);
  assert(description && !descriptions.has(description), 'Missing or duplicate description'); descriptions.add(description);
  assert(document.querySelector('link[rel="canonical"]')?.href === `https://www.litus.fr${path}`, 'Incorrect canonical');
  assert(document.querySelector('meta[property="og:url"]')?.content === `https://www.litus.fr${path}`, 'Incorrect OG URL');
  assert(document.querySelector('meta[property="og:image"]')?.content?.includes('/artisan/'), 'Missing artisan OG image');
  assert(!document.querySelector('meta[name="robots"]')?.content?.includes('noindex'), 'Unexpected noindex');
  assert((main?.querySelectorAll('h2').length ?? 0) >= 5, 'Insufficient section structure');
  assert((main?.querySelectorAll('details').length ?? 0) >= 6, 'Insufficient FAQ');
  const words = main?.textContent?.trim().split(/\s+/).length ?? 0;
  assert(words >= (path === '/artisan' ? 500 : 1100), `Thin SSR content: ${words} words`);
  let graph = [];
  for (const script of main?.querySelectorAll('script[type="application/ld+json"]') ?? []) {
    try { graph.push(...(JSON.parse(script.textContent)['@graph'] ?? [])); } catch { errors.push('Invalid JSON-LD'); }
  }
  for (const type of ['Organization', 'Service', 'BreadcrumbList', 'FAQPage']) assert(graph.some(item => item['@type'] === type), `Missing ${type}`);
  const questions = graph.find(item => item['@type'] === 'FAQPage')?.mainEntity ?? [];
  const details = [...(main?.querySelectorAll('details') ?? [])];
  assert(questions.length === details.length && questions.every((q, i) => details[i]?.textContent.includes(q.name) && details[i]?.textContent.includes(q.acceptedAnswer.text)), 'FAQ schema differs from visible text');
  for (const image of main?.querySelectorAll('img') ?? []) {
    assert(Number(image.width) > 0 && Number(image.height) > 0, 'Image dimensions missing');
    assert(image.alt?.length > 15, 'Unhelpful image ALT');
  }
  for (const link of main?.querySelectorAll('a[href]') ?? []) {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) assert(document.getElementById(href.slice(1)), `Broken anchor ${href}`);
    if (href.startsWith('/')) internal.add(href.split('#')[0]);
  }
  const ids = [...(main?.querySelectorAll('[id]') ?? [])].map(element => element.id);
  assert(ids.length === new Set(ids).size, 'Duplicate DOM IDs');
  if (path === '/artisan') for (const slug of slugs) assert(main?.querySelector(`a[href="/artisan/${slug}"]`), `Missing trade link ${slug}`);
  reports.push({ path, status: response.status, title, description, words, faq: questions.length, errors });
  failures.push(...errors.map(error => `${path}: ${error}`));
  console.log(`${errors.length ? 'FAIL' : 'PASS'} ${path} (${words} SSR words)`);
}
for (const path of internal) {
  const response = await fetch(`${base}${path}`, { redirect: 'manual' });
  if (response.status !== 200) failures.push(`Internal link ${path}: HTTP ${response.status}`);
}
for (const path of ['/artisans', '/artisans/']) {
  const response = await fetch(`${base}${path}?source=test`, { redirect: 'manual' });
  const destination = new URL(response.headers.get('location') || '/', base);
  if (response.status !== 301 || destination.pathname !== '/artisan' || destination.searchParams.get('source') !== 'test') failures.push(`Legacy redirect ${path}: ${response.status} ${destination}`);
}
const unknown = await fetch(`${base}/artisan/metier-inexistant`, { redirect: 'manual' });
if (unknown.status !== 404) failures.push(`Unknown trade must be 404, received ${unknown.status}`);
const sitemapIndex = await (await fetch(`${base}/sitemap.xml`)).text();
const sitemapUrls = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
let sitemap = sitemapIndex;
for (const url of sitemapUrls.filter(url => url.endsWith('.xml'))) sitemap += await (await fetch(`${base}${new URL(url).pathname}`)).text();
for (const path of paths) if (!sitemap.includes(`https://www.litus.fr${path}</loc>`)) failures.push(`Missing canonical sitemap entry ${path}`);
if (sitemap.includes('/artisans</loc>')) failures.push('Legacy hub remains in sitemap');
const robots = await (await fetch(`${base}/robots.txt`)).text();
if (/Disallow:\s*\/artisan(?:\s|\/|$)/i.test(robots)) failures.push('Artisan pages blocked by robots.txt');
await mkdir('artifacts/artisan-qa', { recursive: true });
await writeFile('artifacts/artisan-qa/seo.json', JSON.stringify({ base, checkedAt: new Date().toISOString(), reports, internalLinksChecked: internal.size, failures }, null, 2));
console.log(JSON.stringify({ pages: paths.length, internalLinks: internal.size, failures }, null, 2));
if (failures.length) process.exitCode = 1;
