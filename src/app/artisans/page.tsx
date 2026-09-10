import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArtisansHero } from './_components/ArtisansHero'
import { ArtisansStats } from './_components/ArtisansStats'
import { ArtisansPainPoints } from './_components/ArtisansPainPoints'
import { ArtisansTrades } from './_components/ArtisansTrades'
import { ArtisansSolutions } from './_components/ArtisansSolutions'
import { ArtisansMethod } from './_components/ArtisansMethod'
import { ArtisansConversion } from './_components/ArtisansConversion'
import './artisans.css'

export const metadata: Metadata = {
  title: { absolute: 'Agence web pour artisans à Lorient et au Mans | Litus Agency' },
  description: 'Création de site internet pour artisan, Google Ads et référencement local à Lorient et au Mans. Des outils adaptés à votre métier pour recevoir vos demandes de contact.',
  alternates: { canonical: '/artisans' },
  openGraph: {
    title: 'Des solutions web pensées pour les artisans | Litus Agency',
    description: 'Site internet, Google Ads, référencement local et suivi des demandes : un accompagnement concret dans le Morbihan et la Sarthe.',
    url: '/artisans',
  },
}

export default function ArtisansPage() {
  return <div className="artisans-page">
    <ArtisansHero />
    <div className="art-content">
      <ArtisansStats />
      <ArtisansPainPoints />
      <ArtisansTrades />
      <ArtisansSolutions />
      <section className="art-section art-method-section" id="methode-artisans" aria-labelledby="art-method-title">
        <div className="art-container">
          <div className="art-section-heading art-heading-row">
            <div><p className="art-kicker">Notre méthode</p><h2 id="art-method-title">Une méthode <em>simple et efficace.</em></h2></div>
            <Link href="/contact" className="site-cta-secondary">Échanger sur votre projet<ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <ArtisansMethod />
        </div>
      </section>
      <ArtisansConversion />
    </div>
  </div>
}
