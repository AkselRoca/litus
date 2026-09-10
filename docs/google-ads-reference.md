# Page Google Ads

Route : `/google-ads`. Référence : `ChatGPT Image 9 sept. 2026, 18_44_14.png` et brief utilisateur associé. Le brief précise les textes et remplace les statistiques, certifications et tarifs de la maquette par un contenu local et des offres sur devis.

## Structure et identité

Hero commun `ServiceHero`, démonstration de recherche, bandeau de pilotage, bénéfices, méthode, accompagnement local, liens vers les services et réalisations, deux offres, FAQ et formulaire. Header, navigation, logo et footer conservés. Le popup automatique est désactivé uniquement sur cette page pour ne pas masquer le formulaire lors du défilement.

Inter et règles H1/H2/H3 de la page Création de site internet ; accents de titres `#C7431B`, boutons `#E95E2A`, fonds crème, bleu clair et sauge, variantes sombres. `white-space: pre-line` dans le hero commun permet les retours explicitement demandés pour ce titre. Les dimensions et la typographie du hero site vitrine restent identiques.

## Démonstrations

La recherche alterne « plombier Lorient » et « entreprise rénovation Le Mans » : saisie, annonce Sponsorisé, localisation, notification « Demande de devis / Exemple de parcours », puis pause de lecture. Le domaine `.example` et la mention illustrative distinguent la scène d'une vraie campagne. Aucun appel ou formulaire n'est envoyé par le visuel.

La méthode anime une étape à la fois, attend que la carte suivante soit visible, puis conserve son état final. Pause manuelle, suspension hors écran ou dans un onglet masqué, relecture et réduction des mouvements sont pris en charge. Avec mouvement réduit, les visuels sont immédiatement complets. Le bloc local possède deux sélecteurs utilisables au clavier.

## Contact et contenu

Les deux offres présélectionnent lancement ou optimisation dans le formulaire. Celui-ci réutilise le schéma partagé et `/api/contact` : `service=google-ads`, `budget=ne-sais-pas`, besoin inclus dans le message, consentement explicite. Validation par champ, état d'envoi, erreur conservant les données, succès et retour au formulaire sont prévus.

Les liens locaux utilisent `/agence-web-le-mans` et le formulaire pour Lorient, qui n'a pas encore de page locale dédiée. Liens complémentaires : `/seo-local`, `/creation-site-internet#landing-pages`, `/realisations` et `/realisations/west-clotures-paysage`.

Le contenu distingue budget publicitaire et honoraires ; il ne promet aucun classement, délai d'acquisition ou résultat chiffré. Les explications sur les conversions et le coût sont cohérentes avec la documentation primaire [suivi des conversions](https://support.google.com/google-ads/answer/1722054?hl=fr) et [budget Google Ads](https://business.google.com/fr/resources/articles/google-ads-cost/). Aucun badge Partner ou témoignage n'est ajouté.

Title et méta-description reprennent le brief ; canonical `/google-ads`. Un seul H1, contenu textuel rendu en HTML.

## Vérification

- ESLint ciblé et compilation Next.js réussis.
- Contrôles à 320, 390, 560, 768, 850, 1024, 1250, 1440 et 1920 px : aucun débordement horizontal ni texte important coupé.
- À 1920 × 1080, hero de 779 px : le bandeau suivant est entièrement visible.
- Hero site vitrine à 1440 × 960 inchangé : hauteur 827,92 px, largeur H1 592,08 px, Inter 650 / 56,88 px / interligne 61,43 px.
- Modes clair/sombre, mouvement réduit, alternance des requêtes, pause, progression séquentielle et interaction locale vérifiés en navigateur, sans erreur JavaScript.
- Les étapes mobiles hors écran restent en attente ; la visibilité d'onglet a été simulée pour vérifier la suspension dans Edge sans interface.
- Offres, FAQ au clavier, validation, consentement, attente, erreur, succès et focus testés avec interceptions API. Aucun vrai message envoyé ; la délivrabilité email n'a pas été testée.
