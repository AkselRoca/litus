# Applications web — refonte de la page

Route conservée : `/creation-application-web`. Le bloc de cadrage et de développement porte toujours l’ancre `#developpement-sur-mesure`. Autres ancres : `#applications-metier`, `#parcours-application`, `#integrations-application`, `#methode-application`, `#maintenance-application`, `#faq`.

Le hero utilise le composant partagé `ServiceHero`, sans modifier sa grille ni ses tailles de texte. L’interface HTML `ApplicationHeroDemo` respecte l’encombrement des autres services : maximum 650 px, ratio 1,22 et ligne de contrôles de 37 px. La démo fait progresser un dossier fictif reçu → en cours → terminé ; les vues Tableau, Espace client et Pilotage représentent le même dossier. Un déplacement CSS suit le changement de statut. La confirmation client est locale et illustrative. Pause, reprise, relecture, interruption hors écran/onglet et état final sous mouvement réduit sont prévus. Les étapes restent consultables sans animation.

La deuxième démonstration `ApplicationWorkspace` partage un état entre trois rôles : l’équipe partage un document, le client confirme, le responsable consulte le suivi. Onglets utilisables avec flèches/Home/End ; statut annoncé après les actions. Aucun appel réseau métier ni stockage persistant.

CTA principal : `/contact?objet=Application%20web%20sur%20mesure`. Le formulaire de contact reste géré par la route partagée. Les métadonnées incluent canonical, Open Graph/Twitter, Service, BreadcrumbList et FAQPage ; les réponses JSON-LD proviennent des mêmes données que la FAQ visible.

Les faux résultats chiffrés et l’ancien cas CRM West Clôtures ne sont pas repris. Les repères commerciaux existants sont présentés comme indicatifs : outil simple autour de 5 000 €, première version en 4–8 semaines, selon le périmètre. Pas de promesse d’absence de formation, de limite technique inexistante ou de résultat garanti.

## Photographies existantes, non générées

- Fond décoratif : `/blog/photos/bureau-minimal.webp` — Roman Bozhko, [source Commons](https://commons.wikimedia.org/wiki/File:Clean_minimalist_office_(Unsplash).jpg), [CC0](https://creativecommons.org/publicdomain/zero/1.0/deed.en). Fond décoratif, flou et voile crème ; cadrage bas pour atténuer le calendrier. Le catalogue conserve dimensions et provenance.
- Atelier de cadrage : `/blog/photos/echange-tablette.webp` — Alejandro Escamilla, [source Commons](https://commons.wikimedia.org/wiki/File:Two_people_meeting_with_iphone_and_ipad_(Unsplash).jpg), [CC0](https://creativecommons.org/publicdomain/zero/1.0/deed.en). Alt : « Deux personnes échangent autour d’un carnet et d’une tablette ». Illustration générique, aucune attribution à un client ou à l’équipe Litus.

Styles communs fournis par `BusinessService` ; seuls les blocs et interfaces spécifiques sont dans cette route. Pas de modification du menu, des autres services ou du composant `ServiceHero`.

## Vérifications de cette refonte

- ESLint sur toute la route.
- Démonstrations contrôlées dans Edge à 320, 390, 768 et 1440 px : vues et statuts dans le cadre, hauteur constante du hero, état final sous mouvement réduit, navigation clavier et confirmation client.
- Séquence reçue → en cours → terminée, pause/reprise, relecture et arrêt hors écran ; suspension/reprise sur événement `visibilitychange`.
- Parcours secondaire : partage équipe → confirmation client → historique responsable → réinitialisation. Hauteur réservée sur mobile pour éviter le déplacement des éléments lors du changement de rôle.
- Route Open Graph : HTTP 200, PNG généré (1200 × 630).

Les contrôles généraux de la page et la compilation de production sont réalisés par la tâche principale.
