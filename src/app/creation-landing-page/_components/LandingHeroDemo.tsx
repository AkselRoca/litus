'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react'
import { useInView } from 'framer-motion'
import { ArrowRight, Check, CheckCheck, Crosshair, FileCheck2, MousePointer2, Pause, Play, RotateCcw } from 'lucide-react'
import './landing-hero-demo.css'

const offers = [{ label: 'Devis', title: 'Votre projet mérite un devis clair.', cta: 'Demander mon devis', detail: 'Un besoin, un échange, une proposition.' }, { label: 'Rendez-vous', title: 'Faisons le point sur votre projet.', cta: 'Choisir un rendez-vous', detail: 'Un échange pour définir la suite.' }]
const subscribe = () => () => {}
const hydratedSnapshot = () => true
const serverSnapshot = () => false
const motionSubscribe = (cb: () => void) => { const media = window.matchMedia('(prefers-reduced-motion: reduce)'); media.addEventListener('change', cb); return () => media.removeEventListener('change', cb) }
const motionSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const visibilitySubscribe = (cb: () => void) => { document.addEventListener('visibilitychange', cb); return () => document.removeEventListener('visibilitychange', cb) }
const visibilitySnapshot = () => document.visibilityState === 'visible'

export function LandingHeroDemo() {
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const inView = useInView(ref, { amount: .3 })
  const hydrated = useSyncExternalStore(subscribe, hydratedSnapshot, serverSnapshot)
  const reduced = useSyncExternalStore(motionSubscribe, motionSnapshot, serverSnapshot)
  const visible = useSyncExternalStore(visibilitySubscribe, visibilitySnapshot, hydratedSnapshot)
  const [offer, setOffer] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [confirmed, setConfirmed] = useState(false)
  const time = !hydrated || reduced ? 7200 : elapsed
  const stage = confirmed || time >= 4700 ? 2 : time >= 2200 ? 1 : 0
  const complete = elapsed >= 7200 || confirmed
  const model = offers[offer]
  useEffect(() => {
    if (!hydrated || reduced || !inView || !visible || !playing || complete) return
    let last = performance.now()
    const timer = window.setInterval(() => { const now = performance.now(); const delta = Math.min(now - last, 200); last = now; setElapsed(value => Math.min(value + delta, 7200)) }, 50)
    return () => window.clearInterval(timer)
  }, [hydrated, reduced, inView, visible, playing, complete])
  function selectOffer(index: number) { setOffer(index); setElapsed(0); setConfirmed(false); setPlaying(true) }
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return; event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index; selectOffer(next); tabs.current[next]?.focus() }
  function playback() { if (complete) { setElapsed(0); setConfirmed(false); setPlaying(true) } else setPlaying(value => !value) }
  return <div ref={ref} className="landing-hero-demo" data-hydrated={hydrated} data-stage={stage} role="group" aria-label="Démonstration d’un parcours de landing page">
    <div className="landing-demo-stage"><div className="landing-demo-frame">
      <div className="landing-demo-top"><span><Crosshair aria-hidden="true" /></span><strong>Du clic à la demande</strong><small>Parcours d’exemple</small></div>
      <div role="tablist" aria-label="Objectif de la landing page" className="landing-demo-tabs">{offers.map((item, index) => <button type="button" role="tab" key={item.label} ref={el => { tabs.current[index] = el }} id={`${id}-tab-${index}`} aria-controls={`${id}-page`} aria-selected={index === offer} tabIndex={index === offer ? 0 : -1} onClick={() => selectOffer(index)} onKeyDown={event => keyboard(event, index)}>{item.label}</button>)}</div>
      <div className="landing-demo-source"><MousePointer2 aria-hidden="true" /><span>Votre annonce<span>Une offre et une intention précises</span></span><ArrowRight aria-hidden="true" /></div>
      <div role="tabpanel" tabIndex={0} id={`${id}-page`} aria-labelledby={`${id}-tab-${offer}`} className="landing-demo-page" onFocus={() => setPlaying(false)}>
        <div className="landing-demo-browser"><span><i /><i /><i /></span><small>votre-site.fr / votre-offre</small></div>
        <div className="landing-demo-page-body"><span className="landing-demo-eyebrow">UNE OFFRE. UNE PROCHAINE ÉTAPE.</span><h3>{model.title}</h3><p>{model.detail}</p><div className="landing-demo-proof"><span><Check aria-hidden="true" />Offre expliquée</span><span><Check aria-hidden="true" />Contact direct</span></div><button className="landing-demo-cta" type="button" onClick={() => { setConfirmed(true); setPlaying(false) }} aria-label={`Simuler : ${model.cta}`}>{confirmed ? 'Demande simulée' : model.cta}{confirmed ? <CheckCheck aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}</button><span className="landing-demo-reassurance">Aucune information personnelle à saisir ici.</span></div>
      </div>
      <ol className="landing-demo-measure" aria-label="Étapes du parcours illustratif">{['Page consultée', 'Action choisie', 'Demande reçue'].map((label, index) => <li data-done={stage >= index} key={label}><span>{stage >= index ? <Check aria-hidden="true" /> : index + 1}</span><strong>{label}</strong></li>)}</ol>
      <div className="landing-demo-result" data-visible={stage === 2}><FileCheck2 aria-hidden="true" /><span>{confirmed ? 'Simulation terminée. Aucun formulaire envoyé.' : 'Une action utile, prête à être mesurée.'}</span></div>
    </div></div>
    <div className="landing-demo-controls"><span>Aperçu illustratif · aucun envoi</span>{hydrated && !reduced && <button type="button" onClick={playback} aria-label={complete ? 'Rejouer le parcours landing page' : playing ? 'Mettre le parcours landing page en pause' : 'Reprendre le parcours landing page'}>{complete ? <RotateCcw aria-hidden="true" /> : playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{complete ? 'Rejouer' : playing ? 'Pause' : 'Reprendre'}</button>}</div>
  </div>
}
