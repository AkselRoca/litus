# Ressources de la page e-commerce

Sources officielles consultées et fichiers téléchargés le **10 septembre 2026**. Cette note documente les illustrations et les faits de plateforme utilisés pour la page `/creation-site-ecommerce`.

## Fichiers retenus

Les trois illustrations Shopify sont des exemples de la plateforme et **ne sont pas des réalisations, résultats clients ou études de cas de Litus**. Les chiffres visibles dans les interfaces appartiennent aux exemples fournis par Shopify et ne doivent pas être repris comme promesses de performance.

| Fichier public | Dimensions | Contenu et usage |
| --- | --- | --- |
| `public/ecommerce/shopify-commerce.png` | 1854 × 1041, 1 085 264 octets | Interface d'administration Shopify en français sur iPhone et Apple Watch : visites, ventes, commandes et graphique. Illustration du pilotage quotidien. |
| `public/ecommerce/shopify-storefront.png` | 808 × 1020, 703 602 octets | Aperçu officiel du thème Tinker : navigation, présentation de produits et grille de catalogue. Illustration de la présentation d'une boutique, dans un cadre vertical. Texte de démonstration en anglais. |
| `public/ecommerce/shopify-checkout.png` | 1920 × 1532, 61 497 octets | Exemple français de paiement Shopify : paiement express, coordonnées, livraison et récapitulatif du panier. Les moyens effectivement disponibles dépendent de la configuration et de l'éligibilité. |
| `public/brands/shopify-wordmark.svg` | SVG, viewBox `0 0 500 142.8` | Logo principal officiel : sac vert, S blanc, mot Shopify noir. Fond transparent. |
| `public/brands/woocommerce-official.svg` | SVG, viewBox `0 0 183.6 47.5` | Mot-symbole Woo violet actuel, fond transparent. Identité introduite en 2025. Ce n'est pas l'ancien logo à bulle « Woo + COMMERCE ». |

Le fichier demandé à l'URL ci-dessous se termine par `.webp`, mais le CDN a renvoyé des **octets PNG**. Il a été conservé sans recompression et renommé avec l'extension `.png`, conformément au format réel. Les logos sont des SVG originaux extraits des archives officielles : aucun tracé, couleur ou proportion n'a été recréé. Le fichier préexistant `public/brands/shopify.svg` n'a pas été modifié.

### Origine de chaque fichier

