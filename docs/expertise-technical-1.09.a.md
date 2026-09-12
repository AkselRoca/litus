# Expertises techniques - 1.09.a

## Perimetre

- Conserver les neuf expertises existantes et leurs contenus, illustrations et interactions.
- Ajouter `/expertise/python`, `/expertise/csharp`, `/expertise/dotnet` et `/expertise/labview`.
- Remplacer la grande grille du hub par huit categories de besoins, une recherche globale et un panneau de decouverte par technologie.
- Affirmer le developpeur dedie a travers les usages possibles, sans inventer de realisations, certifications ou performances.
- Mettre les offres commerciales avant les outils dans le mega-menu. Trois cartes : Shopify, React, WordPress. Les autres technologies figurent dans une bande secondaire.
- Conserver les controles de navigation du header ; le bandeau possede une commande de pause, une pause au survol/focus et une alternative sans animation en mouvement reduit.

## Contenus et limites

Les applications presentees sont des possibilites de projet, pas des references clients deja livrees. C# et .NET ont des pages distinctes : langage et logique metier d'un cote, plateforme, API et exploitation de l'autre. LabVIEW est presente dans son contexte de mesure et d'instrumentation, avec les contraintes de pilotes, licences, materiel et validation. Aucune competence de certification metrologique ou de systeme de securite n'est revendiquee.

Les quatre nouvelles pages utilisent le template d'expertise existant : H1, sections semantiques, deux illustrations contextuelles, FAQ, liens de services, technologies connexes, sources et CTA. Metadata, canonical, image Open Graph, Schema Service/WebPage/FAQPage et sitemap sont raccordes aux nouvelles routes. La presence d'un Schema FAQ ne garantit pas un resultat enrichi Google.

## Sources consultees le 12 septembre 2026

- Python : https://www.python.org/about/apps/
- Lecture CSV : https://docs.python.org/3/library/csv.html
- asyncio : https://docs.python.org/3/library/asyncio.html
- C# : https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/overview
- .NET : https://learn.microsoft.com/en-us/dotnet/core/introduction
- Minimal APIs : https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-10.0
- Migration : https://learn.microsoft.com/en-us/dotnet/core/porting/
- LabVIEW : https://www.ni.com/en-us/shop/labview.html
- Programmation graphique : https://www.ni.com/en/shop/labview/benefits-of-programming-graphically-in-ni-labview.html
- Editions : https://www.ni.com/en/shop/labview/select-edition.html
- Methodes LabVIEW : https://www.ni.com/en/support/documentation/supplemental/09/software-engineering-with-labview.html

Les versions, compatibilites et conditions de licence doivent etre confirmees au cadrage du projet. Les pages evitent les promesses de compatibilite ou de performance sans analyse.

## Visuels et droits

Les huit grandes illustrations techniques sont des compositions originales Litus : tableaux de suivi, schemas de flux et architectures, avec donnees fictives. Elles sont explicitement distinguees des captures officielles et des realisations clients. Elles ont ete produites a 1280 x 800, compressees en WebP et disposent de dimensions/ALT dans `visuals-technical.ts`. Quatre images Open Graph dediees ont ete creees a 1200 x 630. Les visuels existants Shopify, WordPress, Framer et autres sont conserves, avec leurs provenances deja documentees.

Les logos sont heberges localement, sans recoloration ni hotlinking :

- Python : fichier lie depuis https://www.python.org/community/logos/ ; politique https://www.python.org/psf/trademarks/ ; usage descriptif sans modification.
- C# : https://raw.githubusercontent.com/dotnet/brand/main/logo/language-icons/csharp-72.svg ; icone officielle fournie pour identifier le langage, non modifiee.
- .NET : https://raw.githubusercontent.com/dotnet/brand/main/logo/dotnet-logo.svg ; directives https://github.com/dotnet/brand.
- Google Ads : https://www.gstatic.com/images/branding/product/2x/ads_48dp.png ; identification du produit, aucun statut Google Partner revendique.
- LabVIEW : https://ni.scene7.com/is/image/ni/LabVIEW?$ni-icon-pm$&wid=144&fmt=png-alpha ; source trouvee sur la page produit officielle. Le client a confirme explicitement que Litus dispose de l'autorisation NI. La portee de cette autorisation reste celle de son accord avec NI ; aucune certification ou affiliation n'est revendiquee.

L'illustration d'appareils dans le hero .NET provient de `dotnet/brand/spot-illustrations/devices1.png`, sous CC0. Sa taille d'affichage est inferieure a sa resolution source (251 x 250). La licence accompagne le fichier dans `public/expertise/licenses/dotnet-brand-CC0.txt`. Les marques ne deviennent pas libres de droits du seul fait de la licence d'une illustration.

## Livraison

Version footer : 1.09.a, lot fonctionnel suivant 1.08.a. Le build de production et le deploiement sont distincts d'une recette visuelle ou d'un test de formulaire. Ne pas annoncer ces derniers comme effectues sans execution explicite.
