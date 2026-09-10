'use client'

import React from 'react'
import Image from 'next/image'
import { ServiceHero } from '@/components/sections/services/ServiceHero'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Check, Star, ArrowRight, ShieldCheck, Rocket } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/Animations'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion'
import { cn } from '@/lib/utils'

interface ServicePageProps {
    hero?: React.ReactNode
    title: string
    titleAccent?: string
    subtitle: string
    description: string
    heroImage?: string
    heroImagePosition?: string
    seoContent?: React.ReactNode
    features: {
        id?: string
        title: string
        description: string
        icon: React.ReactNode
        className?: string
        colSpan?: string
        visual?: React.ReactNode
    }[]
    featuredProject?: {
        title: string
        category: string
        description: string
        image: string
        link?: string
        stats: {
            value: string
            label: string
            icon: React.ReactNode
        }[]
    }
    realizations?: {
        image: string
        link: string
        title: string
    }[]
    pricing: {
        starter?: {
            price: string
            priceDetail?: string
            features: string[]
            engagement?: string
        }
        custom: {
            title: string
            description: string
        }
    }
    faqs: {
        question: string
        answer: string
    }[]
}

export function ServicePageTemplate({
    hero,
    title,
    titleAccent,
    subtitle,
    description,
    heroImage,
    heroImagePosition,
    seoContent,
    features,
    featuredProject,
    pricing,
    faqs,
}: ServicePageProps) {
    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] overflow-hidden selection:bg-orange-500/30">

            {hero ?? <ServiceHero
                id="service-title"
                title={title}
                accent={titleAccent}
                description={subtitle}
                secondaryAction={{ label: 'Voir les tarifs', href: '#tarifs' }}
                visual={<div className="service-hero-photo"><Image src={heroImage || '/hero-studio-editorial.webp'} alt={`Illustration du service : ${title}`} fill priority sizes="(max-width: 850px) 100vw, 52vw" className={heroImagePosition} /></div>}
                proof={<div className="service-hero-assurances">
                    <span><Star aria-hidden="true" />5/5 Google</span>
                    <span><ShieldCheck aria-hidden="true" />Garantie Résultat</span>
                    <span><Rocket aria-hidden="true" />Livraison Rapide</span>
                </div>}
            />}

            {/* --- FEATURES GRID (PREMIUM BENTO STYLE) --- */}
            <section className="py-32 bg-white dark:bg-[#050505] relative">
                <div className="container-fluid px-4 max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Expertise & Savoir-faire</h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">{description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.1} className={feature.colSpan || ''}>
                                <Card id={feature.id} variant="hover-3d" className={cn("h-full bg-white dark:bg-white/5 backdrop-blur-sm border-gray-200 dark:border-white/10 overflow-hidden relative group p-0 flex flex-col", feature.className)}>
                                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 p-8 flex flex-col h-full">
                                        <div className="mb-6 flex items-start justify-between">
                                            <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-gray-900 dark:text-white border border-gray-100 dark:border-white/5 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20">
                                                {feature.icon}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{feature.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-6">
                                            {feature.description}
                                        </p>

                                        {/* Rich Visual Area */}
                                        {feature.visual && (
                                            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                                                {feature.visual}
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- ETUDE DE CAS --- */}
            {featuredProject && (
                <section className="py-24 bg-gray-50 dark:bg-[#080808] relative overflow-hidden">
                    <div className="container-fluid px-4 max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <span className="text-orange-600 dark:text-orange-400 font-bold uppercase tracking-widest text-sm bg-orange-100 dark:bg-orange-900/20 px-3 py-1 rounded-full mb-4 inline-block">Succès Client</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Étude de Cas</h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <ScrollReveal>
                                <div className="space-y-8">
                                    <div className="inline-block">
                                        <span className="px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-semibold">
                                            {featuredProject.category}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                        {featuredProject.title}
                                    </h3>
                                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {featuredProject.description}
                                    </p>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                                        {featuredProject.stats.map((stat, i) => (
                                            <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow group/stat relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover/stat:opacity-20 transition-opacity text-orange-500">
                                                    {stat.icon}
                                                </div>
                                                <div className="text-2xl md:text-3xl font-extrabold text-orange-600 dark:text-orange-500 mb-1">{stat.value}</div>
                                                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wide leading-tight">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {featuredProject.link && (
                                        <div className="pt-4">
                                            <Button
                                                href={featuredProject.link}
                                                variant="secondary"
                                                className="rounded-full group/btn border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white dark:border-[#F97316] dark:text-[#F97316] dark:hover:bg-[#F97316] dark:hover:text-white"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Voir le site
                                                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2} className="relative">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 group">
                                    <div className="absolute inset-0 border-[8px] border-white/20 z-20 rounded-2xl pointer-events-none" />
                                    <img
                                        src={featuredProject.image}
                                        alt="Projet Client"
                                        className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>
            )}



            {/* --- SEO CONTENT WITH VISUALS --- */}
            {seoContent && (
                <section className="py-24 bg-gray-50/50 dark:bg-zinc-900/30 border-y border-gray-100 dark:border-white/5 relative overflow-hidden">
                    <div className="container-fluid px-4 max-w-4xl mx-auto relative z-10">
                        {seoContent}
                    </div>
                </section>
            )}

            {/* --- PRICING --- */}
            <section id="tarifs" className="py-32 relative">
                <div className="container-fluid px-4 max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"> {pricing.starter ? "Tarifs Transparents" : "Tarification Sur Mesure"}</h2>
                        <p className="text-gray-500 dark:text-gray-400">Des solutions adaptées à la maturité de votre projet.</p>
                    </div>

                    <div className={cn("grid grid-cols-1 gap-8 max-w-5xl mx-auto items-stretch", pricing.starter ? "md:grid-cols-2" : "max-w-2xl")}>
                        {pricing.starter && (
                            <ScrollReveal delay={0.1} className="h-full">
                                <Card variant="hover-3d" className="h-full p-8 md:p-10 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 hover:border-orange-200 dark:hover:border-orange-500/30 transition-all flex flex-col">
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Offre Accessibilité</h3>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-sm font-medium text-gray-500">À partir de</span>
                                            <span className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">{pricing.starter.price}</span>
                                            <span className="text-xl text-gray-500">{pricing.starter.priceDetail || '/mois'}</span>
                                        </div>
                                        {pricing.starter.engagement && (
                                            <div className="text-sm text-orange-600 dark:text-orange-400 font-medium mt-2 bg-orange-50 dark:bg-orange-900/10 inline-block px-3 py-1 rounded-full">
                                                {pricing.starter.engagement}
                                            </div>
                                        )}
                                    </div>
                                    <ul className="space-y-4 mb-10 flex-grow">
                                        {pricing.starter.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-3 text-base text-gray-700 dark:text-gray-300">
                                                <div className="p-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mt-0.5">
                                                    <Check className="w-3.5 h-3.5" />
                                                </div>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button size="lg" variant="secondary" className="w-full" href={`/contact?objet=${encodeURIComponent(`Offre Accessibilité — ${title}`)}`}>
                                        Choisir cette offre
                                    </Button>
                                </Card>
                            </ScrollReveal>
                        )}

                        <ScrollReveal delay={0.2} className="h-full">
                            <Card variant="hover-3d" className="h-full p-8 md:p-10 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 hover:border-orange-200 dark:hover:border-orange-500/30 transition-all flex flex-col group relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full pointer-events-none transition-opacity group-hover:bg-orange-600/10" />

                                <div className="mb-6 relative z-10">
                                    <h3 className="text-lg font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2">Projet Spécifique</h3>
                                    <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Sur Mesure</div>
                                    <div className="text-lg text-gray-500">Adapté à votre projet</div>
                                </div>

                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed relative z-10 flex-grow">
                                    {pricing.custom.description}
                                </p>

                                <div className="relative z-10">
                                    <Button size="lg" className="w-full" href={`/contact?objet=${encodeURIComponent(`Projet sur mesure — ${title}`)}`}>
                                        Demander un devis
                                    </Button>
                                </div>
                            </Card>
                        </ScrollReveal>

                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section className="py-24 bg-gray-50 dark:bg-[#080808]">
                <div className="container-fluid px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Questions Fréquentes</h2>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-gray-200 dark:border-white/10 px-0 bg-transparent">
                                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-orange-600 py-4">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-gray-600 dark:text-gray-400 leading-relaxed pb-4">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-32 relative overflow-hidden bg-white dark:bg-[#050505]">
                <div className="container-fluid px-4 relative z-10 text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Prêt à décoller ?
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button
                            href="/contact"
                            size="lg"
                            className="px-10"
                        >
                            Démarrer mon projet
                        </Button>
                    </div>
                </div>
            </section>

        </main>
    )
}
