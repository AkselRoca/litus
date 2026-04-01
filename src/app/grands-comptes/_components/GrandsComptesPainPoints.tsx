'use client'

import { motion } from 'framer-motion'
import { Hourglass, LockKeyhole, FolderSync, Unplug } from 'lucide-react'

export function GrandsComptesPainPoints() {
    const painpoints = [
        {
            icon: Hourglass,
            title: "Des délais de livraison ESN absurdes",
            description: "Votre agence web ou votre ESN actuelle prend 18 mois pour livrer un portail que des startups déploieraient en 8 semaines. L'agilité est morte.",
            colSpan: "col-span-1 md:col-span-2",
        },
        {
            icon: LockKeyhole,
            title: "Rejeté par la DSI",
            description: "Les solutions standards (WordPress, PHP) ne passent plus les audits de sécurité de votre DSI. Vous avez besoin d'une architecture Cloud inviolable.",
            colSpan: "col-span-1 border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-900/10",
        },
        {
            icon: FolderSync,
            title: "Silos de données Legacy",
            description: "Impossible de synchroniser en temps réel votre ancien ERP (SAP) avec votre portail client web. Les données sont bloquées et corrompues.",
            colSpan: "col-span-1",
        },
        {
            icon: Unplug,
            title: "Incapable d'encaisser le trafic",
            description: "Lors d'un pic de communication nationale ou télévisuelle, vos serveurs lâchent. Votre disponibilité n'est pas scalable à la demande.",
            colSpan: "col-span-1 md:col-span-2",
        }
    ]

    return (
        <section className="py-24 bg-white dark:bg-[#030712]">
            <div className="container-fluid">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
                    >
                        Le constat <span className="text-indigo-500">douloureux.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400"
                    >
                        Les grandes structures étouffent sous les contraintes techniques. Vos projets digitaux coûtent des millions mais finissent souvent inutilisables ou obsolètes à la livraison.
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
                            className={`p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0b0f19] shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-indigo-500/30 transition-colors ${item.colSpan}`}
                        >
                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-center mb-6 shadow-sm">
                                <item.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
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
