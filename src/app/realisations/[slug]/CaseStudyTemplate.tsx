'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Check, ChevronRight, CircleGauge,
  Code2, Figma, MapPin, Monitor, Search, ShoppingBag,
  Target, UsersRound, X,
} from 'lucide-react'
import type { CaseIcon, CaseStudyData } from './case-study-data'

const icons = {
  site: Monitor, search: Search, ads: BarChart3, shop: ShoppingBag, design: Figma,
  code: Code2, tracking: CircleGauge, target: Target, map: MapPin, users: UsersRound,
} satisfies Record<CaseIcon, typeof Monitor>

const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }
const transition = { duration: .58, ease: [0.22, 1, 0.36, 1] as const }

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} variants={reveal} initial={reduced ? 'visible' : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .14 }} transition={{ ...transition, delay }}>{children}</motion.div>
}

function Icon({ name }: { name: CaseIcon }) {
  const Component = icons[name]
  return <Component aria-hidden="true" />
}

function CountUp({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, amount: .7 })
  const reduced = useReducedMotion()
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (!visible || reduced) return
    let frame = 0
    const started = performance.now()
    const animate = (now: number) => {
      const progress = Math.min(1, (now - started) / 900)
      setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [visible, reduced, value])
  return <span ref={ref}>{prefix}{reduced ? value : current}{suffix}</span>
}

