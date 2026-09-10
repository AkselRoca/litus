'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, MapPin, Rocket, Search, ShieldCheck, Star, TrendingUp, UsersRound } from 'lucide-react'
import { ServiceHero } from '@/components/sections/services/ServiceHero'
import './seo-hero.css'

type Phase = 'typing' | 'loading' | 'results' | 'climbing' | 'winner' | 'deleting'

type Result = {
  id: string
  domain: string
  title: string
  description: string
  client?: boolean
}

const query = 'plombier lorient'

const initialResults: Result[] = [
  { id: 'pagesjaunes', domain: 'pagesjaunes.fr', title: 'Plombiers à Lorient : les professionnels proches de vous', description: 'Trouvez un plombier à Lorient. Avis, horaires et coordonnées.' },
  { id: 'ocean', domain: 'artisan-ocean.fr', title: 'Dépannage plomberie à Lorient', description: 'Intervention rapide 7j/7 sur Lorient et ses alentours.' },
  { id: 'armor', domain: 'plomberie-armor.fr', title: 'Artisan plombier dans le Morbihan', description: 'Installation, rénovation et dépannage près de chez vous.' },
  { id: 'habitat', domain: 'habitat-services.fr', title: 'Plomberie Lorient – Installation et rénovation', description: 'Prestations de plomberie sur Lorient et le Morbihan.' },
  { id: 'client', domain: 'votreentreprise.fr', title: 'Plombier à Lorient | Dépannage et installation', description: 'Une équipe locale à votre service. Devis gratuit et intervention rapide.', client: true },
]

const wait = (duration: number) => new Promise<void>(resolve => window.setTimeout(resolve, duration))

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

const getReducedMotionSnapshot = () => window.matchMedia(reducedMotionQuery).matches
const getServerReducedMotionSnapshot = () => false

function GoogleWordmark() {
  return <span className="seo-hero-google" aria-label="Google"><i>G</i><i>o</i><i>o</i><i>g</i><i>l</i><i>e</i></span>
}

