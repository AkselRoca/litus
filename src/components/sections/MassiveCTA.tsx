'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Phone } from 'lucide-react'

export function MassiveCTA() {
    return (
        <section className="relative py-32 bg-gray-950 overflow-hidden">
            {/* Subtle gradient accent */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[180px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[150px]" />


            <div className="container-fluid relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
                        Prêt à <span className="text-primary">dominer</span><br />
                        votre marché local ?
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
                        Arrêtez de perdre des clients au profit de concurrents moins bons mais plus visibles.
                        Prenez votre place.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-orange-600 text-white shadow-xl shadow-primary/20 rounded-full" href="/audit-gratuit">
                                <span className="mr-2">🚀</span> Je veux mon Audit Gratuit
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button size="lg" variant="secondary" className="h-16 px-10 text-lg border-white text-white hover:bg-white hover:text-dark rounded-full" href="/contact">
                                <Phone className="mr-2 w-5 h-5" />
                                02 97 XX XX XX (Lorient)
                            </Button>
                        </motion.div>
                    </div>

                    <p className="mt-8 text-sm text-gray-500">
                        Sans engagement. Réponse sous 24h ouvrées.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