export function CaseStudyTemplate({ data }: { data: CaseStudyData }) {
  const reduced = useReducedMotion()
  const [activeTab, setActiveTab] = useState(0)
  const activeVisual = data.showcase?.tabs[activeTab]

  return <article className="case-study case-template">
    <section className="case-hero-new">
      <div className="case-hero-new-copy">
        <Link className="case-back" href="/realisations"><ArrowLeft />Retour aux réalisations</Link>
        <p className="case-kicker-new"><span>Réalisation</span><i />{data.year}</p>
        <h1>{data.client}</h1>
        <p className="case-lead-new">{data.statement}</p>
        <ul className="case-tags-new">{data.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        <dl className="case-meta-new">{data.meta.map(item => <div key={item.label}><Icon name={item.icon} /><span><dt>{item.label}</dt><dd>{item.value}</dd></span></div>)}</dl>
        {data.externalLink && <a className="case-live-link" href={data.externalLink} target="_blank" rel="noreferrer">Voir le projet en ligne <ArrowUpRight /></a>}
      </div>
      <div className="case-hero-stage">
        <motion.div className="case-hero-desktop" initial={reduced ? false : { opacity: 0, y: 22, rotateX: 4 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ ...transition, delay: .18 }}><Image src={data.hero.desktop} alt={data.hero.alt} fill priority sizes="(max-width: 760px) 100vw, 58vw" /></motion.div>
        {data.hero.mobile && <motion.div className="case-hero-mobile" initial={reduced ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transition, delay: .48 }}><Image src={data.hero.mobile} alt="Version mobile du projet" fill priority sizes="180px" /></motion.div>}
        {data.hero.stat && <motion.div className="case-floating-result" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: .68 }}><BarChart3 /><strong>{data.hero.stat.value}</strong><span>{data.hero.stat.label}</span></motion.div>}
      </div>
    </section>

    <section className="case-block case-context-new">
      <div className="case-container-new">
        <Reveal className="case-heading-row"><div><p className="case-section-number-new">01 — Le contexte</p><h2>D’où partait<br />le projet ?</h2></div><div className="case-context-text"><p>{data.context.intro}</p>{data.context.detail && <p>{data.context.detail}</p>}</div>{data.context.image && <figure><Image src={data.context.image} alt="Aperçu du projet avant sa transformation" fill sizes="280px" /></figure>}</Reveal>
        <div className="case-challenge-grid">{data.context.challenges.map((item, index) => <Reveal key={item.title} delay={index * .08}><article><span><Icon name={item.icon} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></article></Reveal>)}</div>
      </div>
    </section>

    <section className="case-block case-objectives"><div className="case-container-new"><p className="case-section-number-new">02 — Les objectifs</p><div className="case-objectives-grid"><h2>Ce que nous devions<br />accomplir.</h2>{data.objectives.map((item, index) => <Reveal key={item.title} delay={index * .08}><article><strong>0{index + 1}</strong><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>)}</div></div></section>

    <section className="case-block case-response"><div className="case-container-new"><Reveal className="case-heading-row case-heading-simple"><div><p className="case-section-number-new">03 — Notre réponse</p><h2>Une stratégie construite<br />autour du projet.</h2></div><p>{data.response.intro}</p></Reveal><div className="case-expertise-grid" data-count={data.response.expertise.length}>{data.response.expertise.map((item, index) => <Reveal key={item.title} delay={index * .08}><article><header><span><Icon name={item.icon} /></span><div><small>0{index + 1}.</small><h3>{item.title}</h3><p>{item.description}</p></div></header><ul>{item.actions.map(action => <li key={action}><Check />{action}</li>)}</ul></article></Reveal>)}</div></div></section>

    {data.showcase && activeVisual && <section className="case-block case-showcase"><div className="case-container-new"><div className="case-showcase-heading"><div><p className="case-section-number-new">04 — La réalisation</p><h2>Du concept<br />au produit final.</h2><p>{data.showcase.intro}</p>{data.externalLink && <a href={data.externalLink} target="_blank" rel="noreferrer" className="site-cta-primary">Voir le site en ligne <ArrowUpRight /></a>}</div><div className="case-tabs" role="tablist" aria-label="Captures du projet">{data.showcase.tabs.map((tab, index) => <button key={tab.label} role="tab" aria-selected={activeTab === index} onClick={() => setActiveTab(index)}>{tab.label}</button>)}</div></div><div className={`case-browser-stage is-${activeVisual.mode ?? 'desktop'}`}><AnimatePresence mode="wait"><motion.figure key={activeVisual.image} initial={reduced ? false : { opacity: 0, y: 10, scale: .99 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .42, ease: [0.22,1,.36,1] }}><div className="case-browser-bar"><i /><i /><i /><span>{activeVisual.label}</span></div><div className="case-browser-image"><Image src={activeVisual.image} alt={activeVisual.alt} fill sizes="(max-width: 760px) 100vw, 75vw" /></div></motion.figure></AnimatePresence></div></div></section>}

    {data.system?.length ? <section className="case-system"><div className="case-container-new"><Reveal className="case-heading-row case-heading-simple"><div><p className="case-section-number-new">05 — Un système complet</p><h2>Plus qu’un nouveau site.</h2></div><p>Chaque expertise joue un rôle précis pour attirer, convaincre et convertir les bons prospects.</p></Reveal><ul>{data.system.map((item, index) => <motion.li key={item.title} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...transition, delay: index * .08 }}><span><Icon name={item.icon} /></span><strong>{item.title}</strong><small>{item.text}</small></motion.li>)}</ul></div></section> : null}

    {data.transformation && <section className="case-block case-transformation"><div className="case-container-new"><p className="case-section-number-new">06 — Avant / Après</p><div className="case-transform-grid"><h2>Ce qui a changé.</h2><Reveal className="case-before"><article><h3>Avant</h3><ul>{data.transformation.before.map(item => <li key={item}><X />{item}</li>)}</ul></article></Reveal><motion.span className="case-transform-arrow" initial={reduced ? false : { opacity: 0, scale: .7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ ...transition, delay: .2 }}><ArrowRight /></motion.span><Reveal className="case-after" delay={.34}><article><h3>Après</h3><ul>{data.transformation.after.map(item => <li key={item}><Check />{item}</li>)}</ul></article></Reveal></div></div></section>}

    {data.results && <section className="case-block case-results-new"><div className="case-container-new"><p className="case-section-number-new">07 — Les résultats</p><div className={`case-results-new-grid ${data.results.value == null ? 'is-qualitative' : ''}`}><Reveal><div className="case-result-primary">{data.results.value != null && <CountUp value={data.results.value} prefix={data.results.prefix} suffix={data.results.suffix} />}<h2>{data.results.headline}</h2>{data.results.note && <p>{data.results.note}</p>}</div></Reveal>{data.results.indicators?.length ? <div className="case-result-indicators">{data.results.indicators.map((item,index)=><Reveal key={item.label} delay={index*.08}><article><span><Icon name={item.icon} /></span><div><strong>{item.value}</strong><p>{item.label}</p></div></article></Reveal>)}</div>:null}</div></div></section>}

    {data.testimonial && <section className="case-block case-testimonial"><div className="case-container-new"><p className="case-section-number-new">08 — Témoignage client</p><Reveal><figure><blockquote>“{data.testimonial.quote}”</blockquote><figcaption>{data.testimonial.photo && <Image src={data.testimonial.photo} alt={data.testimonial.name} width={48} height={48} />}<span><strong>{data.testimonial.name}</strong><small>{data.testimonial.role} · {data.testimonial.company}</small></span>{data.testimonial.rating && <b aria-label={`${data.testimonial.rating} étoiles sur 5`}>{'★'.repeat(data.testimonial.rating)}</b>}</figcaption></figure></Reveal></div></section>}

    <section className="case-project-cta"><Reveal><div><p>Un projet similaire ?</p><h2>Et si le prochain<br />était le vôtre ?</h2></div><p>Site internet, référencement, acquisition ou projet plus spécifique : discutons de vos objectifs et de la meilleure stratégie pour votre activité.</p><Link href="/contact" className="site-cta-primary">Parler de mon projet <ArrowRight /></Link></Reveal></section>

    {data.related?.length ? <section className="case-related"><div className="case-container-new"><div className="case-related-heading"><h2>D’autres réalisations qui pourraient vous intéresser</h2><Link href="/realisations">Toutes les réalisations <ArrowRight /></Link></div><div className="case-related-track">{data.related.map(item => <Link href={item.href} key={item.href}><figure><Image src={item.image} alt={`Projet ${item.title}`} fill sizes="(max-width: 760px) 78vw, 24vw" /></figure><h3>{item.title}</h3><p>{item.tags.join(' · ')}</p><ChevronRight /></Link>)}</div></div></section> : null}
  </article>
}
