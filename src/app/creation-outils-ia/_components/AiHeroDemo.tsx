'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react'
import { useInView } from 'framer-motion'
import {
  ArrowRight, BookOpen, Check, ClipboardCheck, Database, FileSearch,
  FileSpreadsheet, FileText, Mail, Pause, Play, RotateCcw, UserRoundCheck,
  Workflow, type LucideIcon,
} from 'lucide-react'
import './ai-hero-demo.css'

type Source = { label: string; detail: string; icon: LucideIcon }
type Field = { label: string; value: string }
type DemoCase = {
  id: string; label: string; accessibleLabel: string; icon: LucideIcon
  request: string; attachment: string; requestLabel: string
  sources: Source[]; findings: Field[]; analysisNote: string
  action: string; resultTitle: string; resultFields?: Field[]
  answer?: string; citations?: string[]
}

const examples: DemoCase[] = [
  {
    id: 'prospects', label: 'Prospects', accessibleLabel: 'Qualification des prospects', icon: Mail,
    requestLabel: 'Une demande entrante',
    request: '« Nous souhaitons une boutique en ligne pour notre activité. »',
    attachment: 'Message du formulaire',
    sources: [
      { label: 'Formulaire', detail: 'Le besoin exprimé', icon: Mail },
      { label: 'Historique CRM', detail: 'Le contexte disponible', icon: Database },
      { label: 'Vos offres', detail: 'Les services proposés', icon: BookOpen },
    ],
    findings: [{ label: 'Besoin', value: 'E-commerce' }, { label: 'À préciser', value: 'Budget, échéance' }, { label: 'Prochain pas', value: 'Un échange' }],
    analysisNote: 'L’outil signale aussi les informations à compléter.',
    action: 'Préparer une fiche CRM', resultTitle: 'Une fiche CRM prête',
    resultFields: [{ label: 'Besoin identifié', value: 'Boutique en ligne' }, { label: 'À compléter', value: 'Budget & calendrier' }],
  },
  {
    id: 'recherche', label: 'Recherche', accessibleLabel: 'Recherche documentaire', icon: FileSearch,
    requestLabel: 'Une question à résoudre',
    request: '« Comment préparer le lancement d’un nouveau projet ? »',
    attachment: 'Question à votre base interne',
    sources: [
      { label: 'Guide projet', detail: 'Objectif et périmètre', icon: BookOpen },
      { label: 'Procédure', detail: 'Les étapes de validation', icon: FileText },
      { label: 'Notes d’équipe', detail: 'Le contexte du projet', icon: Database },
    ],
    findings: [{ label: 'Sujet', value: 'Nouveau projet' }, { label: 'Sources utiles', value: 'Deux extraits' }, { label: 'À vérifier', value: 'Le contexte' }],
    analysisNote: 'Les passages retenus restent associés à leur source.',
    action: 'Rédiger une réponse sourcée', resultTitle: 'Une réponse sourcée',
    answer: 'Précisez l’objectif et le périmètre [1], puis validez les étapes [2].',
    citations: ['[1] Guide projet', '[2] Procédure'],
  },
  {
    id: 'documents', label: 'Documents', accessibleLabel: 'Extraction et traitement de documents', icon: FileSpreadsheet,
    requestLabel: 'Un document à traiter',
    request: '« Extraire la référence et le montant de ce devis. »',
    attachment: 'Devis_exemple.pdf',
    sources: [
      { label: 'Devis PDF', detail: 'Le document reçu', icon: FileText },
      { label: 'Référentiel', detail: 'Les champs attendus', icon: Database },
      { label: 'Règles métier', detail: 'Les points à contrôler', icon: ClipboardCheck },
    ],
    findings: [{ label: 'Document', value: 'Un devis' }, { label: 'Référence', value: 'DV-014' }, { label: 'À contrôler', value: 'Montant, TVA' }],
    analysisNote: 'Les champs extraits sont préparés pour votre contrôle.',
    action: 'Préparer les données à importer', resultTitle: 'Des données structurées',
    resultFields: [{ label: 'Référence', value: 'DV-014' }, { label: 'Montant HT', value: '1 200,00 €' }],
  },
]

const phaseLabels = ['Demande', 'Sources', 'Analyse', 'Action', 'Résultat']
const phaseStart = [0, 1500, 3000, 4600, 6200]
const duration = 8200
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