export function SeoLocalHero() {
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getServerReducedMotionSnapshot)
  const [phase, setPhase] = useState<Phase>('typing')
  const [typedQuery, setTypedQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    if (reduceMotion) return
    let cancelled = false

    async function play() {
      while (!cancelled) {
        setPhase('typing')
        setTypedQuery('')
        setResults([])
        await wait(650)

        for (let index = 1; index <= query.length; index += 1) {
          if (cancelled) return
          setTypedQuery(query.slice(0, index))
          await wait(64)
        }

        setPhase('loading')
        await wait(700)
        if (cancelled) return

        setResults(initialResults)
        setPhase('results')
        await wait(1050)

        const client = initialResults[4]
        const competitors = initialResults.slice(0, 4)
        setPhase('climbing')
        setResults([...competitors.slice(0, 3), client, competitors[3]])
        await wait(900)
        setResults([...competitors.slice(0, 2), client, ...competitors.slice(2)])
        await wait(850)

        setPhase('winner')
        await wait(5200)
        setPhase('deleting')
        for (let index = query.length - 1; index >= 0; index -= 1) {
          if (cancelled) return
          setTypedQuery(query.slice(0, index))
          await wait(34)
        }
        await wait(350)
      }
    }

    void play()
    return () => { cancelled = true }
  }, [reduceMotion])

  const visiblePhase: Phase = reduceMotion ? 'winner' : phase
  const visibleQuery = reduceMotion ? query : typedQuery
  const visibleResults = reduceMotion
    ? [initialResults[0], initialResults[1], initialResults[4], initialResults[2], initialResults[3]]
    : results

  return (
    <ServiceHero
      id="seo-hero"
      title="Référencement naturel : soyez visible localement."
      accent="visible localement."
      description="Nous améliorons votre positionnement sur Google pour attirer des clients qualifiés à Lorient, au Mans et dans toute votre région."
      primaryAction={{ label: 'Parlons de votre projet', href: '/contact?objet=seo' }}
      secondaryAction={{ label: 'Voir les tarifs', href: '#tarifs' }}
      proof={
          <div className="seo-hero-trust" aria-label="Nos engagements">
            <div><Star className="is-star" aria-hidden="true" /><p><strong>5/5 Google</strong><span>+ de 60 avis clients</span></p></div>
            <div><ShieldCheck className="is-shield" aria-hidden="true" /><p><strong>Garantie Résultat</strong><span>Un accompagnement transparent</span></p></div>
            <div><Rocket className="is-rocket" aria-hidden="true" /><p><strong>Livraison Rapide</strong><span>Des actions concrètes, sans attente</span></p></div>
          </div>
      }
      visual={
        <motion.div className="seo-hero-demo" initial={false}>
          <div className="seo-hero-orbit" aria-hidden="true" />
          <div className="seo-serp" aria-label="Démonstration animée d'une progression dans les résultats Google">
            <div className="seo-serp-head">
              <GoogleWordmark />
              <div className={`seo-serp-search is-${visiblePhase}`}><Search aria-hidden="true" /><span>{visibleQuery}{(visiblePhase === 'typing' || visiblePhase === 'deleting') && <i className="seo-type-caret" />}</span></div>
            </div>
            <nav className="seo-serp-tabs" aria-label="Types de résultats"><b>Tous</b><span>Maps</span><span>Images</span><span>Vidéos</span><span>Actualités</span><span>Plus</span></nav>
            <div className="seo-serp-results">
              {visiblePhase === 'loading' && <div className="seo-serp-loading"><i /><span>Recherche des meilleurs résultats locaux…</span></div>}
              <AnimatePresence initial={false}>
                {visibleResults.map((result, index) => {
                  const isTopThree = result.client && index === 2 && visiblePhase === 'winner'
                  return (
                    <motion.article layout={!reduceMotion} key={result.id} className={`seo-hero-result ${result.client ? 'is-client' : ''} ${isTopThree ? 'is-top-three' : ''}`} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={reduceMotion ? { duration: 0 } : { layout: { type: 'spring', stiffness: 155, damping: 23 }, opacity: { duration: .28 } }}>
                      <span className="seo-result-rank">{index + 1}</span>
                      <div className="seo-result-body">
                        <div className="seo-result-site">{result.client ? <Image src="/logo-sans-fond.png" width={20} height={20} alt="" /> : <i />}{result.domain}{isTopThree && <motion.b initial={reduceMotion ? false : { opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={reduceMotion ? { duration: 0 } : undefined}>Top 3 <TrendingUp /></motion.b>}</div>
                        <h2>{result.title}</h2>
                        <p>{result.description}</p>
                      </div>
                    </motion.article>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {visiblePhase === 'winner' && <>
              <motion.div className="seo-float-card seo-float-traffic" initial={reduceMotion ? false : { opacity: 0, y: 14, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, y: 8 }} transition={reduceMotion ? { duration: 0 } : { delay: .15 }}><BarChart3 /><p><strong>+ 200 %</strong><span>de visites organiques</span></p><TrendingUp className="seo-up" /></motion.div>
              <motion.div className="seo-float-card seo-float-local" initial={reduceMotion ? false : { opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -8 }} transition={reduceMotion ? { duration: 0 } : { delay: .45 }}><MapPin /><p><span>Recherches locales</span><strong>+ 180 %</strong></p><TrendingUp className="seo-up" /></motion.div>
              <motion.div className="seo-float-card seo-float-clients" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: 8 }} transition={reduceMotion ? { duration: 0 } : { delay: .75 }}><UsersRound /><p><strong>Plus de clients</strong><span>près de chez vous</span></p><TrendingUp className="seo-up" /></motion.div>
              <motion.div className="seo-hand-note" initial={reduceMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={reduceMotion ? { duration: 0 } : { delay: 1.05 }}><span>Vos clients<br />vous trouvent ici</span><svg viewBox="0 0 96 55" fill="none"><path d="M94 5C69 6 56 13 46 25C38 35 31 40 7 42M7 42L20 31M7 42L23 51" /><path d="M69 47C77 43 84 41 94 40" /></svg></motion.div>
            </>}
          </AnimatePresence>
        </motion.div>
      }
    />
  )
}
