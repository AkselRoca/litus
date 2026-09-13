'use client'

import Image from 'next/image'
import {
  useEffect, useId, useRef, useState, useSyncExternalStore,
  type KeyboardEvent,
} from 'react'
import { useInView } from 'framer-motion'
import {
  ArrowRight, Building2, ChartNoAxesColumnIncreasing, Check, ChevronRight,
  CircleCheck, FileText, Globe2, Landmark, Layers3, Mail, MessageSquare,
  Pause, Play, RotateCcw,
} from 'lucide-react'
import './solutions-hero-demo.css'

type SolutionVariant = 'pme' | 'grands-comptes' | 'collectivites'
type SolutionsHeroDemoProps = { variant: SolutionVariant }

const content = {
  pme: {
    name: 'Votre entreprise', icon: Building2,
    headline: 'Votre métier.\nUne présence qui compte.',
    intro: 'Vos expertises, vos projets et un contact direct.',
    sections: ['L’entreprise', 'Nos expertises', 'Nos projets'],
    image: '/blog/photos/bureau-reunion-clair.webp',
    imageAlt: 'Une salle de réunion lumineuse, photographie d’illustration',
    siteNote: 'De la visibilité aux contacts', siteDetail: 'Un parcours clair vers votre équipe.',
    search: 'Votre expertise + votre ville',
    visibilityTitle: 'Être trouvé. Donner envie d’échanger.',
    channels: ['Recherche locale', 'Pages de services', 'Prise de contact'],
    visibilityNote: 'Les bons visiteurs', visibilityDetail: 'Une visibilité utile à votre activité.',
    followTitle: 'Chaque demande trouve sa place.',
    followIntro: 'Du premier message à la réponse de votre équipe.',
    steps: [
      { title: 'Une demande reçue', text: 'Le formulaire du site', icon: Mail },
      { title: 'Un besoin précisé', text: 'Un échange avec votre équipe', icon: MessageSquare },
      { title: 'Une réponse préparée', text: 'Un suivi simple et partagé', icon: FileText },
    ],
    followNote: 'Un contact suivi', followDetail: 'Votre équipe garde le fil.',
  },
  'grands-comptes': {
    name: 'Votre groupe', icon: Layers3,
    headline: 'Un groupe.\nUne présence cohérente.',
    intro: 'Une même exigence, pour toutes vos expertises.',
    sections: ['Le groupe', 'Nos expertises', 'Nos implantations'],
    image: '/blog/photos/bureau-minimal.webp',
    imageAlt: 'Un espace de travail avec ordinateur, photographie d’illustration',
    siteNote: 'Visibilité & contacts', siteDetail: 'Des parcours pensés pour vos publics.',
    search: 'Vos expertises, vos implantations',
    visibilityTitle: 'Vos expertises, au bon endroit.',
    channels: ['Contenus experts', 'Sites du groupe', 'Contacts qualifiés'],
    visibilityNote: 'Une présence structurée', visibilityDetail: 'Des contenus reliés à vos objectifs.',
    followTitle: 'Le bon échange, avec la bonne équipe.',
    followIntro: 'Une circulation claire de l’information.',
    steps: [
      { title: 'Une demande centralisée', text: 'Un point d’entrée identifié', icon: Mail },
      { title: 'La bonne équipe mobilisée', text: 'Une orientation par expertise', icon: Layers3 },
      { title: 'Un suivi partagé', text: 'Une réponse préparée ensemble', icon: FileText },
    ],
    followNote: 'Vos équipes, reliées', followDetail: 'Une information qui circule.',
  },
  collectivites: {
    name: 'Votre collectivité', icon: Landmark,
    headline: 'Votre territoire,\nau quotidien.',
    intro: 'Des informations utiles, faciles à retrouver.',
    sections: ['Vie locale', 'Vos démarches', 'Nous contacter'],
    image: '/blog/photos/bureau-reunion-clair.webp',
    imageAlt: 'Un espace de réunion lumineux, photographie d’illustration',
    siteNote: 'Des services plus visibles', siteDetail: 'Un accès clair à l’information.',
    search: 'Démarches + votre commune',
    visibilityTitle: 'L’information utile, facile à trouver.',
    channels: ['Recherche locale', 'Informations utiles', 'Démarches en ligne'],
    visibilityNote: 'Une information accessible', visibilityDetail: 'Des repères pour chaque habitant.',
    followTitle: 'Une démarche, des étapes claires.',
    followIntro: 'Un exemple de parcours entre habitants et services.',
    steps: [
      { title: 'La demande est déposée', text: 'Une démarche depuis le site', icon: FileText },
      { title: 'Le service est informé', text: 'La demande est orientée', icon: Landmark },
      { title: 'L’habitant est accompagné', text: 'Une réponse et un suivi lisibles', icon: MessageSquare },
    ],
    followNote: 'Une démarche suivie', followDetail: 'Un lien simple avec vos services.',
  },
} as const

