'use client'

import { motion } from 'framer-motion'
import { Search, PenTool, Code, Rocket } from 'lucide-react'

const steps = [
    {
        icon: Search,
        title: 'Audit & Analyse',
        description: 'On décortique votre présence actuelle et celle de vos concurrents. On identifie les opportunités manquées.',
        color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    },
    {
        icon: PenTool,
        title: 'Stratégie Sur-Mesure',
        description: 'Pas de template tout fait. On dessine une architecture pensée pour la conversion et le SEO local.',
        color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
    },
    {
        icon: Code,
        title: 'Développement & Optimisation',
        description: 'Code propre, ultra-rapide, respectant les standards Web Vitals. Zéro dette technique.',
        color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
    },
    {
        icon: Rocket,
        title: 'Lancement & Croissance',
        description: 'Mise en ligne, indexation immédiate, et suivi des premiers leads. On ne vous lâche pas dans la nature.',
        color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
    }
]

export function ProcessTimeline() {
    return (
        <section className="py-24 bg-white dark:bg-dark">
            <div className="container-fluid">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Comment on <span className="text-primary">travaille</span> ?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Un processus clair, sans jargon, pour passer de l'idée aux résultats.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 -translate-x-1/2" />

                    <div className="space-y-12">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Icon Bubble (Center) */}
                                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white dark:bg-dark border-4 border-gray-100 dark:border-gray-800 flex items-center justify-center z-10 shadow-sm">
                                        <div className={`w-8 h-8 rounded-full ${step.color} flex items-center justify-center`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`ml-16 md:ml-0 w-full md:w-[calc(50%-40px)] p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-primary/30 transition-colors`}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-4xl font-bold text-gray-200 dark:text-white/10">{index + 1}</span>
                                            <h3 className="text-xl font-bold">{step.title}</h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
