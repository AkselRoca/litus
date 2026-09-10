# Réalisations en local

Les 19 fiches proviennent du tableau `projects` versionné dans `src/app/api/seed/route.ts` au commit `57bf4eb`. Les captures sont déjà dans `public/realisations`. Les bases SQLite livrées dans Git étaient vides pour la table `Project`.

Le jeu de données récupéré est enregistré dans `prisma/data/portfolio.json`. Le chemin de la capture Réflexologie Lorient a été aligné sur le nom réel du fichier (deux espaces).

Après installation et initialisation de la base locale, restaurer les fiches avec :

```powershell
node --env-file=.env scripts/restore-local-portfolio.cjs
```

Le script accepte uniquement une base SQLite située dans ce projet, la sauvegarde sous `.git`, puis ajoute les fiches absentes. Les projets existants sont conservés, même s’ils ont été modifiés ou masqués. Une seconde exécution ne crée aucun doublon.

Ne pas utiliser l’ancienne route `/api/seed` pour cette restauration : elle efface les projets avant de les recréer.
