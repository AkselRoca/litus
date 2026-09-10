# Page site vitrine — contenu sous le hero

Référence : image `codex-clipboard-60a25353-3fe4-4ade-bbc3-ab2c3b053a2f.png` fournie par l’utilisateur.

## Périmètre

La page `/creation-site-internet` conserve `SitesVitrineHero`, `SiteBuilderDemo` et les styles du hero commun, sans modification. Le contenu qui suivait le hero dans `ServicePageTemplate` est remplacé par `VitrineContent`, propre à cette page. Le header, le footer et les autres pages services restent inchangés.

Ordre des sections : bénéfices avec trois démonstrations, problèmes et refonte, projet West Clôtures, parcours de conversion, méthode, équipe, offres, FAQ et contact. Les ancres `refonte`, `landing-pages` et `tarifs` restent utilisables depuis le menu. `votre-site` et `parlons-de-votre-site` permettent d’atteindre l’introduction et le formulaire.

## Identité et médias

Inter et navy existants ; accents de titres `#C7431B`, boutons `#E95E2A`. Fonds crème, bleu doux et sauge, avec variantes sombres. Les styles des nouveaux composants sont préfixés `vitrine-` et ne ciblent jamais le hero.

Les deux photos `public/team/portrait-clair.png` et `portrait-brun.png` sont les originaux fournis par l’utilisateur. Elles sont présentées ensemble : l’attribution de chaque photo à Arthur ou Aksel reste à confirmer. Aucune scène ou portrait généré n’est utilisé dans cette section.

Le projet utilise le mockup existant `west-workspace-wide.webp` et des captures réelles des réalisations. Les chiffres de croissance non documentés de l’ancienne page ne sont pas repris. La note Google 5/5 avait été confirmée dans les briefs précédents ; aucun faux témoignage n’est ajouté. Le logo Google en couleur est repris du dessin vectoriel déjà présent dans `TerritoryScene.tsx`, sans modifier le logo monochrome du bandeau d’outils.

## Interactions et contact

Les trois démonstrations se jouent une fois à leur entrée dans l’écran, se mettent en pause hors écran ou dans un onglet masqué et disposent d’un bouton de relecture. Les parcours sont illustratifs ; leurs boutons n’envoient aucune demande. `prefers-reduced-motion` affiche directement leur état final.

Le parcours à quatre étapes est utilisable à la souris et au clavier. La FAQ utilise des éléments `details` natifs. Le formulaire final emploie le schéma de validation partagé et `/api/contact`, avec consentement explicite, erreurs par champ, état d’attente, erreur d’envoi et confirmation. Service : `sites-vitrine` ; budget : `ne-sais-pas`. La formule 59 €/mois conserve l’engagement de 36 mois.

## Vérification

- ESLint et compilation Next.js réussis.
- Contrôles navigateur à 320, 390, 560, 768, 850, 1024, 1250, 1440, 1672 et 1920 px : pas de débordement horizontal ni d’image manquante.
- Modes clair/sombre et mouvement réduit contrôlés.
- Démonstrations, relecture, étapes au clavier et FAQ vérifiées.
- Formulaire : champs requis, consentement, attente, erreur, nouvelle tentative, succès et déplacement du focus vérifiés avec réponses API simulées. Aucun message réel envoyé ; la délivrabilité email n’a pas été testée.
- Les empreintes SHA-256 des cinq fichiers de hero sont inchangées. À 1440 × 960, hauteur du hero, position et dimensions du H1, ainsi que sa police calculée, sont identiques avant et après.
