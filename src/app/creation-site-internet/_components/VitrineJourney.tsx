'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, MousePointer2, Search, UserRound } from 'lucide-react'

const steps = [
  { title: 'Vos futurs clients vous trouvent.', text: 'Une présence travaillée sur les recherches qui comptent.', detail: 'Des pages structurées autour de vos services et de votre zone, pour être trouvé par les bonnes personnes.' },
  { title: 'Votre site leur donne confiance.', text: 'Un design clair, des projets concrets, les bonnes informations.', detail: 'Vos réalisations, votre savoir-faire et vos engagements répondent aux questions avant même le premier échange.' },
  { title: 'Ils passent à l’action.', text: 'Un appel, un devis, un rendez-vous : le chemin est simple.', detail: 'Des boutons bien placés et un formulaire court facilitent la prise de contact, sur ordinateur comme sur mobile.' },
  { title: 'Vous développez votre activité.', text: 'Une nouvelle demande arrive directement dans votre boîte mail.', detail: 'Vous recevez une demande avec les informations utiles. À vous de transformer ce premier échange en une belle collaboration.' },
]

export function VitrineJourney() {
  const [active, setActive] = useState(0)
  return <div className="vitrine-journey">
    <ol className="vitrine-journey-grid" aria-label="Le parcours de vos futurs clients">
      {steps.map((step, index) => <li key={step.title}>
        <button type="button" className="vitrine-journey-step" aria-pressed={active === index} aria-controls="vitrine-journey-detail" onClick={() => setActive(index)}>
          <span className="vitrine-journey-visual" aria-hidden="true">
            {index === 0 && <><Image src="/brands/google-color.svg" alt="" width={29} height={29} /><span className="vitrine-mini-search"><Search size={12} />paysagiste Le Mans<span className="vitrine-typing-caret" /></span></>}
            {index === 1 && <span className="vitrine-mini-site"><span><i /><i /><i /></span><Image src="/realisations/west-case-services.webp" alt="" width={360} height={200} /></span>}
            {index === 2 && <span className="vitrine-mini-cta">Demander un devis<MousePointer2 size={24} /></span>}
            {index === 3 && <span className="vitrine-mini-lead"><span><UserRound size={19} /></span><span><b>Nouvelle demande</b><small>Un projet à construire ensemble</small></span><Check size={16} /></span>}
          </span>
          <span className="vitrine-journey-number">0{index + 1}</span>
          <strong>{step.title}</strong>
          <span className="vitrine-journey-text">{step.text}</span>
        </button>
        {index < 3 && <ArrowRight className="vitrine-journey-arrow" size={20} aria-hidden="true" />}
      </li>)}
    </ol>
    <div className="vitrine-journey-caption" id="vitrine-journey-detail" aria-live="polite" aria-atomic="true"><span>0{active + 1} / 04</span><p>{steps[active].detail}</p></div>
  </div>
}

