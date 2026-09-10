import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import './service-hero.css'

type HeroAction = { label: string; href: string }
type HeroBenefit = { icon: ReactNode; title: string; description: string }

export interface ServiceHeroProps {
  id: string
  title: string
  accent?: string
  description: string
  eyebrow?: string
  eyebrowBadge?: boolean
  showActions?: boolean
  primaryAction?: HeroAction
  secondaryAction?: HeroAction
  proof?: ReactNode
  visual: ReactNode
  visualBackground?: string
  benefits?: HeroBenefit[]
}

/** All service pages share this typography and grid; only their content varies. */
export function ServiceHero({
  id,
  title,
  accent,
  description,
  eyebrow = 'Agence web · Lorient & Le Mans',
  eyebrowBadge = false,
  showActions = true,
  primaryAction = { label: 'Parlons de votre projet', href: '/contact' },
  secondaryAction = { label: 'Voir nos réalisations', href: '/realisations' },
  proof,
  visual,
  visualBackground,
  benefits,
}: ServiceHeroProps) {
  // French punctuation stays with the preceding word at every breakpoint.
  const heading = title.replace(/ ([;:!?])/g, '\u00a0$1')
  const headingAccent = accent?.replace(/ ([;:!?])/g, '\u00a0$1')
  const accentStart = headingAccent ? heading.indexOf(headingAccent) : -1

  return (
    <section className="service-hero" aria-labelledby={id}>
      <div className="service-hero-grid">
        <div className="service-hero-copy">
          <p className={`service-hero-eyebrow${eyebrowBadge ? ' service-hero-eyebrow-badge' : ''}`}><span aria-hidden="true" />{eyebrow}</p>
          <h1 id={id} className="service-hero-title">
            {headingAccent && accentStart >= 0 ? <>{heading.slice(0, accentStart)}<em>{headingAccent}</em>{heading.slice(accentStart + headingAccent.length)}</> : heading}
          </h1>
          <p className="service-hero-intro">{description}</p>
          {showActions && <div className="service-hero-actions">
            <Link href={primaryAction.href} className="site-cta-primary">{primaryAction.label}<ArrowRight size={18} aria-hidden="true" /></Link>
            <Link href={secondaryAction.href} className="site-cta-secondary">{secondaryAction.label}</Link>
          </div>}
          {proof && <div className="service-hero-proof">{proof}</div>}
        </div>
        <div className="service-hero-visual">
          {visualBackground && <div className="service-hero-backdrop" style={{ backgroundImage: `url('${visualBackground}')` }} aria-hidden="true" />}
          {visual}
        </div>
      </div>
      {benefits && benefits.length > 0 && <ul className="service-hero-benefits">
        {benefits.map(benefit => <li key={benefit.title}><span className="service-hero-benefit-icon">{benefit.icon}</span><div><h2>{benefit.title}</h2><p>{benefit.description}</p></div></li>)}
      </ul>}
    </section>
  )
}
