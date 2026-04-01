'use client'

import { motion } from 'framer-motion'
import { Clock, TrendingDown, Users, BadgeEuro } from 'lucide-react'

export function ArtisansPainPoints() {
    const painpoints = [
        {
            icon: Clock,
            title: "Pas le temps de gérer l'informatique",
            description: "Votre métier c'est le chantier, pas de passer des heures à bidouiller Wix ou Wordpress en fin de journée.",
            colSpan: "col-span-1 md:col-span-2",
        },
        {
            icon: BadgeEuro,
            title: "Des prospects partagés à vos concurrents",
            description: "Sur les annuaires (Travaux.com, etc.), vous payez au prix fort pour des contacts qui sont aussi envoyés à 5 de vos concurrents.",
            colSpan: "col-span-1 border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/10",
        },
        {
            icon: Users,
            title: "Le bouche-à-oreille a ses limites",
            description: "C'est bien, mais ce n'est pas prévisible. Quand un mois est calme, la trésorerie en souffre.",
            colSpan: "col-span-1",
        },
        {
            icon: TrendingDown,
            title: "Des concurrents moins bons prennent les appels",
            description: "Simplement parce qu'ils apparaissent en premier sur Google quand quelqu'un cherche en urgence.",
            colSpan: "col-span-1 md:col-span-2",
        }
    ]

    return (
        <section className="py-24 bg-white dark:bg-[#050505]">
            <div className="container-fluid">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                    >
                        On connaît <span className="text-emerald-500">votre réalité.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 dark:text-gray-400"
                    >
                        Créer un site internet pour un artisan, ce n'est pas juste faire joli. 
                        C'est résoudre des problèmes très concrets que vous vivez tous les jours.
                    </motion.p>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {painpoints.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#111] shadow-xl shadow-gray-200/20 dark:shadow-none hover:border-emerald-500/30 transition-colors ${item.colSpan}`}
                        >
                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-center mb-6 shadow-sm">
                                <item.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
