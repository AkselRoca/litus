import { ChartNoAxesCombined, ClipboardCheck, UsersRound, type LucideIcon } from 'lucide-react'
import { ServiceHero } from '@/components/sections/services/ServiceHero'
import { SolutionsHeroDemo } from './SolutionsHeroDemo'
import './solutions-hero.css'

export type SolutionAudience = 'pme' | 'grands-comptes' | 'collectivites'

interface SolutionHeroContent {
  eyebrow: string
  title: string
  accent: string
  description: string
  assurances: readonly [string, string, string]
}

const content: Record<SolutionAudience, SolutionHeroContent> = {
  pme: {
    eyebrow: 'Pour les PME · Lorient & Le Mans',
    title: 'Votre entreprise a besoin de visibilité.\nFaites-la grandir en ligne.',
    accent: 'Faites-la grandir en ligne.',
    description: 'Site sur mesure ou refonte, SEO et Google Ads : nous construisons une présence web qui valorise votre expertise et attire des prospects qualifiés. Une stratégie adaptée à votre PME, un suivi clair et une équipe à vos côtés.',
    assurances: ['Pensé pour votre PME', 'Un suivi des demandes', 'Une équipe à vos côtés'],
  },
  'grands-comptes': {
    eyebrow: 'Pour les grands comptes & ETI',
    title: 'Votre groupe a de grandes ambitions.\nDonnons-leur vie en ligne.',
    accent: 'Donnons-leur vie en ligne.',
    description: 'Refonte corporate, sites sur mesure, SEO et Google Ads : nous relions votre présence web à vos objectifs d’acquisition. Un projet cadré avec vos équipes, des outils connectés et un accompagnement adapté à votre organisation.',
    assurances: ['Un projet structuré', 'Des objectifs suivis', 'Un interlocuteur dédié'],
  },
  collectivites: {
    eyebrow: 'Pour les collectivités & acteurs publics',
    title: 'Votre territoire mérite un site utile.\nPlus proche de ses habitants.',
    accent: 'Plus proche de ses habitants.',
    description: 'Site institutionnel, refonte et services en ligne : nous rendons votre information plus claire et plus facile à trouver sur Google. Une présence web au service de vos usagers, du travail de vos agents et des projets de votre territoire.',
    assurances: ['Pensé pour les usagers', 'Un projet suivi ensemble', 'Une équipe de proximité'],
  },
}

const assuranceIcons: readonly LucideIcon[] = [ClipboardCheck, ChartNoAxesCombined, UsersRound]

/** The Artisans layout is kept in ServiceHero; only audience content changes here. */
export function SolutionsHero({ audience }: { audience: SolutionAudience }) {
  const hero = content[audience]

  return <div className="solutions-hero" data-audience={audience}>
    <ServiceHero
      id={`${audience}-title`}
      eyebrow={hero.eyebrow}
      title={hero.title}
      accent={hero.accent}
      description={hero.description.replace(/ ([;:!?])/g, '\u00a0$1')}
      primaryAction={{ label: 'Parlons de votre projet', href: '/contact' }}
      secondaryAction={{ label: 'Voir nos réalisations', href: '/realisations' }}
      visualBackground="/blog/photos/bureau-reunion-clair.webp"
      visual={<SolutionsHeroDemo variant={audience} />}
      proof={<ul className="solutions-hero-proof">
        {hero.assurances.map((assurance, index) => {
          const Icon = assuranceIcons[index]
          return <li key={assurance}><Icon aria-hidden="true" /><span>{assurance}</span></li>
        })}
      </ul>}
    />
  </div>
}
