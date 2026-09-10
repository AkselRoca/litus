'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, CreditCard, Grid2X2, ImageIcon, Monitor, MousePointer2, Package, Palette, Pause, Play, ShoppingBag, Smartphone, Tablet, Truck, Type, X } from 'lucide-react'

type Format = 'desktop' | 'tablet' | 'mobile'
const steps = ['Une boutique prend forme.', 'Des produits mis en valeur.', 'Une fiche produit claire et soignée.', 'Chaque détail donne envie.', 'Une boutique aux couleurs de votre marque.', 'Vos collections, dans le bon ordre.', 'Un catalogue adapté aux tablettes.', 'Acheter simplement, même sur mobile.', 'Du coup de cœur au panier.', 'Prête pour vos prochaines commandes.']
const subscribeHydration = () => () => {}
const products = [
  { name: 'Lampe Alba', category: 'UNE LUMIÈRE DOUCE', description: 'Une présence chaleureuse, du matin au soir.', image: '/shop-demo-lamp.webp', price: '89,00 €', color: 'Terracotta' },
  { name: 'Coupe Sora', category: 'LA BEAUTÉ DU QUOTIDIEN', description: 'Des courbes douces, façonnées pour durer.', image: '/shop-demo-bowl.webp', price: '39,00 €', color: 'Sauge' },
]
const colors = [{ name: 'Bleu nuit', value: '#1F2937' }, { name: 'Orange Litus', value: '#E95E2A' }, { name: 'Vert sauge', value: '#4c6658' }]

