import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/Admin/AppData/Local/npm-cache/_npx/75c49ef874578a53/node_modules/playwright');
const base = process.env.QA_BASE || 'http://localhost:3100';
const paths = ['/collectivites', ...['site-internet-mairie', 'refonte-site-collectivite', 'accessibilite-rgaa', 'demarches-en-ligne', 'site-communaute-de-communes'].map(slug => '/collectivites/' + slug)];
const out = 'artifacts/collectivites-1.14.a';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const report = [], failures = [];
try {
  for (const [device, width, height] of [['desktop', 1440, 960], ['tablet', 834, 1112], ['mobile', 390, 844]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const path of paths) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const cookie = page.getByRole('button', { name: 'Essentiels uniquement', exact: true });
      if (await cookie.count() && await cookie.isVisible()) await cookie.click();
      await page.evaluate(async () => { document.documentElement.style.scrollBehavior = 'auto'; for (let y = 0; y < document.body.scrollHeight; y += innerHeight) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => setTimeout(r, 70)); } });
      await page.waitForLoadState('networkidle');
      const root = page.locator('.civic-page');
      const result = await root.evaluate(element => ({
        width: innerWidth,
        overflow: [...element.querySelectorAll('*')].filter(node => { const r = node.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 2 || r.left < -2); }).map(node => node.className?.baseVal ?? node.className).slice(0, 15),
        broken: [...element.querySelectorAll('img')].filter(img => img.getClientRects().length > 0 && (!img.complete || !img.naturalWidth)).map(img => img.src),
      }));
      if (result.overflow.length || result.broken.length) failures.push({ path, device, ...result });
      const faq = root.locator('.civic-faq summary').first();
      await faq.focus(); await page.keyboard.press('Enter');
      if (!await faq.evaluate(el => el.parentElement.open)) failures.push({ path, device, error: 'FAQ keyboard' });
      await page.keyboard.press('Enter');
      const cms = root.locator('.civic-cms');
      if (await cms.count()) {
        await cms.first().getByLabel('Type de publication').selectOption('Alerte');
        await cms.first().getByRole('button', { name: 'Prévisualiser', exact: true }).click();
        if (!await cms.first().locator('.civic-preview').isVisible()) failures.push({ path, device, error: 'CMS preview' });
        await cms.first().getByRole('button', { name: 'Fermer l’aperçu', exact: true }).click();
      }
      if (path === '/collectivites') {
        await root.getByLabel('Rechercher un besoin du quotidien').fill('déchets');
        if (await root.locator('.civic-results li').count() !== 1) failures.push({ device, error: 'search accent' });
        await root.getByLabel('Rechercher un besoin du quotidien').fill('zzzzzz');
        if (!await root.locator('.civic-empty').isVisible()) failures.push({ device, error: 'empty state' });
        await root.getByRole('button', { name: 'Afficher tous les exemples' }).click();
        await root.getByRole('tab', { name: 'Site', exact: true }).focus();
        await page.keyboard.press('End');
        if (await root.getByRole('tab', { name: 'Accessibilité', exact: true }).getAttribute('aria-selected') !== 'true') failures.push({ device, error: 'hero tab keyboard' });
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: `${out}/hero-accessibilite-${device}.jpg`, quality: 75 });
        await page.keyboard.press('Home');
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      const slug = path.split('/').at(-1);
      await page.screenshot({ path: `${out}/${slug}-${device}.jpg`, fullPage: true, quality: 68 });
      report.push({ path, device, ...result });
      console.log(`${device} ${path}: overflow=${result.overflow.length}, images=${result.broken.length}`);
    }
    if (errors.length) failures.push({ device, errors });
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(`${out}/responsive.json`, JSON.stringify({ report, failures }, null, 2));
console.log(JSON.stringify({ checked: report.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
