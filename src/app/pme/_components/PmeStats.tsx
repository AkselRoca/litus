'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Building, TrendingUp, Handshake, ShieldCheck } from 'lucide-react'

function Counter({ value, decimals = 0 }: { value: number, decimals?: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 })
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        if (isInView) motionValue.set(value)
    }, [isInView, value, motionValue])

    useEffect(() => {
        return springValue.on('change', (latest) => {
            setDisplayValue(decimals > 0 ? parseFloat(latest.toFixed(decimals)) : Math.round(latest))
        })
    }, [springValue, decimals])

    return <span ref={ref}>{displayValue}</span>
}

export function PmeStats() {
    const stats: Array<{
        icon: any;
        value: number;
        suffix: string;
        label: string;
        decimals?: number;
    }> = [
        {
            icon: Building,
            value: 70,
            suffix: '%',
            label: "des acheteurs B2B analysent le site avant de contacter",
        },
        {
            icon: TrendingUp,
            value: 3,
            suffix: 'x',
            label: "plus de conversion avec un site performant (UX/UI)",
        },
        {
            icon: ShieldCheck,
            value: 85,
            suffix: '%',
            label: "des candidats jugent une PME sur sa marque employeur en ligne",
        },
        {
            icon: Handshake,
            value: 50,
            suffix: '+',
            label: "PME et ETI accompagnées avec succès",
        },
    ]

    return (
        <section className="py-20 bg-blue-50/50 dark:bg-[#0a0a0a] border-y border-blue-100 dark:border-white/5 relative z-10">
            <div className="container-fluid">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white dark:bg-[#111] border border-blue-100 dark:border-white/5 flex items-center justify-center shadow-lg shadow-blue-500/5 group-hover:-translate-y-1 transition-transform duration-300">
                                    <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                                    <Counter value={stat.value} decimals={stat.decimals} />
                                    <span className="text-blue-500">{stat.suffix}</span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
