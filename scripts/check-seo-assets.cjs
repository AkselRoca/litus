const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const base = process.argv[2] || 'http://localhost:3100';
const dir = process.argv[3] || 'artifacts/seo-global-after-local';
const report = JSON.parse(fs.readFileSync(`${dir}/report.json`, 'utf8'));
const urls = new Set();
function asset(value) {
  try {
    let url = new URL(value, base);
    if (url.pathname === '/_next/image') url = new URL(url.searchParams.get('url'), base);
    if (['www.litus.fr', 'litus.fr', new URL(base).hostname].includes(url.hostname)) urls.add(url.pathname);
  } catch {}
}
for (const page of report.pages) {
  for (const image of page.images || []) asset(image.src);
  asset(page.og?.image);
}
urls.add('/litus-og-social.png');
urls.add('/brand/litus-mark.webp');
(async () => {
  const pending = [...urls], results = [];
  let next = 0;
  await Promise.all(Array.from({ length: 5 }, async () => {
    while (next < pending.length) {
      const path = pending[next++];
      try {
        const response = await fetch(base + path, { method: 'HEAD', signal: AbortSignal.timeout(15000) });
        results.push({ path, status: response.status, type: response.headers.get('content-type'), size: Number(response.headers.get('content-length')) });
      } catch (error) { results.push({ path, status: 0, error: error.message }); }
    }
  }));
  fs.writeFileSync(`${dir}/assets.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify({ checked: results.length, failures: results.filter(r => r.status !== 200), over500kb: results.filter(r => r.size > 500000) }, null, 2));
})().catch(e => { console.error(e); process.exitCode = 1; });
