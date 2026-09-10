import type { ReactNode } from 'react'
import './business-service.css'

export { ServiceReveal } from './ServiceReveal'

export function BusinessSectionHeading({ eyebrow, id, children, description }: {
  eyebrow: string
  id: string
  children: ReactNode
  description?: ReactNode
}) {
  return <div className={`business-heading${description ? ' business-heading-split' : ''}`}>
    <div><p className="business-kicker">{eyebrow}</p><h2 id={id}>{children}</h2></div>
    {description && <p>{description}</p>}
  </div>
}
