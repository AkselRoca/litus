'use client'

import { motion } from 'framer-motion'
import { Map, Zap, CheckCircle, Shield } from 'lucide-react'
import Image from 'next/image'

export function ArtisansSolutions() {
    const solutions = [
        {
            title: "Création de Site Clé-en-main",
            description: "On s'occupe de TOUT. Design, textes métier, hébergement, mise en ligne. Vous ne nous donnez que des photos de vos réalisations et on fait le reste.",
            icon: Zap,
        },
        {
            title: "Optimisation Google My Business",
            description: "On configure et on optimise votre fiche Google Maps pour que vous sortiez dans les premiers, au-dessus de vos concurrents.",
            icon: Map,
        },
        {
            title: "Propriété totale à 100%",
            description: "Zéro abonnement mensuel caché, zéro location. Une fois le site payé, il vous appartient à vie. Votre nom de domaine est à VOUS.",
            icon: Shield,
        },
        {
            title: "Contact Direct & Rapide",
            description: "Des boutons d'appel immédiats, des formulaires de demande de devis simples. Le site est fait pour convertir le visiteur en client au téléphone.",
            icon: CheckCircle,
        }
    ]

    return (
        <section className="py-24 bg-gray-50 dark:bg-[#050505]">
            <div className="container-fluid">
                <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
                    {/* Image / Graphic Left */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 relative w-full"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-teal-500/5 rounded-[2.5rem] blur-2xl z-0" />
                        <div className="relative z-10 w-full aspect-[4/5] rounded-[2rem] bg-[#111] overflow-hidden border border-white/10 shadow-2xl">
                            {/* Fake UI of a mobile phone showing an artisan site */}
                            <div className="w-full h-full flex flex-col p-4">
                                <div className="w-1/2 h-6 mx-auto bg-black rounded-b-3xl -mt-4 border border-white/5" />
                                <div className="mt-8 flex-1 bg-white dark:bg-[#0a0a0a] rounded-xl overflow-hidden border border-gray-100 dark:border-white/5 flex flex-col items-center p-6 text-center shadow-inner">
                                    <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-6">
                                        <Shield className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-2">Plomberie Express Lorient</h4>
                                    <div className="flex gap-1 mb-8 text-yellow-400">
                                        ★ ★ ★ ★ ★ <span className="text-gray-400 ml-2 text-sm">(48 avis)</span>
                                    </div>
                                    <div className="w-full h-12 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold mb-4">
                                        Demander un devis
                                    </div>
                                    <div className="w-full h-12 border-2 border-emerald-600 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                                        Appeler : 02 97 XX XX XX
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Right */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                La solution <span className="text-emerald-500 shrink-0">Litus.</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Nous créons des "machines à devis" : des sites internet pensés pour le référencement local et la conversion immédiate. Vous vous concentrez sur vos chantiers, le site fait le reste.
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            {solutions.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center">
                                        <item.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 font-light">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
