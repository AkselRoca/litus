# Audit SEO global Litus : build 1.16.b

Audit du 13 septembre 2026. Crawl initial de la production, corrections dans les sources communes, build de production local, contrôles navigateur puis nouveau crawl de https://www.litus.fr après publication.

## Résultats mesurés

| Contrôle | Avant | Après |
| --- | ---: | ---: |
| Pages indexables | 126 | 124 |
| URLs dans les sitemaps | 98 | 124 |
| Titres avec plusieurs occurrences de Litus | 38 | 0 |
| Canonicals incohérentes | 78 | 0 |
| Pages indexables dont le premier titre HTML n’est pas le H1 | 125 | 0 |
| Liens internes conduisant à une 404 dans le crawl | 3 | 0 |

- 124 pages indexables contrôlées : title, description, canonical, Hn, images, liens, métadonnées sociales et JSON-LD. Inventaire par URL dans [seo-global-1.16.b.json](seo-global-1.16.b.json).
- 248 chargements navigateur sur le build de production : chaque page en 390 px et 1440 px. Aucun débordement horizontal, aucune erreur JavaScript ni image visible cassée lors du dernier passage.
- 294 ressources graphiques internes contrôlées : aucun fichier manquant. Les images différées hors écran sont également couvertes par ce contrôle de leurs sources.
- 75 contrôles locaux de redirections, destinations et indexation réussis. Les pages légales et les crédits techniques restent accessibles aux robots pour qu’ils lisent le noindex.
- Les ancres internes pointant vers des pages parcourues existent dans le DOM. Le menu mobile s’ouvre ; le menu Solutions fonctionne au clavier et se ferme avec Échap ; le lien d’évitement est le premier lien au clavier.
- Le formulaire contact reste avant le contenu sur mobile et le téléphone reste obligatoire sur mobile et desktop. Aucun message de test n’a été envoyé à un prospect.

## Corrections dans les sources

### Métadonnées et indexation

La fonction partagée pageMetadata fixe un title absolu, une seule marque, une canonical sur www.litus.fr et des métadonnées sociales cohérentes. Elle ne dépend pas d’une modification du head après hydratation. Le postbuild conserve également skipTrailingSlashRedirect dans le manifeste runtime Next 16 utilisé au déploiement. Le template parent ne rajoute plus une seconde marque et la canonical de l’accueil n’est plus héritée par d’autres pages. Les meta keywords ont été supprimées.

Les pages de réalisations ont maintenant un sitemap dynamique dédié. Le sitemap principal référence le blog et les réalisations ; la page contact est ajoutée. Aucun lastmod fictif n’a été inventé pour les réalisations. Les anciennes URLs connues reçoivent des redirections permanentes vers leur véritable équivalent, avec traitement explicite des variantes avec slash sur Vercel. Le lien Demetis erroné de la page Le Mans est réparé.

Les mentions légales, la confidentialité et les crédits techniques sont en noindex, follow. L’article publié test-123 est retiré du parcours public, sans destruction de sa donnée en base. Les anciennes offres déjà retirées conservent leur 410. Le test de page inexistante conserve un vrai statut 404.

### Structure et accessibilité

Les labels des menus et du footer ne sont plus des H2. Les titres des interfaces de démonstration ont été remplacés par des éléments non sémantiques conservant leur style ; la démonstration SERP purement illustrative est cachée aux lecteurs d’écran. L’éditeur d’articles normalise H1 à H6 sans créer de second H1 et sans saut de niveau. Le titre du formulaire contact ne précède plus le H1 dans le plan de page.

Un main imbriqué a été supprimé du template de service. Les champs de ressources et le champ professionnel ont un nom accessible ; les liens d’images et la notation de l’avis contact ont été corrigés. Les contrastes de textes secondaires et de boutons identifiés ont été renforcés sans refaire la composition. Le compteur West Clôtures a été rendu identique côté serveur et à la première hydratation, y compris avec animations réduites.

### Contenu, images et maillage

Les pages checklist Google Business Profile et audit de productivité expliquent maintenant le public visé, l’utilisation de la ressource, ses limites et les services complémentaires. Les métadonnées des pages principales et de deux cas clients ont été précisées. Certaines promesses absolues de positionnement ou de résultat ont été remplacées par des formulations mesurables, sans inventer de performances.

Un lien contextuel relie Femmes des Territoires à l’offre Associations. Les liens documentaires HubSpot et Zapier ont été actualisés. Deux références Demetis sensibles à la casse ont été réparées. L’image du template de service reçoit dimensions, chargement différé et texte alternatif descriptif. Les visuels Open Graph de réalisation conservent leurs sources propres.

## Analyse sémantique

La revue distingue les pages de services (intention commerciale), les pages d’outils (cas d’usage et intégration), les solutions métiers (besoins sectoriels), les agences locales, les cas clients, les articles et les ressources. Ces familles ne doivent pas toutes cibler le même mot-clé principal. Les titres, descriptions, H1/H2 et liens contextuels de chaque URL sont consignés dans le JSON joint.

Une comparaison des séquences de cinq mots du contenu principal relève 29 paires au-dessus de 25 % de similarité, principalement de courtes réalisations partageant des éléments de présentation et des projets liés. Le maximum est de 37,3 %, sans page quasi identique détectée par cet indicateur. Ce calcul n’est pas un diagnostic de cannibalisation Google : celle-ci exige les requêtes et URLs de Search Console. Il ne justifie pas de fusionner arbitrairement des fiches clients distinctes ou de les remplir de texte artificiel.

