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
                            Digitalisez chaque aspect de votre entreprise : acquisition B2B via Google Ads et SEO, automatisation de vos processus (CRM/Hubspot) et logiciels métiers sur-mesure pour accélérer votre croissance.
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
                                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700" />
                                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700" />
                                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700" />
                                </div>
                                <div className="mx-4 flex-1 h-6 bg-white dark:bg-[#111] rounded-md border border-gray-100 dark:border-white/5" />
                            </div>
                            
                            <div className="flex-1 p-8 bg-blue-50/30 dark:bg-blue-900/5 relative overflow-hidden flex items-center justify-center">
                                {/* Corporate UI Elements */}
                                <motion.div 
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-8 right-8 p-4 bg-white dark:bg-[#111] rounded-xl shadow-xl border border-gray-100 dark:border-white/5 flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
                                        <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">Candidature reçue</div>
                                        <div className="text-xs text-gray-500">Ingénieur Commercial</div>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    animate={{ y: [5, -5, 5] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-12 left-8 p-4 bg-white dark:bg-[#111] rounded-xl shadow-xl border border-gray-100 dark:border-white/5 flex flex-col gap-3"
                                >
                                    <div className="flex items-center gap-2">
                                        <BarChart3 className="w-4 h-4 text-cyan-500" />
                                        <span className="text-xs text-gray-500 font-medium">Acquisition B2B</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">+ 45%</div>
                                    <div className="w-32 h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                        <div className="w-3/4 h-full bg-cyan-500 rounded-full" />
                                    </div>
                                </motion.div>

                                {/* Main central brand block */}
                                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600 to-cyan-500 shadow-2xl text-center text-white scale-110">
                                    <Globe2 className="w-12 h-12 mx-auto mb-4 opacity-80" />
                                    <h3 className="font-bold text-3xl mb-2 tracking-tight">Groupe Industriel</h3>
                                    <p className="text-blue-100/80 text-sm font-medium">Leader Européen</p>
                                </div>
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
