'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { ArrowRight, Check, CheckCheck, Code2, Database, FileCheck2, Layers3, Pause, Play, PlugZap, RotateCcw, ShoppingBag, SlidersHorizontal } from 'lucide-react'
import './technical-demo.css'

function useDemonstration(ref: RefObject<HTMLDivElement | null>) {
  const [stage, setStage] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => { setReduced(media.matches); if (media.matches) setStage(2) }
    const frame = requestAnimationFrame(updateMotion)
    const updateVisibility = () => setTabVisible(!document.hidden)
    const observer = new IntersectionObserver(entries => setVisible(entries[0]?.isIntersecting ?? false), { threshold: .3 })
    if (ref.current) observer.observe(ref.current)
    media.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); media.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility) }
  }, [ref])
  useEffect(() => {
    if (paused || reduced || !visible || !tabVisible || stage === 2) return
    const timer = window.setTimeout(() => setStage(current => Math.min(current + 1, 2)), 2500)
    return () => clearTimeout(timer)
  }, [paused, reduced, visible, tabVisible, stage])
  return { stage, paused, reduced, setPaused, select: (value: number) => { setStage(value); setPaused(true) }, replay: () => { setStage(0); setPaused(reduced) } }
}

function DemoControls({ demo, label }: { demo: ReturnType<typeof useDemonstration>; label: string }) {
  return <div className="technical-demo-controls"><span>{label} · Exemple interactif</span><div>{!demo.reduced && demo.stage < 2 && <button type="button" aria-label={demo.paused ? 'Reprendre la démonstration' : 'Mettre la démonstration en pause'} onClick={() => demo.setPaused(!demo.paused)}>{demo.paused ? <Play /> : <Pause />}</button>}<button type="button" aria-label="Rejouer la démonstration" onClick={demo.replay}><RotateCcw /></button></div></div>
}

export function DevelopmentDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const demo = useDemonstration(ref)
  const [type, setType] = useState('Aménagement')
  const [plans, setPlans] = useState(true)
  const [visit, setVisit] = useState(false)
  const steps = ['Le besoin', 'Les options', 'Le récapitulatif']
  return <div ref={ref} className="technical-demo development-demo" onFocusCapture={() => demo.setPaused(true)} onPointerDownCapture={() => demo.setPaused(true)}>
    <div className="technical-demo-window">
      <div className="technical-demo-top"><span><SlidersHorizontal />Un configurateur, dans votre site.</span><small>Module sur mesure</small></div>
      <div className="technical-demo-steps" aria-label="Étapes du configurateur">{steps.map((step, i) => <button key={step} type="button" aria-current={demo.stage === i ? 'step' : undefined} onClick={() => demo.select(i)}><span>{i < demo.stage ? <Check /> : `0${i + 1}`}</span>{step}</button>)}</div>
      <div className="dev-config-panel" key={demo.stage}>
        <div className="dev-config-heading"><small>VOTRE PROJET, PLUS PRÉCIS</small><strong>{['Qu’aimeriez-vous réaliser ?', 'Ce qui compte pour vous.', 'Une demande prête à qualifier.'][demo.stage]}</strong></div>
        {demo.stage === 0 && <div className="dev-choice-list">{['Aménagement', 'Rénovation', 'Agrandissement'].map(value => <button type="button" key={value} aria-pressed={type === value} onClick={() => { setType(value); demo.setPaused(true) }}><Layers3 /><span>{value}</span><i>{type === value && <Check />}</i></button>)}</div>}
        {demo.stage === 1 && <div className="dev-config-options"><p>Choisissez les éléments à ajouter à votre demande.</p><label><input type="checkbox" checked={plans} onChange={event => { setPlans(event.target.checked); demo.setPaused(true) }} /><span>Joindre mes plans<small>Préciser le contexte du projet</small></span></label><label><input type="checkbox" checked={visit} onChange={event => { setVisit(event.target.checked); demo.setPaused(true) }} /><span>Prévoir une visite<small>Échanger avant d’établir le devis</small></span></label></div>}
        {demo.stage === 2 && <div className="dev-config-summary"><FileCheck2 /><strong>{type}</strong><p>{[plans ? 'Plans à joindre' : '', visit ? 'Visite souhaitée' : 'Premier échange à distance'].filter(Boolean).join(' · ')}</p><span><CheckCheck />Informations réunies, sans ressaisie.</span></div>}
      </div>
      <div className="dev-config-bottom"><span><Code2 />Vos règles, intégrées au parcours.</span><button type="button" onClick={() => demo.select(demo.stage === 2 ? 0 : demo.stage + 1)}>{demo.stage === 2 ? 'Modifier' : 'Continuer'}<ArrowRight /></button></div>
    </div><DemoControls demo={demo} label="Aucune demande envoyée" />
  </div>
}

export function IntegrationDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const demo = useDemonstration(ref)
  const [incident, setIncident] = useState(false)
  const stage = demo.stage
  return <div ref={ref} className="technical-demo integration-demo" onFocusCapture={() => demo.setPaused(true)} onPointerDownCapture={() => demo.setPaused(true)}>
    <div className="technical-demo-window">
      <div className="technical-demo-top"><span><PlugZap />La bonne donnée, au bon endroit.</span><small>Connexion d’exemple</small></div>
      <div className="api-demo-flow" data-stage={stage} aria-label="Parcours de la synchronisation">
        {[{ icon: ShoppingBag, label: 'Votre boutique' }, { icon: PlugZap, label: 'Le connecteur' }, { icon: Database, label: 'Votre CRM' }].map(({ icon: Icon, label }, i) => <button type="button" key={label} aria-current={stage === i ? 'step' : undefined} onClick={() => demo.select(i)}><span><Icon /></span><strong>{label}</strong>{i < 2 && <ArrowRight className="api-demo-arrow" aria-hidden="true" />}</button>)}
      </div>
      <div className="api-demo-record" key={`${stage}-${incident}`}><div><small>COMMANDE D’EXEMPLE · C-014</small><span className={incident ? 'is-waiting' : ''}>{incident ? 'À reprendre' : ['Reçue', 'Vérifiée', 'Synchronisée'][stage]}</span></div><strong>{incident ? 'Le CRM est indisponible.' : ['Une commande est reçue.', 'Les champs sont associés.', 'Le dossier est à jour.'][stage]}</strong>
        <div className="api-demo-mapping"><span>email_client<ArrowRight />Contact</span><span>numero_commande<ArrowRight />Référence</span><span>montant_total<ArrowRight />Montant</span></div>
        <p>{incident ? 'L’événement est conservé pour une nouvelle tentative.' : ['Le connecteur reçoit les informations à transmettre.', 'Formats, champs requis et doublons sont contrôlés.', 'La référence C-014 est enregistrée dans le suivi.'][stage]}</p>
      </div>
      <div className="api-demo-recovery"><span>{incident ? 'Le service répond à nouveau ?' : 'Et si un logiciel ne répond pas ?'}</span><button type="button" onClick={() => { setIncident(!incident); demo.select(2) }}>{incident ? 'Réessayer' : 'Simuler une interruption'}<ArrowRight /></button></div>
    </div><DemoControls demo={{ ...demo, replay: () => { setIncident(false); demo.replay() } }} label="Données fictives" />
  </div>
}
