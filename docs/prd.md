---
stepsCompleted: [1, 2, 3, 4, 7, 8, 9, 10, 11]
inputDocuments:
  - '_bmad-output/analysis/brainstorming-session-2026-01-07.md'
workflowType: 'prd'
lastStep: 2
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 1
  projectDocs: 0
projectUrl: 'https://litus.fr/'
---

# Product Requirements Document - litus-refonte

**Author:** Aksel
**Date:** 2026-01-07

## Executive Summary

**Litus-refonte** est la refonte complète du site vitrine de l'agence web Litus (https://litus.fr/), actuellement sur WordPress vieillissant. L'objectif : créer une plateforme moderne, ultra-rapide, optimisée SEO/GEO pour dominer les recherches locales sur Lorient et Le Mans.

Le site doit convertir 4 types de prospects distincts (artisans, PME, grandes entreprises, collectivités) avec des parcours personnalisés, un copywriting percutant sans bullshit, et des lead magnets différenciants comme l'Estimateur de Potentiel interactif.

La proposition de valeur repose sur le positionnement **local vs national** : proximité, transparence, accompagnement personnalisé - à l'opposé des grandes agences parisiennes où le client n'est qu'un dossier.

### Services proposés

- Création de sites (vitrine, e-commerce, sur-mesure)
- SEO / Référencement naturel
- Google Ads / SEA
- Rédaction / Blog
- GEO optimization
- Stratégies backlinks
- Applications web sur mesure

### Vision stratégique long terme

**Focus MVP :** Site web + SEO comme services principaux.

**Évolution prévue :** Pivot vers Google Ads, SEO et logiciels sur-mesure comme offres principales. Les sites web deviendront un service basique inclus ou optionnel avec les autres prestations.

### Ce qui rend ce projet spécial

1. **Estimateur de Potentiel** - Lead magnet zéro friction : 2 champs (métier + ville) → résultat chiffré immédiat du CA potentiel. Pas besoin d'email pour voir le résultat.

2. **Architecture double entrée** - Mega-menu "Services" + "Vous êtes ?" permettant une navigation par besoin OU par persona.

3. **Copywriting réaliste** - Ton 7-8/10 punchy, promesses chiffrées, zéro jargon vide. "On ne fait pas de miracles. On met votre expertise devant ceux qui la cherchent."

4. **Modèle dual** - Facturation one-shot (-10%) OU abonnement (59€/mois) avec toggle visuel sur la page pricing.

5. **Responsive fluide** - Zero breakpoints statiques, 100% clamp()/rem/em pour une fluidité totale.

## Project Classification

| Attribut | Valeur |
|----------|--------|
| **Type technique** | web_app |
| **Domaine** | general (services numériques / agence web) |
| **Complexité** | low |
| **Contexte projet** | Greenfield - nouveau projet (remplacement total du WordPress existant) |

Le projet ne présente pas de contraintes réglementaires lourdes (pas de données médicales, financières, ou gouvernementales). Les principales exigences sont liées aux performances web (Core Web Vitals), au SEO technique, et à l'accessibilité standard (WCAG AA pour les pages collectivités).

## Success Criteria

### User Success

**Artisan / Indépendant (Jean-Marc)**
- Comprend en < 30 secondes que Litus peut l'aider à avoir plus de clients
- Utilise l'Estimateur de Potentiel et voit un chiffre concret (ex: "127 recherches/mois pour plombier Lorient")
- Se dit "eux ils parlent mon langage, pas du bullshit technique"
- Moment décisif : le résultat chiffré de l'estimateur + le prix 59€/mois affiché clairement

**PME (Sophie)**
- Trouve immédiatement les études de cas avec chiffres ("coût/lead passé de 45€ à 18€")
- Voit qu'on parle KPIs, reporting, optimisation - pas de promesses vagues
- Se dit "ils comprennent que chaque euro doit être justifié"
- Moment décisif : l'audit gratuit Google Ads proposé

**Grande Entreprise / DSI (Marc)**
- Comprend qu'on fait du sur-mesure, pas du template
- Voit le comparatif SSII vs Litus et se reconnaît dans les frustrations listées
- Se dit "enfin des gens qui parlent directement aux devs"
- Moment décisif : la cartographie productivité qui chiffre les pertes (364k€/an exemple)

**Collectivité (Nathalie)**
- Trouve immédiatement les mots-clés rassurants : RGAA, RGPD, hébergement France
- Voit qu'on comprend les contraintes marchés publics
- Se dit "ils connaissent notre monde"
- Moment décisif : le guide appel d'offres téléchargeable

### Business Success

| Métrique | Objectif |
|----------|----------|
| Trafic organique | Croissance continue mois après mois |
| Positionnement SEO local | Top 3 sur mots-clés prioritaires (Lorient + Le Mans) |
| Leads générés | Maximiser le volume via les 4 lead magnets |
| Taux de conversion visiteur → lead | Optimiser en continu (A/B tests popups, CTAs) |
| Taux de conversion lead → appel | Suivre et améliorer |
| Coût d'acquisition client | Réduire vs situation actuelle |

