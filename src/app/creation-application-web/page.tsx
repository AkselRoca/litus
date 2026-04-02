import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import { Database, Code2, Server, Lock, Smartphone, LayoutGrid, Mail, Trophy, Rocket, TrendingUp, Box } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Développement Application Web & Mobile | Sur-Mesure',
    description: 'Créez votre SaaS, CRM ou application métier avec Litus. Développement React/Next.js robuste et évolutif.',
}

export default function ApplicationsPage() {
    return (
        <ServicePageTemplate
            title="Applications Web Sur-Mesure"
            subtitle="Digitalisez vos processus. Gagnez en productivité."
            description="CRM, ERP, Espace Client, SaaS... Nous développons des outils métiers intelligents qui vous font gagner du temps et de l'argent."
            heroImage="/hero-apps.png"

            // RICH TECH CONTENT
            seoContent={
                <div className="space-y-16">
                    {/* Intro Block */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                                Votre métier est unique, votre logiciel doit l'être aussi
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Les logiciels du marché sont souvent trop complexes, trop chers ou pas assez flexibles.
                                Vous finissez par tordre votre façon de travailler pour rentrer dans des "cases".
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Nous développons des solutions <strong>sur-mesure</strong> qui s'adaptent à VOS processus.
                                Automatisez les tâches chronophages, centralisez vos données et pilotez votre activité avec une vision claire.
                            </p>
                        </div>
                        {/* Visual: Dashboard */}
                        <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-white/5 dark:to-white/10 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 dark:border-white/5">
                            <div className="bg-white dark:bg-[#0A0A0A] p-4 rounded-xl shadow-xl w-3/4 border border-gray-100 dark:border-white/5">
                                <div className="flex gap-2 mb-4 border-b border-gray-100 dark:border-white/5 pb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex gap-4">
                                        <div className="w-1/3 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-lg" />
                                        <div className="w-1/3 h-20 bg-purple-50 dark:bg-purple-900/20 rounded-lg" />
                                        <div className="w-1/3 h-20 bg-pink-50 dark:bg-pink-900/20 rounded-lg" />
                                    </div>
                                    <div className="w-full h-32 bg-gray-50 dark:bg-white/5 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            features={[
                {
                    title: 'Architecture Robuste',
                    description: 'Base de données SQL, API Rest/GraphQL. Construit pour durer et scaler.',
                    icon: <Database className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex items-center gap-2 mt-2 justify-center font-mono text-xs text-indigo-500">
                            <Database className="w-4 h-4" /> SQL
                        </div>
                    )
                },
                {
                    title: 'Interface Intuitive',
                    description: 'UX design soigné. Vos employés n\'auront pas besoin de formation.',
                    icon: <LayoutGrid className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex justify-center mt-2 opacity-60">
                            <div className="w-6 h-6 bg-gray-200 rounded grid grid-cols-2 gap-px overflow-hidden">
                                <div className="bg-gray-400" />
                                <div className="bg-gray-300" />
                                <div className="bg-gray-300" />
                                <div className="bg-gray-400" />
                            </div>
                        </div>
                    )
                },
                {
                    title: 'Sécurité Données',
                    description: 'Authentification forte, chiffrement, sauvegardes automatiques.',
                    icon: <Lock className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex justify-center mt-2 text-green-500">
                            <Lock className="w-6 h-6" />
                        </div>
                    )
                },
                {
                    title: 'API & Intégrations',
                    description: 'Connexion avec vos outils (Sellsy, HubSpot, Zapier, Stripe...).',
                    icon: <Server className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex justify-center mt-2 gap-1 items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <div className="h-px w-4 bg-gray-300" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                    )
                },
                {
                    title: 'Méthode Agile',
                    description: 'Développement par itérations. Vous voyez les progrès chaque semaine.',
                    icon: <Code2 className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex justify-center mt-2 text-xs font-bold text-orange-500">
                            SPRINT 1
                        </div>
                    )
                },
                {
                    title: 'Évolutivité',
                    description: 'Votre outil grandit avec votre entreprise. Pas de limite technique.',
                    icon: <Box className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex justify-center mt-2">
                            <TrendingUp className="w-6 h-6 text-purple-500" />
                        </div>
                    )
                }
            ]}

            featuredProject={{
                title: 'West Clôtures - Le CRM',
                category: 'Application Métier',
                description: 'Développement d\'un outil sur-mesure pour gérer les devis complexes de clôtures. Résultat : temps de chiffrage divisé par 4.',
                image: '/realisations/west clotures  site internet crée par litus agence web.jpg',
                stats: [
                    { value: '+27%', label: 'Productivité', icon: <Rocket className="w-8 h-8" /> },
                    { value: '0', label: 'Erreur Devis', icon: <TrendingUp className="w-8 h-8" /> },
                    { value: '100%', label: 'Mobile', icon: <Smartphone className="w-8 h-8" /> },
                    { value: '450h', label: 'Gain / an', icon: <LayoutGrid className="w-8 h-8" /> }
                ]
            }}

            realizations={[]} // Removed as requested

            pricing={{
                custom: {
                    title: 'Développement Sur Mesure',
                    description:
                        'SaaS, CRM, Intranet ou Application Mobile. Nous développons des outils puissants adaptés exactement à vos processus métier.',
                },
            }}
            faqs={[
                {
                    question: 'Combien coûte une application sur-mesure ?',
                    answer: 'C\'est très variable. Un outil métier simple démarre autour de 5 000€. Une plateforme SaaS complexe peut aller de 15 000€ à 50 000€+. Tout dépend des fonctionnalités.'
                },
                {
                    question: 'Êtes-vous propriétaire du code ?',
                    answer: 'Oui, une fois le projet livré et payé, vous êtes 100% propriétaire du code source. Pas de "vendor lock-in" chez Litus.',
                },
                {
                    question: 'Quelles technologies utilisez-vous ?',
                    answer: 'Stack moderne : React / Next.js pour le frontend, Node.js ou Python pour le backend, PostgreSQL pour les données. C\'est ce qu\'utilisent les startups de la Silicon Valley.'
                },
                {
                    question: 'Combien de temps ça prend ?',
                    answer: 'Comptez 4 à 8 semaines pour une première version (MVP) fonctionnelle. Pour un projet complet, cela peut prendre 3 à 6 mois.'
                },
                {
                    question: 'Assurez-vous la maintenance ?',
                    answer: 'Oui, nous proposons des contrats de maintenance (TMA) pour gérer les mises à jour, la sécurité et les petites évolutions.'
                },
            ]}
        />
    )
}

