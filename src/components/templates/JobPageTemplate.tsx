import { Metadata } from 'next'
import { EstimatorSection } from '@/components/sections'
import { Button } from '@/components/ui'
import { Check, Phone, ArrowRight } from 'lucide-react'
import { StructuredData, generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/schema'

interface JobPageProps {
    job: {
        name: string // Ex: "Paysagiste"
        slug: string // Ex: "paysagiste"
        city: string // Ex: "Lorient"
        citySlug: string // Ex: "lorient"
        description: string
        challenges: string[]
        solutions: string[]
        services: {
            name: string
            price: string
            description: string
        }[]
        cta: {
            title: string
            subtitle: string
        }
    }
}

export function generateJobMetadata(job: JobPageProps['job']): Metadata {
    return {
        title: `${job.name} ${job.city} - Sites Web & SEO Local | Litus`,
        description: `Agence web spécialisée pour ${job.name.toLowerCase()}s à ${job.city}. Site internet professionnel, SEO local et Google Ads. Devis gratuit.`,
        keywords: [
            job.name.toLowerCase(),
            job.city,
            `site web ${job.name.toLowerCase()}`,
            `SEO ${job.name.toLowerCase()}`,
            job.citySlug,
        ],
        openGraph: {
            title: `${job.name} ${job.city} - Sites Web & SEO Local`,
            description: `Agence web spécialisée pour ${job.name.toLowerCase()}s à ${job.city}. Site internet professionnel, SEO local et Google Ads.`,
        },
    }
}

export function JobPageTemplate({ job }: JobPageProps) {
    // Schema.org structured data
    const localBusinessSchema = generateLocalBusinessSchema({
        name: `${job.name} ${job.city} - Litus`,
        description: job.description,
        url: `https://litus.fr/metiers/${job.slug}-${job.citySlug}`,
        telephone: '+33123456789',
        address: {
            streetAddress: '',
            addressLocality: job.city,
            postalCode: job.city === 'Lorient' ? '56100' : '72000',
            addressCountry: 'FR',
        },
        areaServed: [job.city],
        priceRange: '€€',
    })

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Accueil', url: 'https://litus.fr' },
        { name: 'Métiers', url: 'https://litus.fr/metiers' },
        { name: `${job.name} ${job.city}`, url: `https://litus.fr/metiers/${job.slug}-${job.citySlug}` },
    ])

    return (
        <div className="min-h-screen-dynamic">
            {/* Schema.org Structured Data */}
            <StructuredData data={localBusinessSchema} />
            <StructuredData data={breadcrumbSchema} />

            {/* Hero Section */}
            < section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-black overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-[128px]" />
                </div>

                <div className="container-fluid relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                            <span>Spécialisé {job.name}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                Agence Web pour {job.name}s
                            </span>
                            <br />
                            <span className="text-primary">à {job.city}</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            {job.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" href="/contact">
                                Devis Gratuit
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button size="lg" variant="secondary" href="tel:+33123456789">
                                <Phone className="w-5 h-5 mr-2" />
                                01 23 45 67 89
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Estimateur de Potentiel */}
            <EstimatorSection />

            {/* Challenges Section */}
            <section className="py-20 bg-white dark:bg-dark">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Challenges */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    Vous êtes {job.name.toLowerCase()} et vous rencontrez...
                                </h2>
                                <ul className="space-y-4">
                                    {job.challenges.map((challenge, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                            <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-red-600 dark:text-red-400 text-sm">✗</span>
                                            </div>
                                            <span>{challenge}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Solutions */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    <span className="text-primary">Nos solutions</span> pour vous
                                </h2>
                                <ul className="space-y-4">
                                    {job.solutions.map((solution, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                                            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            </div>
                                            <span className="font-medium">{solution}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50 dark:bg-black">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Nos services pour {job.name.toLowerCase()}s
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                Des solutions adaptées à votre métier
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {job.services.map((service, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-white/10 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl"
                                >
                                    <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                                    <div className="text-primary font-bold text-lg mb-4">{service.price}</div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                                    <Button href="/contact" variant="secondary" className="w-full">
                                        En savoir plus
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-primary via-primary to-orange-600 text-white">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            {job.cta.title}
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            {job.cta.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" href="/contact">
                                Demander un devis gratuit
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button
                                size="lg"
                                variant="ghost"
                                href="tel:+33123456789"
                                className="bg-white/10 hover:bg-white/20 border-white text-white"
                            >
                                <Phone className="w-5 h-5 mr-2" />
                                01 23 45 67 89
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