*Pas de chiffres cibles arbitraires - l'objectif est de mesurer, itérer, et maximiser.*

### Technical Success

| Critère | Cible |
|---------|-------|
| Core Web Vitals | 100% "Good" (LCP < 2.5s, FID < 100ms, CLS < 0.1) |
| Lighthouse Performance | > 90 |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | > 90 (100 sur pages collectivités) |
| Temps de chargement | < 2s first paint |
| Mobile responsive | 100% fluide (zero breakpoints statiques) |

### Measurable Outcomes

- **Estimateur de Potentiel** : taux d'utilisation, taux de conversion vers contact
- **Lead magnets** : téléchargements par persona, taux de conversion
- **Pages métiers** : positionnement Google par ville + métier
- **CTA "Réserver un appel"** : clics, conversions
- **Popup A/B test** : identifier la version gagnante après 1000 visiteurs

## Product Scope

### MVP - Minimum Viable Product

- Homepage avec copywriting validé + Estimateur de Potentiel
- Mega-menu double entrée (Services + Vous êtes ?)
- Pages services principales (Site vitrine, SEO, Google Ads)
- 10 premières pages métiers prioritaires (plombier, électricien, etc.)
- Pages villes (Lorient, Le Mans)
- Page pricing avec toggle facturation
- Page contact ultra-simplifiée (1 champ)
- Blog structure (template prêt)
- 1-2 études de cas chiffrées
- Header avec badge dispo + CTA "Réserver un appel"
- Responsive fluide
- SEO technique optimisé

### Growth Features (Post-MVP)

- Toutes les pages métiers (+20 métiers)
- Parcours persona complets avec contenus dédiés
- Animations remarquables (counters, reveals, 3D cards)
- Système popup A/B test
- Pages collectivités + guide téléchargeable
- Audit Google Ads automatisé (lead magnet PME)
- Cartographie productivité (lead magnet DSI)
- Blog articles SEO
- Intégration newsletter

### Vision (Future)

- Dashboard client pour suivi KPIs
- Espace client avec reporting automatisé
- Outils internes automatisés (devis, facturation)
- Extension vers Google Ads / SEO comme services principaux
- Logiciels sur-mesure comme offre phare
- Sites web en service basique inclus

## User Journeys

### Journey 1 : Jean-Marc - Le plombier qui veut juste plus de clients

Jean-Marc, 47 ans, dirige sa boîte de plomberie à Lorient depuis 15 ans. Deux employés, du bon boulot, une réputation solide dans le quartier. Mais le bouche-à-oreille ne suffit plus. Ses concurrents apparaissent sur Google, lui non. Il a essayé de "faire un site" avec son neveu il y a 3 ans - résultat : une page qui met 10 secondes à charger et zéro appel.

Un soir, après une journée de chantier, il tape "agence web Lorient" sur son téléphone. Il tombe sur Litus. Le premier truc qu'il voit : "Des gens tapent plombier + Lorient tous les jours. C'est vous qu'ils trouvent ?" Ça le pique.

Il scrolle, voit l'Estimateur de Potentiel. Deux champs : son métier, sa ville. Il tape "plombier" et "Lorient". En 2 secondes : "127 personnes recherchent un plombier à Lorient chaque mois. Avec un site bien positionné, vous pourriez capter 15-25 de ces recherches. À 500€ le chantier moyen = 7 500€ - 12 500€/mois de CA potentiel."

Jean-Marc n'a jamais vu un chiffre aussi concret. Pas de blabla, pas de "solutions digitales innovantes". Juste des recherches réelles, un calcul simple. Il scroll encore, voit "59€/mois" avec tout inclus. Moins cher que son forfait téléphone.

Il clique sur "Réserver un appel". Le formulaire lui demande juste son numéro. Il le tape. Le lendemain, quelqu'un de Litus l'appelle - pas un commercial parisien, quelqu'un qui connaît Lorient. Trois mois plus tard, Jean-Marc apparaît en première page Google. Les appels ont doublé.

**Ce parcours révèle :**
- Estimateur de Potentiel (fonctionnalité clé)
- Copywriting percutant dès le hero
- Prix transparent affiché
- Formulaire contact ultra-simplifié (1 champ)
- CTA "Réserver un appel" visible
- Rappel rapide et humain

---

### Journey 2 : Sophie - La directrice qui veut optimiser chaque euro

Sophie, 38 ans, dirige une menuiserie au Mans. 15 employés, 1.2M€ de CA. Elle a déjà un site, elle fait déjà du Google Ads. Mais c'est sa secrétaire qui gère ça "quand elle a le temps". Les résultats ? Elle ne sait pas vraiment. Elle voit des factures Google, elle voit quelques appels, mais le lien entre les deux ? Mystère.

