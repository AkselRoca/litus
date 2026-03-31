import { Metadata } from 'next'
import { Button } from '@/components/ui'
import { ArrowRight, Phone, Check, Shield, FileText, Users, Landmark, Award, Eye } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Agence Web pour Collectivités - Sites Accessibles & RGAA | Litus',
    description:
        'Agence web spécialisée dans la transformation numérique des collectivités territoriales. Sites accessibles RGAA, marchés publics, conformité RGPD. Lorient & Le Mans.',
    keywords: [
        'agence web collectivités',
        'site web mairie',
        'RGAA',
        'accessibilité numérique',
        'marché public',
        'transformation digitale collectivités',
    ],
}

export default function CollectivitesPage() {
    const expertises = [
        {
            icon: Shield,
            title: 'Conformité RGAA',
            description:
                'Respect strict des critères d\'accessibilité RGAA 4.1 pour garantir l\'accès aux services publics numériques à tous les citoyens.',
        },
        {
            icon: FileText,
            title: 'Marchés Publics',
            description:
                'Expérience des procédures de commande publique. Réponse aux appels d\'offres, accompagnement administratif complet.',
        },
        {
            icon: Users,
            title: 'Expérience Citoyenne',
            description:
                'Interfaces intuitives pensées pour tous les publics. Démarches simplifiées, informations claires et accessibles.',
        },
        {
            icon: Award,
            title: 'Données & RGPD',
            description:
                'Protection des données personnelles des administrés. Conformité RGPD, registre des traitements, DPO compatible.',
        },
    ]

    const services = [
        {
            title: 'Sites Institutionnels',
            features: [
                'Design sobre et professionnel',
                'Architecture d\'information claire',
                'Actualités et agenda',
                'Annuaire des services',
                'Conformité RGAA niveau AA minimum',
                'Responsive tous supports',
            ],
            price: 'À partir de 8 500€',
        },
        {
            title: 'Portails Citoyens',
            features: [
                'Démarches en ligne',
                'Espace personnel sécurisé',
                'Paiement en ligne',
                'Suivi de dossiers',
                'Notifications automatiques',
                'Intégrations métier (état civil, urbanisme)',
            ],
            price: 'Sur devis',
        },
        {
            title: 'Accompagnement RGAA',
            features: [
                'Audit d\'accessibilité',
                'Mise en conformité',
                'Formation des équipes',
                'Déclaration d\'accessibilité',
                'Schéma pluriannuel',
                'Maintenance corrective',
            ],
            price: 'À partir de 3 500€',
        },
    ]

    const garanties = [
        'Hébergement certifié HDS pour les données de santé',
        'Backup quotidien et plan de reprise d\'activité',
        'Support technique prioritaire (réponse < 4h)',
        'Formation des agents à l\'administration du site',
        'Maintenance évolutive et corrective incluse',
        'Conformité au RGESN (numérique responsable)',
    ]

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
                            <Landmark className="w-4 h-4" />
                            <span>Collectivités Territoriales</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                Transformation Numérique
                            </span>
                            <br />
                            <span className="text-primary">des Services Publics</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Agence web spécialisée dans les projets des collectivités. Sites accessibles, conformité RGAA, marchés publics. Lorient & Le Mans.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" href="/contact">
                                Demander une présentation
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

            {/* Notre Expertise */}
            <section className="py-20 bg-white dark:bg-dark">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Notre expertise au service du public
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                Des solutions adaptées aux enjeux des collectivités
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {expertises.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-white/10"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center mb-4">
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Nos Services */}
            <section className="py-20 bg-gray-50 dark:bg-black">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Nos solutions pour les collectivités
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                De la vitrine institutionnelle au portail citoyen complet
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {services.map((service, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-white/10 hover:border-primary dark:hover:border-primary transition-all duration-300"
                                >
                                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                    <div className="text-primary font-bold text-lg mb-6">
                                        {service.price}
                                    </div>
                                    <ul className="space-y-3 mb-6">
                                        {service.features.map((feature, fidx) => (
                                            <li key={fidx} className="flex items-start gap-2 text-sm">
                                                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700 dark:text-gray-200">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button href="/contact" variant="secondary" className="w-full">
                                        En savoir plus
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Garanties */}
            <section className="py-20 bg-white dark:bg-dark">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Nos garanties et engagements
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {garanties.map((garantie, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3 bg-green-50 dark:bg-green-900/10 rounded-xl p-4"
                                >
                                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 dark:text-gray-200">
                                        {garantie}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Marchés Publics */}
            <section className="py-20 bg-gray-50 dark:bg-black">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 border-2 border-primary/20">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                        Appel d'offres en cours ?
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        Nous répondons aux consultations publiques et accompagnons les collectivités dans leurs projets numériques. RC Pro à jour, références vérifiables, respect des délais.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button href="/contact">
                                            Demander notre dossier de candidature
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                        <Button variant="secondary" href="tel:+33744985521">
                                            <Phone className="w-5 h-5 mr-2" />
                                            Nous appeler
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-primary via-primary to-orange-600 text-white">
                <div className="container-fluid">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Modernisez vos services publics numériques
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            Échangeons sur votre projet de transformation digitale
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" href="/contact">
                                Prendre rendez-vous
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
