'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react'
import { useInView } from 'framer-motion'
import { ArrowRight, Check, CheckCheck, FileText, LayoutTemplate, Link2, Pause, Play, RefreshCw, RotateCcw, ShieldCheck } from 'lucide-react'
import './refonte-hero-demo.css'

const labels = ['Existant', 'Refonte', 'Migration']
const subscribe = () => () => {}
const yes = () => true
const no = () => false
const motionSubscribe = (cb: () => void) => { const media = window.matchMedia('(prefers-reduced-motion: reduce)'); media.addEventListener('change', cb); return () => media.removeEventListener('change', cb) }
const motionSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const visibilitySubscribe = (cb: () => void) => { document.addEventListener('visibilitychange', cb); return () => document.removeEventListener('visibilitychange', cb) }
const visibilitySnapshot = () => document.visibilityState === 'visible'

export function RefonteHeroDemo() {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const inView = useInView(root, { amount: .3 })
  const hydrated = useSyncExternalStore(subscribe, yes, no)
  const reduced = useSyncExternalStore(motionSubscribe, motionSnapshot, no)
  const visible = useSyncExternalStore(visibilitySubscribe, visibilitySnapshot, yes)
  const [manual, setManual] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [verified, setVerified] = useState(false)
  const time = !hydrated || reduced ? 7200 : elapsed
  const view = manual ?? (time >= 4700 ? 2 : time >= 2200 ? 1 : 0)
  const complete = elapsed >= 7200
  const checks = verified || time >= 6300
  useEffect(() => {
    if (!hydrated || reduced || !visible || !inView || !playing || complete || manual !== null) return
    let previous = performance.now()
    const timer = window.setInterval(() => { const now = performance.now(); const delta = Math.min(now - previous, 200); previous = now; setElapsed(value => Math.min(value + delta, 7200)) }, 50)
    return () => window.clearInterval(timer)
  }, [hydrated, reduced, visible, inView, playing, complete, manual])
  function select(index: number) { setManual(index); setPlaying(false) }
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) { let next: number; if (event.key === 'ArrowRight') next = (index + 1) % 3; else if (event.key === 'ArrowLeft') next = (index + 2) % 3; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = 2; else return; event.preventDefault(); select(next); tabs.current[next]?.focus() }
  function playback() { if (complete || manual !== null) { setElapsed(0); setManual(null); setPlaying(true); setVerified(false) } else setPlaying(value => !value) }
  return <div ref={root} className="refonte-hero-demo" data-hydrated={hydrated} data-view={view} role="group" aria-label="Démonstration d’une refonte et de sa migration">
    <div className="refonte-demo-stage"><div className="refonte-demo-frame">
      <div className="refonte-demo-top"><span><RefreshCw aria-hidden="true" /></span><strong>Faire évoluer votre site</strong><small>Exemple de parcours</small></div>
      <div className="refonte-demo-tabs" role="tablist" aria-label="Les étapes de la refonte">{labels.map((label, index) => <button type="button" role="tab" ref={el => { tabs.current[index] = el }} id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={view === index} tabIndex={view === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => keyboard(event, index)} key={label}><span>0{index + 1}</span>{label}</button>)}</div>
      <div className="refonte-demo-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${view}`} tabIndex={0} onFocus={() => setPlaying(false)}>
        {view < 2 ? <div className="refonte-demo-site" data-new={view === 1} key={view}><div className="refonte-demo-browser"><LayoutTemplate aria-hidden="true" /><span>Votre entreprise</span><small>{view === 0 ? 'Présentation · Prestations · Contact' : 'Expertises · Réalisations · Contact'}</small></div><div className="refonte-demo-site-body"><span>{view === 0 ? 'VOTRE SAVOIR-FAIRE' : 'UNE OFFRE QUI SE COMPREND'}</span><div className="seo-visual-title">{view === 0 ? 'Une entreprise, de nombreux services.' : 'Le bon service. Une prochaine étape claire.'}</div><p>{view === 0 ? 'Des contenus utiles, à organiser autour des besoins de vos visiteurs.' : 'Votre expertise, des réponses concrètes et un accès direct au contact.'}</p><div className="refonte-demo-page-items"><span><FileText aria-hidden="true" />{view === 0 ? 'Présentation' : 'Vos besoins'}</span><span><Link2 aria-hidden="true" />{view === 0 ? 'Nos prestations' : 'Nos réponses'}</span></div><span className="refonte-demo-site-cta">{view === 0 ? 'En savoir plus' : 'Parlons de votre projet'}<ArrowRight aria-hidden="true" /></span></div></div> : <div className="refonte-demo-migration"><span className="refonte-demo-migration-icon"><Link2 aria-hidden="true" /></span><div className="seo-visual-title">Les bonnes pages,<br />aux bonnes adresses.</div><p>Un plan de redirection préparé avant la bascule.</p><ol>{[['/prestations.html', '/services'], ['/societe.html', '/a-propos'], ['/nous-joindre', '/contact']].map(([from, to]) => <li key={from}><span>{from}</span><i>301 <ArrowRight aria-hidden="true" /></i><strong>{to}</strong>{checks && <Check aria-hidden="true" />}</li>)}</ol><button type="button" onClick={() => { setVerified(true); setPlaying(false) }}>{checks ? <CheckCheck aria-hidden="true" /> : <ShieldCheck aria-hidden="true" />}{checks ? 'Parcours d’exemple vérifiés' : 'Vérifier les parcours'}</button></div>}
      </div>
      <div className="refonte-demo-status"><ShieldCheck aria-hidden="true" /><span>{view === 0 ? 'Identifier les contenus et les parcours utiles.' : view === 1 ? 'Une structure plus lisible, sur tous les écrans.' : 'Préparer, vérifier et suivre la mise en ligne.'}</span></div>
      <div className="refonte-demo-points"><span><Check aria-hidden="true" />Contenus</span><span><Check aria-hidden="true" />Expérience</span><span><Check aria-hidden="true" />Référencement</span></div>
    </div></div>
    <div className="refonte-demo-controls"><span>Illustration · aucun audit réel</span>{hydrated && !reduced && <button type="button" onClick={playback} aria-label={complete || manual !== null ? 'Rejouer la refonte' : playing ? 'Mettre la refonte en pause' : 'Reprendre la refonte'}>{complete || manual !== null ? <RotateCcw aria-hidden="true" /> : playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{complete || manual !== null ? 'Rejouer' : playing ? 'Pause' : 'Reprendre'}</button>}</div>
  </div>
}