Elle cherche "agence SEO Le Mans" pour comparer. Elle tombe sur Litus. Ce qui l'arrête : une étude de cas avec des vrais chiffres. "Menuiserie industrielle : coût par lead passé de 45€ à 18€ en 3 mois." C'est son métier. C'est concret.

Elle navigue via le menu "Vous êtes ? → Entreprise / PME". La page lui parle directement : "Votre secrétaire fait de son mieux, mais un spécialiste divise le coût par acquisition par 2." Elle se reconnaît.

Elle voit l'offre "Audit Express Google Ads" : envoyer un accès lecture au compte, recevoir en 48h le coût par conversion actuel, 3 optimisations immédiates, et l'estimation du budget gaspillé. Gratuit. Elle n'a rien à perdre.

Elle remplit le formulaire, envoie l'accès. 48h plus tard, elle reçoit un rapport clair : elle gaspille 800€/mois sur des mots-clés qui ne convertissent pas. L'appel qui suit n'est pas un pitch commercial - c'est une analyse de ses données. Elle signe.

**Ce parcours révèle :**
- Navigation par persona (mega-menu "Vous êtes ?")
- Études de cas avec chiffres réels
- Lead magnet "Audit Google Ads"
- Parcours PME dédié
- Ton professionnel, axé data
- Preuve avant promesse

---

### Journey 3 : Marc - Le DSI qui en a marre des SSII

Marc, 45 ans, DSI d'une entreprise industrielle à Lorient. 80 employés, 8M€ de CA. Son problème : 5 logiciels qui ne communiquent pas entre eux. Excel partout. Des employés qui perdent 30 minutes par jour à ressaisir des données. Il a déjà travaillé avec Capgemini - 8 mois de projet, 150k€, et un outil que personne n'utilise parce que les specs étaient figées dès le départ.

Il cherche une alternative locale, quelqu'un qui comprenne son contexte sans lui faire signer un contrat de 50 pages. Il trouve Litus via une recherche "développement application sur mesure Lorient".

Ce qui l'accroche : le tableau comparatif "Les Gros vs Litus". Chaque ligne le fait hocher la tête. "Chef de projet → Commercial → Dev junior offshore" vs "Vous parlez directement aux devs". "Specs figées, avenant = payant" vs "Agile, on itère ensemble". "Code propriétaire, vendor lock-in" vs "Open source, le code vous appartient".

Il clique sur "Cartographie de vos pertes de productivité". 1h d'échange avec un expert, identification des 3 workflows les plus chronophages, chiffrage du temps perdu, et une solution d'automatisation concrète. Gratuit.

Il prend rendez-vous. L'échange est technique, pas commercial. On lui parle d'API, de webhooks, d'intégration avec ses outils existants. Pas de PowerPoint bullshit. Il repart avec un chiffrage : 80 employés × 30min/jour = 200h/semaine perdues = 364k€/an. Un outil à 50k€ rentabilisé en 2 mois. Il lance le projet.

**Ce parcours révèle :**
- Comparatif SSII vs Litus
- Lead magnet "Cartographie Productivité"
- Page applications sur-mesure
- Ton expert, technique
- Chiffrage ROI concret
- Positionnement anti-SSII

---

### Journey 4 : Nathalie - La directrice com' qui doit rassurer sa hiérarchie

Nathalie, 42 ans, Directrice Communication d'une mairie de 25 000 habitants près de Lorient. Le site de la commune date de 2018, il n'est pas responsive, pas accessible RGAA, et les citoyens se plaignent de ne rien trouver. Le maire veut une refonte. Mais Nathalie sait que le moindre faux pas sera scruté : conformité, sécurité, budget public.

Elle cherche "refonte site mairie Bretagne" et tombe sur Litus. Ce qui la rassure immédiatement : une page dédiée "Sites web pour collectivités" avec les bons mots : RGAA niveau AA, RGPD, hébergement France, formation des agents. Pas de jargon startup.

Elle voit le lead magnet : "Guide : Réussir la refonte de votre site de collectivité". Checklist obligations légales, 10 questions à poser aux prestataires, modèle de critères de sélection, budget type selon taille. Exactement ce dont elle a besoin pour préparer son appel d'offres.

Elle télécharge le guide. Il est sérieux, pas un PDF commercial déguisé. Elle le montre à son DSI et au DGS. Ils sont rassurés. Quand l'appel d'offres est lancé, Litus répond avec une proposition qui coche toutes les cases. La relation a commencé bien avant le marché public.

**Ce parcours révèle :**
- Page collectivités dédiée
- Vocabulaire adapté (RGAA, RGPD, hébergement France)
- Lead magnet "Guide Appel d'Offres"
- Ton corporate rassurant
- Stratégie pré-appel d'offres
- Conformité mise en avant

---

### Journey 5 : Aksel & Arthur - Les admins qui veulent un cockpit simple

