# Page 404 Litus

## Integration

- Route native Next.js : `src/app/not-found.tsx`. Le statut 404 est conserve.
- Le header public existant reste en place. Les avis et le footer standard sont masques uniquement en presence de `.litus-404` ; la gestion du consentement reste disponible.
- Six raccourcis vers les routes existantes, footer de secours et recherche locale des pages/services.
- Les titres des articles publics sont charges a la demande depuis `/api/not-found-search`, avec cache de cinq minutes. Les mots recherches restent dans le navigateur.
- Redirection vers `/` apres dix secondes. Toute interaction au clavier, au pointeur ou avec la recherche la suspend. Un bouton permet de suspendre/reprendre. Un onglet masque suspend aussi le compteur.
- Avec `prefers-reduced-motion`, les animations et le demarrage automatique de la redirection sont desactives.
- Composition desktop fidele a la reference ; sur mobile, la scene precede le texte et les cartes passent sur deux colonnes.
- L'illustration complete oscille de trois pixels ; les etoiles derivent lentement et un meteore apparait occasionnellement. Aucun moteur 3D ni video.

## Illustration

Generation avec l'outil integre `image_gen`, a partir de la reference utilisateur `codex-clipboard-f250c9a4-efd4-4dd2-9e61-3c1697dafa4d.png`.

Fichier final : `public/images/404/astronaute-litus-lune-404.webp`.
Dimensions : 1877 x 838 ; WebP qualite 88 ; 137592 octets. Servi par `next/image` avec chargement prioritaire et variantes responsives.

Prompt utilise :

> Create a production website illustration asset, using the attached Litus 404 mockup as the exact visual reference. Reconstruct ONLY THE COMPLETE BACKGROUND SCENE, not the website UI. Very wide landscape approximately 2.24:1, highest quality. Preserve near-identically the astronaut sitting on the Moon on the LEFT, occupying x16-41%, y12-70%: white detailed spacesuit, black glossy round visor with two orange pixel sad eyes, orange Litus brand patch, black boots facing camera, holding a real corrugated cardboard sign with large hand-lettered '404' and small 'OUPS...'. Preserve the Litus white equipment suitcase at x3-16%, y44-65%, logo and text 'Litus' and handwritten 'Toujours plus loin'. Preserve the blue Earth entering from the RIGHT edge at x88%, y25%, glowing atmosphere, the wooden direction signs at x85-95%, y38-69%, exact readable labels 'LORIENT' and 'LE MANS' with directional arrows. Preserve lunar rocky ground, horizon about y60%, detailed ridges and craters and cinematic soft moonlight. Preserve deep almost-black navy starfield, small stars, warm orange glints, premium photoreal 3D slightly goofy mascot aesthetic. Crucial: REMOVE the entire white website header, REMOVE all headline/body copy, REMOVE the search bar, countdown, REMOVE the six service cards and REMOVE footer. Fill those areas naturally with the original dark starfield or lunar foreground. Remove the handwritten annotation left of astronaut; it will be rendered as real HTML. Keep a very dark EMPTY SPACE in center/right x41-84%, y14-58% for HTML headline and search. Lower y73-100% should gradually fade lunar foreground into near black for transparent cards and footer. DO NOT put any UI or text in that empty center/right area. Do not redesign the scene, change the astronaut pose, or move the suitcase/signposts. This is the illustration behind a faithful HTML recreation, not a screenshot of a new design.

## Publication

Cette passe ne lance ni tests, ni build, ni publication. Les corrections precedemment signalees sur le portfolio et les tests Expertises restent en attente d'autorisation avant le prochain build.
