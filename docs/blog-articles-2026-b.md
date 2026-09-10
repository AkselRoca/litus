# Articles locaux 2026 — lot B

Contenus originaux dans `src/lib/blog/articles-2026-b.ts`, export `articles2026B`. Relecture et vérification documentaire effectuées le **9 septembre 2026**. Les dates de publication ci-dessous sont les dates éditoriales demandées ; `updatedAt` indique la relecture du 9 septembre. Aucun résultat client, tarif, délai commercial, témoignage ou établissement local n’a été inventé.

Les sept articles ciblent le bassin manceau. Le champ de filtre `city` indique la commune précise ou la Sarthe ; le filtre de la page Blog reprend ces localités. Les couvertures sont attribuées séparément par `article-photos.ts`, à partir de photographies autorisées.

## Contrôles éditoriaux

| Slug | Date éditoriale | Mots lisibles | Angle propre |
| --- | --- | ---: | --- |
| `site-internet-pme-le-mans` | 2026-04-12 | 846 | Document de cadrage, responsabilités, critères de réception et comparaison des périmètres |
| `google-ads-allonnes-appels` | 2026-05-02 | 887 | Différence entre clic, appel, demande qualifiée et suite commerciale |
| `seo-local-coulaines` | 2026-05-16 | 888 | Gouvernance des informations et continuité fiche Google → site |
| `landing-page-arnage` | 2026-06-09 | 870 | Décision B2B, adéquation de l’offre et préparation d’un échange commercial |
| `ecommerce-la-chapelle-saint-aubin` | 2026-06-28 | 908 | Organisation du catalogue, du stock et de la préparation pour le retrait magasin |
| `convertir-visiteurs-yvre-leveque` | 2026-07-19 | 892 | Tâche mobile complète, superpositions, transmission du contexte et interruptions |
| `agence-ou-freelance-sarthe` | 2026-09-05 | 906 | Répartition des responsabilités, continuité, accès et coût du périmètre réel |

Comptage sur le texte HTML lisible, en considérant les formes avec apostrophes et traits d’union comme des mots. Chaque article comporte six H2 et deux H3, quatre liens internes utiles dont un CTA `/contact`, et deux liens vers des sources primaires. Aucun H1 dans le corps : le titre est rendu par le template d’article. Les métatitres font 50–57 caractères ; les métadescriptions 139–153 caractères.

Les six articles déjà présents dans `local-articles.ts` ont été relus avant rédaction. Le lot évite de refaire l’audit de fiche Google de Lorient, le diagnostic de refonte du Mans, le ciblage géographique Google Ads, l’arborescence SEO, le formulaire artisan ou la comparaison SEO/Ads. Les nouveaux textes développent des tâches complémentaires. Les exemples de maintenance sont explicitement des illustrations de méthode, sans attribution à un client réel.

## Sources primaires consultées

### PME au Mans — cahier des charges

- [Google Search Central — Guide de démarrage SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr) : contenus utiles, organisés et compréhensibles. Le texte n’en déduit aucun volume de mots-clés ni classement garanti.
- [W3C WAI — Planifier l’accessibilité](https://www.w3.org/WAI/planning-and-managing/plan/) : attribution de responsabilités dans le projet. Les propositions de cahier des charges et de réception sont une méthode éditoriale originale de Litus.

### Allonnes — qualification des appels

- [Google Ads — Suivi des conversions par appel téléphonique](https://support.google.com/google-ads/answer/6100664?hl=fr) : distinction entre clic téléphonique et mesure des appels, conditions de suivi et filtres de durée. Aucun clic n’est présenté comme une conversation certaine.
- [Google Ads — Importer les conversions par appel](https://support.google.com/google-ads/answer/6275629?hl=fr) : rapprochement avec des suites commerciales, sous réserve des conditions et réglages prévus. Le texte ne recommande ni enregistrement des conversations ni import indifférencié de données.

### Coulaines — cohérence fiche et site

- [Google Business Profile — Classement local](https://support.google.com/business/answer/7091?hl=fr) : facteurs de pertinence, distance et notoriété. La cohérence des supports n’est pas présentée comme une garantie de classement.
- [Google Business Profile — Représentation de l’établissement](https://support.google.com/business/answer/3038177?hl=fr) : exactitude de l’identité, distinction entre établissement et zone de services. Aucun bureau fictif à Coulaines n’est suggéré.

### Arnage — landing page B2B

- [Google Ads — Optimiser annonces et pages de destination](https://support.google.com/google-ads/answer/6238826?hl=fr) : continuité de l’expérience après le clic et attention au mobile. L’ancienne ressource `7636512` redirige vers cette page ; le lien final propre a été conservé.
- [W3C WAI — Instructions de formulaire](https://www.w3.org/WAI/tutorials/forms/instructions/) : consignes compréhensibles et identification des informations requises. L’ordre éditorial de la page et les exemples d’achat B2B sont originaux.

### La Chapelle-Saint-Aubin — e-commerce et retrait

- [Google Search Central — Partager les données produit](https://developers.google.com/search/docs/specialty/ecommerce/share-your-product-data-with-google?hl=fr) : complémentarité entre données du site et Merchant Center, écarts possibles de prix et de disponibilité. Aucun affichage Shopping ni délai de synchronisation n’est garanti.
- [W3C WAI — Validation des formulaires](https://www.w3.org/WAI/tutorials/forms/validation/) : explication des erreurs et aide à la correction. L’article porte sur l’organisation opérationnelle ; les modalités de vente doivent correspondre à l’offre du commerçant et être vérifiées avant publication.

### Yvré-l’Évêque — prise de contact mobile

- [W3C — Taille minimale des cibles, WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) : intérêt de la surface tactile et de l’espacement pour limiter les activations involontaires. L’article ne réduit pas l’accessibilité à une dimension unique.
- [W3C WAI — Libellés des contrôles](https://www.w3.org/WAI/tutorials/forms/labels/) : identification des champs et rôle des libellés. Le passage traite la transmission du contexte et le parcours après soumission, au-delà de la seule présentation du formulaire.

### Sarthe — agence ou freelance

- [W3C WAI — Planifier l’accessibilité](https://www.w3.org/WAI/planning-and-managing/plan/) : responsabilités identifiées, sans supposer qu’un statut de prestataire garantit une meilleure organisation.
- [Google Search Central — Choisir un accompagnement SEO](https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=fr) : examiner méthode, références et résultats attendus ; absence de garantie de première place. Les comparaisons de périmètre et de continuité ne constituent pas une grille tarifaire ni un conseil juridique.

## Vérification technique

- TypeScript : export conforme à `Omit<BlogArticle, 'readTimeMinutes'>[]` ; métadonnées et dates présentes.
- ESLint ciblé sans erreur.
- Parsing HTML avec JSDOM : paragraphes, titres, listes et liens valides ; aucune balise exécutable ni gestionnaire inline.
- Liens internes statiques contrôlés contre les routes existantes. Le lien d’article complémentaire de Coulaines correspond à `seo-local-le-mans-pages-services`, déjà présent dans `local-articles.ts`.
- Aucun changement dans l’agrégateur, les types, les templates, le header, le footer ou les APIs.
