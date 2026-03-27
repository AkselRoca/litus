'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, Check } from 'lucide-react'
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
            setTimeout(() => setIsVisible(true), 1500)
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

        if (prefs.analytics) {
            console.log('Analytics enabled')
        }
        if (prefs.marketing) {
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
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-4 left-4 right-4 z-50 flex justify-center"
                >
                    <div className="w-full max-w-2xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden">
                        {!showDetails ? (
                            /* Vue simple */
                            <div className="p-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Shield className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                            Cookies
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4">
                                            Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.
                                            <br />
                                            <Link href="/politique-confidentialite" className="text-primary hover:underline">
                                                En savoir plus
                                            </Link>
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <button
                                                onClick={handleAcceptAll}
                                                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                                            >
                                                Tout accepter
                                            </button>
                                            <button
                                                onClick={handleAcceptEssential}
                                                className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10"
                                            >
                                                Essentiels uniquement
                                            </button>
                                            <button
                                                onClick={() => setShowDetails(true)}
                                                className="px-3 py-2 text-gray-400 hover:text-gray-600 dark:hover:text-white text-xs transition-colors"
                                            >
                                                Personnaliser
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleAcceptEssential}
                                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors flex-shrink-0"
                                        aria-label="Fermer"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Vue détaillée */
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Préférences cookies</h3>
                                    <button
                                        onClick={() => setShowDetails(false)}
                                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {/* Essentiels */}
                                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                        <div>
                                            <div className="text-xs font-medium text-gray-900 dark:text-white">Essentiels</div>
                                            <div className="text-[11px] text-gray-500 dark:text-gray-400">Nécessaires au fonctionnement</div>
                                        </div>
                                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                                            Toujours actif
                                        </span>
                                    </div>

                                    {/* Analytiques */}
                                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                        <div>
                                            <div className="text-xs font-medium text-gray-900 dark:text-white">Analytiques</div>
                                            <div className="text-[11px] text-gray-500 dark:text-gray-400">Mesure d&apos;audience anonymisée</div>
                                        </div>
                                        <button
                                            onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                                            className={`relative w-10 h-6 rounded-full transition-colors ${
                                                preferences.analytics ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                                            }`}
                                        >
                                            <span
                                                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                                                    preferences.analytics ? 'translate-x-4' : ''
                                                }`}
                                            />
                                        </button>
                                    </div>

                                    {/* Marketing */}
                                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                        <div>
                                            <div className="text-xs font-medium text-gray-900 dark:text-white">Marketing</div>
                                            <div className="text-[11px] text-gray-500 dark:text-gray-400">Personnalisation et publicités</div>
                                        </div>
                                        <button
                                            onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                                            className={`relative w-10 h-6 rounded-full transition-colors ${
                                                preferences.marketing ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                                            }`}
                                        >
                                            <span
                                                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                                                    preferences.marketing ? 'translate-x-4' : ''
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={handleAcceptEssential}
                                        className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10"
                                    >
                                        Refuser optionnels
                                    </button>
                                    <button
                                        onClick={handleSaveCustom}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        <Check className="w-3.5 h-3.5" />
                                        Enregistrer
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
