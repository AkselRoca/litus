'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Loader2, CheckCircle } from 'lucide-react'
import { LEAD_MAGNETS } from './config'
import type { LeadMagnetId } from './config'

interface LeadMagnetInlineProps {
    magnetId: LeadMagnetId
    /** Compact mode for sidebar */
    compact?: boolean
}

export function LeadMagnetInline({ magnetId, compact = false }: LeadMagnetInlineProps) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

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
            const data = await response.json()

            setIsSuccess(true)

            // Déclencher le téléchargement automatique
            const link = document.createElement('a')
            link.href = magnet.downloadUrl
            link.download = ''
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch {
            setError('Une erreur est survenue. Réessayez.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={`p-1 rounded-3xl bg-gradient-to-br ${magnet.gradient} ${magnet.gradientDark} relative overflow-hidden group shadow-lg`}>
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent blur-xl pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity"></div>
            <div className={`relative ${compact ? 'p-5 lg:p-6' : 'p-6 lg:p-8'} rounded-[23px] bg-white/95 dark:bg-black/95 backdrop-blur-3xl border border-gray-200/50 dark:border-white/10`}>
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {/* Icon */}
                            <div className={`${compact ? 'w-11 h-11 mb-4' : 'w-14 h-14 mx-auto mb-5'} ${magnet.iconBg} rounded-2xl flex items-center justify-center shadow-inner`}>
                                <Icon className={`${compact ? 'w-5 h-5' : 'w-7 h-7'} text-${magnet.color}-600 dark:text-white`} />
                            </div>

                            {/* Text */}
                            <div className={compact ? '' : 'text-center'}>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-1">{magnet.subtitle}</p>
                                <h3 className={`${compact ? 'text-base' : 'text-xl'} font-bold text-gray-900 dark:text-white mb-2 leading-tight`}>{magnet.title}</h3>
                                <p className={`text-gray-600 dark:text-gray-400 text-sm ${compact ? 'mb-4' : 'mb-6'} leading-relaxed`}>
                                    {magnet.description}
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-2.5">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Votre prénom"
                                    required
                                    className={`w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${magnet.ringColor} text-sm transition-all shadow-sm`}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="votre@email.com"
                                    required
                                    className={`w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${magnet.ringColor} text-sm transition-all shadow-sm`}
                                />
                                {error && <p className="text-red-500 text-xs">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-4 ${magnet.buttonBg} text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Envoi...
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4" />
                                            Télécharger gratuitement
                                        </>
                                    )}
                                </button>
                            </form>
                            <p className="text-[10px] text-gray-500 mt-3 text-center">
                                Gratuit & sans engagement. Pas de spam.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-6"
                        >
                            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                Téléchargement en cours !
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                                Le PDF va se télécharger automatiquement.
                            </p>
                            <a
                                href={magnet.downloadUrl}
                                download
                                className={`inline-flex items-center gap-2 px-5 py-2.5 ${magnet.buttonBg} text-white font-medium rounded-xl text-sm transition-colors`}
                            >
                                <Download className="w-4 h-4" />
                                Retélécharger
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
