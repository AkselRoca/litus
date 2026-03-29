'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AvailabilityData {
    dispo: boolean
    nextAvailableDate: string | null
}

export function AvailabilityBadge() {
    const [data, setData] = useState<AvailabilityData | null>(null)

    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setData(json.data)
                }
            })
            .catch(console.error)
    }, [])

    if (!data) return null

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-2.5 text-sm font-medium whitespace-nowrap"
        >
            {data.dispo ? (
                <>
                    <motion.span
                        className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span className="text-green-500 dark:text-green-400">
                        Disponible pour projet
                    </span>
                </>
            ) : (
                <>
                    <motion.span
                        className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span className="text-amber-500 dark:text-amber-400">
                        Disponible pour nouveau projet dès le {data.nextAvailableDate ? formatDate(data.nextAvailableDate) : 'bientôt'}
                    </span>
                </>
            )}
        </motion.div>
    )
}
