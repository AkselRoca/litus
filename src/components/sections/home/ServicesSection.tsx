import Link from 'next/link'
import {
  Monitor,
  MapPin,
  ChartNoAxesColumnIncreasing,
  ShoppingBag,
  Layers,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import { Caveat } from 'next/font/google'
import './services-reference.css'

const handwriting = Caveat({ preload: false,
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})
const services = [
  {
    title: 'Sites vitrine',
    description:
      'Un site rapide et soigné pour présenter votre entreprise et faciliter les prises de contact.',
    price: 'À partir de 99 €/mois',
    href: '/creation-site-internet',
    icon: Monitor,
  },
  {
    title: 'Référencement local',
    description:
      'Une présence travaillée sur Google et Google Maps, pour être trouvé dans votre zone d’activité.',
    price: 'À partir de 99 €/mois',
    href: '/seo-local',
    icon: MapPin,
  },
  {
    title: 'Google Ads',
    description:
      'Des campagnes ciblées, un budget suivi et des résultats mesurés avec vous.',
    price: 'À partir de 129 €/mois',
    href: '/google-ads',
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    title: 'E-commerce',
    description:
      'Une boutique en ligne avec un parcours d’achat fluide et des paiements sécurisés.',
    price: 'Sur devis',
    href: '/creation-site-ecommerce',
    icon: ShoppingBag,
  },
  {
    title: 'Applications & outils métiers',
    description:
      'CRM, espaces membres, tableaux de bord : des logiciels adaptés à vos processus pour simplifier votre quotidien.',
    price: 'Sur devis',
    href: '/creation-application-web',
    icon: Layers,
  },
]
export function ServicesSection() {
  return (
    <section
      id="services"
      className="services-reference"
      aria-labelledby="services-title"
    >
      <div className="services-organic-top" aria-hidden="true" />
      <div className="services-reference-photo" aria-hidden="true" />
      <div className="services-organic-bottom" aria-hidden="true" />
      <div className="services-reference-container">
        <div className="services-reference-heading">
          <p className="services-reference-label">
            <span aria-hidden="true" />
            01 — NOS SERVICES
          </p>
          <div className="services-reference-intro">
            <h2 id="services-title" className="home-section-title">
              Le web, au service
              <br />
              de <span>votre activité.</span>
            </h2>
            <p>
              De votre premier site aux outils qui accompagnent votre
              développement,
              <br className="services-desktop-break" /> nous construisons ce
              dont vous avez besoin.
            </p>
          </div>
          <div
            className={'services-handnote ' + handwriting.className}
            aria-hidden="true"
          >
            <span>
              Des outils
              <br />
              pour faire grandir
              <br />
              votre activité
            </span>
            <svg viewBox="0 0 110 65" fill="none">
              <path
                d="M8 5C20 40 51 46 91 36M80 28l15 7-10 12"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="services-reference-list">
          {services.map(
            ({ title, description, price, href, icon: Icon }, i) => (
              <Link
                href={href}
                key={href}
                className={
                  'services-reference-card' +
                  (i === 0 ? ' services-reference-featured' : '')
                }
              >
                <span className="services-reference-number">0{i + 1}</span>
                <span className="services-reference-icon" aria-hidden="true">
                  <Icon size={28} strokeWidth={1.7} />
                </span>
                <h3>{title}</h3>
                <span
                  className="services-reference-divider"
                  aria-hidden="true"
                />
                <p className="services-reference-description">{description}</p>
                <span className="services-reference-price">{price}</span>
                <span className="services-reference-arrow" aria-hidden="true">
                  <ArrowRight size={20} strokeWidth={1.6} />
                </span>
              </Link>
            )
          )}
        </div>
        <div className="services-reference-bottom">
          <Link href="/contact" className="services-reference-cta">
            Discuter de votre projet{' '}
            <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" />
          </Link>
          <p className="services-reference-signature">
            <span aria-hidden="true" />
            Des projets utiles, durables, humains
          </p>
        </div>
      </div>
      <p className="services-margin-note" aria-hidden="true">
        Concevoir
        <br />
        aujourd’hui
        <br />
        demain
        <span />
      </p>
    </section>
  )
}
