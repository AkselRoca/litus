import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import { Target, TrendingUp, DollarSign, MousePointerClick, BarChart3, Users, Zap, Mail, Trophy, Rocket, Search, Percent } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Agence Google Ads Lorient & Le Mans (SEA) - Certifiée Google Partner',
    description: 'Campagnes Google Ads rentables. Générez des leads qualifiés immédiatement. Gestion de budget optimisée et rapports transparents.',
}

import { getFeaturedProjects } from '@/actions/portfolio'

export default async function GoogleAdsPage() {
    const { data: dbProjects } = await getFeaturedProjects()

    // Map DB projects to template format or use empty array
    const realizations = dbProjects?.map((p: any) => ({
        image: p.imageUrl,
        link: p.link || '#',
        title: p.title
    })) || []

    return (
        <ServicePageTemplate
            title="Google Ads : Trafic Immédiat"
            subtitle="Apparaissez instantanément en haut de Google. Ne payez que quand un client clique."
            description="Marre d'attendre que le SEO décolle ? Google Ads est l'accélérateur de business ultime. Nous configurons des campagnes ultra-ciblées pour maximiser votre ROI."
            heroImage="/hero-ads.png"

            // RICH CONTENT
            seoContent={
                <div className="space-y-16">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                                Arrêtez de jeter votre budget par la fenêtre
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Google Ads peut être une machine à cash ou un gouffre financier. La différence ? La configuration.
                                Trop d'entreprises laissent Google gérer leurs enchères en "automatique" et perdent des milliers d'euros sur des mots-clés inutiles.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Chez Litus, nous traquons chaque centime. Si un mot-clé ne rapporte pas de client, nous le coupons. Radicalement.
                            </p>
                        </div>
                        <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-orange-50 to-red-50 dark:from-white/5 dark:to-white/10 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 dark:border-white/5">
                            <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-xl shadow-xl w-3/4 border border-gray-100 dark:border-white/5 space-y-4">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-white/5">
                                    <div className="text-sm font-bold text-gray-500">Mots-clés</div>
                                    <div className="text-sm font-bold text-gray-500">Conv.</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="font-mono text-sm">"Devis paysagiste"</span>
                                    </div>
                                    <div className="px-2 py-1 bg-green-100 text-green-700 rounded font-bold text-xs">+12</div>
                                </div>
                                <div className="flex justify-between items-center opacity-50 decoration-slate-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                        <span className="font-mono text-sm line-through decoration-red-500">"Tuto jardinage"</span>
                                    </div>
                                    <div className="px-2 py-1 bg-gray-100 text-gray-500 rounded font-bold text-xs">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            features={[
                {
                    title: 'Ciblage Laser',
                    description: 'Géographie, heure, appareil... On ne vise que vos clients idéaux.',
                    icon: <Target className="w-6 h-6" />,
                    colSpan: "md:col-span-2",
                    visual: (
                        <div className="flex items-center justify-center mt-2 relative h-10">
                            <Target className="text-orange-500 w-8 h-8 relative z-10" />
                        </div>
                    )
                },
                {
                    title: 'Protection Budget',
                    description: 'Exclusion des mots-clés "gratuits" ou "pas cher" qui ne convertissent pas.',
                    icon: <DollarSign className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="mt-2 text-center text-xs text-red-500 font-mono bg-red-50 dark:bg-red-900/10 rounded p-1">
                            - "Gratuit" Exclu
                        </div>
                    )
                },
                {
                    title: 'Copywriting',
                    description: 'Annonces persuasives qui incitent au clic.',
                    icon: <MousePointerClick className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex flex-col gap-1 mt-2 bg-white dark:bg-white/5 p-2 rounded border border-gray-100 dark:border-white/5">
                            <div className="text-blue-600 text-[10px] font-bold underline">Meilleur Paysagiste</div>
                        </div>
                    )
                },
                {
                    title: 'Retargeting',
                    description: 'On relance les visiteurs qui n\'ont pas acheté (bannière visuelle).',
                    icon: <Users className="w-6 h-6" />,
                    colSpan: "md:col-span-2",
                    visual: (
                        <div className="flex justify-center -space-x-2 mt-2">
                            {[1, 2].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800" />)}
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white border-2 border-white"><Zap className="w-4 h-4" /></div>
                        </div>
                    )
                },
                {
                    title: 'Tracking Leads',
                    description: 'On ne mesure pas les clics, mais les appels et devis.',
                    icon: <BarChart3 className="w-6 h-6" />,
                    colSpan: "md:col-span-2 lg:col-span-2",
                    visual: (
                        <div className="flex justify-center mt-2">
                            <div className="flex items-end gap-1">
                                <div className="w-2 h-3 bg-gray-300 rounded-t" />
                                <div className="w-2 h-6 bg-orange-500 rounded-t" />
                            </div>
                        </div>
                    )
                },
                {
                    title: 'Landing Pages',
                    description: 'Optimisation de la page d\'arrivée pour convertir.',
                    icon: <Zap className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex items-center gap-2 mt-2 text-green-500 text-xs font-bold justify-center">
                            <span>Page Vente</span>
                        </div>
                    )
                }
            ]}

            featuredProject={{
                title: 'West Clôtures & Paysage',
                category: 'Google Ads & Lead Gen',
                description: 'Campagne structurée sur le réseau de recherche. Maximisation du budget sur les zones à fort potentiel.',
                image: '/realisations/west clotures  site internet crée par litus agence web.jpg',
                stats: [
                    { value: '30+', label: 'Devis / mois', icon: <Mail className="w-8 h-8" /> }, // Kept as requested
                    { value: 'x4', label: 'ROI (Retour/Inv.)', icon: <TrendingUp className="w-8 h-8" /> },
                    { value: '12%', label: 'CTR (Taux Clic)', icon: <MousePointerClick className="w-8 h-8" /> },
                    { value: '15€', label: 'Coût / Lead', icon: <DollarSign className="w-8 h-8" /> }
                ]
            }}

            realizations={realizations}

            pricing={{
                starter: {
                    price: '129€',
                    priceDetail: '/mois',
                    engagement: 'Gestion Mensuelle',
                    features: [
                        'Gestion Campagne Search',
                        'Ajustement Enchères',
                        'Exclusion Mots-clés',
                        'Rapport Trimestriel',
                        'Support Email',
                    ],
                },
                custom: {
                    title: 'Offres Avancées',
                    description:
                        'Besoin d\'un Setup One-Shot (création campagne sans gestion, devis unique) ou d\'un abonnement Pro avec Shopping/Youtube Ads ? Contactez-nous.',
                },
            }}
            faqs={[
                {
                    question: 'Quel est le budget minimum pour Google Ads ?',
                    answer: 'Il n\'y a pas de minimum technique, mais nous conseillons au moins 10-15€ par jour (soit ~300-500€/mois) pour obtenir assez de données et optimiser la campagne. En dessous, les résultats sont trop lents.'
                },
                {
                    question: 'Quelle est la différence entre le Search et le Display ?',
                    answer: 'Le Search (Recherche), ce sont les annonces textuelles sur Google quand on tape un mot-clé (ex: "Plombier Urgence"). C\'est là qu\'on capte l\'intention d\'achat. Le Display, ce sont les bannières visuelles sur d\'autres sites pour travailler la notoriété.'
                },
                {
                    question: 'Je paie qui ? Google ou vous ?',
                    answer: 'Vous payez directement Google pour les clics publicitaires (via votre CB dans le compte). Vous nous payez séparément pour la gestion et l\'optimisation (nos honoraires). C\'est totalement transparent.'
                },
                {
                    question: 'C\'est quoi le "Quality Score" ?',
                    answer: 'C\'est la note que Google donne à votre annonce (de 1 à 10). Plus elle est haute, moins vous payez cher le clic. C\'est notre métier d\'optimiser cette note en travaillant la pertinence entre le mot-clé, l\'annonce et la page de votre site.'
                },
                {
                    question: 'Puis-je gérer ma campagne tout seul ?',
                    answer: 'Oui, mais attention. L\'interface "facile" de Google (Mode Express) a tendance à vous faire dépenser beaucoup trop pour peu de résultats. Le mode Expert est complexe. Faire appel à une agence, c\'est souvent économiser de l\'argent au final.'
                },
                {
                    question: 'Faites-vous juste la création (Setup) sans gestion ?',
                    answer: 'Oui, c\'est possible via notre offre "One Shot". Nous créons la campagne parfaite, nous vous la livrons, et vous la gérez ensuite. C\'est idéal pour les petits budgets qui ont du temps.'
                },
            ]}
        />
    )
}