La pagination du blog a également été contrôlée manuellement : /blog?page=2 est accessible par un vrai lien HTML et contient notamment les liens vers seo-commerce-ploemeur et prix-site-internet-lorient. Ces articles ne sont donc pas orphelins. Réserve distincte du contrôle des 124 URLs principales : la page 2 conserve actuellement une canonical vers /blog ; une canonical propre à chaque page paginée reste à mettre en place. Les filtres et les paramètres arbitraires ne sont pas comptés comme autant de pages canoniques dans le tableau global.

Les 58 blocs FAQPage rencontrés sont du JSON valide et leurs questions sont présentes dans le contenu principal. Leur présence ne garantit pas un résultat enrichi dans Google. Les données Organization et WebSite utilisent une identité et une URL cohérentes. Les résultats commerciaux historiques restent les déclarations du site ; cet audit ne les certifie pas à partir de comptes Analytics ou Ads.

## Performance et limites

Mesures Lighthouse mobiles sur la production, échantillon représentatif. Scores de laboratoire, pas des garanties de classement ni des mesures terrain CrUX.

| Page | Performance | Accessibilité | SEO Lighthouse | LCP ms | CLS | TBT ms |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| / | 89 | 100 | 100 | 3730 | 0.0000 | 12 |
| /contact | 99 | 100 | 100 | 2056 | 0.0000 | 16 |
| /expertise | 98 | 97 | 100 | 2318 | 0.0000 | 7 |
| /realisations | 95 | 100 | 100 | 2889 | 0.0000 | 26 |
| /association | 98 | 96 | 100 | 2439 | 0.0000 | 10 |
| /seo-local | 98 | 96 | 100 | 2440 | 0.0000 | 19 |

Un score SEO Lighthouse ne couvre pas toute la qualité SEO. Les résultats détaillés, notamment les contrastes résiduels ou les ressources bloquantes, sont conservés dans artifacts/seo-global-after-live. Les médias sources de plus de 500 Ko ne correspondent pas nécessairement au poids transféré : Next Image sert des tailles et formats adaptés. Ils restent des pistes d’optimisation selon leur utilisation réelle.

### Réserve sur les variantes avec slash en production

Le test strict de redirection en un seul saut relève 25 écarts sur 50 contrôles en production : Vercel normalise encore les anciennes variantes avec slash via un 308 vers la variante sans slash, puis applique le 301 vers la destination pertinente. Exemple : /portfolio/ → /portfolio → /realisations. Les paramètres de requête restent préservés et la destination répond 200. Ce n’est ni une boucle ni une 404, mais l’objectif d’un seul saut n’est pas atteint sur ces variantes et n’est pas déclaré validé.

Le build 1.16.b préserve explicitement le drapeau skipTrailingSlashRedirect omis du manifeste runtime Next 16. Cela rétablit sa présence dans l’artefact, sans suffire à supprimer cette normalisation au niveau Vercel. Une règle projet a été essayée puis retirée, car elle ne supprimait pas le détour non plus. Les autres redirections restent versionnées ; aucune destination arbitraire vers l’accueil n’a été ajoutée. Le passage HTTP vers HTTPS et du domaine nu vers www reste permanent (308).

L’INP ne se déduit pas du TBT ou d’un chargement Lighthouse. Il nécessite des interactions réelles et idéalement des données terrain sur 28 jours. Sans accès Search Console/CrUX ni analytics du propriétaire, l’audit ne peut certifier une absence de cannibalisation, une indexation effective ou des Core Web Vitals parfaits pour tous les visiteurs.

### Liens externes

250 URLs externes ont été contrôlées, avec nouvel essai GET après les réponses HEAD ambiguës. Les documentations Google testées en GET répondent correctement. LinkedIn, Pexels et Unsplash peuvent refuser le robot : ces réponses ne prouvent pas que le lien est mort. Aire des Îles a répondu 503 ; BR Z Couverture et Plomberie 84 n’ont pas répondu dans le délai du contrôle. Ces sites tiers restent à surveiller, sans redirection artificielle de leurs liens vers l’accueil Litus.

### Tests et points non certifiés

Le build Next/TypeScript passe. Les cinq nouveaux tests unitaires des métadonnées passent. La suite générale a produit 245 tests réussis, 9 tests en échec et une suite non initialisée : attentes sur les anciens champs Service/Budget du contact, mock de police Caveat absent, résolution de routes blog dynamiques par un test statique et seuil de cinq sections non atteint par quatre pages techniques. Ces tests n’ont pas été affaiblis pour obtenir un résultat vert ; la suite générale n’est donc pas déclarée entièrement réussie.

Le formulaire local signale volontairement l’absence de configuration email. L’envoi transactionnel de production, l’authentification admin, les achats et les connexions à des comptes tiers ne font pas partie du crawl public non destructif.

## Reproduire le contrôle

Les scripts audit-public-seo.mjs, check-public-rendering.cjs, check-seo-assets.cjs, audit-semantic-similarity.cjs et check-seo-lighthouse.cjs sont versionnés. Le runtime navigateur peut être fourni avec BROWSER_RUNTIME. Pour une nouvelle publication, crawler de nouveau la production et comparer les résultats, plutôt que réutiliser les chiffres de cet instantané.

Références : [métadonnées Next.js](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [titres dans Google Search](https://developers.google.com/search/docs/appearance/title-link), [Core Web Vitals](https://web.dev/articles/vitals).
