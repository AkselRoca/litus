# Systeme editorial Litus

## Architecture et analyse

L'inventaire du projet est dans `site-audit.json` : routes, composants, titres,
liens, metadata, dependances et configuration sitemap/cron. Le script
`node scripts/editorial-inventory.mjs` analyse les fichiers source et genere
le registre des routes utilise par le moteur. Il bloque si une destination du
menu des expertises n'existe pas. Aucun slug de service n'est invente.

Architecture conservee : Next.js App Router, Vercel Pro, Turso/libSQL,
administration NextAuth, blog hybride (articles locaux + Prisma), Cloudinary.
Les 13 offres de la navigation ont chacune leur cluster. Les contenus locaux
existants sont inclus dans le catalogue analyse avant toute nouvelle redaction.
Les estimations commerciales Gemini de l'ancien estimateur ne sont jamais
utilisees comme des sources factuelles de l'editeur.

## Fonctionnement autonome

Vercel appelle `/api/cron/editorial` toutes les cinq minutes avec CRON_SECRET.
Le worker ne genere pas un article a chaque appel : il avance une etape d'un
brouillon en cours ou sort immediatement. Il prepare les sujets jusqu'a six
jours a l'avance. L'initialisation cree 39 hypotheses editoriales, en rotation
sur les 13 services. Les dates sont ancrees au premier creneau, demain a 07:00 UTC,
puis espacees de 96 heures exactement. Le tableau initial est exporte dans
`initial-calendar.json`. Les dates effectivement programmees sont dans Turso.

Le rythme est un delai de 96 heures, y compris aux changements de mois/annee
et d'heure. L'heure francaise varie donc lors du passage ete/hiver. Vercel
n'est pas une horloge temps reel : la publication se fait au premier passage
disponible apres la date due. Aucun rattrapage en rafale n'est autorise : il
doit aussi s'etre ecoule 96 heures depuis la derniere publication effective.
Le critere de qualite prime toujours sur la cadence.

Etapes persistantes : recherche Google DataForSEO (requete, variante et recherche
officielle), telechargement des sources, analyse SERP/intention/cannibalisation,
plan, redaction, verification factuelle, edition, liens contextuels, metadata,
trois passages images, revue finale, quality gate, programmation, publication.
Le systeme exige trois sources lisibles dont une officielle. Un resultat de
recherche seul n'est pas considere comme une source lue. Les extraits de preuve
du fact checking doivent reellement se retrouver dans les textes telecharges.

Les recherches, sources, dates, images/licences, liens, brouillons, critiques,
scores et erreurs restent en base. Les statistiques, fonctionnalites, citations,
clients, anecdotes et resultats Litus inventes sont interdits dans les consignes
de chaque generation et dans la revue finale. La revue automatisee diminue les
risques, sans constituer une garantie absolue de veracite humaine.

Les textes concurrents servent exclusivement a analyser la SERP et ses lacunes.
La redaction et les verifications factuelles recoivent uniquement les sources
officielles lues. Une statistique reprise d'un blog concurrent ne devient pas
une preuve acceptable simplement parce que ce blog l'affirme.

Deux fournisseurs de recherche Google sont implementes. DataForSEO fournit les
positions SERP si le compte dispose de credits. En cas de refus 402, quota 429
ou indisponibilite 503, une vraie recherche Google via Gemini Grounding prend
le relais ; elle doit fournir webSearchQueries et groundingChunks. La recherche
est aussi selectionnable avec EDITORIAL_SEARCH_PROVIDER=gemini. Cette voie ne
mesure pas les positions : rank=0 et le fournisseur sont conserves explicitement.
Le moteur ne presente donc pas ces pages comme les premiers resultats Google.
Dans les deux cas, les sources doivent ensuite etre effectivement telechargees.

## Images et droits

Recherche Wikimedia Commons avec metadonnees de licence. Licences acceptees :
CC0, domaine public, CC BY et CC BY-SA 1.0 a 4.0. Images exclues en cas de
restrictions supplementaires indiquees. Les miniatures sont inspectees par le
modele avant selection. Une image ne convenant pas au sujet bloque l'etape.
Trois fichiers distincts : hero, milieu et partie basse. Telechargement puis
stockage Cloudinary propre a Litus, limite de dimensions, conversion WebP,
compression automatique, dimensions HTML, alt descriptif, credits et licences.
Les images ne sont pas des representations de Litus ou de ses clients.
Les photographies Pexels/Wikimedia deja acquises et creditees dans le catalogue
du site peuvent completer la recherche ; elles sont reexaminees visuellement
pour le sujet. Les SVG Wikimedia ne sont utilises que via leurs miniatures
raster, jamais injectes comme code SVG distant.

## Fiabilite et securite

Tables dediees creees de facon additive et idempotente : EditorialState,
EditorialItem, EditorialEvent, EditorialBacklink. Aucune migration destructive
des tables existantes. Verrou partage avec expiration et identifiant de
proprietaire ; sauvegardes conditionnees au verrou. La publication et l'horloge
sont mises a jour dans une seule transaction. Un slug est unique par environnement.
Une empreinte du contenu valide empêche une publication apres modification du
brouillon sans nouvelle validation. Les pages de test ne sont jamais lues par
le blog ni le sitemap de production.

