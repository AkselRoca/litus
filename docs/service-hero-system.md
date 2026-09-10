# Heroes des pages services

Les six pages services utilisent `src/components/sections/services/ServiceHero.tsx` :

- `/creation-site-internet`
- `/creation-site-ecommerce`
- `/seo-local`
- `/google-ads`
- `/creation-application-web`
- `/automatisation`

Le composant et son fichier `service-hero.css` sont l'unique source de mise en page du texte. Les valeurs viennent du hero site vitrine, déjà partagé avec l'e-commerce : Inter, graisse 650, taille desktop `clamp(40px, 3.95vw, 66px)`, interligne 1.08, approche −0.048em, largeur maximale du H1 760px et du paragraphe 650px. La grille, les espacements et les boutons sont également communs, avec les mêmes adaptations tablette/mobile.

Chaque page injecte un titre en texte simple, une sous-chaîne `accent`, sa description, ses liens et son visuel. Aucun `<br>` ni ajustement de taille/largeur par service : le navigateur répartit le texte selon la largeur commune. Les espaces avant les ponctuations françaises sont insécables pour éviter une ponctuation isolée au début d'une ligne.

Les démonstrations de création de site, e-commerce et SEO restent des composants propres à leur service. Leurs CSS ne gèrent que les éléments internes du visuel ; ils ne redéfinissent pas le H1, le bloc texte ou les CTA. Les anciennes règles `vitrine-hero`, `commerce-hero` et `seo-hero-copy` ont été retirées de leurs feuilles de styles.

`ServicePageTemplate` utilise aussi `ServiceHero` pour ses pages sans démonstration dédiée, en injectant l'image et les textes du service. Pour toute évolution de la hiérarchie, modifier le composant commun et vérifier les six pages à largeur d'écran égale.
