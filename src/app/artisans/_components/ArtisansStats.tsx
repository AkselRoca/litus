import { MapPin, Phone, ChartNoAxesCombined, UsersRound } from 'lucide-react'
import { ArtisansReveal } from './ArtisansReveal'

const benefits = [
  { icon: MapPin, title: 'Ciblage local', text: 'Votre métier, votre ville et votre zone d’intervention.' },
  { icon: Phone, title: 'Contacts directs', text: 'Les demandes arrivent directement dans votre entreprise.' },
  { icon: ChartNoAxesCombined, title: 'Suivi des demandes', text: 'Des repères pour comprendre ce qui fonctionne.' },
  { icon: UsersRound, title: 'Accompagnement humain', text: 'Un interlocuteur pour vos questions et vos objectifs.' },
]

export function ArtisansStats() {
  return <section className="art-benefits-band" aria-label="Notre accompagnement pour les artisans">
    <ArtisansReveal className="art-container art-benefits-grid">
      {benefits.map(item => <div className="art-benefit" key={item.title}>
        <span><item.icon size={23} strokeWidth={1.7} aria-hidden="true" /></span>
        <strong>{item.title}</strong><p>{item.text}</p>
      </div>)}
    </ArtisansReveal>
  </section>
}
