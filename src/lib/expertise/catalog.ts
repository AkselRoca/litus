import type { ExpertiseSlug, ExpertiseTool } from './types'

export const expertiseTools: ExpertiseTool[] = [
  { slug: 'react', name: 'React', logo: '/brands/react.svg', category: 'Interfaces & applications', summary: 'Créer une interface métier, reprendre des composants ou comprendre ce qui ralentit un écran.' },
  { slug: 'typescript', name: 'TypeScript', logo: '/brands/typescript.svg', category: 'Fiabilité & maintenance', summary: 'Migrer du JavaScript, clarifier les échanges de données et rendre les évolutions moins fragiles.' },
  { slug: 'tailwind', name: 'Tailwind CSS', logo: '/brands/tailwindcss.svg', category: 'Design & intégration', summary: 'Transformer une maquette en composants cohérents, accessibles et adaptés à chaque écran.' },
  { slug: 'framer', name: 'Framer', logo: '/brands/framer.svg', category: 'Sites & acquisition', summary: 'Lancer un site de marque, structurer son CMS et relier ses formulaires à votre activité.' },
  { slug: 'vercel', name: 'Vercel', logo: '/brands/vercel.svg', category: 'Infrastructure & déploiement', summary: 'Mettre en production, résoudre un build, configurer les domaines et suivre les coûts réels.' },
  { slug: 'stripe', name: 'Stripe', logo: '/brands/stripe.svg', category: 'Paiements & automatisation', summary: 'Relier paiements, abonnements, comptes clients et CRM, sans traiter vous-même les cartes.' },
  { slug: 'shopify', name: 'Shopify', logo: '/brands/shopify.svg', category: 'Commerce & acquisition', summary: 'Créer ou reprendre une boutique : catalogue, thème, commandes, tracking et connexions métier.' },
  { slug: 'wordpress', name: 'WordPress', logo: '/brands/wordpress.svg', category: 'Sites & maintenance', summary: 'Refondre, dépanner et entretenir un site existant, de son formulaire à son hébergement.' },
]

export const expertisePath = (slug: ExpertiseSlug) => `/expertise/${slug}`
export const expertiseContact = (name: string) => `/contact?objet=${encodeURIComponent(`Expertise ${name}`)}`
export function expertiseTool(slug: ExpertiseSlug) {
  return expertiseTools.find(tool => tool.slug === slug)!
}
