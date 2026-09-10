import { MapPin, Phone, UsersRound } from 'lucide-react'
import { ServiceHero } from '@/components/sections/services/ServiceHero'
import { ArtisansHeroDemo } from './ArtisansHeroDemo'

export function ArtisansHero() {
  return <ServiceHero
    id="artisans-title"
    eyebrow="Pour les artisans · Lorient & Le Mans"
    title={'Arrêtez de courir après les chantiers.\nLaissez-les venir à vous.'}
    accent="Laissez-les venir à vous."
    description="Création de site internet pour artisan, Google Ads, référencement local et suivi des demandes de contact : nous construisons votre présence en ligne. Vous vous concentrez sur votre métier, nous vous accompagnons sur le web."
    primaryAction={{ label: 'Obtenir mon devis gratuit', href: '/contact' }}
    secondaryAction={{ label: 'Voir nos solutions', href: '#solutions-artisans' }}
    visualBackground="/artisans/atelier-bois.webp"
    visual={<ArtisansHeroDemo />}
    proof={<ul className="art-hero-proof">
      <li><MapPin aria-hidden="true" /><span>Pensé pour votre secteur</span></li>
      <li><Phone aria-hidden="true" /><span>Des contacts directs</span></li>
      <li><UsersRound aria-hidden="true" /><span>Une équipe à vos côtés</span></li>
    </ul>}
  />
}
