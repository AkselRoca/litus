'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useInView } from 'framer-motion'
import { ArrowDown, ArrowRight, Check, CheckCheck, ChevronRight, CircleCheck, Code2, FileText, Mail, MousePointer2, Palette, RotateCcw, Search, Settings2, TrendingUp } from 'lucide-react'
import './vitrine-growth-demos.css'

const query = 'plombier à Lorient'
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

/** A short, one-time demonstration, paused when it leaves the screen. */
function useDemoProgress() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: .35 })
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion)
  const visible = useSyncExternalStore(subscribeVisibility, getVisibility, getServerVisibility)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView || !visible || reducedMotion || step >= 60) return
    const timer = window.setTimeout(() => setStep(previous => Math.min(previous + 1, 60)), 65)
    return () => window.clearTimeout(timer)
  }, [inView, visible, reducedMotion, step])

  return { ref, step: reducedMotion ? 60 : step, reducedMotion, restart: () => setStep(0), setStep }
}

function SearchDemo() {
  const { ref, step, reducedMotion, restart } = useDemoProgress()
  const visibleQuery = query.slice(0, Math.max(0, step - 5))
  const hasResult = step >= 32

  return (
    <article ref={ref} className="vitrine-demo-card vitrine-demo-search-card">
      <div className="vitrine-demo-card-heading"><span className="vitrine-demo-symbol"><Search aria-hidden="true" /></span><h3>Soyez trouvé sur Google</h3></div>
      <p className="vitrine-demo-description">Un site rapide, bien structuré et pensé pour les recherches de vos futurs clients, près de chez vous.</p>
      <div className="vitrine-demo-stage vitrine-demo-search-stage" aria-label="Exemple illustratif d’une recherche locale">
        <div className="vitrine-demo-search-box"><Image src="/brands/google-color.svg" alt="Google" width={23} height={23} /><span>{visibleQuery}<i className={step > 4 && step < 28 ? 'vitrine-demo-caret is-visible' : 'vitrine-demo-caret'} aria-hidden="true" /></span><Search size={16} aria-hidden="true" /></div>
        <div className="vitrine-demo-search-tabs" aria-hidden="true"><b>Tous</b><span>Maps</span><span>Images</span></div>
        <div className={`vitrine-demo-result ${hasResult ? 'is-visible' : ''}`} aria-hidden={!hasResult}>
          <div className="vitrine-demo-result-site"><span>A</span><p>Atelier local<small>atelier-local.example</small></p></div>
          <p className="vitrine-demo-result-title">Votre plombier à Lorient</p>
          <p className="vitrine-demo-result-description">Une équipe de proximité pour vos travaux et vos dépannages. Parlons de votre besoin.</p>
          <div className="vitrine-demo-result-links"><span>Nos services</span><span>Nous contacter</span></div>
        </div>
        <div className="vitrine-demo-search-placeholder" aria-hidden="true"><i /><i /></div>
      </div>
      <DemoFooter reducedMotion={reducedMotion} restart={restart} label="Exemple de recherche locale" />
    </article>
  )
}

