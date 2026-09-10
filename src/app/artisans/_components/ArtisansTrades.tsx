'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Droplets, Zap, Thermometer, House, DoorOpen, PaintRoller, Grid2X2, BrickWall, Leaf, Hammer } from 'lucide-react'
import { ArtisansReveal } from './ArtisansReveal'

const trades = [
  { name: 'Plombier', icon: Droplets, description: 'Dépannage, fuite ou installation : présentez vos interventions et facilitez l’appel depuis un téléphone.' },
  { name: 'Électricien', icon: Zap, description: 'Mise aux normes, tableaux et installations : expliquez vos prestations et recevez des demandes adaptées à vos compétences.' },
  { name: 'Chauffagiste / Climatisation', icon: Thermometer, description: 'Installation, entretien et remplacement : adaptez vos pages et vos campagnes aux besoins de chaque saison.' },
  { name: 'Couvreur', icon: House, description: 'Réfection de toiture, isolation ou réparation : montrez vos chantiers et précisez votre périmètre d’intervention.' },
  { name: 'Menuisier', icon: DoorOpen, description: 'Fenêtres, portes et agencements : valorisez vos réalisations pour aider vos clients à se projeter dans leur futur aménagement.' },
  { name: 'Peintre', icon: PaintRoller, description: 'Peinture intérieure, façade et finitions : présentez votre travail avec des photos et un parcours simple pour demander un devis.' },
  { name: 'Carreleur', icon: Grid2X2, description: 'Salles de bain, terrasses et sols : mettez en avant vos matériaux, vos finitions et les projets que vous souhaitez recevoir.' },
  { name: 'Maçon', icon: BrickWall, description: 'Construction, extension et rénovation : rassurez sur votre savoir-faire et recueillez les premières informations du chantier.' },
  { name: 'Paysagiste', icon: Leaf, description: 'Création de jardin, clôtures ou entretien : distinguez vos prestations pour attirer les projets qui correspondent à votre activité.' },
  { name: 'Rénovation intérieure', icon: Hammer, description: 'Rénovation complète, cuisine ou salle de bain : montrez la transformation et accompagnez vos clients vers un premier échange.' },
]

export function ArtisansTrades() {
  const [selected, setSelected] = useState(0)
  const detailId = useId()
  const trade = trades[selected]
  return <section className="art-section art-trades" id="metiers-artisans" aria-labelledby="art-trades-title">
    <div className="art-container">
      <div className="art-section-heading art-heading-split">
        <div><p className="art-kicker">Vos métiers</p><h2 id="art-trades-title">Des solutions pensées <em>pour les artisans.</em></h2></div>
        <p>Chaque métier a ses demandes, ses saisons et sa zone d’intervention. Choisissez votre activité pour découvrir ce que nous pouvons travailler ensemble.</p>
      </div>
      <ArtisansReveal className="art-trades-grid">
        {trades.map((item, index) => <button type="button" className={`art-trade art-tone-${index % 4}`} key={item.name} aria-pressed={selected === index} aria-controls={detailId} onClick={() => setSelected(index)}>
          <span className="art-icon"><item.icon size={24} strokeWidth={1.6} aria-hidden="true" /></span><span>{item.name}</span>
        </button>)}
      </ArtisansReveal>
      <div className="art-trade-detail" id={detailId}>
        <p aria-live="polite" aria-atomic="true"><strong>{trade.name}</strong><span>{trade.description}</span></p>
        <Link href="/contact">Parlons de votre activité<ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </div>
  </section>
}
