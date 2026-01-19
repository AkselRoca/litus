import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Target, Users } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Études de Cas - Nos Réussites Clients | Litus',
    description: 'Découvrez comment nous avons aidé des artisans et PME locales à développer leur visibilité en ligne et générer plus de clients.',
}

const caseStudies = [
    {
        slug: 'paysagiste-lorient',
        title: 'Jardins du Morbihan',
        subtitle: 'Paysagiste à Lorient',
        description: 'Comment un paysagiste a multiplié par 4 ses demandes de devis grâce au SEO local.',
        services: ['Site Vitrine', 'SEO Local'],
        metrics: [
            { label: 'Trafic', value: '+340%' },
            { label: 'Leads/mois', value: '45' },
            { label: 'ROI', value: 'x8' },
        ],
        image: '/images/case-studies/paysagiste.jpg',
    },
    {
        slug: 'plombier-le-mans',
        title: 'Plomberie Express 72',
        subtitle: 'Plombier au Mans',
        description: 'Réduction de 52% du coût par lead grâce à une campagne Google Ads optimisée.',
        services: ['Google Ads', 'Landing Page'],
        metrics: [
            { label: 'Coût/lead', value: '-52%' },
            { label: 'Appels/sem.', value: '28' },
            { label: 'CPC moyen', value: '4,20€' },
        ],
        image: '/images/case-studies/plombier.jpg',
    },
]

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero */}
            <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
                </div>

                <div className="container-fluid relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                            <TrendingUp className="w-4 h-4" />
                            Résultats prouvés
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Études de <span className="text-primary">Cas</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Des résultats concrets pour des entreprises locales comme la vôtre
                        </p>
                    </div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-20">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {caseStudies.map((study) => (
                                <Link
                                    key={study.slug}
                                    href={`/etudes-de-cas/${study.slug}`}
                                    className="group block"
                                >
                                    <div className="
                                        relative h-full rounded-3xl overflow-hidden
                                        bg-gray-50 dark:bg-gray-900
                                        border border-gray-200 dark:border-white/10
                                        hover:border-primary/50
                                        hover:shadow-2xl hover:shadow-primary/10
                                        transition-all duration-500
                                        hover:-translate-y-2
                                    ">
                                        {/* Top section with gradient */}
                                        <div className="relative h-48 bg-gradient-to-br from-gray-900 to-black p-8">
                                            <div className="absolute inset-0 bg-primary/10" />
                                            <div className="relative z-10">
                                                <div className="text-sm text-gray-400 mb-2">{study.subtitle}</div>
                                                <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                                    {study.title}
                                                </h2>
                                            </div>

                                            {/* Metrics overlay */}
                                            <div className="absolute bottom-4 left-8 right-8 flex gap-4">
                                                {study.metrics.map((metric, idx) => (
                                                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                                                        <div className="text-lg font-bold text-primary">{metric.value}</div>
                                                        <div className="text-xs text-gray-300">{metric.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8">
                                            <div className="flex gap-2 mb-4">
                                                {study.services.map((service, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                                                    >
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                {study.description}
                                            </p>

                                            <div className="flex items-center text-primary font-semibold">
                                                <span>Lire l'étude complète</span>
                                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gray-50 dark:bg-gray-950">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Votre entreprise sera la prochaine ?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Discutons de votre projet et voyons comment nous pouvons vous aider à atteindre vos objectifs.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-orange-500 text-white font-bold rounded-full hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
                        >
                            Demander un devis gratuit
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
