# Page Automatisation

Refonte du 10 septembre 2026. La route `/automatisation` et l’ancre `/automatisation#integrations-api` restent stables. Le hero utilise `ServiceHero` et les sections utilisent `BusinessService` sans modifier leurs dimensions communes.

## Contenu et fonctionnement

- Landing dédiée : bénéfices, trois scénarios illustratifs, intégrations/API, comparaison de parcours, validation humaine, fiabilité, méthode, six FAQ et contact.
- Aucun résultat client, statistique ni réalisation d’automatisation non attesté. Les anciens exemples décoratifs et garanties absolues sont supprimés.
- Le repère commercial existant de 499 € à partir de est conservé pour un scénario simple. Conception, abonnements tiers et suivi sont distingués ; périmètre confirmé sur devis.
- Sujet de contact : **Automatisation & intégrations API**, via `/contact?objet=Automatisation%20%26%20int%C3%A9grations%20API`.
- FAQ visible et données structurées FAQPage proviennent du même tableau. Service et BreadcrumbList décrivent uniquement cette page.
- Démo HTML/SVG avec trois déclencheurs : formulaire, e-mail et changement de statut CRM. Déroulement unique de 8,5 secondes puis récapitulatif durable. Quatre étapes inspectables, onglets avec flèches/Home/End, pause et reprise, replay. Aucun appel réseau ni donnée réelle.
- État serveur stable, affichage final en mouvement réduit, pause hors écran ou onglet masqué. Pas de boucle automatique.

## Images existantes vérifiées

- Décor hero : `/blog/photos/bureau-notes-analyse.webp`, Javier Quesada, CC0, [Working at office](https://commons.wikimedia.org/wiki/File:Working_at_office_(Unsplash).jpg). Fond décoratif non exposé aux lecteurs d’écran, faible contraste.
- Section humaine : `/blog/photos/analyse-documents-v2.webp`, Christina Morillo / Pexels, [photographie source](https://www.pexels.com/photo/woman-sitting-in-front-of-computer-monitor-1181635/), [licence Pexels](https://www.pexels.com/license/). Alt factuel et crédit visible ; cette professionnelle n’est pas présentée comme une cliente Litus.
- Provenances reprises du catalogue `src/lib/blog/photo-catalog.ts`, confirmées par l’agent de vérification des médias. Aucun nouveau visuel généré.

## Sources techniques consultées

- [n8n — HTTP Request](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) : appels à des API REST, authentification et paramètres selon les services. Aucune compatibilité garantie pour un logiciel précis.
- [Make — Error handling](https://help.make.com/error-handling) : possibilités de gestion des erreurs et de reprise. La page présente la démarche de conception et le suivi à convenir, sans promettre une absence de panne.

Les contrôles d’accès, la validation et la documentation sont présentés comme des points de cadrage de la prestation, et non comme une certification de conformité.

## Vérifications

- ESLint ciblé réussi pour la page et la démonstration.
- Navigateur Edge : 1440, 1280, 1024, 390 et 320 px, sans débordement horizontal, texte coupé ni erreur JavaScript. Thème sombre contrôlé visuellement.
- Hero : 785,8 px à 1440, 738 px à 1280 et 711,8 px à 1024. Le H1 occupe quatre lignes à 1440 et utilise exactement la taille, la largeur et la position du composant partagé.
- Démonstration mobile compacte : environ 339 px, avec résumé de l’étape active ; contrôles, scénarios et points de validation conservés. Le hero complet mesure environ 1072 px à 390 et 1113 px à 320.
- Progression automatique, pause/reprise, changement de scénario, navigation au clavier, choix direct d’une étape, replay, pause hors écran et pause dans un onglet masqué vérifiés.
- Mouvement réduit : état final visible, aucune animation ni bouton de lecture automatique.
- Six réponses FAQ identiques au JSON-LD ; ancre API résolue sur une section HTML, à 112 px du haut après navigation.
- Aucun formulaire réel envoyé. `/api/track` simulé pendant les vérifications. Aucun build ni redémarrage du serveur par ce sous-travail.
