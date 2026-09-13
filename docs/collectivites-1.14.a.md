# Collectivites : lot 1.14.a

## Perimetre

Hub /collectivites et cinq pages prioritaires : site-internet-mairie, refonte-site-collectivite, accessibilite-rgaa, demarches-en-ligne, site-communaute-de-communes. Les autres besoins (maintenance, performance, recherche, autonomie) sont traites dans le hub et les pages pertinentes ; pas de pages supplementaires pauvres.

La DA, le header, les CTA et la composition du hero sont conserves. Les quatre onglets du hero n'affectent pas les variantes PME / grands comptes. Les exemples d'interface sont des prototypes Litus sans collecte, sans fausse reference publique ni resultat chiffre. Les anciennes sections ne sont plus montees ; les fichiers non utilises sont preserves.

## Recherche d'intentions, 13 septembre 2026

Recherche web qualitative avant redaction, sans donnees Keyword Planner ni volumes de recherche affirmes.

- Creation site internet mairie / prix / cahier des charges : budget global, autonomie, maintenance, demarches et acces pratique.
- Refonte site collectivite / migration / reprise contenus : inventaire, documents, URLs, validation, continuite et formation.
- Accessibilite RGAA collectivites : methode, audit, declaration, corrections et responsabilites ; pas de certification inventee.
- Demarches en ligne mairie : orientation, services existants, raccordements, traitement des dossiers et accompagnement humain.
- Site communaute de communes : competences effectives, communes, equipements, gouvernance editoriale et architecture multisite justifiee.

Sources sectorielles consultees pour les intentions, sans reprise de leurs textes, prix ou references :

- https://www.hellomairie.fr/ressources/cout-site-internet-mairie
- https://ma-municipalite.fr/blog/cahier-des-charges-site-mairie
- https://sitemairie.fr/tarifs-site-mairie
- https://neologis.fr/portfolio-archive/refonte-site-internet-ville-de-vineuil/
- https://www.vernalis.fr/solutions/refonte-site
- https://www.amf29.asso.fr/wp-content/uploads/2016/10/mapa-document-unique-de-consultation-refonte-du-site-internet.pdf (exemple historique, pas presente comme un marche 2026)
- https://www.lorient-agglo.bzh/ (observation des entrees par services, pas une reference Litus)

## Sources officielles

- https://accessibilite.numerique.gouv.fr/ : RGAA 4.1.2, version 5 annoncee en preparation. Version a reverifier au cadrage/audit, aucune affirmation de conformite 100 %.
- https://accessibilite.numerique.gouv.fr/obligations/evaluation-conformite/
- https://accessibilite.numerique.gouv.fr/obligations/declaration-accessibilite/
- https://accessibilite.numerique.gouv.fr/obligations/schema-pluriannuel/
- https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/
- https://www.cnil.fr/fr/collectivites-territoriales/les-principes-cles-de-la-protection-des-donnees
- https://www.cnil.fr/fr/guide-de-la-securite-des-donnees-personnelles
- https://www.cnil.fr/fr/designer-un-delegue-la-protection-des-donnees-dans-une-collectivite
- https://www.service-public.gouv.fr/P10006 : bouquet mairies, raccordement HubEE selon conditions. Pas de generalisation de l'authentification a toutes les demarches, ni de pretendue habilitation Litus FranceConnect.

Ces pages commerciales ne remplacent ni une analyse juridique par la collectivite/DPO ni un audit RGAA. Les sources utiles sont aussi liees dans les pages. Aucun client public, marche gagne, prix ou score n'a ete invente.

## Images et implementation

Quatre photos Pexels telechargees, redimensionnees sans agrandissement et compressees en WebP. Credits, licence et URLs dans public/collectivites/CREDITS.md. Aucune institution ou personne representee n'est presentee comme cliente ou partenaire. Les images ne sont pas hotlinkees.

Contenus SSR/SSG, cinq slugs explicites, 404 pour les autres, metadata individuelles, canonical www sans slash final (convention existante), Open Graph, graphes WebPage/Service/Organization/BreadcrumbList/FAQPage. FAQ visible et identique au JSON-LD ; l'affichage d'un resultat enrichi Google n'est pas garanti.

Recherche de demonstration locale, pas un moteur global deploye pour une mairie. Selecteur de publication et parcours de demarche purement illustratifs. Les liens renvoient vers les solutions Litus et sont annonces comme tels. Animation de revelation existante reutilisee avec respect du mouvement reduit et contenu visible dans le HTML initial.

## Verification

Scripts dedies au lot : scripts/check-collectivites.mjs et scripts/check-collectivites-visual.mjs. Rapports et captures locaux dans artifacts/collectivites-1.14.a (hors publication). Ces tests techniques ne constituent pas un audit de conformite RGAA.

## Resultats locaux, 13 septembre 2026

- npm run build : reussi, six pages statiques generees.
- SEO : six URLs HTTP 200, 21 liens internes et leurs ancres verifies, images accessibles, canonical/OG individuels, FAQ visible et JSON-LD concordants, sitemap et 404 inconnue verifies.
- Responsive : 18 parcours desktop 1440px, tablette 834px, mobile 390px ; aucun debordement, aucune image visible cassee, FAQ clavier, recherche avec accents, absence de resultats, apercu CMS et onglets clavier testes.
- Lighthouse mobile local (simulation reseau/CPU) : performances 79 a 90, SEO 100 sur les six pages, accessibilite 93 a 94, CLS 0, TBT 10 a 20ms. Ces scores ponctuels ne sont pas des mesures de terrain.
- Contrastes corriges dans le nouveau contenu et le hero Collectivites. Les constats restants portent sur les composants globaux existants : contraste du telephone mobile/header, footer et consentement cookies ; attributs ARIA des etoiles et nom accessible du lien des avis Google. Ils ne sont pas presentes comme corriges dans ce lot.
- Limite : ces controles techniques, clavier et visuels ne sont pas un audit complet RGAA ni une certification. Aucun test exhaustif avec lecteurs d'ecran n'est revendique.
