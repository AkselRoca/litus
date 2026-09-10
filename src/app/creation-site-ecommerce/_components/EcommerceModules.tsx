'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowRight, Check, CheckCheck, Mail, Package, Pause, Play, RotateCcw, ShoppingBag, ShoppingCart, Truck } from 'lucide-react'
import { useEffect, useId, useRef, useState, useSyncExternalStore, type HTMLAttributes, type KeyboardEvent } from 'react'
import './ecommerce-modules.css'

const subscribeMotion = (callback: () => void) => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  preference.addEventListener('change', callback)
  return () => preference.removeEventListener('change', callback)
}
const motionSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const serverMotionSnapshot = () => true
const subscribeVisibility = (callback: () => void) => {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
const visibilitySnapshot = () => document.visibilityState === 'visible'
const serverVisibilitySnapshot = () => false

/** Both demos share the same pause rules, without running a frame-by-frame timer. */
function useDemoPlayback(count: number, delay: number, inView: boolean) {
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, serverMotionSnapshot)
  const visible = useSyncExternalStore(subscribeVisibility, visibilitySnapshot, serverVisibilitySnapshot)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const running = playing && !reduced && visible && inView && !hovered && !focused

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => setStep(value => (value + 1) % count), delay)
    return () => window.clearTimeout(timer)
  }, [count, delay, running, step])

  function select(value: number) { setStep(value); setPlaying(false) }
  function restart() { setStep(0); setPlaying(true) }

  const interactionProps: Pick<HTMLAttributes<HTMLDivElement>, 'onPointerEnter' | 'onPointerLeave' | 'onFocusCapture' | 'onBlurCapture'> = {
    onPointerEnter: event => { if (event.pointerType !== 'touch') setHovered(true) },
    onPointerLeave: () => setHovered(false),
    onFocusCapture: () => setFocused(true),
    onBlurCapture: event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
    },
  }
  return { step, reduced, running, playing, select, restart, toggle: () => setPlaying(value => !value), interactionProps }
}

const journeySteps = [
  { label: 'Produit', icon: ShoppingBag },
  { label: 'Panier', icon: ShoppingCart },
  { label: 'Commande', icon: CheckCheck },
] as const

