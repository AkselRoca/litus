'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Landmark, Pause, Play, Waves } from 'lucide-react'
import { TerritoryMap, type TerritoryCity } from './TerritoryMap'

const cities = [
  { id: 'lorient', name: 'Lorient', photo: '/territories/lorient-port.webp', alt: 'Voiliers du port de plaisance de Lorient, quai de Rohan', subtitle: ['Un territoire connecté', 'sur le monde'], href: '/agence-web-lorient', Icon: Waves },
  { id: 'le-mans', name: 'Le Mans', photo: '/le-mans-centre-cathedrale.webp', alt: 'La cathédrale Saint-Julien du Mans, vue depuis la place des Jacobins', subtitle: ['Un territoire qui avance,', 'des projets qui grandissent'], href: '/agence-web-le-mans', Icon: Landmark },
] as const

function subscribeToVisibility(onChange: () => void) {
  document.addEventListener('visibilitychange', onChange)
  return () => document.removeEventListener('visibilitychange', onChange)
}
const getVisibility = () => document.visibilityState === 'visible'
const getServerVisibility = () => false
function subscribeToMotion(onChange: () => void) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  preference.addEventListener('change', onChange)
  return () => preference.removeEventListener('change', onChange)
}
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const getServerReducedMotion = () => true
const otherCity = (city: TerritoryCity): TerritoryCity => city === 'lorient' ? 'le-mans' : 'lorient'

function GoogleMark() {
  return <svg className="territory-google-mark" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285f4" d="M43.6 24.5c0-1.3-.1-2.6-.4-3.9H24v7.5h11a9.4 9.4 0 0 1-4.1 6.2v5.2h6.7c3.9-3.6 6-8.8 6-15Z" /><path fill="#34a853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.2c-1.9 1.3-4.2 2-6.8 2-5.2 0-9.7-3.5-11.3-8.2H5.8v5.4A20.4 20.4 0 0 0 24 44Z" /><path fill="#fbbc05" d="M12.7 27.7a12.2 12.2 0 0 1 0-7.4v-5.4H5.8a20 20 0 0 0 0 18.2Z" /><path fill="#ea4335" d="M24 12.1c3 0 5.5 1 7.5 2.9l5.6-5.5A19.6 19.6 0 0 0 24 4 20.4 20.4 0 0 0 5.8 14.9l6.9 5.4C14.3 15.6 18.8 12.1 24 12.1Z" /></svg>
}

export function TerritoryScene() {
  const [city, setCity] = useState<TerritoryCity>('lorient')
  const [hoveringMap, setHoveringMap] = useState(false)
  const [hoveringPhoto, setHoveringPhoto] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const [paused, setPaused] = useState(false)
  const photoRef = useRef<HTMLElement>(null)
  const photoEntered = useRef(false)
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getReducedMotion, getServerReducedMotion)
  const photoInView = useInView(photoRef, { amount: .25 })
  const pageVisible = useSyncExternalStore(subscribeToVisibility, getVisibility, getServerVisibility)
  const interacting = hoveringMap || hoveringPhoto || focusWithin

  // A fresh six-second delay follows every selection or interaction. Both images
  // stay mounted, so a switch never changes the frame or waits for a new download.
  useEffect(() => {
    if (paused || interacting || reducedMotion !== false || !photoInView || !pageVisible) return
    const timeout = window.setTimeout(() => setCity(otherCity), 6000)
    return () => window.clearTimeout(timeout)
  }, [city, paused, interacting, reducedMotion, photoInView, pageVisible])

  return <div className="territory-scene" aria-label="Litus, deux territoires : Lorient et Le Mans" data-selected-city={city}
    onFocusCapture={() => setFocusWithin(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false) }}>
    <TerritoryMap city={city} onSelect={setCity} onHoverChange={setHoveringMap} />
    <Link href="/referencement-naturel" className="territory-google-card" data-motion-layer="google-card" aria-label="En top sur Google — découvrir notre expertise en référencement naturel">
      <div className="territory-google-heading"><GoogleMark /><span>En top sur <strong>Google</strong></span></div>
      <ol>{['votre activité + Lorient', 'votre activité + Le Mans', 'services + votre ville'].map((text, index) => <li key={text}><b>{index + 1}</b><span>{text}</span><ChevronRight aria-hidden="true" /></li>)}</ol>
    </Link>
    <figure ref={photoRef} id="territory-city-photo" className="territory-city-card" data-motion-layer="city-photo" aria-label="Nos implantations" aria-roledescription="carrousel"
      onPointerEnter={event => {
        if (event.pointerType === 'touch' || photoEntered.current) return
        photoEntered.current = true
        setHoveringPhoto(true)
        // Keyboard focus keeps its current link stable, even if the mouse enters.
        if (!focusWithin) setCity(otherCity)
      }}
      onPointerLeave={() => { photoEntered.current = false; setHoveringPhoto(false) }}>
      {cities.map(place => <div key={place.id} className={`territory-photo-layer territory-photo-layer--${place.id}`} data-active={city === place.id} aria-hidden={city !== place.id}>
        <Image src={place.photo} alt={place.alt} fill sizes="(max-width: 1179px) 45vw, 29vw" loading="lazy" />
      </div>)}
      <figcaption>
        {cities.map(({ id, name, href, subtitle, Icon }) => <div key={id} className="territory-city-caption" data-active={city === id} aria-hidden={city !== id} inert={city !== id}>
          <Icon aria-hidden="true" /><div><strong><Link href={href}>{name}</Link></strong><span>{subtitle[0]}<br />{subtitle[1]}</span></div>
        </div>)}
      </figcaption>
      {!reducedMotion && <button type="button" className="territory-photo-playback" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Reprendre le défilement des villes' : 'Mettre le défilement des villes en pause'} title={paused ? 'Reprendre le défilement' : 'Mettre en pause'}>
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>}
    </figure>
    <div className="territory-city-preview" aria-hidden="true" data-motion-layer="city-preview">
      {cities.map(({ id, name, photo, Icon }) => <div key={id} className={`territory-photo-layer territory-photo-layer--${id}`} data-active={city !== id}>
        <Image src={photo} alt="" fill sizes="(max-width: 1179px) 1px, 21vw" />
        <div className="territory-preview-caption"><Icon /><div><strong>{name}</strong><span>{id === 'lorient' ? 'Mer, innovation et dynamisme' : 'Patrimoine et opportunités'}</span></div></div>
      </div>)}
    </div>
  </div>
}
