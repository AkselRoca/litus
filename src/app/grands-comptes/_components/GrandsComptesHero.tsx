'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ShieldCheck, ArrowRight, Server, Database, Activity, Lock, Cloud } from 'lucide-react'

export function GrandsComptesHero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-50 dark:bg-[#030712]">
            <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent dark:from-indigo-900/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-[100%] blur-[120px] pointer-events-none" />
            
            <div className="container-fluid relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-center lg:text-left max-w-3xl lg:max-w-none mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest mb-8 border border-indigo-200 dark:border-indigo-500/20 shadow-sm"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            <span>Grands Comptes & ETI</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8"
                        >
                            La vitesse d'une WebApp. <br className="hidden lg:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-400 dark:to-indigo-300">
                                La sécurité d'une Banque.
                            </span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-light"
                        >
                            Oubliez les dépendances toxiques (WordPress) et les délais absurdes des ESN traditionnelles. Nous concevons l'architecture digitale de votre Groupe en React/Node, <strong className="font-semibold text-slate-900 dark:text-white">branchée en direct sur votre SI</strong> (SAP, Salesforce).
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <Button size="lg" className="h-14 px-8 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 border-none" href="/contact">
                                Auditer mon architecture
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 w-full sm:w-auto border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200" href="/portfolio">
                                Études de cas ETI <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex-1 relative w-full max-w-xl mx-auto lg:max-w-none"
                    >
                        {/* Enterprise Cloud/Server Mockup */}
                        <div className="relative rounded-2xl bg-white dark:bg-[#0b0f19] border border-slate-200/50 dark:border-slate-800/80 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col font-mono text-sm">
                            
                            {/* Server Header */}
                            <div className="h-10 border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-4 bg-slate-50 dark:bg-black/40">
                                <div className="flex gap-2 items-center text-xs text-slate-500 font-bold tracking-wider">
                                    <Server className="w-4 h-4" /> 
                                    NODE_PROD_CLUSTER
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">100% UPTIME</span>
                                </div>
                            </div>
                            
                            <div className="flex-1 p-6 relative overflow-hidden flex flex-col">
                                {/* Architecture Visual */}
                                <div className="flex items-center justify-between mt-auto mb-auto max-w-md mx-auto w-full px-4">
                                    {/* Frontend Node */}
                                    <div className="flex flex-col items-center gap-2 relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg flex items-center justify-center border border-indigo-400/50">
                                            <Cloud className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400">LITUS EDGE</div>
                                    </div>
                                    
                                    {/* Connection Line */}
                                    <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/50 via-amber-500/50 to-slate-500/50 relative">
                                        <motion.div 
                                            animate={{ left: ["0%", "100%"] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            className="absolute top-1/2 -translate-y-1/2 w-8 h-2 bg-gradient-to-r from-transparent via-indigo-400 to-transparent blur-sm" 
                                        />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0b0f19] px-2 py-0.5 border border-slate-800 rounded-full text-[8px] text-slate-400 font-bold">
                                            SECURE API
                                        </div>
                                    </div>

                                    {/* Backend/ERP Node */}
                                    <div className="flex flex-col items-center gap-2 relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 shadow-lg flex items-center justify-center text-white font-bold text-xs">
                                            ERP
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400">SAP / SALESFORCE</div>
                                    </div>
                                </div>

                                {/* Floating Modules */}
                                <motion.div 
                                    animate={{ y: [-3, 3, -3] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-6 left-6 p-3 bg-white dark:bg-[#111827] rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800 flex items-center gap-3 backdrop-blur-md"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                                        <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400">WAF Protection</div>
                                        <div className="text-xs font-bold text-slate-900 dark:text-white">DDoS Mitigated</div>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    animate={{ y: [3, -3, 3] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-6 right-6 p-3 bg-white dark:bg-[#111827] rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800 flex items-center gap-3 backdrop-blur-md"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
                                        <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Response Time</div>
                                        <div className="text-xs font-bold text-slate-900 dark:text-white">12 ms (Global CDN)</div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
