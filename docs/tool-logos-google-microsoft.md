# Sources des logos Google et Microsoft

Vérification et téléchargement : 10 septembre 2026. Ces cinq fichiers proviennent des serveurs officiels Google ou Microsoft. Aucun symbole n’a été généré, redessiné, vectorisé, recoloré ou reconstruit. Seul leur nom de fichier local a été choisi pour le site. Les couleurs et les proportions d’origine sont conservées.

| Produit affiché | Fichier local | Format et dimensions | Source officielle |
| --- | --- | --- | --- |
| Google Workspace | `public/brands/google-workspace.png` | PNG transparent, 96 × 96 | [Google Workspace](https://workspace.google.com/) utilise le G Google en dégradé comme petite marque de site. [Fichier téléchargé](https://www.gstatic.com/images/branding/googleg_gradient/2x/googleg_gradient_standard_48dp.png). |
| Gemini | `public/brands/gemini.png` | PNG transparent, 192 × 192 | [Google Workspace](https://workspace.google.com/) référence exactement ce fichier pour son entrée « Application Gemini ». [Fichier téléchargé](https://www.gstatic.com/images/branding/productlogos/gemini_2025/v1/web-96dp/logo_gemini_2025_color_2x_web_96dp.png). |
| Google Ads | `public/brands/google-ads.svg` | SVG, `viewBox="0 0 192 192"` | [Documentation Google Ads API](https://developers.google.com/google-ads/api/docs/get-started/introduction), image d’en-tête `devsite-product-logo`. [Fichier téléchargé](https://developers.google.com/static/ads/images/ads_192px_clr.svg). |
| Microsoft 365 | `public/brands/microsoft-365.svg` | SVG, `viewBox="0 0 21 21"` | Symbole Microsoft officiel disponible dans [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-branding-in-apps). [Fichier téléchargé](https://learn.microsoft.com/en-us/entra/identity-platform/media/howto-add-branding-in-apps/ms-symbollockup_mssymbol_19.svg). La page [Microsoft 365 Adoption](https://adoption.microsoft.com/en-us/microsoft-365/) utilise également le symbole Microsoft pour la suite. |
| Microsoft Copilot | `public/brands/microsoft-copilot.png` | PNG transparent, 438 × 438 | [Microsoft Copilot Adoption](https://adoption.microsoft.com/en-us/copilot/) : marque principale « Microsoft Copilot logo », mise à jour août 2026. [PNG officiel téléchargé](https://adoption.microsoft.com/wp-content/uploads/2026/08/icon-microsoft-copilot.png), dont la page sert aussi une [version WebP](https://adoption.microsoft.com/wp-content/uploads/webp/2026/08/icon-microsoft-copilot.png.webp). |

## Choix de marque

- Google Workspace : le G est la marque Google employée comme favicon sur le site officiel ; ce n’est pas une icône exclusive à Workspace. Le nom « Google Workspace » doit rester lisible à côté. La page référence la [version 20 px](https://www.gstatic.com/images/branding/googleg_gradient/1x/googleg_gradient_standard_20dp.png) ; le fichier local est la variante officielle du même actif en 48 dp × 2, vérifiée disponible sur le CDN Google, pour un affichage net sur écran dense.
- Gemini : le millésime `2025` dans l’URL ne signifie pas que le fichier est obsolète ; il est encore directement référencé par la page officielle actuelle. Il s’agit de l’étoile multicolore avec dégradé. Le PNG natif évite le gros bitmap encapsulé dans une autre variante SVG officielle.
- Microsoft 365 : la suite utilise un verrouillage de marque « Microsoft 365 » avec le symbole Microsoft à quatre couleurs, également présenté dans les [directives de marque Microsoft](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks). Le symbole SVG officiel associé au nom visible distingue la suite de Copilot. L’ancien pictogramme hexagonal de l’application Microsoft 365 n’a pas été retenu.
- Microsoft Copilot : la [documentation de support actuelle](https://support.microsoft.com/en-us/microsoft-365-copilot/what-is-microsoft-copilot-app) confirme que l’application auparavant appelée « Microsoft 365 Copilot app » s’appelle désormais « Microsoft Copilot app ». Le fichier d’août 2026 conserve le nouveau symbole sans l’ancienne surimpression « M365 ».

## Vérifications des fichiers

- Décodage des trois PNG réussi ; canal alpha présent sur chacun.
- Les deux SVG comportent des formes vectorielles autonomes, sans script, événement JavaScript, `foreignObject` ni ressource externe.
- Cadrage et couleurs des PNG examinés visuellement ; proportions d’origine conservées. Les SVG ont un `viewBox` carré adapté à une boîte d’icône de 24 à 26 px.
- Aucun filtre CSS de teinte ne doit être appliqué à ces fichiers. Garder un texte produit adjacent, et considérer l’image comme décorative lorsque ce texte fournit déjà le nom accessible.
- Les fichiers existants `google-color.svg` et `google.svg` n’ont pas été modifiés.
