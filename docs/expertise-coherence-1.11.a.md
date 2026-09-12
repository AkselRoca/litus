# Build 1.11.a - Catalogue des outils et expertises

## Perimetre

- Conservation des 13 pages existantes et ajout de 17 pages : Google Workspace, Gemini, Google Ads (tracking et API), Meta Ads, Make, Notion, Brevo, HubSpot, Airtable, Microsoft 365, Microsoft Copilot, n8n, Zapier, Webflow, ChatGPT / OpenAI, Claude / Anthropic, OpenAI Codex.
- 26 outils dans le bandeau home, chacun lie a une page. Les quatre pages techniques Python, C#, .NET et LabVIEW restent accessibles dans le hub, le menu et leurs categories.
- 30 pages au total, un annuaire serveur complet et 10 univers. Aucun besoin de cliquer sur un filtre pour que les liens soient presents dans le HTML du hub.
- Automatisation & IA : quatre piliers visuels, OpenAI, Codex, Claude et n8n. Les langages et LabVIEW sont classes en developpement/data ou applications/ingenierie.
- La page service Google Ads reste centree sur l'accompagnement des campagnes. `/expertise/google-ads` traite les evenements, conversions, reporting et connexions CRM.

## Sources et identites

Les references officielles sont renseignees sur chaque page. La documentation OpenAI, Anthropic, Google, Microsoft, n8n et des outils concernes sert a verifier le role des produits, pas a copier leur argumentaire. Aucune version de modele, garantie de resultat, certification ou affiliation n'est inventee.

Les logos officiels deja presents dans `public/brands` sont reutilises localement, sans masque monochrome ni recoloration. Codex est identifie par le signe officiel OpenAI et son nom complet ; aucun faux pictogramme Codex n'est dessine. Les couleurs decoratives restent secondaires a la DA Litus.

Les 34 nouveaux visuels sont des schemas et maquettes pedagogiques originaux, pas des captures des interfaces editeurs ni des references clients. Sept traitements graphiques : assistant, revue de code, documents, parcours publicitaire, editeur, workflow et tableau d'equipe. Legendes explicites, ALT descriptifs, dimensions fixes, WebP, miniatures et 17 images Open Graph dediees.

## Maintenance

- `types.ts` definit les slugs autorises.
- `catalog.ts` expose les outils et la liste home ; le bandeau et le menu ne maintiennent plus leurs propres correspondances par nom.
- `categories.ts` definit les univers et les quatre piliers IA.
- `connected-definitions.ts` et `connected-business.ts` portent les nouvelles fiches editoriales. Les cas, FAQ, limites, connexions et sources sont propres a chaque outil.
- `content-connected.ts` conserve les gabarits de la DA actuelle et leur donne les sections editoriales.
- `npx tsx scripts/generate-connected-expertise.ts` regenere les visuels et les donnees compactes du catalogue apres une modification des definitions. Ces sorties sont versionnees.
- Le sitemap prend les pages generees par Next.js : plus de liste parallele limitee aux anciens slugs.
- Tests cibles : `npx vitest run src/lib/expertise/expertise.test.ts src/lib/expertise/visuals.test.ts src/lib/expertise/coherence.test.ts`.

Le controle porte sur les correspondances, contenus, liens internes, metadonnees, schemas et ressources locales. Les illustrations ne simulent pas l'execution reelle d'une IA ni un acces a des donnees d'entreprise.
