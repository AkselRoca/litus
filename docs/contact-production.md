# Contact — mise en production

## État de livraison

La page `/contact` est simplifiée et son formulaire utilise réellement `POST /api/contact` → API Resend côté serveur. Aucun aperçu, scénario de saisie ni faux succès. Une soumission acceptée envoie deux messages distincts et idempotents : la notification interne à `litusagency@gmail.com`, puis un accusé de réception aux couleurs de Litus au prospect. La confirmation dans l'interface n'apparaît qu'après acceptation des deux messages par Resend. Cela confirme leur prise en charge par Resend, pas leur livraison finale dans les boîtes de réception.

Dans l'environnement local inspecté, **Resend et Redis ne sont pas configurés**. Un bandeau l'indique sur la page et un envoi retourne **503**. Aucune clé n'a été ajoutée à `.env` et aucun email réel n'a été envoyé pendant les tests.

Les autres formulaires qui utilisaient déjà cette route (site vitrine, Google Ads, formulaire historique et popup) utilisent maintenant le même client d'idempotence, sans changement de présentation.

## Paramètres requis

Utiliser `.env.example` comme référence, puis renseigner `.env.local` pour le développement et les variables serveur de chaque environnement Vercel. Ne jamais mettre ces valeurs dans `NEXT_PUBLIC_*`, le navigateur, un dépôt ou une capture.

| Variable | Configuration |
| --- | --- |
| `RESEND_API_KEY` | Clé Resend autorisée à envoyer depuis le domaine choisi ; une clé restreinte à ce domaine suffit. |
| `RESEND_FROM_EMAIL` | Adresse seule, par exemple `contact@notifications.votre-domaine.fr`, à remplacer par une adresse d'un domaine réellement détenu et vérifié. Le nom « Litus » est ajouté côté serveur. |
| `UPSTASH_REDIS_REST_URL` | Endpoint HTTPS REST d'une base Redis Upstash partagée par toutes les instances. |
| `UPSTASH_REDIS_REST_TOKEN` | Token autorisé à exécuter EVAL et les commandes utilisées par les scripts. Aucun fallback en mémoire. |
| `CONTACT_HASH_SECRET` | Secret aléatoire de 32 caractères minimum, identique sur toutes les instances d'un environnement. Génération possible : `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Ne pas en changer pendant la fenêtre de déduplication. |
| `CONTACT_ALLOWED_ORIGINS` | Origines exactes autorisées, séparées par virgule, sans slash final. Exemple local : `http://localhost:3000,http://127.0.0.1:3000`. En production : le vrai domaine HTTPS du site, et sa variante www uniquement si utilisée. Ajouter explicitement les origines de preview dans leur propre environnement. |
| `CONTACT_REDIS_PREFIX` | Préfixe distinct entre développement, preview et production, stable entre déploiements de production. Exemple : `litus:contact:production:v1`. |
| `CONTACT_RATE_IP_LIMIT` / `CONTACT_RATE_IP_WINDOW_SECONDS` | Valeurs initiales : **5 tentatives / 900 secondes**. Les formulaires invalides comptent également après lecture du JSON. |
| `CONTACT_RATE_GLOBAL_LIMIT` / `CONTACT_RATE_GLOBAL_WINDOW_SECONDS` | Valeurs initiales : **30 tentatives / 60 secondes** sur l'ensemble de la route. Ajuster selon le trafic et les quotas Resend. |
| `CONTACT_TRUSTED_IP_HEADER` | Sur Vercel, laisser vide : utilisation de `x-vercel-forwarded-for`. Hors Vercel, renseigner uniquement un header **écrasé** par un reverse proxy de confiance, contenant une seule IP. Interdire tout accès direct contournant le proxy. Sans cette configuration, la production refuse l'envoi. |

Le destinataire **`litusagency@gmail.com` est fixé dans le serveur**, sans variable de remplacement ni possibilité de le fournir dans le formulaire. `Reply-To` contient l'adresse validée du prospect. Gmail et Outlook sont acceptés pour les prospects.

## Domaine et délivrabilité

1. Ajouter le domaine ou sous-domaine d'envoi dans Resend. Publier les enregistrements SPF/DKIM fournis dans son DNS et attendre le statut **Verified**. Ne pas employer `onboarding@resend.dev` en production.
2. Définir `RESEND_FROM_EMAIL` sur ce domaine. Vérifier aussi la politique DMARC de l'organisation et l'alignement attendu ; ne pas remplacer des enregistrements SPF existants à l'aveugle.
3. Déployer/redémarrer l'application après configuration. Le bandeau d'indisponibilité doit disparaître.
4. Envoyer une **vraie demande identifiable comme test** depuis la page Contact. Vérifier dans Resend son acceptation puis sa livraison, et dans Gmail sa réception, son objet, tous les champs et le dossier spam.
5. Cliquer sur « Répondre » dans la notification interne : le destinataire doit être le prospect. Vérifier aussi la réception et le rendu de l'accusé de réception envoyé au prospect, dont le `Reply-To` est `litusagency@gmail.com`.
6. Contrôler les quotas/erreurs/bounces Resend et prévoir leur suivi opérationnel. Une clé présente ne prouve pas à elle seule que le domaine est vérifié.