Aksel et Arthur gèrent Litus au quotidien. Ils codent, ils publient, ils suivent les leads. Leur ancien WordPress était un cauchemar : plugins qui cassent, mises à jour risquées, lenteur permanente. Avec le nouveau site, ils veulent un contrôle total sans friction.

Lundi matin, Aksel ouvre le dashboard admin. Vue rapide : 47 visiteurs hier, 3 formulaires reçus, 2 téléchargements du guide collectivités, 1 utilisation de l'estimateur avec conversion. Il voit les stats essentielles sans ouvrir 5 onglets.

Arthur a généré un article de blog avec l'IA sur "Comment choisir son agence web à Lorient". Il ouvre le CMS, crée un nouvel article via le template. Il colle le contenu, remplit le title, la meta description, l'URL slug. Preview. Publish. L'article est en ligne en 2 minutes, déjà optimisé SEO.

Un prospect a rempli le formulaire de contact à 23h. Aksel le voit dans le dashboard avec toutes les infos : nom, téléphone, source (page plombier Lorient), heure. Il rappelle dans la matinée.

Pour modifier une page service, ils passent directement par le code - pas besoin d'interface. Le CMS est là pour le contenu dynamique (blog, leads, stats), pas pour tout contrôler.

**Ce parcours révèle :**
- Dashboard admin simple (stats, leads, formulaires)
- CMS blog avec templates SEO (title, meta desc, slug)
- Vue des leads magnets téléchargés
- Vue des utilisations estimateur
- Notifications formulaires
- Séparation code (pages) vs CMS (contenu dynamique)

---

### Journey Requirements Summary

| Parcours | Fonctionnalités révélées |
|----------|-------------------------|
| Jean-Marc (Artisan) | Estimateur de Potentiel, Hero copywriting, Prix affichés, Formulaire 1 champ, CTA visible |
| Sophie (PME) | Mega-menu persona, Études de cas, Audit Google Ads (lead magnet), Parcours PME |
| Marc (DSI) | Comparatif SSII, Cartographie productivité (lead magnet), Page sur-mesure, Chiffrage ROI |
| Nathalie (Collectivité) | Page collectivités, Vocabulaire RGAA/RGPD, Guide appel d'offres (lead magnet) |
| Aksel/Arthur (Admin) | Dashboard stats, CMS blog avec templates SEO, Vue leads/formulaires, Vue lead magnets |

## Web App Specific Requirements

### Project-Type Overview

Site vitrine d'agence web avec CMS admin léger. Architecture moderne optimisée pour SEO et performances maximales. Pas de SaaS, pas d'authentification utilisateur côté public.

### Technical Architecture

| Aspect | Choix | Justification |
|--------|-------|---------------|
| Framework | Next.js 14+ (App Router) | SSR/SSG natif, SEO optimal, React ecosystem |
| Rendering | SSG par défaut, ISR pour blog | Perfs maximales, contenu frais |
| Styling | Tailwind CSS | Utility-first, responsive fluide avec clamp() |
| Hosting | Vercel ou équivalent | Edge functions, CDN global, preview deploys |
| CMS | Custom admin (Next.js API routes + DB légère) | Blog, leads, stats |
| Base de données | SQLite/Turso ou PostgreSQL | Léger, suffisant pour le volume |

### Animation & Interaction Stack

| Besoin | Bibliothèque recommandée | Alternative |
|--------|-------------------------|-------------|
| Animations UI (reveal, fade, slide) | **Framer Motion** | CSS natif + Intersection Observer |
| Animations complexes (timeline, séquences) | **GSAP** | Framer Motion |
| Smooth scroll | **Lenis** | CSS scroll-behavior + JS léger |
| Counters animés | Framer Motion ou custom | react-countup |
| 3D / Parallax léger | Framer Motion 3D | CSS transforms |
| Micro-interactions (hover, focus) | CSS natif | Framer Motion |

**Mapping animations brainstorm → implémentation :**

| Animation prévue | Implémentation |
|------------------|----------------|
| Hero : texte reveal + gradient animé | Framer Motion (stagger) + CSS gradient animation |
| Chiffres clés : counter au scroll | Intersection Observer + Framer Motion useInView |
| Cards études de cas : hover 3D | CSS transform-style: preserve-3d + Framer Motion |
| Comparatif : checkmarks cascade | Framer Motion stagger children |
| Scroll : fade-in + slide | Framer Motion + whileInView |
| CTA : micro-interactions | CSS :hover + transitions |
| Estimateur : chiffres temps réel | Framer Motion animate ou react-spring |

### Stack complète recommandée

