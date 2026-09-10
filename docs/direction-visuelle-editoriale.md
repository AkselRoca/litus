# Direction visuelle Litus — septembre 2026

La homepage conserve l’ordre hero, outils, services, agence, estimation, méthode, chiffres et contact. Les services et les tarifs restent accessibles aux mêmes adresses.

- Capsules décoratives, pictogrammes pastel, faux écrans, cartes 3D, halos et compteurs animés retirés de la homepage.
- Services en lignes séparées par des filets ; méthode en liste numérotée ; chiffres fixes en liste de définitions.
- Implantation à Lorient et au Mans intégrée dans le texte de présentation.
- Formulaire d’estimation simplifié, sans progression fictive ; erreurs explicites ; confirmation d’une demande uniquement après réponse positive du serveur.
- Navigation et footer allégés. Liens d’audit de la homepage dirigés vers le contact : la route `/audit-gratuit` n’existe pas dans ce dépôt.
- Thème clair par défaut ; un choix de thème déjà enregistré est respecté.
- Popup commercial automatique désactivé sur l’accueil. Le bandeau de consentement reste indépendant.

## Image

Outil : imagegen intégré (pas de CLI). Une même image d’ambiance est utilisée dans les heroes des pages principales et des ressources. Elle ne représente pas les bureaux réels de Litus.

Fichier utilisé : `public/hero-studio-editorial.webp` (environ 100 Ko). Original : `public/hero-studio-editorial.png`.

Prompt final :

> Use case: photorealistic-natural. Asset type: panoramic background photograph for Litus, a French web agency website, reused across page heroes with CSS blur. Create a restrained editorial photograph of an anonymous small architecture/design studio in Brittany: pale plaster walls, oak communal desk with closed notebooks and an unbranded laptop, tall windows overlooking soft out-of-focus slate rooftops and coastal sky, a few naturally imperfect everyday details. No people, no text, no logos, no fabricated dashboard. Wide landscape 3:2, composition with quiet pale negative space on left and desk/windows on right. Overcast natural daylight, muted stone and warm grey, subtle analog grain, realistic materials, no orange glow, no gradients, no futuristic objects, no stock-photo corporate gloss. This is an atmospheric illustration, not a claim to depict actual Litus offices.

Le flou est appliqué en CSS (6 px), avec un voile neutre pour la lisibilité. Les captures réelles des réalisations sont conservées.

## Données et configuration

Les chiffres historiques de la homepage sont conservés, sans nouvelle promesse chiffrée. Leur source et leur période ne sont pas documentées dans le dépôt ; elles restent à préciser avant publication.

L’estimation automatique utilise le service existant et nécessite `GEMINI_API_KEY`. La configuration locale ne contient pas cette clé ; un message propose de contacter Litus en cas d’indisponibilité. Les tests utilisent des réponses simulées pour contrôler les succès et échecs sans contacter de service externe.
