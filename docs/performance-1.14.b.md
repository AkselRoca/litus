# Build 1.14.b : performances et navigation

## Corrections

- Bandeau cookies present dans le HTML serveur, sans temporisation d'apparition ni animation retardant le LCP. Preferences accessibles a nouveau apres fermeture.
- Mesure interne, Vercel Analytics et Speed Insights charges uniquement avec accord. Verification du consentement avant chaque envoi, y compris apres retrait. Aucun test ne transmet de faux prospect.
- Logo officiel : 145 775 octets a 4 752 octets pour la version web optimisee. Les logos des emails sont preserves.
- Image Demetis corrigee (casse du nom de fichier), carte desktop chargee uniquement a partir de 1 180 px, fond photographique adaptatif et optimise.
- Prechargement des liens principaux au survol/focus, et non pour chaque outil apparaissant dans le bandeau defilant. Pas de prechargement des polices manuscrites hors premiere vue.
- Listes et statistiques semantiques, noms accessibles des avis et de la carte, contrastes des commandes, focus clavier et pause/reprise de la demonstration.
- `/llms.txt` : index de pages publiques, sans acces a l'administration ni soumission automatique de formulaire.

## Verification avant publication

Lighthouse 13.4.1, Chrome, build de production local, profil mobile simule et profil desktop. Le serveur local utilise HTTP/1.1 ; les mesures de production seront conservees separement.

| Controle | Mobile | Desktop |
| --- | --- | --- |
| Performance | 78 | 98 |
| Accessibilite | 100 | 100 |
| Bonnes pratiques | 100 | 100 |
| SEO | 100 | 100 |
| Navigation agentique | Tous les controles applicables reussis | Tous les controles applicables reussis |

42 assertions fonctionnelles reussies : HTML serveur, absence de mesure avant consentement/apres refus, acceptation, retrait, persistance, stockage cookies indisponible, navigation clavier et retour du focus, pause/reprise, 29 routes publiques accessibles, telephone obligatoire sur contact, absence d'exceptions navigateur et de debordement a 360/768/1440 px.

Les scores de laboratoire fluctuent selon la machine et le reseau. Un score experimental agentique complet ne garantit ni une navigation parfaite avec tous les agents ni une conformite RGAA complete. Il ne constitue pas une certification.

## References techniques

- [Calcul des controles agentiques Lighthouse](https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring)
- [Optimisation du LCP](https://web.dev/articles/optimize-lcp)
- [Chargement conditionnel des composants Next.js](https://nextjs.org/docs/app/guides/lazy-loading)
- [Regles CNIL relatives aux traceurs](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies)

Les rapports complets et captures de ce poste sont conserves dans `artifacts/performance-1.14.b/` et ne sont pas ajoutes au depot avec les autres artefacts locaux preexistants.

## Mesures finales en production, 13 septembre 2026

Deployment Vercel `dpl_FUMb8szf87Uqmwdfp31U1ztQD6E4`, etat READY, alias `https://www.litus.fr`, code Git `666332f`, footer `Build 1.14.b` confirme par requete HTTP.

| Controle | Mobile | Desktop |
| --- | --- | --- |
| Performance | **96** | **100** |
| Accessibilite | **100** | **100** |
| Bonnes pratiques | **100** | **100** |
| SEO | **100** | **100** |
| Navigation agentique | **3/3** | **3/3** |
| FCP | 1,3 s | 0,5 s |
| LCP | 2,8 s | 0,7 s |
| TBT | 10 ms | 0 ms |
| CLS | 0 | 0 |

Mesure Lighthouse 13.4.1 lancee contre l'URL publique, sans consentement preenregistre, sans masquer le bandeau cookies, sans modifier la page pour l'audit et sans exclure de categorie. Il ne s'agit pas d'un nouveau rapport genere par les serveurs PageSpeed Insights. Le 100 performance mobile n'est pas atteint sur cette execution ; le travail restant concerne principalement le chemin de chargement initial (CSS/JavaScript/polices). Conserver les visuels et les vrais parcours reste prioritaire sur un score artificiel.

L'index agentique ajoute un troisieme controle applicable aux deux controles deja presents avant les changements. Les rapports JSON et captures de production sont `artifacts/performance-1.14.b/production-mobile.json` et `production-desktop.json`.

La generation du sitemap a ete relancee avec succes apres un verrouillage ponctuel de fichiers Windows. Le postbuild Vercel s'est termine sans cette erreur.
