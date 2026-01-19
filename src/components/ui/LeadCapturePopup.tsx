'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, ArrowRight, Sparkles } from 'lucide-react'

interface LeadCapturePopupProps {
    delayMs?: number
    scrollTriggerPercent?: number
}

export function LeadCapturePopup({
    delayMs = 60000, // 60 seconds
    scrollTriggerPercent = 50, // 50% scroll
}: LeadCapturePopupProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        // Check if already shown in this session
        const alreadyShown = sessionStorage.getItem('popup-shown')
        if (alreadyShown) return

        // Time-based trigger
        const timer = setTimeout(() => {
            setIsOpen(true)
            sessionStorage.setItem('popup-shown', 'true')
        }, delayMs)

        // Scroll-based trigger
        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            if (scrollPercent >= scrollTriggerPercent) {
                setIsOpen(true)
                sessionStorage.setItem('popup-shown', 'true')
                window.removeEventListener('scroll', handleScroll)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            clearTimeout(timer)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [delayMs, scrollTriggerPercent])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // TODO: Send to API
        await new Promise(resolve => setTimeout(resolve, 1000))

        setIsSubmitting(false)
        setIsSubmitted(true)

        setTimeout(() => {
            setIsOpen(false)
        }, 3000)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Popup Container - Flexbox pour centrage parfait */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="relative w-full max-w-lg pointer-events-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border border-white/20 p-8 shadow-2xl overflow-hidden">
                            {/* Close button - z-index élevé pour être au-dessus des glow effects */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Fermer"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Glow effect - pointer-events-none pour ne pas bloquer les clics */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative">
                                {!isSubmitted ? (
                                    <>
                                        {/* Icon */}
                                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                                            <Gift className="w-8 h-8 text-white" />
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
                                            🎁 Audit SEO Gratuit
                                        </h2>
                                        <p className="text-gray-400 text-center mb-6">
                                            Recevez un audit personnalisé de votre présence en ligne
                                            et découvrez vos axes d'amélioration.
                                        </p>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="votre@email.com"
                                                required
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-3 bg-gradient-to-r from-primary to-orange-500 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    'Envoi...'
                                                ) : (
                                                    <>
                                                        Recevoir mon audit gratuit
                                                        <ArrowRight className="w-5 h-5" />
                                                    </>
                                                )}
                                            </button>
                                        </form>

                                        {/* Trust */}
                                        <p className="text-gray-500 text-xs text-center mt-4">
                                            🔒 Vos données restent confidentielles. Pas de spam.
                                        </p>
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                            Merci ! 🎉
                                        </h2>
                                        <p className="text-gray-400">
                                            Votre audit vous sera envoyé sous 24h.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
