import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Check,
  Euro,
  Layers3,
  Phone,
  ShieldCheck,
  Tag,
  TrendingUp,
  UsersRound,
} from 'lucide-react'
import { PricingContent } from '@/components/sections/PricingContent'
import { LeadMagnetSection } from '@/components/lead-magnets'
import './pricing.css'

export const metadata: Metadata = {
  title: 'Tarifs - Agence Web Transparente | Litus',
  description:
    'Site internet dès 99 €/mois, SEO dès 99 €/mois et gestion Google Ads à 129 €/mois. Choisissez votre besoin puis faites évoluer votre accompagnement Litus.',
  keywords: ['tarifs agence web', 'prix site internet', 'devis SEO', 'tarifs Google Ads'],
}

const heroBenefits = [
  { icon: Layers3, title: 'Des offres complètes', detail: 'Tout ce qu’il faut, en un seul pack' },
  { icon: Euro, title: 'Un tarif clair', detail: 'Aucun frais caché' },
  { icon: TrendingUp, title: 'Un accompagnement réel', detail: 'Une équipe à vos côtés' },
]

export default function PricingPage() {
  return (
    <div className="pricing-page">
      <section className="pricing-hero" aria-labelledby="pricing-title">
        <div className="pricing-hero-copy">
          <div className="pricing-hero-copy-inner">
            <p className="pricing-badge"><Tag aria-hidden="true" /> Tarifs transparents</p>
            <h1 id="pricing-title">Des prix clairs,<span>sans surprise</span></h1>
            <p className="pricing-hero-intro">
              Choisissez la formule adaptée à vos besoins. Pas de frais cachés,
              pas d’engagement forcé. Des solutions concrètes pour développer
              votre visibilité en ligne.
            </p>
            <ul className="pricing-hero-benefits" aria-label="Nos engagements tarifaires">
              {heroBenefits.map(item => {
                const Icon = item.icon
                return (
                  <li key={item.title}>
                    <span className="pricing-benefit-icon"><Icon aria-hidden="true" /></span>
                    <span><strong>{item.title}</strong><small>{item.detail}</small></span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="pricing-hero-visual">
          <Image
            src="/pricing-litus-office.png"
            alt="Bureau de l’agence Litus avec un ordinateur, un carnet et un mug portant le logo"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <div className="pricing-result-card">
            <span><BarChart3 aria-hidden="true" /></span>
            <strong>+ 210 %</strong>
            <small>de trafic en moyenne<br />pour nos clients</small>
            <ArrowRight aria-hidden="true" />
          </div>
          <p className="pricing-photo-note">Des résultats concrets</p>
        </div>
      </section>

      <PricingContent />

      <section className="pricing-guide">
        <LeadMagnetSection
          magnetId="cahier-des-charges"
          heading="Un projet bien cadré, un budget mieux préparé"
          subheading="Préparez votre cahier des charges grâce à un parcours adapté à vos besoins. Recevez un document complet pour échanger avec Litus."
        />
      </section>

      <section className="pricing-contact" aria-labelledby="pricing-contact-title">
        <div>
          <p className="pricing-section-label">UN PROJET À CHIFFRER ?</p>
          <h2 id="pricing-contact-title">Parlons de ce dont vous avez vraiment besoin.</h2>
          <p>Un premier échange suffit pour clarifier le périmètre, le calendrier et le budget.</p>
        </div>
        <div className="pricing-contact-actions">
          <Link href="/contact" className="site-cta-primary">Demander un devis <ArrowRight aria-hidden="true" /></Link>
          <a href="tel:+33744985521" className="site-cta-secondary"><Phone aria-hidden="true" /> 07 44 98 55 21</a>
        </div>
      </section>

      <div className="pricing-trust-footer" aria-label="Engagements Litus">
        <span><ShieldCheck aria-hidden="true" /> Sans engagement</span>
        <span><UsersRound aria-hidden="true" /> Une équipe disponible</span>
        <span><BarChart3 aria-hidden="true" /> Des résultats mesurés</span>
        <span><Check aria-hidden="true" /> Un périmètre clair</span>
      </div>
    </div>
  )
}
