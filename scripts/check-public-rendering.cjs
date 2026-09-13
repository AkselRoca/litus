/* Audit the rendered public routes without submitting forms or changing data. */
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const runtime = process.env.BROWSER_RUNTIME || 'C:/Users/Admin/AppData/Local/npm-cache/_npx/75c49ef874578a53/node_modules';
const { chromium } = createRequire(path.join(runtime, 'package.json'))('playwright');
const base = process.argv[2] || 'http://localhost:3100';
const dir = process.argv[3] || 'artifacts/seo-global-after-local';
const report = JSON.parse(fs.readFileSync(path.join(dir, 'report.json'), 'utf8'));
const routes = report.pages.filter(p => p.status === 200 && !p.robots.includes('noindex')).map(p => p.path);
const screenshots = new Set(['/', '/contact', '/expertise', '/realisations', '/association', '/seo-local', '/grands-comptes']);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  try {
    for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 1000 }]) {
      const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
      await context.addInitScript(() => localStorage.setItem('cookie-consent', JSON.stringify({ essential: true, analytics: false, marketing: false })));
      let next = 0;
      await Promise.all(Array.from({ length: 3 }, async () => {
        const page = await context.newPage();
        let errors = [];
        page.on('pageerror', e => errors.push(e.message));
        while (next < routes.length) {
          const route = routes[next++];
          errors = [];
          try {
            const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 25000 });
            await page.evaluate(() => document.fonts.ready);
            await page.waitForTimeout(400);
            const data = await page.evaluate(() => {
              const visible = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
              const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(e => ({ level: +e.tagName.slice(1), text: e.textContent.trim() }));
              const overflow = document.documentElement.scrollWidth - innerWidth;
              const overflowElements = overflow > 2 ? [...document.querySelectorAll('main *')].filter(e => visible(e) && e.getBoundingClientRect().right > innerWidth + 2).slice(0, 8).map(e => ({ tag: e.tagName, class: String(e.className).slice(0, 100) })) : [];
              const brokenImages = [...document.images].filter(e => visible(e) && e.getBoundingClientRect().top < innerHeight && e.complete && e.naturalWidth === 0).map(e => e.currentSrc || e.src);
              const ids = [...document.querySelectorAll('[id]')].map(e => e.id);
              const links = [...document.querySelectorAll('a[href*="#"]')].map(e => e.getAttribute('href'));
              const main = document.querySelector('main');
              return { title: document.title, headings, overflow, overflowElements, brokenImages, ids, links, mainVisible: Boolean(main && visible(main)), mainCount: document.querySelectorAll('main').length, formTop: document.querySelector('.contact-form-card')?.getBoundingClientRect().top, h1Top: document.querySelector('h1')?.getBoundingClientRect().top };
            });
            results.push({ path: route, width: viewport.width, status: response.status(), ...data, errors: [...errors] });
            if (screenshots.has(route)) await page.screenshot({ path: path.join(dir, `render-${viewport.width}-${route === '/' ? 'home' : route.slice(1)}.png`), fullPage: route === '/contact' });
          } catch (error) { results.push({ path: route, width: viewport.width, error: error.message }); }
          if (results.length % 25 === 0) console.log(`Rendered ${results.length}/${routes.length * 2}`);
        }
        await page.close();
      }));
      await context.close();
    }
    const idMap = new Map(results.filter(p => p.ids).map(p => [p.path, new Set(p.ids)]));
    const fragments = [];
    for (const p of results.filter(p => p.width === 1440 && p.links)) for (const href of p.links) {
      try {
        const url = new URL(href, base + p.path);
        if (![new URL(base).hostname, 'litus.fr', 'www.litus.fr'].includes(url.hostname) || !url.hash || url.hash === '#') continue;
        const ids = idMap.get(url.pathname);
        if (ids && !ids.has(decodeURIComponent(url.hash.slice(1)))) fragments.push({ from: p.path, href });
      } catch {}
    }
    fs.writeFileSync(path.join(dir, 'rendered.json'), JSON.stringify({ results, fragments }, null, 2));
    console.log(JSON.stringify({ checked: results.length, errors: results.filter(p => p.error || p.errors?.length || p.overflow > 2 || p.brokenImages?.length || p.mainCount !== 1).map(({ ids, links, headings, ...p }) => p), fragments }, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
