import {
  AppWindow, BarChart3, BrainCircuit, Code2, FileChartColumn, Monitor,
  RefreshCw, Search, ShoppingBag, Store, Target, Unplug, Workflow,
  type LucideIcon,
} from 'lucide-react'

export type ExpertiseLink = {
  label: string
  description: string
  href: string
  icon: LucideIcon
}

/** The desktop and mobile menus use these same, verified destinations. */
export const expertiseGroups: { id: string; title: string; description: string; items: ExpertiseLink[] }[] = [
  {
    id: 'web', title: 'Web & e-commerce', description: 'Présenter votre offre, faciliter le contact.',
    items: [
      { label: 'Création de site internet', description: 'Un site clair, rapide et pensé pour vos clients.', href: '/creation-site-internet', icon: Monitor },
      { label: 'E-commerce', description: 'Une boutique simple à acheter, simple à piloter.', href: '/creation-site-ecommerce', icon: ShoppingBag },
      { label: 'Landing pages', description: 'Des pages ciblées pour transformer vos visites.', href: '/creation-landing-page', icon: FileChartColumn },
      { label: 'Refonte de site', description: 'Faire évoluer votre image et vos performances.', href: '/refonte-site-internet', icon: RefreshCw },
    ],
  },
  {
    id: 'acquisition', title: 'Acquisition & visibilité', description: 'Être trouvé par les bons clients.',
    items: [
      { label: 'Référencement naturel SEO', description: 'Des contenus et un site visibles sur Google.', href: '/referencement-naturel', icon: Search },
      { label: 'Google Ads', description: 'Des campagnes ciblées sur vos objectifs.', href: '/google-ads', icon: BarChart3 },
      { label: 'SEO local', description: 'Renforcer votre présence dans votre secteur.', href: '/seo-local', icon: Target },
      { label: 'Google Business Profile', description: 'Une fiche utile, complète et bien entretenue.', href: '/google-business-profile', icon: Store },
    ],
  },
  {
    id: 'development', title: 'Développement & IA', description: 'Des outils adaptés à votre façon de travailler.',
    items: [
      { label: 'Application web sur mesure', description: 'CRM, espace client et logiciel métier.', href: '/creation-application-web', icon: AppWindow },
      { label: 'Développement web sur mesure', description: 'Des fonctionnalités propres à votre activité.', href: '/developpement-web-sur-mesure', icon: Code2 },
      { label: 'Intégrations & API', description: 'Relier vos logiciels et faire circuler vos données.', href: '/integrations-api', icon: Unplug },
      { label: 'Automatisation', description: 'Simplifier les tâches qui se répètent.', href: '/automatisation', icon: Workflow },
      { label: 'Création d’outils IA', description: 'Des assistants utiles à vos équipes au quotidien.', href: '/creation-outils-ia', icon: BrainCircuit },
    ],
  },
]

export function isExpertisePath(pathname: string): boolean {
  return expertiseGroups.some(group => group.items.some(({ href }) => {
    const route = href.split('#')[0]
    return pathname === route || pathname.startsWith(`${route}/`)
  }))
}
