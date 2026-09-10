# Visuels des heroes de services

Les photographies sont générées avec l’outil intégré ImageGen, en mode génération. Les interfaces, textes, transitions, produits sélectionnables et panier sont construits en React/CSS/Framer Motion. La boutique Maison est une démonstration fictive.

## Fichiers intégrés

| Fichier dans le projet | Dimensions | Usage |
| --- | --- | --- |
| `public/site-builder-studio.webp` | 1400 × 933 | Fond photographique commun aux deux heroes |
| `public/site-builder-architecture.webp` | 900 × 600 | Image du site vitrine de démonstration |
| `public/shop-demo-lamp.webp` | 650 × 650 | Lampe Alba dans la boutique et le panier |
| `public/shop-demo-bowl.webp` | 650 × 650 | Coupe Sora dans la boutique et le panier |

Les originaux PNG sont conservés dans `C:/Users/Admin/.codex/generated_images/01a080d9-085f-7831-9cf9-6a15a5de7861/`. Les copies WebP intégrées sont optimisées avec Sharp.

## Prompts de génération — spécifications finales

### Studio

Photographie réaliste d’un studio de création web chaleureux, lumière naturelle, bureau et clavier au premier plan. Designer vu de dos à l’extrême droite, main sur la souris en bas à droite. Les 70 % de gauche doivent rester clairs et dégagés pour recevoir une interface HTML. Crème et matières naturelles, aucune interface incrustée, aucun texte ni logo.

### Architecture

Photographie éditoriale réaliste d’une maison contemporaine sur la côte française, matériaux pierre et bois, jardin, lumière naturelle. Composition adaptée au visuel principal d’un studio d’architecture. Aucun texte ni logo.

### Lampe

Use case: product-mockup. Asset: square ecommerce product photograph. A single matte terracotta orange mushroom-shaped table lamp on a pale cream plaster pedestal. Warm gentle natural daylight, high-end homeware editorial photography, empty warm off-white background, natural soft shadow, entire object visible. No text, logos or watermarks.

### Coupe

Use case: product-mockup. Asset: ecommerce product photograph, square. A single low wide handmade ceramic bowl, softly rounded organic rim, matte sage green glaze with subtle speckles, placed centered on a pale cream plaster pedestal. Warm gentle natural daylight, quiet high-end homeware editorial photography. Empty warm off-white background, natural soft shadow, realistic tactile ceramic material, generous breathing room, entire object visible. No plants, no food, no other props, no text, logos or watermarks.

## Comportement

- Boucle de création de 12 secondes environ, avec pause et reprise.
- Toute interaction manuelle met la boucle en pause.
- Animation suspendue lorsque le composant est hors écran ou l’onglet masqué.
- Avec `prefers-reduced-motion`, aperçu fixe et contrôles utilisables.
- Les prix et articles de la boutique sont fictifs ; aucune commande réelle n’est possible.

## Vérification

Contrôles de produits, palette, collection, formats et panier vérifiés dans Edge avec Playwright. Dix largeurs de 320 à 1680 px, avec les trois formats de boutique : aucun débordement ni contenu coupé dans l’aperçu. Absence d’erreurs JavaScript, y compris après chargement avec mouvement réduit. Compilation Next.js réussie.
