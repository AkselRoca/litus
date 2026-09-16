# Anciennes URLs - 1.20.c

Export Search Console transmis le 16 septembre 2026. Les dates d'exploration sont historiques, pas des controles du site actuel.

## Redirections 301

Les variantes avec et sans slash pointent directement vers la destination canonique.

| Ancienne URL | Destination |
| --- | --- |
| /landing | /creation-landing-page |
| /portfolios/aire-des-iles | /realisations/aire-des-iles |
| /portfolios/fondants-parfumes | /realisations/fondants-parfumes |
| /portfolios/bolay-paysagiste | /realisations/le-bolay-paysagiste |
| /portfolios/aspire-marketing | /realisations/aspire-energie |
| /portfolios/femmes-des-territoires-prix | /realisations/femmes-des-territoires |
| /portfolios/geoproxio | /realisations/geoproxio |
| /tag/site-vitrine | /creation-site-internet |
| /tag/referencement | /referencement-naturel |
| /portfolios/loumor-debarras | /realisations/loumor-debarras |

Loumor est une URL supplementaire retrouvee dans les resultats de recherche. Aspire Marketing etait le doublon retire a la demande de Litus ; le dossier conserve est Aspire Energie. Le projet Prix rejoint la reference globale du meme client Femmes des Territoires.

## Ressources retirees : 410

- /wp-includes/js/wp-emoji-release.min.js (y compris ?ver=7.0.3)
- /wp-content/plugins/burst-statistics/assets/js/build/burst-goals.js (y compris ?v=1.8.0)
- /tag/refonte/feed
- /tag/site-internet/feed
- /portfolio-category/e-commerce/feed
- /portfolio-category/enseigne/feed

Les flux n'ont pas d'equivalent RSS actuel. Les deux fichiers JS appartiennent a l'ancien WordPress. Ne pas les rediriger vers du HTML avec un statut de succes. Aucune regle generale sur /wp-content : ne pas retirer des images historiques par accident.

Next normalise d'abord les doubles slashs et le slash final avec une 308 ; la ressource normalisee renvoie ensuite 410 avec noindex. Une protection Vercel peut intercepter les chemins WordPress avant l'application (403 observe avant modification) : ne pas desactiver un pare-feu pour masquer un ancien lien de script.

Configuration de reference : src/lib/seo/legacy-urls.json, consommee par next.config.ts. Les 301 sont aussi declarees dans vercel.json, comme les redirections historiques existantes.

Google recommande 301 pour un contenu deplace et 404/410 pour un contenu retire sans equivalent : https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors

Le rapport Search Console se met a jour apres une nouvelle exploration, pas immediatement apres le deploiement. Une exclusion pour redirection ou contenu retire est attendue ; ces anciennes URLs ne doivent pas etre indexees.
