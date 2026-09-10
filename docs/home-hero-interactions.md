# Hero d’accueil — interactions des territoires

Périmètre : `HeroSection`, `TerritoryScene`, `TerritoryMap` et `territory-hero.css` uniquement.

- Photos réelles de Lorient et du Mans dans le même cadre ; images montées ensemble, fondu de 950 ms et mouvement de 3 px. Les légendes suivent la sélection.
- Alternance toutes les 6 secondes, suspendue au survol, au focus, hors écran et lorsque l’onglet est masqué. Le délai repart après l’interaction.
- Repères et noms des villes sélectionnables au survol, au clic/toucher et au clavier (Tab, Entrée, Espace).
- Entrer dans la photo affiche l’autre ville une seule fois. Passer sur ses enfants ne relance pas la sélection. Un focus clavier déjà présent conserve son lien actif.
- Bouton de pause indépendant ; la reprise automatique attend aussi la fin du survol/focus.
- Courbe géographique identique dans les deux sens : tracé de 1,4 s et lueur de 1,6 s vers la ville choisie. Le repère sélectionné est mis en évidence.
- La préférence système de réduction des animations est suivie à chaud : alternance et mouvements désactivés, sélection manuelle conservée.
- Carte Google entièrement liée à `/referencement-naturel`.
- Trois preuves sous les CTA retirées ; bandeau clients conservé. Le header et les CTA restent identiques.

## Composition affinée — 10 septembre 2026

- Nouveau H1 unique : « Votre agence web pour développer votre activité. », réparti en trois lignes, avec l’accent de titre `#C7431B` sur « développer votre activité ».
- Bloc texte de 43,8 % de la largeur ; espacements plus réguliers entre surtitre, titre, paragraphe et boutons. Le ratio et la hauteur du hero desktop sont conservés.
- Carte régionale environ 14 % plus large qu’avant : 34,78 % de la largeur du hero, contre 30,51 %. Points géographiques et interactions inchangés.
- Photo principale plus horizontale, peu inclinée, avec une deuxième photo de l’autre ville en arrière-plan. Ce second aperçu est décoratif, sans lien ni doublon pour les lecteurs d’écran ; ses images suivent la sélection inverse de la photo principale.
- Les deux photos sont masquées par fondu, sans remontage ni déplacement du cadre. L’aperçu secondaire disparaît sous 1180 px pour laisser toute la place à la photo interactive sur tablette. La nouvelle version mobile simplifiée est décrite ci-dessous.
- Fond du port conservé, élargi, un peu plus visible et moins flouté. Deux masques en dégradé fondent ses bords dans le fond crème, au-dessus de la courbe basse pour éviter une découpe nette.
- Bandeau clients placé plus bas, tailles minimales de texte conservant sa lisibilité à 1180 px. Aucun nouveau badge de réassurance ajouté.

Contrôles de cette version : 10 largeurs de 320 à 1920 px, absence de débordement, positions et lisibilité de la carte Google, accès aux repères, présence des deux photos sur desktop, fond clair/sombre. Alternance à six secondes, pause au survol, survol unique de la photo, navigation clavier, sélection tactile et préférence de réduction des animations vérifiés dans Edge. ESLint ciblé et TypeScript validés.

Photographies et licences : `/territories/credits.html`. Le Mans utilise `/le-mans-centre-cathedrale.webp` (Patrick Monchicourt, CC BY-SA 2.0), Lorient `/territories/lorient-port.webp` (Taratata, CC BY 3.0).

## Version mobile simplifiée — 10 septembre 2026

Sur l’accueil, jusqu’à 767 px inclus, la scène régionale entière est masquée : carte Lorient/Le Mans, lien « En top sur Google », photos et commandes du carrousel. Le fond photographique et ses crédits sont également masqués. Ils ne prennent plus de place et leurs liens/contrôles ne sont pas atteignables au clavier dans cette version.

Le H1, le texte, les deux CTA et les quatre logos clients restent affichés. Le bandeau clients suit directement les boutons ; seuls ses espacements verticaux sont raccourcis. La présentation tablette à partir de 768 px et le desktop conservent leurs visuels.

Les photos du carrousel utilisent le chargement différé pour éviter leur téléchargement lorsque la scène est masquée. Le contrôleur d’alternance existant reste inactif puisque la photo est hors de la zone visible. Vérification réseau sur contextes navigateur vierges : aucun téléchargement de ces photos entre 320 et 767 px ; photos correctement chargées sur tablette et desktop.

À 390 px, hauteur du hero réduite de 1545,469 px à 703,828 px. À 1440 px, rectangles du hero, de son texte et de sa scène strictement identiques. Contrôles à 320, 390, 600, 767, 768, 1024 et 1440 px, ainsi qu’à 390 px en sombre : aucun débordement, CTA et logos présents, aucune erreur JavaScript. Captures et mesures : `.tmp/home-mobile-after.*`.

## Rotation parasite de la recherche Google

Le champ de recherche interactif de `BentoFeatures` utilisait la classe d’état `is-loading`, capturée par une règle globale de `home-reference.css` qui appliquait `method-spin` à tout l’élément. La règle de rotation et son équivalent en réduction de mouvement ciblent désormais uniquement `.method-audit-ui svg.is-loading`.

Avant correction : rotation du champ mesurée à 107,785° pendant la phase de chargement. Après correction : 841 échantillons sur desktop/mobile, trois recherches et six phases, texte stable, saisie et remontée des résultats conservées, indicateurs de chargement fonctionnels. Rapport local : `.tmp/search-rotation-qa.json`.

Vérifications : lint ciblé, compilation Next.js, interactions navigateur (défilement, hover unique, clavier, toucher, destinations, réduction des animations), dimensions et absence de débordement de 320 à 1920 px, rendu clair/sombre.