/** A local demonstration only: all examples and the validation action stay in component state. */
export function AiHeroDemo() {
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)
  const caseRefs = useRef<(HTMLButtonElement | null)[]>([])
  const resultHeading = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { amount: .3 })
  const hydrated = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated)
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotion, getServerMotion)
  const pageVisible = useSyncExternalStore(subscribeVisibility, getVisibility, getServerVisibility)
  const [activeCase, setActiveCase] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [manualPhase, setManualPhase] = useState<number | null>(null)
  const [approved, setApproved] = useState(false)
  const [focusResult, setFocusResult] = useState(false)
  const model = examples[activeCase]
  const staticPresentation = !hydrated || reducedMotion
  const complete = elapsed >= duration
  const effectiveElapsed = staticPresentation ? duration : elapsed
  const phase = manualPhase ?? (effectiveElapsed >= 6200 ? 4 : effectiveElapsed >= 4600 ? 3 : effectiveElapsed >= 3000 ? 2 : effectiveElapsed >= 1500 ? 1 : 0)
  const phaseElapsed = manualPhase !== null ? duration : effectiveElapsed - phaseStart[phase]

  useEffect(() => {
    if (!hydrated || reducedMotion || !pageVisible || !inView || !playing || complete || manualPhase !== null) return
    let lastTick = performance.now()
    const timer = window.setInterval(() => {
      const now = performance.now()
      const delta = Math.min(now - lastTick, 200)
      lastTick = now
      setElapsed(value => Math.min(value + delta, duration))
    }, 50)
    return () => window.clearInterval(timer)
  }, [hydrated, reducedMotion, pageVisible, inView, playing, complete, manualPhase, activeCase])

  useEffect(() => {
    if (focusResult && phase === 4) resultHeading.current?.focus({ preventScroll: true })
  }, [focusResult, phase])

  function selectCase(index: number) {
    if (index === activeCase) return
    setActiveCase(index)
    setElapsed(0)
    setManualPhase(null)
    setApproved(false)
    setFocusResult(false)
    setPlaying(true)
  }

  function onCaseKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % examples.length
    else if (event.key === 'ArrowLeft') next = (index + examples.length - 1) % examples.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = examples.length - 1
    else return
    event.preventDefault()
    selectCase(next)
    caseRefs.current[next]?.focus()
  }

  function inspectPhase(index: number) {
    setManualPhase(index)
    setElapsed(phaseStart[index])
    setFocusResult(false)
    setPlaying(false)
  }

  function validateExample() {
    setApproved(true)
    setManualPhase(4)
    setElapsed(duration)
    setPlaying(false)
    setFocusResult(true)
  }

  function playback() {
    setFocusResult(false)
    if (complete) {
      setElapsed(0)
      setApproved(false)
      setManualPhase(null)
      setPlaying(true)
    } else if (manualPhase !== null || !playing) {
      setManualPhase(null)
      setPlaying(true)
    } else setPlaying(false)
  }

  return (
    <div ref={ref} className="ai-hero-demo" data-hydrated={hydrated} data-animate={!staticPresentation} data-case={model.id} data-phase={phase} role="group" aria-label="Démonstration interactive d’un outil IA métier">
      <p className="ai-demo-sr-only">Un exemple passe de la demande aux sources, puis à l’analyse, à une action proposée et à un résultat à valider. Vous pouvez changer de cas ou choisir une étape. Aucune donnée n’est envoyée.</p>
      <div className="ai-hero-demo-stage">
        <div className="ai-demo-frame">
          <div className="ai-demo-header"><span className="ai-demo-mark"><Workflow aria-hidden="true" /></span><strong>Votre assistant métier</strong><span className="ai-demo-header-label">Démonstration</span></div>

          <div className="ai-demo-cases" role="tablist" aria-label="Choisir un cas métier">
            {examples.map((item, index) => {
              const Icon = item.icon
              return <button key={item.id} ref={element => { caseRefs.current[index] = element }} type="button" role="tab" id={`${id}-case-${index}`} aria-label={item.accessibleLabel} aria-selected={activeCase === index} aria-controls={`${id}-panel`} tabIndex={activeCase === index ? 0 : -1} onClick={() => selectCase(index)} onKeyDown={event => onCaseKeyDown(event, index)}><Icon aria-hidden="true" />{item.label}</button>
            })}
          </div>

          <ol className="ai-demo-steps" aria-label="Les étapes de la démonstration">
            {phaseLabels.map((label, index) => <li key={label} data-state={index < phase ? 'done' : index === phase ? 'current' : 'next'}><button type="button" onClick={() => inspectPhase(index)} aria-label={`Étape ${index + 1} : ${label}`} aria-current={index === phase ? 'step' : undefined}><span>{index < phase ? <Check aria-hidden="true" /> : <span aria-hidden="true">{index + 1}</span>}</span><span>{label}</span></button></li>)}
          </ol>

          <div className="ai-demo-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-case-${activeCase}`} tabIndex={0} onFocus={() => setPlaying(false)}>
            <div key={`${model.id}-${phase}`} className={`ai-demo-phase ai-demo-phase-${phase}`}>
              {phase === 0 && <>
                <p className="ai-demo-phase-heading"><Mail aria-hidden="true" />{model.requestLabel}</p>
                <blockquote>{model.request}</blockquote>
                <span className="ai-demo-attachment"><FileText aria-hidden="true" />{model.attachment}<Check aria-hidden="true" /></span>
              </>}

              {phase === 1 && <>
                <p className="ai-demo-phase-heading">Vos sources rapprochées</p>
                <p className="ai-demo-phase-note">Plusieurs entrées, un même contexte.</p>
                <ul className="ai-demo-sources">{model.sources.map((source, index) => {
                  const Icon = source.icon
                  const ready = staticPresentation || phaseElapsed >= 200 + index * 350
                  return <li key={source.label} data-ready={ready}><Icon aria-hidden="true" /><strong>{source.label}</strong><span>{source.detail}</span><i aria-hidden="true"><Check /></i></li>
                })}</ul>
              </>}

              {phase === 2 && <>
                <p className="ai-demo-phase-heading">L’information prend forme</p>
                <dl className="ai-demo-analysis">{model.findings.map((finding, index) => <div key={finding.label} data-ready={staticPresentation || phaseElapsed >= 100 + index * 400}><span aria-hidden="true"><Check /></span><dt>{finding.label}</dt><dd>{finding.value}</dd></div>)}</dl>
                <p className="ai-demo-phase-note ai-demo-analysis-note">{model.analysisNote}</p>
              </>}

              {phase === 3 && <>
                <p className="ai-demo-phase-heading">{model.action}</p>
                <div className="ai-demo-human"><UserRoundCheck aria-hidden="true" /><div><strong>Vous gardez la main.</strong><span>Votre équipe contrôle avant d’agir.</span></div></div>
                <button type="button" className="ai-demo-approve" onFocus={() => setPlaying(false)} onPointerEnter={() => setPlaying(false)} onClick={validateExample}>Valider l’exemple<ArrowRight aria-hidden="true" /></button>
              </>}

              {phase === 4 && <>
                <div className="ai-demo-result-heading"><p ref={resultHeading} tabIndex={-1} className="ai-demo-phase-heading">{model.resultTitle}</p><span data-approved={approved}>{approved ? <Check aria-hidden="true" /> : <UserRoundCheck aria-hidden="true" />}{approved ? 'Validé' : 'À valider'}</span></div>
                {model.resultFields && <dl className="ai-demo-result-fields">{model.resultFields.map(field => <div key={field.label}><dt>{field.label}</dt><dd>{field.value}</dd></div>)}</dl>}
                {model.answer && <div className="ai-demo-answer"><p>{model.answer}</p><div aria-label="Sources illustratives">{model.citations?.map(citation => <span key={citation}><BookOpen aria-hidden="true" />{citation}</span>)}</div></div>}
                <p className="ai-demo-result-note"><ClipboardCheck aria-hidden="true" />{approved ? 'Validation simulée. Aucun envoi effectué.' : 'Un résultat utilisable, à relire par votre équipe.'}</p>
              </>}
            </div>
          </div>
        </div>
      </div>
      <div className="ai-hero-demo-controls"><span>Données d’exemple · aucun envoi</span>{hydrated && !reducedMotion && <button type="button" onClick={playback} aria-label={complete ? 'Rejouer la démonstration IA' : playing && manualPhase === null ? 'Mettre la démonstration IA en pause' : 'Reprendre la démonstration IA'} aria-pressed={complete ? undefined : !playing}>{complete ? <RotateCcw aria-hidden="true" /> : playing && manualPhase === null ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{complete ? 'Rejouer' : playing && manualPhase === null ? 'Pause' : 'Reprendre'}</button>}</div>
    </div>
  )
}
