# Carte du Morbihan — page Agence web Lorient

La carte reprend le polygone réel du département 56, îles comprises, extrait de `src/components/sections/home/territory-geography.json`. Ce fichier a été produit depuis les contours départementaux simplifiés de [France GeoJSON, Grégoire David](https://github.com/gregoiredavid/france-geojson), issus des données IGN/INSEE sous [Licence ouverte](https://www.etalab.gouv.fr/licence-ouverte-open-licence/).

Les quatre repères utilisent les centres communaux du service public [API Découpage administratif](https://geo.api.gouv.fr/decoupage-administratif/communes), consulté le 9 septembre 2026. Requête utilisée pour chaque commune : `https://geo.api.gouv.fr/communes/{code}?fields=nom,code,centre`.

| Commune | Code INSEE | Longitude | Latitude |
| --- | --- | --- | --- |
| Lorient | 56121 | -3.3799 | 47.7494 |
| Guidel | 56078 | -3.4906 | 47.7938 |
| Hennebont | 56083 | -3.2694 | 47.8053 |
| Languidic | 56101 | -3.1485 | 47.8295 |

Le contour et les points utilisent exactement la même projection locale : `x = (longitude + 5.15) × 90 + 8`, `y = (49.78 − latitude) × 131 + 8`. Le SVG et les repères HTML partagent le même cadre et les mêmes proportions ; aucun point n’est déplacé pour améliorer la mise en page.

Les centres communaux ne sont pas des adresses de bureau ou des établissements Litus. Le composant les décrit comme quelques communes de la zone d’intervention. Lorient reste le repère principal. Les principales communes sont également présentées dans le texte de la page.

La légende fournit une alternative tactile et clavier aux petits repères de la carte : quatre vrais boutons avec état de sélection, nom affiché sur la carte et annonce de la sélection. Le survol est temporaire ; le toucher et la sélection clavier persistent. Aucun appel à un fournisseur de carte ni aucun suivi externe au chargement.
