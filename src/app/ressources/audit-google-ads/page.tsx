import { Metadata } from 'next'
import { LeadMagnetForm } from '@/components/forms/LeadMagnetForm'
import { Target, TrendingUp, Users, Zap, Check } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Audit Google Ads Gratuit - Optimisez vos Campagnes | Litus',
    description:
        'Recevez un audit complet de vos campagnes Google Ads. Identifiez les opportunités d\'optimisation et boostez votre ROI gratuitement.',
    keywords: ['audit google ads', 'optimisation google ads', 'audit gratuit', 'ROI publicité'],
}

export default function AuditGoogleAdsPage() {
    const benefits = [
        'Analyse complète de vos campagnes actuelles',
        'Identification des mots-clés non performants',
        'Suggestions d\'optimisation budgétaire',
        'Recommandations d\'amélioration du Quality Score',
        'Opportunités de conversions manquées',
        'Rapport détaillé sous 48h',
    ]

    const whatWeAnalyze = [
        {
            icon: Target,
            title: 'Structure des campagnes',
            description: 'Organisation, groupes d\'annonces, ciblage géographique',
        },
        {
            icon: TrendingUp,
            title: 'Performance & Budget',
            description: 'CPC, CTR, taux de conversion, gaspillage budgétaire',
        },
        {
            icon: Users,
            title: 'Audiences & Mots-clés',
            description: 'Pertinence, exclusions, opportunités de longue traîne',
        },
        {
            icon: Zap,
            title: 'Annonces & Extensions',
            description: 'Messages, A/B testing, extensions d\'annonces manquantes',
        },
    ]

    return (
        <div className="min-h-screen-dynamic">
            {/* Hero */}
            <section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-black overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-[128px]" />
                </div>

                <div className="container-fluid relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left - Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                                    <Zap className="w-4 h-4" />
                                    <span>100% Gratuit</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                    <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                        Audit Google Ads
                                    </span>
                                    <br />
                                    <span className="text-primary">Gratuit & Sans Engagement</span>
                                </h1>

                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                    Découvrez comment optimiser vos campagnes Google Ads et réduire votre coût
                                    par acquisition de 20 à 40%.
                                </p>

                                <div className="space-y-3">
                                    {benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right - Form */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl border-2 border-primary/20">
                                <h2 className="text-2xl font-bold mb-2">Recevez votre audit</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Remplissez le formulaire et recevez votre audit sous 48h.
                                </p>
                                <LeadMagnetForm
                                    magnetId="audit-google-ads"
                                    magnetTitle="Audit Google Ads Gratuit"
                                    downloadUrl="/lead-magnets/audit-google-ads-template.pdf"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Analyze */}
            <section className="py-20 bg-white dark:bg-dark">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ce que nous analysons
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                Un audit en 4 axes pour maximiser votre ROI
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {whatWeAnalyze.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-white/10"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center mb-4">
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-20 bg-gray-50 dark:bg-black">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 border-primary/20">
                            <p className="text-2xl text-gray-700 dark:text-gray-200 italic mb-4">
                                "Grâce à l'audit Litus, nous avons réduit notre CPC de 35% et doublé nos
                                conversions en 2 mois."
                            </p>
                            <div className="font-bold text-primary">-42% de coût par lead</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                Sophie M., E-commerce à Le Mans
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
