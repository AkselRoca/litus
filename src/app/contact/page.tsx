import type { Metadata } from 'next'
import { ContactForm, ContactInfo } from '@/components/forms/ContactForm'
import { Sparkles, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/Animations'

export const metadata: Metadata = {
    title: 'Contact - Litus',
    description:
        'Envie de booster votre activité ? Contactez notre agence web à Lorient et Le Mans. Devis gratuit et réponse sous 2h.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 overflow-x-hidden">

            {/* Background Atmosphere - Cleaner version with Glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-orange-100/30 via-transparent to-transparent dark:from-orange-900/10 dark:via-transparent dark:to-transparent blur-[120px]" />
                <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-[10%] right-[5%] w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] mix-blend-screen animate-pulse-slow delay-75" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-[0.05]" />
            </div>

            <div className="container relative z-10 pt-28 pb-16 lg:pt-40 lg:pb-24 px-6 mx-auto">

                <div className="flex flex-col gap-8 max-w-7xl mx-auto">

                    {/* TOP SECTION: Split 45/55 (approx 5/7 cols) with Matching Heights */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

                        {/* LEFT COLUMN: Header + Info (Flex Col to stretch) - 5 cols */}
                        <ScrollReveal className="lg:col-span-5 flex flex-col justify-between h-full gap-10">
                            {/* Header Section */}
                            <div className="text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-500/10 rounded-full mb-6 relative overflow-hidden">
                                    <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                                    <span className="text-xs font-bold text-orange-800 dark:text-orange-200 uppercase tracking-wide">Agence Web • Lorient & Le Mans</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6">
                                    Parlons de votre <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                                        nouveau projet
                                    </span>
                                </h1>

                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                                    Vous avez une idée, un objectif, ou simplement besoin de conseils ?
                                    Notre équipe est là pour vous accompagner.
                                </p>
                            </div>

                            {/* Contact Info (Pushed to bottom) */}
                            <div className="bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                                <ContactInfo />
                            </div>
                        </ScrollReveal>

                        {/* RIGHT COLUMN: Form (Height reference) - 7 cols */}
                        <ScrollReveal delay={0.2} className="lg:col-span-7 h-full">
                            <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/10 p-8 rounded-3xl shadow-xl dark:shadow-2xl h-full flex flex-col justify-center relative overflow-hidden ring-1 ring-gray-900/5 dark:ring-white/5">
                                <ContactForm />
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* BOTTOM SECTION: Agenda Block (Full Width) */}
                    <ScrollReveal delay={0.3} className="w-full">
                        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transform transition-transform hover:scale-[1.01] overflow-hidden relative">
                            {/* Decorative Background Blob */}
                            <div className="absolute left-0 bottom-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                                <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Réserver un appel découverte</h3>
                                    <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl">
                                        Choisissez un créneau de 30 min pour nous parler de votre projet et de vos objectifs.
                                    </p>
                                </div>
                            </div>

                            <a
                                href="https://calendar.app.google/wgC3a6rCBy5ADUzn6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative z-10 inline-flex items-center justify-center px-8 py-4 bg-primary text-white hover:bg-primary/90 font-bold text-lg rounded-xl transition-colors shadow-lg shadow-primary/20 whitespace-nowrap"
                            >
                                Réserver
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </div>
    )
}
