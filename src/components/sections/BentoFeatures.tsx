'use client'

import { motion } from 'framer-motion'
import { Zap, MapPin, TrendingUp, MessageSquare, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export function BentoFeatures() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-dark relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

            <div className="container-fluid relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Pourquoi choisir <span className="text-primary">Litus</span> ?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Une approche radicalement différente des agences classiques.
                        Pas de blabla, juste des résultats.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                    {/* Feature 1: Speed - Large Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2"
                    >
                        <Card variant="hover-3d" className="h-full bg-white dark:bg-gray-900/50 border-gray-200 dark:border-white/10 overflow-hidden relative group">
                            <div className="p-8 relative z-10">
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-6 text-primary">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Performance Extrême</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md">
                                    Nous optimisons chaque ligne de code pour un score Google PageSpeed de 100/100.
                                    Vos clients n'attendent pas, votre site non plus.
                                </p>

                                {/* Visual Representation of Speed */}
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-sm font-medium text-gray-500">Litus</div>
                                        <div className="w-48 h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-primary"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '100%' }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 opacity-50">
                                        <div className="text-sm font-medium text-gray-500">WordPress std.</div>
                                        <div className="w-32 h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gray-400 w-[40%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Zap className="w-64 h-64 -mb-12 -mr-12" />
                            </div>
                        </Card>
                    </motion.div>

                    {/* Feature 2: Local - Tall Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:row-span-2"
                    >
                        <Card variant="hover-3d" className="h-full bg-dark text-white border-gray-800 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20" />

                            <div className="p-8 relative z-10 flex flex-col h-full">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">100% Local</h3>
                                <p className="text-gray-300 mb-8 flex-grow">
                                    Basés à Lorient et Le Mans. Nous connaissons le tissu économique local et vos concurrents.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-sm">Rendez-vous physique</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-sm">Shooting photo sur site</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-sm">Réseau partenaires</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Feature 3: ROI - Standard Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card variant="hover-3d" className="h-full bg-white dark:bg-gray-900/50 border-gray-200 dark:border-white/10">
                            <div className="p-8">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">ROI Focus</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    On ne vend pas des "visites", on vend des appels entrants et des devis signés.
                                </p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Feature 4: Support - Standard Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card variant="hover-3d" className="h-full bg-white dark:bg-gray-900/50 border-gray-200 dark:border-white/10">
                            <div className="p-8">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Support Direct</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Pas de système de ticket obscur. Un numéro direct, un WhatsApp, une réponse dans l'heure.
                                </p>
                            </div>
                        </Card>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
