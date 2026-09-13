# Calendrier editorial Litus - 1.18.a

## Administration

- `/admin/editorial` : mois, liste, recherche, filtres de statut et thematique. Dates exprimees en Europe/Paris, y compris en hiver.
- Chaque sujet ouvre un apercu prive et un formulaire de modification. Sans texte redige, l'apercu montre explicitement le brief, pas un faux article.
- Le bouton de preparation anticipee demande au moteur de travailler avant la fenetre habituelle de six jours, sans avancer la publication.
- Les articles historiques restent accessibles depuis le calendrier et le blog. Les brouillons manuels ont un apercu isole du contexte admin par une iframe sandboxee.
- Modifier un article redige invalide l'ancienne validation. Les changements humains ne sont pas reecrits automatiquement. Une actualisation d'un article public reste privee jusqu'a validation.
- Date, titre, angle, mots-cles, page soutenue, paragraphes, H2/H3 et metadonnees sont editables. Chaque enregistrement conserve une copie en base et detecte une modification concurrente.

## Cadence et migration

- Intervalle automatique : 72 heures minimum. Aucun rattrapage en rafale, aucune date publique antidatee.
- 48 hypotheses editoriales diversifiees dans `src/lib/editorial/strategy.ts`, comparees a l'archive avant incorporation. Les exclusions de doublons peuvent reduire ce nombre.
- Outils et IA representent au moins 40 % du renouvellement. Artisans, associations, PME, SEO et conversion restent presents.
- Le renouvellement compare sujets, intentions et pages commerciales ; les metriques de recherche ne sont jamais inventees.
- Migration versionnee et atomique : remplacer uniquement les idees non commencees. Ne modifier ni les articles publies, ni les brouillons rediges, ni les recherches deja commencees, ni les elements mis en pause.
- Historique : table `EditorialRevisionSnapshot`. Une relance ne supprime plus le brouillon existant.
- Script d'exploitation : `npx tsx scripts/editorial-rebalance.ts` pour simuler ; `--apply --production` pour appliquer avec une connexion explicitement fournie par l'environnement. Le cron effectue aussi la migration une seule fois.
- Le cron conserve sa frequence technique de cinq minutes. Un passage traite une etape de preparation, pas une publication.

## Contenu et images

Chaque nouveau texte doit passer une recherche Google reelle, une verification des sources officielles, la detection de cannibalisation, la revue factuelle, les metadonnees, le maillage et le controle de trois images distinctes. Un echec laisse le texte prive et affiche la raison.

Les trois visuels sont heberges sur le compte Cloudinary du site, avec dimensions, ALT, licence, attribution et format WebP. Aucun hotlink vers une image tierce. Pour les processus IA/automatisation, un schema original peut illustrer les etapes expliquees ; il est identifie comme schema, jamais comme capture officielle. Les photos generiques du catalogue ne servent plus de repli automatique pour n8n, Zapier, ChatGPT, Claude et Codex.

Le sommaire est calcule depuis les titres visibles. BlogPosting existe sur chaque article public. FAQPage n'est ajoute que lorsqu'une section FAQ contient effectivement des questions/reponses visibles ; aucune promesse d'extrait enrichi.

## Sources officielles consultees le 13 septembre 2026

- n8n, operations Gmail et filtrage des messages : https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/
- Zapier, constitution et planification d'un digest : https://help.zapier.com/hc/en-us/articles/8496309901453-Compile-data-in-a-digest-in-Zap-workflows
- HelloAsso, integration de campagnes, dons et adhesions : https://dev.helloasso.com/

Ces sources cadrent la strategie. Chaque sujet reste une hypothese de recherche tant que le moteur n'a pas effectue sa propre recherche recente avant redaction. Les 48 textes ne sont pas annonces comme deja rediges.

## Verification du lot

- Build Next.js reussi.
- 38 tests cibles : calendrier, dates hiver/ete, conservation, modification concurrente, qualite, authentification du cron et filtres UI.
- Test navigateur sur SQLite isolee et compte admin local : desktop 1440 px, mobile 390 px, sauvegarde persistante, apercu prive, refus anonyme, brouillon manuel absent du blog public. Aucune modification du compte ou de la 2FA de production.
