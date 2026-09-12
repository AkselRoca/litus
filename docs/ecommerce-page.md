# Page e-commerce — septembre 2026

Route conservée : `/creation-site-ecommerce`.

## Périmètre

Le contenu sous le hero remplace l'ancien `ServicePageTemplate`. `EcommerceHero`, `EcommerceBuilderDemo` et leurs feuilles de style restent inchangés. Les nouveaux blocs réutilisent `BusinessService` et `ServiceReveal`, avec des styles `ec-*` limités à cette page : crème, navy, accent de titre `#C7431B`, CTA orange, nuances sauge/bleu clair et Woo violet.

Parcours : plateformes → expertise Shopify → expérience d'achat → fonctionnalités → pilotage et commandes → WooCommerce → réalisation Fondants Parfumés → méthode et acquisition → FAQ → contact. Les CTA utilisent la page Contact existante, avec un contexte e-commerce. Le contenu explique aussi les coûts de plateforme, applications, paiements et maintenance sans inventer de tarif ou de certification.

Le bandeau automatique de capture « guide-prix » est désactivé uniquement sur cette route, comme sur les autres pages dotées de leur propre parcours de contact.

## Visuels et modules

- Deux images officielles Shopify intégrées : thème Tinker et interface mobile/Apple Watch fournie par l'utilisateur. Voir [sources des ressources](ecommerce-assets.md).
- Logos officiels Shopify et WooCommerce, sans modification de leurs tracés. Les visuels de plateforme sont identifiés comme tels, distincts de la réalisation Litus Fondants Parfumés.
- `EcommerceJourney` : produit → panier → confirmation, navigation par onglets et boutons, cycle automatique de 10,5 secondes. Exemple fictif explicitement indiqué, sans paiement réel. Coupe Sora à 39 €, cohérente avec le hero.
- `EcommerceOperations` : commande reçue → stock → préparation → client informé. Cycle de 10 secondes, sélection manuelle et changement de commande d'exemple.
- Pause au survol non tactile, au focus, hors écran et lorsque l'onglet est masqué. Commandes de pause/reprise. La préférence de réduction des mouvements coupe l'alternance automatique et conserve la navigation manuelle.
- Un H1, métadonnées spécifiques, canonical, Open Graph, Service/BreadcrumbList/FAQPage. La FAQ visible et le JSON-LD partagent les six mêmes réponses.

## Vérifications

- Hero avant/après : à 1440 px, hauteur 882,078 px ; H1 x=69,109 / y=190,859 / 592,078 × 184,266 px. À 390 px, hauteur 1619,297 px ; H1 x=20 / y=146 / 350 × 118,359 px. Mesures inchangées.
- Rendu contrôlé à 320, 390, 768, 1024, 1440 et 1920 px, ainsi qu'en sombre à 390 et 1440 px. Aucun débordement horizontal dans le nouveau contenu, images chargées, aucun message d'erreur JavaScript.
- Parcours produit/panier/confirmation, lecture automatique, pause au survol, onglets au clavier (flèches/Home/End), commande alternative, étapes du suivi et ouverture de FAQ au clavier vérifiés dans Edge.
- Tous les liens internes du nouveau contenu répondent HTTP 200, dont `/realisations/fondants-parfumes` et le lien Contact avec contexte.
- ESLint ciblé et TypeScript passent. `next build` réussit et génère 98 pages. Le script complet `npm run build` rencontre le verrou Windows du moteur Prisma utilisé par le serveur local ; compilation effectuée avec le client Prisma déjà généré, sans arrêter ce serveur.
- Rapports et captures locaux de vérification dans `.tmp/ecommerce-*` (non destinés à la production).


## Mise à jour 1.08.a (12 septembre 2026)

Le cas présenté est désormais Fondants Parfumés (Shopify), avec le périmètre création ou refonte confirmé par le client. Le visuel provient du catalogue réel et est hébergé localement. Les contrôles mentionnés plus haut sont historiques : ils ne constituent pas une validation visuelle du build 1.08.a.