Documentation officielle : [vérification d'un expéditeur Resend](https://resend.com/docs/knowledge-base/how-do-I-create-an-email-address-or-sender-in-resend), [idempotence Resend](https://resend.com/docs/dashboard/emails/idempotency-keys).

## Protections et fonctionnement

- Honeypot `website_check`, distinct d'entreprise/site web, masqué visuellement, `aria-hidden`, `tabIndex=-1`, autocomplete désactivé. Vérifié **avant tout appel à Resend** ; rempli, il renvoie une réponse neutre 202, sans déclarer un email envoyé.
- JSON limité à **24 Kio**, y compris sans `Content-Length`, lecture bornée dans le temps. Formats, consentement, listes fermées et longueurs vérifiés côté serveur : nom 100, email 254, téléphone 30, entreprise 200, message 5 000 caractères. Champs inconnus refusés et contenus échappés dans l'email HTML.
- Origines autorisées et `Sec-Fetch-Site` contrôlés. Les quotas sont des fenêtres glissantes exécutées atomiquement dans Redis avec son horloge. IP hachées par HMAC ; IPv6 regroupées par /64. Les compteurs expirent avec leur fenêtre.
- Un verrou Redis protège les demandes concurrentes. La même clé UUID reste liée au même contenu. Le client garde seulement son empreinte SHA-256 et la clé dans sessionStorage ; aucune copie des champs n'y est stockée. Un double clic partage l'envoi et conserve le bouton désactivé.
- Les clés `contact/UUID/notification` et `contact/UUID/confirmation` sont transmises à Resend. En cas de timeout ou d'erreur, une nouvelle tentative **garde les mêmes clés**. Liaison et statut conservés 25 h dans Redis ; aucune nouvelle tentative incertaine autorisée après 23 h, afin de rester en deçà de la fenêtre Resend de 24 h. Ne pas purger ces clés ni modifier le préfixe/secret pendant cette fenêtre.
- Si Redis ou Resend échoue, le formulaire conserve les champs et n'annonce pas de réussite. Les logs Contact n'incluent ni données du formulaire, ni IP brute, ni clés, ni corps d'erreur Resend.
- La copie dans le CRM existant reste tentée après l'email, avec un identifiant déterministe. Un problème CRM est journalisé sans invalider un email déjà envoyé : surveiller le message « copie CRM indisponible ». La base de production doit utiliser la configuration Turso existante (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`), pas un fichier SQLite éphémère.
- Ces protections limitent le spam applicatif ; conserver également les protections de l'hébergeur contre les attaques volumétriques et les alertes de quotas.

Références : [Redis REST / EVAL](https://upstash.com/docs/redis/features/restapi), [headers IP de Vercel](https://vercel.com/docs/headers/request-headers).

## Vérifications reproductibles

```sh
npx vitest run src/__tests__/contact-api.test.ts src/__tests__/components/ContactRequestForm.test.tsx
npx next build
```

Les tests automatisés isolent Resend, Redis et le CRM : ils ne prouvent pas la délivrabilité du domaine ni la connexion à votre future base Redis. Scénarios couverts : attente d'acceptation, validations, honeypot rempli, plafond IP/global, doublons simultanés/rejoués, contenu différent sous une même clé, erreur/timeout Resend, absence de configuration, panne Redis, échappement HTML, double clic, champs conservés et focus sur confirmation.

Contrôles navigateur effectués : formulaire initialement vide (également avec `?objet=...`), aucune saisie automatique, vrais échecs 503 sans configuration, succès/échecs interceptés uniquement dans le navigateur de test, clavier, honeypot hors tabulation, responsive de 320 à 1920 px, clair/sombre. Le lien Google Calendar existant a été vérifié : HTTP 200, « Call stratégique – Litus (30 min) ».

Avant ouverture publique, compléter avec la base Redis réelle : soumettre cinq demandes **invalides** depuis une IP de test, vérifier le 429 et `Retry-After` à la sixième, puis l'expiration du quota. Vérifier aussi que deux instances utilisent les mêmes compteurs. Rejouer une même demande valide avec la même clé doit conserver **une seule notification et une seule confirmation** dans Resend. Tester la perte temporaire de Redis : aucun nouvel email ne doit partir.
