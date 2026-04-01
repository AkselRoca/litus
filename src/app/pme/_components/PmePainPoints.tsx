'use client'

import { motion } from 'framer-motion'
import { MonitorX, UserMinus, FileX2, Inbox } from 'lucide-react'

export function PmePainPoints() {
    const painpoints = [
        {
            icon: MonitorX,
            title: "Votre site fait \"petite boîte\"",
            description: "Vous réalisez des millions de CA, mais votre site ressemble à celui d'un auto-entrepreneur débutant créé en 2012.",
            colSpan: "col-span-1 md:col-span-2",
        },
        {
            icon: UserMinus,
            title: "Difficulté à recruter",
            description: "Les meilleurs talents regardent votre site web avant même de postuler. S'il n'inspire pas l'innovation, ils vont chez vos concurrents.",
            colSpan: "col-span-1 border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10",
        },
        {
            icon: FileX2,
            title: "Des marchés B2B perdus",
            description: "Lorsqu'un prospect hésite entre vous et un concurrent de même taille, le professionnalisme de votre vitrine digitale fait souvent pencher la balance.",
            colSpan: "col-span-1",
        },
        {
            icon: Inbox,
            title: "Processus d'acquisition archaïque",
            description: "Vos prospects remplissent un vieux formulaire de contact. Les données sont perdues dans une boîte mail au lieu d'alimenter directement votre CRM.",
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
                        Le paradoxe de la  <span className="text-blue-500">PME française.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 dark:text-gray-400"
                    >
                        Vous excellez dans votre domaine, vous avez des équipes solides, mais votre présence en ligne freine votre croissance au lieu de l'accélérer.
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
                            className={`p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#111] shadow-xl shadow-gray-200/20 dark:shadow-none hover:border-blue-500/30 transition-colors ${item.colSpan}`}
                        >
                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-center mb-6 shadow-sm">
                                <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