Le telechargement web accepte HTTPS uniquement, bloque les adresses privees,
verifie les redirections, fixe l'adresse DNS effectivement jointe et limite
taille et duree. Le modele produit des blocs structures, jamais du HTML executable.
Les documents web sont des donnees non fiables, pas des instructions.

En cas d'erreur, conserver le brouillon FAILED et la phase. Trois tentatives
maximum par etape, espacees de 30 puis 60 minutes, puis reprise explicite dans
l'admin. Deux corrections automatiques maximum apres refus du quality gate.
Une panne ou un manque de preuves n'autorise jamais un contenu de secours.
Une nouvelle recherche est imposee avant publication si la recherche a plus
de sept jours. Les controles HTTP des liens sont refaits avant publication.

## Administration

`/admin/editorial` : calendrier production, dates, cluster, requete, intention,
angle, raison, priorite, etape, score, erreurs, pause/reprise et relance.
`/admin/editorial?mode=test` : cycle prive avec apercu, sources et images.
Acces limite aux roles admin/dev, verifie cote serveur. Les mutations navigateur
utilisent les Server Actions Next.js. L'API d'exploitation exige CRON_SECRET.
Ne jamais coller un secret dans une URL ou dans les logs.

Le calendrier est renouvele par une nouvelle recherche apres chaque groupe de
cinq publications, ou lorsqu'il reste moins de dix idees. En cas de panne du
planificateur, nouvelle tentative le lendemain ; le journal conserve l'erreur.
Les priorites et la concurrence qualitative sont des hypotheses editoriales,
pas des volumes de recherche mesurés. La comparaison lexicale est completee par
la revue semantique du catalogue entier avant chaque brouillon.

Apres publication, le moteur propose au plus deux liens depuis des anciens
articles. Il ne remplace qu'une expression existante dans un paragraphe sans
lien. Ces ajouts sont des surcouches conservatrices, avec empreinte du contenu
original ; si le contenu a change, la surcouche ne s'applique plus. La date de
modification ne change que si un lien est reellement insere. Les articles
peuvent toujours etre actualises par leur editeur existant. Une intention deja
couverte est refusee plutot que republiee sous un autre slug.

## Actualiser un article automatise

Le bouton d'actualisation du calendrier cree un brouillon de revision. L'article
public reste accessible pendant la recherche, la redaction et les controles.
La revision utilise le meme quality gate et ne change pas la date de publication
ni le rythme des nouveaux articles. Une transaction remplace le contenu seulement
si l'original n'a pas change entre-temps ; son ancienne version est conservee dans
EditorialRevisionSnapshot. La date de modification ne change que si le contenu
ou les images changent effectivement. Les revisions terminees sont exclues du
catalogue public et du compteur de nouvelles publications.

## SEO et rendu

Le blog existant conserve sa typographie, ses cartes et son gabarit de lecture.
Categories et pagination sont etendues. Articles rendus cote serveur avec un H1,
sommaire, metadata, canonical, BlogPosting, BreadcrumbList, dates et auteur
institutionnel. CTA selon la page commerciale concernee.

`/blog-sitemap.xml` est dynamique et annonce dans robots.txt et sitemap.xml. Il inclut uniquement
les articles publics et leurs vraies dates de modification. Il ne depend pas
d'un nouveau deploiement. L'ancien sitemap de build reste pour les pages statiques.
La publication invalide le cache du blog ; les articles utilisent aussi ISR 60 s.

## Configuration et exploitation

Variables serveur : EDITORIAL_ENABLED=true, CRON_SECRET (32 caracteres minimum),
GEMINI_API_KEY, DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD, CLOUDINARY_CLOUD_NAME,
CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, TURSO_DATABASE_URL, TURSO_AUTH_TOKEN.
EDITORIAL_MODEL est configurable (defaut : gemini-2.5-flash). Aucune cle dans Git.
Les API externes consomment les quotas/credits de leurs comptes existants.
Le cron Pro est necessaire a la frequence choisie, sans nouvelle offre souscrite.

Commandes, apres chargement des variables serveur dans l'environnement :

```sh
node --import tsx scripts/editorial-ops.ts tick test
node --import tsx scripts/editorial-ops.ts status test
node --import tsx scripts/editorial-ops.ts preview test
node --import tsx scripts/editorial-ops.ts calendar
npm run test:run -- src/lib/editorial/editorial.test.ts
npm run build
```

`tick test` avance une seule etape et ne publie jamais. Un essai reel contacte
Google, Gemini et Wikimedia et cree des fichiers dans le dossier Cloudinary
de test. Ne pas utiliser `tick production` pour tester. Les brouillons et
resultats de QA locaux sont dans `.tmp/` (ignore par Git).

Pour suspendre l'automatisation : pause dans l'admin (sans deploiement), ou
EDITORIAL_ENABLED=false puis redeploiement. Rotation CRON_SECRET dans Vercel,
puis redeploiement. Aucun poste utilisateur n'a besoin de rester allume.

## References techniques

- https://vercel.com/docs/cron-jobs/manage-cron-jobs
- https://vercel.com/docs/cron-jobs/usage-and-pricing
- https://docs.dataforseo.com/v3/serp-se-type-live-advanced/
- https://ai.google.dev/gemini-api/docs/structured-output
- https://www.mediawiki.org/wiki/API:Imageinfo
