import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const runtime = process.env.QA_RUNTIME || 'C:/Users/Admin/AppData/Local/npm-cache/_npx/75c49ef874578a53/node_modules';
const { chromium } = require(runtime + '/playwright');
const { default: lighthouse } = await import(pathToFileURL(runtime + '/lighthouse/core/index.js').href);
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--remote-debugging-port=9225'] });
const base = process.env.QA_BASE || 'http://localhost:3100';
const paths = ['/collectivites', ...['site-internet-mairie', 'refonte-site-collectivite', 'accessibilite-rgaa', 'demarches-en-ligne', 'site-communaute-de-communes'].map(slug => '/collectivites/' + slug)];
const reports = [];
await mkdir('artifacts/collectivites-1.14.a', { recursive: true });
try {
  for (const path of paths) {
    const result = await lighthouse(base + path, { port: 9225, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'seo'], formFactor: 'mobile', screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false } });
    const lhr = result.lhr;
    const entry = { path, scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])), lcp: lhr.audits['largest-contentful-paint'].displayValue, cls: lhr.audits['cumulative-layout-shift'].displayValue, tbt: lhr.audits['total-blocking-time'].displayValue, accessibilityIssues: lhr.categories.accessibility.auditRefs.map(ref => lhr.audits[ref.id]).filter(audit => audit.score === 0).map(audit => ({ id: audit.id, title: audit.title, items: audit.details?.items })) };
    reports.push(entry);
    await writeFile(`artifacts/collectivites-1.14.a/lighthouse-${path.split('/').at(-1)}.json`, JSON.stringify(lhr));
    console.log(JSON.stringify({ ...entry, accessibilityIssues: entry.accessibilityIssues.map(item => ({ id: item.id, items: item.items?.map(node => node.node?.selector || node.node?.snippet) })) }));
  }
} finally { await browser.close(); }
await writeFile('artifacts/collectivites-1.14.a/performance.json', JSON.stringify(reports, null, 2));
