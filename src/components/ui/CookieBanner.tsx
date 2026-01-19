'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Settings, Check } from 'lucide-react'
import Link from 'next/link'

type ConsentType = 'all' | 'essential' | 'custom' | null

interface CookiePreferences {
    essential: boolean
    analytics: boolean
    marketing: boolean
}

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [preferences, setPreferences] = useState<CookiePreferences>({
        essential: true,
        analytics: false,
        marketing: false,
    })

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            // Show banner after a short delay
            setTimeout(() => setIsVisible(true), 1000)
        }
    }, [])

    const handleAcceptAll = () => {
        const prefs: CookiePreferences = {
            essential: true,
            analytics: true,
            marketing: true,
        }
        saveConsent(prefs)
    }

    const handleAcceptEssential = () => {
        const prefs: CookiePreferences = {
            essential: true,
            analytics: false,
            marketing: false,
        }
        saveConsent(prefs)
    }

    const handleSaveCustom = () => {
        saveConsent(preferences)
    }

    const saveConsent = (prefs: CookiePreferences) => {
        localStorage.setItem('cookie-consent', JSON.stringify(prefs))
        localStorage.setItem('cookie-consent-date', new Date().toISOString())
        setIsVisible(false)

        // Here you would initialize analytics/marketing based on consent
        if (prefs.analytics) {
            // Initialize analytics (e.g., Plausible, GA)
            console.log('Analytics enabled')
        }
        if (prefs.marketing) {
            // Initialize marketing pixels
            console.log('Marketing enabled')
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4"
                >
                    <div className="max-w-4xl mx-auto bg-gray-900 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                        {!showDetails ? (
                            /* Simple View */
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <Cookie className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-white mb-2">
                                            🍪 Ce site utilise des cookies
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4">
                                            Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.
                                            Vous pouvez accepter tous les cookies ou personnaliser vos préférences.{' '}
                                            <Link href="/politique-confidentialite" className="text-primary hover:underline">
                                                En savoir plus
                                            </Link>
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                onClick={handleAcceptAll}
                                                className="px-5 py-2 bg-gradient-to-r from-primary to-orange-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                                            >
                                                Tout accepter
                                            </button>
                                            <button
                                                onClick={handleAcceptEssential}
                                                className="px-5 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
                                            >
                                                Essentiels uniquement
                                            </button>
                                            <button
                                                onClick={() => setShowDetails(true)}
                                                className="flex items-center gap-2 px-5 py-2 text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Settings className="w-4 h-4" />
                                                Personnaliser
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Detailed View */
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-white">Préférences cookies</h3>
                                    <button
                                        onClick={() => setShowDetails(false)}
                                        className="p-2 text-gray-400 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {/* Essential */}
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                        <div>
                                            <div className="text-white font-medium">Essentiels</div>
                                            <div className="text-gray-400 text-sm">Nécessaires au fonctionnement du site</div>
                                        </div>
                                        <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                            Toujours actif
                                        </div>
                                    </div>

                                    {/* Analytics */}
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                        <div>
                                            <div className="text-white font-medium">Analytiques</div>
                                            <div className="text-gray-400 text-sm">Mesure d'audience anonymisée</div>
                                        </div>
                                        <button
                                            onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                                            className={`relative w-12 h-7 rounded-full transition-colors ${preferences.analytics ? 'bg-primary' : 'bg-gray-600'
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${preferences.analytics ? 'translate-x-5' : ''
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    {/* Marketing */}
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                        <div>
                                            <div className="text-white font-medium">Marketing</div>
                                            <div className="text-gray-400 text-sm">Personnalisation et publicités</div>
                                        </div>
                                        <button
                                            onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                                            className={`relative w-12 h-7 rounded-full transition-colors ${preferences.marketing ? 'bg-primary' : 'bg-gray-600'
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${preferences.marketing ? 'translate-x-5' : ''
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={handleAcceptEssential}
                                        className="px-5 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
                                    >
                                        Refuser optionnels
                                    </button>
                                    <button
                                        onClick={handleSaveCustom}
                                        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary to-orange-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        <Check className="w-4 h-4" />
                                        Enregistrer mes choix
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
