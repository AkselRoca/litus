# Workflow de livraison Litus

- Apres chaque modification demandee, incrementer le numero du build dans le footer selon `docs/build-version.md`.
- Lancer `npm run build` automatiquement.
- Si le build reussit, committer les changements du lot et pousser la branche Git courante automatiquement.
- Si le build echoue, signaler le blocage et ne pas publier le lot en echec.
- Preserver les changements sans rapport avec le lot. Ne pas utiliser de push force ni modifier un commit existant.
- Ne pas annoncer une publication Vercel sans un deploiement effectivement termine.
