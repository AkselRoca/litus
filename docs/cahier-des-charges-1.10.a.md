# Build 1.10.a - Generateur de cahier des charges

## Parcours public

- URL : `/ressources/cahier-des-charges`.
- Ancienne URL `/ressources/guide-prix` redirigee definitivement.
- Les entrees du header, du footer, de la page tarifs, de la page PME et des encarts existants pointent vers le generateur.
- Quatre parcours : site vitrine, e-commerce, application metier, automatisation / integration ; creation ou refonte.
- Les questions catalogue, abonnements, livraison, B2B, migration et integrations dependent des reponses precedentes. Les reponses devenues hors sujet sont retirees.
- Recapitulatif modifiable avant envoi. Le document complet est ensuite consultable et telechargeable en Markdown, et figure dans les emails. Ce n'est pas une piece jointe PDF.
- Generation structuree deterministe a partir des reponses, sans appel a une IA externe ni technologie, tarif ou engagement contractuel invente.

## Envoi et securite

- Endpoint : `POST /api/project-brief`.
- Configuration existante du contact : origine autorisee, IP de confiance, secret de hachage, expediteur Resend verifie. Une base Turso est necessaire en production.
- Validation des choix et des champs actifs cote serveur, corps JSON borne, honeypot, delai minimal, quotas partages entre instances via Turso.
- Le lead et le document original sont sauvegardes avant l'envoi. Le document sauvegarde est reutilise lors d'une nouvelle tentative.
- Deux emails transactionnels distincts : copie interne et document client. L'adresse interne est definie cote serveur, jamais choisie dans la requete.
- Cles Resend distinctes et stables pour chaque destinataire. Reprises limitees a 23 heures pour rester dans la fenetre d'idempotence de 24 heures du prestataire. Un succes n'est affiche qu'apres acceptation des deux messages par Resend ; cela ne garantit pas leur classement dans la boite de reception.
- Tables techniques creees a la premiere utilisation : `BriefSubmissionState` et `BriefRateEvent`. Les evenements de quota expires sont nettoyes lors des envois.
- Les reponses du brouillon restent en memoire dans le navigateur. Seuls l'identifiant et l'empreinte du contenu a envoyer sont conserves dans sessionStorage pour les reprises. Aucun mot de passe ni fichier client n'est demande.
- Le consentement concerne le document et le suivi du projet, sans inscription automatique a une newsletter.
- Les informations techniques restent dans la copie Litus. La geolocalisation utilise uniquement les en-tetes Vercel disponibles, sans requete a un service de geolocalisation tiers. Ces signaux ne constituent pas une preuve d'identite.
- La conservation des leads et les demandes d'effacement suivent la politique existante. Lors d'un effacement, supprimer aussi l'etat technique associe `brief_<submissionId>` ; il ne contient pas le contenu du projet.

## Exploitation

- Les anciennes demandes de PDF de tarifs a `/api/lead-magnet` sont refusees au profit du nouveau parcours.
- Le lead conserve les cles `fullName`, `company`, `magnetId`, `magnetTitle` et le document structure sous `brief`.
- L'ancien endpoint des autres ressources n'est pas remplace par cette fonctionnalite.
- Aucun test fonctionnel ou envoi d'email de test n'est lance sans accord explicite. Le build de publication n'equivaut pas a une recette du formulaire.
- Avant une campagne, une recette autorisee doit couvrir chaque branche, les retours arriere, la suppression des reponses masquees, les emails, les reprises et les quotas.

Reference prestataire : https://resend.com/docs/dashboard/emails/idempotency-keys
