'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Building2, ArrowRight, BarChart3, Users, Globe2, Briefcase } from 'lucide-react'

export function PmeHero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent dark:from-blue-900/20" />
            <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container-fluid relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-center lg:text-left max-w-3xl lg:max-w-none mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium text-sm mb-8 border border-blue-200 dark:border-blue-500/20 shadow-sm"
                        >
                            <Building2 className="w-4 h-4" />
                            <span>PME • TPE • B2B</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-8"
                        >
                            Donnez à votre entreprise <br className="hidden lg:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                                l'image digitale qu'elle mérite.
                            </span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-light"
                        >
                            Ne vous contentez plus d'une simple plaquette numérique. Obtenez un site web B2B d'exception, parfaitement connecté à votre CRM, et alimenté par nos campagnes Google Ads & SEO pour piloter toute votre croissance sur une seule plateforme.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <Button size="lg" className="h-14 px-8 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20" href="/contact">
                                Présenter mon entreprise
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 w-full sm:w-auto border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5" href="/portfolio">
                                Voir nos références <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex-1 relative w-full max-w-xl mx-auto lg:max-w-none"
                    >
                        {/* PME Dashboard Mockup */}
                        <div className="relative rounded-2xl bg-white dark:bg-[#0a0a0a] border border-gray-200/50 dark:border-white/10 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col">
                            {/* Browser Header */}
                            <div className="h-12 border-b border-gray-100 dark:border-white/5 flex items-center px-4 gap-2 bg-gray-50/50 dark:bg-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                                </div>
                                <div className="mx-4 flex-1 h-6 bg-white dark:bg-[#111] rounded-md border border-gray-100 dark:border-white/5 flex items-center px-3 justify-center">
                                    <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                                        <Globe2 className="w-3 h-3" /> groupe-exalys.fr
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex-1 relative overflow-hidden bg-white dark:bg-[#050505]">
                                {/* Fake Mini Website */}
                                <div className="h-8 border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6">
                                    <div className="text-[10px] font-bold text-gray-900 dark:text-white">EXALYS</div>
                                    <div className="flex gap-3 text-[8px] font-medium text-gray-500">
                                        <span>Expertises</span>
                                        <span>Carrières</span>
                                        <span className="text-blue-600 dark:text-blue-400">Contact</span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col items-center justify-center text-center mt-4">
                                    <div className="inline-block px-2 py-1 bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[8px] font-bold uppercase rounded-full mb-3">
                                        Leader Européen
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                                        L'ingénierie au service <br/> de demain.
                                    </h3>
                                    <div className="w-24 h-6 mt-4 bg-blue-600 text-white text-[8px] flex items-center justify-center rounded-md font-bold shadow-md">
                                        Prendre Rendez-vous
                                    </div>
                                </div>

                                {/* Floating CRM Notification */}
                                <motion.div 
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-6 left-6 right-6 p-3 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/10 flex items-center gap-3 backdrop-blur-md"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[10px] font-bold text-gray-900 dark:text-white flex justify-between items-center">
                                            Nouveau Prospect B2B
                                            <span className="text-emerald-500 text-[8px] bg-emerald-100 dark:bg-emerald-500/20 px-1.5 py-0.5 rounded-sm">Validé</span>
                                        </div>
                                        <div className="text-[9px] text-gray-500 mt-0.5 truncate">
                                            Directeur Achats — Ajouté à Hubspot
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -left-6 -bottom-6 w-16 h-16 bg-white dark:bg-[#111] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 flex items-center justify-center rotate-[-10deg]">
                            <Users className="w-8 h-8 text-blue-500" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
