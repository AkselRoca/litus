'use client'

import { motion } from 'framer-motion'
import { WebhookOff, EyeOff, ShieldAlert, MonitorX } from 'lucide-react'

export function CollectivitesPainPoints() {
    const painpoints = [
        {
            icon: MonitorX,
            title: "Un site bloqué dans les années 2010",
            description: "Votre commune a évolué, mais votre site est resté figé. Impossible à lire sur mobile, menus illisibles : les citoyens, anciens comme plus jeunes, ne s'y retrouvent plus.",
            colSpan: "col-span-1 md:col-span-2",
        },
        {
            icon: EyeOff,
            title: "Défaut d'accessibilité (RGAA)",
            description: "Les couleurs manquent de contraste et les polices sont illisibles. En plus d'exclure une partie de vos concitoyens, votre mairie s'expose à des sanctions administratives.",
            colSpan: "col-span-1",
        },
        {
            icon: ShieldAlert,
            title: "Cible idéale des Cyberattaques",
            description: "Hôpitaux, Mairies, Départements : les services publics sont les cibles n°1 des rançongiciels. Votre vieux site est une porte d'entrée grande ouverte pour les hackers.",
            colSpan: "col-span-1",
        },
        {
            icon: WebhookOff,
            title: "Un cauchemar pour vos secrétaires",
            description: "Publier le compte-rendu du dernier conseil municipal est un parcours du combattant. Vos agents perdent des heures sur un logiciel obsolète au lieu de servir la commune.",
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
                        className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
                    >
                        Le constat public <span className="text-blue-500">actuel.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400"
                    >
                        Les collectivités accumulent une dette technique colossale. Ce qui devrait être le pont numérique entre les élus et les citoyens devient une charge chronophage et asécurisée.
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
                            className={`p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0b0f19] shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-blue-500/30 transition-colors ${item.colSpan}`}
                        >
                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-center mb-6 shadow-sm">
                                <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
