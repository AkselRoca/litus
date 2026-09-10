# Sources des logos automatisation, création et IA

Vérification et téléchargement : 10 septembre 2026. Recherche préalable dans `public/brands` : aucun actif existant pour ces cinq outils. Les fichiers ajoutés utilisent les dessins d’origine des marques, sans génération ni tracé approximatif.

| Nom affiché | Fichier local | Format / dimensions | Source officielle et préparation |
| --- | --- | --- | --- |
| n8n | `public/brands/n8n-official.svg` | SVG, `0 0 304 160` | [Guide officiel](https://n8n.io/brandguidelines/) et [kit ZIP](https://n8n.io/brandguidelines/n8n_logos.zip). Premier tracé du fichier `n8n_pink+black_logo.svg`, correspondant au symbole de nœuds rose `#EA4B71`. Coordonnées et couleur inchangées ; le `viewBox` entoure le symbole, et le nom reste un texte séparé. |
| Zapier | `public/brands/zapier-official.svg` | SVG, `0 0 150 150` | [Page presse](https://zapier.com/press), qui renvoie au [guide officiel de marque](https://brand.zapier.com/). [Planche SVG « App Icon »](https://firebasestorage.googleapis.com/v0/b/standards-site-beta.appspot.com/o/documents%2F279072ea39f%2F8fc2c38ae5f%2FApp%20Icon.svg?alt=media&token=282c3c58-da3a-4520-8105-087623697bdf). Extraction de la tuile de 150 px : rectangle orange `#FF4F00` et ses sept tracés de mot-symbole `#FFFDF9`, sans changement de coordonnées ou de couleurs. Les autres tailles et légendes de la planche sont omises. |
| Webflow | `public/brands/webflow-official.svg` | SVG, `0 0 1080 674` | [Ressources officielles](https://brand.webflow.com/brand-assets), rubrique « Mark / Blue ». [SVG original](https://dhygzobemt712.cloudfront.net/Mark/Mark_Logo_Blue.svg), copié sans modification. Bleu officiel `#146EF5`. |
| OpenAI | `public/brands/openai-official.svg` | SVG, `0 0 721 721` | [Guide officiel](https://openai.com/brand/) et [kit de logos 2025](https://cdn.openai.com/brand/OpenAI-Logos-2025.zip). Fichier original `OpenAI-logos(new)/SVGs/OpenAI-black-monoblossom.svg`, copié sans modification, y compris son espace libre intérieur. Le masque monochrome déjà présent dans le bandeau suit `var(--ink)` pour rester visible dans les deux thèmes. |
| Claude | `public/brands/claude-official.png` | PNG RGBA, 32 × 32 | [Site officiel Claude](https://claude.com/), balise `link[rel="icon"]`. [Favicon PNG original](https://cdn.sanity.io/images/4zrzovbb/claude-com/369b14e80ac643cc09dccd581ccb91f82b559190-32x32.png), copié sans modification. Étoile orange sur fond transparent ; conservation du format natif. |

## Choix de présentation

- Le guide Zapier actuel emploie le mot-symbole souligné et l’icône orange avec le nom blanc. L’actif retenu reflète cette identité actuelle ; il ne provient pas d’une ancienne bibliothèque de l’astérisque.
- Les images gardent leur ratio dans la boîte existante de 26 × 26 px, avec le nom lisible à côté. Aucun filtre de teinte n’est ajouté aux logos en couleur. La seconde liste du défilement reste masquée aux technologies d’assistance.
- L’entrée autonome `Google` est retirée du catalogue. `Google Workspace`, `Gemini` et `Google Ads` restent présents, avec tous les autres outils existants. Aucun ancien fichier de logo n’est supprimé.
- Catalogue final : 25 noms uniques — Next.js, React, TypeScript, Tailwind, Framer, Vercel, Stripe, Shopify, WordPress, Google Workspace, Gemini, Google Ads, Meta Ads, Make, Notion, Brevo, HubSpot, Airtable, Microsoft 365, Microsoft Copilot, n8n, Zapier, Webflow, OpenAI, Claude.

## Vérification

- Quatre SVG analysés en XML et rendus avec Sharp ; aucun script, gestionnaire JavaScript, `foreignObject`, image externe ou variable CSS non résolue dans les fichiers.
- PNG Claude décodé avec succès ; canal alpha conservé.
- Planche de contrôle à 26 × 26 px inspectée sur fond blanc et `#111111`, avec le traitement monochrome OpenAI des deux thèmes. Aucun étirement ni découpage du dessin.
- Contrôle du catalogue : 25 entrées, 25 noms uniques, les 20 outils conservés et les 5 ajouts présents ; `Google` seul absent.
- `npx eslint src/components/sections/LogoCloud.tsx` : réussite.

Les marques et logos restent la propriété de leurs titulaires. Le bandeau les identifie comme outils de travail de Litus.
