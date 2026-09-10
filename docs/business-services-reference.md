# Automatisation et applications web — 10 septembre 2026

Refonte des routes `/automatisation` et `/creation-application-web` autour du hero partagé `ServiceHero`, identique au système utilisé par les pages IA et e-commerce. Le composant et les styles des autres heroes ne sont pas modifiés.

## Système visuel

`BusinessService.tsx`, `ServiceReveal.tsx` et `business-service.css` apportent des sections communes : titres, grilles, blocs photographiques, FAQ, CTA, fonds crème/bleu clair/bleu nuit et adaptations au thème sombre. Les accents de titres restent `#C7431B`, les boutons `#E95E2A`. Les apparitions au scroll respectent la préférence de mouvement réduit ; le contenu reste visible avant hydratation.

La page Automatisation démontre un parcours formulaire/e-mail/CRM → dossier → devis → notification. La page Applications montre un dossier dans une application métier et un second parcours équipe → client → responsable. Les interfaces sont interactives, locales et illustratives ; elles n’effectuent aucun envoi métier. Les détails, sources des photos et règles des animations sont documentés dans les README des deux routes.

## Parcours et intégration

- Ancres existantes conservées : `/automatisation#integrations-api` et `/creation-application-web#developpement-sur-mesure`.
- Sujets de contact dédiés : « Automatisation & intégrations API » et « Application web sur mesure ». La liste des services, la validation et les libellés e-mail partagent les nouvelles valeurs.
- Le formulaire sélectionne automatiquement le service depuis ces sujets exacts. Le parcours IA existant et le contact sans sujet restent fonctionnels.
- La fenêtre générique de capture est désactivée sur ces deux pages, qui disposent de leurs propres CTA.
- Métadonnées, canonical, Service, BreadcrumbList et FAQPage ; image de partage dédiée aux applications. Les deux services figurent dans le sitemap, leurs images Open Graph sont exclues des URL de pages.

## Vérifications

- ESLint sur les deux routes et les composants/formulaires modifiés : réussi.
- `npx next build` : réussi, vérification TypeScript et génération de 90 routes statiques comprises. Avertissements déjà présents : convention middleware dépréciée et base Browserslist ancienne.
- `npx next-sitemap` : réussi.
- Edge : 320, 390, 768, 1024, 1280 et 1440 px ; une seule H1, aucune erreur JavaScript, aucun débordement horizontal ni image cassée.
- À 1440 px, les deux heroes mesurent 785,8 px ; H1 Inter 56,88 px, largeur 592,08 px, position verticale 190,86 px, identiques à la référence IA.
- Photos chargées et captures inspectées en clair et sombre ; fond Applications recadré pour masquer le calendrier de la photographie originale.
- Démonstrations : scénarios et vues, progression, pause/reprise/relecture, navigation clavier, arrêt hors écran/onglet, mouvement réduit. Le parcours application secondaire partage effectivement son état entre les trois rôles.
- Ancres existantes accessibles sous le header ; six FAQ Automatisation et huit FAQ Applications conformes au JSON-LD visible.
- Formulaires Applications, Automatisation et IA vérifiés avec interception de `/api/contact` : bon objet/service/message/budget/consentement et confirmation. Aucun message réel envoyé.

Les captures et rapports de contrôle sont dans le dossier temporaire `C:/Users/Admin/AppData/Local/Temp/litus-service-refresh`, hors des fichiers publiés du site.
