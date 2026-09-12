# Migration des anciennes URL Litus

Audit du 12 septembre 2026. Table maintenable : `src/lib/seo/legacy-urls.json`.

## Resultats avant correction

Les quatre URL fournies (`/portfolio`, `/agence-web`, `/nous-contacter`, `/creation-de-site-internet`) repondaient HTTP 404 en production. Les versions avec slash commencaient par une 308 de normalisation, puis terminaient en 404.

Les anciens services indexes sous `/services/`, `/refonte-murasaki-team`, `/accofin`, `/portfolios/accofin`, `/creation-japan-hunter` et `/vos-questions` repondaient aussi 404 lors des controles HTTP directs. Les resultats de recherche conservaient encore leurs anciens contenus WordPress : ne pas confondre cet etat historique de l'index avec la reponse du serveur actuel.

Le sitemap public contenait encore les mentions legales, la confidentialite, l'ancien guide-prix et des images de metadonnees.

## Correspondances

24 sources explicites sont documentees avec leur justification dans le JSON. Les variantes avec et sans slash ont chacune une vraie 301 HTTP, avant le rendu React, avec conservation des parametres de requete. Aucun wildcard ne redirige les pages inconnues vers l'accueil ni vers un projet different.

- `/portfolio` : `/realisations`.
- `/agence-web` : `/a-propos`, car l'ancienne page presentait l'agence et l'equipe.
- `/nous-contacter` : `/contact`.
- `/creation-de-site-internet` : `/creation-site-internet`.
- Catalogue sans paiement : site vitrine, pas boutique e-commerce.
- Ancienne publicite en ligne : Google Ads, d'apres le contenu de l'ancienne page.
- Ancien slug `frront-end-back-end` : developpement web sur mesure.
- Etude de cas Murasaki et portfolio West Clotures : leurs propres nouvelles pages.
- Anciens index XML WordPress : index sitemap actuel.
- Alias de confidentialite et cookies : politique actuelle ; ancre `#cookies` pour les cookies.
- L'ancienne redirection applicative 308 du guide-prix reste une securite, mais la configuration HTTP la precede desormais avec une 301.

Les alias preventifs sont distingues des URL effectivement retrouvees dans l'index : leur ancienne indexation n'est pas affirmee.

## Retraits confirmes par Litus

`/services/community-management` et `/services/photos-et-videos-professionnelles` renvoient 410, avec une page explicative et `noindex`. Leur version avec slash est canonicalisee avant la reponse 410. Aucune fausse redirection vers SEO, Google Ads ou l'accueil.

## Pages hors index

`/mentions-legales` et `/politique-confidentialite` portent une meta `robots` et `googlebot` en `noindex, follow`, ainsi qu'un en-tete HTTP `X-Robots-Tag`. Elles restent accessibles depuis le site et explorables : pas de blocage robots.txt qui empecherait Google de lire le noindex. Les cookies sont une section de la politique existante, pas une nouvelle page dupliquee.

La configuration du sitemap exclut ces pages, les anciennes URL redirigees, les prestations retirees et les quatre images techniques. Le XML genere existant est nettoye sans regenerer le site avec un ancien manifeste de build.

## Sans equivalent : ne pas masquer le probleme

Les quatre URL de `unresolved` restent en 404 : Accofin (deux URL), Japan Hunter (projet precedemment retire par Litus), et l'ancienne FAQ generale. `/realisations/accofin` n'existe pas actuellement. Une redirection vers un autre client ou vers une page de prix sans la FAQ serait trompeuse. Restaurer un contenu pertinent ou confirmer un retrait 410 demande une decision editoriale distincte.

## Sources et limites

- Ancienne agence : https://www.litus.fr/agence-web/
- Ancien contact : https://www.litus.fr/nous-contacter/
- Ancien catalogue : https://www.litus.fr/services/creation-site-catalogue/
- Ancien e-commerce : https://www.litus.fr/services/creation-site-e-commerce/
- Ancien SEO : https://www.litus.fr/services/referencement-naturel/
- Ancien SEA : https://www.litus.fr/services/publicite-en-ligne/
- Ancien developpement : https://www.litus.fr/services/frront-end-back-end/
- Ancienne automatisation : https://www.litus.fr/services/automatisation/
- Murasaki : https://www.litus.fr/refonte-murasaki-team/
- West Clotures : https://www.litus.fr/portfolios/west-clotures/
- Sitemap actuel controle : https://www.litus.fr/sitemap-0.xml
- Documentation 301 Next.js : https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects
- Documentation Google noindex : https://developers.google.com/search/docs/crawling-indexing/block-indexing

La recherche publique n'est pas un inventaire exhaustif de Google. Aucun export Search Console, journal serveur historique ou export complet WordPress n'etait fourni. L'archive Wayback a renvoye HTTP 429 : pas de contournement ni de conclusion d'exhaustivite. Completer cette table avec les anciens backlinks/URL de Search Console lorsqu'ils sont disponibles.

## Verification et publication

Commande reproductible : `node scripts/check-legacy-urls.mjs http://localhost:3101` (ou l'origine de production apres publication). Elle controle les 301, slashs, parametres, absence de boucles, 410, noindex, sitemap et disponibilite des destinations.

Ne pas confondre validation locale et deploiement. La publication generale reste conditionnee aux erreurs de compilation deja signalees sur le portfolio. Cet audit ne modifie ni l'authentification admin, ni les autres travaux en attente.
