'use client'

import { motion } from 'framer-motion'
import { LayoutTemplate, Cog, Megaphone, Users2 } from 'lucide-react'

export function PmeSolutions() {
    const solutions = [
        {
            title: "Site Corporate Époustouflant",
            description: "Un web design ultra-premium (animations, 3D, typographie) qui donne immédiatement à vos prospects B2B confiance en votre solidité financière et technique.",
            icon: LayoutTemplate,
        },
        {
            title: "Acquisition & Lead Gen",
            description: "On déploie des landing pages dédiées à chacun de vos services couplées à des campagnes d'acquisition pour générer des prospects qualifiés en continu.",
            icon: Megaphone,
        },
        {
            title: "Automatisation (CRM & ERP)",
            description: "Fini les doubles saisies. Dès qu'un prospect B2B remplit une demande, ses données sont enrichies et envoyées automatiquement dans votre Hubspot / Salesforce / Pipedrive.",
            icon: Cog,
        },
        {
            title: "Marque Employeur Forte",
            description: "Une section recrutement moderne qui valorise votre culture d'entreprise, vos avantages et facilite la conversion des top profils sur le marché.",
            icon: Users2,
        }
    ]

    return (
        <section className="py-24 bg-gray-50 dark:bg-[#050505]">
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
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                Notre solution : L'écosystème <span className="text-blue-500 shrink-0">Litus.</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Nous opérons comme votre bras armé digital. Nous concevons une infrastructure web qui transforme chaque visiteur en opportunité d'affaires, tout en modernisant l'image perçue de votre entreprise.
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
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors">
                                        <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 font-light">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Image / Graphic Right */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 relative w-full order-1 lg:order-2"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-cyan-500/5 rounded-[2.5rem] blur-2xl z-0" />
                        <div className="relative z-10 w-full aspect-[4/5] rounded-[2rem] bg-[#0a0a0a] overflow-hidden border border-white/10 shadow-2xl p-6 flex flex-col">
                            {/* Abstract Corporate UI */}
                            <div className="flex gap-4 items-center mb-8 pb-6 border-b border-white/5">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg">
                                    PME
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Tableau de bord CEO</h4>
                                    <p className="text-gray-500 text-sm font-medium">Vue d'ensemble digitale</p>
                                </div>
                            </div>

                            <div className="flex-1 grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-center">
                                    <p className="text-gray-400 text-xs font-medium mb-1">Nouveaux Prospects</p>
                                    <p className="text-2xl font-bold text-white">+124</p>
                                    <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-400 w-3/4" />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-center">
                                    <p className="text-gray-400 text-xs font-medium mb-1">Taux de Conversion</p>
                                    <p className="text-2xl font-bold text-blue-400">4.8%</p>
                                    <p className="text-xs text-emerald-400 mt-1">↑ +1.2% ce mois</p>
                                </div>
                                <div className="col-span-2 p-4 flex-1 rounded-xl bg-gradient-to-r from-blue-900/40 to-cyan-900/20 border border-blue-500/20 flex flex-col items-center justify-center text-center">
                                    <Cog className="w-8 h-8 text-blue-400 mb-2 animate-[spin_4s_linear_infinite]" />
                                    <p className="text-sm font-bold text-white">Synchronisation CRM Active</p>
                                    <p className="text-xs text-blue-200 mt-1">Toutes les données sont automatiquement transmises aux commerciaux.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
