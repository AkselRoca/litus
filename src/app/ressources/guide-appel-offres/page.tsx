import { Metadata } from 'next'
import { LeadMagnetForm } from '@/components/forms/LeadMagnetForm'
import { FileText, Shield, CheckCircle, Award, BookOpen, Check, Zap } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Guide Appel d\'Offres Gratuit - Répondre aux Marchés Publics | Litus',
    description:
        'Téléchargez le guide complet pour répondre aux appels d\'offres collectivités. Méthodologie, critères RGAA, exemples concrets.',
    keywords: ['appel d\'offres', 'marché public', 'collectivités', 'RGAA', 'guide gratuit'],
}

export default function GuideAppelOffresPage() {
    const benefits = [
        'Comprendre les critères d\'évaluation',
        'Méthodologie de réponse pas-à-pas',
        'Checklist documents obligatoires',
        'Exemples de réponses gagnantes',
        'Vocabulaire technique RGAA/RGPD',
        'Template de réponse pré-rempli',
    ]

    const whatInside = [
        {
            icon: BookOpen,
            title: 'Méthodologie',
            description: '15 pages de méthode éprouvée pour structurer votre réponse',
        },
        {
            icon: CheckCircle,
            title: 'Checklist',
            description: 'Liste exhaustive des pièces à fournir selon le type de marché',
        },
        {
            icon: Shield,
            title: 'Conformité RGAA',
            description: 'Critères d\'accessibilité et comment les respecter',
        },
        {
            icon: Award,
            title: 'Exemples Réels',
            description: '3 réponses gagnantes analysées et commentées',
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
                                    <FileText className="w-4 h-4" />
                                    <span>PDF 25 pages - Gratuit</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                    <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                        Guide Complet
                                    </span>
                                    <br />
                                    <span className="text-primary">Appels d'Offres Collectivités</span>
                                </h1>

                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                    Répondez aux marchés publics avec confiance. Méthodologie complète et
                                    templates pour maximiser vos chances.
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
                                <h2 className="text-2xl font-bold mb-2">Téléchargez le guide</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Recevez le PDF complet par email immédiatement.
                                </p>
                                <LeadMagnetForm
                                    magnetId="guide-appel-offres"
                                    magnetTitle="Guide Appel d'Offres Collectivités"
                                    downloadUrl="/lead-magnets/guide-appel-offres.pdf"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Inside */}
            <section className="py-20 bg-white dark:bg-dark">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ce que contient le guide
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                25 pages d'expertise condensée
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {whatInside.map((item, idx) => (
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

            {/* Target Audience */}
            <section className="py-20 bg-gray-50 dark:bg-black">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 border-2 border-primary/20">
                            <h2 className="text-2xl font-bold mb-6 text-center">
                                Ce guide est pour vous si...
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Vous n\'avez jamais répondu à un appel d\'offres',
                                    'Vous voulez maximiser vos chances de succès',
                                    'Vous ne connaissez pas les critères RGAA',
                                    'Vous cherchez des exemples concrets',
                                    'Vous voulez gagner du temps sur la rédaction',
                                    'Vous visez les marchés de collectivités',
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 dark:text-gray-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
