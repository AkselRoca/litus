import { Metadata } from 'next'
import { LeadMagnetForm } from '@/components/forms/LeadMagnetForm'
import { BarChart, Clock, Target, TrendingUp, Check, Zap } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Cartographie Productivité Gratuite - Optimisez votre Temps | Litus',
    description:
        'Découvrez où vous perdez du temps dans votre business. Cartographie gratuite pour identifier les tâches à automatiser avec un site web professionnel.',
    keywords: ['productivité', 'automatisation', 'gain de temps', 'optimisation business'],
}

export default function CartoProductivitePage() {
    const benefits = [
        'Analyse de vos tâches quotidiennes',
        'Identification des tâches répétitives',
        'Calcul du temps économisable',
        'Recommandations d\'automatisation',
        'Estimation du ROI d\'un site web',
        'Plan d\'action personnalisé',
    ]

    const painPoints = [
        {
            icon: Clock,
            title: 'Trop de temps perdu',
            description: 'Vous passez des heures à répondre aux mêmes questions par email/téléphone',
        },
        {
            icon: Target,
            title: 'Gestion manuelle',
            description: 'Devis, factures, rendez-vous... tout est fait à la main',
        },
        {
            icon: BarChart,
            title: 'Pas de visibilité',
            description: 'Difficile de mesurer votre temps réellement productif',
        },
        {
            icon: TrendingUp,
            title: 'Croissance limitée',
            description: 'Impossible de scaler sans embaucher',
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
                                    <span>100% Gratuit & Personnalisé</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                    <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                        Cartographie Productivité
                                    </span>
                                    <br />
                                    <span className="text-primary">Économisez 10h par semaine</span>
                                </h1>

                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                    Identifiez précisément où vous perdez du temps et comment automatiser vos
                                    tâches répétitives grâce au digital.
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
                                <h2 className="text-2xl font-bold mb-2">Recevez votre cartographie</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Complétez le formulaire pour recevoir votre analyse personnalisée.
                                </p>
                                <LeadMagnetForm
                                    magnetId="carto-productivite"
                                    magnetTitle="Cartographie Productivité"
                                    downloadUrl="/lead-magnets/carto-productivite.pdf"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pain Points */}
            <section className="py-20 bg-white dark:bg-dark">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Vous vous reconnaissez ?
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                Ces problématiques vous parlent ? La cartographie va vous aider
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {painPoints.map((item, idx) => (
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

            {/* Results */}
            <section className="py-20 bg-gray-50 dark:bg-black">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ce que vous allez découvrir
                            </h2>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 border-2 border-primary/20">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div>
                                    <div className="text-5xl font-bold text-primary mb-2">10h</div>
                                    <div className="text-gray-600 dark:text-gray-300">
                                        Temps économisé par semaine en moyenne
                                    </div>
                                </div>
                                <div>
                                    <div className="text-5xl font-bold text-primary mb-2">60%</div>
                                    <div className="text-gray-600 dark:text-gray-300">
                                        De tâches automatisables identifiées
                                    </div>
                                </div>
                                <div>
                                    <div className="text-5xl font-bold text-primary mb-2">3-6</div>
                                    <div className="text-gray-600 dark:text-gray-300">
                                        Mois pour rentabiliser l'investissement
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
