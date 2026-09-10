# Articles locaux 2026 — lot A

## Périmètre

Fichier livré : `src/lib/blog/articles-2026-a.ts`. Export : `articles2026A`, tableau de `Omit<BlogArticle, 'readTimeMinutes'>`. La couche d’agrégation, les routes et les autres contenus ne sont pas modifiés.

Les textes ont été rédigés et les sources contrôlées le **9 septembre 2026**. Les dates `publishedAt` ci-dessous correspondent au calendrier éditorial expressément demandé ; elles ne proviennent pas d’un historique de publication découvert en base. `updatedAt` vaut `2026-09-09`. Les dates et URL des articles antérieurs ne sont pas touchées.

Les huit contenus sont originaux. Ils utilisent des exemples explicitement fictifs, sans nom de client, témoignage, résultat commercial ou promesse chiffrée inventés. L’article budgétaire explique une méthode de cadrage et renvoie aux tarifs présentés sur le site sans inventer de prix. Aucun budget client n’a été consulté ou publié.

Les champs `coverImage` et `coverImageAlt` sont volontairement vides : leur affectation est gérée par le catalogue de médias vérifiés de la tâche principale. Aucun nouveau visuel IA n’est produit.

## Plan éditorial

| Slug | Date éditoriale | Catégorie | Angle distinct |
|---|---|---|---|
| `prix-site-internet-lorient` | 2026-04-07 | Site Web | Définir le périmètre d’une PME, répartir contenus/fonctions/coûts récurrents, comparer des devis équivalents. |
| `choisir-agence-web-vannes` | 2026-04-18 | Stratégie | Évaluer les questions, contributions, validations, contrôles qualité et conditions de suivi d’une agence. |
| `site-artisan-lanester` | 2026-04-29 | Site Web | Qualifier les projets de chantier par le contenu, les contraintes et une demande progressive. |
| `seo-commerce-ploemeur` | 2026-05-09 | SEO | Préparer la visite en boutique grâce aux horaires, à l’assortiment et aux photographies utiles. |
| `site-ecommerce-morbihan` | 2026-05-23 | Site Web | Organiser catalogue, variantes, stock, colis, retours et traitement réel des commandes. |
| `refonte-site-hennebont` | 2026-06-04 | Site Web | Feuille de route de migration : inventaire, correspondance des URL, préparation, lancement et surveillance. |
| `google-ads-auray-saisonnalite` | 2026-06-17 | Google Ads | Relier calendrier publicitaire, recherche/réservation et capacité opérationnelle. |
| `visibilite-google-larmor-plage` | 2026-07-02 | SEO | Répondre aux nouveaux visiteurs sans perdre les informations utiles à la clientèle annuelle. |

Lorient est la seule valeur `city` attribuée directement au sujet qui porte ce nom. Les autres communes gardent `city: null` car le type actuel n’accepte que Lorient, Le Mans ou null ; elles ne sont pas renommées artificiellement Lorient. Leur localisation reste explicite dans les titres, extraits et contenus.

Chaque article dispose d’un titre naturel, d’une metaTitle, d’une metaDescription, d’une introduction, de sections H2/H3 et de quatre liens internes dont un CTA de contact. Les textes n’ajoutent pas de H1 dans le contenu, celui-ci appartenant au template d’article. Les huit sujets ne reprennent pas les paragraphes des six premiers articles locaux.

## Sources vérifiées et usage

### Cadrage budgétaire et choix d’une agence

- [W3C — Planning and Managing Web Accessibility](https://www.w3.org/WAI/planning-and-managing/) : prise en compte de l’accessibilité, responsabilités et évaluations pendant le projet. Soutient un court passage de l’article budget ; les méthodes de comparaison des devis sont une proposition éditoriale originale.
- [Google — Avez-vous besoin d’un référenceur ?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=fr) : questions au prestataire, références, explication des changements et impossibilité de garantir une première position.
- [W3C — Evaluating Web Accessibility Overview](https://www.w3.org/WAI/test-evaluate/) : un outil seul ne suffit pas pour conclure à la conformité ; importance de l’évaluation humaine.

### Contenus d’artisan et accueil des visiteurs

- [W3C — Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/) : instructions, libellés, validation et messages de retour. Les articles développent ensuite une méthode originale de qualification et d’accueil, sans reproduire le tutoriel.
- [Google — Guide SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr) : contenus utiles et compréhensibles, organisation des pages. Cité en lecture complémentaire.
- [Google — Représentation d’un établissement](https://support.google.com/business/answer/3038177?hl=fr) : informations réelles et fonctionnement des horaires saisonniers. Aucun faux établissement, équipement ou service linguistique n’est supposé.

### Commerce à Ploemeur

- [Google — Horaires exceptionnels](https://support.google.com/business/answer/6303076?hl=fr) : gestion des changements ponctuels et distinction avec les fermetures plus longues.
- [Google — Modifier une fiche](https://support.google.com/business/answer/3039617?hl=fr) : actualisation des informations pratiques, horaires et coordonnées.
- [Google — Classement local](https://support.google.com/business/answer/7091?hl=fr) : pertinence, distance et notoriété. Aucune promesse de progression liée à la fréquence de publication.

### Boutique en ligne

- [Google — Structure de navigation e-commerce](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure?hl=en) : liens entre catégories et produits ; limites des produits accessibles seulement par le moteur interne.
- [Service Public — Faire du commerce en ligne](https://entreprendre.service-public.gouv.fr/vosdroits/F23455) : cadre de l’information précontractuelle, commande et livraison.
- [DGCCRF — Relations entre professionnels et consommateurs](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/e-commerce-les-regles-entre-professionnels-et-consommateurs) : livraison, information et rétractation. Le texte reste général, signale que les conditions dépendent des produits/situations et invite à les adapter ; il ne constitue pas des CGV copiables.

### Refonte et migration

- [Google — Migrations avec changements d’URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=fr) : correspondance avant redirection, destinations pertinentes, indexation, canoniques et suivi des fluctuations. Les éléments factuels tirés de cette source restent synthétiques ; la feuille de route de coordination est originale.
- [Google — Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start?hl=fr) : usage des informations de recherche et de pages.
- [W3C — Implement](https://www.w3.org/WAI/planning-and-managing/implement/) : contrôles d’accessibilité tôt et régulièrement dans le projet.

### Campagnes saisonnières

- [Google Ads — Options géographiques avancées](https://support.google.com/google-ads/answer/1722038?hl=fr) : distinction entre présence et intérêt géographique, à choisir selon le parcours.
- [Google Ads — Dates de campagne](https://support.google.com/google-ads/answer/2404203?hl=fr) : dates de début/fin et fuseau horaire pour la fin.
- [Google Ads — Suivi des conversions](https://support.google.com/google-ads/answer/1722054?hl=fr) : définition des actions à mesurer. Le texte distingue contacts, actions mesurées et clients obtenus.

## Contrôles

- Huit slugs uniques, conformes à ceux fournis ; huit dates ISO fixes.
- Environ 820–900 mots par article, titres et sources compris, dans la fourchette demandée de 750–1 050 mots.
- Deux H3 et sept ou huit H2 par contenu ; pas de H1 imbriqué.
- Quatre liens internes par article, tous vers des routes existantes, dont `/contact`.
- Les faits techniques sont soutenus par les sources primaires Google, W3C et les sources publiques françaises pour le commerce en ligne.
- Les couvertures vides sont les seules données provisoires, à attribuer par la tâche principale avant affichage public.
