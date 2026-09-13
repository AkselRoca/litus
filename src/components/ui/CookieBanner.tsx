'use client'

import Image from 'next/image'
import Link from '@/components/ui/IntentLink'
import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Cookie, X } from 'lucide-react'
import { CONSENT_EVENT, essentialOnly, readCookieConsent, saveCookieConsent, type CookiePreferences } from '@/lib/cookie-consent'
import './cookie-banner.css'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [manuallyOpened, setManuallyOpened] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(essentialOnly)
  const trigger = useRef<HTMLButtonElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const sync = () => {
      const stored = readCookieConsent()
      setPreferences(stored || essentialOnly)
      setIsVisible(!stored)
      if (!stored) delete document.documentElement.dataset.cookieConsent
    }
    sync()
    window.addEventListener(CONSENT_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  function save(preferences: CookiePreferences) {
    saveCookieConsent(preferences)
    setPreferences(preferences)
    setIsVisible(false)
    setShowDetails(false)
    setManuallyOpened(false)
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }))
  }

  function open() {
    setPreferences(readCookieConsent() || essentialOnly)
    setManuallyOpened(true)
    setShowDetails(true)
    setIsVisible(true)
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }))
  }

  return <>
    <button ref={trigger} className="cookie-preferences-trigger" type="button" onClick={open} hidden={isVisible} aria-controls="cookie-preferences" aria-expanded={isVisible}>
      <Cookie size={16} aria-hidden="true" /> Cookies
    </button>
    {isVisible && <aside id="cookie-preferences" className="cookie-banner" data-open={manuallyOpened ? 'true' : undefined} aria-labelledby="cookie-heading">
      <div className="cookie-banner-panel">
        <button className="cookie-banner-close" type="button" aria-label="Fermer et conserver uniquement les cookies essentiels" onClick={() => save(essentialOnly)}><X size={17} aria-hidden="true" /></button>
        <div className="cookie-banner-brand"><Image src="/brand/litus-mark.webp" alt="" width={37} height={43} /></div>
        <div className="cookie-banner-simple">
          <div className="cookie-banner-copy">
            <span className="cookie-banner-eyebrow">Votre confidentialité</span>
            <h2 id="cookie-heading" ref={heading} tabIndex={-1}>Des cookies, en toute transparence.</h2>
            <p>Nous utilisons les éléments essentiels au site et, avec votre accord, des outils de mesure pour améliorer votre expérience. <Link href="/politique-confidentialite">En savoir plus</Link>.</p>
          </div>
          {showDetails && <div className="cookie-banner-details">
            <Preference label="Essentiels" description="Nécessaires au fonctionnement et à la sécurité du site." enabled locked />
            <Preference label="Mesure d’audience" description="Comprendre les visites et mesurer les performances pour améliorer le site." enabled={preferences.analytics} onToggle={() => setPreferences(value => ({ ...value, analytics: !value.analytics }))} />
            <Preference label="Marketing" description="Autoriser les éventuels outils publicitaires. Aucun outil publicitaire n’est chargé par ce bandeau." enabled={preferences.marketing} onToggle={() => setPreferences(value => ({ ...value, marketing: !value.marketing }))} />
          </div>}
          <div className="cookie-banner-actions">
            {showDetails ? <>
              <button className="cookie-button cookie-button-primary" type="button" onClick={() => save(preferences)}>Enregistrer mes choix</button>
              <button className="cookie-button cookie-button-secondary" type="button" onClick={() => save(essentialOnly)}>Tout refuser</button>
            </> : <>
              <button className="cookie-button cookie-button-primary" type="button" onClick={() => save({ essential: true, analytics: true, marketing: true })}>Tout accepter</button>
              <button className="cookie-button cookie-button-secondary" type="button" onClick={() => save(essentialOnly)}>Essentiels uniquement</button>
              <button className="cookie-button cookie-button-customize" type="button" onClick={() => setShowDetails(true)}>Personnaliser <ChevronRight size={14} aria-hidden="true" /></button>
            </>}
          </div>
        </div>
      </div>
    </aside>}
  </>
}

function Preference({ label, description, enabled, locked = false, onToggle }: { label: string; description: string; enabled: boolean; locked?: boolean; onToggle?: () => void }) {
  return <div className="cookie-preference-line"><div><strong>{label}</strong><p>{description}</p></div><button type="button" role="switch" aria-label={label} aria-checked={enabled} disabled={locked} onClick={onToggle}>{locked ? 'Requis' : enabled ? 'Activés' : 'Désactivés'}</button></div>
}

export default CookieBanner