| Catégorie | Choix principal | Notes |
|-----------|-----------------|-------|
| **Framework** | Next.js 14+ (App Router) | SSR/SSG, SEO optimal |
| **Langage** | TypeScript (strict) | Typage, maintenabilité |
| **Styling** | Tailwind CSS | Utility-first, responsive fluide |
| **Animations** | Framer Motion | Animations UI + scroll |
| **Smooth scroll** | Lenis | Scroll fluide premium |
| **Icons** | Lucide React ou Heroicons | Léger, tree-shakable |
| **Fonts** | next/font + Google Fonts | Cal Sans, Inter, Borel |
| **Images** | next/image | Optimisation auto |
| **Forms** | React Hook Form + Zod | Validation, performance |
| **Database** | Prisma + SQLite/Turso | CMS léger |
| **Auth admin** | NextAuth.js | Aksel + Arthur only |
| **Email** | Resend | Transactionnel (leads) |
| **Analytics** | Plausible ou Vercel Analytics | Privacy-friendly |
| **Hosting** | Vercel | Edge, CDN, previews |
| **Monitoring** | Sentry (errors) + Vercel Speed Insights | Prod monitoring |

### Browser Support

| Navigateur | Version minimum | Notes |
|------------|-----------------|-------|
| Chrome | 90+ | Priorité 1 |
| Firefox | 90+ | Priorité 1 |
| Safari | 14+ | Priorité 1 (iOS inclus) |
| Edge | 90+ | Priorité 1 |
| Samsung Internet | 15+ | Mobile Android |
| Anciens navigateurs | Graceful degradation | Contenu accessible, animations désactivées |

**Stratégie :** Progressive enhancement. Le contenu et la navigation fonctionnent partout. Les animations et effets visuels avancés nécessitent un navigateur moderne.

### SEO Strategy

| Élément | Implémentation |
|---------|----------------|
| Meta tags | Dynamiques par page (title, description, OG, Twitter) |
| Sitemap | Généré automatiquement (next-sitemap) |
| Robots.txt | Configuré pour indexation optimale |
| Schema.org | LocalBusiness + Organization + Service |
| Core Web Vitals | LCP < 2.5s, FID < 100ms, CLS < 0.1 |
| URLs | Clean, descriptives, hiérarchiques |
| Canonical | Automatique pour éviter duplicate content |
| Hreflang | Non requis (site monolingue FR) |

### Performance Targets

| Métrique | Cible | Outil de mesure |
|----------|-------|-----------------|
| Lighthouse Performance | > 95 | Lighthouse CI |
| Lighthouse SEO | 100 | Lighthouse CI |
| Lighthouse Accessibility | > 90 | Lighthouse CI |
| LCP | < 2.0s | Web Vitals |
| FID/INP | < 100ms | Web Vitals |
| CLS | < 0.05 | Web Vitals |
| TTI | < 3s | Lighthouse |
| Bundle size | < 100kb JS initial | Next.js analyzer |

### Responsive Design

| Approche | Détail |
|----------|--------|
| Méthode | Fluid design (clamp, rem, em) |
| Breakpoints | ZERO breakpoints statiques |
| Container queries | Oui, pour composants autonomes |
| Images | Next/Image avec srcset automatique |
| Fonts | Variable fonts, subset, preload |

### Real-Time Features

| Feature | Implémentation | Priorité |
|---------|----------------|----------|
| Badge "Dispo projet" | WebSocket ou SSE avec fallback polling | MVP |
| Notifications admin (nouveau lead) | Polling ou webhook vers Slack/Discord | Post-MVP |

### Accessibility Level

| Page type | Niveau | Justification |
|-----------|--------|---------------|
| Pages standard | WCAG 2.1 AA | Bonne pratique |
| Pages collectivités | WCAG 2.1 AA strict | Exigence RGAA |
| Admin dashboard | WCAG 2.1 A | Usage interne |

### Points à trancher par l'Architecte

| Aspect | Question |
|--------|----------|
| Framer Motion vs GSAP | Ou les deux selon les besoins |
| Tailwind vs CSS Modules | Préférence équipe |
| SQLite vs PostgreSQL | Selon volume et besoins |
| Structure du monorepo | Si séparation front/admin |
| Stratégie de cache | ISR intervals, revalidation |
| CI/CD pipeline | Tests, preview, prod |
| Stratégie images | CDN externe (Cloudinary) ou next/image seul |
| SEO local | Schema.org LocalBusiness multi-location |
| Blog | MDX pour contenu riche ou Markdown simple |
| Estimateur | API externe données Google ou DB interne |
| Lead magnets PDF | Génération dynamique ou fichiers statiques |
| A/B testing popups | Solution custom ou outil tiers |

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**Approche :** MVP ambitieux = Version quasi-finale
**Philosophie :** Livrer l'expérience complète sur le périmètre défini. Pas de "on fera mieux après".

**Ressources estimées :**
- Équipe : 2 devs (Aksel + Arthur)
- Stack : Next.js + Tailwind + Framer Motion
- Timeline : À définir avec l'Architecte

### MVP Feature Set (Phase 1) - COMPLET

#### Pages publiques

