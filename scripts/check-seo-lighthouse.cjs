const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { createRequire } = require('node:module');
const runtime = process.env.BROWSER_RUNTIME || 'C:/Users/Admin/AppData/Local/npm-cache/_npx/75c49ef874578a53/node_modules';
const { chromium } = createRequire(path.join(runtime, 'package.json'))('playwright');
const base = process.argv[2] || 'http://localhost:3100';
const dir = process.argv[3] || 'artifacts/seo-global-after-local';
const routes = process.argv.slice(4);
(async () => {
  const { default: lighthouse } = await import(pathToFileURL(path.join(runtime, 'lighthouse/core/index.js')).href);
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--remote-debugging-port=9225'] });
  const results = [];
  try {
    for (const route of routes.length ? routes : ['/', '/contact', '/expertise', '/realisations', '/association', '/seo-local']) {
      const { lhr } = await lighthouse(base + route, { port: 9225, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'seo'], formFactor: 'mobile', screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false } });
      fs.writeFileSync(path.join(dir, `lighthouse-${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}.json`), JSON.stringify(lhr));
      const result = { path: route, scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])), lcp: lhr.audits['largest-contentful-paint'].numericValue, cls: lhr.audits['cumulative-layout-shift'].numericValue, tbt: lhr.audits['total-blocking-time'].numericValue, failures: Object.entries(lhr.audits).filter(([, a]) => a.score !== null && a.score < 1 && a.scoreDisplayMode === 'binary').map(([key, a]) => ({ id: key, title: a.title })) };
      results.push(result);
      console.log(JSON.stringify(result));
    }
    fs.writeFileSync(path.join(dir, 'lighthouse-summary.json'), JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
