'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight,
  Camera,
  Eye,
  MapPin,
  Mic,
  PhoneCall,
  Search,
  TrendingUp,
  UsersRound,
  X,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Phase = 'typing' | 'loading' | 'results' | 'climbing' | 'winner' | 'deleting'

type SearchResult = {
  id: string
  domain: string
  title: string
  description: string
  client?: boolean
}

const searches: { query: string; results: SearchResult[] }[] = [
  {
    query: 'plombier lorient',
    results: [
      {
        id: 'annuaire',
        domain: 'pageslocales.fr',
        title: 'Plombiers à Lorient : les professionnels proches de vous',
        description: 'Adresses, horaires et avis des entreprises de plomberie à Lorient.',
      },
      {
        id: 'armor',
        domain: 'plomberie-armor.fr',
        title: 'Dépannage plomberie à Lorient et dans le Morbihan',
        description: 'Intervention rapide pour vos dépannages et installations.',
      },
      {
        id: 'ocean',
        domain: 'artisan-ocean.fr',
        title: 'Artisan plombier à Lorient',
        description: 'Travaux de plomberie, rénovation et dépannage.',
      },
      {
        id: 'client',
        domain: 'votreentreprise.fr',
        title: 'Plombier à Lorient | Dépannage et installation',
        description: 'Intervention à Lorient et ses alentours. Devis gratuit et équipe locale.',
        client: true,
      },
    ],
  },
  {
    query: 'agence immobilière le mans',
    results: [
      {
        id: 'annuaire',
        domain: 'immobilier-sarthe.fr',
        title: 'Agences immobilières au Mans',
        description: 'Les professionnels de l’immobilier près de chez vous.',
      },
      {
        id: 'armor',
        domain: 'habitat-manceau.fr',
        title: 'Vente et location immobilière au Mans',
        description: 'Découvrez les biens disponibles dans toute la Sarthe.',
      },
      {
        id: 'ocean',
        domain: 'clefs-du-mans.fr',
        title: 'Votre agence immobilière de proximité',
        description: 'Estimation, achat et vente de biens au Mans.',
      },
      {
        id: 'client',
        domain: 'votreentreprise.fr',
        title: 'Agence immobilière au Mans | Estimation offerte',
        description: 'Une équipe locale pour vendre, acheter ou faire estimer votre bien.',
        client: true,
      },
    ],
  },
  {
    query: 'paysagiste vannes',
    results: [
      {
        id: 'annuaire',
        domain: 'jardins-morbihan.fr',
        title: 'Paysagistes autour de Vannes',
        description: 'Comparez les entreprises d’aménagement extérieur.',
      },
      {
        id: 'armor',
        domain: 'nature-vannetaise.fr',
        title: 'Entretien de jardins à Vannes',
        description: 'Création et entretien de vos espaces verts.',
      },
      {
        id: 'ocean',
        domain: 'atelier-des-jardins.fr',
        title: 'Aménagement paysager dans le Golfe du Morbihan',
        description: 'Des extérieurs conçus pour durer toute l’année.',
      },
      {
        id: 'client',
        domain: 'votreentreprise.fr',
        title: 'Paysagiste à Vannes | Création et entretien',
        description: 'Conception de jardins, terrasses et aménagements autour de Vannes.',
        client: true,
      },
    ],
  },
]

const benefits = [
  { label: 'Référencement local', icon: MapPin },
  { label: 'Plus de visibilité', icon: Eye },
  { label: 'Trafic qualifié', icon: UsersRound },
  { label: 'Plus de demandes', icon: PhoneCall },
  { label: 'Résultats durables', icon: TrendingUp },
]

const wait = (duration: number) =>
  new Promise<void>(resolve => window.setTimeout(resolve, duration))

function GoogleWordmark() {
  return (
    <span className="google-wordmark" aria-label="Google">
      <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
    </span>
  )
}

const subscribeHydration = () => () => {}

