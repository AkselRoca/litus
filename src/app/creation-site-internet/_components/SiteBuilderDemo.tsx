'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, GripVertical, ImageIcon, Layers3, Menu, Monitor, Mountain, MousePointer2, Palette, Pause, Play, ShieldCheck, Smartphone, Tablet, Type, UnfoldVertical } from 'lucide-react'

type Viewport = 'desktop' | 'tablet' | 'mobile'
const stages = [
  { duration: 700, label: 'Un site prend forme.' },
  { duration: 700, label: 'Chaque détail commence par une intention.' },
  { duration: 1400, label: 'Des mots qui reflètent votre métier.' },
  { duration: 1100, label: 'Une image qui raconte votre projet.' },
  { duration: 1100, label: 'Votre identité, jusque dans les détails.' },
  { duration: 1100, label: 'Des contenus à la bonne place.' },
  { duration: 1500, label: 'Un site pensé aussi pour les tablettes.' },
  { duration: 1600, label: 'Une lecture naturelle sur mobile.' },
  { duration: 1700, label: 'Rapide. Lisible. Prêt pour vos clients.' },
  { duration: 1100, label: 'Du design aux résultats.' },
]
const colors = [
  { name: 'Bleu nuit', value: '#1F2937' },
  { name: 'Orange Litus', value: '#E95E2A' },
  { name: 'Vert sauge', value: '#4c6658' },
]
const initialTitle = 'Des espaces à vivre.'
const finalTitle = 'L’art de bâtir demain.'
const subscribeHydration = () => () => {}

