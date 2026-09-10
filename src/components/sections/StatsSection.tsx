import { Clock3, Star, TrendingUp, UsersRound } from 'lucide-react'
import { ReferenceAnnotation, ReferenceNumber, ReferenceReveal } from './home/ReferenceMotion'

const stats = [
  { value: 150, suffix: '+', title: 'Clients accompagnés', description: 'Des projets concrets et durables', icon: UsersRound },
  { value: 250, suffix: ' %', title: 'ROI moyen', description: 'Une croissance mesurable', icon: TrendingUp },
  { value: 5, suffix: '/5', title: 'Avis Google', description: 'Des clients satisfaits', icon: Star },
  { value: 24, suffix: ' h', title: 'Délai de réponse', description: 'Une équipe réactive', icon: Clock3 },
]

export function StatsSection() {
  return <section id="quelques-reperes" className="home-reference-section reference-results" aria-labelledby="reference-results-title"><ReferenceReveal className="home-reference-container reference-results-grid"><div><p className="reference-eyebrow"><span>05 —</span> Quelques repères</p><h2 id="reference-results-title" className="home-section-title">Une relation qui se mesure aussi dans la durée.</h2><p className="reference-intro">Des entreprises locales et nationales nous font confiance pour développer leur présence en ligne. Nous les accompagnons bien au-delà du lancement.</p></div><dl className="reference-stat-cards">{stats.map(({value,suffix,title,description,icon: Icon}) => <div key={title}><span className="reference-stat-icon" aria-hidden="true"><Icon size={22} /></span><dt>{title}</dt><dd><ReferenceNumber value={value} suffix={suffix} /></dd><p>{description}</p></div>)}</dl><ReferenceAnnotation className="reference-results-note">Plus qu’un site,<br />un partenaire sur<br />le long terme.</ReferenceAnnotation></ReferenceReveal></section>
}
