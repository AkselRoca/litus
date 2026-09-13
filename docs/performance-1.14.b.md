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
