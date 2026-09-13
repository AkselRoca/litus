import { Check } from 'lucide-react'
import { ServiceHero } from '@/components/sections/services/ServiceHero'
import { SolutionsHeroDemo } from '@/components/sections/solutions/SolutionsHeroDemo'
import '@/components/sections/solutions/solutions-hero.css'

export function CollectivitesHero() {
  return <div className="solutions-hero" data-audience="collectivites"><link rel="preload" as="image" href="/collectivites/place-publique-hotel-de-ville.webp" fetchPriority="high" /><ServiceHero
    id="collectivites-title"
    eyebrow="Pour les collectivités & acteurs publics"
    title={'Votre collectivité mérite un site utile.\nPlus proche de ses habitants.'}
    accent="Plus proche de ses habitants."
    description="Création et refonte de sites internet pour mairies, communes et intercommunalités. Des informations faciles à trouver, des démarches plus claires et des agents qui gardent la main sur leurs contenus."
    primaryAction={{ label: 'Parlons de votre territoire', href: '/contact' }}
    secondaryAction={{ label: 'Voir nos réalisations', href: '/realisations' }}
    visualBackground="/collectivites/place-publique-hotel-de-ville.webp"
    visual={<SolutionsHeroDemo variant="collectivites" />}
    proof={<ul className="solutions-hero-proof">{['Pensé pour les habitants', 'Conçu avec vos services', 'Une équipe de proximité'].map(label => <li key={label}><Check aria-hidden="true" />{label}</li>)}</ul>}
  /></div>
}
