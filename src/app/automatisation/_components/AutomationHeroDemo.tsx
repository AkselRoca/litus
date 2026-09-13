'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react'
import { useInView } from 'framer-motion'
import { ArrowDown, ArrowRight, Bell, Check, ClipboardCheck, Database, FileText, Inbox, Mail, Pause, Play, RotateCcw, Workflow } from 'lucide-react'
import './automation-hero-demo.css'

const scenarios = [
  { label: 'Formulaire', source: 'Une demande sur votre site', message: '« Nous souhaitons aménager nos bureaux. Pouvons-nous recevoir une proposition ? »', need: 'Aménagement de bureaux', origin: 'Formulaire du site', owner: 'Équipe commerciale' },
  { label: 'E-mail', source: 'Un message dans votre boîte', message: '« Voici les éléments pour notre projet. Pouvez-vous préparer un devis de maintenance ? »', need: 'Contrat de maintenance', origin: 'E-mail identifié', owner: 'Responsable du dossier' },
  { label: 'CRM', source: 'Un dossier passe à l’étape suivante', message: 'Le besoin est renseigné dans le CRM. Le dossier peut passer à la préparation de la proposition.', need: 'Accompagnement mensuel', origin: 'Statut du dossier CRM', owner: 'Chargé de projet' },
] as const
const steps = [
  { title: 'Demande reçue', short: 'Demande', text: 'Le bon déclencheur', icon: Inbox },
  { title: 'CRM à jour', short: 'CRM', text: 'Un dossier centralisé', icon: Database },
  { title: 'Devis préparé', short: 'Devis', text: 'À vérifier par l’équipe', icon: FileText },
  { title: 'Équipe informée', short: 'Notification', text: 'La suite est attribuée', icon: Bell },
] as const
const starts = [0, 1900, 3900, 6000]
const duration = 8500
const subscribeHydration = () => () => {}
const hydratedSnapshot = () => true
const serverHydratedSnapshot = () => false
const subscribeMotion = (callback: () => void) => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}
const motionSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const serverMotionSnapshot = () => false
const subscribeVisibility = (callback: () => void) => {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
const visibilitySnapshot = () => document.visibilityState === 'visible'
const serverVisibilitySnapshot = () => true

/** A browser-only example: no real contacts, requests or software connections. */
export function AutomationHeroDemo() {
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const inView = useInView(ref, { amount: .3 })
  const hydrated = useSyncExternalStore(subscribeHydration, hydratedSnapshot, serverHydratedSnapshot)
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, serverMotionSnapshot)
  const visible = useSyncExternalStore(subscribeVisibility, visibilitySnapshot, serverVisibilitySnapshot)
  const [scenario, setScenario] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [manualStep, setManualStep] = useState<number | null>(null)
  const model = scenarios[scenario]
  const complete = elapsed >= duration
  const staticView = !hydrated || reduced
  const phase = manualStep ?? (staticView ? 3 : elapsed >= 6000 ? 3 : elapsed >= 3900 ? 2 : elapsed >= 1900 ? 1 : 0)
  const running = hydrated && !reduced && visible && inView && playing && !complete && manualStep === null

  useEffect(() => {
    if (!running) return
    let lastTick = performance.now()
    const timer = window.setInterval(() => {
      const now = performance.now()
      const delta = Math.min(200, now - lastTick)
      lastTick = now
      setElapsed(value => Math.min(duration, value + delta))
    }, 50)
    return () => window.clearInterval(timer)
  }, [running, scenario])

  function selectScenario(index: number) {
    setScenario(index)
    setElapsed(0)
    setManualStep(null)
    setPlaying(true)
  }
  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % scenarios.length : event.key === 'ArrowLeft' ? (index + scenarios.length - 1) % scenarios.length : event.key === 'Home' ? 0 : event.key === 'End' ? scenarios.length - 1 : -1
    if (next < 0) return
    event.preventDefault()
    selectScenario(next)
    tabRefs.current[next]?.focus()
  }
  function inspect(index: number) {
    setManualStep(index)
    setElapsed(starts[index])
    setPlaying(false)
  }
  function replay() {
    setManualStep(null)
    setElapsed(0)
    setPlaying(true)
  }
  function togglePlayback() {
    if (manualStep !== null) { setManualStep(null); setPlaying(true) }
    else setPlaying(value => !value)
  }

  return <div ref={ref} className="auto-demo" data-phase={phase} data-running={running} data-motion={!staticView} data-scenario={scenario} role="group" aria-label="Démonstration d’un scénario d’automatisation">
    <div className="auto-demo-frame">
      <div className="auto-demo-top"><span className="auto-demo-brand"><Workflow aria-hidden="true" /></span><div><strong>Vos outils, dans le bon ordre.</strong><span>Un scénario adapté à votre activité</span></div><span className="auto-demo-example">Exemple</span></div>
      <div className="auto-demo-tabs" role="tablist" aria-label="Choisir le déclencheur du scénario">{scenarios.map((item, index) => <button key={item.label} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={index === scenario} tabIndex={index === scenario ? 0 : -1} ref={element => { tabRefs.current[index] = element }} onClick={() => selectScenario(index)} onKeyDown={event => onTabKey(event, index)}>{item.label}</button>)}</div>
      <div className="auto-demo-body" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${scenario}`}>
        <ol className="auto-demo-flow" aria-label="Parcours de la demande">{steps.map((item, index) => {
          const Icon = item.icon
          return <li key={item.title} data-state={index < phase ? 'done' : index === phase ? 'current' : 'next'}>
            <button type="button" onClick={() => inspect(index)} aria-label={`Voir l’étape ${index + 1} : ${item.title}`} aria-current={phase === index ? 'step' : undefined}><span className="auto-demo-node-icon"><Icon aria-hidden="true" /></span><span className="auto-demo-node-copy"><strong>{item.title}</strong><small>{item.text}</small></span><span className="auto-demo-node-short">{item.short}</span><span className="auto-demo-node-state" aria-hidden="true">{index < phase ? <Check /> : `0${index + 1}`}</span></button>
            {index < steps.length - 1 && <span className="auto-demo-connector" aria-hidden="true"><i /><ArrowDown /></span>}
          </li>
        })}</ol>
        <div className="auto-demo-detail">
          <div className="auto-demo-document" key={`${scenario}-${phase}`}>
            <p className="auto-demo-document-label">{phase === 0 ? <Mail aria-hidden="true" /> : phase === 1 ? <Database aria-hidden="true" /> : <FileText aria-hidden="true" />}{phase === 0 ? 'Point de départ' : phase === 1 ? 'Votre dossier CRM' : 'Proposition commerciale'}<span>{phase < 2 ? 'Exemple' : 'Brouillon'}</span></p>
            {phase === 0 ? <><div className="seo-visual-title">{model.source}</div><blockquote>{model.message}</blockquote><p className="auto-demo-field-note">Les champs utiles sont transmis au scénario.</p></> : <><div className="seo-visual-title">{phase === 1 ? 'Entreprise exemple' : 'Un devis prêt à vérifier.'}</div><dl><div><dt>Besoin</dt><dd>{model.need}</dd></div><div><dt>{phase === 1 ? 'Source' : 'Dossier'}</dt><dd>{phase === 1 ? model.origin : 'Entreprise exemple'}</dd></div><div><dt>Suivi</dt><dd>{model.owner}</dd></div></dl><div className="auto-demo-validation"><ClipboardCheck aria-hidden="true" /><span>{phase === 1 ? 'Informations réunies dans une seule fiche.' : 'Votre équipe vérifie les prestations et le prix avant tout envoi.'}</span></div></>}
          </div>
          <div className="auto-demo-notification" data-ready={phase === 3}><span><Bell aria-hidden="true" /></span><p><strong>{phase === 3 ? 'Votre équipe prend le relais.' : 'La suite du parcours'}</strong><small>{phase === 3 ? 'Le dossier et le devis sont accessibles depuis la notification.' : 'La notification est préparée après la mise à jour du dossier.'}</small></p>{phase === 3 && <Check aria-hidden="true" />}</div>
        </div>
        <div className="auto-demo-mobile-panel">
          <p className="auto-demo-mobile-label">{phase === 0 ? model.origin : phase === 1 ? 'Entreprise exemple' : phase === 2 ? 'Brouillon de devis' : 'Notification interne'}<span>{phase < 2 ? 'Exemple' : phase === 2 ? 'À valider' : 'Dossier prêt'}</span></p>
          <div className="seo-visual-title">{phase === 0 ? 'Une nouvelle demande.' : phase === 1 ? 'Les informations sont réunies.' : phase === 2 ? 'Un devis prêt à vérifier.' : 'Votre équipe prend le relais.'}</div>
          <p>{phase === 0 ? model.need : phase === 1 ? `${model.need} · ${model.owner}` : phase === 2 ? 'Prestations et prix à valider avant envoi.' : 'Le dossier et le devis sont prêts.'}</p>
        </div>
      </div>
      <div className="auto-demo-footer"><p><span aria-hidden="true" />{manualStep !== null ? `Lecture de l’étape ${manualStep + 1}` : staticView || complete ? 'Le parcours est prêt à être relu.' : playing ? 'Le scénario se déroule…' : 'Démonstration en pause'}</p><div>{!reduced && !complete && <button type="button" onClick={togglePlayback} aria-label={playing && manualStep === null ? 'Mettre la démonstration en pause' : 'Reprendre la démonstration'}>{playing && manualStep === null ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}</button>}<button type="button" onClick={replay} aria-label={reduced ? 'Revenir au récapitulatif du scénario' : 'Rejouer le scénario'}><RotateCcw aria-hidden="true" /></button></div></div>
    </div>
    <div className="auto-demo-caption"><span><Check aria-hidden="true" />Vos règles à chaque étape</span><span><ArrowRight aria-hidden="true" />Données simulées · Aucun envoi</span></div>
  </div>
}
