import Link from 'next/link'
import { ArrowUpRight, Eye, MapPin, PhoneCall, TrendingUp, UsersRound } from 'lucide-react'
import { DeferredSearchDemo } from './home/DeferredSearchDemo'

const benefits = [
  { label: 'Référencement local', icon: MapPin },
  { label: 'Plus de visibilité', icon: Eye },
  { label: 'Trafic qualifié', icon: UsersRound },
  { label: 'Plus de demandes', icon: PhoneCall },
  { label: 'Résultats durables', icon: TrendingUp },
]

export function BentoFeatures() {
  return (
    <section id="positionnement-google" className="editorial-section seo-positioning-section">
      <div className="editorial-container seo-positioning-grid">
        <div className="seo-positioning-copy">
          <p className="editorial-eyebrow seo-positioning-eyebrow">
            <span aria-hidden="true" />
            02 — Une agence qui vous positionne
          </p>
          <h2 className="home-section-title">
            Votre place sur Google
            <br />
            <span>ne doit rien au hasard.</span>
          </h2>
          <p className="seo-positioning-intro">
            Nous concevons des sites rapides, bien structurés et travaillés
            pour le référencement local afin de faire ressortir votre
            entreprise sur les recherches qui comptent.
          </p>

          <ul className="seo-benefits" aria-label="Bénéfices du référencement local">
            {benefits.map(({ label, icon: Icon }) => (
              <li key={label}>
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <Link className="site-cta-primary seo-positioning-cta" href="/contact?objet=seo">
            Échanger sur votre visibilité
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <DeferredSearchDemo />
      </div>
    </section>
  )
}
