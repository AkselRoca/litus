# Bloc estimation locale : reference et image IA

Build prepare : 1.06.a. Cette livraison locale ajoute la photo centrale et reprend la composition en trois colonnes de la capture fournie. Les fonctions calculate/requestAudit, les routes API, les etats de chargement, les erreurs et la restitution de l'analyse sont conserves.

## Image

- Outil : generation integree `image_gen`, sans CLI ni cle API locale.
- Reference : capture fournie par l'utilisateur, `codex-clipboard-d7f47cb5-511c-46ef-aef3-b15458b9ace7.png`.
- Fichier du site : `public/images/entrepreneuse-fleuriste-audit-local-v1.webp`.
- Dimensions : 960 x 1280 px, ratio 3:4, WebP qualite 84, environ 112 Kio.
- Source generee conservee : `C:/Users/Admin/.codex/generated_images/01a08fd4-57c6-7033-8235-8d98aed0d238/exec-19781c02-0979-415d-a0c3-83f1ec5ac981.png`.
- La personne et la boutique sont une illustration IA, pas une cliente ou une realisation Litus. L'ALT le precise. Aucune photo tierce telechargee ni hotlink.
- Le cartouche blanc, l'icone de localisation et les annotations sont du HTML/SVG/CSS, pas du texte incruste dans la photo.

## Prompt final utilise

```text
Use case: photorealistic-natural. Generate a NEW portrait editorial photograph for the central image of this website reference, closely matching ONLY the central photograph's composition and subject. Do NOT reproduce the website layout, surrounding text, form, buttons, arrows, or the floating white label. Output just the photo, edge-to-edge, portrait 3:4 aspect ratio, no rounded corners baked in. Scene: warm inviting independent French florist shop/workshop, leafy green plants and flowers on wood shelves, soft daylight, shallow depth of field, creamy beige and muted natural greens. Subject: a realistic friendly young adult woman entrepreneur with brown hair in a loose high bun, wearing an off-white linen shirt with sleeves rolled and a dark blue denim apron with brown leather straps. She is seated behind a wooden shop counter, leaning her left cheek lightly on her left hand, smiling gently while looking down at an open silver laptop on the lower right. A white ceramic mug sits lower center-left, blurred pink flowers and green leaves in the near lower left foreground. Framing match reference: woman centered slightly right, waist-up, head near the upper middle, enough lower space for the wooden counter, laptop partly cut off by the right edge. On the left background a narrow vertical charcoal chalkboard with a natural wood frame; handwritten white chalk text exactly: 'Des projets qui font grandir votre région', broken into short lines, and a small hand-drawn heart beneath. Natural authentic skin, credible hands and fingers, subtle film grain, professional lifestyle photography, no glamour retouching, no watermark, no external UI.
```

## Composition

Grille de reference de 1580 px : contenu environ 574 px, photo environ 378 px, formulaire environ 558 px ; deux espaces de 34 px. Espacements, typographie, boutons, champs et annotations sont scopes avec `#estimateur` pour ne pas modifier les autres sections. La largeur s'adapte sur desktop ; sur tablette, contenu et photo occupent la premiere ligne et le formulaire la seconde ; sur mobile, les trois elements se suivent sans supprimer la photo. Les annotations exterieures sont masquees quand la marge disponible ne permet plus de les conserver sans debordement.

Les styles du bloc prennent en charge la classe `.dark` utilisee par le site. Le probleme de mode sombre du mega menu et des galeries expertise, signale avant cette demande, n'est pas modifie dans ce lot.

Pas de nouveau test ni de nouvelle publication effectues pour ce bloc a ce stade.

## Controle de livraison 1.06.a

Build et 50 tests expertise reussis. Controle navigateur du bloc a 2079, 1440, 768 et 375 px : photo et formulaire affiches, aucun debordement horizontal. Correction du mode sombre du menu et des galeries autorisee puis appliquee. Aucun envoi de formulaire reel pendant le controle.

