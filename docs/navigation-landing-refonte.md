# Pages dédiées : landing page et refonte

Créées pour remplacer les destinations de menu qui pointaient vers des ancres d’une autre prestation. Les routes sont `/creation-landing-page` et `/refonte-site-internet`. Aucune ancienne page n’a été modifiée par ce lot. Les menus, le contact et le sitemap sont gérés par la tâche principale.

## Intentions de recherche

Recherche web effectuée le 10 septembre 2026 avec les requêtes « création landing page agence Google Ads », « agence landing page devis », « refonte site internet agence audit migration SEO devis ». Lecture qualitative des résultats, sans outil de volumes : aucun volume, difficulté ou potentiel de trafic n’est inventé.

- Landing : intention commerciale de création d’une page d’atterrissage, page Google Ads, page de campagne ou de lancement ; attentes autour du message, du contact, de la mesure et du devis. La page présente une offre ciblée, un parcours et des modalités de mesure, distincts d’un site vitrine complet.
- Refonte : intention de faire évoluer un site existant ; préoccupations sur l’audit, le mobile, les contenus, le CMS, les anciennes URL et la visibilité. Le contenu commence par l’existant et détaille la reprise et la bascule ; il ne promet pas un référencement inchangé.

Ces regroupements sont une interprétation éditoriale des intentions observées, pas une étude statistique. Les prix, délais, témoignages et performances vus chez d’autres agences n’ont pas été repris.

## Sources techniques primaires

- [Google Ads : définition d’une landing page](https://support.google.com/google-ads/answer/14086?hl=en) : cohérence avec l’annonce, utilité de l’information et navigation. Application éditoriale : une action principale avec les informations nécessaires, sans imposer la suppression de toute navigation.
- [Google : importance de la navigation de destination](https://blog.google/products/ads-commerce/search-ads-and-the-importance-of-landing-page-navigation/) : le visiteur doit pouvoir atteindre ce qu’il cherche. La page ne présente pas les liens comme un défaut systématique.
- [Google Analytics : mesurer les événements clés](https://support.google.com/analytics/answer/12946393?hl=en) : définir une action métier et vérifier l’événement correspondant. La landing distingue une interaction d’une demande aboutie ; aucun taux de conversion fictif.
- [Google Search Central : migrations avec changement d’URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) : inventorier les adresses, préparer les correspondances, tester puis suivre. La FAQ précise que des variations de classement sont possibles.
- [Google Search Central : redirections](https://developers.google.com/search/docs/crawling-indexing/301-redirects) : une redirection permanente côté serveur convient à un déplacement durable. Les lignes `301` du hero sont explicitement des exemples locaux.
- [web.dev : Web Vitals](https://web.dev/articles/vitals) : chargement, réactivité et stabilité sont des dimensions de l’expérience. Aucun score ni seuil promis sur les pages.

## Contenu et structure

Les deux pages réutilisent `ServiceHero` sans changer ses tailles, sa grille ni sa structure. La landing illustre annonce → offre → demande ; la refonte illustre existant → nouveau parcours → destinations des anciennes URL. Le corps réutilise `BusinessService` et `ServiceReveal`, avec des sections propres à chaque intention et des accordéons HTML consultables sans JavaScript.

Chaque page fournit un canonical absolu, des métadonnées distinctes, une image Open Graph locale 1200 × 630, puis des données Service/BreadcrumbList/FAQPage. Les FAQ visibles et JSON-LD partagent les mêmes données. Aucun avis, note, AggregateRating ou résultat client inventé.

CTA exacts :
- `/contact?objet=Cr%C3%A9ation%20de%20landing%20page`
- `/contact?objet=Refonte%20de%20site%20internet`

Les liens SEO généraux vont vers `/referencement-naturel`. Les liens commerciaux complémentaires utilisent les pages existantes `/google-ads`, `/creation-site-internet` et `/creation-site-ecommerce`.

## Démonstrations

Interfaces HTML distinctes, largeur maximale 650 px, ratio 1,22 et ligne de contrôles de 37 px ; le composant partagé garde son adaptation tablette jusqu’à 680 px. Séquences automatiques courtes de 7,2 s, pause/reprise/relecture, arrêt hors écran et onglet masqué. Mouvement réduit : état final, navigation et actions toujours disponibles. Les interactions d’exemple restent dans l’état React et ne déclenchent ni contact réel ni audit distant. Onglets flèches/Home/End et focus visibles.

## Photos réelles existantes

- Landing, fond : `/blog/photos/planning-bureau.webp`, JESHOOTS.COM, [source Commons](https://commons.wikimedia.org/wiki/File:White_work_table_with_notes,_smartphone_and_laptop_(Unsplash).jpg), CC0. Carnet ouvert, téléphone et ordinateur sur table blanche ; fond décoratif.
- Landing, méthode : `/blog/photos/bureau-notes-analyse.webp`, Javier Quesada, [source Commons](https://commons.wikimedia.org/wiki/File:Working_at_office_(Unsplash).jpg), CC0. Notes surlignées, crayon et clavier ; photographie d’illustration avec crédit visible.
- Refonte, fond : `/blog/photos/developpeur-travail.webp`, Crew, [source Commons](https://commons.wikimedia.org/wiki/File:Programmer_at_work_(Unsplash).jpg), CC0. Personne au clavier devant un ordinateur ; fond décoratif.
- Refonte, cadrage : `/blog/photos/planning-bureau.webp`, même source et licence ; crédit visible. Les personnes et lieux ne sont présentés ni comme clients ni comme bureaux Litus.

Les images proviennent du catalogue déjà vérifié `src/lib/blog/photo-catalog.ts`, licence [CC0](https://creativecommons.org/publicdomain/zero/1.0/deed.en). Aucune image générée.

## Vérifications locales

- ESLint propre sur les deux routes et leurs composants.
- Edge / Playwright : cadres des démos vérifiés à 320, 390, 768, 1280, 1440 et 1920 px. Aucun élément ne dépasse ; hauteur constante entre tous les onglets, aucune erreur JavaScript observée.
- Onglets utilisables au clavier (flèches, Home, End), simulation de demande et vérification des parcours fonctionnelles, sans envoi réseau métier. État final consultable en mouvement réduit.
- Séquences automatiques 0 → 1 → 2, arrêt final stable, pause/reprise et relecture testés. Défilement hors écran : progression suspendue puis reprise. Même comportement vérifié avec un événement de changement de visibilité d’onglet simulé.
- Captures desktop, mobile et thème sombre relues. Les deux routes Open Graph répondent 200 avec une image.
- Le serveur et le build global sont laissés à la tâche principale ; aucun changement à un fichier partagé dans ce lot.
