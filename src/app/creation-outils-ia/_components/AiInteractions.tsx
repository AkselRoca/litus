'use client'

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowRight, Check, Database, FileText, Workflow } from 'lucide-react'
import { aiWorkflows } from '../ai-content'

/** Progressive enhancement: the server-rendered content is always visible. */
export function AiReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    if (!root || preference.matches || !('IntersectionObserver' in window)) return
    const effects: Animation[] = []
    const stop = () => effects.forEach(effect => effect.cancel())
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        if (!preference.matches) effects.push(entry.target.animate(
          [{ opacity: .65, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 440, delay: Math.min(Array.from(root.children).indexOf(entry.target), 3) * 65, easing: 'cubic-bezier(.2,.7,.3,1)' },
        ))
        observer.unobserve(entry.target)
      }
    }, { threshold: .12 })
    Array.from(root.children).forEach(child => observer.observe(child))
    preference.addEventListener('change', stop)
    return () => { observer.disconnect(); preference.removeEventListener('change', stop); stop() }
  }, [])
  return <div ref={ref} className={className}>{children}</div>
}

export function AiWorkflows() {
  const id = useId()
  const [active, setActive] = useState(0)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % 3 : event.key === 'ArrowLeft' ? (index + 2) % 3 : event.key === 'Home' ? 0 : event.key === 'End' ? 2 : -1
    if (next < 0) return
    event.preventDefault()
    setActive(next)
    buttons.current[next]?.focus()
  }
  return <div className="ai-workflows">
    <div className="ai-workflow-tabs" role="tablist" aria-label="Exemples de processus métier">
      {aiWorkflows.map((workflow, index) => <button key={workflow.id} ref={element => { buttons.current[index] = element }} id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} type="button" role="tab" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => onKey(event, index)}>{workflow.label}<ArrowRight size={15} aria-hidden="true" /></button>)}
    </div>
    {aiWorkflows.map((workflow, index) => <div key={workflow.id} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0} className="ai-workflow-panel">
      <div className="ai-workflow-context"><span>Un exemple concret</span><h3>{workflow.context}</h3><p><strong>Aujourd’hui</strong>{workflow.before}</p></div>
      <div className="ai-workflow-steps">
        <div><span className="ai-workflow-step-icon"><Database aria-hidden="true" /></span><small>01 — Les sources</small><h4>Vos informations utiles</h4><ul>{workflow.sources.map(source => <li key={source}><FileText size={14} aria-hidden="true" />{source}</li>)}</ul></div>
        <div><span className="ai-workflow-step-icon"><Workflow aria-hidden="true" /></span><small>02 — Le traitement</small><h4>Un travail préparé par l’IA</h4><p>{workflow.action}</p></div>
        <div className="ai-workflow-result"><span className="ai-workflow-step-icon"><Check aria-hidden="true" /></span><small>03 — Le résultat</small><h4>Votre équipe garde la main</h4><p>{workflow.result}</p></div>
      </div>
      <p className="ai-workflow-measure">{workflow.measure}</p>
    </div>)}
  </div>
}
