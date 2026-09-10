import { MapPin, ShieldCheck, UsersRound, Zap } from 'lucide-react'
import { ServiceHero } from '@/components/sections/services/ServiceHero'
import { SiteBuilderDemo } from './SiteBuilderDemo'
import './sites-vitrine-hero.css'

const benefits = [
  { icon: Zap, title: 'Sites ultra-rapides', text: 'Une expérience fluide qui convertit davantage de visiteurs en clients.' },
  { icon: ShieldCheck, title: 'Optimisés pour Google', text: 'Un référencement naturel solide pour une visibilité durable.' },
  { icon: UsersRound, title: 'Un accompagnement humain', text: 'Une équipe réactive, à l’écoute de vos objectifs, du début à la fin.' },
]

export function SitesVitrineHero() {
  return (
    <ServiceHero
      id="vitrine-title"
      title="Des sites vitrines qui donnent une vraie longueur d’avance."
      accent="."
      description="Un design premium, une expérience pensée pour vos clients, une performance qui fait la différence. Nous créons des sites web esthétiques, rapides et optimisés pour Google."
      primaryAction={{ label: 'Parlons de votre projet', href: '/contact' }}
      secondaryAction={{ label: 'Voir nos réalisations', href: '/realisations' }}
      proof={<><MapPin size={23} aria-hidden="true" /><p><strong>Votre équipe, à Lorient & au Mans</strong><span>Du premier échange à la mise en ligne.</span></p></>}
      visual={<SiteBuilderDemo />}
      visualBackground="/site-builder-studio.webp"
      benefits={benefits.map(({ icon: Icon, title, text }) => ({
        icon: <Icon aria-hidden="true" />,
        title,
        description: text,
      }))}
    />
  )
}
