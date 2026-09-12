# Artisan hub and trade pages - build 1.13.a

## Scope

`/artisan` is the canonical hub. `/artisans` and `/artisans/` redirect to it with HTTP 301 while retaining query parameters. Ten server-rendered trade pages are discoverable from the hub, the Solutions menu, the footer and contextual related-trade links.

Each trade has individually written search intentions, commercial priorities, page architecture, qualification questions, SEO/Ads trade-offs, preparation guidance and six FAQs. Shared layout, pricing and process components provide consistency without substituting a trade name in generic copy.

## Research and limitations

Research was carried out on 12 September 2026 using searches combining each trade with creation de site internet, prix, referencement local and Google Ads. Plumbing and electrical searches distinguish urgent calls from planned work. Roofing, painting, tiling and landscaping require visual proof. Joinery needs a distinction between fabrication and installation. HVAC requires separate installation and maintenance journeys. Masonry research disambiguated the trade from the city of Macon. Interior renovation focuses on coordination, scope and project maturity.

Sources consulted for each trade are recorded in `src/lib/artisan/catalog.ts` under `sources`. This is qualitative search-intent research, not verified keyword-volume or ranking data. No ranking, lead volume or project profitability is guaranteed.

Primary reference: https://support.google.com/business/answer/7091?hl=fr

Search spam and doorway guidance: https://developers.google.com/search/docs/essentials/spam-policies?hl=fr

FAQPage structured data describes the visible FAQ. No enhanced search-result display is promised.

## Commercial evidence

Prices derive from the public Litus pricing component: Site Essentiel 99 EUR/month, Visibilite 229 EUR/month, Growth 590 EUR/month. SEO Essentiel starts at 99 EUR/month after an initial site assessment. Google Ads management starts at 129 EUR/month excluding Google media spend. Scope and duration remain subject to the quote; no unsupported tax status or fixed custom-project quote is added.

Portfolio references derive from the existing portfolio catalog. SARL Pean J is explicitly a Google Ads case, not a website creation reference. Its +30 leads/month and approximately 15 EUR/conversion are the client-specific figures supplied by Litus. Trades without a documented matching case show a clearly identified demonstration journey, not fabricated clients or results.

## Photography

Assets are stored in `public/artisan`, in WebP at 1280 x 960. Download sources, authors, licensing, descriptions and compressed sizes are recorded in `public/artisan/credits.json`. Pexels permits website and commercial use: https://www.pexels.com/license/

The workshop photo is the existing CC0 asset. The landscaping image comes from the existing West Clotures portfolio material; it does not attribute the landscaping work itself to Litus. Stock images are illustrations, not photos of Litus clients. Next Image provides responsive delivery; the hero is prioritized, lower images are lazy loaded, and every image has dimensions and a descriptive ALT.

## Validation

Run the production build, then serve it on port 3102 and execute `node scripts/check-artisan-pages.mjs`. This checks all eleven pages, HTTP status, SSR content, unique metadata, canonical and OG URLs, image attributes, FAQ/schema parity, internal links, anchors, sitemap membership, legacy redirects and the unknown-trade 404. Results are written to `artifacts/artisan-qa/seo.json`.

Desktop, tablet and mobile visual checks and Lighthouse measurements supplement these checks. Their actual results are reported at delivery; this document does not pre-claim passing tests or scores.
