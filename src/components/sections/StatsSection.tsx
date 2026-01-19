'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { TrendingUp, Users, Star, Zap } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/Animations'

// Animated Counter Component
function Counter({
    value,
    decimals = 0
}: {
    value: number
    decimals?: number
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100,
    })
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [isInView, value, motionValue])

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            if (decimals > 0) {
                setDisplayValue(parseFloat(latest.toFixed(decimals)))
            } else {
                setDisplayValue(Math.round(latest))
            }
        })
        return unsubscribe
    }, [springValue, decimals])

    return <span ref={ref}>{displayValue}</span>
}

export function StatsSection() {
    const stats = [
        {
            icon: Users,
            value: 150,
            suffix: '+',
            label: 'Clients Satisfaits',
            decimals: 0,
        },
        {
            icon: TrendingUp,
            value: 250,
            suffix: '%',
            label: 'ROI Moyen',
            decimals: 0,
        },
        {
            icon: Star,
            value: 4.9,
            suffix: '/5',
            label: 'Note Clients',
            decimals: 1,
        },
        {
            icon: Zap,
            value: 24,
            suffix: 'h',
            label: 'Délai Réponse',
            decimals: 0,
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-primary/5 via-orange-500/5 to-primary/5 dark:from-primary/10 dark:via-orange-500/10 dark:to-primary/10 overflow-hidden">
            <div className="container-fluid">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Nos résultats parlent d'eux-mêmes
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Des chiffres concrets pour votre réussite
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <ScrollReveal
                                key={index}
                                delay={index * 0.1}
                                className="text-center group"
                            >
                                <motion.div
                                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/20"
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 5,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <stat.icon className="w-8 h-8 text-white" />
                                </motion.div>
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                    <Counter value={stat.value} decimals={stat.decimals} />
                                    {stat.suffix}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 font-medium">
                                    {stat.label}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