| Page | Contenu | SEO |
|------|---------|-----|
| Homepage | Hero + Estimateur + Copywriting validé + Animations | Oui |
| Services : Site vitrine | Page complète | Oui |
| Services : SEO | Page complète | Oui |
| Services : Google Ads | Page complète | Oui |
| Services : Applications sur-mesure | Page complète | Oui |
| Métier : Paysagiste | Page dédiée + Estimateur | Priorité |
| Métier : Plombier | Page dédiée + Estimateur | Oui |
| Métier : Électricien | Page dédiée + Estimateur | Oui |
| Métier : Menuisier | Page dédiée + Estimateur | Oui |
| Métier : Serrurier | Page dédiée + Estimateur | Oui |
| Métier : Couvreur | Page dédiée + Estimateur | Oui |
| Métier : Maçon | Page dédiée + Estimateur | Oui |
| Métier : Peintre | Page dédiée + Estimateur | Oui |
| Métier : Chauffagiste | Page dédiée + Estimateur | Oui |
| Métier : Carreleur | Page dédiée + Estimateur | Oui |
| Ville : Lorient | Landing locale | Oui |
| Ville : Le Mans | Landing locale | Oui |
| Collectivités | Page dédiée + Guide téléchargeable | Oui |
| Pricing | Toggle mensuel/annuel/one-shot | Oui |
| Contact | Formulaire 1 champ | Oui |
| Blog | Structure + 2-3 articles initiaux | Oui |
| Études de cas | 2 études chiffrées | Oui |
| Mentions légales / CGV | Pages légales | Non |

#### Composants & Features

| Composant | Détail |
|-----------|--------|
| Header | Logo + Mega-menu + Badge dispo (temps réel) + CTA |
| Mega-menu | Double entrée : Services + Vous êtes ? |
| Estimateur de Potentiel | 2 champs → résultat chiffré instantané |
| Footer | Navigation + Contact + Réseaux |
| Animations | Toutes les animations prévues (reveal, counters, 3D cards, etc.) |
| Popup lead | A/B test (intelligent vs discret) |
| Formulaire contact | 1 champ (téléphone) |

#### Lead Magnets (TOUS au MVP)

| Lead magnet | Format | Implémentation |
|-------------|--------|----------------|
| Estimateur de Potentiel | Interactif | DB pré-calculée (50-100 combinaisons) |
| Guide Appel d'Offres Collectivités | PDF | Fichier statique téléchargeable |
| Audit Google Ads | Formulaire | Formulaire → notification → process manuel |
| Cartographie Productivité | Formulaire + RDV | Formulaire → Calendly ou équivalent |

#### Admin Dashboard

| Feature | Détail |
|---------|--------|
| Dashboard stats | Visites (Plausible/Vercel), Leads, Téléchargements, Estimateur |
| CMS blog | Templates SEO (title, meta, slug), Preview, Publish |
| Vue leads | Liste des formulaires reçus avec source |
| Vue estimateur | Utilisations + taux de conversion |
| Vue lead magnets | Téléchargements par type |
| Notifications | Email/Slack sur nouveau lead |
| Export CSV | Export des leads pour CRM externe |
| Auth | Aksel + Arthur uniquement |

### Post-MVP Features (Phase 2)

| Feature | Priorité |
|---------|----------|
| +15 pages métiers supplémentaires | Haute |
| Pages personas complètes (Artisan, PME, DSI, Collectivité) | Haute |
| Mode brouillon + historique articles | Moyenne |
| Dashboard client (si demande) | Basse |
| Intégration newsletter | Moyenne |
| Chatbot / FAQ dynamique | Basse |

### Vision (Phase 3+)

| Feature | Contexte |
|---------|----------|
| Espace client avec reporting | Quand volume clients suffisant |
| Outils internes (devis, facturation) | Automatisation interne |
| Pivot offre principale vers SEO/Ads/Logiciels | Évolution business |

### Risk Mitigation

| Risque | Mitigation |
|--------|------------|
| **Données estimateur** | Base pré-calculée = pas de dépendance API externe |
| **Scope creep** | MVP = version finale, pas d'ajouts en cours de route |
| **Performance animations** | Progressive enhancement, fallback CSS |
| **SEO long à démarrer** | Structure SEO parfaite dès le lancement, contenu à enrichir |
| **Conversion faible** | A/B test popups, analytics dès le MVP pour itérer |

## Functional Requirements

### Navigation & Découverte

- FR1: Le visiteur peut naviguer via un mega-menu à double entrée (Services / Vous êtes ?)
- FR2: Le visiteur peut accéder à toutes les pages services depuis le mega-menu
- FR3: Le visiteur peut accéder aux pages métiers depuis le mega-menu "Vous êtes ?"
- FR4: Le visiteur peut accéder aux pages villes depuis le footer
- FR5: Le visiteur peut voir le badge de disponibilité projet en temps réel dans le header
- FR6: Le visiteur peut cliquer sur le CTA "Réserver un appel" depuis n'importe quelle page
- FR7: Le visiteur peut naviguer vers les pages légales depuis le footer

### Estimateur de Potentiel

