import { JSDOM } from 'jsdom';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.QA_BASE || 'http://localhost:3100';
const canonicalBase = 'https://www.litus.fr';
const paths = ['/collectivites', ...['site-internet-mairie', 'refonte-site-collectivite', 'accessibilite-rgaa', 'demarches-en-ligne', 'site-communaute-de-communes'].map(slug => '/collectivites/' + slug)];
const failures = [], report = [], links = new Set(), images = new Set(), titles = new Set(), descriptions = new Set();
const docs = new Map();
async function getDocument(path) {
  if (!docs.has(path)) {
    const response = await fetch(base + path, { signal: AbortSignal.timeout(30000) });
    docs.set(path, { response, document: new JSDOM(await response.text()).window.document });
  }
  return docs.get(path);
}
for (const path of paths) {
  const { response, document: doc } = await getDocument(path);
  const root = doc.querySelector('.civic-page');
  const fail = message => failures.push(`${path}: ${message}`);
  if (response.status !== 200) fail(`HTTP ${response.status}`);
  if (!root) { fail('missing page content'); continue; }
  if (root.querySelectorAll('h1').length !== 1) fail('H1 count');
  const title = doc.title;
  const description = doc.querySelector('meta[name="description"]')?.content;
  if (!title || titles.has(title)) fail('missing/duplicate title');
  if (!description || descriptions.has(description)) fail('missing/duplicate description');
  titles.add(title); descriptions.add(description);
  if (doc.querySelector('link[rel="canonical"]')?.href !== canonicalBase + path) fail('canonical mismatch');
  if (doc.querySelector('meta[property="og:url"]')?.content !== canonicalBase + path) fail('OG URL mismatch');
  if (!doc.querySelector('meta[property="og:image"]')?.content) fail('missing OG image');
  if (doc.querySelector('meta[name="robots"]')?.content.includes('noindex')) fail('noindex');
  const graph = [...root.querySelectorAll('script[type="application/ld+json"]')].flatMap(script => JSON.parse(script.textContent)['@graph'] || []);
  for (const type of ['Organization', 'WebPage', 'Service', 'BreadcrumbList', 'FAQPage']) if (!graph.some(item => item['@type'] === type)) fail(`missing schema ${type}`);
  const questions = graph.find(item => item['@type'] === 'FAQPage')?.mainEntity || [];
  const details = [...root.querySelectorAll('.civic-faq details')];
  if (questions.length !== details.length || questions.length < 6) fail('FAQ count mismatch');
  for (let i = 0; i < questions.length; i++) if (details[i]?.querySelector('p')?.textContent !== questions[i].acceptedAnswer.text) fail('FAQ text mismatch');
  const ids = [...root.querySelectorAll('[id]')].map(item => item.id);
  if (new Set(ids).size !== ids.length) fail('duplicate IDs');
  for (const anchor of root.querySelectorAll('a[href]')) {
    const href = anchor.getAttribute('href');
    if (href.startsWith('/')) links.add(href);
    if (href.startsWith('#') && !doc.getElementById(href.slice(1))) fail(`missing anchor ${href}`);
  }
  for (const img of root.querySelectorAll('img')) {
    if (!img.hasAttribute('alt') || !Number(img.width) || !Number(img.height)) fail('image alt/dimensions');
    const url = new URL(img.src, base);
    images.add(url.searchParams.get('url') || url.pathname);
  }
  const copy = root.cloneNode(true); copy.querySelectorAll('script,style,svg').forEach(node => node.remove());
  const words = copy.textContent.trim().split(/\s+/).length;
  if (words < 600) fail(`insufficient SSR text ${words}`);
  report.push({ path, status: response.status, title, description, words, faq: questions.length });
}
for (const link of links) {
  const [path, hash] = link.split('#');
  const { response, document } = await getDocument(path);
  if (response.status !== 200) failures.push(`Link ${link}: HTTP ${response.status}`);
  if (hash && !document.getElementById(decodeURIComponent(hash))) failures.push(`Link ${link}: missing anchor`);
}
for (const path of images) {
  const response = await fetch(base + path, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) failures.push(`Image ${path}: HTTP ${response.status}`);
  if (response.ok && !(response.headers.get('content-type') || '').startsWith('image/')) failures.push(`Not an image: ${path}`);
}
const sitemap = await (await fetch(base + '/sitemap-0.xml')).text();
for (const path of paths) if (!sitemap.includes(`<loc>${canonicalBase + path}</loc>`)) failures.push(`Missing sitemap ${path}`);
const robots = await (await fetch(base + '/robots.txt')).text();
if (/Disallow:\s*\/collectivites/.test(robots)) failures.push('collectivites robots exclusion');
const unknown = await fetch(base + '/collectivites/does-not-exist', { redirect: 'manual' });
if (unknown.status !== 404) failures.push(`Unknown page ${unknown.status}`);
await mkdir('artifacts/collectivites-1.14.a', { recursive: true });
await writeFile('artifacts/collectivites-1.14.a/seo.json', JSON.stringify({ base, pages: report, internalLinks: links.size, images: images.size, failures }, null, 2));
console.log(JSON.stringify({ pages: report, internalLinks: links.size, images: images.size, failures }, null, 2));
if (failures.length) process.exitCode = 1;
