# Navigation et prestations — 10 septembre 2026

## Arborescence actuelle

Les menus desktop et mobile partagent `src/lib/expertises.ts`. Chaque prestation possède une page, une URL sans fragment et une destination unique. Les URL des sept pages existantes sont conservées. Les anciennes ancres éditoriales restent utilisables dans leurs pages, sans servir de destination au menu.

| Famille | Prestation | URL | Périmètre |
| --- | --- | --- | --- |
| Web & e-commerce | Création de site internet | `/creation-site-internet` | Site vitrine et présentation de l’offre |
| Web & e-commerce | E-commerce | `/creation-site-ecommerce` | Boutique et parcours d’achat |
| Web & e-commerce | Landing pages | `/creation-landing-page` | Campagne, offre, conversion et mesure |
| Web & e-commerce | Refonte | `/refonte-site-internet` | Existant, UX, contenus, migration et SEO |
| Acquisition | Référencement naturel SEO | `/referencement-naturel` | Stratégie de recherche, technique, contenus et maillage |
| Acquisition | Google Ads | `/google-ads` | Acquisition publicitaire |
| Acquisition | SEO local | `/seo-local` | Recherches et présence géographiques |
| Acquisition | Google Business Profile | `/google-business-profile` | Fiche d’établissement, informations, photos, avis et suivi |
| Développement & IA | Application web | `/creation-application-web` | Produit métier complet, utilisateurs et espaces de travail |
| Développement & IA | Développement web | `/developpement-web-sur-mesure` | Fonctionnalités, modules et évolution d’un existant |
| Développement & IA | Intégrations & API | `/integrations-api` | Connecteurs, correspondance des données et synchronisation |
| Développement & IA | Automatisation | `/automatisation` | Orchestration de tâches et processus |
| Développement & IA | Outils IA | `/creation-outils-ia` | Assistants, agents et fonctions IA métier |

## Navigation et contact

- Six pages manquantes créées, sans supprimer les pages déjà validées ni créer d’alias concurrents.
- Menu mobile : même catalogue d’expertises, et liens Blog, Guide des tarifs web, Tarifs accessibles comme sur desktop.
- Footer : ressources qui existent réellement ; retrait des libellés trompeurs Checklist SEO, Modèle de cahier des charges et Outils gratuits qui aboutissaient à d’autres contenus. Le projet associatif est explicitement un lien de contact avec objet prérempli.
- Retrait du lien CGV dirigé vers une page ne contenant pas de CGV et des icônes sociales sans destination. Aucun contenu légal inventé.
- Réparation du lien PME `/portfolio` vers `/realisations`, des CTA `#contact` sans cible sur SEO/e-commerce et des anciens paramètres `plan`/`ville` non lus par le formulaire.
- Liens contextuels Refonte des pages locales, Landing de Google Ads et Intégrations de la page IA dirigés vers leurs pages dédiées.
- Chaque nouveau service transmet son objet et sélectionne le bon service dans le formulaire. La validation et les libellés e-mail acceptent les nouvelles valeurs.
- Aucun popup générique de capture sur les nouvelles landing pages ni sur `/contact`, afin de ne pas bloquer le formulaire.

## Design et contenu

Le composant `ServiceHero` et ses proportions restent la référence commune, sans changement de ses styles. `BusinessService` fournit les sections, la typographie et les CTA. Chaque nouvelle page a son contenu, sa démonstration et son parcours commercial propres. Titres orange foncé `#C7431B`, CTA Litus `#E95E2A`.

Les seules couleurs personnalisées concernent `.solutions-hero[data-audience]` : PME bleu `#2563EB`, Grands comptes indigo `#4F46E5`, Collectivités orange `#EA580C`, avec variantes claires en thème sombre. Elles reprennent les couleurs des sections existantes. Header, logo, CTA orange et heroes Services ne sont pas recolorés.

