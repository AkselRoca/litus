# Build 1.14.d : ressources initiales

Correctif de 1.14.c : l'experimentation inlineCss est retiree apres regression mobile mesuree. Les feuilles de style retrouvent leur chargement normal et leur cache partage. Le detail des essais est conserve dans performance-1.14.c.md.

Optimisations conservees : demonstration Google differee, transition de page en Web Animations sans effet retardant le premier affichage, compteurs numeriques natifs annulables, logo Nos Travaux optimise. Les textes restent rendus serveur ; les formulaires et la navigation restent fonctionnels.

Verification : build et sitemap reussis ; 42 assertions fonctionnelles ; navigation client accueil/realisations/contact, mode sombre, chargement de la demonstration a l'approche et tests des compteurs reussis.

Les styles hors ecran et les fonctions du runtime Next.js utilisees lors des interactions ne sont pas supprimes pour effacer des alertes de couverture. Aucun score fixe n'est garanti. Mesures finales ajoutees apres publication.
