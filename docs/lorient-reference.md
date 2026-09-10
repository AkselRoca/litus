# Page Agence web Lorient

URL : `/agence-web-lorient`.

## Mise en page

La page réutilise les styles de la page Le Mans (`le-mans.css`) pour la grille, les titres, les boutons, les sections, les cartes de services, la méthode, le bandeau photographique et la FAQ. `lorient.css` contient les adaptations liées au contenu local, à la présentation de l’équipe, aux références et au responsive. Le header et le footer globaux sont conservés.

Le contenu est propre à Lorient et au Morbihan. Aksel est présenté comme l’interlocuteur dans le pays de Lorient, conformément au dernier brief. Arthur intervient en complément sur le référencement et la création sur mesure. Aucune adresse d’agence, implantation d’Arthur, performance chiffrée ni témoignage non documenté n’a été ajouté.

Les deux portraits sont les fichiers authentiques fournis par l’utilisateur. Les anciens briefs ne permettent pas d’associer les visages aux prénoms : ils sont donc présentés ensemble avec une légende collective, en attendant confirmation. Aucun portrait synthétique n’a été créé.

## Visuels et données locales

- Photographie du quai de Rohan à Lorient par **Taratata**, [source Wikimedia](https://commons.wikimedia.org/wiki/File:Le_quai_de_Rohan_(Lorient)_apr%C3%A8s_la_pluie_-_panoramio.jpg), sous [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/), autorisant une réutilisation commerciale avec attribution. Asset existant `/territories/lorient-port.webp` ; le lien de crédit visible renvoie à `/territories/credits.html`, qui précise la source, la licence et les adaptations.
- Carte réelle du Morbihan, îles comprises, et centres communaux officiels. Sources, projection et interactions : [lorient-map.md](./lorient-map.md).
- FG Chronodep : Caudan · Pays de Lorient. Création du site confirmée par son site officiel. Un cas interne statique `/realisations/fg-chronodep` a été ajouté sans écriture dans la base.
- LouMor Débarras : Vannes · Morbihan. Site vitrine et SEO local issus de l’entrée existante du portfolio. Le visuel du portfolio a été réutilisé et optimisé, son logo récupéré sur le site officiel.
- Sources et médias des deux projets : [lorient-project-references.md](./lorient-project-references.md). Aucun budget privé n’est exposé.

## Liens, contact et référencement

- Navigation depuis le mega menu Agences, sa déclinaison mobile, le footer et la carte photo Lorient de l’accueil.
- Le CTA secondaire du hero descend à `#realisations-locales`.
- Les cartes services conduisent aux routes existantes. En l’absence de page autonome Stratégie digitale, la carte conduit à la section méthode de la page de création de sites.
- Les CTA contact utilisent `/contact?objet=Projet%20%C3%A0%20Lorient`. Le formulaire présente cet objet et le joint au message envoyé à l’API.
- Title et description spécifiques, canonical absolue résolue, fil d’Ariane visible et JSON-LD `WebPage`, `BreadcrumbList`, `Organization`. Aucun `LocalBusiness`, adresse ou coordonnées d’un établissement fictif ; aucune balise meta keywords (l’héritage global est désactivé sur cette page).
- La page statique est incluse par next-sitemap ; les deux références locales sont également ajoutées aux chemins dynamiques du sitemap.
- La pop-up de capture générique est désactivée sur cette page afin de conserver le parcours de rendez-vous et une lecture sans interruption.

## Interactions et validation

- Apparition ponctuelle du hero et de la carte flottante ; entrées progressives des cartes services et des étapes de méthode, sans boucle permanente.
- Carte utilisable au survol, au toucher et au clavier. FAQ native avec `details`/`summary`.
- Contenu présent dans le HTML serveur, même sans JavaScript ; préférence de réduction des mouvements respectée.
- Contrôles navigateur aux largeurs 320, 390, 560, 768, 850, 1024, 1250, 1440 et 1920 px : aucun débordement ; un seul H1 ; aucune image cassée sur la page.
- Versions claire et sombre inspectées. Liens internes HTTP 200, six FAQ ouvertes, ancre de réalisations et contexte du formulaire vérifiés. La soumission du formulaire a été interceptée en test : aucun message réel envoyé.
- ESLint passé sur les fichiers concernés.
- Compilation de production `next build` réussie ; sitemap régénéré et présence de la page et des deux références locales vérifiée.
