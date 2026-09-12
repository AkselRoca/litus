# Version du build visible dans le footer

Le numéro de build affiché dans le footer se trouve dans `src/components/layout/Footer.tsx`, dans le texte `Build ...`.

## Règle d'incrémentation

## 1.12.d - Téléphone obligatoire sur Contact

Ajout du champ téléphone sur mobile et desktop dans le formulaire de contact compact, avec validation du format et du caractère obligatoire côté formulaire et API. Les formulaires propres aux services conservent leurs règles existantes.

## 1.12.b - Retour au design précédent du portfolio
 
La version 1.12.c restaure également le hero centré « Des projets pensés pour convertir. », son badge Portfolio et ses annotations manuscrites, sans modifier les cartes ni les données des projets.

Restauration des proportions, cadrages, inclinaisons et superpositions de la version précédente de Réalisations. Les projets ajoutés, leur ordre et le cas acquisition SARL Péan J sont conservés.

### Convention de numérotation

- Changement mineur ou correctif isolé : incrémenter la lettre, par exemple `1.01.d` -> `1.01.e`.
- Lot de modifications visible côté utilisateur, refonte de bloc, emails, responsive ou plusieurs fichiers : incrémenter le deuxième nombre et repartir à `a`, par exemple `1.01.d` -> `1.02.a`.
- Refonte majeure ou changement très large du site : incrémenter le premier nombre, par exemple `1.02.a` -> `2.00.a`.

## Avant chaque publication

1. Mettre à jour le build dans `src/components/layout/Footer.tsx`.
2. Lancer `npm run build`.
3. Si le build réussit, committer le changement avec le reste du lot puis pousser la branche Git courante automatiquement.
4. Déployer sur Vercel selon la consigne de publication du projet.

Cette procédure s'applique après chaque modification demandée. Si le build échoue, signaler le blocage et ne pas publier un lot en échec. Ne pas inclure les changements sans rapport avec le lot et ne jamais forcer le push.

## 1.12.a - Expertises, portfolio et parcours de navigation

Enrichissement des expertises et des réalisations, ajout du cas Google Ads SARL Péan J, nouvelle page 404, redirections historiques et désindexation des pages légales. Cette version identifie le lot local ; la publication est conditionnée à la réussite du build.

## Livraison 1.05.a

Mega menu compact, neuf technologies, galeries et SEO image. Lot visible : incrementation du deuxieme nombre, retour a la lettre a. Voir `docs/expertise-visual-refresh.md`.

## Livraison locale 1.06.a

Reproduction du bloc estimation : grille trois colonnes, photo IA et annotations. Build footer incremente pour ce nouveau lot visible. Publication non effectuee a ce stade ; voir docs/estimator-reference-image.md.


## Publication 1.06.a

Correction des selecteurs de theme du mega menu et des galeries : utilisation de la classe .dark du site. Publication commune des expertises et du bloc estimation avec photo IA.


## 1.06.b - Correctif connexion / 2FA

Lecture des dates de configuration compatible avec les colonnes INTEGER de Turso/LibSQL, sans migration ni changement des identifiants. Distinction entre indisponibilite serveur et identifiants refuses. Ajout du test de regression `node node_modules/tsx/dist/cli.mjs scripts/admin-libsql-qa.ts`.


## 1.07.a - Page contact fidele a la reference

Composition avec photographie reelle sous licence Unsplash, avis client existant, reperes du site, annotations manuscrites, carte formulaire et responsive. Logique de contact et securite preservees. Source visuelle documentee dans `docs/contact-reference-design.md`.


## 1.08.a - 12 septembre 2026

Lot fonctionnel : refonte éditoriale du portfolio et enrichissement de 26 projets. 55 visuels WebP locaux, galeries, filtres, maillage expertise, séparation Aspire Marketing / Aspire Énergie, normalisation Demetis et remplacement du cas e-commerce par Fondants Parfumés. Les études de cas détaillées West et FG Chronodep sont conservées. Voir docs/portfolio/README.md pour les sources et limites de collecte.


## 1.09.a - Expertises techniques et navigation

Nouveau lot fonctionnel : explorateur par besoins et recherche, quatre expertises Python/C#/.NET/LabVIEW, cas d’usage et visuels originaux, méga-menu centré sur les offres, trois cartes outils et bandeau secondaire contrôlable. Sources et droits : docs/expertise-technical-1.09.a.md. L’autorisation NI d’utilisation du logo LabVIEW a été confirmée par le client.


## 1.09.b - Textes des réalisations

Retrait des mentions de précaution sur la création complète des projets et simplification des formulations internes au portfolio. Les interventions restent décrites fidèlement : blog pour Villa Manelann, conseil e-commerce pour Broadwhey.


## 1.13.a - Hub artisans et dix pages metier

Nouveau hub /artisan, redirection 301 de /artisans, contenus metier, photos locales optimisees, tarifs publics, cas clients documentes et maillage SEO.