function ConversionDemo() {
  const { ref, step, reducedMotion, restart, setStep } = useDemoProgress()
  const phase = step < 20 ? 'visit' : step < 48 ? 'form' : 'sent'

  return (
    <article ref={ref} className="vitrine-demo-card vitrine-demo-conversion-card">
      <div className="vitrine-demo-card-heading"><span className="vitrine-demo-symbol"><MousePointer2 aria-hidden="true" /></span><h3>Transformez les visites en prospects</h3></div>
      <p className="vitrine-demo-description">Des messages clairs et un parcours simple pour donner envie de vous contacter, sur tous les écrans.</p>
      <div className="vitrine-demo-stage vitrine-demo-conversion-stage" aria-label="Démonstration d’un parcours de prise de contact">
        <div className="vitrine-demo-site-toolbar"><span>A<span>Atelier local</span></span><i /><i /><i /></div>
        <div className={`vitrine-demo-journey-panel ${phase === 'visit' ? 'is-active' : ''}`} aria-hidden={phase !== 'visit'}>
          <span className="vitrine-demo-mini-eyebrow">ARTISAN · LORIENT</span><p className="vitrine-demo-mini-title">Votre projet mérite<br />le bon artisan.</p><p className="vitrine-demo-mini-description">Des conseils et un devis adapté à votre besoin.</p>
          <button type="button" tabIndex={phase === 'visit' ? 0 : -1} onClick={() => setStep(20)} aria-label="Simuler une demande de devis">Demander un devis<ArrowRight size={13} aria-hidden="true" /></button>
        </div>
        <div className={`vitrine-demo-journey-panel vitrine-demo-form-panel ${phase === 'form' ? 'is-active' : ''}`} aria-hidden={phase !== 'form'}>
          <p className="vitrine-demo-mini-title">Parlons de votre projet.</p>
          <div className="vitrine-demo-form-field"><span>Votre nom</span><p>{step >= 25 ? 'Camille Martin' : ' '}</p></div>
          <div className="vitrine-demo-form-field"><span>Votre demande</span><p>{step >= 33 ? 'Un devis pour ma salle de bain.' : ' '}</p></div>
          <button type="button" tabIndex={phase === 'form' ? 0 : -1} onClick={() => setStep(60)} aria-label="Simuler l’envoi de cette demande">Envoyer l’exemple<ArrowRight size={13} aria-hidden="true" /></button>
        </div>
        <div className={`vitrine-demo-journey-panel vitrine-demo-sent-panel ${phase === 'sent' ? 'is-active' : ''}`} aria-hidden={phase !== 'sent'}>
          <div className="vitrine-demo-funnel-row"><span className="vitrine-demo-funnel-icon"><MousePointer2 aria-hidden="true" /></span><p><strong>Visiteur</strong><span>Sur votre site</span></p></div>
          <ArrowDown className="vitrine-demo-funnel-arrow" aria-hidden="true" />
          <div className="vitrine-demo-funnel-row vitrine-demo-funnel-prospect"><span className="vitrine-demo-funnel-icon"><Mail aria-hidden="true" /></span><p><strong>Nouvelle demande</strong><span>Le début d’une conversation</span></p><CircleCheck className="vitrine-demo-funnel-check" aria-hidden="true" /></div>
          <span className="vitrine-demo-example-tag"><Check size={12} aria-hidden="true" />Envoi simulé</span>
        </div>
        <ol className="vitrine-demo-journey-steps" aria-label="Étapes du parcours"><li className="is-complete">Visite<ChevronRight size={12} aria-hidden="true" /></li><li className={phase !== 'visit' ? 'is-complete' : ''}>Contact<ChevronRight size={12} aria-hidden="true" /></li><li className={phase === 'sent' ? 'is-complete' : ''}>Demande</li></ol>
      </div>
      <DemoFooter reducedMotion={reducedMotion} restart={restart} label="Parcours illustratif · aucun envoi" />
    </article>
  )
}

const projectSteps = [
  { icon: Palette, label: 'Design à votre image' },
  { icon: Code2, label: 'Développement du site' },
  { icon: Search, label: 'Référencement naturel' },
  { icon: TrendingUp, label: 'Google Ads', detail: 'en option' },
  { icon: Settings2, label: 'Maintenance & suivi' },
]

function CareDemo() {
  const { ref, step, reducedMotion, restart } = useDemoProgress()
  const completed = Math.min(5, Math.floor(step / 10))

  return (
    <article ref={ref} className="vitrine-demo-card vitrine-demo-care-card">
      <div className="vitrine-demo-card-heading"><span className="vitrine-demo-symbol"><CheckCheck aria-hidden="true" /></span><h3>On s’occupe de tout</h3></div>
      <p className="vitrine-demo-description">Un seul interlocuteur pour la création, la mise en ligne et le suivi. Vous gardez le temps de faire votre métier.</p>
      <div className="vitrine-demo-stage vitrine-demo-care-stage" aria-label="Exemple des étapes prises en charge par Litus">
        <div className="vitrine-demo-checklist-heading"><FileText size={17} aria-hidden="true" /><span>Votre projet, bien accompagné.</span></div>
        <ul className="vitrine-demo-checklist">{projectSteps.map(({ icon: Icon, label, detail }, index) => <li key={label} className={completed > index ? 'is-complete' : ''}><Icon size={16} aria-hidden="true" /><span>{label}{detail && <small>{detail}</small>}</span><span className="vitrine-demo-check"><Check size={13} aria-hidden="true" /></span></li>)}</ul>
        <div className={`vitrine-demo-care-status ${completed === 5 ? 'is-complete' : ''}`}><CircleCheck size={16} aria-hidden="true" /><span>{completed === 5 ? 'Une équipe à vos côtés, dans la durée.' : 'Chaque étape a son attention.'}</span></div>
      </div>
      <DemoFooter reducedMotion={reducedMotion} restart={restart} label="Exemple d’accompagnement" />
    </article>
  )
}

function DemoFooter({ reducedMotion, restart, label }: { reducedMotion: boolean; restart: () => void; label: string }) {
  return <div className="vitrine-demo-footer"><span>{label}</span>{!reducedMotion && <button type="button" onClick={restart} aria-label={`Rejouer : ${label}`}><RotateCcw size={12} aria-hidden="true" />Rejouer</button>}</div>
}

export function VitrineGrowthDemos() {
  return <div className="vitrine-demo-grid"><SearchDemo /><ConversionDemo /><CareDemo /></div>
}

