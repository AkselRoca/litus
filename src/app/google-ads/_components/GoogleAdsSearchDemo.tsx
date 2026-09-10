'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useInView } from 'framer-motion'
import { ArrowRight, Check, ChevronRight, Mail, MapPin, MoreVertical, Pause, Phone, Play, Search } from 'lucide-react'
import './google-ads-search-demo.css'

const examples = [
  {
    query: 'plombier Lorient',
    city: 'Lorient',
    title: 'Plombier à Lorient — Intervention et rénovation',
    description: 'Installation, dépannage et rénovation. Une équipe locale à votre écoute pour vos travaux.',
  },
  {
    query: 'entreprise rénovation Le Mans',
    city: 'Le Mans',
    title: 'Rénovation au Mans — Parlons de votre projet',
    description: 'Des travaux pensés pour votre maison. Présentez-nous votre besoin et échangeons sur votre projet.',
  },
]

const subscribeHydration = () => () => {}
const getHydrated = () => true
const getServerHydrated = () => false
const subscribeMotion = (callback: () => void) => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  preference.addEventListener('change', callback)
  return () => preference.removeEventListener('change', callback)
}
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const getServerMotion = () => false
const subscribeVisibility = (callback: () => void) => {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
const getVisibility = () => document.visibilityState === 'visible'
const getServerVisibility = () => true

function getTimings(query: string) {
  const typingStart = 550
  const typingEnd = typingStart + query.length * 66
  const ad = typingEnd + 550
  const map = ad + 750
  const lead = map + 800
  const deletingStart = lead + 6000
  const deletingEnd = deletingStart + query.length * 36
  return { typingStart, typingEnd, ad, map, lead, deletingStart, deletingEnd, total: deletingEnd + 1000 }
}

function LocalMap({ city }: { city: string }) {
  return (
    <div className="gad-search-map" aria-label={`Illustration d’une zone de diffusion à ${city}`}>
      <svg className="gad-search-map-drawing" viewBox="0 0 240 300" fill="none" aria-hidden="true">
        <rect width="240" height="300" fill="#f0f4ed" />
        <path d="M0 239 33 221 28 193 61 165 55 146 93 122 109 119 126 90 156 79 166 47 190 32 211 0H244V300H0Z" fill="#e4eef2" />
        <path d="m0 70 57 15 28-34 22 18 31-33 26 18 45-27 31 15M15 0l3 82 31 41-15 43 25 28-8 43 27 63M104 0 88 50l16 45-25 33 18 25-23 38 24 20-15 47 20 42M176 0l-15 53 20 40-31 43 19 34-23 49 21 33-20 48M240 91l-42 13-32-13-43 20-32-11-36 19-55-8M0 178l34-7 44 17 53-11 43 14 42-10 24 14M0 256l46-9 43 21 49-17 48 18 54-8" stroke="#fff" strokeWidth="6" strokeLinejoin="round" />
        <path d="M-14 116 33 109 57 120 101 116 123 105 167 112 185 130 244 137M127-5l-3 61 14 42-6 52 14 44-9 65 11 45" stroke="#dce3dc" strokeWidth="2" />
        <path d="M-5 213 58 196 91 176 131 175 169 146 218 133 248 126" stroke="#fff" strokeWidth="10" />
        <path d="M-5 213 58 196 91 176 131 175 169 146 218 133 248 126" stroke="#e3e8de" strokeWidth="2" />
        <circle cx="137" cy="154" r="48" fill="#e95e2a" fillOpacity=".07" stroke="#d89372" strokeWidth="1" strokeDasharray="4 5" />
      </svg>
      <div className="gad-search-map-pin"><MapPin aria-hidden="true" /><span /></div>
      <div className="gad-search-map-caption"><strong>{city}</strong><span>Zone de diffusion</span></div>
    </div>
  )
}

export function GoogleAdsSearchDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: .25 })
  const hydrated = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated)
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerMotion)
  const visible = useSyncExternalStore(subscribeVisibility, getVisibility, getServerVisibility)
  const [playing, setPlaying] = useState(true)
  const [timeline, setTimeline] = useState({ example: 0, elapsed: 0 })
  const example = examples[timeline.example]
  const timings = getTimings(example.query)
  const staticPresentation = !hydrated || reducedMotion
  const elapsed = timeline.elapsed

  useEffect(() => {
    if (!hydrated || reducedMotion || !playing || !inView || !visible) return
    const timer = window.setTimeout(() => {
      setTimeline(previous => previous.elapsed + 55 >= timings.total
        ? { example: (previous.example + 1) % examples.length, elapsed: 0 }
        : { ...previous, elapsed: previous.elapsed + 55 })
    }, 55)
    return () => window.clearTimeout(timer)
  }, [hydrated, reducedMotion, playing, inView, visible, elapsed, timings.total])

  const deleting = elapsed >= timings.deletingStart
  const typedCount = deleting
    ? Math.max(0, example.query.length - Math.floor((elapsed - timings.deletingStart) / 36))
    : Math.max(0, Math.min(example.query.length, Math.floor((elapsed - timings.typingStart) / 66)))
  const query = staticPresentation ? example.query : example.query.slice(0, typedCount)
  const adVisible = staticPresentation || (elapsed >= timings.ad && !deleting)
  const mapVisible = staticPresentation || (elapsed >= timings.map && !deleting)
  const leadVisible = staticPresentation || (elapsed >= timings.lead && !deleting)
  const typing = !staticPresentation && (elapsed < timings.typingEnd || deleting)

  return (
    <div ref={ref} className="gad-search-demo" role="group" aria-label="Démonstration d’une recherche locale et d’une annonce Google Ads" data-motion={staticPresentation ? 'off' : 'on'}>
      <div className="gad-search-stage">
        <div className="gad-search-frame">
          <div className="gad-search-browser-bar" aria-hidden="true"><i /><i /><i /><span /></div>
          <div className="gad-search-page">
            <div className="gad-search-header"><Image className="gad-search-google" src="/brands/google-color.svg" alt="Google" width={30} height={30} /><div className="gad-search-query"><span>{query}<i className={typing ? 'gad-search-caret is-visible' : 'gad-search-caret'} aria-hidden="true" /></span><Search aria-hidden="true" /></div></div>
            <div className="gad-search-tabs" aria-hidden="true"><b>Tous</b><span>Maps</span><span>Images</span><span>Actualités</span><span>Vidéos</span><MoreVertical /></div>
            <div className="gad-search-content">
              <article className="gad-search-ad" data-visible={adVisible} aria-hidden={!adVisible}>
                <p className="gad-search-sponsored">Sponsorisé</p>
                <div className="gad-search-ad-company"><span>V</span><p>Votre entreprise<small>votre-entreprise.example</small></p><MoreVertical aria-hidden="true" /></div>
                <p className="gad-search-ad-title">{example.title}</p>
                <p className="gad-search-ad-description">{example.description}</p>
                <span className="gad-search-ad-action"><Phone aria-hidden="true" />Nous contacter<ChevronRight aria-hidden="true" /></span>
              </article>
              <div className="gad-search-organic-placeholder" aria-hidden="true"><i /><i /><i /><i /></div>
            </div>
          </div>
        </div>
        <div className="gad-search-map-wrap" data-visible={mapVisible} aria-hidden={!mapVisible}><LocalMap city={example.city} /></div>
        <div className="gad-search-lead" data-visible={leadVisible} aria-hidden={!leadVisible}><span className="gad-search-lead-icon"><Mail aria-hidden="true" /><Check aria-hidden="true" /></span><div><strong>Demande de devis</strong><span>Exemple de parcours</span></div><ArrowRight aria-hidden="true" /></div>
      </div>
      <div className="gad-search-controls"><span>Annonce fictive · parcours illustratif</span>{hydrated && !reducedMotion && <button type="button" onClick={() => setPlaying(previous => !previous)} aria-label={playing ? 'Mettre la démonstration Google Ads en pause' : 'Reprendre la démonstration Google Ads'}>{playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{playing ? 'Pause' : 'Reprendre'}</button>}</div>
    </div>
  )
}
