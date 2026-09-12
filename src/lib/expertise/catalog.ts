import type { ExpertiseSlug, ExpertiseTool } from './types'

export const expertiseTools: ExpertiseTool[] = [
  { slug: 'python', name: 'Python', logo: '/brands/color/python.svg', category: 'Données & automatisation', summary: 'Traiter des fichiers, relier des API et automatiser des opérations avec des erreurs et des reprises maîtrisées.' },
  { slug: 'csharp', name: 'C#', logo: '/brands/color/csharp.svg', category: 'Applications & logiciels', summary: 'Écrire les règles métier de vos outils internes, reprendre un logiciel et relier vos systèmes existants.' },
  { slug: 'dotnet', name: '.NET', logo: '/brands/color/dotnet.svg', category: 'API & services métier', summary: 'Construire des API ASP.NET Core, moderniser une application et préparer son déploiement et son exploitation.' },
  { slug: 'labview', name: 'LabVIEW', logo: '/brands/color/labview.png', category: 'Acquisition & mesure', summary: 'Développer des interfaces opérateur, reprendre des VIs et organiser les mesures selon votre matériel et votre protocole.' },
  { slug: 'nextjs', name: 'Next.js', logo: '/brands/color/nextdotjs.svg', category: 'Sites & applications', summary: 'Rendu serveur, CMS, migration et SEO technique : une base React adaptée à vos parcours.' },
  { slug: 'react', name: 'React', logo: '/brands/color/react.svg', category: 'Interfaces & applications', summary: 'Créer une interface métier, reprendre des composants ou comprendre ce qui ralentit un écran.' },
  { slug: 'typescript', name: 'TypeScript', logo: '/brands/color/typescript.svg', category: 'Fiabilité & maintenance', summary: 'Migrer du JavaScript, clarifier les échanges de données et rendre les évolutions moins fragiles.' },
  { slug: 'tailwind', name: 'Tailwind CSS', logo: '/brands/color/tailwindcss.svg', category: 'Design & intégration', summary: 'Transformer une maquette en composants cohérents, accessibles et adaptés à chaque écran.' },
  { slug: 'framer', name: 'Framer', logo: '/brands/color/framer.svg', category: 'Sites & acquisition', summary: 'Lancer un site de marque, structurer son CMS et relier ses formulaires à votre activité.' },
  { slug: 'vercel', name: 'Vercel', logo: '/brands/color/vercel.svg', category: 'Infrastructure & déploiement', summary: 'Mettre en production, résoudre un build, configurer les domaines et suivre les coûts réels.' },
  { slug: 'stripe', name: 'Stripe', logo: '/brands/color/stripe.svg', category: 'Paiements & automatisation', summary: 'Relier paiements, abonnements, comptes clients et CRM, sans traiter vous-même les cartes.' },
  { slug: 'shopify', name: 'Shopify', logo: '/brands/color/shopify.svg', category: 'Commerce & acquisition', summary: 'Créer ou reprendre une boutique : catalogue, thème, commandes, tracking et connexions métier.' },
  { slug: 'wordpress', name: 'WordPress', logo: '/brands/color/wordpress.svg', category: 'Sites & maintenance', summary: 'Refondre, dépanner et entretenir un site existant, de son formulaire à son hébergement.' },
]

export const expertisePath = (slug: ExpertiseSlug) => `/expertise/${slug}`
export const expertiseContact = (name: string) => `/contact?objet=${encodeURIComponent(`Expertise ${name}`)}`
export function expertiseTool(slug: ExpertiseSlug) {
  return expertiseTools.find(tool => tool.slug === slug)!
}