export function SiteBuilderDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.2 })
  const motionPreference = useReducedMotion()
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false)
  const reducedMotion = hydrated && motionPreference
  const [stage, setStage] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [visible, setVisible] = useState(true)
  const [manualViewport, setManualViewport] = useState<Viewport | null>(null)
  const [manualColor, setManualColor] = useState<string | null>(null)
  const [manualImage, setManualImage] = useState<boolean | null>(null)
  const [manualOrder, setManualOrder] = useState<boolean | null>(null)
  const [wideSpacing, setWideSpacing] = useState(false)
  const [typedTitle, setTypedTitle] = useState(initialTitle)
  const [manualTitle, setManualTitle] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    const update = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  useEffect(() => {
    if (!playing || reducedMotion || !inView || !visible) return
    const timer = window.setTimeout(() => setStage(value => (value + 1) % stages.length), stages[stage].duration)
    return () => window.clearTimeout(timer)
  }, [stage, playing, reducedMotion, inView, visible])

  useEffect(() => {
    if (stage !== 2 || !playing || reducedMotion || !inView || !visible) return
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTypedTitle(finalTitle.slice(0, index))
      if (index >= finalTitle.length) window.clearInterval(timer)
    }, 42)
    return () => window.clearInterval(timer)
  }, [stage, playing, reducedMotion, inView, visible])

  const step = reducedMotion ? 8 : stage
  const viewport = manualViewport ?? (step === 6 ? 'tablet' : step === 7 || step === 8 ? 'mobile' : 'desktop')
  const accent = manualColor ?? (step >= 4 ? '#E95E2A' : '#1F2937')
  const newImage = manualImage ?? step >= 3
  const reordered = manualOrder ?? step >= 5
  const title = manualTitle || reducedMotion ? finalTitle : step < 2 ? initialTitle : step === 2 ? typedTitle : finalTitle
  const selected = step === 1 || step === 2
  const isRunning = playing && !reducedMotion
  const showPalette = paletteOpen || (step === 4 && playing)
  const showPerformance = step === 8 || reducedMotion
  const transition = { duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] as const }
  const order = reordered ? ['projects', 'studio'] : ['studio', 'projects']

  function chooseViewport(value: Viewport) {
    setPlaying(false)
    setManualViewport(value)
  }

  function togglePlayback() {
    if (playing) { setPlaying(false); return }
    setManualViewport(null)
    setManualColor(null)
    setManualImage(null)
    setManualOrder(null)
    setManualTitle(false)
    setPaletteOpen(false)
    setWideSpacing(false)
    setTypedTitle(initialTitle)
    setStage(0)
    setPlaying(true)
  }

  return (
    <div ref={ref} className="builder-demo" role="group" aria-label="Démonstration interactive de création de site" style={{ '--builder-accent': accent } as CSSProperties}>
      <div className="builder-caption"><span className="builder-caption-mark" aria-hidden="true" /><span>Litus Studio <span className="builder-caption-divider">/</span> Du sur-mesure, en direct.</span></div>
      <div className="builder-window">
        <div className="builder-toolbar">
          <span className="builder-project"><Mountain size={15} aria-hidden="true" /> Altitude <ChevronDown size={11} aria-hidden="true" /></span>
          <div className="builder-devices" role="group" aria-label="Format de l’aperçu">
            {([{ value: 'desktop', label: 'Ordinateur', icon: Monitor }, { value: 'tablet', label: 'Tablette', icon: Tablet }, { value: 'mobile', label: 'Mobile', icon: Smartphone }] as const).map(({ value, label, icon: Icon }) => (
              <button type="button" key={value} aria-label={label} aria-pressed={viewport === value} onClick={() => chooseViewport(value)}><Icon size={16} aria-hidden="true" /></button>
            ))}
          </div>
          <span className="builder-saved"><Check size={12} aria-hidden="true" /> Enregistré</span>
        </div>
        <div className="builder-body">
          <aside className="builder-sidebar" aria-label="Outils de création">
            <span className="builder-sidebar-label">COMPOSANTS</span>
            <button type="button" aria-label="Déplacer la section projets" onClick={() => { setPlaying(false); setManualOrder(!reordered) }} className={step === 5 ? 'is-selected' : ''}><Layers3 /><span>Sections</span></button>
            <button type="button" aria-label="Modifier le titre" onClick={() => { setPlaying(false); setManualTitle(true) }} className={selected ? 'is-selected' : ''}><Type /><span>Titre</span></button>
            <button type="button" aria-label="Changer la photo" onClick={() => { setPlaying(false); setManualImage(!newImage) }} className={step === 3 ? 'is-selected' : ''}><ImageIcon /><span>Image</span></button>
            <button type="button" aria-label="Ouvrir la palette de couleurs" aria-expanded={showPalette} onClick={() => { setPlaying(false); setPaletteOpen(!showPalette) }} className={showPalette ? 'is-selected' : ''}><Palette /><span>Couleurs</span></button>
            <button type="button" aria-label="Aérer la mise en page" aria-pressed={wideSpacing} onClick={() => { setPlaying(false); setWideSpacing(!wideSpacing) }}><UnfoldVertical /><span>Espacement</span></button>
            <div className="builder-sidebar-note"><ShieldCheck size={15} /><span>Une base SEO<br />bien structurée</span></div>
          </aside>
          <div className="builder-canvas" data-viewport={viewport}>
            <div className={`builder-site${wideSpacing ? ' is-spaced' : ''}`}>
              <div className="builder-site-nav"><span><Mountain aria-hidden="true" /> Altitude<span className="builder-architects">ARCHITECTURE</span></span><span className="builder-site-nav-links">L’atelier <span>Projets</span> Contact</span><Menu className="builder-site-menu" size={16} aria-hidden="true" /></div>
              <div className="builder-site-hero">
                <div className="builder-site-copy">
                  <span className="builder-site-eyebrow">DES LIEUX, DES LIENS.</span>
                  <div className={`builder-editable${selected ? ' is-selected' : ''}`}>
                    {selected && <span className="builder-selection-label" aria-hidden="true">H1 · Titre</span>}
                    <p className="builder-sample-title">{title}{step === 2 && isRunning && <span className="builder-text-caret" aria-hidden="true" />}</p>
                  </div>
                  <p className="builder-site-description">Des espaces qui ont du sens,<br />pour un avenir durable.</p>
                  <span className="builder-sample-cta">Découvrir nos projets <ArrowRight size={12} aria-hidden="true" /></span>
                </div>
                <div className="builder-site-photo">
                  <Image src="/site-builder-studio.webp" alt="Premier visuel de l’atelier" fill sizes="320px" className="builder-photo-initial" />
                  <motion.div className="builder-photo-new" animate={{ opacity: newImage ? 1 : 0 }} transition={transition}><Image src="/site-builder-architecture.webp" alt="Projet architectural : maison contemporaine en pierre et bois" fill sizes="320px" /></motion.div>
                  <span className="builder-photo-caption">01 / Une maison ouverte sur l’horizon</span>
                </div>
              </div>
              <div className="builder-site-sections">
                {order.map(id => (
                  <motion.div key={id} layout={!reducedMotion} transition={transition} className={`builder-site-section builder-section-${id}`}>
                    <GripVertical size={12} aria-hidden="true" /><span>{id === 'projects' ? 'Nos dernières réalisations' : 'Un atelier, des convictions'}</span><ArrowRight size={12} aria-hidden="true" />
                  </motion.div>
                ))}
              </div>
            </div>
            {isRunning && step < 6 && <div className={`builder-cursor builder-cursor-${step}`} aria-hidden="true"><MousePointer2 size={26} fill="#1f2937" stroke="#fff" strokeWidth={1.5} /><span>Litus</span></div>}
          </div>
        </div>
        <div className="builder-status"><span>{playing ? stages[step].label : 'À vous de jouer : couleurs, photos et formats.'}</span><span className="builder-status-format">{viewport === 'desktop' ? 'Ordinateur' : viewport === 'tablet' ? 'Tablette' : 'Mobile'}</span></div>
      </div>

      <AnimatePresence>
        {showPalette && <motion.div key="palette" className="builder-floating-palette" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={transition}><p>Votre palette</p><div>{colors.map(color => <button key={color.name} type="button" aria-label={`Appliquer la couleur ${color.name}`} aria-pressed={accent === color.value} style={{ backgroundColor: color.value }} onClick={() => { setPlaying(false); setManualColor(color.value) }}>{accent === color.value && <Check size={13} aria-hidden="true" />}</button>)}</div></motion.div>}
        {showPerformance && <motion.div key="performance" className="builder-performance" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={transition}><span className="builder-score">98</span><div><strong>Objectif performance</strong><span><Check size={12} /> Responsive optimisé</span><span><Check size={12} /> SEO soigné</span></div></motion.div>}
      </AnimatePresence>
      <div className="builder-demo-controls"><span>Exemple de création · essayez les contrôles</span>{!reducedMotion && <button type="button" aria-label={playing ? 'Mettre la démonstration en pause' : 'Relancer la démonstration'} onClick={togglePlayback}>{playing ? <Pause size={13} /> : <Play size={13} />}<span>{playing ? 'Pause' : 'Rejouer'}</span></button>}</div>
    </div>
  )
}
