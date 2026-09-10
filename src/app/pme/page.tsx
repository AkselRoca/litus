import { Metadata } from 'next'
import { PmeHero } from './_components/PmeHero'
import { PmeStats } from './_components/PmeStats'
import { PmePainPoints } from './_components/PmePainPoints'
import { PmeSolutions } from './_components/PmeSolutions'
import { LeadMagnetInline } from '@/components/lead-magnets'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
    title: 'Agence web pour PME : site sur mesure, SEO & Google Ads | Litus',
    description: 'Faites grandir votre PME avec un site sur mesure, une stratégie SEO et Google Ads, et un suivi des demandes. Une équipe à vos côtés, de la refonte au pilotage.',
}

export default function PmePage() {
    return (
        <div className="bg-gray-50 dark:bg-[#050505] min-h-screen overflow-x-clip">
            <PmeHero />
            <PmeStats />
            <PmePainPoints />
            <PmeSolutions />

            {/* Section Lead Magnet (Guide Prix PME) */}
            <section className="py-24 relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                <div className="container-fluid relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                            📊 Guide PME Exclusif
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Prévoyez le budget digital de votre PME.
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Découvrez le vrai tarif d&apos;un site web performant, les aides de l&apos;État disponibles pour la numérisation des PME et comment rentabiliser votre investissement en moins d&apos;un an.
                        </p>
                    </div>
                    
                    <div className="max-w-2xl mx-auto">
                        <LeadMagnetInline magnetId="guide-prix" />
                    </div>
                </div>
            </section>

            {/* Massive CTA PME */}
            <section className="relative py-32 bg-gray-950 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />

                <div className="container-fluid relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight text-balance leading-tight">
                            Passez un cap. Devenez le <span className="text-blue-400">candidat naturel</span> de vos prospects B2B.
                        </h2>

                        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Arrêtez de perdre des appels d&apos;offres ou des marchés parce que votre image de marque n&apos;est pas à la hauteur de votre véritable expertise.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button size="lg" className="h-16 px-10 text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 rounded-full" href="/contact">
                                <span className="mr-2">🤝</span> Discuter de mon projet
                            </Button>

                            <Button size="lg" variant="secondary" className="h-16 px-10 text-lg border-white/20 text-white hover:bg-white hover:text-dark rounded-full bg-white/5 backdrop-blur-sm" href="/realisations">
                                <ArrowRight className="mr-2 w-5 h-5" />
                                Découvrir nos réalisations PME
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