const tabs = [
  { label: 'Site', icon: Globe2 },
  { label: 'Visibilité', icon: ChartNoAxesColumnIncreasing },
  { label: 'Suivi', icon: MessageSquare },
] as const

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
const duration = 3600

/** Fixed-size, illustrative journeys. The tabs change the view; no form or data is sent. */
export function SolutionsHeroDemo({ variant }: SolutionsHeroDemoProps) {
  const model = content[variant]
  const availableTabs = variant === 'collectivites' ? [tabs[0], tabs[1], { label: 'Services', icon: MessageSquare }, { label: 'Accessibilité', icon: CircleCheck }] : tabs
  const BrandIcon = model.icon
  const id = useId()
  const clipId = `${id}-curve-clip`
  const ref = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const inView = useInView(ref, { amount: .3 })
  const hydrated = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated)
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotion, getServerMotion)
  const visible = useSyncExternalStore(subscribeVisibility, getVisibility, getServerVisibility)
  const [active, setActive] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const complete = elapsed >= duration
  const staticPresentation = !hydrated || reducedMotion
  const effectiveElapsed = staticPresentation ? duration : elapsed
  const progress = Math.max(0, Math.min(1, (effectiveElapsed - 450) / 1700))
  const contactVisible = effectiveElapsed >= 2400
  const trendProgress = Math.max(0, Math.min(1, (effectiveElapsed - 2400) / 900))

  useEffect(() => {
    if (!hydrated || reducedMotion || !visible || !inView || !playing || complete) return
    const timer = window.setTimeout(() => setElapsed(value => Math.min(value + 40, duration)), 40)
    return () => window.clearTimeout(timer)
  }, [hydrated, reducedMotion, visible, inView, playing, complete, elapsed])

  function selectTab(index: number) {
    if (index === active) return
    setActive(index)
    setElapsed(0)
    setPlaying(true)
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % availableTabs.length
    else if (event.key === 'ArrowLeft') next = (index + availableTabs.length - 1) % availableTabs.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = availableTabs.length - 1
    else return
    event.preventDefault()
    selectTab(next)
    tabRefs.current[next]?.focus()
  }

  const note = active === 3 ? 'Des usages pris en compte' : active === 0 ? model.siteNote : active === 1 ? model.visibilityNote : model.followNote
  const noteDetail = active === 3 ? 'Principes illustrés, sans résultat d’audit.' : active === 0 ? model.siteDetail : active === 1 ? model.visibilityDetail : model.followDetail

  return (
    <div ref={ref} className="sol-hero-demo" data-variant={variant} data-hydrated={hydrated} data-animate={!staticPresentation} role="group" aria-label={`Aperçu interactif : ${model.name.toLowerCase()}`}>
      <div className="sol-hero-demo-stage">
        <div className="sol-demo-frame" aria-hidden="true" />
        <div className="sol-demo-browser-bar" aria-hidden="true"><span><i /><i /><i /></span><small>Un parcours pensé pour vous</small><span className="sol-demo-browser-line" /></div>

        <div className="sol-demo-tabs" role="tablist" aria-label="Explorer le parcours digital">
          {availableTabs.map((tab, index) => {
            const Icon = tab.icon
            return <button key={tab.label} ref={element => { tabRefs.current[index] = element }} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => selectTab(index)} onKeyDown={event => onTabKeyDown(event, index)}><Icon aria-hidden="true" />{tab.label}</button>
          })}
        </div>

        <div className="sol-demo-panel sol-demo-site" role="tabpanel" id={`${id}-panel-0`} aria-labelledby={`${id}-tab-0`} hidden={active !== 0} tabIndex={0}>
          <div className="sol-demo-site-masthead"><span><BrandIcon aria-hidden="true" />{model.name}</span><span aria-hidden="true"><i /><i /><i /></span></div>
          <div className="sol-demo-site-hero">
            <div className="sol-demo-site-copy"><span>Un site à votre image</span><p>{model.headline}</p><small>{model.intro}</small><span className="sol-demo-site-marker" aria-hidden="true"><span /> <ArrowRight /></span></div>
            {variant === 'collectivites' ? <div className="sol-demo-civic"><Landmark aria-hidden="true" /><span>Au service<br />des habitants.</span><div><FileText aria-hidden="true" /><p>Vos démarches<br /><small>Un accès simplifié</small></p></div></div> : <div className="sol-demo-site-photo"><Image src={model.image} alt={model.imageAlt} fill sizes="(max-width: 768px) 35vw, 210px" /><span>Vos projets prennent place.</span></div>}
          </div>
          <div className="sol-demo-site-sections">{model.sections.map((label, index) => <span key={label} data-ready={effectiveElapsed >= 500 + index * 500}><span>0{index + 1}</span>{label}<ChevronRight aria-hidden="true" /></span>)}</div>
        </div>

        <div className="sol-demo-panel sol-demo-visibility" role="tabpanel" id={`${id}-panel-1`} aria-labelledby={`${id}-tab-1`} hidden={active !== 1} tabIndex={0}>
          <div className="sol-demo-search"><Image src="/brands/google-color.svg" alt="Google" width={20} height={20} /><span>{model.search}</span><ArrowRight aria-hidden="true" /></div>
          <div className="sol-demo-chart-heading"><span>VISIBILITÉ SUR GOOGLE</span><p>{model.visibilityTitle}</p></div>
          <svg className="sol-demo-chart" viewBox="0 0 300 120" role="img" aria-label="Courbe illustrative d’une visibilité qui progresse, sans données chiffrées">
            <defs><clipPath id={clipId}><rect x="0" y="0" width={300 * progress} height="120" /></clipPath></defs>
            <g className="sol-demo-chart-grid"><path d="M8 22H292M8 60H292M8 98H292" /></g>
            <path className="sol-demo-chart-shadow" d="M8 103C40 99 36 82 67 85S107 57 133 64S167 40 191 43S225 36 243 24S271 29 292 9" />
            <path className="sol-demo-chart-area" clipPath={`url(#${clipId})`} d="M8 103C40 99 36 82 67 85S107 57 133 64S167 40 191 43S225 36 243 24S271 29 292 9V117H8Z" />
            <path className="sol-demo-chart-line" pathLength="100" strokeDasharray="100" strokeDashoffset={100 * (1 - progress)} d="M8 103C40 99 36 82 67 85S107 57 133 64S167 40 191 43S225 36 243 24S271 29 292 9" />
            <circle className="sol-demo-chart-point" cx="292" cy="9" r="4" opacity={progress >= .98 ? 1 : 0} />
          </svg>
          <div className="sol-demo-channels">{model.channels.map((channel, index) => <span key={channel}><i data-ready={effectiveElapsed >= 900 + index * 550} />{channel}</span>)}</div>
        </div>

        <div className="sol-demo-panel sol-demo-follow" role="tabpanel" id={`${id}-panel-2`} aria-labelledby={`${id}-tab-2`} hidden={active !== 2} tabIndex={0}>
          <div className="sol-demo-follow-heading"><span>DU PREMIER CONTACT AU SUIVI</span><p>{model.followTitle}</p><small>{model.followIntro}</small></div>
          <ol className="sol-demo-follow-steps">{model.steps.map((step, index) => {
            const Icon = step.icon
            const ready = effectiveElapsed >= 450 + index * 850
            return <li key={step.title} data-ready={ready}><span className="sol-demo-follow-icon"><Icon aria-hidden="true" /></span><div><strong>{step.title}</strong><span>{step.text}</span></div><span className="sol-demo-step-check" aria-hidden="true"><Check /></span></li>
          })}</ol>
        </div>

        {variant === 'collectivites' && <div className="sol-demo-panel sol-demo-civic-accessibility" role="tabpanel" id={`${id}-panel-3`} aria-labelledby={`${id}-tab-3`} hidden={active !== 3} tabIndex={0}><span>UN SERVICE POUR TOUS</span><p>Lire, naviguer,<br />terminer sa démarche.</p><ul>{['Navigation au clavier', 'Contrastes et textes lisibles', 'Formulaires compréhensibles', 'Documents et alternatives'].map(label => <li key={label}><CircleCheck size={17} aria-hidden="true" />{label}</li>)}</ul><small>Exemples de conception. La conformité nécessite une évaluation.</small></div>}
        <div className="sol-demo-result" data-ready={contactVisible} aria-hidden={!contactVisible}>
          {active === 0 ? <svg className="sol-demo-result-trend" viewBox="0 0 80 44" aria-hidden="true"><path className="sol-demo-trend-base" d="M3 39H77" /><path className="sol-demo-trend-line" pathLength="100" strokeDasharray="100" strokeDashoffset={100 * (1 - trendProgress)} d="M4 34C15 34 15 24 25 26S40 21 48 20S63 15 75 5" /><path className="sol-demo-trend-tip" d="M66 5H75V14" opacity={trendProgress >= .98 ? 1 : 0} /></svg> : <span className="sol-demo-result-icon">{active === 1 ? <ChartNoAxesColumnIncreasing aria-hidden="true" /> : <CircleCheck aria-hidden="true" />}</span>}
          <p><strong>{note}</strong><span>{noteDetail}</span></p>
        </div>
      </div>
      <div className="sol-hero-demo-controls"><span>Aperçu illustratif · explorez les onglets</span>{hydrated && !reducedMotion && <button type="button" onClick={() => { if (complete) { setElapsed(0); setPlaying(true) } else setPlaying(value => !value) }} aria-label={`${complete ? 'Rejouer' : playing ? 'Mettre en pause' : 'Reprendre'} l’aperçu ${availableTabs[active].label.toLowerCase()}`} aria-pressed={complete ? undefined : !playing}>{complete ? <RotateCcw aria-hidden="true" /> : playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{complete ? 'Rejouer' : playing ? 'Pause' : 'Reprendre'}</button>}</div>
    </div>
  )
}
