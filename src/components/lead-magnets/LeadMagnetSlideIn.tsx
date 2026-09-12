'use client'
import { BriefMagnet } from './BriefMagnet'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Loader2, CheckCircle } from 'lucide-react'
import { LEAD_MAGNETS } from './config'
import type { LeadMagnetId } from './config'

interface LeadMagnetSlideInProps {
    magnetId: LeadMagnetId
    /** % de scroll avant d'afficher (défaut: 60) */
    scrollTriggerPercent?: number
    /** Délai avant d'afficher (en ms, défaut: 30s) */
    delayMs?: number
}

export function LeadMagnetSlideIn({
    magnetId,
    scrollTriggerPercent = 60,
    delayMs = 30000,
}: LeadMagnetSlideInProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    const storageKey = `lead-magnet-${magnetId}-dismissed`

    const dismiss = useCallback(() => {
        setIsOpen(false)
        try {
            sessionStorage.setItem(storageKey, 'true')
        } catch { /* ignore */ }
    }, [storageKey])

    useEffect(() => {
        // Ne pas afficher si déjà fermé dans cette session
        try {
            if (sessionStorage.getItem(storageKey)) return
        } catch { return }

        // Timer
        const timer = setTimeout(() => setIsOpen(true), delayMs)

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
    }, [delayMs, scrollTriggerPercent, storageKey])

    const magnet = LEAD_MAGNETS[magnetId]
    const Icon = magnet.icon

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !name) return
        setError('')
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/lead-magnet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: name,
                    email,
                    magnetId,
                    magnetTitle: magnet.title,
                }),
            })

            if (!response.ok) throw new Error('Erreur')

            setIsSuccess(true)

            // Auto download
            const link = document.createElement('a')
            link.href = magnet.downloadUrl
            link.download = ''
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            // Fermer après 4s
            setTimeout(() => {
                dismiss()
            }, 4000)
        } catch {
            setError('Une erreur est survenue. Réessayez.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (magnetId === 'cahier-des-charges') return <AnimatePresence>{isOpen && <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 25 }} className="fixed bottom-6 right-6 z-[9990] w-[360px] max-w-[calc(100vw-3rem)]"><div className="relative shadow-xl rounded-3xl"><button type="button" onClick={dismiss} aria-label="Fermer la suggestion" className="absolute right-3 top-3 z-10 p-2 rounded-full bg-white text-slate-500"><X size={16} /></button><BriefMagnet compact /></div></motion.div>}</AnimatePresence>

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 100, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 100, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                    className="fixed bottom-6 right-6 z-[9990] w-[360px] max-w-[calc(100vw-3rem)]"
                >
                    <div className={`p-0.5 rounded-2xl bg-gradient-to-br ${magnet.gradient} ${magnet.gradientDark} shadow-2xl`}>
                        <div className="relative p-5 rounded-[15px] bg-white dark:bg-[#111] border border-gray-200/50 dark:border-white/10">
                            {/* Close */}
                            <button
                                onClick={dismiss}
                                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                aria-label="Fermer"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <AnimatePresence mode="wait">
                                {!isSuccess ? (
                                    <motion.div key="form" exit={{ opacity: 0 }}>
                                        {/* Header */}
                                        <div className="flex items-start gap-3 mb-4 pr-6">
                                            <div className={`w-10 h-10 shrink-0 ${magnet.iconBg} rounded-xl flex items-center justify-center shadow-inner`}>
                                                <Icon className={`w-5 h-5 text-${magnet.color}-600 dark:text-white`} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">PDF Gratuit</p>
                                                <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{magnet.title}</h3>
                                            </div>
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-2">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Votre prénom"
                                                required
                                                className={`w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${magnet.ringColor} text-sm transition-all`}
                                            />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="votre@email.com"
                                                required
                                                className={`w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${magnet.ringColor} text-sm transition-all`}
                                            />
                                            {error && <p className="text-red-500 text-xs">{error}</p>}
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="site-cta-primary w-full"
                                            >
                                                {isSubmitting ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <>
                                                        <Download className="w-4 h-4" />
                                                        Télécharger
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                        <p className="text-[9px] text-gray-400 mt-2 text-center">Pas de spam. Désinscription possible.</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-4"
                                    >
                                        <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                                        <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">Téléchargement lancé !</p>
                                        <p className="text-xs text-gray-500">Le PDF va se télécharger automatiquement.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
