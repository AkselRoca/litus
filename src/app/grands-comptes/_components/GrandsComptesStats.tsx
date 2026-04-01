'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ServerCrash, Lock, Infinity as InfinityIcon, Zap } from 'lucide-react'

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

export function GrandsComptesStats() {
    const stats: Array<{
        icon: any;
        value: number;
        suffix: string;
        label: string;
        decimals?: number;
    }> = [
        {
            icon: InfinityIcon,
            value: 99.99,
            suffix: '%',
            decimals: 2,
            label: "SLA de disponibilité garanti sur nos infrastructures",
        },
        {
            icon: Zap,
            value: 12,
            suffix: 'ms',
            label: "temps de réponse moyen via notre réseau CDN Edge",
        },
        {
            icon: Lock,
            value: 0,
            suffix: ' faille',
            label: "Tolérance zéro sur la sécurité (Protection DDoS By Design)",
        },
        {
            icon: ServerCrash,
            value: 10,
            suffix: 'x',
            label: "plus rapide qu'un WordPress traditionnel surdimensionné",
        },
    ]

    return (
        <section className="py-20 bg-slate-100 dark:bg-[#0b0f19] border-y border-slate-200 dark:border-white/5 relative z-10">
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
                                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 flex items-center justify-center shadow-lg shadow-indigo-500/5 group-hover:-translate-y-1 transition-transform duration-300">
                                    <stat.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight font-mono">
                                    <Counter value={stat.value} decimals={stat.decimals} />
                                    <span className="text-indigo-500">{stat.suffix}</span>
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
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
