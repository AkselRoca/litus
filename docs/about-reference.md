# À Propos — visuel du hero

Le 10 septembre 2026, l’image principale du hero avec des visages générés a été remplacée par une photographie réelle d’espace de travail, à la demande de l’utilisateur. La grille, les dimensions, le H1, les textes, les CTA, les cartes flottantes et les éléments de réassurance sont conservés. Le reste de la page n’a pas été modifié.

## Photographie actuelle

- Fichier existant réutilisé : `public/blog/photos/developpeur-travail.webp`, 1400 × 1014 px.
- Sujet : ordinateur portable sur une table en bois, mains au clavier, aucun visage. Photo d’illustration ; il ne s’agit pas d’une photo des locaux ou de l’équipe Litus.
- Auteur / compte source : Crew ; crédit EXIF Alona Grebenyuk.
- Source vérifiée : [Programmer at work, Wikimedia Commons / Unsplash](https://commons.wikimedia.org/wiki/File:Programmer_at_work_(Unsplash).jpg).
- Licence : [CC0](https://creativecommons.org/publicdomain/zero/1.0/deed.en), publication du 10 janvier 2016.
- Original : 4597 × 3330 px. La copie WebP existante est redimensionnée sans modification générative.
- Intégration : `next/image`, `fill`, chargement prioritaire, recadrage centré et fondus CSS existants. Texte alternatif factuel mentionnant la photo d’illustration.

L’ancienne image `public/team/litus-studio.webp` n’est plus utilisée dans le code de la page. Elle n’a pas été remplacée par une autre image générée. Les deux photographies originales fournies par l’utilisateur (`portrait-clair.png` et `portrait-brun.png`) restent dans la petite réassurance du hero ; elles sont distinctes de l’ancien montage généré.

## Éléments existants conservés

La structure comprend le hero, quatre valeurs, deux fiches d’équipe et le CTA final. L’utilisateur a ensuite confirmé l’attribution des portraits dans la section « Une équipe complémentaire » : `portrait-clair.png` pour Arthur et `portrait-brun.png` pour Aksel. Chaque portrait comporte un bouton LinkedIn bleu dans son angle inférieur droit, vers les profils individuels fournis : `linkedin.com/in/arthur-geveaux` et `linkedin.com/in/akselroca/`. Les liens s’ouvrent dans un nouvel onglet, disposent d’un libellé accessible nominatif et d’un état de focus visible.

## Chiffres

La note Google 5/5 a été explicitement confirmée dans le brief des sections 03–05 fourni ensuite par l’utilisateur. Le nombre de projets de la maquette À Propos n’a pas été confirmé ; la preuve de confiance reste sans compteur de projets.

## Vérifications du remplacement

Comparaison avant/après à 390, 768 et 1440 px, ainsi qu’à 1440 px en mode sombre : textes et rectangles des dix principaux blocs strictement identiques. Nouvelle photo chargée, aucun débordement horizontal ni erreur JavaScript. Captures inspectées sur ordinateur et mobile ; ESLint du composant sans erreur. Rapports locaux : `.tmp/about-before.json` et `.tmp/about-after.json`.

La section équipe a également été vérifiée à 390, 768 et 1440 px, en clair et sombre : deux images chargées, ordre Arthur/Aksel correct, boutons positionnés à 7 px de l’angle sur mobile et 10 px sur les autres formats, liens exacts, focus clavier visible et aucun débordement horizontal. Captures locales : `.tmp/about-team-*`.
