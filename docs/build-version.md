# Version du build visible dans le footer

Le numéro de build affiché dans le footer se trouve dans `src/components/layout/Footer.tsx`, dans le texte `Build ...`.

## Règle d'incrémentation

- Changement mineur ou correctif isolé : incrémenter la lettre, par exemple `1.01.d` -> `1.01.e`.
- Lot de modifications visible côté utilisateur, refonte de bloc, emails, responsive ou plusieurs fichiers : incrémenter le deuxième nombre et repartir à `a`, par exemple `1.01.d` -> `1.02.a`.
- Refonte majeure ou changement très large du site : incrémenter le premier nombre, par exemple `1.02.a` -> `2.00.a`.

## Avant chaque publication

1. Mettre à jour le build dans `src/components/layout/Footer.tsx`.
2. Lancer `npm run build`.
3. Committer le changement avec le reste du lot.
4. Déployer sur Vercel.
