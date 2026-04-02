'use client'

import { motion } from 'framer-motion'
import { Accessibility, LockKeyhole, School, Blocks } from 'lucide-react'

export function CollectivitesSolutions() {
    const solutions = [
        {
            title: "Accessibilité RGAA intégrée",
            description: "Nous designons des interfaces aux contrastes stricts, adaptées aux lecteurs d'écran et lisibles par tous les âges. Vous êtes 100% conforme à la loi française.",
            icon: Accessibility,
        },
        {
            title: "Formation de vos agents",
            description: "On ne vous remet pas juste les clés. Nous formons vos équipes à l'utilisation d'un Back-Office ultra-simplifié. Une actualité se publie en 3 minutes chrono.",
            icon: School,
        },
        {
            title: "Sécurité & Hébergement Français",
            description: "Vos données et celles de vos citoyens ne quittent pas la France. Nos infrastructures sont souveraines (SecNumCloud) et immunisées contre les ransomwares.",
            icon: LockKeyhole,
        },
        {
            title: "Portails & Logiciels Sur-Mesure",
            description: "Portail cantine, réservation d'infrastructures, signalement de voirie : nous créons toutes les applications web nécessaires pour simplifier la vie de la commune.",
            icon: Blocks,
        }
    ]

    return (
        <section className="py-24 bg-slate-50 dark:bg-[#050505]">
            <div className="container-fluid">
                <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
                    {/* Content Left */}
                    <div className="flex-1 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                Notre solution : <span className="text-blue-500 shrink-0">L'Inclusion Numérique.</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Nous combinons des standards d'accessibilité drastiques avec des logiciels sur-mesure pour que votre commune brille en ligne, en toute sécurité.
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            {solutions.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4 group"
                                >
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors">
                                        <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 font-light">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Dashboard Visual Right */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 relative w-full order-1 lg:order-2"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-emerald-500/5 rounded-[2.5rem] blur-2xl z-0" />
                        <div className="relative z-10 w-full aspect-[4/5] rounded-[2rem] bg-white dark:bg-[#111] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col font-sans">
                            {/* Editor Header */}
                            <div className="flex gap-4 items-center px-6 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5">
                                <div className="text-xs font-bold text-slate-400">ADMINISTRATION MAIRIE</div>
                            </div>

                            {/* UI Lines */}
                            <div className="flex-1 p-6 flex flex-col gap-4">
                                <div className="text-sm font-bold text-slate-900 dark:text-white mb-2">Publier une actualité</div>
                                
                                <div className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center px-4">
                                    <span className="text-xs text-slate-400">Titre de l'article...</span>
                                </div>
                                
                                <div className="w-full flex-1 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col">
                                    <div className="h-8 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 px-2 bg-slate-50 dark:bg-white/5">
                                        <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-sm" />
                                        <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-sm" />
                                        <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-sm" />
                                    </div>
                                    <div className="p-4">
                                        <div className="w-3/4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-3" />
                                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-3" />
                                        <div className="w-2/3 h-2 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                    </div>
                                </div>

                                <div className="flex justify-end mt-2">
                                    <div className="px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer">
                                        Publier en 1 clic
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
