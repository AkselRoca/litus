# Pages dédiées : référencement naturel et Google Business Profile

Création le 10 septembre 2026. Périmètre : deux nouvelles routes et leurs composants locaux. Aucune modification des anciennes pages, du menu, du contact, du sitemap ou des composants partagés par ce sous-travail.

## Intentions et séparation éditoriale

Recherche documentaire préalable dans Google Search Central et l’aide officielle Google Business Profile. Les regroupements ci-dessous sont une analyse qualitative du vocabulaire et des besoins couverts ; aucun volume de recherche, niveau de concurrence ou potentiel chiffré n’a été inventé.

| Route | Intention principale | Champ lexical retenu | Périmètre distinct |
| --- | --- | --- | --- |
| `/referencement-naturel` | Choisir un accompagnement pour la présence organique du site | référencement naturel, stratégie SEO, audit SEO, audit technique, contenus, mots-clés, intentions de recherche, maillage interne, suivi | Le site et ses pages, sans multiplication de noms de villes. Les sujets géographiques sont orientés vers `/seo-local`. |
| `/google-business-profile` | Créer, optimiser, reprendre ou entretenir sa fiche d’établissement | Google Business Profile, Google My Business, fiche Google, Google Maps, informations, catégories, services, horaires, photos, avis, gestion des accès | La fiche et son entretien. Le SEO local est présenté comme un accompagnement plus large et complémentaire. |

Les H1 sont commerciaux et naturels ; les balises title et descriptions expriment précisément les prestations. Chaque page a son URL canonique absolue `https://litus.fr/...`, ses métadonnées Open Graph/Twitter, un Service, un BreadcrumbList et une FAQPage alimentée par le même tableau que les questions visibles.

Sujets transmis au contact :

- `/contact?objet=R%C3%A9f%C3%A9rencement%20naturel%20SEO` → **Référencement naturel SEO**.
- `/contact?objet=Google%20Business%20Profile` → **Google Business Profile**.

Liens de complément : SEO local, Google Ads, création de site internet, nouvelle page de refonte de site et liens réciproques pertinents. Les liens de menu sont gérés par l’agent principal ; les ancres locales de CTA « approche » restent des raccourcis internes à leur propre page.

## Sources officielles vérifiées

- [Google Search Central — Bien débuter en référencement naturel](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr) : découverte et compréhension des pages, structure, indexation, absence de position garantie, variabilité des délais.
- [Google Search Central — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) : contenu utile, expérience et pertinence pour les lecteurs. Les textes commerciaux Litus sont originaux et décrivent le travail proposé.
- [Google Search Central — Guide pour développeurs](https://developers.google.com/search/docs/fundamentals/get-started-developers) : lecture du contenu et examen de la façon dont le moteur voit les pages.
- [Google Business Profile — Premiers pas](https://support.google.com/business/answer/7039811?hl=en) : fiche gratuite sur Google Search et Maps, informations, photos et interactions.
- [Consignes de représentation d’un établissement](https://support.google.com/business/answer/3038177?hl=fr) : activité réelle, éligibilité et informations cohérentes. Aucune éligibilité universelle n’est promise.
- [Classement local](https://support.google.com/business/answer/7091?hl=en) : pertinence, distance et notoriété ; aucune vente de première place.
- [Conseils relatifs aux avis](https://support.google.com/business/answer/3474122?hl=en) : expériences authentiques, réponses utiles, interdiction des contreparties.
- [Propriétaires et administrateurs](https://support.google.com/business/answer/3403100?hl=en) : rôles et accès individuels. Le client garde la maîtrise de sa fiche.
- [Performances et interactions de la fiche](https://support.google.com/business/answer/9918094?hl=en) : informations disponibles selon la fiche et les accès. Aucun graphique de résultats ni faux compteur n’est affiché.

## Démonstrations et présentation

- Hero commun `ServiceHero`, mise en page éditoriale commune `BusinessService`, sans surcharge de la taille du H1 ni de la grille partagée.
- SEO : `SeoStrategyDemo`, interface HTML/SVG passant une fois par Technique → Contenu → Maillage, puis arrêt durable. Chaque onglet est consultable, avec navigation flèches/Home/End, pause/reprise et replay. Le résultat de recherche est un aperçu éditorial clairement étiqueté, sans classement simulé.
- GBP : `BusinessProfileDemo`, fiche illustrative passant une fois par Informations → Photos → Avis. Aucun avis fictif, score, compteur ou photo présenté comme un résultat client. Les actions « Site web/Appeler/Itinéraire » illustrent la fiche et ne déclenchent pas de faux contact.
- État SSR stable ; présentation statique en mouvement réduit ; temporisateurs arrêtés hors écran et lorsque l’onglet du navigateur est masqué. Aucune connexion au compte Google ni aucun envoi réel.

## Photographies existantes et crédits

Toutes les références viennent de `src/lib/blog/photo-catalog.ts`, sans génération ou nouveau téléchargement.

- `/blog/photos/planning-bureau.webp` : JESHOOTS.COM, CC0, [White work table with notes, smartphone and laptop](https://commons.wikimedia.org/wiki/File:White_work_table_with_notes,_smartphone_and_laptop_(Unsplash).jpg). Photographie d’illustration de préparation de projet, crédit visible sur la page SEO.
- `/blog/photos/commerce-disquaire.webp` : Samuel Dixon, CC0, [Vintage record store](https://commons.wikimedia.org/wiki/File:Vintage_record_store_(Unsplash).jpg). Photographie d’illustration dans la démo GBP, jamais désignée comme un commerce client Litus.
- `/blog/photos/commerce-vitrine.webp` : Gyorgy Bakos, CC0, [Woman looking at shop window](https://commons.wikimedia.org/wiki/File:Woman_looking_at_shop_window_(Unsplash).jpg). Photographie d’illustration, crédit visible sur la page GBP et alt factuel.
- Logo Google : SVG couleur officiel déjà présent dans le projet, `/brands/google-color.svg`.

## Validation

- `npx eslint src/app/referencement-naturel src/app/google-business-profile` : succès.
- Les deux routes répondent en HTTP 200. Vérification Edge sur 1920, 1440, 1280, 1024, 768, 390 et 320 px : aucun débordement horizontal ni texte tronqué dans les démos, aucune erreur JavaScript relevée.
- À 1440 px, les deux H1 suivent le gabarit partagé : 56,88 px, quatre lignes, largeur de 592,08 px, départ à 190,86 px. Le hero mesure 785,80 px. À 1920 px, les deux heroes mesurent 870,63 px.
- Progression automatique, pause, consultation au clavier et arrêt des temporisateurs hors écran / onglet masqué vérifiés. En mouvement réduit, les démos restent statiques, sans commande de pause inutile.
- Modes clair et sombre inspectés. Toutes les photographies utilisées sont chargées sans erreur.
- Canonicals absolues exactes et FAQ JSON-LD identiques aux questions/réponses visibles (six pour le SEO, sept pour Google Business Profile).
- Scripts et résultats de contrôle temporaires : `.tmp/qa-seo-gbp.cjs`, `.tmp/qa-seo-gbp-final.cjs`, `.tmp/seo-gbp-qa.json`.
