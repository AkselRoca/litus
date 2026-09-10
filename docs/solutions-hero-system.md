# Heroes des pages Solutions

Les pages `/pme`, `/grands-comptes` et `/collectivites` utilisent `SolutionsHero`, qui injecte leur contenu dans `ServiceHero`, le composant déjà utilisé par `/artisans`.

## Gabarit

- Aucun réglage indépendant de taille de H1, de largeur de texte ou de hauteur de hero par cible.
- Grille, typographie Inter, graisse 650, interligne, marges, CTA et changements de disposition proviennent exclusivement de `service-hero.css`.
- Les trois introductions sont volontairement courtes. Les titres conservent quatre lignes aux largeurs desktop de 1024, 1280 et 1440 px.
- Les réassurances reprennent les trois colonnes, les icônes de 19 px et les changements de disposition du hero Artisans.
- L’accent du titre et de la démonstration suit la palette de l’audience, définie ci-dessous. Le CTA de contact conserve l’orange Litus `#E95E2A`.
- La démonstration possède le même encombrement que celle des artisans : largeur maximale 650 px, scène au ratio 1,22, ligne de contrôle de 37 px. La règle tablette de `ServiceHero` autorise la même largeur de 680 px.

## Contenu et interactions

`SolutionsHero.tsx` centralise les titres, introductions et réassurances. `SolutionsHeroDemo.tsx` partage la scène interactive et adapte le site, la visibilité et le suivi à chaque cible. Les interfaces sont des illustrations de parcours, pas des résultats clients annoncés.

Les CTA mènent au contact et aux réalisations. L’ancien lien `/portfolio` des heroes a été remplacé par `/realisations`. Les métadonnées des trois routes reflètent leur nouveau positionnement.

Le contenu du reste des pages et le hero Artisans ne sont pas modifiés. Le conteneur des trois pages coupe le débordement horizontal des anciennes illustrations animées situées plus bas, sans bloquer le défilement vertical.

## Couleurs par audience

Harmonisation du 10 septembre 2026 : les couleurs sont reprises des classes Tailwind déjà présentes dans les sections de chaque page, sans modifier ces sections.

| Audience | Accent clair | Accent sombre | Palette existante |
| --- | --- | --- | --- |
| PME | `blue-600` / `#2563EB` | `blue-400` / `#60A5FA` | Titres bleus, icônes et encadrés des sections PME. |
| Grands comptes | `indigo-600` / `#4F46E5` | `indigo-400` / `#818CF8` | Accents indigo des sections besoins, solutions et chiffres. |
| Collectivités | `orange-600` / `#EA580C` | `orange-400` / `#FB923C` | Accents orange des sections dédiées aux acteurs publics. |

`solutions-hero.css` définit la variable `--solutions-accent` sous `.solutions-hero[data-audience]`. Le H1, le trait du surtitre et les icônes de réassurance la réutilisent. `solutions-hero-demo.css` la reprend dans `--sol-demo-accent` pour les onglets, les pictogrammes, les contrôles de suivi, les courbes et leurs légères teintes de fond. Aucun grand fond coloré n’est ajouté.

Les noms de variables décrivent un accent, plutôt qu’un orange imposé. Aucun remplacement de `--litus-orange` n’est effectué : les vrais CTA restent orange, comme le header et le logo. Les styles des pages services, de l’accueil et d’Artisans restent indépendants. Aucune taille, marge, ligne de texte ou logique d’animation n’a été modifiée pour cette harmonisation.

## Photographie

Le fond discret réutilise `/blog/photos/bureau-reunion-clair.webp`, une photographie réelle de Breather, **CC0** : [White office space, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:White_office_space_(Unsplash).jpg). La provenance complète est également conservée dans `src/lib/blog/photo-catalog.ts`.

## Vérification

Comparer les quatre routes à largeur égale pour toute évolution du gabarit. Contrôler notamment le H1, les CTA et l’absence de débordement à 320, 390, 768, 1024, 1280 et 1440 px, les trois onglets au clavier, le mode sombre et le mouvement réduit.

Validation du 9 septembre 2026 :

- Compilation Next.js et typage réussis ; ESLint réussi sur tous les fichiers modifiés.
- Les quatre routes répondent en HTTP 200 aux six largeurs testées, sans débordement horizontal ni image visible manquante.
- Les trois nouveaux heroes reproduisent les hauteurs Artisans, y compris les H1 et introductions, à chacun des six formats. Le texte est ajusté sans changer la taille de police ni ajouter des hauteurs fixes artificielles.
- Les neuf parcours d’interaction (trois routes à 1440, 390 et 320 px) passent : onglets souris/clavier, flèches/Home/End, hauteur stable lors du changement de vue, CTA, pause/relecture, mode sombre et mouvement réduit. Aucune erreur JavaScript dans ces parcours.
- Les espaces précédant la ponctuation française sont insécables dans les introductions pour éviter un deux-points isolé en début de ligne.

Validation des couleurs du 10 septembre 2026, sans compilation ni arrêt du serveur :

- Les trois pages répondent en HTTP 200 à 1440, 390 et 320 px, sans débordement horizontal. Les neuf parcours clavier (flèches, Home, End) conservent exactement un panneau visible.
- Le H1 conserve une graisse de 650 et les mêmes tailles sur les trois pages à largeur égale : 56,88 px à 1440, 35,88 px à 390 et 34 px à 320.
- Les accents du H1, du trait, des icônes et des courbes correspondent à chaque palette ; les variantes sombres sont contrôlées après la transition du thème.
- Le mouvement réduit affiche les scènes complètes sans lecture automatique. En mode normal, la pause fige la courbe et la reprise la fait progresser.
- Contrôle de non-régression : `/creation-site-internet` et `/seo-local` conservent leur accent `#C7431B`, et tous les CTA de contact vérifiés gardent `#E95E2A`. Artisans conserve aussi ses couleurs existantes.
- Captures desktop des trois heroes et mobile PME inspectées. Aucun changement de comportement ou erreur JavaScript relevé.
