import { AppWindow, Code2, Gauge, Monitor, PanelsTopLeft, Server, ShoppingBag, Workflow, UsersRound, BrainCircuit } from 'lucide-react'
import type { ExpertiseSlug } from './types'

export const aiPillars = ['openai', 'codex', 'claude', 'n8n'] as const satisfies readonly ExpertiseSlug[]
export const expertiseCategories: { id: string; label: string; description: string; icon: typeof Monitor; tools: ExpertiseSlug[]; href: string; action: string }[] = [
  { id: 'web', label: 'Sites web & e-commerce', description: 'Présenter, convaincre et vendre.', icon: Monitor, tools: ['shopify', 'wordpress', 'framer', 'webflow', 'nextjs'], href: '/creation-site-internet', action: 'Créer votre site internet' },
  { id: 'acquisition', label: 'Acquisition & visibilité', description: 'Relier les campagnes aux demandes utiles.', icon: Gauge, tools: ['google-ads', 'meta-ads', 'brevo', 'hubspot', 'wordpress', 'shopify'], href: '/referencement-naturel', action: 'Développer votre visibilité' },
  { id: 'development', label: 'Développement & data', description: 'Des interfaces, API et traitements dédiés.', icon: Code2, tools: ['react', 'nextjs', 'typescript', 'tailwind', 'python', 'dotnet', 'csharp'], href: '/developpement-web-sur-mesure', action: 'Cadrer votre développement' },
  { id: 'software', label: 'Applications & ingénierie', description: 'Logiciels métier, acquisition et mesure.', icon: AppWindow, tools: ['csharp', 'dotnet', 'labview', 'react', 'python'], href: '/creation-application-web', action: 'Concevoir votre application' },
  { id: 'automation', label: 'Automatisation & IA', description: 'Assistants métier, agents et workflows supervisés.', icon: BrainCircuit, tools: [...aiPillars], href: '/creation-outils-ia', action: 'Cadrer votre assistant ou agent IA' },
  { id: 'workflows', label: 'Connexions & workflows', description: 'Relier formulaires, CRM et outils quotidiens.', icon: Workflow, tools: ['n8n', 'make', 'zapier', 'hubspot', 'brevo'], href: '/automatisation', action: 'Automatiser une opération' },
  { id: 'infra', label: 'Infrastructure & déploiement', description: 'Préparer la livraison et l’exploitation.', icon: Server, tools: ['vercel', 'nextjs', 'dotnet'], href: '/integrations-api', action: 'Relier vos environnements' },
  { id: 'payment', label: 'Paiement & e-commerce', description: 'Du catalogue au suivi de la commande.', icon: ShoppingBag, tools: ['shopify', 'stripe', 'wordpress'], href: '/creation-site-ecommerce', action: 'Construire votre boutique' },
  { id: 'cms', label: 'CMS & outils no-code', description: 'Publier et structurer sans tout développer.', icon: PanelsTopLeft, tools: ['wordpress', 'framer', 'webflow', 'airtable', 'notion', 'shopify'], href: '/creation-site-internet', action: 'Choisir un site administrable' },
  { id: 'collaboration', label: 'Collaboration & bureautique', description: 'Organiser les documents, les équipes et les données.', icon: UsersRound, tools: ['google-workspace', 'microsoft-365', 'notion', 'airtable', 'gemini', 'microsoft-copilot'], href: '/integrations-api', action: 'Relier vos outils de travail' },
]
