'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowRight, Battery, Bookmark, Check, Globe2, Home, MapPin, MoreHorizontal, Navigation, Pause, Phone, Play, RotateCcw, Search, Signal, Wifi, Wrench } from 'lucide-react'
import { useArtisanSequence } from './ArtisansHeroDemo'
import './artisans-phone-demo.css'

type ArtisansPhoneDemoProps = { photoSrc?: string; photoAlt?: string }
const query = 'menuisier Lorient'

export function ArtisansPhoneDemo({ photoSrc = '/artisans/atelier-bois.webp', photoAlt = 'Outils de menuiserie et établi dans un atelier éclairé par une fenêtre' }: ArtisansPhoneDemoProps = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const sequence = useArtisanSequence(ref, 3800)
  const [contactExample, setContactExample] = useState(false)
  const profileVisible = sequence.staticPresentation || sequence.elapsed >= 1650
  const queryText = sequence.staticPresentation ? query : query.slice(0, Math.max(0, Math.floor((sequence.elapsed - 250) / 65)))
  const highlighting = !sequence.staticPresentation && sequence.elapsed >= 2550 && sequence.elapsed < 3500

  return (
    <div ref={ref} className="art-phone-demo" data-animate={!sequence.staticPresentation} role="group" aria-label="Exemple de fiche artisan consultée sur téléphone">
      <div className="art-phone-frame">
        <div className="art-phone-screen">
          <div className="art-phone-status" aria-hidden="true"><span>9:41</span><i /><div><Signal /><Wifi /><Battery /></div></div>
          <div className="art-phone-google-bar"><Image src="/brands/google-color.svg" alt="Google" width={26} height={26} /><span>Recherche locale</span><MoreHorizontal aria-hidden="true" /></div>
          <div className="art-phone-search"><Search aria-hidden="true" /><span>{queryText}<i className={!sequence.staticPresentation && sequence.elapsed < 1350 ? 'is-visible' : ''} aria-hidden="true" /></span></div>
          <div className="art-phone-search-tabs" aria-hidden="true"><b>Tous</b><span>Maps</span><span>Images</span></div>
          <div className="art-phone-profile" data-visible={profileVisible} aria-hidden={!profileVisible}>
            <div className="art-phone-photo">{photoSrc ? <Image src={photoSrc} alt={photoAlt} fill sizes="260px" /> : <div className="art-phone-tools-illustration" aria-hidden="true"><svg viewBox="0 0 240 95" fill="none"><path d="M0 80h240M32 0v80M201 0v80" /><rect x="74" y="17" width="95" height="57" rx="4" /><path d="M87 45h69M103 31v28M139 31v28" /></svg><span><Wrench /><small>Le savoir-faire<br />près de chez vous.</small></span></div>}<span>Exemple de fiche artisan</span></div>
            <div className="art-phone-profile-heading"><p>Votre entreprise</p><span>Menuiserie · Lorient</span></div>
            <div className="art-phone-profile-actions" aria-hidden="true"><span><Phone />Appeler</span><span><Navigation />Itinéraire</span><span><Globe2 />Site web</span></div>
            <button type="button" className={`art-phone-contact ${highlighting ? 'is-highlighted' : ''}`} tabIndex={profileVisible ? 0 : -1} onClick={() => setContactExample(true)} aria-label="Simuler une demande de devis auprès de cet artisan">Demander un devis<ArrowRight aria-hidden="true" /></button>
            <div className="art-phone-contact-explanation" aria-live="polite">{contactExample ? <><Check aria-hidden="true" /><span>Exemple uniquement : aucune demande envoyée.</span></> : <><MapPin aria-hidden="true" /><span>Votre activité. Votre zone. Un contact direct.</span></>}</div>
            <div className="art-phone-profile-tabs" aria-hidden="true"><b>Aperçu</b><span>Services</span><span>Photos</span></div>
            <div className="art-phone-overview"><strong>Menuiserie sur mesure</strong><p>Agencement · Fenêtres · Portes</p><span>Décrivez votre projet et échangez directement avec votre artisan.</span></div>
          </div>
          <div className="art-phone-bottom-nav" aria-hidden="true"><span><Home />Accueil</span><span><Search />Rechercher</span><span><Bookmark />Enregistrés</span></div>
          <div className="art-phone-home-indicator" aria-hidden="true" />
        </div>
      </div>
      <div className="art-phone-annotation" aria-hidden="true"><p>Votre savoir-faire,<br />plus facile à trouver.</p><svg viewBox="0 0 120 70" fill="none"><path d="M8 9c13 29 44 47 89 35M86 34l15 9-13 13" /></svg></div>
      <div className="art-phone-demo-controls"><span>Fiche et parcours illustratifs</span>{sequence.controlsVisible && <button type="button" onClick={sequence.complete ? () => { sequence.replay(); setContactExample(false) } : sequence.toggle} aria-label={sequence.complete ? 'Rejouer la recherche sur téléphone' : sequence.playing ? 'Mettre la recherche sur téléphone en pause' : 'Reprendre la recherche sur téléphone'}>{sequence.complete ? <RotateCcw aria-hidden="true" /> : sequence.playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{sequence.complete ? 'Rejouer' : sequence.playing ? 'Pause' : 'Reprendre'}</button>}</div>
    </div>
  )
}
