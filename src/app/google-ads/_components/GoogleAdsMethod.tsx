'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ArrowRight, BarChart3, Check, ClipboardList, FilePenLine, MapPin, Pause, Phone, Play, RotateCcw, Search, Settings2 } from 'lucide-react'
import './google-ads-method.css'

const ticksPerStep = 24
const totalTicks = ticksPerStep * 4
const steps = [
  { title: 'Audit & stratégie', icon: Search, text: 'Nous étudions votre activité, votre zone de chalandise, vos objectifs et les recherches de vos futurs clients.' },
  { title: 'Création des campagnes', icon: FilePenLine, text: 'Nous rédigeons vos annonces, organisons les campagnes et définissons un ciblage adapté à vos services.' },
  { title: 'Lancement et optimisation', icon: Settings2, text: 'Nous mettons les campagnes en ligne, observons leur diffusion et ajustons les mots-clés, annonces et enchères.' },
  { title: 'Suivi & reporting', icon: BarChart3, text: 'Appels, formulaires, dépenses : nous suivons les indicateurs utiles et partageons les décisions à prendre.' },
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

function AuditPreview({ tick }: { tick: number }) {
  return <div className="gad-method-preview gad-method-audit" aria-hidden="true">
    <div className="gad-method-mini-heading"><Search size={14} /><span>Les recherches pertinentes</span></div>
    {['Votre service + votre ville', 'Une demande de devis', 'Un besoin à proximité'].map((query, index) => <div className="gad-method-query" key={query} data-selected={tick >= 5 + index * 6}>
      <span>{query}</span><span className="gad-method-check"><Check size={11} /></span>
    </div>)}
    <div className="gad-method-mini-note gad-method-reveal" data-visible={tick >= 20}><MapPin size={12} />Une zone définie ensemble</div>
  </div>
}

function CampaignPreview({ tick }: { tick: number }) {
  return <div className="gad-method-preview gad-method-ad" aria-hidden="true">
    <div className="gad-method-ad-sponsor gad-method-reveal" data-visible={tick >= 3}>Sponsorisé</div>
    <div className="gad-method-ad-domain gad-method-reveal" data-visible={tick >= 7}><span>V</span>votre-entreprise.example</div>
    <strong className="gad-method-reveal" data-visible={tick >= 12}>Votre service, près de chez vous</strong>
    <p className="gad-method-reveal" data-visible={tick >= 17}>Une réponse à votre besoin.<br />Parlons de votre projet.</p>
    <span className="gad-method-ad-link gad-method-reveal" data-visible={tick >= 21}>Demander un devis<ArrowRight size={11} /></span>
  </div>
}

function LaunchPreview({ tick }: { tick: number }) {
  const live = tick >= 10
  const fill = tick < 12 ? 0 : Math.min(1, (tick - 12) / 10)
  return <div className="gad-method-preview gad-method-launch" aria-hidden="true">
    <div className="gad-method-mini-heading"><Settings2 size={14} /><span>Vos campagnes</span></div>
    <div className="gad-method-status" data-live={live}><span className="gad-method-status-dot" />{live ? 'Diffusion' : 'Préparation'}{live && <Check size={12} />}</div>
    <div className="gad-method-launch-label"><span>Ajustements du ciblage</span><Settings2 size={12} /></div>
    <div className="gad-method-gauge"><span style={{ transform: `scaleX(${fill})` }} /></div>
    <div className="gad-method-mini-note gad-method-reveal" data-visible={tick >= 22}><Check size={12} />Des campagnes suivies et ajustées</div>
  </div>
}

function ReportPreview({ tick }: { tick: number }) {
  return <div className="gad-method-preview gad-method-report" aria-hidden="true">
    <div className="gad-method-mini-heading"><ClipboardList size={14} /><span>Votre bilan de campagne</span></div>
    <div className="gad-method-report-row gad-method-reveal" data-visible={tick >= 5}><Phone size={13} /><span>Appels</span><Check size={12} /></div>
    <div className="gad-method-report-row gad-method-reveal" data-visible={tick >= 11}><FilePenLine size={13} /><span>Formulaires</span><Check size={12} /></div>
    <div className="gad-method-report-summary gad-method-reveal" data-visible={tick >= 17}><i /><i /><span>Analyse et prochaines actions</span></div>
  </div>
}

/** One shared timeline keeps the four demonstrations in order, including on mobile. */
export function GoogleAdsMethod() {
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
  // Server rendering and reduced motion both deliver complete, readable illustrations.
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

  return <div className="gad-method" data-running={running}>
    <ol className="gad-method-grid" aria-label="Les quatre étapes de la gestion de vos campagnes">
      {steps.map(({ title, icon: Icon, text }, index) => {
        const localTick = Math.min(ticksPerStep, Math.max(0, displayTick - index * ticksPerStep))
        const active = running && currentStep === index
        return <li className="gad-method-card" key={title} ref={element => { cards.current[index] = element }} data-active={active} data-complete={localTick >= ticksPerStep}>
          <div className="gad-method-heading"><span className="gad-method-icon"><Icon size={20} strokeWidth={1.65} aria-hidden="true" /></span><span className="gad-method-number">0{index + 1}</span></div>
          <h3>{title}</h3>
          <p className="gad-method-description">{text}</p>
          {index === 0 && <AuditPreview tick={localTick} />}
          {index === 1 && <CampaignPreview tick={localTick} />}
          {index === 2 && <LaunchPreview tick={localTick} />}
          {index === 3 && <ReportPreview tick={localTick} />}
        </li>
      })}
    </ol>
    <div className="gad-method-footer"><p>Illustration des étapes de votre accompagnement.</p>
      {hydrated && !reducedMotion && (complete ? <button type="button" onClick={() => { setTick(0); setPaused(false); if (!visibleCards[0]) cards.current[0]?.scrollIntoView({ block: 'center', behavior: 'smooth' }) }}><RotateCcw size={13} aria-hidden="true" />Rejouer les étapes</button> : <button type="button" onClick={() => setPaused(value => !value)}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}{paused ? 'Reprendre l’animation' : 'Mettre en pause'}</button>)}
    </div>
  </div>
}
