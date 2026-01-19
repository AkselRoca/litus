'use client'

import { motion } from 'framer-motion'

interface AvailabilityBadgeProps {
    isAvailable?: boolean
    nextAvailableDate?: string
}

export function AvailabilityBadge({
    isAvailable = true,
    nextAvailableDate = 'Février 2024',
}: AvailabilityBadgeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${isAvailable
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
        >
            <motion.span
                className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-400' : 'bg-amber-400'}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            {isAvailable ? (
                <span className="flex items-center gap-1">
                    Disponible pour nouveaux projets
                </span>
            ) : (
                `Prochain slot : ${nextAvailableDate}`
            )}
        </motion.div>
    )
}
