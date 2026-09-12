# Expertises : navigation, visuels et SEO

Livraison : **1.05.a**. Recherche et preparation : 12 septembre 2026.

## Perimetre

Le contenu des huit pages existantes, leurs FAQ, demonstrations interactives et sections sont conserves. Ajout de `/expertise/nextjs` pour donner une destination reelle au neuvieme outil du menu. Le mega menu se limite a 1120 px, garde quatre offres principales visibles et presente les neuf technologies sans depliage. Les prestations secondaires utilisent `details/summary`, operables au clavier et au toucher.

Deux sequences texte / image par page, dans la grille existante. Apparition au scroll via ServiceReveal, sans masquer le contenu avant hydratation et avec respect du mouvement reduit. La couleur propre a chaque outil reste secondaire au creme, bleu nuit et orange Litus. Les pages ne revendiquent aucun partenariat ou resultat client.

## Sources des images et droits

18 scenes WebP et 18 miniatures locales. Neuf images Open Graph PNG 1200 x 630. Aucun hotlink ni chargement d'image depuis une marque dans le navigateur du visiteur.

- 16 maquettes originales dessinees dans `scripts/generate-expertise-visuals.mjs`. Sources SVG conservees dans `public/expertise/sources`. Donnees et produits fictifs. Ce ne sont ni des captures des logiciels, ni des projets clients, ni une reproduction exacte de leurs interfaces. Cette distinction figure dans les legendes et les ALT.
- WordPress : visuel du README du [depot officiel Gutenberg](https://github.com/WordPress/gutenberg), [image originale](https://user-images.githubusercontent.com/1204802/100067796-fc3e8700-2e36-11eb-993b-6b80b4310b87.png), publiee en 2020. Redimensionnement proportionnel 1200 x 831 et compression WebP. Original et licence du depot disponibles localement ; le visiteur peut ouvrir la licence depuis la legende.
- Stripe : [Stripe Samples / checkout-single-subscription](https://github.com/stripe-samples/checkout-single-subscription), fichier `checkout-demo.gif`, image 21 extraite sans modification du formulaire. Mode test explicite, prix de demonstration, pas une transaction reelle. [Licence MIT](https://github.com/stripe-samples/checkout-single-subscription/blob/main/LICENSE), original GIF et notice conserves localement.
- Les droits des marques restent a leurs titulaires. Les SVG existants du projet sont utilises dans leurs couleurs d'identification ; aucune licence de marque n'est presumee a partir de la seule disponibilite d'un fichier SVG.
- Logo Framer issu du [kit officiel](https://www.framer.com/brand/) : `Framer Icon Black.svg`, conserve sans recoloration. Les accents bleus concernent la composition Litus, pas le logo. [Charte de marque](https://www.framer.com/legal/trademark-guidelines/) consultee : aucune revendication du programme officiel Framer Experts. Mention d'independance dans la page.
- [Ressources de marque Shopify](https://www.shopify.com/brand-assets) consultees ; lien vers la plateforme officielle dans la page et aucune certification revendiquee.

Le manifeste `public/expertise/asset-manifest.json` distingue les originaux Litus des demonstrations officielles et contient dimensions, taille, provenance et empreinte SHA-256. La disponibilite d'une capture dans une documentation n'a pas ete assimilee a une licence universelle : faute de ressource clairement reutilisable retenue pour Shopify, Framer et Vercel, les nouvelles scenes de ces pages sont des maquettes originales explicitement identifiees. Pour les remplacer par des captures de comptes reels, utiliser un compte de demonstration autorise et retirer toute donnee personnelle.

## Generation reproductible

Le script de generation est manuel : il n'effectue aucun telechargement pendant les builds. Il utilise `sharp` deja disponible dans le projet. Les images finales sont versionnees ; aucun service externe n'est requis pour leur affichage.

```powershell
New-Item -ItemType Directory -Force .tmp/expertise-assets
Invoke-WebRequest https://raw.githubusercontent.com/stripe-samples/checkout-single-subscription/main/checkout-demo.gif -OutFile .tmp/expertise-assets/stripe-checkout.gif
Invoke-WebRequest https://raw.githubusercontent.com/stripe-samples/checkout-single-subscription/main/LICENSE -OutFile .tmp/expertise-assets/stripe-LICENSE.txt
Invoke-WebRequest https://user-images.githubusercontent.com/1204802/100067796-fc3e8700-2e36-11eb-993b-6b80b4310b87.png -OutFile .tmp/expertise-assets/wordpress-editor.png
Invoke-WebRequest https://raw.githubusercontent.com/WordPress/gutenberg/trunk/LICENSE.md -OutFile .tmp/expertise-assets/wordpress-LICENSE.txt
node scripts/generate-expertise-visuals.mjs
```

Les ressources officielles peuvent evoluer : lors d'une regeneration future, relire les licences et comparer le rendu avant publication. Le logo officiel Framer est deja versionne dans `public/brands/color`.

## Recherche et intentions

Cette passe complete les recherches individuelles deja documentees dans `docs/expertise-cluster.md`. Recherches Google France supplementaires, lecture des resultats organiques et questions visibles, sans utiliser les annonces ou apercus IA comme preuve technique :

| Requete | Observation | Traduction editoriale |
| --- | --- | --- |
| agence Shopify creation migration expert | Dedi, Agence 123, Upwedo : creation, refonte, migration et optimisation | Catalogue, parcours d'achat, migration et diagnostic avant modification |
| expert WordPress depannage maintenance | WP Support, Maintenance WP, WP Trigone : pannes, extensions, sauvegardes, WooCommerce | Edition autonome, maintenance et controle des parcours apres correction |
| expert Framer creation site optimisation | Nocode Factory, Palmsquare, Insign : creation, CMS, responsive et SEO | Design et publication avec la plateforme Framer, sans revendiquer une certification |
| agence Next.js developpement SEO migration | Agences de developpement, Alhambra Web et comparatifs : application, rendu, migration et SEO | Nouvelle page Next.js distincte de React et Vercel ; aucune promesse Lighthouse ou position Google |

React, TypeScript, Tailwind, Stripe et Vercel : intentions individuelles de la premiere recherche conservees, avec consultation complementaire de React Developer Tools, Next.js Metadata, Stripe subscriptions/webhooks et documentation Vercel. Les nouvelles descriptions illustrent des usages et non des caracteristiques non verifiees.

Pas de volume de recherche invente. Pas de copie de texte concurrent. Pas de promesse de classement. Les ALT decrivent la scene et sa nature, sans accumulation de mots-cles.

## SEO et controle de livraison

Titres et descriptions distincts, H1 unique, sections et FAQ existantes conservees. H2 supplementaires propres a chaque outil ; liens contextuels vers services et technologies complementaires. Canonical conserve, image Open Graph/Twitter propre a chaque technologie, ImageObject descriptif dans WebPage, sitemap incluant Next.js. Aucun faux avis ni resultat enrichi FAQ promis.

Images avec dimensions reservees, formats compresses et lazy loading hors hero. Le hub utilise des miniatures de 480 px ; les galeries utilisent `next/image` et un attribut sizes adapte. Les liens de licence et de source restent accessibles.

Voir les resultats de livraison dans le message de publication. Commandes :

```text
npm run test:run -- src/lib/expertise
npm run build
node scripts/expertise-http-qa.mjs http://127.0.0.1:3100
```

Le controle navigateur porte sur le hub et les neuf pages, sur desktop et mobile, ainsi que sur le menu a la souris, au clavier et au toucher. Les controles locaux ne constituent pas une mesure terrain des Core Web Vitals.

## Livraison groupee 1.06.a

Ce lot est publie avec le bloc estimation. Selecteurs de mode sombre corriges pour utiliser .dark. 50 tests reussis, build reussi, controle HTTP des dix pages, 33 destinations internes et 36 ressources reussi. Verification visuelle du menu et des galeries en theme sombre reussie.

