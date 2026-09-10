'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronRight, X } from 'lucide-react'
import './cookie-banner.css'

interface CookiePreferences { essential: true; analytics: boolean; marketing: boolean }
const ESSENTIAL_ONLY: CookiePreferences = { essential: true, analytics: false, marketing: false }

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(ESSENTIAL_ONLY)
  const panelRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      const timer = window.setTimeout(() => setIsVisible(true), 700)
      return () => window.clearTimeout(timer)
    }
  }, [])

  const saveConsent = (next: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(next))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setPreferences(next)
    setIsVisible(false)
  }

  useEffect(() => {
    if (!isVisible) return
    const dismissOutside = (event: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) saveConsent(ESSENTIAL_ONLY)
    }
    document.addEventListener('pointerdown', dismissOutside)
    return () => document.removeEventListener('pointerdown', dismissOutside)
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside className="cookie-banner" aria-label="Préférences de confidentialité" initial={reduceMotion ? false : { y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduceMotion ? { opacity: 0 } : { y: 16, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}>
          <div className="cookie-banner-panel" ref={panelRef}>
            <button className="cookie-banner-close" onClick={() => saveConsent(ESSENTIAL_ONLY)} aria-label="Fermer et conserver uniquement les cookies essentiels"><X aria-hidden="true" /></button>
            <div className="cookie-banner-brand" aria-hidden="true"><Image src="/logo-sans-fond.png" alt="" width={37} height={43} /></div>

            {!showDetails ? (
              <div className="cookie-banner-simple">
                <div className="cookie-banner-copy">
                  <p className="cookie-banner-eyebrow">Votre confidentialité</p>
                  <h2>Des cookies, en toute transparence.</h2>
                  <p>Nous utilisons les éléments essentiels au site et, avec votre accord, des outils de mesure pour améliorer votre expérience. <Link href="/politique-confidentialite">En savoir plus</Link></p>
                </div>
                <div className="cookie-banner-actions">
                  <button className="cookie-button cookie-button-primary" onClick={() => saveConsent({ essential: true, analytics: true, marketing: true })}>Tout accepter <ChevronRight aria-hidden="true" /></button>
                  <button className="cookie-button cookie-button-secondary" onClick={() => saveConsent(ESSENTIAL_ONLY)}>Essentiels uniquement</button>
                  <button className="cookie-button-link" onClick={() => setShowDetails(true)}>Personnaliser</button>
                </div>
              </div>
            ) : (
              <div className="cookie-banner-details">
                <div className="cookie-banner-copy"><p className="cookie-banner-eyebrow">Réglages</p><h2>Vos préférences</h2></div>
                <div className="cookie-preference-list">
                  <PreferenceRow label="Essentiels" description="Fonctionnement et mémorisation de votre choix" active locked />
                  <PreferenceRow label="Mesure d’audience" description="Comprendre l’utilisation du site" active={preferences.analytics} onToggle={() => setPreferences((current) => ({ ...current, analytics: !current.analytics }))} />
                  <PreferenceRow label="Marketing" description="Mesurer les campagnes publicitaires" active={preferences.marketing} onToggle={() => setPreferences((current) => ({ ...current, marketing: !current.marketing }))} />
                </div>
                <div className="cookie-banner-actions cookie-banner-actions-details">
                  <button className="cookie-button cookie-button-secondary" onClick={() => saveConsent(ESSENTIAL_ONLY)}>Tout refuser</button>
                  <button className="cookie-button cookie-button-primary" onClick={() => saveConsent(preferences)}><Check aria-hidden="true" /> Enregistrer</button>
                </div>
              </div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

function PreferenceRow({ label, description, active, locked = false, onToggle }: { label: string; description: string; active: boolean; locked?: boolean; onToggle?: () => void }) {
  return <div className="cookie-preference-row"><div><strong>{label}</strong><span>{description}</span></div>{locked ? <span className="cookie-always-on">Toujours actif</span> : <button className="cookie-switch" data-active={active || undefined} onClick={onToggle} role="switch" aria-checked={active} aria-label={`${label} : ${active ? 'activé' : 'désactivé'}`}><span /></button>}</div>
}
