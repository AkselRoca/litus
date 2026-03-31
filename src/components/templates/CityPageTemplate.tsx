import { Metadata } from 'next'
import { EstimatorSection, StatsSection } from '@/components/sections'
import { Button, Card } from '@/components/ui'
import { MapPin, Phone, ArrowRight, Check, Building2, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { StructuredData, generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/schema'

interface CityPageProps {
    city: {
        name: string // "Lorient"
        department: string // "Morbihan (56)"
        slug: string // "lorient"
        tagline: string
        description: string
        stats: {
            population: string
            businesses: string
            digitalRate: string
        }
        advantages: string[]
        services: {
            icon: any
            title: string
            description: string
            link: string
        }[]
        testimonial?: {
            name: string
            business: string
            quote: string
            result: string
        }
    }
}

export function generateCityMetadata(city: CityPageProps['city']): Metadata {
    return {
        title: `Agence Web ${city.name} ${city.department} - Sites & SEO Local | Litus`,
        description: `Agence web locale à ${city.name}. Création de sites, SEO local et Google Ads pour PME et artisans du ${city.department}. Devis gratuit.`,
        keywords: [
            `agence web ${city.name}`,
            `création site ${city.name}`,
            `SEO ${city.name}`,
            city.slug,
            city.department,
        ],
        openGraph: {
            title: `Agence Web ${city.name} - Votre Partenaire Digital Local`,
            description: `Agence web locale à ${city.name}. Sites internet, SEO local et Google Ads pour booster votre business.`,
        },
    }
}

export function CityPageTemplate({ city }: CityPageProps) {
    // Schema.org structured data
    const localBusinessSchema = generateLocalBusinessSchema({
        name: `Litus - Agence Web ${city.name}`,
        description: city.description,
        url: `https://litus.fr/villes/${city.slug}`,
        telephone: '+33744985521',
        address: {
            streetAddress: '',
            addressLocality: city.name,
            postalCode: city.name === 'Lorient' ? '56100' : '72000',
            addressCountry: 'FR',
        },
        areaServed: [city.name],
        priceRange: '€€€',
    })

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Accueil', url: 'https://litus.fr' },
        { name: 'Villes', url: 'https://litus.fr/villes' },
        { name: city.name, url: `https://litus.fr/villes/${city.slug}` },
    ])

    return (
        <div className="min-h-screen-dynamic">
            {/* Schema.org Structured Data */}
            <StructuredData data={localBusinessSchema} />
            <StructuredData data={breadcrumbSchema} />
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-black overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-[128px]" />
                </div>

                <div className="container-fluid relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                            <MapPin className="w-4 h-4" />
                            <span>{city.name} {city.department}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                {city.tagline}
                            </span>
                            <br />
                            <span className="text-primary">à {city.name}</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            {city.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" href="/contact">
                                Devis Gratuit
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button size="lg" variant="secondary" href="tel:+33744985521">
                                <Phone className="w-5 h-5 mr-2" />
                                07 44 98 55 21
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Locales */}
            <section className="py-16 bg-white dark:bg-dark">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-4xl font-bold text-primary mb-2">{city.stats.population}</div>
                                <div className="text-gray-600 dark:text-gray-300">Habitants</div>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-4xl font-bold text-primary mb-2">{city.stats.businesses}</div>
                                <div className="text-gray-600 dark:text-gray-300">Entreprises</div>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-4xl font-bold text-primary mb-2">{city.stats.digitalRate}</div>
                                <div className="text-gray-600 dark:text-gray-300">Taux digitalisation</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Estimateur */}
            <EstimatorSection />

            {/* Pourquoi une agence locale */}
            <section className="py-20 bg-gray-50 dark:bg-black">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                            Pourquoi choisir une agence web <span className="text-primary">à {city.name}</span> ?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {city.advantages.map((advantage, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">{advantage}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 bg-white dark:bg-dark">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Nos services pour les entreprises de {city.name}
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                Solutions digitales adaptées à votre marché local
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {city.services.map((service, idx) => (
                                <Card key={idx} variant="hover-3d" className="p-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center mb-4">
                                        <service.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                                        {service.description}
                                    </p>
                                    <Link
                                        href={service.link}
                                        className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center gap-1"
                                    >
                                        En savoir plus
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            {city.testimonial && (
                <section className="py-20 bg-gray-50 dark:bg-black">
                    <div className="container-fluid">
                        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 border-2 border-primary/20">
                            <div className="text-center mb-6">
                                <div className="text-4xl mb-4">"</div>
                                <p className="text-xl text-gray-700 dark:text-gray-200 italic mb-6">
                                    {city.testimonial.quote}
                                </p>
                                <div className="font-bold text-primary text-lg mb-2">
                                    {city.testimonial.result}
                                </div>
                                <div>
                                    <div className="font-semibold">{city.testimonial.name}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {city.testimonial.business}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-primary via-primary to-orange-600 text-white">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Prêt à booster votre business à {city.name} ?
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            Rencontrons-nous autour d'un café pour discuter de votre projet digital
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
