# Inventaire des routes et menu Expertises

> Archive de l’audit initial du 9 septembre. Le menu a depuis été migré vers treize pages distinctes, sans ancres. L’état courant et les nouvelles pages sont documentés dans [Navigation et prestations — septembre 2026](navigation-prestations-2026-09.md). Les destinations avec fragments décrites ci-dessous sont conservées uniquement comme historique.

Audit du 9 septembre 2026, depuis les fichiers `src/app/**/page.tsx` et `src/app/**/route.ts`. Les ressources et les études de cas utilisent des routes dynamiques : leur présence dans cet inventaire ne publie aucun contenu en base.

## Inventaire complet des pages

38 motifs de pages : 24 pages ou motifs publics (21 statiques, 3 dynamiques), 13 pages d’administration et une connexion à l’administration.

| Famille | Routes présentes |
| --- | --- |
| Accueil et agence | `/`, `/a-propos` |
| Implantations | `/agence-web-lorient`, `/agence-web-le-mans` |
| Expertises | `/creation-site-internet`, `/creation-site-ecommerce`, `/seo-local`, `/google-ads`, `/creation-application-web`, `/automatisation`, `/creation-outils-ia` |
| Publics accompagnés | `/artisans`, `/pme`, `/grands-comptes`, `/collectivites` |
| Réalisations | `/realisations`, `/realisations/[slug]` |
| Éditorial et ressources | `/blog`, `/blog/[slug]`, `/ressources/[magnet]` |
| Contact et tarifs | `/contact`, `/tarifs` |
| Informations légales | `/mentions-legales`, `/politique-confidentialite` |
| Connexion | `/login-admin` |
| Administration générale | `/admin`, `/admin/analytics`, `/admin/leads`, `/admin/market-analysis`, `/admin/media`, `/admin/settings`, `/admin/settings/team` |
| Administration éditoriale | `/admin/blog`, `/admin/blog/new`, `/admin/blog/[id]` |
| Administration des projets | `/admin/portfolio`, `/admin/portfolio/new`, `/admin/portfolio/[id]` |

La page `/creation-outils-ia` est créée dans la même intervention par l’agent principal. Les six autres pages d’expertise existaient avant ce travail.

`next.config.ts` ne déclare aucune redirection. Il n’existe donc pas de route `/e-commerce`, `/creation-site-web`, `/services` ni de page autonome `/ressources`. Le menu utilise les chemins réels ci-dessus. Aucune page vide n’a été créée pour les sujets développement, intégrations, refonte ou landing pages.

### Routes dynamiques

- `/blog/[slug]` résout les articles publiés via `src/lib/blog/articles.ts` : les brouillons ne deviennent pas des entrées de menu.
- `/realisations/[slug]` résout les projets visibles et les cas statiques explicitement définis. Les destinations des projets restent gérées par les données portfolio.
- `/ressources/[magnet]` résout uniquement `checklist-gmb`, `guide-prix` et `audit-productivite`, définis dans `src/components/lead-magnets/config.ts`. Les autres valeurs aboutissent à `notFound()`.

## Inventaire des endpoints

35 motifs API, inventoriés depuis les fichiers uniquement. Aucun endpoint de migration, administration, export, diagnostic ou initialisation n’a été appelé dans cet audit.

```text
/api/admin/analytics
/api/admin/blog
/api/admin/blog/[id]
/api/admin/config
/api/admin/dashboard/stats
/api/admin/leads
/api/admin/leads/[id]
/api/admin/leads/export
/api/admin/market-analysis
/api/admin/market-analysis/[id]
/api/admin/media
/api/admin/media/[id]
/api/admin/media/migrate-portfolio
/api/admin/portfolio/[id]
/api/admin/portfolio/reorder
/api/admin/team
/api/admin/team/[id]
/api/auth/[...nextauth]
/api/config
/api/contact
/api/debug-config
/api/debug-db
/api/estimator
/api/export-data
/api/lead-magnet
/api/market-analysis
/api/migrate-analytics
/api/migrate-lead-crm
/api/migrate-schema
/api/newsletter
/api/rescue
/api/seed
/api/setup-db
/api/test-analysis
/api/track
```

## Destinations du menu et justification éditoriale

Les menus desktop et mobile consomment directement `expertiseGroups` depuis `src/lib/expertises.ts`. Les 13 URL complètes sont distinctes ; plusieurs entrées peuvent rejoindre une même page lorsqu’elles ciblent des sections différentes et réellement présentes.

