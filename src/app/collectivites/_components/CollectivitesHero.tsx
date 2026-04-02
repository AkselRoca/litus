'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Landmark, ArrowRight, Accessibility, ShieldAlert, FileText, Siren, HeartHandshake } from 'lucide-react'

export function CollectivitesHero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-50 dark:bg-[#050505]">
            {/* Background design */}
            <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent dark:from-blue-900/10" />
            <div className="absolute left-0 top-1/4 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-red-500/5 dark:bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container-fluid relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-center lg:text-left max-w-3xl lg:max-w-none mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-8 border border-blue-200 dark:border-blue-500/20 shadow-sm"
                        >
                            <Landmark className="w-4 h-4" />
                            <span>Mairies & Collectivités</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8"
                        >
                            Le portail web qui <br className="hidden lg:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300">
                                vous rapproche des citoyens.
                            </span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-light"
                        >
                            Un site internet moderne, inclusif (100% norme RGAA) et gérable très facilement par vos agents municipaux. Finie la dette technique, vos données sont en sécurité en France.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <Button size="lg" className="h-14 px-8 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 border-none" href="/contact">
                                Étudier notre projet de refonte
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 w-full sm:w-auto border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200" href="/portfolio">
                                Voir des exemples locaux <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex-1 relative w-full max-w-xl mx-auto lg:max-w-none"
                    >
                        {/* Mockup "Portail Mairie" */}
                        <div className="relative rounded-2xl bg-slate-100 dark:bg-[#111] border border-slate-200/50 dark:border-white/10 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col pt-6 px-6">
                            
                            {/* Header Mairie */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-full flex items-center justify-center shadow-sm">
                                        <Landmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">VILLE DE BELLEVILLE</div>
                                        <div className="text-[10px] text-slate-500">République Française</div>
                                    </div>
                                </div>
                                <div className="hidden sm:flex gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                                    <span className="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1">Ma Mairie</span>
                                    <span>Démarches</span>
                                    <span>Vivre à Belleville</span>
                                </div>
                            </div>
                            
                            {/* Hero Section of the fake Mairie Site */}
                            <div className="flex-1 bg-white dark:bg-[#1a1a1a] rounded-t-xl overflow-hidden shadow-sm flex flex-col">
                                <div className="h-1/3 bg-blue-600/10 dark:bg-blue-600/20 relative">
                                    {/* Image placeholder / graphic */}
                                </div>
                                <div className="p-6 relative text-center">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-white dark:bg-[#222] rounded-xl shadow-lg border border-slate-100 dark:border-white/5 flex items-center justify-around px-4 divide-x divide-slate-100 dark:divide-white/5">
                                        <div className="flex flex-col items-center flex-1 px-2 cursor-pointer group">
                                            <FileText className="w-5 h-5 text-blue-500 mb-1 group-hover:scale-110 transition-transform" />
                                            <span className="text-[8px] sm:text-[10px] font-bold text-slate-700 dark:text-slate-300">ACTES D'ÉTAT CIVIL</span>
                                        </div>
                                        <div className="flex flex-col items-center flex-1 px-2 cursor-pointer group">
                                            <HeartHandshake className="w-5 h-5 text-emerald-500 mb-1 group-hover:scale-110 transition-transform" />
                                            <span className="text-[8px] sm:text-[10px] font-bold text-slate-700 dark:text-slate-300">PORTAIL FAMILLE</span>
                                        </div>
                                        <div className="flex flex-col items-center flex-1 px-2 cursor-pointer group">
                                            <Siren className="w-5 h-5 text-amber-500 mb-1 group-hover:scale-110 transition-transform" />
                                            <span className="text-[8px] sm:text-[10px] font-bold text-slate-700 dark:text-slate-300">SIGNALER INCIDENT</span>
                                        </div>
                                    </div>
                                    <h3 className="mt-12 text-lg font-bold text-slate-900 dark:text-white">Actualités de la semaine</h3>
                                    <p className="text-xs text-slate-500 mt-2">Dernières informations publiées par vos services dématérialisés.</p>
                                </div>
                            </div>

                            {/* Floating "RGAA" Notification */}
                            <motion.div 
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/3 -left-4 p-3 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border border-slate-100 dark:border-white/10 flex items-center gap-3 backdrop-blur-md z-20"
                            >
                                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                                    <Accessibility className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                        Accessibilité RGAA
                                        <span className="text-emerald-500 text-[8px] bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-sm">100% Conforme</span>
                                    </div>
                                    <div className="text-[9px] text-slate-500 mt-0.5">Adapté aux lecteurs d'écran</div>
                                </div>
                            </motion.div>

                            {/* Floating "Security" Notification */}
                            <motion.div 
                                animate={{ y: [5, -5, 5] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-10 -right-4 p-3 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border border-slate-100 dark:border-white/10 flex items-center gap-3 backdrop-blur-md z-20"
                            >
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                    <ShieldAlert className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-900 dark:text-white">
                                        Hébergement Souverain
                                    </div>
                                    <div className="text-[9px] text-slate-500 mt-0.5">Data Centers FR (SecNumCloud)</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
