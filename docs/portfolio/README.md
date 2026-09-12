# Portfolio Litus - build 1.08.a

## Organisation

- `src/lib/portfolio-catalog.json` : textes specifiques, perimetres, technologies, liens et selection de medias.
- `src/lib/portfolio-catalog.ts` : types partages.
- `src/lib/portfolio-projects.ts` : rapprochement du catalogue et des projets du CMS. La visibilite du CMS est conservee ; les projets hors catalogue restent disponibles.
- `src/components/portfolio/PortfolioEditorial.tsx` : filtres et composition asymetrique sur douze colonnes, avec vue liste.
- `src/components/portfolio/PortfolioCaseStudy.tsx` : fiches, galeries et liens vers les expertises.
- `public/realisations/clients/` : 55 visuels WebP locaux pour 26 projets.
- `sources-2026-09-12.json` : URLs consultees, provenance des medias et limites d'acces.

Les etudes de cas detaillees West Clotures et FG Chronodep sont conservees. West utilise des captures recentes dans son hero et sa galerie. Aucune nouvelle statistique commerciale n'a ete inventee. Aspire Marketing et Aspire Energie sont deux projets distincts.

## Perimetres confirmes

- Villa Manelann : intervention principalement sur le blog. Les photos montrent le site et les hebergements du client, pas une identite ou un site entier revendiques par Litus.
- Broadwhey : conseil et accompagnement e-commerce. Shopify observe sur le site officiel ; pas de revendication de la creation du site ou du packaging.
- Fondants Parfumes : creation ou refonte de la boutique, confirmee explicitement par le client. Shopify observe sur le site.
- Elevage Maupas : categorie E-commerce demandee ; interface Next.js de precommande, quantites et estimation. Ne pas assimiler ce parcours a une preuve de paiement en ligne.

## Provenance et utilisation des images

Les nouveaux visuels viennent des sites clients mentionnes dans la demande : captures de leurs interfaces et fichiers de marque servis par ces memes sites. Ce ne sont pas des images generiques trouvees sur un moteur de recherche. Les images ne sont pas presentees comme libres de droits : leur reutilisation reste limitee a la presentation de ces references clients dans le cadre des autorisations de Litus. Aucune licence de redistribution generale n'est supposee.

Pas de hotlinking : copies locales, formats WebP, dimensions reelles dans le catalogue, compression et chargement differe hors premier visuel. Les captures sont datees du 12 septembre 2026 ; le site du client peut evoluer ensuite. Certains univers graphiques presents sur les sites clients peuvent etre illustres ou generes : ils ne sont pas presentes comme des photographies documentaires.

## Limites de la collecte

14 anciens projets conservent leurs captures d'archive : Azra Photographie, Loumor Debarras, Geoproxio, Aspire Marketing, Menuiserie Jerome Rio, Reflexologie Lorient, Aire des Iles, BR'Z Couverture, Carnac Immobilier, Maiiana LG, Gite des Oiseaux, Plomberie 84, Concept Coiffure et Le Bolay Paysagiste.

Motifs observes : HTTP 429, expiration de navigation, pages sans leurs styles ou domaine non resolu. Les pages d'erreur et les rendus incomplets n'ont pas ete integres. Les textes de ces fiches s'appuient sur les donnees existantes et, lorsque disponible, sur les contenus des sites officiels accessibles a la recherche. Les technologies historiques de ces projets ne constituent pas une detection recente.

Le Bolay conserve sa fiche d'archive sans lien sortant actif, faute de domaine accessible. La promesse historique de classement numero un de Reflexologie Lorient n'est pas reprise sans mesure recente.

## Maintenance et publication

Un changement du catalogue doit accompagner les medias locaux correspondants. Les masquages d'un projet dans l'admin restent prioritaires. Les champs editoriaux des projets du catalogue sont geres dans ce fichier de reference pour conserver la coherence entre cartes, fiches, metadonnees et galeries.

Incrementer la version de build selon `docs/build-version.md`. Pour ce lot fonctionnel important : `1.08.a`. Le build de production est demande ; une verification visuelle desktop/mobile est une operation distincte et ne doit pas etre annoncee comme realisee sans l'avoir effectuee.
