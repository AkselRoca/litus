'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react'
import { useInView } from 'framer-motion'
import { ArrowDown, Check, FileText, GitBranch, Globe2, Link2, Pause, Play, RotateCcw, Search, Settings2 } from 'lucide-react'
import './seo-strategy-demo.css'

const panels = [
  { label: 'Technique', icon: Settings2, title: 'Des pages accessibles.', note: 'Vérifier ce que le moteur peut explorer et comprendre.' },
  { label: 'Contenu', icon: FileText, title: 'Une réponse à la bonne question.', note: 'Relier la recherche à une page utile, précise et lisible.' },
  { label: 'Maillage', icon: GitBranch, title: 'Un parcours qui a du sens.', note: 'Aider le lecteur à passer du sujet à la solution.' },
] as const
const subscribeHydration = () => () => {}
const hydrationSnapshot = () => true
const serverHydration = () => false
const subscribeMotion = (cb: () => void) => { const m = window.matchMedia('(prefers-reduced-motion: reduce)'); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) }
const motionSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const serverMotion = () => false
const subscribeVisibility = (cb: () => void) => { document.addEventListener('visibilitychange', cb); return () => document.removeEventListener('visibilitychange', cb) }
const visibilitySnapshot = () => document.visibilityState === 'visible'
const serverVisibility = () => true

export function SeoStrategyDemo() {
  const id = useId(), ref = useRef<HTMLDivElement>(null), tabs = useRef<(HTMLButtonElement | null)[]>([])
  const inView = useInView(ref, { amount: .3 })
  const hydrated = useSyncExternalStore(subscribeHydration, hydrationSnapshot, serverHydration)
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, serverMotion)
  const visible = useSyncExternalStore(subscribeVisibility, visibilitySnapshot, serverVisibility)
  const [elapsed, setElapsed] = useState(0), [playing, setPlaying] = useState(true), [manual, setManual] = useState<number | null>(null)
  const phase = manual ?? (!hydrated || reduced ? 2 : Math.min(2, Math.floor(elapsed / 2800)))
  const complete = elapsed >= 8400
  const running = hydrated && !reduced && visible && inView && playing && !complete && manual === null
  useEffect(() => { if (!running) return; let last = performance.now(); const timer = window.setInterval(() => { const now = performance.now(); const delta = Math.min(now-last,200); last=now; setElapsed(v=>Math.min(8400,v+delta)) }, 80); return () => clearInterval(timer) }, [running])
  function select(index: number) { setManual(index); setElapsed(index * 2800); setPlaying(false) }
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) { const next = event.key === 'ArrowRight' ? (index+1)%3 : event.key === 'ArrowLeft' ? (index+2)%3 : event.key === 'Home' ? 0 : event.key === 'End' ? 2 : -1; if (next<0) return; event.preventDefault(); select(next); tabs.current[next]?.focus() }
  function replay() { setManual(null); setElapsed(0); setPlaying(true) }
  function playback() { if (manual !== null) { setManual(null); setPlaying(true) } else setPlaying(p=>!p) }
  return <div ref={ref} className="seo-plan-demo" data-phase={phase} data-running={running} role="group" aria-label="Démonstration des trois leviers du référencement naturel">
    <div className="seo-plan-window"><div className="seo-plan-top"><span><Globe2 aria-hidden="true" />Votre site, mieux structuré</span><small>Exemple illustratif</small></div>
      <div className="seo-plan-tabs" role="tablist" aria-label="Explorer les leviers SEO">{panels.map((item,index)=>{const Icon=item.icon;return <button key={item.label} type="button" role="tab" ref={el=>{tabs.current[index]=el}} id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={phase===index} tabIndex={phase===index?0:-1} onClick={()=>select(index)} onKeyDown={e=>onKey(e,index)}><Icon aria-hidden="true" />{item.label}</button>})}</div>
      <div className="seo-plan-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${phase}`}>
        <p className="seo-plan-overline">0{phase+1} — {panels[phase].label}</p><div className="seo-visual-title">{panels[phase].title}</div>
        <div className="seo-plan-illustration" key={phase}>
          {phase===0&&<div className="seo-plan-audit"><div className="seo-plan-address"><Globe2 aria-hidden="true" /><span>votre-site.fr / services</span></div>{['Une URL de référence','Un contenu lisible par le moteur','Des liens vers les pages utiles'].map(label=><div className="seo-plan-audit-line" key={label}><Check aria-hidden="true" /><span>{label}</span></div>)}<p>Les bases d’une page bien structurée.</p></div>}
          {phase===1&&<div className="seo-plan-search"><div><Search aria-hidden="true" /><span>comment choisir un logiciel de gestion</span></div><div className="seo-plan-result"><span>votre-site.fr · Guide pratique</span><strong>Choisir un logiciel adapté à votre équipe</strong><p>Les usages à comparer, les bonnes questions et les étapes pour préparer votre projet.</p><small>Aperçu éditorial · Affichage Google non garanti</small></div></div>}
          {phase===2&&<div className="seo-plan-map"><span><FileText aria-hidden="true" />Comprendre le besoin</span><ArrowDown aria-hidden="true" /><div><span><Link2 aria-hidden="true" />Comparer les solutions</span><span><Link2 aria-hidden="true" />Explorer le service</span></div><ArrowDown aria-hidden="true" /><strong>Échanger sur le projet</strong></div>}
        </div><p className="seo-plan-note">{panels[phase].note}</p>
      </div>
      <div className="seo-plan-controls"><p>Une stratégie pensée comme un ensemble.</p><div>{!reduced&&!complete&&<button type="button" onClick={playback} aria-label={playing&&manual===null?'Mettre la démonstration SEO en pause':'Reprendre la démonstration SEO'}>{playing&&manual===null?<Pause aria-hidden="true" />:<Play aria-hidden="true" />}</button>}<button type="button" onClick={replay} aria-label={reduced?'Revenir à la vue d’ensemble SEO':'Rejouer la démonstration SEO'}><RotateCcw aria-hidden="true" /></button></div></div>
    </div><p className="seo-plan-caption">Technique · Contenu · Maillage<span>Des priorités adaptées à votre site.</span></p>
  </div>
}
