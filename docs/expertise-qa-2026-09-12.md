# Expertise cluster: release QA

Release: `1.04.a` | Date: 2026-09-12

## Scope

`/expertise` and the React, TypeScript, Tailwind, Framer, Vercel, Stripe,
Shopify and WordPress detail pages. Research and editorial decisions are
documented in `docs/expertise-cluster.md`.

## Automated checks

- `npm run test:run -- src/lib/expertise`: 37 tests passed.
- `npm run build`: compilation, TypeScript, static generation and sitemap passed.
- Targeted ESLint: expertise content, components, routes, logo strip, HTTP QA
  script and page-transition component passed.
- `node scripts/expertise-http-qa.mjs http://127.0.0.1:3100`: nine routes passed.
- HTTP checks cover server-rendered content without executing scripts, unique
  H1/title/description, canonical and social metadata, JSON-LD, semantic
  sections, internal anchors, image dimensions and footer build number.
- Thirty internal destinations and eight local SVG logos responded correctly.
- Home logo links, duplicate marquee tab order, three service cross-link blocks,
  the nine sitemap entries and an unknown expertise slug were checked.

## Browser checks

- Nine routes at widths 375, 768 and 1440 pixels: no horizontal overflow,
  clipped checked headings/text/links/diagrams or broken images detected.
- Workflows stack vertically at 375 and 768 pixels and use columns at 1440.
- Visual samples inspected: desktop hub, desktop/mobile WordPress,
  mobile Stripe FAQ, desktop Stripe and mobile React without scripts.
- React filters, Tailwind theme switch and Stripe's local-only simulation worked.
- Native FAQ disclosure and in-page navigation worked.
- No browser warning or error was reported during the normal interactive checks.

## Scripts-blocked check

A temporary local proxy forwarded the production build with this response header:

```text
Content-Security-Policy: script-src 'none'; object-src 'none'
```

This blocks all page scripts; it is not a browser-wide JavaScript preference.
The Stripe simulation remained inactive, while native links and FAQ disclosure
remained usable. Simulations are progressive enhancements, not payment requests.

The first visual pass exposed an existing global page-transition wrapper whose
server HTML had `opacity: 0`. `AnimatePresence` now uses `initial={false}` so the
first render is visible without hydration; subsequent client transitions retain
their animation.

After rebuilding, all nine routes were checked at 375 and 1440 pixels. Every
main heading and its ancestors remained visible, with no horizontal overflow or
broken images. Desktop Stripe and mobile React screenshots confirmed painting,
not only presence in the DOM.

## Boundaries

- No real contact request, payment, subscription or CRM mutation was submitted.
- Checks used the available Chromium browser, not a full Safari/Firefox matrix.
- Build warnings about the existing Next.js middleware convention and stale
  Browserslist data were non-blocking and are outside this release's scope.
- Production can be checked with the same HTTP script using
  `https://www.litus.fr` as its base URL after deployment.
