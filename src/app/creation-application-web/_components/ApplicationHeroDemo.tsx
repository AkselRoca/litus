'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from 'react'
import { useInView } from 'framer-motion'
import { ArrowRight, Check, CheckCheck, ClipboardList, FileCheck2, FileText, FolderOpen, LayoutDashboard, ListTodo, LockKeyhole, Pause, Play, RotateCcw, UsersRound } from 'lucide-react'
import './application-hero-demo.css'

const views = [{ label: 'Tableau', icon: LayoutDashboard }, { label: 'Espace client', icon: UsersRound }, { label: 'Pilotage', icon: ListTodo }]
const stages = ['Reçu', 'En cours', 'Terminé']
const duration = 8200
const subscribeHydration = () => () => {}
const hydratedSnapshot = () => true
const serverSnapshot = () => false
const motionSubscription = (callback: () => void) => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}
const motionSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const visibilitySubscription = (callback: () => void) => {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
const visibilitySnapshot = () => document.visibilityState === 'visible'
const visibleOnServer = () => true

/** Illustrative local project; changing its status never sends data to another service. */
export function ApplicationHeroDemo() {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const inView = useInView(root, { amount: .3 })
  const hydrated = useSyncExternalStore(subscribeHydration, hydratedSnapshot, serverSnapshot)
  const reduced = useSyncExternalStore(motionSubscription, motionSnapshot, serverSnapshot)
  const visible = useSyncExternalStore(visibilitySubscription, visibilitySnapshot, visibleOnServer)
  const [view, setView] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [manualStage, setManualStage] = useState<number | null>(null)
  const [opened, setOpened] = useState(false)
  const [approved, setApproved] = useState(false)
  const complete = elapsed >= duration
  const time = !hydrated || reduced ? duration : elapsed
  const stage = manualStage ?? (time >= 5200 ? 2 : time >= 2400 ? 1 : 0)

  useEffect(() => {
    if (!hydrated || reduced || !visible || !inView || !playing || complete || manualStage !== null) return
    let previous = performance.now()
    const timer = window.setInterval(() => {
      const now = performance.now()
      const delta = Math.min(now - previous, 200)
      previous = now
      setElapsed(value => Math.min(value + delta, duration))
    }, 50)
    return () => window.clearInterval(timer)
  }, [hydrated, reduced, visible, inView, playing, complete, manualStage])

  function selectView(index: number) { setView(index); setOpened(false) }
  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % views.length
    else if (event.key === 'ArrowLeft') next = (index + views.length - 1) % views.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = views.length - 1
    else return
    event.preventDefault(); selectView(next); tabs.current[next]?.focus()
  }
  function inspectStage(index: number) { setManualStage(index); setElapsed([0, 2400, 5200][index]); setPlaying(false); setApproved(false) }
  function playback() {
    if (complete) { setElapsed(0); setManualStage(null); setPlaying(true); setApproved(false); setOpened(false) }
    else if (!playing || manualStage !== null) { setManualStage(null); setPlaying(true) }
    else setPlaying(false)
  }

  return <div ref={root} className="app-hero-demo" data-hydrated={hydrated} data-stage={stage} data-view={view} role="group" aria-label="Démonstration interactive d’une application métier">
    <div className="app-hero-demo-stage"><div className="app-demo-frame">
      <div className="app-demo-header"><span><FolderOpen aria-hidden="true" /></span><strong>Votre espace de travail</strong><small>Projet d’exemple</small></div>
      <div className="app-demo-tabs" role="tablist" aria-label="Les vues de l’application">{views.map(({ label, icon: Icon }, index) => <button type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={view === index} tabIndex={view === index ? 0 : -1} ref={element => { tabs.current[index] = element }} onClick={() => selectView(index)} onKeyDown={event => onTabKey(event, index)} key={label}><Icon aria-hidden="true" /><span>{label}</span></button>)}</div>
      <div className="app-demo-project-title"><div><small>DOSSIER · P-014</small><strong>Un projet, du début au suivi.</strong></div><span data-complete={stage === 2}><i />{stages[stage]}</span></div>
      <div className="app-demo-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${view}`} tabIndex={0} onFocus={() => setPlaying(false)}>
        {view === 0 && <div className="app-demo-board">
          <div className="app-demo-columns">{stages.map((label, index) => <div key={label} data-active={stage === index}><button type="button" onClick={() => inspectStage(index)} aria-label={`Afficher le dossier : ${label}`} aria-pressed={stage === index}><i />{label}</button></div>)}</div>
          <button type="button" className="app-demo-moving-card" style={{ '--app-demo-position': stage } as CSSProperties} aria-expanded={opened} aria-controls={`${id}-detail`} onClick={() => { setOpened(value => !value); setPlaying(false) }}>
            <span className="app-demo-card-icon"><FolderOpen aria-hidden="true" />{stage === 2 && <Check aria-hidden="true" />}</span><strong>Portail client</strong><span className="app-demo-card-copy">Documents & échanges</span><span className="app-demo-assignee"><i>É</i><span>Votre équipe</span></span>
          </button>
          <div className="app-demo-board-detail" id={`${id}-detail`}><ClipboardList aria-hidden="true" /><span>{opened ? 'Dossier P-014 · responsable : votre équipe · accès client dédié.' : stage === 0 ? 'La demande rejoint le bon dossier.' : stage === 1 ? 'Les tâches et documents restent au même endroit.' : 'Le dossier est prêt à être partagé avec le client.'}</span></div>
        </div>}
        {view === 1 && <div className="app-demo-client"><div className="app-demo-client-heading"><span><LockKeyhole aria-hidden="true" /></span><div><strong>Bienvenue dans votre espace.</strong><p>Le projet et ses documents, à portée de main.</p></div></div><div className="app-demo-client-document"><FileText aria-hidden="true" /><div><strong>Votre dossier projet</strong><span>{stage < 2 ? 'En préparation par votre équipe' : 'Document disponible dans l’espace'}</span></div>{stage === 2 && <Check aria-hidden="true" />}</div><button type="button" className="app-demo-client-action" disabled={stage < 2 || approved} onClick={() => { setApproved(true); setPlaying(false) }}>{approved ? 'Réception confirmée' : stage < 2 ? 'Disponible à la livraison' : 'Confirmer la réception'}{approved ? <CheckCheck aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}</button><p className="app-demo-client-note">{approved ? 'Confirmation d’exemple, enregistrée uniquement ici.' : 'Des accès limités aux documents de votre projet.'}</p></div>}
        {view === 2 && <div className="app-demo-pilot"><p>Chaque étape laisse une trace.</p><ol>{[
          ['Demande reçue', 'Le dossier est centralisé.'], ['Équipe mobilisée', 'Les tâches sont attribuées.'], ['Dossier livré', approved ? 'Le client a confirmé sa réception.' : 'Les documents sont prêts à consulter.'],
        ].map(([title, detail], index) => <li key={title} data-done={stage >= index}><span>{stage >= index ? <Check aria-hidden="true" /> : index + 1}</span><div><strong>{title}</strong><small>{detail}</small></div></li>)}</ol></div>}
      </div>
      <div className="app-demo-bottom"><span><FileCheck2 aria-hidden="true" />{stage === 2 ? 'Un dossier clair, partagé avec les bonnes personnes.' : 'La même information pour votre équipe et vos clients.'}</span></div>
    </div></div>
    <div className="app-hero-demo-controls"><span>Aperçu illustratif · aucun envoi</span>{hydrated && !reduced && <button type="button" onClick={playback} aria-label={complete ? 'Rejouer le parcours application' : playing && manualStage === null ? 'Mettre le parcours application en pause' : 'Reprendre le parcours application'}>{complete ? <RotateCcw aria-hidden="true" /> : playing && manualStage === null ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{complete ? 'Rejouer' : playing && manualStage === null ? 'Pause' : 'Reprendre'}</button>}</div>
  </div>
}
