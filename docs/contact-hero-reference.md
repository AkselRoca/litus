# Hero Contact — référence et vérification

Page : `/contact`. Header et footer existants conservés.

## Visuel

Image créée avec l’outil intégré ImageGen, mode génération. Fichier final : `C:/Users/Admin/Documents/ChatGPT/litus-refonte/public/contact-office.webp` (1800 × 1013, 51 398 octets). Original conservé : `C:/Users/Admin/.codex/generated_images/01a080d9-085f-7831-9cf9-6a15a5de7861/exec-af5e39d8-092e-4b90-84cc-681c3a1eebfa.png`.

Prompt final :

Use case: photorealistic website background. Create a wide 16:9 editorial photograph of a calm, bright French creative agency office, warm ivory plaster, large windows with diffused daylight, a few softly out-of-focus green plants. Composition is essential: the left 78 percent is softly blurred light cream office atmosphere with very little contrast, suitable for placing website text and a large contact form on top. Only at the far right bottom edge, a pale wooden desk with a small matte charcoal ceramic mug and the cropped edge of an open dark laptop, plus two closed neutral notebooks. Mug is plain, no lettering. No people, no words, no UI, no cards, no text, no logos or watermarks. Realistic lens depth of field, subtle soft shadows, natural quiet premium photography, warm off-white and grey-blue palette. Keep desk items in the rightmost 18 percent, lower half; leave center and left airy and uncluttered.

## Comportement

Boucle de 12,6 secondes : focus visuel, saisie décorative, liste des services, sélection, bouton et confirmation illustrative. Aucune donnée de démonstration n’est affectée aux champs et aucun envoi automatique n’est possible. Toute saisie, interaction tactile, clavier ou mise au point arrête définitivement la boucle pour la visite en cours. Bouton de pause disponible. Mouvement réduit respecté ; minuterie suspendue hors écran et lorsque l’onglet est masqué.

La confirmation et la semaine illustrent la réservation : le lien existant Google Agenda donne les disponibilités réelles. Les avatars sont des symboles anonymes et le logo Litus, pas des portraits d’équipe inventés. Les réseaux reliés sont ceux déjà renseignés dans le site (LinkedIn et Facebook). La preuve du bas mène aux réalisations existantes, sans note Google non vérifiée.

## Validation

- Playwright / Edge : 8 étapes observées et aucune modification des vrais champs pendant la démonstration.
- Validation des champs et du téléphone, erreur serveur, conservation des données, succès et réinitialisation : testés avec interception de l’API, sans envoi d’email ni création de lead réel.
- Largeurs 320, 390, 500, 600, 768, 950, 1024, 1100, 1280, 1440, 1672 et 1920 px : aucun débordement horizontal du hero.
- Une colonne pour les champs sur mobile ; cartes latérales réintégrées dans le flux.
- Chargement en mouvement réduit : aucune erreur d’hydratation ou JavaScript.
- ESLint des fichiers modifiés et compilation Next.js validés.
