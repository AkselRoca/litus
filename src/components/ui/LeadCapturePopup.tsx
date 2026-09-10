'use client'

import { useState, useEffect, useCallback } from 'react'
import { submitContact } from '@/lib/contact/client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BarChart3, ArrowRight, CheckCircle } from 'lucide-react'

interface LeadCapturePopupProps {
    delayMs?: number
    scrollTriggerPercent?: number
}

export function LeadCapturePopup({
    delayMs = 45000, // 45 seconds
    scrollTriggerPercent = 65, // 65% scroll
}: LeadCapturePopupProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState('')

    const dismiss = useCallback(() => {
        setIsOpen(false)
        try {
            localStorage.setItem('popup-dismissed', 'true')
        } catch {
            // sessionStorage peut être indisponible en navigation privée
        }
    }, [])

    useEffect(() => {
        // Ne jamais afficher si déjà fermé dans cette session
        try {
            if (localStorage.getItem('popup-dismissed')) return
        } catch {
            return
        }

        // Timer principal
        const timer = setTimeout(() => {
            setIsOpen(true)
        }, delayMs)

        // Scroll trigger
        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            if (scrollPercent >= scrollTriggerPercent) {
                setIsOpen(true)
                window.removeEventListener('scroll', handleScroll)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            clearTimeout(timer)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [delayMs, scrollTriggerPercent])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            const response = await submitContact({
                    nom: 'Prospect (popup)',
                    email,
                    service: 'autre',
                    budget: 'ne-sais-pas',
                    message: 'Demande d\'audit SEO gratuit via le popup du site.',
                    rgpd: true,
            })

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi')
            }

            setIsSubmitted(true)
            // Marquer comme fermé après soumission
            try {
                localStorage.setItem('popup-dismissed', 'true')
            } catch { /* ignore */ }

            setTimeout(() => {
                setIsOpen(false)
            }, 3000)
        } catch {
            setError('Une erreur est survenue. Réessayez.')
        } finally {
            setIsSubmitting(false)
        }
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
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
                        onClick={dismiss}
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="relative w-full max-w-md pointer-events-auto bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 p-8 shadow-xl">
                            {/* Close button */}
                            <button
                                onClick={dismiss}
                                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                aria-label="Fermer"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="relative">
                                {!isSubmitted ? (
                                    <>
                                        {/* Icon */}
                                        <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <BarChart3 className="w-6 h-6 text-primary" />
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                                            Audit SEO Gratuit
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-6 leading-relaxed">
                                            Recevez un audit personnalisé de votre présence en ligne et découvrez vos axes d&apos;amélioration.
                                        </p>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-3">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="votre@email.com"
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                                            />
                                            {error && (
                                                <p className="text-red-500 text-xs">{error}</p>
                                            )}
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="site-cta-primary w-full"
                                            >
                                                {isSubmitting ? (
                                                    'Envoi en cours...'
                                                ) : (
                                                    <>
                                                        Recevoir mon audit gratuit
                                                        <ArrowRight className="w-4 h-4" />
                                                    </>
                                                )}
                                            </button>
                                        </form>

                                        {/* Trust */}
                                        <p className="text-gray-400 dark:text-gray-500 text-xs text-center mt-4">
                                            Vos données restent confidentielles. Pas de spam.
                                        </p>
                                    </>
                                ) : (
                                    <div className="text-center py-6">
                                        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            Merci !
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
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
