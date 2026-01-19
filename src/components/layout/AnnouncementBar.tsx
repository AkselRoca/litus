'use client'

import { useState, useEffect } from 'react'
import { Calendar, X } from 'lucide-react'

export function AnnouncementBar() {
    const [availableDate, setAvailableDate] = useState('')
    const [isVisible, setIsVisible] = useState(true)

    // Calculate available date (+2 weeks)
    useEffect(() => {
        const date = new Date()
        date.setDate(date.getDate() + 14)
        const formatted = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
        setAvailableDate(formatted)
    }, [])

    if (!isVisible || !availableDate) return null

    return (
        <div className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-2.5 border-b border-white/10">
            <div className="container-fluid">
                <div className="flex items-center justify-center gap-3 text-sm font-medium">
                    <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                        {/* Pulsing green light */}
                        <div className="relative flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <div className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping" />
                        </div>
                        <Calendar className="w-4 h-4 text-green-400" />
                        <span className="text-white">
                            Disponible pour nouveau projet dès le <span className="font-bold text-green-400">{availableDate}</span>
                        </span>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Fermer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
