# Accueil — blocs 03, 04 et 05

Référence : maquette et brief joints le 9 septembre 2026.

- Composition éditoriale, formulaire, méthode en quatre étapes reliées, quatre cartes statistiques.
- Famille Inter conservée pour les titres ; crème, navy et orange #E95E2A.
- Compteurs sur 900 ms, une seule fois à l’entrée dans l’écran ; valeurs accessibles stables. Apparitions de 7 px, mouvement réduit respecté.
- Formulaire de marché local et parcours de demande d’audit conservés. Le badge décrit une première lecture du marché, sans présenter les estimations automatiques comme des mesures réelles.
- Statistiques fournies dans le brief : 150+ clients, 250 % ROI, 5/5 Google, 24 h. Note 5/5 également corrigée dans les données structurées SEO.
- Correction du chargement initial du bloc Google existant avec le mode de mouvement réduit : synchronisation du rendu serveur et client.

Vérifications : deux tests Vitest de l’estimateur réussis ; Edge/Playwright sur 11 largeurs de 320 à 1920 px, sans débordement des trois sections ; compteurs, mode réduit et reprise après erreur de l’estimateur testés avec API simulée. Aucun lead réel envoyé. Compilation Next.js et TypeScript validées.
