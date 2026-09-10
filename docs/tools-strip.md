# Bandeau des outils Litus

Mise à jour du 10 septembre 2026.

## Périmètre

Le bandeau d’outils existant est le composant partagé `src/components/sections/LogoCloud.tsx`, utilisé sur l’accueil. Les autres bandeaux de logos sont des références clients, distinctes des outils.

Le catalogue contient 25 noms distincts : Next.js, React, TypeScript, Tailwind, Framer, Vercel, Stripe, Shopify, WordPress, Google Workspace, Gemini, Google Ads, Meta Ads, Make, Notion, Brevo, HubSpot, Airtable, Microsoft 365, Microsoft Copilot, n8n, Zapier, Webflow, OpenAI et Claude. L’entrée générique « Google » a été retirée à la demande de l’utilisateur ; ses produits nommés restent présents. La deuxième liste HTML identique sert uniquement à raccorder la boucle et porte `aria-hidden="true"`.

## Logos

- [Sources Google et Microsoft](./tool-logos-google-microsoft.md).
- [Sources des six autres outils](./tool-logos-business.md).
- [Sources n8n, Zapier, Webflow, OpenAI et Claude](./tool-logos-automation-ai.md).
- Fichiers hébergés localement dans `public/brands/`, sans chargement depuis les sites tiers pendant la navigation.
- Marques compactes officielles accompagnées du nom du produit en texte. Images décoratives pour éviter une double lecture par les lecteurs d’écran.
- Cadre commun de 28 px ; images contenues sans déformation, 26 px sur desktop et 24 px sur mobile. Couleurs originales des nouveaux logos conservées en clair comme en sombre.

## Défilement et accessibilité

Une seule ligne conserve les espacements du bandeau : 42 px sur desktop, 32 px sur mobile. La durée dépend de la largeur réelle de la liste, mesurée avec `ResizeObserver`, pour conserver 36 px/s malgré les nouveaux noms et les changements de taille d’écran. Deux listes de largeur identique et leur espacement final assurent un raccord continu.

Le survol sur ordinateur et le focus clavier mettent la boucle en pause. Un bouton discret permet de la suspendre et de la reprendre sur tous les écrans ; sa zone tactile mobile mesure 44 px. Avec `prefers-reduced-motion`, l’animation et la copie sont retirées ; la liste reste consultable par défilement horizontal natif, au toucher et au clavier.

## Vérifications

- Navigateur Edge à 1440, 768, 390 et 320 px ; thème sombre à 1440 px ; animations réduites à 390 px.
- 25 noms uniques, cinq derniers actifs officiels chargés, copie masquée aux technologies d’assistance, aucune erreur JavaScript ni débordement de page. Dernier contrôle : 320, 390 et 1440 px, dont sombre à 390 et 1440 px.
- Largeur des deux listes identique, vitesse de 36 px/s sur desktop et mobile, pause/reprise sans saut et accès clavier vérifiés.
- Inspection visuelle de tous les logos sur fond clair et sombre, dont le N noir de Notion après résolution de sa variable CSS officielle.
- ESLint ciblé et vérification TypeScript réussis. Une garde explicite sur une valeur optionnelle du test Contact existant a été corrigée lors de cette vérification ; ses 28 tests restent validés.

Rapport du dernier ajout : `.tmp/tools-addition-qa.json`. Les deux listes mesurent exactement 3444,219 px à 1440 px ; vitesse mesurée proche des 36 px/s prévus, pause/reprise et navigation horizontale avec réduction des animations validées.