- FR8: Le visiteur peut saisir son métier dans l'estimateur
- FR9: Le visiteur peut saisir sa ville dans l'estimateur
- FR10: Le visiteur peut voir instantanément le nombre de recherches mensuelles pour sa combinaison métier+ville
- FR11: Le visiteur peut voir une estimation du CA potentiel basée sur les recherches
- FR12: Le visiteur peut accéder à l'estimateur depuis la homepage
- FR13: Le visiteur peut accéder à l'estimateur depuis les pages métiers

### Lead Magnets & Conversion

- FR14: Le visiteur peut télécharger le Guide Appel d'Offres Collectivités en PDF
- FR15: Le visiteur peut demander un Audit Google Ads via un formulaire dédié
- FR16: Le visiteur peut demander une Cartographie Productivité via un formulaire avec prise de RDV
- FR17: Le visiteur peut voir une popup de lead capture (version A/B testable)
- FR18: Le visiteur peut fermer la popup sans friction
- FR19: Le visiteur peut soumettre le formulaire de contact avec son numéro de téléphone uniquement
- FR20: Le visiteur peut voir une confirmation après soumission de formulaire

### Contenu Public - Pages

- FR21: Le visiteur peut consulter la page d'accueil avec hero, estimateur et sections de contenu
- FR22: Le visiteur peut consulter les pages services :
  - Création de sites : Site vitrine, Site e-commerce, Site sur-mesure
  - Marketing : SEO, Google Ads
  - Développement : Applications sur-mesure
- FR23: Le visiteur peut consulter les pages métiers (10 métiers : Paysagiste, Plombier, Électricien, Menuisier, Serrurier, Couvreur, Maçon, Peintre, Chauffagiste, Carreleur)
- FR24: Le visiteur peut consulter les pages villes (Lorient, Le Mans)
- FR25: Le visiteur peut consulter la page Collectivités avec le vocabulaire adapté (RGAA, RGPD)
- FR26: Le visiteur peut consulter la page Pricing avec les packages mis en avant en premier
- FR27: Le visiteur peut voir le détail des prix par service avec toggle mensuel/annuel/one-shot
- FR28: Le visiteur peut voir "Devis sur mesure" pour les services sans prix fixe
- FR29: Le visiteur peut comprendre la composition des packages (ex: Site + SEO + Google Ads)
- FR30: Le visiteur peut consulter les études de cas avec chiffres avant/après
- FR31: Le visiteur peut consulter la page Contact
- FR32: Le visiteur peut consulter les mentions légales et CGV

### Contenu Public - Blog

- FR33: Le visiteur peut consulter la liste des articles de blog
- FR34: Le visiteur peut lire un article de blog individuel
- FR35: Le visiteur peut voir les métadonnées SEO de chaque article (title, description)
- FR36: Le visiteur peut partager un article (liens sociaux ou copie URL)

### Expérience Visuelle

- FR37: Le visiteur peut voir des animations de reveal au scroll
- FR38: Le visiteur peut voir des compteurs animés sur les chiffres clés
- FR39: Le visiteur peut voir des micro-interactions sur les CTAs (hover)
- FR40: Le visiteur peut voir des cards avec effet 3D au survol (études de cas)
- FR41: Le visiteur peut naviguer avec un smooth scroll fluide
- FR42: Le visiteur sur ancien navigateur peut accéder au contenu sans animations (graceful degradation)

### Admin - Dashboard

- FR43: L'admin peut se connecter au dashboard avec authentification sécurisée
- FR44: L'admin peut voir les statistiques de visites du site
- FR45: L'admin peut voir le nombre de leads générés (formulaires soumis)
- FR46: L'admin peut voir le nombre de téléchargements de lead magnets par type
- FR47: L'admin peut voir les utilisations de l'estimateur et le taux de conversion
- FR48: L'admin peut exporter la liste des leads au format CSV

### Admin - Gestion Blog

- FR49: L'admin peut créer un nouvel article de blog
- FR50: L'admin peut éditer un article existant
- FR51: L'admin peut renseigner les champs SEO (title, meta description, slug)
- FR52: L'admin peut prévisualiser un article avant publication
- FR53: L'admin peut publier ou dépublier un article
- FR54: L'admin peut supprimer un article

### Admin - Gestion Leads

- FR55: L'admin peut voir la liste des formulaires soumis avec date, source et contenu
- FR56: L'admin peut filtrer les leads par type (contact, audit, cartographie)
- FR57: L'admin peut marquer un lead comme traité
- FR58: L'admin reçoit une notification (email ou Slack) lors d'un nouveau lead

### Admin - Configuration

- FR59: L'admin peut modifier le statut du badge "Dispo projet" (disponible/occupé)
- FR60: L'admin peut gérer les données de l'estimateur (volumes de recherche par métier+ville)

## Non-Functional Requirements

### Performance (NFR1-8)

