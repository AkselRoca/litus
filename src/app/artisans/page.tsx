import { Metadata } from 'next'
import { ArtisansHero } from './_components/ArtisansHero'
import { ArtisansStats } from './_components/ArtisansStats'
import { ArtisansPainPoints } from './_components/ArtisansPainPoints'
import { ArtisansSolutions } from './_components/ArtisansSolutions'
import { LeadMagnetInline } from '@/components/lead-magnets'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Création de Site Web pour Artisans & Indépendants | Litus',
    description: "Plombier, électricien, paysagiste, couvreur... Obtenez un site internet clé-en-main optimisé pour votre ville. Ne laissez plus vos concurrents prendre vos chantiers sur Google.",
}

export default function ArtisansPage() {
    return (
        <div className="bg-gray-50 dark:bg-[#050505] min-h-screen">
            {/* Hero Section */}
            <ArtisansHero />

            {/* Stats / Impact */}
            <ArtisansStats />

            {/* Problématiques (Pain Points) */}
            <ArtisansPainPoints />

            {/* Notre Solution */}
            <ArtisansSolutions />

            {/* Section Lead Magnet (Intégrée naturellement) */}
            <section className="py-24 relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                <div className="container-fluid relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                            🎁 Outil Gratuit pour les artisans
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Pas encore prêt pour un site ? <br className="hidden md:block"/>
                            Commencez par corriger votre Google.
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Même sans site web, votre fiche Google Maps (Google Business) est votre vitrine numéro 1. 
                            Téléchargez notre checklist pour éviter de perdre des appels.
                        </p>
                    </div>
                    
                    <div className="max-w-2xl mx-auto">
                        <LeadMagnetInline magnetId="checklist-gmb" />
                    </div>
                </div>
            </section>

            {/* Massive CTA adapté Artisans */}
            <section className="relative py-32 bg-gray-950 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />

                <div className="container-fluid relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight text-balance leading-tight">
                            Prêt à devenir <span className="text-emerald-400">l'artisan le plus visible</span> de votre ville ?
                        </h2>

                        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Pendant que vous lisez cette page, un client de votre ville cherche votre métier sur Google. 
                            Est-ce vous qu'il va trouver ou votre concurrent ?
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button size="lg" className="h-16 px-10 text-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/20 rounded-full" href="/contact">
                                <span className="mr-2">🚀</span> Discuter de mon projet
                            </Button>

                            <Button size="lg" variant="secondary" className="h-16 px-10 text-lg border-white/20 text-white hover:bg-white hover:text-dark rounded-full bg-white/5 backdrop-blur-sm" href="/tarifs">
                                <ArrowRight className="mr-2 w-5 h-5" />
                                Voir nos offres clés-en-main
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