export function EcommerceBuilderDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: .2 })
  const preference = useReducedMotion()
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false)
  const reduced = hydrated && preference
  const [stage, setStage] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [visible, setVisible] = useState(true)
  const [formatOverride, setFormat] = useState<Format | null>(null)
  const [colorOverride, setColor] = useState<string | null>(null)
  const [productOverride, setProduct] = useState<number | null>(null)
  const [orderOverride, setOrder] = useState<boolean | null>(null)
  const [cartOverride, setCart] = useState<boolean | null>(null)
  const [manualTitle, setManualTitle] = useState(false)
  const [palette, setPalette] = useState(false)
  const [typed, setTyped] = useState('La collection')
  const step = reduced ? 9 : stage
  const format = formatOverride ?? (step === 6 ? 'tablet' : step === 7 || step === 8 ? 'mobile' : 'desktop')
  const accent = colorOverride ?? (step >= 4 ? '#E95E2A' : '#1F2937')
  const index = productOverride ?? (step >= 3 ? 0 : 1)
  const product = products[index]
  const reversed = orderOverride ?? step >= 5
  const showCart = cartOverride ?? step === 8
  const showPalette = palette || (playing && step === 4)
  const title = manualTitle || step > 2 ? 'Le beau, au quotidien.' : step === 2 ? typed : 'La collection'
  const transition = { duration: reduced ? 0 : .55, ease: [.22, 1, .36, 1] as const }

  useEffect(() => {
    const update = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])
  useEffect(() => {
    if (!playing || reduced || !inView || !visible) return
    const timer = window.setTimeout(() => setStage(value => (value + 1) % steps.length), 1200)
    return () => window.clearTimeout(timer)
  }, [stage, playing, reduced, inView, visible])
  useEffect(() => {
    if (stage !== 2 || !playing || reduced || !inView || !visible) return
    let count = 0
    const text = 'Le beau, au quotidien.'
    const timer = window.setInterval(() => { count++; setTyped(text.slice(0, count)); if (count >= text.length) window.clearInterval(timer) }, 36)
    return () => window.clearInterval(timer)
  }, [stage, playing, reduced, inView, visible])

  function replay() {
    if (playing) { setPlaying(false); return }
    setFormat(null); setColor(null); setProduct(null); setOrder(null); setCart(null); setManualTitle(false); setPalette(false); setStage(0); setTyped('La collection'); setPlaying(true)
  }
  function chooseProduct(value: number) { setPlaying(false); setProduct(value); setCart(false) }

  return (
    <div ref={ref} className="builder-demo commerce-builder" role="group" aria-label="Démonstration interactive de boutique e-commerce" style={{ '--builder-accent': accent } as CSSProperties}>
      <div className="builder-caption"><span className="builder-caption-mark" aria-hidden="true" /><span>Litus Studio <span className="builder-caption-divider">/</span> Votre boutique prend vie.</span></div>
      <div className="builder-window">
        <div className="builder-toolbar">
          <span className="builder-project"><ShoppingBag size={15} aria-hidden="true" /> Maison <ChevronDown size={11} aria-hidden="true" /></span>
          <div className="builder-devices" role="group" aria-label="Format de la boutique">{([{ value: 'desktop', label: 'Ordinateur', icon: Monitor }, { value: 'tablet', label: 'Tablette', icon: Tablet }, { value: 'mobile', label: 'Mobile', icon: Smartphone }] as const).map(({value,label,icon: Icon}) => <button type="button" key={value} aria-label={label} aria-pressed={format === value} onClick={() => { setPlaying(false); setFormat(value) }}><Icon size={16} aria-hidden="true" /></button>)}</div>
          <span className="builder-saved"><Check size={12} aria-hidden="true" /> Enregistré</span>
        </div>
        <div className="builder-body">
          <aside className="builder-sidebar" aria-label="Outils de la boutique">
            <span className="builder-sidebar-label">BOUTIQUE</span>
            <button type="button" aria-label="Changer le produit" onClick={() => chooseProduct(index === 0 ? 1 : 0)} className={step === 1 ? 'is-selected' : ''}><Package /><span>Produits</span></button>
            <button type="button" aria-label="Modifier le titre" onClick={() => { setPlaying(false); setManualTitle(true) }} className={step === 2 ? 'is-selected' : ''}><Type /><span>Titre</span></button>
            <button type="button" aria-label="Changer le visuel produit" onClick={() => chooseProduct(index === 0 ? 1 : 0)} className={step === 3 ? 'is-selected' : ''}><ImageIcon /><span>Visuels</span></button>
            <button type="button" aria-label="Ouvrir la palette de couleurs" aria-expanded={showPalette} onClick={() => { setPlaying(false); setPalette(!showPalette) }} className={showPalette ? 'is-selected' : ''}><Palette /><span>Couleurs</span></button>
            <button type="button" aria-label="Réorganiser la collection" onClick={() => { setPlaying(false); setOrder(!reversed) }} className={step === 5 ? 'is-selected' : ''}><Grid2X2 /><span>Collections</span></button>
            <div className="builder-sidebar-note"><CreditCard size={15} /><span>Paiement<br />sécurisé</span></div>
          </aside>
          <div className="builder-canvas" data-viewport={format}>
            <div className="builder-site commerce-site">
              <div className="commerce-store-nav"><span className="commerce-wordmark">maison<span>.</span></span><span className="commerce-nav-links">Objets <span>Luminaires</span> Notre histoire</span><button type="button" aria-label="Ouvrir le panier de démonstration" onClick={() => { setPlaying(false); setCart(!showCart) }}><ShoppingBag size={15} aria-hidden="true" /><span>{showCart ? 1 : 0}</span></button></div>
              <div className={`commerce-collection-title${step === 2 ? ' is-selected' : ''}`}><span>{title}</span><small>Des objets choisis avec soin.</small></div>
              <div className="commerce-product-main">
                <div className="commerce-product-photo"><AnimatePresence initial={false}>{<motion.div key={product.image} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}><Image src={product.image} alt={product.name} fill sizes="320px" /></motion.div>}</AnimatePresence><span>NOUVELLE COLLECTION</span></div>
                <div className="commerce-product-info"><span className="commerce-product-eyebrow">{product.category}</span><p className="commerce-product-name">{product.name}</p><strong className="commerce-product-price">{product.price}</strong><p className="commerce-product-description">{product.description}</p><span className="commerce-product-color">Finition <b>{product.color}</b></span><button type="button" className="commerce-add-button" onClick={() => { setPlaying(false); setCart(true) }}>{showCart ? 'Ajouté au panier' : 'Ajouter au panier'}{showCart ? <Check size={12} /> : <ArrowRight size={12} />}</button><span className="commerce-delivery"><Truck size={11} /> Expédition sous 48 h</span></div>
              </div>
              <div className="commerce-collection">{(reversed ? [0,1] : [1,0]).map(productIndex => <motion.button type="button" layout={!reduced} transition={transition} key={productIndex} className="commerce-product-mini" aria-label={`Voir ${products[productIndex].name}`} onClick={() => chooseProduct(productIndex)}><Image src={products[productIndex].image} alt="" width={35} height={35} /><span>{products[productIndex].name}<small>{products[productIndex].price}</small></span><ArrowRight size={11} aria-hidden="true" /></motion.button>)}</div>
            </div>
            {playing && !reduced && step < 6 && <div className={`builder-cursor builder-cursor-${step}`} aria-hidden="true"><MousePointer2 size={26} fill="#1f2937" stroke="#fff" strokeWidth={1.5} /><span>Litus</span></div>}
          </div>
        </div>
        <div className="builder-status"><span>{playing ? steps[step] : 'À vous de jouer : produits, couleurs et panier.'}</span><span className="builder-status-format">{format === 'desktop' ? 'Ordinateur' : format === 'tablet' ? 'Tablette' : 'Mobile'}</span></div>
      </div>
      <AnimatePresence>
        {showPalette && <motion.div key="palette" className="builder-floating-palette" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:5}} transition={transition}><p>Votre palette</p><div>{colors.map(color => <button key={color.name} type="button" style={{backgroundColor:color.value}} aria-label={`Appliquer la couleur ${color.name}`} aria-pressed={accent === color.value} onClick={() => { setPlaying(false); setColor(color.value) }}>{accent === color.value && <Check size={13} />}</button>)}</div></motion.div>}
        {showCart && <motion.div key="cart" className="commerce-demo-cart" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:12}} transition={transition}><div className="commerce-cart-top"><strong><Check size={14} /> Ajouté au panier</strong><button type="button" aria-label="Fermer le panier" onClick={() => { setPlaying(false); setCart(false) }}><X size={16} /></button></div><div className="commerce-cart-product"><Image src={product.image} alt="" width={48} height={48} /><span>{product.name}<small>Quantité : 1</small></span><b>{product.price}</b></div><p className="commerce-cart-total"><span>Sous-total</span><strong>{product.price}</strong></p><span className="commerce-secure"><CreditCard size={13} /> Un paiement simple et sécurisé</span><small className="commerce-cart-note">Panier de démonstration</small></motion.div>}
      </AnimatePresence>
      <div className="builder-demo-controls"><span>Boutique de démonstration · essayez le panier</span>{!reduced && <button type="button" aria-label={playing ? 'Mettre la démonstration en pause' : 'Relancer la démonstration'} onClick={replay}>{playing ? <Pause size={13} /> : <Play size={13} />}<span>{playing ? 'Pause' : 'Rejouer'}</span></button>}</div>
    </div>
  )
}
