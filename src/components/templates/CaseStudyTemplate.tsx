import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, TrendingUp, Users, Target, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CaseStudyData {
    slug: string
    clientName: string
    clientLogo?: string
    industry: string
    location: string
    services: string[]
    duration: string
    heroImage?: string
    challenge: {
        title: string
        description: string
        painPoints: string[]
    }
    solution: {
        title: string
        description: string
        steps: { title: string; description: string }[]
    }
    results: {
        title: string
        description: string
        metrics: { label: string; value: string; prefix?: string; suffix?: string }[]
    }
    testimonial?: {
        quote: string
        author: string
        role: string
    }
}

interface CaseStudyTemplateProps {
    data: CaseStudyData
}

export function generateCaseStudyMetadata(data: CaseStudyData): Metadata {
    return {
        title: `${data.clientName} - Étude de Cas | Litus`,
        description: `Découvrez comment nous avons aidé ${data.clientName} (${data.industry} à ${data.location}) à atteindre ses objectifs avec ${data.services.join(', ')}.`,
        openGraph: {
            title: `Étude de Cas: ${data.clientName}`,
            description: data.challenge.description,
        },
    }
}

export function CaseStudyTemplate({ data }: CaseStudyTemplateProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero */}
            <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
                </div>

                <div className="container-fluid relative z-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Back link */}
                        <Link
                            href="/etudes-de-cas"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour aux études de cas
                        </Link>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                            <Target className="w-4 h-4" />
                            {data.industry} • {data.location}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {data.clientName}
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                            {data.challenge.description}
                        </p>

                        {/* Meta info */}
                        <div className="flex flex-wrap gap-6 text-gray-400">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>{data.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                <span>{data.services.join(' + ')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Preview Bar */}
            <section className="py-8 bg-primary">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {data.results.metrics.map((metric, idx) => (
                                <div key={idx} className="text-white">
                                    <div className="text-3xl md:text-4xl font-bold">
                                        {metric.prefix}{metric.value}{metric.suffix}
                                    </div>
                                    <div className="text-sm opacity-80">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenge Section */}
            <section className="py-20">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <Target className="w-6 h-6 text-red-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {data.challenge.title}
                            </h2>
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            {data.challenge.description}
                        </p>

                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Points de friction identifiés :</h3>
                            <ul className="space-y-3">
                                {data.challenge.painPoints.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                        <span className="text-red-500 mt-1">✗</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-950">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {data.solution.title}
                            </h2>
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
                            {data.solution.description}
                        </p>

                        <div className="space-y-6">
                            {data.solution.steps.map((step, idx) => (
                                <div
                                    key={idx}
                                    className="flex gap-6 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-white/10"
                                >
                                    <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center flex-shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-20">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {data.results.title}
                            </h2>
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
                            {data.results.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {data.results.metrics.map((metric, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-2xl p-6 text-center border border-primary/20"
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                        {metric.prefix}{metric.value}{metric.suffix}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            {data.testimonial && (
                <section className="py-20 bg-gray-900">
                    <div className="container-fluid">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="text-6xl mb-6">"</div>
                            <p className="text-2xl text-white italic mb-8">
                                {data.testimonial.quote}
                            </p>
                            <div>
                                <div className="font-bold text-white">{data.testimonial.author}</div>
                                <div className="text-gray-400">{data.testimonial.role}</div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-20">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Prêt à obtenir les mêmes résultats ?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Discutons de votre projet et voyons comment nous pouvons vous aider.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" variant="primary" size="lg">
                                Demander un devis gratuit
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button href="/etudes-de-cas" variant="secondary" size="lg">
                                Voir d'autres études de cas
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
