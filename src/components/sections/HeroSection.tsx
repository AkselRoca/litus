'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Star, TrendingUp, Zap, ShieldCheck, Sparkles } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/Animations'
import { useRef } from 'react'

export function HeroSection() {
    return (
        <section id="main-content" className="relative pt-44 pb-36 lg:pt-64 lg:pb-48 overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-500">

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Spotlight Source - Enhanced Warmth for Light Mode */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-orange-50 via-white/80 to-transparent dark:from-orange-500/15 dark:via-orange-900/5 dark:to-transparent blur-[100px] opacity-100 dark:opacity-60" />

                {/* Crisp Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] dark:opacity-[0.08] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />

                {/* Light Mode: Warmth Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/50 via-transparent to-blue-50/30 dark:hidden opacity-80" />

                {/* Dark Mode: "Breathing" Life (No flickering) */}
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-500/10 dark:bg-orange-600/10 rounded-full blur-[100px] animate-pulse duration-[8000ms]" />
                <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[100px] animate-pulse duration-[10000ms] delay-1000" />
            </div>

            <div className="container-fluid relative z-10">
                <div className="max-w-5xl mx-auto text-center">

                    {/* Top Badge */}
                    <ScrollReveal delay={0} direction="down">
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100/80 to-white/80 dark:from-orange-500/10 dark:to-orange-600/10 border border-orange-200/60 dark:border-orange-500/20 rounded-full mb-8 backdrop-blur-sm shadow-sm dark:shadow-none"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            </motion.div>
                            <span className="text-sm font-bold text-orange-800 dark:text-orange-400 uppercase tracking-wide">AGENCE WEB LOCALE</span>
                        </motion.div>
                    </ScrollReveal>

                    {/* H1 Heading */}
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.05]">
                            Votre Agence Web <br className="hidden md:block" />
                            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                                à Lorient & Le Mans
                            </span>
                        </h1>
                    </ScrollReveal>

                    {/* Subtitle - Updated for Inclusivity (Artisans, PME, Key Accounts) */}
                    <ScrollReveal delay={0.2}>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                            PME, Artisans, Collectivités ou Grands Comptes : nous concevons des <span className="text-gray-900 dark:text-white font-semibold">solutions digitales sur-mesure</span> qui propulsent votre croissance et renforcent votre image.
                        </p>
                    </ScrollReveal>

                    {/* CTAs */}
                    <ScrollReveal delay={0.3}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                                <Button
                                    size="xl"
                                    href="/contact"
                                    className="w-full sm:w-auto h-14 px-8 text-base font-semibold shadow-[0_0_40px_-10px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.6)] transition-all bg-orange-600 hover:bg-orange-700 text-white border-none"
                                >
                                    Devis Gratuit sous 24h
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                                <Button
                                    size="xl"
                                    variant="outline"
                                    href="#estimateur"
                                    className="w-full sm:w-auto h-14 px-8 text-base bg-white/50 dark:bg-white/5 backdrop-blur-md border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 group"
                                >
                                    <Zap className="mr-2 w-5 h-5 text-yellow-500 group-hover:fill-yellow-500 transition-colors" />
                                    Analysez votre marché
                                </Button>
                            </motion.div>
                        </div>
                    </ScrollReveal>

                    {/* Trust Indicators */}
                    <ScrollReveal delay={0.4}>
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 border-t border-gray-100 dark:border-white/5 pt-8">
                            <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-lg border border-gray-100 dark:border-white/5">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                <div className="text-left">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">Croissance</div>
                                    <div className="text-sm font-bold text-gray-900 dark:text-white">+150% Traffic</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-lg border border-gray-100 dark:border-white/5">
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                                </div>
                                <div className="text-left">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">Excellence</div>
                                    <div className="text-sm font-bold text-gray-900 dark:text-white">5/5 Google</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-lg border border-gray-100 dark:border-white/5">
                                <ShieldCheck className="w-5 h-5 text-blue-500" />
                                <div className="text-left">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">Garantie</div>
                                    <div className="text-sm font-bold text-gray-900 dark:text-white">Résultats</div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    )
}