export function EcommerceJourney({ className = '' }: { className?: string }) {
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: .25 })
  const playback = useDemoPlayback(3, 3500, inView)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const transition = { duration: playback.reduced ? 0 : .26, ease: [.22, 1, .36, 1] as const }

  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % 3 : event.key === 'ArrowLeft' ? (index + 2) % 3 : event.key === 'Home' ? 0 : event.key === 'End' ? 2 : -1
    if (next < 0) return
    event.preventDefault()
    playback.select(next)
    tabs.current[next]?.focus()
  }

  return <div ref={ref} className={`ec-demo ${className}`} role="group" aria-label="Démonstration du parcours d’achat" data-running={playback.running} {...playback.interactionProps}>
    <div className="ec-demo-top"><span><ShoppingBag aria-hidden="true" />La boutique Maison</span><small>Démonstration</small></div>
    <div className="ec-demo-tabs" role="tablist" aria-label="Les étapes du parcours d’achat">
      {journeySteps.map(({ label, icon: Icon }, index) => <button type="button" role="tab" key={label} id={`${id}-tab-${index}`} aria-selected={playback.step === index} aria-controls={`${id}-panel`} tabIndex={playback.step === index ? 0 : -1} ref={element => { tabs.current[index] = element }} onClick={() => playback.select(index)} onKeyDown={event => onKey(event, index)}>
        {playback.step === index && <motion.span className="ec-demo-tab-active" layoutId={`${id}-active`} transition={transition} />}
        <Icon aria-hidden="true" /><span>{label}</span>
      </button>)}
    </div>
    <div className="ec-demo-stage" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${playback.step}`} tabIndex={0}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div className="ec-demo-scene" key={playback.step} initial={playback.reduced ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: playback.reduced ? 1 : 0, y: playback.reduced ? 0 : -5 }} transition={transition}>
          {playback.step === 0 && <div className="ec-demo-product">
            <div className="ec-demo-photo"><Image src="/shop-demo-bowl.webp" alt="Coupe en céramique vert sauge" fill sizes="(max-width: 380px) 120px, (max-width: 640px) 190px, 240px" /><span>La collection maison</span></div>
            <div className="ec-demo-product-info"><span className="ec-demo-eyebrow">Les beaux essentiels</span><h3>Coupe Sora</h3><p>Du caractère, jusque dans les petits détails.</p><strong className="ec-demo-price">39 €</strong><span className="ec-demo-stock"><i aria-hidden="true" />En stock · Sauge</span><button type="button" className="ec-demo-action" onClick={() => playback.select(1)}>Ajouter au panier<ArrowRight aria-hidden="true" /></button></div>
          </div>}
          {playback.step === 1 && <div className="ec-demo-cart">
            <div className="ec-demo-scene-heading"><span className="ec-demo-round-icon"><ShoppingCart aria-hidden="true" /></span><div><h3>Votre panier</h3><p>Une belle pièce, bientôt chez vous.</p></div><span className="ec-demo-count">1 article</span></div>
            <div className="ec-demo-cart-item"><Image src="/shop-demo-bowl.webp" alt="Coupe Sora, coloris sauge" width={68} height={68} /><div><strong>Coupe Sora</strong><span>Sauge · Quantité : 1</span></div><b>39 €</b></div>
            <div className="ec-demo-total"><span>Total de l’exemple</span><strong>39 €</strong></div>
            <button type="button" className="ec-demo-action" onClick={() => playback.select(2)}>Voir la confirmation<ArrowRight aria-hidden="true" /></button>
          </div>}
          {playback.step === 2 && <div className="ec-demo-confirmation">
            <motion.span className="ec-demo-success-icon" initial={playback.reduced ? false : { scale: .85 }} animate={{ scale: 1 }} transition={transition}><Check aria-hidden="true" /></motion.span>
            <span className="ec-demo-eyebrow">Commande #1048</span><h3>Merci pour votre commande.</h3><p>Une confirmation claire, dès l’achat.</p>
            <div className="ec-demo-receipt"><span>Coupe Sora <small>× 1</small></span><strong>39 €</strong><span className="ec-demo-paid"><Check aria-hidden="true" />Payée · exemple</span></div>
            <button type="button" className="ec-demo-text-button" onClick={() => playback.select(0)}>Revenir au produit<ArrowRight aria-hidden="true" /></button>
          </div>}
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="ec-demo-footer"><span>Exemple interactif · Aucun achat réel</span>{!playback.reduced && <button type="button" className="ec-demo-playback" onClick={playback.toggle} aria-label={playback.playing ? 'Mettre le parcours d’achat en pause' : 'Reprendre le parcours d’achat'} aria-pressed={!playback.playing}>{playback.playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}<span>{playback.playing ? 'Pause' : 'Reprendre'}</span></button>}</div>
  </div>
}

const orders = [
  { number: '1048', product: 'Coupe Sora', variant: 'Sauge', image: '/shop-demo-bowl.webp', price: '39 €', before: 12, after: 11 },
  { number: '1049', product: 'Lampe Alba', variant: 'Terracotta', image: '/shop-demo-lamp.webp', price: '89 €', before: 8, after: 7 },
] as const

export function EcommerceOperations({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: .25 })
  const playback = useDemoPlayback(4, 2500, inView)
  const [orderIndex, setOrderIndex] = useState(0)
  const order = orders[orderIndex]
  const steps = [
    { title: 'Commande reçue', detail: 'Le paiement est confirmé.', icon: ShoppingBag },
    { title: 'Stock mis à jour', detail: `${order.before} → ${order.after} pièces disponibles.`, icon: Package },
    { title: 'Préparation lancée', detail: 'Le bon de préparation est créé.', icon: Truck },
    { title: 'Client informé', detail: 'L’e-mail de confirmation est envoyé.', icon: Mail },
  ]

  function anotherOrder() { setOrderIndex(value => (value + 1) % orders.length); playback.restart() }

  return <div ref={ref} className={`ec-ops ${className}`} role="group" aria-label="Démonstration du traitement d’une commande" data-running={playback.running} {...playback.interactionProps}>
    <div className="ec-ops-top"><span><Package aria-hidden="true" />Derrière votre boutique</span><small>Démonstration</small></div>
    <div className="ec-ops-order">
      <Image src={order.image} alt={`${order.product}, coloris ${order.variant.toLowerCase()}`} width={50} height={50} />
      <div><span>Commande #{order.number}</span><strong>{order.product} <span>× 1</span></strong></div>
      <div className="ec-ops-order-amount"><strong>{order.price}</strong><span><Check aria-hidden="true" />Payée</span></div>
    </div>
    <ol className="ec-ops-flow" aria-label="Suivi de la commande d’exemple">
      {steps.map(({ title, detail, icon: Icon }, index) => {
        const complete = playback.step >= index
        const current = playback.step === index
        return <li className={complete ? 'ec-ops-step is-complete' : 'ec-ops-step'} key={title}>
          <button type="button" onClick={() => playback.select(index)} aria-current={current ? 'step' : undefined} aria-label={`Afficher l’étape ${index + 1} : ${title}`}>
            <span className="ec-ops-step-icon"><Icon aria-hidden="true" /></span><span className="ec-ops-step-copy"><strong>{title}</strong><span>{detail}</span></span>
            <motion.span className="ec-ops-step-status" animate={{ scale: current && !playback.reduced ? 1.08 : 1 }} transition={{ duration: playback.reduced ? 0 : .25 }}>{complete ? <Check aria-hidden="true" /> : <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}<span className="ec-ops-sr-only">{complete ? 'Terminée' : 'À venir'}</span></motion.span>
          </button>
        </li>
      })}
    </ol>
    <div className="ec-ops-footer"><button type="button" className="ec-ops-replay" onClick={anotherOrder}><RotateCcw aria-hidden="true" />Voir une autre commande</button>{!playback.reduced && <button type="button" className="ec-ops-playback" onClick={playback.toggle} aria-label={playback.playing ? 'Mettre le suivi de commande en pause' : 'Reprendre le suivi de commande'} aria-pressed={!playback.playing}>{playback.playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}</button>}</div>
  </div>
}

/** Content is visible in the HTML; reveals are an optional enhancement after hydration. */
export function EcommerceReveal({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!root || preference.matches || !('IntersectionObserver' in window)) return
    const effects: Animation[] = []
    const stop = () => effects.forEach(effect => effect.cancel())
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        if (!preference.matches && typeof entry.target.animate === 'function') effects.push(entry.target.animate(
          [{ opacity: .65, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 440, delay: Math.min(Array.from(root.children).indexOf(entry.target), 3) * 65, easing: 'cubic-bezier(.2,.7,.3,1)' },
        ))
        observer.unobserve(entry.target)
      }
    }, { threshold: .12 })
    Array.from(root.children).forEach(child => observer.observe(child))
    preference.addEventListener('change', stop)
    return () => { observer.disconnect(); preference.removeEventListener('change', stop); stop() }
  }, [])
  return <div ref={ref} className={className} {...props}>{children}</div>
}
