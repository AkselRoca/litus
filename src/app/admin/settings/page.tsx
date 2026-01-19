'use client'

import { useState } from 'react'
import { Calendar, Check, Users, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function AdminSettingsPage() {
    const [isAvailable, setIsAvailable] = useState(true)
    const [nextDate, setNextDate] = useState('Février 2024')
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        // TODO: Save to API/DB
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Paramètres</h1>
                <p className="text-gray-400">Configuration du site et de votre compte</p>
            </div>

            <div className="max-w-2xl space-y-6">
                {/* Gestion de l'équipe */}
                <Link href="/admin/settings/team" className="block bg-gray-900 rounded-2xl border border-white/10 p-6 hover:bg-white/5 transition-colors group">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-white">Gestion de l'équipe</div>
                                <div className="text-gray-400 text-sm">Créer et gérer les comptes, rôles et permissions</div>
                            </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                </Link>

                {/* Availability Settings */}
                <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Disponibilité
                    </h2>

                    <div className="space-y-6">
                        {/* Toggle */}
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-white font-medium">Disponible pour nouveaux projets</div>
                                <div className="text-gray-400 text-sm">Affiché dans le header et sur la page d'accueil</div>
                            </div>
                            <button
                                onClick={() => setIsAvailable(!isAvailable)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${isAvailable ? 'bg-green-500' : 'bg-gray-600'}`}
                            >
                                <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${isAvailable ? 'translate-x-6' : ''}`} />
                            </button>
                        </div>

                        {/* Next Available Date */}
                        {!isAvailable && (
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">
                                    Prochaine disponibilité
                                </label>
                                <input
                                    type="text"
                                    value={nextDate}
                                    onChange={(e) => setNextDate(e.target.value)}
                                    placeholder="Ex: Février 2024"
                                    className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        )}

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-orange-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                        >
                            {saved ? (
                                <>
                                    <Check className="w-5 h-5" />
                                    Enregistré !
                                </>
                            ) : (
                                'Enregistrer'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

