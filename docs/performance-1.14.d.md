# Build 1.14.d : ressources initiales

Correctif de 1.14.c : l'experimentation inlineCss est retiree apres regression mobile mesuree. Les feuilles de style retrouvent leur chargement normal et leur cache partage. Le detail des essais est conserve dans performance-1.14.c.md.

Optimisations conservees : demonstration Google differee, transition de page en Web Animations sans effet retardant le premier affichage, compteurs numeriques natifs annulables, logo Nos Travaux optimise. Les textes restent rendus serveur ; les formulaires et la navigation restent fonctionnels.

Verification : build et sitemap reussis ; 42 assertions fonctionnelles ; navigation client accueil/realisations/contact, mode sombre, chargement de la demonstration a l'approche et tests des compteurs reussis.

Les styles hors ecran et les fonctions du runtime Next.js utilisees lors des interactions ne sont pas supprimes pour effacer des alertes de couverture. Aucun score fixe n'est garanti. Mesures finales ajoutees apres publication.

## Mesures finales de production, 13 septembre 2026

Deployment READY `dpl_8owTQsVTSdi7zLkJbiwfzLT61Gf9`, code Git `6f3e2c1`, alias https://www.litus.fr et footer Build 1.14.d verifies.

Lighthouse 13.4.1 sur l'URL publique, sans masquer les cookies ni retirer de contenu pour l'audit :

| Profil | Performance | LCP | TBT | CLS |
| --- | --- | --- | --- | --- |
| Mobile, mesure 1 | 99 | 2,1 s | 10 ms | 0 |
| Mobile, mesure 2 | 97 | 2,5 s | 10 ms | 0 |
| Mobile, mesure 3 | 97 | 2,6 s | 10 ms | 0 |
| Desktop | 100 | 0,6 s | 0 ms | 0 |

Mediane mobile : 97/100, intervalle mesure 97-99. Accessibilite, bonnes pratiques et SEO : 100 sur les quatre executions ; tous les controles agentiques applicables sont reussis.

JavaScript inutilise sur la premiere mesure mobile : 27 332 octets (26,7 Kio), uniquement dans le runtime Next.js, contre environ 69 Kio dans le rapport fourni. Aucune image signalee sur mobile. L'alerte de couverture CSS persiste (20 882 octets), ainsi que les avertissements de compatibilite du framework : ces ressources ne sont pas retirees aveuglement. Les CSS externes et leur cache sont volontairement conserves apres comparaison avec inlineCss.

Rapports : artifacts/performance-1.14.d/production-mobile.json, production-desktop.json, production-repeat-1.json et production-repeat-2.json. Ce sont des mesures Lighthouse lancees contre la production, pas un nouveau rapport calcule par les serveurs PageSpeed Insights. Aucun 100 mobile constant n'est promis.
