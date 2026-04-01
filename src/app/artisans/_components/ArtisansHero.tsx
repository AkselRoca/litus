'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { MapPin, ArrowRight, CheckCircle2, Hammer, Droplets, Zap, Leaf, Phone } from 'lucide-react'
import Image from 'next/image'

export function ArtisansHero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent dark:from-emerald-900/20" />
            <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container-fluid relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Text Content */}
                    <div className="flex-1 text-center lg:text-left max-w-3xl lg:max-w-none mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-8 border border-emerald-200 dark:border-emerald-500/20 shadow-sm"
                        >
                            <MapPin className="w-4 h-4" />
                            <span>Réservé aux artisans et indépendants locaux</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-8"
                        >
                            Arrêtez de courir après les chantiers. <br className="hidden lg:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                                Laissez-les venir à vous.
                            </span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-light"
                        >
                            Nous mettons en place votre <strong className="font-bold text-gray-900 dark:text-white">machine à devis</strong> : Campagnes Google Ads ciblées, optimisation locale et site vitrine ultra-performant pour que les clients de votre ville vous appellent *vous*. Fini les contacts partagés !
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <Button size="lg" className="h-14 px-8 w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20" href="/contact">
                                Réserver mon devis gratuit
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 w-full sm:w-auto border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5" href="/tarifs">
                                Voir les prix transparents <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 dark:text-gray-400 font-medium"
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span>Installation en 3 semaines</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span>Optimisé Google Maps</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Visual / Graphic */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex-1 relative w-full max-w-xl mx-auto lg:max-w-none"
                    >
                        {/* Interactive UI Mockup */}
                        <div className="relative rounded-2xl bg-white dark:bg-[#111] border border-gray-200/50 dark:border-white/10 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col">
                            {/* Browser Header */}
                            <div className="h-12 border-b border-gray-100 dark:border-white/5 flex items-center px-4 gap-2 bg-gray-50/50 dark:bg-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                                </div>
                                <div className="mx-4 flex-1 h-6 bg-white dark:bg-[#050505] rounded-md border border-gray-100 dark:border-white/5 flex items-center px-3 justify-center">
                                    <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> plombier-lorient.fr
                                    </span>
                                </div>
                            </div>
                            {/* Mockup Content */}
                            <div className="flex-1 p-6 flex flex-col items-center justify-center relative overflow-hidden bg-dot-pattern">
                                {/* Floating Elements representing local SEO success */}
                                <motion.div 
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-10 left-10 p-4 rounded-xl bg-white dark:bg-[#1a1a1a] shadow-xl border border-gray-100 dark:border-white/10 flex items-center gap-3 backdrop-blur-sm"
                                >
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Nouvel appel</div>
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">Devis Rénovation Salle de Bain</div>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    animate={{ y: [5, -5, 5] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-10 right-10 p-4 rounded-xl bg-white dark:bg-[#1a1a1a] shadow-xl border border-gray-100 dark:border-white/10 flex flex-col gap-2 backdrop-blur-sm"
                                >
                                    <div className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Statistiques Google</div>
                                    <div className="text-3xl font-bold text-emerald-500">+145%</div>
                                    <div className="text-[10px] text-gray-500">De vues cette semaine</div>
                                </motion.div>

                                {/* Center piece */}
                                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 shadow-2xl text-center">
                                    <h3 className="text-white font-bold text-2xl mb-2">Artisan N°1</h3>
                                    <p className="text-emerald-100 text-sm">Votre secteur, Votre ville</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating decoration badges around the mockup */}
                        <div className="absolute -left-6 -bottom-6 w-16 h-16 bg-white dark:bg-[#111] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 flex items-center justify-center rotate-[-10deg]">
                            <Hammer className="w-8 h-8 text-amber-500" />
                        </div>
                        <div className="absolute -right-4 top-1/2 w-14 h-14 bg-white dark:bg-[#111] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 flex items-center justify-center rotate-[15deg]">
                            <Droplets className="w-7 h-7 text-blue-500" />
                        </div>
                        <div className="absolute left-1/2 -top-8 w-14 h-14 bg-white dark:bg-[#111] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 flex items-center justify-center rotate-[5deg]">
                            <Zap className="w-7 h-7 text-yellow-500" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
