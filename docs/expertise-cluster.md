# Cluster des expertises technologiques Litus

Version de livraison : 1.04.a. Recherche : 12 septembre 2026.

## Architecture et direction artistique

Le projet conserve Next.js App Router, le rendu serveur, Inter, la grille 1280 px et les tokens creme / bleu nuit / orange de Litus. Reutilisation de ServiceHero, BusinessSectionHeading, ServiceReveal, boutons, FAQ details/summary et composants de service. Aucune nouvelle dependance.

Routes : `/expertise`, puis `/expertise/react`, `/expertise/typescript`, `/expertise/tailwind`, `/expertise/framer`, `/expertise/vercel`, `/expertise/stripe`, `/expertise/shopify`, `/expertise/wordpress`. Les routes inconnues retournent 404. Generation statique des huit contenus, sans requete de base de donnees pour ces pages.

Les contenus sont distincts, dans trois fichiers thematiques. Les sections constituent une union typee : diagnostic, cartes, workflow, prose, code et choix. La composition change selon l'intention, plutot qu'un texte identique decline par technologie.

Le bandeau conserve ses 25 outils. Seuls les huit outils demandes recoivent une page dediee ; son titre ouvre le hub. Les liens clones du marquee sont exclus du clavier. La navigation au clavier arrete le mouvement et rend la liste parcourable. Le footer ajoute uniquement le hub, sans liste artificielle de liens. Les services site vitrine, e-commerce et developpement ajoutent des entrees contextuelles. Chaque page relie services, technologies complementaires, guide existant, pages Lorient/Le Mans et contact avec objet preselectionne.

## Recherche Google et intentions

Huit recherches effectuees dans Google, interface francaise, region France. Les titres, extraits, questions et recherches associees ont ete lus apres chargement. Les publicites et apercus IA ne servent pas de preuve technique. Pas de volume de recherche, classement exact ou potentiel commercial chiffre invente. Les observations sont un echantillon de SERP a une date, pas une mesure de positions.

| Page | Requete Google observee | Intention et angle retenus | Observations |
| --- | --- | --- | --- |
| React | agence React optimisation application maintenance | Developpement, reprise, composants et performance d'une interface web | theTribe, Drakkar, ONDEV, Yield Studio ; presence de React Native dans les resultats, d'ou une distinction explicite web/native. |
| TypeScript | expert TypeScript migration JavaScript API | Migration progressive, contrats CRM/API, tsconfig et bugs de maintenance | Documentation officielle, offres backend, discussion Reddit de migration JS/TS ; recherches associees compiler, ts-migrate, verbatimModuleSyntax. |
| Tailwind | agence Tailwind CSS integration responsive | Integration de maquettes, coherence des composants, responsive et migration | Imagile, Digital Unicorn, documentation responsive ; resultats tres pedagogiques, d'ou des exemples d'intervention et de composants. |
| Framer | agence Framer SEO formulaire CMS | Site marketing, CMS, formulaires, acquisition et limites de plateforme | SLASHR, Insign, comparatifs WordPress, question Reddit sur SEO et structures CMS complexes. |
| Vercel | expert Vercel deploiement Cloudflare | Deploiement Next.js, diagnostic build/DNS, couts et exploitation | Documentation Vercel, Cloudflare Community ; questions de deploiement, recherches associees DNS, prix, CDN et Workers. |
| Stripe | integration Stripe webhook abonnement developpeur | Encaissement, abonnements, traitement des evenements et CRM | Documentation Stripe dominante, stripe.dev et tutoriels ; besoin de relier la technique au compte client et a l'exploitation. |
| Shopify | agence Shopify reprise boutique tracking migration | Reprise de boutique, migration WooCommerce, catalogue et acquisition | Adexos, Artich.io, Nateev et guide Shopify ; recherches associees WooCommerce vers Shopify et WordPress vers Shopify. |
| WordPress | depannage WordPress formulaire erreur critique | Depannage, maintenance, formulaire et reprise de site | Maintenance WP, OVH Community, discussions WordPress ; questions reelles sur erreur critique et formulaire sans email. |

Les questions FAQ sont reformulees a partir de ces besoins, de la documentation et des sujets d'assistance. Les questions Google sans rapport commercial (formation React, promesses de revenus Shopify) ne sont pas reprises artificiellement.

Longues traines traitees : re-rendus React et API repetees ; migration JavaScript TypeScript sans tout refaire ; classes Tailwind absentes du build ; formulaire Framer vers CRM ; variable Vercel absente en production ; webhook Stripe recu plusieurs fois ; tracking GA4 Shopify et migration WooCommerce ; erreur critique WordPress apres mise a jour et formulaire qui n'envoie plus.

## Sources et faits sensibles

