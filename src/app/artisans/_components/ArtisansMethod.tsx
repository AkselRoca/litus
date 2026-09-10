'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Check, MapPin, Monitor, Pause, Play, Radio, RotateCcw, Settings2 } from 'lucide-react'
import './artisans-method.css'

const ticksPerStep = 22
const totalTicks = ticksPerStep * 4
const steps = [
  { title: 'Analyse du métier et de la zone', icon: MapPin, description: 'Vos prestations, vos clients et votre secteur : nous partons de votre réalité pour définir les priorités.', proof: 'Métier et zone définis' },
  { title: 'Mise en place de la visibilité', icon: Monitor, description: 'Site internet, fiche Google et référencement local : nous préparons les outils adaptés à votre activité.', proof: 'Des outils adaptés à votre métier' },
  { title: 'Lancement des campagnes', icon: Radio, description: 'Nous ciblons les recherches utiles et les bonnes zones, avec un budget publicitaire défini ensemble.', proof: 'Un ciblage et un budget clairs' },
  { title: 'Suivi et optimisations', icon: Settings2, description: 'Nous suivons les demandes reçues et ajustons les actions. Vous savez ce qui avance et ce qui vient ensuite.', proof: 'Des décisions partagées' },
] as const

const subscribeReducedMotion = (callback: () => void) => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  preference.addEventListener('change', callback)
  return () => preference.removeEventListener('change', callback)
}
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const getServerReducedMotion = () => false
const subscribeVisibility = (callback: () => void) => {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
const getVisibility = () => document.visibilityState === 'visible'
const getServerVisibility = () => true
const subscribeHydration = () => () => {}
const getHydrated = () => true
const getServerHydrated = () => false

/** A single timeline progresses only while its current card can be seen. */
export function ArtisansMethod() {
  const cards = useRef<(HTMLLIElement | null)[]>([])
  const [visibleCards, setVisibleCards] = useState([false, false, false, false])
  const [tick, setTick] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion)
  const tabVisible = useSyncExternalStore(subscribeVisibility, getVisibility, getServerVisibility)
  const hydrated = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated)
  const currentStep = Math.min(3, Math.floor(tick / ticksPerStep))
  const complete = tick >= totalTicks
  const running = hydrated && !reducedMotion && tabVisible && !paused && !complete && visibleCards[currentStep]
  const displayTick = !hydrated || reducedMotion ? totalTicks : tick

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      setVisibleCards(previous => {
        const next = [...previous]
        for (const entry of entries) {
          const index = cards.current.indexOf(entry.target as HTMLLIElement)
          if (index >= 0) next[index] = entry.isIntersecting && entry.intersectionRatio >= .2
        }
        return next.some((value, index) => value !== previous[index]) ? next : previous
      })
    }, { threshold: [0, .2] })
    cards.current.forEach(card => { if (card) observer.observe(card) })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => setTick(value => Math.min(value + 1, totalTicks)), 100)
    return () => window.clearTimeout(timer)
  }, [running, tick])

  function replay() {
    setTick(0)
    setPaused(false)
    if (!visibleCards[0]) cards.current[0]?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }

  return <div className="art-method" data-running={running}>
    <ol className="art-method-grid" aria-label="Les quatre étapes de votre accompagnement">
      {steps.map(({ title, icon: Icon, description, proof }, index) => {
        const localTick = Math.min(ticksPerStep, Math.max(0, displayTick - index * ticksPerStep))
        const fill = Math.min(1, localTick / (ticksPerStep - 3))
        return <li className="art-method-card" key={title} ref={element => { cards.current[index] = element }} data-active={running && currentStep === index} data-complete={localTick >= ticksPerStep}>
          <div className="art-method-heading"><span className="art-method-icon"><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></span><span className="art-method-number">0{index + 1}</span></div>
          <h3>{title}</h3>
          <p className="art-method-description">{description}</p>
          <div className="art-method-proof" aria-hidden="true" data-ready={localTick >= 14}><span><Check size={12} strokeWidth={2} /></span>{proof}</div>
          <div className="art-method-progress" aria-hidden="true"><span style={{ transform: `scaleX(${fill})` }} /></div>
          {index < steps.length - 1 && <span className="art-method-connector" aria-hidden="true"><i style={{ transform: `scaleX(${fill})` }} /></span>}
        </li>
      })}
    </ol>
    <div className="art-method-footer"><p>Un aperçu des étapes de notre accompagnement.</p>
      {hydrated && !reducedMotion && (complete ? <button type="button" onClick={replay}><RotateCcw size={13} aria-hidden="true" />Rejouer les étapes</button> : <button type="button" onClick={() => setPaused(value => !value)}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}{paused ? 'Reprendre l’animation' : 'Mettre en pause'}</button>)}
    </div>
  </div>
}
