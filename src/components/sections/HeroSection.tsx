import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChartNoAxesColumnIncreasing } from 'lucide-react'
import { TerritoryScene } from './home/TerritoryScene'
import './home/territory-hero.css'

const clients = [
  { name: 'Demetis Immobilier', image: 'Demetis', url: 'https://www.Demetisimmo.fr/' },
  { name: 'Nos Travaux', image: 'nos-travaux', url: 'https://www.nos-travaux.fr/' },
  { name: 'Aspire Énergie', image: 'aspire', url: 'https://www.aspire-energie.com/' },
  { name: 'Prodis Environnement', image: 'prodis', url: 'https://www.prodis-environnement.com/' },
]

function HeroCurves() {
  return <svg className="territory-hero-curves" viewBox="0 0 1672 941" preserveAspectRatio="none" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="territory-navy" x1="1350" y1="80" x2="1200" y2="941" gradientUnits="userSpaceOnUse"><stop stopColor="#10283b" /><stop offset=".58" stopColor="#112739" /><stop offset="1" stopColor="#344a5b" /></linearGradient>
      <filter id="territory-edge-blur"><feGaussianBlur stdDeviation="28" /></filter>
    </defs>
    <path d="M1034 0C943 114 946 216 930 378C916 556 862 693 737 783C985 662 1259 815 1672 906V0Z" fill="url(#territory-navy)" />
    <path d="M1034-10C937 115 946 237 923 400C902 576 850 697 738 781" stroke="#f4a675" strokeWidth="25" opacity=".26" filter="url(#territory-edge-blur)" />
    <path d="M824 738C1110 524 1370 157 1672 117M1228 838C1401 816 1562 747 1672 659" stroke="#8fabbc" strokeWidth="1" opacity=".2" />
    <path d="M490 941C680 835 826 726 1002 738C1210 748 1393 854 1672 906V941Z" className="territory-cream-wave" />
  </svg>
}

export function HeroSection() {
  return <section className="territory-hero" aria-labelledby="territory-hero-title">
    <div className="territory-coast-photo" aria-hidden="true"><Image src="/territories/lorient-port.webp" alt="" fill sizes="(max-width: 1179px) 90vw, 62vw" /></div>
    <HeroCurves />
    <div className="territory-copy">
      <p className="territory-eyebrow"><span aria-hidden="true" />Sites web · SEO · Google Ads</p>
      <h1 id="territory-hero-title"><span className="territory-heading-line">Votre agence web</span>{' '}<span className="territory-heading-line">pour <em>développer</em></span>{' '}<span className="territory-heading-line"><em>votre activité.</em></span></h1>
      <p className="territory-intro">Des sites internet performants, un référencement durable et des campagnes Google Ads efficaces pour faire grandir votre activité localement.</p>
      <div className="territory-actions">
        <Link className="site-cta-primary" href="/contact">Parlons de votre projet <ArrowRight aria-hidden="true" /></Link>
        <Link className="site-cta-secondary" href="#estimateur"><ChartNoAxesColumnIncreasing aria-hidden="true" />Obtenir un audit gratuit</Link>
      </div>
    </div>
    <TerritoryScene />
    <div className="territory-trust">
      <p className="territory-trust-label"><span />Ils nous font confiance<span /></p>
      <div className="territory-trust-row">
        {clients.map(client => <a key={client.image} href={client.url} target="_blank" rel="noopener noreferrer" className={`territory-client territory-client-${client.image}`} aria-label={`${client.name} (nouvel onglet)`}><Image src={`/clients/${client.image}.webp`} alt={client.name} width={140} height={55} /></a>)}
        <p>+ de 30 entreprises<br />nous font confiance</p>
      </div>
    </div>
    <a className="territory-photo-credits" href="/territories/credits.html" target="_blank" rel="noopener noreferrer">Crédits photos</a>
  </section>
}