- NFR1: Lighthouse Performance Score > 95 sur toutes les pages
- NFR2: LCP (Largest Contentful Paint) < 2.0s sur desktop et mobile
- NFR3: CLS (Cumulative Layout Shift) < 0.05 sur toutes les pages
- NFR4: TTI (Time to Interactive) < 3s sur connexion 4G standard
- NFR5: Bundle JavaScript initial < 100kb (gzippé)
- NFR6: Images optimisées automatiquement (WebP/AVIF avec fallback)
- NFR7: Fonts préchargées et subset pour caractères utilisés uniquement
- NFR8: Animations désactivables via prefers-reduced-motion

### Sécurité (NFR9-16)

- NFR9: HTTPS obligatoire sur toutes les pages (TLS 1.3)
- NFR10: Content Security Policy (CSP) strict configuré
- NFR11: Rate limiting sur les formulaires (max 5 soumissions/minute/IP)
- NFR12: Validation côté serveur de toutes les entrées utilisateur
- NFR13: Protection CSRF sur tous les formulaires
- NFR14: Headers de sécurité (X-Frame-Options, X-Content-Type-Options, etc.)
- NFR15: Authentification admin avec session sécurisée (httpOnly, secure, sameSite)
- NFR16: Logs d'accès admin avec horodatage et IP

### Accessibilité (NFR17-22)

- NFR17: WCAG 2.1 niveau AA sur toutes les pages publiques
- NFR18: RGAA niveau AA strict sur les pages collectivités
- NFR19: Navigation clavier complète sur tous les éléments interactifs
- NFR20: Contraste minimum 4.5:1 pour le texte standard, 3:1 pour les grands textes
- NFR21: Attributs ARIA appropriés sur les composants dynamiques (mega-menu, modales)
- NFR22: Textes alternatifs sur toutes les images porteuses de sens

### SEO Technique (NFR23-30)

- NFR23: Lighthouse SEO Score = 100 sur toutes les pages
- NFR24: Structured data Schema.org (LocalBusiness, Organization, Service, FAQ)
- NFR25: Sitemap XML généré automatiquement et soumis à Google Search Console
- NFR26: Robots.txt configuré pour indexation optimale
- NFR27: URLs canoniques sur toutes les pages
- NFR28: Meta tags dynamiques (title < 60 chars, description < 160 chars)
- NFR29: Open Graph et Twitter Cards sur toutes les pages
- NFR30: Temps de réponse serveur < 200ms (TTFB)

### Intégration (NFR31-34)

- NFR31: Intégration analytics (Plausible ou Vercel Analytics) sans cookies tiers
- NFR32: Intégration email transactionnel (Resend) pour notifications leads
- NFR33: API interne RESTful pour le dashboard admin
- NFR34: Webhooks configurables pour notifications externes (Slack/Discord)

### Fiabilité (NFR35-38)

- NFR35: Uptime > 99.5% (monitoring Vercel ou équivalent)
- NFR36: Backups automatiques de la base de données (quotidien)
- NFR37: Gestion d'erreurs gracieuse avec pages 404/500 personnalisées
- NFR38: Logs d'erreurs centralisés avec alerting (Sentry ou équivalent)

### Maintenabilité (NFR39-41)

- NFR39: Code conforme aux règles ESLint/Prettier avec CI automatisée
- NFR40: Couverture de tests > 70% sur les composants critiques (formulaires, Estimateur)
- NFR41: Documentation technique inline (JSDoc/TSDoc) pour les fonctions complexes

### RGPD & Conformité Légale (NFR42-46)

- NFR42: Bannière de consentement cookies conforme RGPD (opt-in explicite)
- NFR43: Politique de confidentialité accessible depuis toutes les pages (footer)
- NFR44: Procédure de suppression des données personnelles documentée et accessible
- NFR45: Durée de conservation des leads limitée (max 3 ans) avec purge automatique
- NFR46: Mentions légales complètes (SIRET, hébergeur, responsable publication)

### Monitoring & Observabilité (NFR47-49)

- NFR47: Alertes automatiques si uptime < 99.5% ou erreurs > seuil
- NFR48: Logging des erreurs serveur avec stack trace et contexte
- NFR49: Dashboard temps réel des métriques Core Web Vitals (Vercel Speed Insights)

### Caching & CDN (NFR50-52)

- NFR50: Assets statiques cachés 1 an avec cache-busting automatique
- NFR51: Pages SSG servies depuis edge CDN (< 50ms latence)
- NFR52: API avec cache intelligent (stale-while-revalidate)

### Optimisation Images (NFR53-55)

- NFR53: Images servies en WebP/AVIF avec fallback JPEG automatique
- NFR54: Lazy loading natif sur toutes les images below-the-fold
- NFR55: Images responsive avec srcset adaptatif (next/image)

### Internationalisation (NFR56-57)

- NFR56: Attribut lang="fr" sur toutes les pages HTML
- NFR57: Dates et nombres formatés selon locale française (dd/mm/yyyy, espaces milliers)

