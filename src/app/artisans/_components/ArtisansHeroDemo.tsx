'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react'
import { useInView } from 'framer-motion'
import { ArrowRight, Check, Mail, MapPin, Pause, Play, RotateCcw, Search, Wrench } from 'lucide-react'
import './artisans-hero-demo.css'

const subscribeHydration = () => () => {}
const getHydrated = () => true
const getServerHydrated = () => false
const subscribeMotion = (callback: () => void) => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}
const getMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const getServerMotion = () => false
const subscribeVisibility = (callback: () => void) => {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
const getVisibility = () => document.visibilityState === 'visible'
const getServerVisibility = () => true

/** Shared by the two illustrative artisan interfaces; each owns its own timeline. */
export function useArtisanSequence(ref: RefObject<HTMLDivElement | null>, duration = 3900) {
  const inView = useInView(ref, { amount: .3 })
  const hydrated = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated)
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotion, getServerMotion)
  const visible = useSyncExternalStore(subscribeVisibility, getVisibility, getServerVisibility)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const complete = elapsed >= duration
  const staticPresentation = !hydrated || reducedMotion

  useEffect(() => {
    if (!hydrated || reducedMotion || !visible || !inView || !playing || complete) return
    const timer = window.setTimeout(() => setElapsed(previous => Math.min(previous + 55, duration)), 55)
    return () => window.clearTimeout(timer)
  }, [hydrated, reducedMotion, visible, inView, playing, complete, elapsed, duration])

  return {
    elapsed, complete, staticPresentation, playing,
    controlsVisible: hydrated && !reducedMotion,
    replay: () => { setElapsed(0); setPlaying(true) },
    toggle: () => setPlaying(previous => !previous),
  }
}

const query = 'plombier Lorient'

export function ArtisansHeroDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const sequence = useArtisanSequence(ref)
  const queryText = sequence.staticPresentation ? query : query.slice(0, Math.max(0, Math.floor((sequence.elapsed - 300) / 65)))
  const companyVisible = sequence.staticPresentation || sequence.elapsed >= 1800
  const contactVisible = sequence.staticPresentation || sequence.elapsed >= 2850

  return (
    <div ref={ref} className="art-hero-demo" data-animate={!sequence.staticPresentation} role="group" aria-label="Exemple d’une recherche locale qui mène à une prise de contact">
      <div className="art-hero-demo-stage">
        <div className="art-hero-demo-browser"><div className="art-hero-demo-browser-bar" aria-hidden="true"><i /><i /><i /><span /></div></div>
        <div className="art-hero-demo-search"><Image src="/brands/google-color.svg" alt="Google" width={28} height={28} /><div><small>Une recherche près de chez vous</small><span>{queryText}<i className={!sequence.staticPresentation && sequence.elapsed < 1450 ? 'is-visible' : ''} aria-hidden="true" /></span></div><Search aria-hidden="true" /></div>
        <div className="art-hero-demo-company" data-visible={companyVisible} aria-hidden={!companyVisible}><span className="art-hero-demo-company-icon"><Wrench aria-hidden="true" /></span><p>Votre entreprise,<br />dans votre ville.</p><span className="art-hero-demo-company-location"><MapPin aria-hidden="true" />Plomberie · Lorient</span><div className="art-hero-demo-company-rule" /><small>Votre savoir-faire, visible en ligne.</small></div>
        <div className="art-hero-demo-contact" data-visible={contactVisible} aria-hidden={!contactVisible}><span className="art-hero-demo-contact-icon"><Mail aria-hidden="true" /><Check aria-hidden="true" /></span><p>Nouvelle demande<br />de devis</p><span>Exemple de parcours</span></div>
        <div className="art-hero-demo-local-note"><span><MapPin aria-hidden="true" /></span><p>Une présence locale.<br /><strong>Un contact direct avec vous.</strong></p></div>
        <div className="art-hero-demo-connection" aria-hidden="true"><svg viewBox="0 0 100 80" fill="none"><path d="M8 64C45 74 74 47 83 16M71 22l14-9 7 15" /></svg><span>Votre métier.<br />Les bons contacts.</span></div>
      </div>
      <div className="art-hero-demo-controls"><span>Illustration · aucune demande réellement envoyée</span>{sequence.controlsVisible && <button type="button" onClick={sequence.complete ? sequence.replay : sequence.toggle} aria-label={sequence.complete ? 'Rejouer l’exemple de visibilité artisan' : sequence.playing ? 'Mettre l’exemple artisan en pause' : 'Reprendre l’exemple artisan'}>{sequence.complete ? <RotateCcw aria-hidden="true" /> : sequence.playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{sequence.complete ? 'Rejouer' : sequence.playing ? 'Pause' : 'Reprendre'}<ArrowRight className="art-hero-demo-control-arrow" aria-hidden="true" /></button>}</div>
    </div>
  )
}