Toutes les preuves techniques sont issues de documentations primaires, liees directement dans chaque page. Les sites commerciaux observes servent uniquement a comprendre l'intention, jamais de preuve de fonctionnalite. Aucun client, partenariat, certification ou resultat ajoute.

- React : Profiler, Server Components et notes 19.2 sur react.dev. La page ne presente pas 19.2 comme la derniere version. Distinction RSC / SSR et bibliotheque / framework.
- TypeScript : guide de migration JS, Everyday Types, strict et notes 6.0 sur typescriptlang.org. Le typage ne valide pas le JSON a l'execution et ne remplace pas les permissions.
- Tailwind : upgrade-guide, theme, responsive-design, detecting-classes-in-source-files sur tailwindcss.com. Exemple @theme explicitement v4 ; aucun changement de version du site. Contraintes navigateur v4 verifiees.
- Framer : documentation formulaires/webhooks, metadonnees, export et portabilite. Les deux pages officielles d'export se contredisent sur la possibilite d'exporter un site complet au moment de la recherche. Aucun engagement absolu d'export HTML/self-hosting n'est donc affirme. La page distingue donnees exportables, reconstruction et services geres. Framer constructeur distingue de la bibliotheque Motion.
- Vercel : variables, build troubleshooting, Functions, reverse proxies et consumption. Les changements de variables demandent un nouveau deploiement. DNS Cloudflare distingue du reverse proxy ; ni IP universelle ni promesse de cout gratuit.
- Stripe : Checkout, fulfillment, webhooks, subscriptions et customer-management. Confirmation serveur, corps brut et signature, deduplication/idempotence, absence de garantie d'ordre, distinction abonnement/facture et paiement differe.
- Shopify : migration, pixels, GraphQL et disponibilite des passerelles. GraphQL pour nouvelles integrations ; REST historique. Stripe n'est pas une alternative independante a Shopify Payments dans les regions ou ce dernier est disponible, dont la France.
- WordPress : Common Errors, Hardening, plugin/theme conflicts et Site Editor. Theme blocs requis pour les fonctions d'editeur de site concernees. Sauvegarde fichiers/base et restauration distinguees d'un simple plugin de securite.

SEO : [Google Search Central, mises a jour 2026](https://developers.google.com/search/updates) indique la fin du resultat enrichi FAQ a compter du 7 mai 2026 et le retrait de la documentation le 15 juin. Aucune FAQPage ajoutee. BreadcrumbList suit [la documentation Google](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb). WebPage/CollectionPage et Service decrivent le contenu sans promettre un resultat enrichi. Pas de notes, avis ou statistiques inventes.

## Visuels et mouvement

Logos SVG locaux existants de `public/brands`, conserves sans nouvelle revendication de licence ou de partenariat. Les dessins et marques appartiennent a leurs titulaires. Aucun hotlinking, capture tierce ou nouvelle photo de stock.

Visuels originaux HTML/CSS de Litus : interface React filtrable, contrat TypeScript, composants Tailwind avec deux themes, structure CMS Framer, chaine de livraison Vercel, simulation locale Stripe, catalogue fictif Shopify et schema de diagnostic WordPress. Tous sont identifies comme exemples, et ne representent ni un client ni des resultats reels. Aucun faux encaissement ni appel API dans les simulations.

Workflows semantiques en listes, horizontaux sur desktop, verticaux sur tablette/mobile. Les SVG sont legers, sans rasterisation inutile. Logos avec dimensions reservees et lazy loading hors hero. Les animations utilisent ServiceReveal existant et des transitions courtes. Contenu visible avant hydratation ; prefers-reduced-motion respecte.

## Maintenance et validation

Contenu : `src/lib/expertise/content-*.ts`. Catalogue et chemins : `src/lib/expertise/catalog.ts`. Rendu : `src/components/expertise`. CSS scope a `/expertise` ; styles du bandeau et du maillage de services isoles.

Metadata uniques, canonical absolu resolu depuis metadataBase, Open Graph et Twitter. Sitemap des neuf destinations dans next-sitemap ; robots existant compatible. Liens contact utilisant le parametre `objet` deja traite par le formulaire.

Commandes de validation :

```text
npm run test:run -- src/lib/expertise
npm run build
node scripts/expertise-http-qa.mjs http://127.0.0.1:3100
```

Le script HTTP parse la reponse serveur sans executer JavaScript : H1, sections, FAQ, metadata, JSON-LD, liens, images, routes inconnues et sitemap. Il ne remplace pas le controle visuel du navigateur. Les budgets Core Web Vitals necessitent des mesures terrain representatives ; un controle local ne permet pas d'annoncer un INP ou un classement garanti.

Suivre `docs/build-version.md` pour chaque publication. Ce lot est 1.04.a, les correctifs isoles suivants passent a 1.04.b, etc.
