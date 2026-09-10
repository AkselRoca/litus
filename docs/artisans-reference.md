# Page Artisans

Route conservée : `/artisans`. Référence : `codex-clipboard-9d35ce83-8362-454a-a3d1-ae2f54f130bb.png`, avec le brief utilisateur associé.

## Composition

Hero commun `ServiceHero`, bandeau de quatre bénéfices, réalités du métier, grille des dix activités, téléphone et présentation de l'accompagnement, méthode, guide gratuit, FAQ et appel à l'action final sombre. Header, logo, navigation et footer existants conservés. Le popup automatique est désactivé sur cette page pour ne pas interrompre l'accès au guide.

Polices et hiérarchie des pages services, avec l'orange du thème `var(--litus-orange)` pour les accents conformément à ce brief. Les teintes abricot, les fonds et les halos proviennent de `color-mix()` ; aucun nouveau code orange indépendant. Les modes clair et sombre sont pris en charge. Les logos Google conservent leurs couleurs.

La photographie d'atelier est réelle et disponible sous CC0. Source et crédit dans `public/artisans/CREDITS.txt`. Aucun portrait généré ou témoignage fictif n'est utilisé.

## Interactions

- Hero : saisie, fiche artisan, notification illustrative de demande. Une séquence puis état stable, avec pause et relecture.
- Téléphone : recherche « menuisier Lorient », fiche d'exemple et mise en évidence du contact. Son bouton simule une interaction locale et n'envoie aucune demande.
- Métiers : dix boutons accessibles et description adaptée à l'activité sélectionnée. Les pages métiers n'existant pas, aucun lien vide n'est créé ; le lien de contact reste disponible.
- Méthode : une seule étape active, progression 01 à 04, attente de la visibilité des cartes sur mobile, pause/reprise et relecture.
- Toutes les démonstrations suspendent leur progression hors écran ou dans un onglet masqué. Avec réduction des mouvements, l'état complet est immédiatement lisible.

Les contenus retirent les anciens pourcentages, volumes d'appels, promesses de première position et garanties de résultat. Les liens internes pointent vers Google Ads, SEO local, création de site, contact et la page Le Mans existante.

## Guide gratuit

Le fichier existant `public/lead-magnets/checklist-gmb-litus.pdf` est un vrai PDF de deux pages. Le contenu du PDF partagé n'a pas été modifié. La page réutilise sa configuration et `/api/lead-magnet`, avec validation, attente, erreur conservant les valeurs, confirmation et téléchargement explicite du fichier réel. Elle ne promet pas un envoi du PDF par email, que cette API ne réalise pas.

## Vérifications

- ESLint ciblé et compilation Next.js réussis.
- Neuf largeurs contrôlées de 320 à 1920 px : aucun débordement horizontal ni texte important coupé.
- À 1920 x 1080 : hero de 799 px environ, bandeau suivant visible, H1 Inter 650 / 66 px comme les pages services.
- Méthode séquentielle, pause, reprise, arrêt hors écran et mouvement réduit vérifiés en navigateur ; pas d'erreur JavaScript.
- Dix métiers testés au clavier, une seule sélection active et aucune variation de hauteur de la zone descriptive à 320, 390, 768 et 1440 px.
- Guide et FAQ testés sur mobile : validation, attente, erreur, succès, focus et téléchargement du vrai PDF vérifiés. Les deux requêtes API de test ont été interceptées ; aucun envoi réel ni test de délivrabilité email.
