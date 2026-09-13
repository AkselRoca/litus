# Build 1.14.c : ressources du premier affichage

## Changements

- La demonstration Google est conservee, mais son code Framer Motion est importe seulement a l'approche de la section. Son texte commercial reste rendu sur le serveur et un apercu reserve la place de l'interface.
- La transition globale de page ne charge plus Framer Motion : Web Animations intervient uniquement pendant une navigation, pas sur le premier affichage.
- Les compteurs utilisent requestAnimationFrame, sans mesure de mise en page. Annulation, valeur finale exacte et preference de reduction des mouvements sont testees.
- Le logo Nos Travaux est redimensionne et compresse dans un fichier distinct, sans modifier l'original.
- L'option experimentale Next.js inlineCss evite les requetes de feuilles de style avant le premier affichage. Elle ne supprime pas les regles hors ecran : le HTML transporte ces styles, au prix d'un HTML plus volumineux et d'une mutualisation du cache CSS moins favorable entre pages. Les navigations client ont ete testees.

## Controles avant publication

- Build production et sitemap generes sans erreur.
- 42 assertions fonctionnelles reussies.
- Navigation client accueil > realisations > contact > accueil, affichage de l'animation differee et mode sombre verifies.
- Quatre comportements des compteurs verifies : progression, fin exacte, annulation et mouvements reduits.
- Lighthouse local : accessibilite, bonnes pratiques et SEO 100 ; tous les controles agentiques applicables reussis.
- Sur mobile local, aucune requete CSS bloquante et aucune alerte de dimensionnement d'image. Le seul fichier signale en JavaScript inutilise appartient au runtime Next.js ; la transition et la demonstration ne sont plus dans le chemin initial.

## Alertes conservees volontairement

Le code Next.js contient des fonctions servant pendant les interactions et la navigation : elles ne sont pas toutes executees au chargement. Le retirer aveuglement casserait des parcours. Les polyfills inclus par le framework ne sont pas retires pour contourner l'alerte de JavaScript ancien. Les styles utilises plus bas, dans les menus et dans les autres etats restent presents. Une alerte de couverture n'est pas la preuve qu'une ressource peut etre supprimee.

## Sources

- [CSS integre au HTML dans Next.js](https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss)
- [Chargement conditionnel Next.js](https://nextjs.org/docs/app/guides/lazy-loading)
- [Navigateurs et polyfills Next.js](https://nextjs.org/docs/architecture/supported-browsers)
- [Chargement asynchrone de Motion](https://motion.dev/docs/react-lazy-motion)

Rapports detailles et captures locaux : `artifacts/performance-1.14.c/`. Les mesures de production sont ajoutees apres publication, sans promettre un score fixe pour toutes les executions PageSpeed.
