import { CreditCard, ShoppingBag, Smartphone, UsersRound } from 'lucide-react'
import { ServiceHero } from '@/components/sections/services/ServiceHero'
import { EcommerceBuilderDemo } from './EcommerceBuilderDemo'
import '../../creation-site-internet/_components/sites-vitrine-hero.css'
import './ecommerce-hero.css'

const benefits = [
  { icon: ShoppingBag, title: 'Pensées pour vendre', text: 'Des fiches produits soignées et un parcours d’achat sans détour.' },
  { icon: CreditCard, title: 'Des paiements sécurisés', text: 'Une commande simple, qui inspire confiance à vos clients.' },
  { icon: Smartphone, title: 'Fluides sur tous les écrans', text: 'Une expérience d’achat aussi agréable sur mobile que sur ordinateur.' },
]

export function EcommerceHero() {
  return (
    <ServiceHero
      id="commerce-title"
      title="Des boutiques en ligne qui donnent envie d’acheter."
      accent="."
      description="Vos produits méritent une boutique à leur hauteur. Un design soigné, un parcours d’achat fluide et des paiements sécurisés : nous créons des sites e-commerce pensés pour transformer vos visiteurs en clients."
      primaryAction={{ label: 'Parlons de votre projet', href: '/contact' }}
      secondaryAction={{ label: 'Voir nos réalisations', href: '/realisations' }}
      proof={<><UsersRound size={23} aria-hidden="true" /><p><strong>Shopify, WooCommerce & boutiques sur mesure</strong><span>Une équipe à vos côtés, du catalogue à la première vente.</span></p></>}
      visual={<EcommerceBuilderDemo />}
      visualBackground="/site-builder-studio.webp"
      benefits={benefits.map(({ icon: Icon, title, text }) => ({
        icon: <Icon aria-hidden="true" />,
        title,
        description: text,
      }))}
    />
  )
}