Les nouveaux textes n’ajoutent aucun client, témoignage, score ni résultat chiffré. Les interfaces portent une indication d’exemple ; les interactions restent locales. Les photographies viennent du catalogue existant avec dimensions et licences documentées.

## Recherche des intentions : développement et API

Recherche effectuée le 10 septembre 2026, qualitative. Aucun volume de recherche ou difficulté n’est affirmé.

| Page | Mot-clé principal | Recherches associées | Intention et distinction |
| --- | --- | --- | --- |
| Développement | développement web sur mesure | fonctionnalités site web, configurateur sur mesure, module métier, reprise de code | Faire développer une fonction ou améliorer un existant ; complémentaire de la page Application, centrée sur un produit complet |
| Intégrations | intégration API | connecteur CRM ERP, synchronisation données, API e-commerce, développement connecteur | Relier des systèmes et fiabiliser leurs échanges ; complémentaire de l’Automatisation, centrée sur les actions du processus |

Les résultats observés sur les sites des prestataires [Arkeris](https://www.arkeris.com/developpement-web/), [Dawap](https://dawap.fr/integration-api/erp) et [Celaneo](https://www.celaneo.com/technologies/integration-erp-crm-api/index.html) confirment cette distinction d’intentions. Le contenu Litus est rédigé spécifiquement, sans reprendre leurs offres ou preuves.

Sources techniques primaires utilisées pour préciser les notions, sans promettre une compatibilité universelle :

- [MDN — sécurité d’un site](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Website_security) : validation, permissions et protection des données.
- [MDN — méthodes HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) : échanges et opérations entre systèmes.
- [Stripe — webhooks](https://docs.stripe.com/webhooks) : réception d’événements, vérification des signatures, erreurs et livraison d’événements.

Photographies des deux pages techniques : `bureau-notes-analyse.webp` (Javier Quesada, CC0), `bureau-reunion-clair.webp` (Breather, CC0), `echange-tablette.webp` (Alejandro Escamilla, CC0). Sources complètes : `src/lib/blog/photo-catalog.ts`. Aucune personne représentée comme cliente ou membre de Litus.

Recherche Landing/Refonte : [document dédié](navigation-landing-refonte.md). Recherche SEO/Google Business Profile : [document dédié](navigation-seo-gbp.md).

## SEO technique et vérifications

Pages rendues côté serveur, H1 unique, title/description/canonical/partage propres. Service, BreadcrumbList et FAQPage décrivent le contenu visible ; chaque FAQ utilise les mêmes données pour le HTML et le JSON-LD. Les six pages sont présentes dans le sitemap, les images Open Graph en sont exclues.

Contrôles : routes et clics desktop/mobile, menus au clavier, responsive de 320 à 1920 px, images chargées, absence de débordement horizontal et d’erreur JavaScript, thèmes clair/sombre, séquences animées/pause/reprise/relecture et mouvement réduit. Le configurateur technique conserve les choix jusqu’au récapitulatif ; la démonstration API permet une interruption puis une reprise sans requête réelle.

Le contrôle des formulaires intercepte `/api/contact` : aucune demande réelle n’est envoyée. Scripts, captures et rapports sont conservés temporairement hors des assets publiés.

### Résultats finaux

- 13 destinations uniques : HTTP 200 et un H1 correspondant ; 26 clics réels desktop/mobile réussis, sans fragment.
- Six formulaires préremplis et soumissions simulées réussis, ainsi que le parcours Contact générique. L’absence de popup bloquant a été vérifiée dans une session fraîche.
- ESLint ciblé : réussi. `npx next build` : réussi, TypeScript et génération de 98 routes statiques compris. Avertissements existants seulement : convention middleware dépréciée et base Browserslist ancienne.
- Sitemap régénéré : les six URL sont présentes avec priorité 0,9 ; leurs images Open Graph ne sont pas listées comme pages.
- Captures des six pages relues en grand écran et mobile ; images réellement chargées, métadonnées propres, FAQ correspondant au JSON-LD, aucun débordement horizontal ni erreur JavaScript.
