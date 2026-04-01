import { Metadata } from 'next'
import { GrandsComptesHero } from './_components/GrandsComptesHero'
import { GrandsComptesStats } from './_components/GrandsComptesStats'
import { GrandsComptesPainPoints } from './_components/GrandsComptesPainPoints'
import { GrandsComptesSolutions } from './_components/GrandsComptesSolutions'
import { LeadMagnetInline } from '@/components/lead-magnets'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
    title: 'Développement Web Sur-Mesure & ERP pour Grands Comptes | Litus',
    description: "Architectures web performantes, scalables et sécurisées pour ETI et Grands Groupes. Intégration sur-mesure de vos CRM et ERP (Salesforce, SAP, Hubspot) en un temps record.",
}

export default function GrandsComptesPage() {
    return (
        <div className="bg-slate-50 dark:bg-[#030712] min-h-screen">
            <GrandsComptesHero />
            <GrandsComptesStats />
            <GrandsComptesPainPoints />
            <GrandsComptesSolutions />

            {/* Section Lead Magnet (Audit Technique) */}
            <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/5">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                <div className="container-fluid relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-200 dark:border-indigo-500/20">
                            <ShieldCheck className="w-4 h-4" /> Audit Confidentiel
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Identifiez les failles techniques de votre infrastructure.
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Lenteurs au chargement, dépendances à des plugins vulnérables (WordPress), dette technique. Obtenez un audit complet de la santé digitale de votre structure, sans engagement.
                        </p>
                    </div>
                    
                    <div className="max-w-2xl mx-auto">
                        <LeadMagnetInline magnetId="audit-productivite" />
                    </div>
                </div>
            </section>

            {/* Massive CTA Enterprise */}
            <section className="relative py-32 bg-[#020617] overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

                <div className="container-fluid relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
                            L'agilité d'une startup, pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-300">les exigences de votre groupe.</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Contournez les impasses techniques de votre DSI. Déployez un écosystème web connecté, sécurisé et scalable en quelques semaines, pas en plusieurs années.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button size="lg" className="h-16 px-10 text-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 rounded-full" href="/contact">
                                <span className="mr-2">⚡</span> Déployer notre projet
                            </Button>

                            <Button size="lg" variant="secondary" className="h-16 px-10 text-lg border-white/20 text-white hover:bg-white hover:text-slate-900 rounded-full bg-white/5 backdrop-blur-sm" href="/portfolio">
                                <ArrowRight className="mr-2 w-5 h-5" />
                                Voir nos cas d'usage techniques
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
