# Blog local Litus — sources et décisions éditoriales

## Audit et publication

Audit du 9 septembre 2026 : la base locale configurée ne contient aucun article avec `published: true`. Seuls les champs éditoriaux publics et le nom public de l’auteur ont été sélectionnés. Aucune donnée privée d’auteur ou information commerciale n’a été consultée. Les deux exemples tronqués de `src/lib/admin-data.ts` sont des données de démonstration, pas des articles complets à publier ; ils n’ont pas été repris.

Les six articles complets de `src/lib/blog/local-articles.ts` sont datés du **2026-09-09**, date réelle de rédaction/publication dans cette version. Le format ISO de date ne prétend pas connaître une heure de publication. L’auteur est « L’équipe Litus ». Chaque texte a un angle propre et contient des liens internes pertinents ainsi qu’une section de sources officielles. Les exemples sont des situations de raisonnement, sans témoignage ni résultat client inventé.

La couche `src/lib/blog/articles.ts` reste en lecture seule. Les articles publiés en base sont conservés : slug, titre, contenu et date ne sont pas réécrits. Un contenu DB publié prévaut sur le contenu statique ayant le même slug. Un brouillon DB de même slug empêche le retour au contenu statique : seuls ses slug/état de publication sont vérifiés, sans lire son contenu. Si la base est indisponible, aucun article n’est retourné pour éviter de republier une ressource éventuellement retirée. Les six sujets locaux sont placés en premier, puis les autres articles publiés, sans doublon.

Pour un ancien article dont `publishedAt` est absent, la couche conserve le comportement antérieur : utilisation de sa date `createdAt` existante, et non d’une date générée au build. Cette date de création est un repli technique, pas une date de publication attestée. Le temps de lecture est calculé à 200 mots/minute à partir du texte, après retrait des balises, scripts, styles et entités HTML.

## Articles et vérifications

1. **Référencement local à Lorient : les points à vérifier sur votre fiche Google**
   - Slug : `referencement-local-lorient-fiche-google` ; catégorie SEO ; ville Lorient.
   - Angle : vérification opérationnelle de la fiche, identité, adresse/zone de service, photos, avis et lecture des performances.
   - [Google — Classement local](https://support.google.com/business/answer/7091?hl=fr) : pertinence, distance, notoriété ; pas d’achat d’une meilleure position.
   - [Google — Représentation des établissements](https://support.google.com/business/answer/3038177?hl=en) : nom réel, catégories, localisation, entreprise de services et masquage de l’adresse.

2. **Refonte de site internet au Mans : les signes qu’il est temps d’améliorer votre site**
   - Slug : `refonte-site-internet-le-mans` ; catégorie Site Web ; ville Le Mans.
   - Angle : diagnostic des obstacles, décision entre corrections et refonte, conservation des acquis.
   - [Google — Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start?hl=fr).
   - [Google — Migration avec changements d’URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) : correspondance des URL, redirections pertinentes et suivi.
   - [Google — Expérience sur la page](https://developers.google.com/search/docs/appearance/page-experience?hl=fr).

3. **Google Ads à Lorient : comment cibler votre zone d’intervention sans disperser votre budget ?**
   - Slug : `google-ads-lorient-zone-intervention` ; catégorie Google Ads ; ville Lorient.
   - Angle : périmètre d’intervention, présence/intérêt, pertinence des demandes et suivi commercial.
   - [Google Ads — Options géographiques](https://support.google.com/google-ads/answer/1722038?hl=en) : présence ou intérêt par défaut ; présence à étudier selon l’offre.
   - [Google Ads — Ciblage des zones](https://support.google.com/google-ads/answer/1722043?hl=fr) : périmètres disponibles et limites des signaux de localisation.
   - [Google Ads — Termes de recherche](https://support.google.com/google-ads/answer/2472708?hl=fr) : rapport et caractère non exhaustif.
   - [Google Ads — Conversions](https://support.google.com/google-ads/answer/1722054?hl=fr) : actions distinctes et sources de mesure.

4. **SEO local au Mans : quelles pages créer pour présenter vos services et votre secteur ?**
   - Slug : `seo-local-le-mans-pages-services` ; catégorie SEO ; ville Le Mans.
   - Angle : architecture de contenu et valeur réelle des pages locales, sans déclinaisons artificielles.
   - [Google — Guide SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr) : organisation, contenus utiles et liens.
   - [Google — Pages satellites](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse).

5. **Site internet pour artisan à Lorient : les éléments qui facilitent les demandes de devis**
   - Slug : `site-internet-artisan-lorient-devis` ; catégorie Site Web ; ville Lorient.
   - Angle : continuité entre prestations, preuves, formulaire et traitement humain des demandes.
   - [W3C WAI — Formulaires](https://www.w3.org/WAI/tutorials/forms/) : simplicité, libellés, instructions, validation et messages de confirmation.
   - [Google — Expérience sur la page](https://developers.google.com/search/docs/appearance/page-experience?hl=fr).

6. **SEO ou Google Ads au Mans : par où commencer pour développer votre visibilité ?**
   - Slug : `seo-ou-google-ads-le-mans` ; catégorie Stratégie ; ville Le Mans.
   - Angle : décision selon offre, maturité du site, capacité opérationnelle et mesure.
   - [Google — Guide SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr) : délais variables et absence de garantie de position.
   - [Google — Choisir un accompagnement SEO](https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=fr) : distinction entre publicité et classement organique.
   - [Google Ads — Conversions](https://support.google.com/google-ads/answer/1722054?hl=fr).

Les conseils de méthode et les exemples sont des recommandations éditoriales originales de Litus. Les sources officielles appuient les faits techniques ; aucun article externe n’a été repris ou traduit intégralement.

## Visuels de cette version

Les anciennes couvertures SVG et captures de sites ont été remplacées par des photographies. Chacun des six articles initiaux possède désormais une couverture différente et trois photos intérieures. L’affectation exacte se trouve dans `src/lib/blog/article-photos.ts` ; les sources, auteurs, licences et dimensions figurent dans `src/lib/blog/photo-catalog.ts` et `docs/blog-photo-sources.md`.

Les fichiers WebP sont conservés dans `public/blog/photos/`. Les photographies locales représentent réellement les lieux indiqués ; les scènes professionnelles portent des légendes d’illustration et n’identifient pas de faux clients Litus. Aucun visuel généré par IA n’a été créé pour ces articles.