import { Metadata } from 'next'
import { Button } from '@/components/ui'
import { ArrowRight, Phone, Shield } from 'lucide-react'
import { PricingContent } from '@/components/sections/PricingContent'

export const metadata: Metadata = {
    title: 'Tarifs - Agence Web Transparente | Litus',
    description:
        'Découvrez nos tarifs transparents pour sites web, SEO local et Google Ads. Packages adaptés aux PME et artisans. Devis gratuit.',
    keywords: ['tarifs agence web', 'prix site internet', 'devis SEO', 'tarifs Google Ads'],
}

export default function PricingPage() {
    return (
        <div className="min-h-screen-dynamic">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-black overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-[128px]" />
                </div>

                <div className="container-fluid relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                            <Shield className="w-4 h-4" />
                            <span>Tarifs Transparents</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                Des prix clairs,
                            </span>
                            <br />
                            <span className="text-primary">sans surprise</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Choisissez la formule adaptée à vos besoins. Pas de frais cachés, pas d'engagement forcé.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Content (Client Component) */}
            <PricingContent />

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-primary via-primary to-orange-600 text-white">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Besoin d'un devis personnalisé ?
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            Parlons de votre projet et créons ensemble la solution qui vous correspond
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" href="/contact">
                                Demander un devis gratuit
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button
                                size="lg"
                                variant="ghost"
                                href="tel:+33744985521"
                                className="bg-white/10 hover:bg-white/20 border-white text-white"
                            >
                                <Phone className="w-5 h-5 mr-2" />
                                07 44 98 55 21
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
