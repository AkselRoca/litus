'use client'

import Link from 'next/link'
import { ArrowRight, Globe, ShoppingCart, MapPin, Rocket, AppWindow } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'

export function ServicesSection() {
    return (
        <section className="py-24 bg-white dark:bg-dark relative overflow-hidden">
            {/* Unified Background Decoration - Subtle */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

            <div className="container-fluid relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block"
                        >
                            <span className="px-5 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-primary font-medium text-sm shadow-sm mb-6 inline-block">
                                Expertise & Savoir-faire
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold mb-6 font-heading"
                        >
                            Tout pour votre <span className="text-primary">Croissance</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                        >
                            Nous ne faisons pas "juste des sites". Nous construisons des écosystèmes digitaux rentables.
                        </motion.p>
                    </div>

                    {/* Bento Grid Layout - 3 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">

                        {/* Service 1: Sites Vitrine (Large) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 group h-full"
                        >
                            <Link href="/creation-site-internet" className="block h-full">
                                <Card variant="hover-3d" className="h-full bg-white dark:bg-white/5 backdrop-blur-sm border-gray-200 dark:border-white/10 overflow-hidden relative p-8">
                                    {/* Unique Gradient Background */}
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

                                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
                                        <div className="flex flex-col justify-center">
                                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                                                <Globe className="w-7 h-7" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">Sites Vitrine</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-6 font-light leading-relaxed">
                                                Design sur-mesure, typographie fluide, et animations soignées pour subjuguer vos visiteurs dès la première seconde.
                                            </p>
                                            <div className="mt-auto">
                                                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">À partir de 59€/mois</div>
                                                <div className="flex items-center text-primary font-bold">
                                                    <span>Voir les réalisations</span>
                                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Visual: Simulated Browser */}
                                        <div className="relative h-48 md:h-full w-full bg-gray-50/50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden flex items-center justify-center">
                                            <div className="absolute inset-x-4 top-4 bottom-0 bg-white dark:bg-[#1a1a1a] rounded-t-xl shadow-2xl border border-gray-200 dark:border-white/10 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex gap-1.5 mb-4">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="h-24 bg-gray-100 dark:bg-white/5 rounded-lg w-full" />
                                                    <div className="h-4 bg-gray-100 dark:bg-white/5 rounded w-2/3" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>

                        {/* Service 2: SEO Local (Vertical) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group h-full"
                        >
                            <Link href="/seo-local" className="block h-full">
                                <Card variant="hover-3d" className="h-full bg-white dark:bg-white/5 backdrop-blur-sm border-gray-200 dark:border-white/10 overflow-hidden relative p-8 flex flex-col">
                                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

                                    <div className="w-14 h-14 bg-orange-100 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400">
                                        <MapPin className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">SEO Local</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 font-light leading-relaxed flex-grow">
                                        Dominez les recherches "à proximité". Soyez le premier choix sur Google Maps.
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                                        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">À partir de 129€/mois</div>
                                        <div className="flex items-center text-primary font-bold text-sm">
                                            <span>Booster ma visibilité</span>
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>

                        {/* Service 3: Google Ads (Vertical) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group h-full"
                        >
                            <Link href="/google-ads" className="block h-full">
                                <Card variant="hover-3d" className="h-full bg-white dark:bg-white/5 backdrop-blur-sm border-gray-200 dark:border-white/10 overflow-hidden relative p-8 flex flex-col">
                                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

                                    <div className="w-14 h-14 bg-green-100 dark:bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                                        <Rocket className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">Google Ads</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 font-light leading-relaxed flex-grow">
                                        Acquisition immédiate. Nous transformons chaque euro investi en profit net.
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                                        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">À partir de 129€/mois</div>
                                        <div className="flex items-center text-primary font-bold text-sm">
                                            <span>Lancer une campagne</span>
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>

                        {/* Service 4: E-commerce (Large) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-2 group h-full"
                        >
                            <Link href="/creation-site-ecommerce" className="block h-full">
                                <Card variant="hover-3d" className="h-full bg-white dark:bg-white/5 backdrop-blur-sm border-gray-200 dark:border-white/10 overflow-hidden relative p-8">
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

                                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
                                        {/* Visual: Cart/Payment */}
                                        <div className="order-2 md:order-1 relative h-48 md:h-full w-full bg-gray-50/50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                                            <div className="w-full max-w-[220px] bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-gray-200 dark:border-white/10 p-4">
                                                <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-white/5 mb-3">
                                                    <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-16" />
                                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="h-8 bg-purple-50 dark:bg-purple-900/20 rounded w-full" />
                                                    <div className="h-8 bg-gray-50 dark:bg-white/5 rounded w-full" />
                                                </div>
                                                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex gap-2">
                                                    <div className="flex-1 h-8 bg-primary rounded" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="order-1 md:order-2 flex flex-col justify-center">
                                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                                                <ShoppingCart className="w-7 h-7" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">E-commerce</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-6 font-light leading-relaxed">
                                                Boutiques ultra-rapides, parcours d'achat optimisés, et intégrations paiements sécurisées.
                                            </p>
                                            <div className="mt-auto">
                                                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Prix sur devis</div>
                                                <div className="flex items-center text-primary font-bold">
                                                    <span>Lancer votre boutique</span>
                                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>

                        {/* New Service 5: Applications (Full Width) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-3 group"
                        >
                            <Link href="/creation-application-web" className="block h-full">
                                <Card variant="hover-3d" className="h-full bg-white dark:bg-white/5 backdrop-blur-sm border-gray-200 dark:border-white/10 overflow-hidden relative p-8">
                                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

                                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                        <div className="flex-1">
                                            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
                                                <AppWindow className="w-7 h-7" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">Applications & Outils Métiers (SaaS)</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-6 font-light leading-relaxed max-w-2xl">
                                                Des logiciels sur-mesure pour digitaliser vos processus internes. CRM, ERP, Tableaux de bord, Espaces membres.
                                                Gagnez du temps et automatisez votre activité.
                                            </p>
                                            <div className="mt-auto">
                                                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Prix sur devis</div>
                                                <div className="flex items-center text-primary font-bold">
                                                    <span>Développer mon outil</span>
                                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Visual: SaaS Dashboard */}
                                        <div className="flex-1 w-full flex justify-center md:justify-end">
                                            <div className="w-full max-w-lg bg-gray-50 dark:bg-black/40 rounded-xl border border-gray-100 dark:border-white/5 p-2 backdrop-blur-md">
                                                <div className="w-full h-32 md:h-40 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-sm border border-gray-200 dark:border-white/5 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                                    <div className="absolute top-3 left-3 right-3 flex gap-3">
                                                        <div className="w-1/4 h-20 bg-indigo-50 dark:bg-indigo-900/10 rounded" />
                                                        <div className="w-3/4 h-20 bg-gray-50 dark:bg-white/5 rounded" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>

                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
                        >
                            <span>Discuter de votre projet</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}