- Administration : [URL exacte demandée, CDN Shopify](https://cdn.shopify.com/b/shopify-brochure2-assets/6aa20656847354b1afd9e011ae030e5f.webp).
- Boutique Tinker : [image originale](https://cdn.shopify.com/b/shopify-brochure2-assets/f531232ca65eb5c5de30fe72c6c24bf1.png), référencée dans la section des thèmes de la [page Shopify France consacrée aux boutiques](https://www.shopify.com/fr/site-de-vente-en-ligne).
- Paiement : [image originale](https://cdn.shopify.com/b/shopify-brochure2-assets/12ed98acbc8c4809034d39c6d8853030.png), référencée dans le module de paiement de [Shopify France](https://www.shopify.com/fr).
- Shopify : archive [shopify-primary-logo.zip](https://cdn.shopify.com/static/brand-assets/shopify-primary-logo.zip), fichier interne `01 - Logo/svg/shopify_logo_whitebg.svg`, distribuée par [Using our brand](https://www.shopify.com/brand-assets).
- WooCommerce : archive [woo-logos.zip](https://woocommerce.com/wp-content/uploads/2025/01/woo-logos.zip), fichier interne `Woo Logos/Woo_logo_color.svg`, distribuée par [Brand and logo guidelines](https://woocommerce.com/brand-and-logo-guidelines/). Le [changement d'identité de février 2025](https://woocommerce.com/posts/introducing-the-new-woo-brand/) explique cette version.

Les marques et visuels restent ceux de leurs titulaires. Préserver les proportions et les couleurs, laisser de l'espace autour des logos, et éviter toute présentation laissant entendre une certification, une affiliation ou un statut de partenaire Litus qui ne serait pas documenté. Références : [consignes de marque Shopify](https://www.shopify.com/brand-assets) et [consignes de marque Woo](https://woocommerce.com/trademark-guidelines/).

## Faits utilisables dans le contenu

| Sujet | Formulation factuelle et nuance | Source primaire |
| --- | --- | --- |
| Catalogue Shopify | Les produits, variantes, prix, stocks et collections se gèrent depuis l'administration. Le catalogue peut aussi être modifié en bloc ou avec des fichiers CSV. | [Gestion des produits](https://help.shopify.com/fr/manual/products) |
| Commandes et paiement | Shopify Checkout recueille les informations de livraison et de paiement pour finaliser une commande ; les stocks sont contrôlés pendant le parcours. Il faut configurer puis tester les moyens de paiement et la livraison. | [Shopify Checkout](https://help.shopify.com/fr/manual/checkout-settings) |
| Personnalisation du paiement | L'identité visuelle du paiement peut être adaptée. Les personnalisations avancées et certaines applications sur les étapes d'information, d'expédition et de paiement nécessitent Shopify Plus. Éviter la promesse « paiement entièrement sur mesure » pour tous les forfaits. | [Personnalisation selon les forfaits](https://help.shopify.com/fr/manual/checkout-settings/customize-checkout-configurations) |
| Hébergement Shopify | L'hébergement web est compris dans les forfaits Shopify. Les connexions HTTPS utilisent un certificat TLS/SSL. Cela n'élimine pas le travail de suivi du thème, du contenu et des intégrations de la boutique. | [Domaines et hébergement](https://www.shopify.com/fr/domaines), [Connexions sécurisées](https://help.shopify.com/fr/manual/domains/managing-domains/secure-connections) |
| Applications Shopify | Des applications ajoutent des fonctionnalités. Selon l'application, la facturation peut être récurrente, ponctuelle ou liée à l'utilisation ; sélectionner les outils en fonction des besoins et du budget. | [Montants facturés par les applications](https://help.shopify.com/fr/manual/your-account/manage-billing/your-invoice/apps) |
| Budget Shopify | Prévoir l'abonnement, les éventuels thèmes ou applications payants et les frais de traitement des paiements. Des frais de transaction tiers peuvent s'ajouter selon le fournisseur et le forfait. Ne pas présenter Shopify Payments comme « sans frais de paiement ». | [Tarification Shopify France](https://www.shopify.com/fr/tarifs), [Frais et coûts](https://help.shopify.com/fr/manual/international/pricing/fees) |
| WooCommerce et WordPress | WooCommerce est une plateforme e-commerce open source pour WordPress. Le choix de l'hébergeur, l'accès au code et les extensions permettent d'adapter la boutique ; le logiciel gratuit ne signifie pas que le projet ou son exploitation sont gratuits. | [Téléchargement et présentation officielle](https://woocommerce.com/download/) |
| Maintenance WooCommerce | WordPress, WooCommerce, extensions, thèmes et passerelles de paiement doivent être suivis. Les mises à jour se préparent avec une sauvegarde, des essais sur préproduction et une vérification du panier, du paiement et des parcours utiles après déploiement. | [Guide de mise à jour WooCommerce](https://woocommerce.com/document/how-to-update-woocommerce/) |

Le choix conseillé à Litus peut mettre Shopify en avant pour une boutique concentrée sur la vente et une administration centralisée ; WooCommerce peut répondre à un projet WordPress existant ou à un besoin particulier de personnalisation. Il s'agit d'un positionnement de service à confirmer avec le projet, pas d'une supériorité universelle ni d'une garantie de conversion. Aucun taux de conversion, revenu, nombre de clients ou badge partenaire non justifié ne doit être attribué à Litus.

## Vérification des livrables

- Les cinq fichiers finaux ont été ouverts ou rendus pour inspection visuelle ; les deux SVG sont transparents et utilisent les tracés d'origine.
- Les dimensions ont été lues avec `sharp.metadata()` ; les images fournies à Next/Image peuvent être optimisées au moment de leur diffusion.
- Les images sont locales afin d'éviter une dépendance d'affichage à un CDN externe. Les archives et aperçus de recherche restent dans `.tmp` et ne sont pas des ressources publiques de la page.
