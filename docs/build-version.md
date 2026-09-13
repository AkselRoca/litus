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

## 1.14.e - Composition photo de la page contact
- Grille desktop explicite : texte, photo verticale plus etroite et formulaire, avec des espaces independants.
- Meme photographie, carte au ratio 2:3 avec rayon 36 px, sans masque ovale ni fondu blanc, ombre legere.
- Avis aligne en bas a gauche, decale de 35 % de sa hauteur vers l'exterieur, sans contact avec le formulaire.
- Formulaire conserve en premier dans le DOM et dans la grille tablette/mobile, puis contenu et photo.
- Aucun texte ni champ du formulaire modifie ; seuls les styles de composition et les tailles responsives de l'image evoluent.

## 1.14.f - Realisations par lots
- Bouton Charger plus apres Femmes des Territoires, puis Menuiserie Jerome Rio, puis par lots de six.
- Ordre, cartes, hero et composition editoriale conserves ; compteur reel et reinitialisation au changement de filtre.
- Focus clavier sur le premier nouveau projet ; toutes les realisations restent disponibles sans JavaScript.

## 1.15.a - Solution Associations
- Nouvelle page /association : site associatif, HelloAsso, adhesions, dons, evenements, benevoles, espace membres et outils connectes.
- Entree Associations dans Solutions desktop/mobile et footer ; trois photos reelles Pexels locales, reference Femmes des Territoires, FAQ et maillage SEO.
- Conditions HelloAsso, recus fiscaux, Ad Grants et RGPD documentees dans docs/association-sources.md.

## 1.16.a - Audit SEO global
- Metadonnees normalisees a la source : marque unique, canonical propre par route, Open Graph/Twitter coherents et hote www.
- Titres de navigation et de demonstrations rendus non hierarchiques sans changer leur style ; contact H1 premier, formulaire mobile conserve.
- Sitemap dynamique des realisations, corrections de liens, credits techniques noindex, article de test exclu du parcours public sans suppression en base.
- Audit reproductible via scripts/audit-public-seo.mjs ; controles avant/apres et limites documentes.

## 1.16.b
Correctif de publication SEO : preserve-routing-config.cjs conserve skipTrailingSlashRedirect dans la configuration Next transmise a Vercel. Les redirections et la canonicalisation restent definies dans next.config.ts.

## 1.17.a - Atmosphere organique de la home
- Hero et contenu commercial conserves. Deux ombres vegetales diffuses, grain papier discret et lavis organique du CTA.
- Deux photographies CC0 deja creditees dans docs/blog-photo-sources.md, reutilisees sans les presenter comme des portraits de Litus.
- Deux annotations supplementaires ; mouvements CSS lies au scroll et desactives en mouvement reduit. Compteurs existants conserves, aucune dependance JS ajoutee.

## 1.18.a - Calendrier editorial et preparation des articles

Vue mensuelle et liste filtrable, apercus prives et edition avec historique, dates Europe/Paris et cadence de 72 heures. Strategie diversifiee outils/IA, artisans, associations, PME et acquisition. Conservation des articles rediges et publies.

## 1.18.b - Retouches legeres de la hero

Structure conservee. Progressions vertes discretes dans la carte Google (exemple illustre), badge +30 demandes par mois / Google Ads / Client artisan sans nommer le client. Lueurs des pins et du trajet renforcees, logos clients plus contrastes, transition creme vers les outils harmonisee. Scene desktop uniquement, composition mobile conservee.

## 1.18.c - Hero responsive grands ecrans

Dimensions internes de la scene liees a sa propre largeur, et non a la fenetre. Carte Google compacte avec colonnes distinctes, badge calibre, composition centree sur les ecrans larges. Version mobile simplifiee conservee. Le chantier estimateur 1.19.a reste hors publication.

## 1.18.d - Finitions du header

Header plus aere et largeur maximale cadree, logo et baseline agrandis, navigation plus lisible, alignement commun et separateur avant le toggle compact. CTA rehausse avec fleche horizontale. Menus repositionnes selon les hauteurs normale et compacte. Styles partages home/pages internes ; mobile conserve. Estimateur inacheve exclu de cette publication.

## 1.19.a - Estimation de marche avec email obligatoire

Parcours activite/ville puis email obligatoire avant calcul et affichage. Estimation envoyee au prospect et notification a litusagency@gmail.com, emails Litus, projection mise en avant. Honeypot, origine, limites partagees et idempotence ; aucune inscription marketing. Parcours complet avec envoi transactionnel des deux emails, reprise sans doublon et conservation dans le CRM.
