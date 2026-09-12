import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const module = process.env.LIGHTHOUSE_MODULE;
const { default: lighthouse } = await import(module ? pathToFileURL(module).href : 'lighthouse');
const base = process.env.ARTISAN_TEST_ORIGIN || 'http://localhost:3102';
await mkdir('artifacts/artisan-qa', { recursive: true });
// Managing Chrome ourselves avoids a chrome-launcher temporary-directory cleanup error on Windows.
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--remote-debugging-port=9225'] });
const reports = [];
try {
  for (const run of [{ slug: '', device: 'mobile' }, { slug: 'plombier', device: 'mobile' }, { slug: '', device: 'desktop' }]) {
    const path = `/artisan${run.slug ? `/${run.slug}` : ''}`;
    const flags = { port: 9225, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] };
    if (run.device === 'desktop') Object.assign(flags, { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1440, height: 960, deviceScaleFactor: 1, disabled: false } });
    const result = await lighthouse(`${base}${path}`, flags);
    await writeFile(`artifacts/artisan-qa/lighthouse-${run.slug || 'hub'}-${run.device}.json`, result.report);
    const summary = { path, device: run.device, scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([key, category]) => [key, Math.round(category.score * 100)])), lcp: result.lhr.audits['largest-contentful-paint'].displayValue, cls: result.lhr.audits['cumulative-layout-shift'].displayValue, failedAudits: Object.entries(result.lhr.audits).filter(([, audit]) => audit.score !== null && audit.score < 1).map(([id, audit]) => ({ id, title: audit.title, score: audit.score })) };
    reports.push(summary); console.log(JSON.stringify(summary));
  }
} finally { await browser.close(); }
await writeFile('artifacts/artisan-qa/lighthouse-summary.json', JSON.stringify(reports, null, 2));
