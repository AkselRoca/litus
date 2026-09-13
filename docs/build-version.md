# Version du build visible dans le footer

## 1.14.a - Collectivites et services publics

Refonte du hub Collectivites, cinq pages dediees (mairie, refonte, RGAA, demarches, intercommunalites), prototypes interactifs sans collecte, photographies Pexels locales et maillage SEO. Sources et choix editoriaux : docs/collectivites-1.14.a.md. Publication conditionnee au build et aux verifications demandees.

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


## 1.13.b - Redirection directe du hub historique sur Vercel

Ajout des deux redirections 301 /artisans et /artisans/ dans vercel.json pour eviter la normalisation 308 intermediaire de la plateforme.


## 1.13.c - Photographies des metiers artisans

20 photos supplementaires sous licence Pexels, deux par metier, integrees dans des galeries responsives. WebP locaux, proportions conservees, dimensions et ALT, chargement differe et credits documentes dans public/artisan/galerie/CREDITS.md. Aucune generation IA necessaire.

## 1.14.b - Performances et navigation accessible
- Affichage serveur immediat des preferences cookies, sans attente artificielle ; choix modifiables et stockage protege.
- Mesure d'audience et Vercel Analytics/Speed Insights charges uniquement apres accord, avec controle du consentement avant chaque envoi.
- Logos web optimises, image Demetis corrigee, contrastes des CTA renforces.
- Avis, listes et statistiques corriges pour les lecteurs d'ecran et les agents ; demonstration avec pause/reprise.
- Carte publique de navigation dans /llms.txt. Aucun outil agentique ne soumet de formulaire a la place du visiteur.
- Les scores Lighthouse sont mesures apres build ; aucun score constant sur tous les appareils n'est garanti.
- Mesure finale en production : performance 96 mobile / 100 desktop ; accessibilite, bonnes pratiques et SEO 100 ; navigation agentique 3/3 ; LCP mobile 2,8 s. Voir docs/performance-1.14.b.md.

## 1.14.c - Chargement initial et ressources inutilisees
- Demonstration Google extraite en composant asynchrone : son moteur d'animation charge seulement a l'approche de la section, puis animation suspendue hors zone visible.
- Textes SEO et apercu statique conserves dans le HTML serveur.
- CSS integre au HTML initial via l'option Next.js inlineCss ; les regles utiles aux autres pages ne sont pas supprimees aveuglement. Verifier les navigations client et les themes.
- Logo Nos Travaux dimensionne et compresse pour le bandeau.
- Polyfills et runtime Next.js conserves pour ne pas casser les navigateurs compatibles.
- Transition globale de navigation remplacee par Web Animations, sans moteur tiers et sans animation du premier affichage ; preference de reduction des mouvements respectee.
- Compteurs animes en requestAnimationFrame, avec annulation et valeur finale exacte.

## 1.14.d - Correction de la strategie CSS apres mesure en production
- Retrait de inlineCss : la diminution des requetes CSS n'a pas compense la regression observee sur mobile lors de trois mesures du build 1.14.c.
- Conservation des optimisations JS/images et des animations natives.
- Priorite aux temps reels et aux parcours fonctionnels, pas a la disparition artificielle des avertissements de couverture.
- Validation finale production : performance mobile 99/97/97 (mediane 97), desktop 100 ; autres categories 100 ; JS inutilise environ 27 Kio contre 69 Kio initialement. Les alertes CSS partagees et de compatibilite ne sont pas supprimees artificiellement.
