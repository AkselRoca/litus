import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.ARTISAN_TEST_ORIGIN || 'http://localhost:3102';
const slugs = ['', 'plombier', 'electricien', 'chauffagiste-climatisation', 'couvreur', 'menuisier', 'peintre', 'carreleur', 'macon', 'paysagiste', 'renovation-interieure'];
const sizes = [{ name: 'desktop', width: 1440, height: 960 }, { name: 'tablet', width: 834, height: 1112 }, { name: 'mobile', width: 390, height: 844 }];
await mkdir('artifacts/artisan-qa', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const size of sizes) {
    const context = await browser.newContext({ viewport: { width: size.width, height: size.height }, colorScheme: 'light', reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.route('**/api/track', route => route.abort());
    for (const slug of slugs) {
      const errors = [];
      const onError = error => errors.push(error.message);
      page.on('pageerror', onError);
      const path = `/artisan${slug ? `/${slug}` : ''}`;
      const response = await page.goto(`${base}${path}`, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const refuse = page.getByRole('button', { name: /^(Tout refuser|Refuser|Continuer sans accepter|Essentiels uniquement)$/i });
      if (await refuse.count()) await refuse.first().click();
      const main = page.locator('.trade-page');
      const height = await main.evaluate(element => element.getBoundingClientRect().height);
      for (let y = 0; y < height; y += size.height) { await page.evaluate(y => window.scrollTo(0, y), y); await page.waitForTimeout(65); }
      await page.waitForFunction(() => [...document.querySelectorAll('.trade-page img')].every(image => image.complete), { timeout: 15000 });
      const layout = await page.evaluate(() => {
        const root = document.querySelector('.trade-page');
        const overflow = [...root.querySelectorAll('h1,h2,h3,p,a,img,summary')].filter(element => {
          const r = element.getBoundingClientRect(); return r.width > 0 && (r.left < -2 || r.right > window.innerWidth + 2);
        }).map(element => ({ tag: element.tagName, text: element.textContent?.slice(0, 60), rect: element.getBoundingClientRect().toJSON() }));
        return { viewport: window.innerWidth, documentWidth: document.documentElement.scrollWidth, overflow, brokenImages: [...root.querySelectorAll('img')].filter(image => !image.naturalWidth).map(image => image.currentSrc) };
      });
      const summary = page.locator('.trade-faq summary').first();
      await summary.focus(); await page.keyboard.press('Enter');
      const opens = await summary.evaluate(element => element.parentElement.open);
      await page.keyboard.press('Enter');
      if (!opens) errors.push('FAQ keyboard interaction failed');
      if (layout.overflow.length || layout.documentWidth > size.width + 2) errors.push('Horizontal overflow');
      if (layout.brokenImages.length) errors.push('Broken images');
      if (response.status() !== 200) errors.push(`HTTP ${response.status()}`);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `artifacts/artisan-qa/${slug || 'hub'}-${size.name}.png` });
      if ((!slug && size.name === 'desktop') || (slug === 'plombier' && size.name === 'mobile')) await page.screenshot({ path: `artifacts/artisan-qa/${slug || 'hub'}-${size.name}-full.png`, fullPage: true });
      results.push({ path, size: size.name, status: response.status(), ...layout, errors });
      console.log(`${errors.length ? 'FAIL' : 'PASS'} ${path} ${size.name}${errors.length ? `: ${errors.join(', ')}` : ''}`);
      page.removeListener('pageerror', onError);
    }
    await context.close();
  }
} finally { await browser.close(); }
await writeFile('artifacts/artisan-qa/responsive.json', JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2));
const failed = results.filter(result => result.errors.length);
console.log(JSON.stringify({ checked: results.length, failed }, null, 2));
if (failed.length) process.exitCode = 1;
