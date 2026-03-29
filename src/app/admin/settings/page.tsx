'use client'

import { useState, useEffect } from 'react'
import { Calendar, Check, Users, ChevronRight, Settings, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function AdminSettingsPage() {
    const [isAvailable, setIsAvailable] = useState(true)
    const [nextDate, setNextDate] = useState('')
    const [saved, setSaved] = useState(false)
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)

    // Charger la config depuis l'API
    useEffect(() => {
        fetch('/api/admin/config')
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setIsAvailable(json.data.dispo)
                    setNextDate(json.data.nextAvailableDate || '')
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await fetch('/api/admin/config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dispo: isAvailable,
                    nextAvailableDate: isAvailable ? null : (nextDate || null),
                }),
            })
            const json = await res.json()
            if (json.success) {
                setSaved(true)
                setTimeout(() => setSaved(false), 2000)
            }
        } catch (error) {
            console.error('Error saving config:', error)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-200 dark:border-white/10 pb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Configuration du site et de votre compte</p>
                </div>
            </div>

            <div className="max-w-3xl space-y-6">
                {/* Gestion de l'équipe */}
                <Link href="/admin/settings/team" className="block bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:border-gray-300 dark:hover:border-white/20 transition-all group shadow-sm hover:shadow-md dark:shadow-none">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">Gestion de l'équipe</div>
                                <div className="text-gray-500 dark:text-gray-400 text-sm">Créer et gérer les comptes, rôles et permissions</div>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                </Link>

                {/* Availability Settings */}
                <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8 shadow-sm dark:shadow-none">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        Disponibilité
                    </h2>

                    <div className="space-y-8">
                        {/* Toggle */}
                        <div className="flex items-center justify-between">
                            <div className="pr-4">
                                <div className="text-gray-900 dark:text-white font-medium mb-1">Disponible pour nouveaux projets</div>
                                <div className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Cette information sera affichée dynamiquement dans le header et sur la page d'accueil de votre site.</div>
                            </div>
                            <button
                                onClick={() => setIsAvailable(!isAvailable)}
                                className={`relative w-14 h-8 rounded-full transition-colors flex-shrink-0 ${isAvailable ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                            >
                                <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-sm ${isAvailable ? 'translate-x-6' : ''}`} />
                            </button>
                        </div>

                        {/* Next Available Date */}
                        <div className={`transition-all duration-300 overflow-hidden ${isAvailable ? 'max-h-0 opacity-0' : 'max-h-[200px] opacity-100'}`}>
                            <div className="pt-2">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    Date de prochaine disponibilité
                                </label>
                                <input
                                    type="date"
                                    value={nextDate}
                                    onChange={(e) => setNextDate(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Sera affiché dans le header : "Prochaine dispo : [date choisie]"
                                </p>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all min-w-[140px] disabled:opacity-50"
                            >
                                {saving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : saved ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Enregistré
                                    </>
                                ) : (
                                    'Enregistrer'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
