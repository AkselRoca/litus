# Création d’outils IA — intégration et vérifications

Page : `/creation-outils-ia`. Intégration finalisée le 10 septembre 2026.

## Système graphique

Le hero utilise `ServiceHero`, le même composant que les nouvelles pages services et Solutions. Aucun changement de taille, de grille ou de hauteur n’a été ajouté au composant partagé. H1, accent terracotta `#C7431B`, CTA orange `#E95E2A` et rythme vertical reprennent ce système. Les dimensions mesurées du hero et du H1 sont identiques à Artisans à 1024, 1280 et 1440 px. Sur mobile, les retours du contenu déterminent naturellement la hauteur.

Le fond utilise la photo existante `public/blog/photos/bureau-reunion-clair.webp`, référencée dans le catalogue photo du blog. Les deux portraits de l’équipe sont les fichiers fournis existants ; aucun portrait n’a été généré.

## Parcours et démonstration

- Neuf familles d’usages, trois workflows consultables, bénéfices métier, intégrations, interfaces sur mesure, méthode, confidentialité, huit questions fréquentes et bloc de contact final.
- `AiHeroDemo` présente trois cas : qualification d’une demande, recherche documentaire et extraction de données. Une séquence automatique de 8,2 secondes traverse demande, sources, analyse, action et résultat. Elle s’arrête sur le résultat ; le visiteur peut rejouer ou changer de cas.
- Les étapes sont directement consultables. Pause, reprise, validation d’exemple et navigation clavier restent disponibles. Les données sont illustratives et aucun appel à un fournisseur IA, CRM ou API métier n’est effectué par cette démonstration.
- La démonstration se suspend hors écran et lorsque l’onglet est masqué. Avec la préférence de mouvement réduit, le résultat est affiché sans lecture automatique.
- Les animations de sections conservent le contenu visible côté serveur et respectent la préférence de mouvement réduit.
- Le contact est relié à `/contact?objet=Création d’outils IA`. L’objet est affiché et le service `outils-ia` est présélectionné. La validation partagée et le libellé e-mail connaissent ce service.

## SEO et navigation

La recherche qualitative, ses sources et les intentions ciblées sont documentées dans [creation-outils-ia-seo.md](./creation-outils-ia-seo.md). Aucun volume de recherche ni résultat commercial chiffré n’a été inventé.

Title dédié, description, canonical absolue résolue via `metadataBase`, Open Graph et Twitter, image de partage 1200 × 630 générée par `ImageResponse`, H1 unique et données structurées `Service`, `BreadcrumbList` et `FAQPage`. Les huit réponses du JSON-LD sont issues du même tableau que la FAQ visible.

Liens contextuels vers Application web, Automatisation, Intégrations/API, Création de site et À propos. La page figure dans le menu desktop/mobile et le footer. Le sitemap inclut la page ; l’endpoint image de partage est exclu du sitemap des pages.

Le catalogue unique `src/lib/expertises.ts` et l’audit complet sont décrits dans [expertises-routes.md](./expertises-routes.md).

## Vérifications

- ESLint ciblé sur les nouveaux fichiers et les fichiers de contact modifiés : succès.
- `npx next build` : compilation, TypeScript et prérendu réussis.
- `npx next-sitemap` : nouvelle page incluse.
- Page vérifiée à 320, 390, 768, 1024, 1280 et 1440 px : aucun débordement horizontal et aucune erreur JavaScript observée.
- Menu vérifié de 320 à 1920 px : sept pages d’expertise HTTP 200, treize destinations distinctes, six ancres fonctionnelles en navigation cliente, état actif, survol, Échap, tabulation et focus mobile.
- Démonstration vérifiée dans ses quinze états à 320, 390, 768 et 1440 px : aucune variation de hauteur ni contenu hors cadre. Validation locale, commandes clavier, thème sombre et pause d’onglet contrôlés.
- Onglets des workflows et FAQ testés au clavier. Image OG renvoyée en PNG HTTP 200 ; canonical, titre et FAQ structurée contrôlés dans le DOM.
- Formulaire de contact testé avec interception locale de `/api/contact` : service et objet corrects, affichage de confirmation. Aucun e-mail réel envoyé dans ces contrôles.

Captures et relevés de mise en page disponibles dans `docs/qa-ai/`. Les avertissements de build déjà présents sur la convention middleware et Browserslist n’empêchent pas la compilation.