export function BentoSearchDemo({ active }: { active: boolean }) {
  const motionPreference = useReducedMotion()
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false)
  const reduceMotion = hydrated && motionPreference
  const [queryIndex, setQueryIndex] = useState(0)
  const [typedQuery, setTypedQuery] = useState(reduceMotion ? searches[0].query : '')
  const [phase, setPhase] = useState<Phase>(reduceMotion ? 'winner' : 'typing')
  const [results, setResults] = useState<SearchResult[]>(
    reduceMotion
      ? [searches[0].results[3], ...searches[0].results.slice(0, 3)]
      : []
  )
  const visualQueryIndex = reduceMotion ? 0 : queryIndex
  const visualQuery = reduceMotion ? searches[0].query : typedQuery
  const visualPhase: Phase = reduceMotion ? 'winner' : phase
  const visualResults = reduceMotion
    ? [searches[0].results[3], ...searches[0].results.slice(0, 3)]
    : results

  useEffect(() => {
    if (reduceMotion || !active) return

    let cancelled = false

    async function runDemonstration() {
      let currentSearch = 0

      while (!cancelled) {
        const search = searches[currentSearch]
        setQueryIndex(currentSearch)
        setResults([])
        setTypedQuery('')
        setPhase('typing')

        await wait(450)
        for (let character = 1; character <= search.query.length; character += 1) {
          if (cancelled) return
          setTypedQuery(search.query.slice(0, character))
          await wait(62)
        }

        if (cancelled) return
        setPhase('loading')
        await wait(720)

        if (cancelled) return
        setResults(search.results)
        setPhase('results')
        await wait(900)

        setPhase('climbing')
        const client = search.results.find(result => result.client)!
        const competitors = search.results.filter(result => !result.client)

        for (const position of [3, 2, 1]) {
          if (cancelled) return
          setResults([
            ...competitors.slice(0, position - 1),
            client,
            ...competitors.slice(position - 1),
          ])
          await wait(820)
        }

        if (cancelled) return
        setPhase('winner')
        await wait(2600)

        setPhase('deleting')
        for (let character = search.query.length - 1; character >= 0; character -= 1) {
          if (cancelled) return
          setTypedQuery(search.query.slice(0, character))
          await wait(34)
        }

        currentSearch = (currentSearch + 1) % searches.length
        await wait(300)
      }
    }

    void runDemonstration()
    return () => {
      cancelled = true
    }
  }, [reduceMotion, active])

  return (
        <div className="seo-demo-wrap">
          <p className="sr-only">
            Démonstration : un site client remonte progressivement de la quatrième à la première position dans Google.
          </p>
          <motion.div
            className="seo-browser"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <div className="seo-search-header">
              <GoogleWordmark />
              <div className={`seo-search-field is-${visualPhase}`}>
                <Search aria-hidden="true" />
                <span className="seo-query">
                  {visualQuery}
                  {(visualPhase === 'typing' || visualPhase === 'deleting') && (
                    <span className="seo-caret" />
                  )}
                </span>
                {visualQuery && <X className="seo-search-action" aria-hidden="true" />}
                <Mic className="seo-search-action seo-mic" aria-hidden="true" />
                <Camera className="seo-search-action seo-camera" aria-hidden="true" />
              </div>
            </div>

            <div className="seo-tabs">
              <span className="is-active">Tous</span>
              <span>Maps</span>
              <span>Images</span>
              <span>Vidéos</span>
              <span>Actualités</span>
            </div>

            <div className="seo-results-area">
              {visualPhase === 'loading' && (
                <motion.div
                  className="seo-loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span />
                  Recherche des meilleurs résultats locaux…
                </motion.div>
              )}

              <AnimatePresence initial={false}>
                {visualResults.map((result, index) => {
                  const winner = result.client && index === 0 && visualPhase === 'winner'
                  return (
                    <motion.article
                      layout
                      key={result.id}
                      className={`seo-result ${result.client ? 'is-client' : ''} ${winner ? 'is-winner' : ''}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{
                        layout: { type: 'spring', stiffness: 170, damping: 23 },
                        opacity: { duration: 0.3 },
                      }}
                    >
                      <span className="seo-rank">{index + 1}</span>
                      <div className="seo-result-content">
                        <div className="seo-result-domain">
                          {result.client ? (
                            <Image src="/brand/litus-mark.webp" alt="" width={20} height={20} />
                          ) : (
                            <span className="seo-favicon" />
                          )}
                          <span>{result.domain}</span>
                          {winner && (
                            <motion.strong
                              initial={{ opacity: 0, scale: 0.94 }}
                              animate={{ opacity: 1, scale: 1 }}
                            >
                              1re position ↑
                            </motion.strong>
                          )}
                        </div>
                        <h3>{result.title}</h3>
                        <p>{result.description}</p>
                      </div>
                    </motion.article>
                  )
                })}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {visualPhase === 'winner' && (
                <motion.div
                  className="seo-progress-note"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  <TrendingUp aria-hidden="true" />
                  <span><strong>+230 % de visites</strong> en 3 mois</span>
                </motion.div>
              )}
            </AnimatePresence>

            <span className="seo-cycle-indicator">
              {String(visualQueryIndex + 1).padStart(2, '0')} / {String(searches.length).padStart(2, '0')}
            </span>
          </motion.div>
        </div>
  )
}
