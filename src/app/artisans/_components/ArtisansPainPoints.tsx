import { Clock3, UsersRound, ChartNoAxesColumnIncreasing, CalendarDays } from 'lucide-react'
import { ArtisansReveal } from './ArtisansReveal'

const challenges = [
  { icon: Clock3, title: 'Pas le temps de gérer le digital', text: 'Vos journées se passent sur le terrain. Entre les chantiers et les devis, mettre votre site à jour passe souvent après.' },
  { icon: UsersRound, title: 'Trop dépendant du bouche-à-oreille', text: 'Les recommandations sont précieuses. Mais elles ne suffisent pas toujours à garder un carnet de commandes régulier.' },
  { icon: ChartNoAxesColumnIncreasing, title: 'Vos concurrents sont déjà en ligne', text: 'Vos futurs clients comparent aussi sur Google. Une entreprise plus visible peut être contactée avant la vôtre.' },
  { icon: CalendarDays, title: 'Des périodes creuses difficiles', text: 'Votre activité varie au fil des saisons. Vous aimeriez préparer les prochains chantiers avec plus de visibilité.' },
]

export function ArtisansPainPoints() {
  return <section className="art-section art-reality" aria-labelledby="art-reality-title">
    <div className="art-container">
      <div className="art-section-heading"><p className="art-kicker">Vos défis au quotidien</p>
        <h2 id="art-reality-title">On connaît <em>votre réalité.</em></h2>
        <p className="art-reality-intro">Être un bon artisan, ce n’est pas passer ses journées sur internet. Voici les situations auxquelles notre accompagnement apporte des réponses concrètes.</p>
      </div>
      <ArtisansReveal className="art-reality-grid">
        {challenges.map((item, index) => <article className={`art-reality-card art-tone-${index}`} key={item.title}>
          <span className="art-icon"><item.icon size={24} strokeWidth={1.7} aria-hidden="true" /></span>
          <h3>{item.title}</h3><p>{item.text}</p>
        </article>)}
      </ArtisansReveal>
    </div>
  </section>
}