| Colonne | Entrée | Destination | Contenu correspondant |
| --- | --- | --- | --- |
| Web & e-commerce | Création de site internet | `/creation-site-internet` | Conception d’un site vitrine, parcours de contact, méthode et tarifs. |
| Web & e-commerce | E-commerce | `/creation-site-ecommerce` | Boutique, catalogue et expérience d’achat. |
| Web & e-commerce | Landing pages | `/creation-site-internet#landing-pages` | Section existante « Votre site devient votre meilleur commercial », explicitement consacrée au parcours site vitrine ou landing page. |
| Web & e-commerce | Refonte de site | `/creation-site-internet#refonte` | Section existante consacrée aux problèmes d’un site dépassé ou mal optimisé. |
| Acquisition & visibilité | Référencement naturel SEO | `/seo-local` | Page de référencement : contenu, technique, popularité et suivi. |
| Acquisition & visibilité | Google Ads | `/google-ads` | Campagnes, ciblage, parcours de conversion et suivi. |
| Acquisition & visibilité | SEO local | `/seo-local#referencement-local` | Bloc existant sur les recherches locales et le périmètre Lorient, Vannes, Le Mans ; ajout de l’identifiant uniquement. |
| Acquisition & visibilité | Google Business Profile | `/seo-local#google-business-profile` | Carte existante « Google Maps (GMB) », consacrée aux avis, photos et horaires ; ajout de l’identifiant uniquement. |
| Développement & IA | Application web sur mesure | `/creation-application-web` | CRM, ERP, espace client, SaaS et application métier. |
| Développement & IA | Développement web sur mesure | `/creation-application-web#developpement-sur-mesure` | Bloc existant « Votre métier est unique, votre logiciel doit l’être aussi », développement adapté aux processus ; ajout de l’identifiant uniquement. |
| Développement & IA | Intégrations & API | `/automatisation#integrations-api` | Carte existante consacrée aux connexions entre un CRM métier, son API et le site internet ; ajout de l’identifiant uniquement. |
| Développement & IA | Automatisation | `/automatisation` | Scénarios Make, Zapier, n8n, CRM, notifications, devis et facturation. |
| Développement & IA | Création d’outils IA | `/creation-outils-ia` | Nouvelle page dédiée aux assistants et outils IA pour les équipes, créée par l’agent principal. |

Les textes de ces pages n’ont pas été réécrits pour fabriquer des destinations. Les formulations du menu décrivent les prestations sans reprendre les statistiques ou garanties des anciens blocs.

`ServicePageTemplate` accepte désormais le champ optionnel `features[].id`, transmis au composant `Card` HTML existant. Les deux ancres de cartes ciblent ainsi un élément HTML, et non une icône SVG que la navigation cliente Next.js ne faisait pas défiler. Aucun élément visible supplémentaire n’est ajouté.

## Comportement et présentation

- Trois colonnes : quatre liens Web, quatre Acquisition et cinq Développement/IA.
- Titres, descriptions courtes et icônes orange ; suppression de l’ancienne illustration et de sa statistique décorative « +125 % ».
- Une bande de contact discrète en bas, sans duplication d’une URL d’expertise.
- Même catalogue et même composant de lien sur mobile, regroupés sous les mêmes trois intitulés.
- Le logo, les textes, les liens et les dimensions du header fermé sont conservés.
- `isExpertisePath()` utilise les chemins réels du catalogue : Automatisation et Création d’outils IA activent désormais l’entrée Expertises.
- Ouverture au survol avec délai de fermeture de 180 ms ; les déplacements jusqu’au dernier lien sont possibles sans fermeture intempestive.
- Clic, Entrée et Espace ouvrent ou ferment le panneau. Flèche bas/haut depuis le bouton place le focus au premier/dernier lien. Tabulation suit l’ordre naturel et ferme le panneau lorsqu’on en sort.
- Échap ferme le panneau et replace le focus sur son bouton. Les liens des panneaux fermés sont `inert`.
- Le menu mobile verrouille le défilement de la page et boucle la tabulation dans le panneau ; fermeture avec Échap, croix ou clic sur le fond.
- Fonds opaques dans les deux thèmes, menu desktop défilable dans les petites hauteurs, pied du panneau et CTA mobile accessibles.

## Vérifications

- ESLint ciblé : `src/components/layout/Header.tsx` et `src/lib/expertises.ts`, réussi.
- Desktop : 1920×1080, 1440×1000, 1280×900 et 1180×700.
- Mobile/tablette : 1024×900, 768×1024, 390×844 et 320×740.
- Aux huit formats : 13 liens, mêmes destinations et catégories, aucune URL exacte en double, aucun texte coupé horizontalement, aucun débordement horizontal ni erreur JavaScript.
- Survol jusqu’au dernier lien, Échap, restitution du focus, Flèche bas, Tab sortant du panneau, boucle Tab/Maj+Tab mobile et restauration du défilement vérifiés dans Edge/Playwright.
- Passage d’un panneau parcouru au clavier vers un autre panneau survolé vérifié : le focus suit le nouveau bouton avant que l’ancien panneau devienne inerte.
- Mode sombre vérifié sur l’accueil : fond opaque `rgb(32, 43, 55)` et titres lisibles.
- Les six ancres sont présentes et vérifiées en navigation locale. Les clics Next Link vers les cartes API et Google Business Profile ont été retestés à 1440 et 390 px : cible HTML affichée à environ 105–110 px du haut, sous le header compact de 70–72 px ; menu fermé et défilement de page restauré.
- `/creation-outils-ia` répond HTTP 200. Navigation depuis le menu desktop et mobile vérifiée : bon H1, menu refermé, aucun débordement et entrée Expertises active. L’état actif a également été vérifié sur `/automatisation`.
- Les sept routes principales d’expertise répondent HTTP 200.
- Aucun build, redémarrage de serveur ou écriture en base effectué par ce sous-travail. `/api/track` est simulé dans les vérifications navigateur.

Scripts et captures de contrôle temporaires : `.tmp/qa-expertises-menu.cjs`, `.tmp/expertises-menu-qa.json`, `.tmp/expertises-desktop-1440.png`, `.tmp/expertises-mobile-320.png`, `.tmp/expertises-mobile-development-320.png`.
