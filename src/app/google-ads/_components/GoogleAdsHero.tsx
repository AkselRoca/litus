import { ChartNoAxesCombined, SlidersHorizontal, Target } from 'lucide-react'
import { ServiceHero } from '@/components/sections/services/ServiceHero'
import { GoogleAdsSearchDemo } from './GoogleAdsSearchDemo'

export function GoogleAdsHero() {
  return <ServiceHero
    id="google-ads-title"
    eyebrow="Litus · Agence Google Ads · Lorient & Le Mans"
    title={'Agence Google Ads :\nvos futurs clients\nvous cherchent déjà.'}
    accent="vous cherchent déjà."
    description="Création et gestion de campagnes Google Ads à Lorient et au Mans. Nous ciblons les recherches liées à votre activité pour transformer l’intérêt de vos futurs clients en prises de contact."
    primaryAction={{ label: 'Obtenir plus de clients', href: '#google-ads-contact' }}
    secondaryAction={{ label: 'Voir nos réalisations', href: '/realisations' }}
    proof={<ul className="gad-hero-reassurance">
      <li><Target aria-hidden="true" /><span><strong>Campagnes sur mesure</strong><small>Selon votre activité</small></span></li>
      <li><ChartNoAxesCombined aria-hidden="true" /><span><strong>Suivi transparent</strong><small>Des indicateurs utiles</small></span></li>
      <li><SlidersHorizontal aria-hidden="true" /><span><strong>Budget maîtrisé</strong><small>Des choix faits ensemble</small></span></li>
    </ul>}
    visual={<GoogleAdsSearchDemo />}
  />
}
