'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, MapPin, Search } from 'lucide-react'

const territories = [
  { name: 'Lorient', department: 'Morbihan', query: 'plombier Lorient', context: 'Des demandes près de votre entreprise.', href: '#google-ads-contact', linkTitle: 'Parler de vos campagnes à Lorient' },
  { name: 'Le Mans', department: 'Sarthe', query: 'entreprise rénovation Le Mans', context: 'Une présence adaptée à votre zone d’intervention.', href: '/agence-web-le-mans', linkTitle: 'Découvrir notre agence web au Mans' },
]

export function GoogleAdsLocal() {
  const [active, setActive] = useState(0)
  return <section className="gad-section gad-local-section" aria-labelledby="gad-local-title">
    <div className="gad-container gad-local-grid">
      <div className="gad-local-copy"><p className="gad-kicker"><span />Un accompagnement de proximité</p><h2 id="gad-local-title">Votre agence Google Ads<br /> <em>à Lorient et au Mans.</em></h2><p>Artisans, entreprises de services, commerces : nous partons de votre activité et de la façon dont vos clients vous recherchent.</p><p>Du Morbihan à la Sarthe, nous définissons avec vous une zone de diffusion cohérente avec vos déplacements, vos priorités et votre budget. Un échange direct pour construire des campagnes qui vous ressemblent.</p>
        <div className="gad-territory-links">{territories.map((territory, index) => <Link key={territory.name} href={territory.href} title={territory.linkTitle} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} data-active={active === index}><MapPin size={15} aria-hidden="true" />{territory.name}<span aria-hidden="true">·</span>{territory.department}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}</div>
        <div className="gad-local-related"><Link href="/artisans">Pour les artisans<ArrowRight size={14} /></Link><Link href="/pme">Pour les entreprises<ArrowRight size={14} /></Link></div>
      </div>
      <div className="gad-local-visual">
        <div className="gad-local-visual-heading"><span><MapPin size={20} aria-hidden="true" /></span><div><h3>Le bon message.<br />Au bon endroit.</h3><p>Un ciblage qui part de votre terrain.</p></div></div>
        <div className="gad-local-map" aria-hidden="true"><svg viewBox="0 0 560 132" fill="none"><path className="gad-map-river" d="M-10 100C58 110 70 19 142 32S240 129 324 90 445 5 570 42"/><path className="gad-map-road" d="M-10 45 115 67 190 22 280 47 388 110 570 96M69-10 110 67 87 145M312-10 280 47 249 142M466-10 433 66 470 144"/><path className="gad-map-road gad-map-road-minor" d="M0 4 132 13 176 80 271 115 384 31 560 4M0 129 162 115 253 2M137-10 211 145M354-10 330 148M517-10 498 138"/></svg><span className={`gad-local-pin gad-local-pin-0 ${active === 0 ? 'is-active' : ''}`}><MapPin size={30} /><b>Lorient</b></span><span className={`gad-local-pin gad-local-pin-1 ${active === 1 ? 'is-active' : ''}`}><MapPin size={30} /><b>Le Mans</b></span></div>
        <div className="gad-local-queries" aria-label="Exemples de recherches selon la zone">{territories.map((territory, index) => <button key={territory.name} type="button" onClick={() => setActive(index)} onPointerEnter={() => setActive(index)} aria-pressed={active === index} aria-controls="gad-local-query-detail"><Search size={16} aria-hidden="true" /><span>{territory.query}</span><ArrowRight size={15} aria-hidden="true" /></button>)}</div>
        <p id="gad-local-query-detail" className="gad-local-query-detail" aria-live="polite">{territories[active].context}</p>
        <div className="gad-local-visual-footer"><Check size={15} aria-hidden="true" /><span>Zones de diffusion définies ensemble</span><small>Illustration du ciblage</small></div>
      </div>
    </div>
  </section>
}
