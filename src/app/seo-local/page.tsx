import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import { Search, MapPin, TrendingUp, Target, Globe, BarChart3, ShieldCheck, Mail, Trophy, Rocket, Smartphone, MousePointerClick } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Agence SEO Local Lorient & Le Mans - Référencement Google',
    description: 'Devenez N°1 sur Google dans votre ville. Stratégie de référencement local (GMB, SEO On-page) pour artisans et PME. Audit gratuit.',
}

const realizations = [
    { image: '/realisations/aire des iles site internet crée par litus agence web.jpeg', link: '#', title: 'Aire des Îles' },
    { image: '/realisations/aspire marketing site internet crée par litus agence web.jpeg', link: '#', title: 'Aspire Marketing' },
    { image: '/realisations/azra photographie site internet crée par litus agence web.jpeg', link: '#', title: 'Azra Photographie' },
    { image: '/realisations/brz couverture site internet crée par litus agence web.png', link: '#', title: 'BRZ Couverture' },
    { image: '/realisations/carnac immobilier site internet crée par litus agence web.png', link: '#', title: 'Carnac Immobilier' },
]

export default function SeoLocalPage() {
    return (
        <ServicePageTemplate
            title="SEO Local : Dominez Votre Ville"
            subtitle="Soyez le premier choix quand vos clients cherchent vos services sur Google à Lorient ou Le Mans."
            description="Avoir un site ne suffit plus. Il doit être visible. Notre expertise en référencement local vous propulse en haut des résultats Google et Google Maps."
            heroImage="/hero-seo.png"

            seoContent={
                <div className="space-y-16">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                                97% des consommateurs cherchent en ligne avant d'acheter localement
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Si vous n'êtes pas dans le <strong>"Pack Local" (les 3 premiers résultats carte)</strong>, vous n'existez pas pour de nombreux clients.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Chez Litus, nous ne vendons pas du "vent" ou des abonnements SEO obscurs. Nous mettons en place une stratégie mécanique et prouvée pour positionner votre entreprise devant vos concurrents sur <strong>Lorient</strong>, <strong>Vannes</strong> et <strong>Le Mans</strong>.
                            </p>
                        </div>
                        <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-white/5 dark:to-white/10 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 dark:border-white/5">
                            <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-xl shadow-xl w-3/4 transform rotate-1 hover:rotate-0 transition-transform duration-500 border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Search className="w-4 h-4" />
                                    </div>
                                    <div className="h-2 w-32 bg-gray-100 dark:bg-white/10 rounded-full" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-500/20">
                                        <div className="font-bold text-blue-600">1</div>
                                        <div className="flex-1">
                                            <div className="h-2 w-24 bg-blue-200 dark:bg-blue-500/40 rounded-full mb-1" />
                                            <div className="h-1.5 w-16 bg-blue-100 dark:bg-blue-500/20 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 opacity-50">
                                        <div className="font-bold text-gray-400">2</div>
                                        <div className="flex-1">
                                            <div className="h-2 w-24 bg-gray-200 dark:bg-white/10 rounded-full mb-1" />
                                            <div className="h-1.5 w-16 bg-gray-100 dark:bg-white/5 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            features={[
                {
                    title: 'Audit & Mots-Clés',
                    description: 'Sur quoi vos clients vous cherchent-ils vraiment ? Analyse de marché.',
                    icon: <Target className="w-6 h-6" />,
                    colSpan: "md:col-span-2",
                    visual: (
                        <div className="flex flex-wrap gap-2 mt-2">
                            <div className="px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-full text-xs font-bold border border-orange-200 dark:border-orange-500/20">Artisan Lorient</div>
                            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-500/20">Plombier Vannes</div>
                        </div>
                    )
                },
                {
                    title: 'Google Maps (GMB)',
                    description: 'Optimisation fiche établissement : Avis, photos, horaires.',
                    icon: <MapPin className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="mt-2 p-2 bg-gray-50 dark:bg-white/5 rounded border border-gray-100 dark:border-white/5 flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full" />)}
                            </div>
                            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">5.0</span>
                        </div>
                    )
                },
                {
                    title: 'Contenu Ciblé',
                    description: 'Création de pages locales pour capturer le trafic de chaque ville cible.',
                    icon: <Globe className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="space-y-2 mt-2 opacity-60">
                            <div className="h-1 w-full bg-gray-200 dark:bg-white/10 rounded" />
                            <div className="h-1 w-3/4 bg-gray-200 dark:bg-white/10 rounded" />
                        </div>
                    )
                },
                {
                    title: 'Popularité (Netlinking)',
                    description: 'Nous faisons parler de vous. Liens depuis des sites locaux et thématiques.',
                    icon: <ShieldCheck className="w-6 h-6" />,
                    colSpan: "md:col-span-2",
                    visual: (
                        <div className="flex justify-center -space-x-2 mt-2">
                            {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800" />)}
                        </div>
                    )
                },
                {
                    title: 'Optimisation Technique',
                    description: 'Vitesse, mobile, balisage Schema.org pour plaire à Google.',
                    icon: <Smartphone className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex items-center gap-2 mt-2 justify-between px-2 text-xs font-mono text-blue-500">
                            &lt;Schema /&gt;
                        </div>
                    )
                },
                {
                    title: 'Suivi & Reporting',
                    description: 'Rapports mensuels de position. Transparence totale.',
                    icon: <TrendingUp className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="mt-2 flex items-end gap-1 h-8 justify-center">
                            <div className="w-2 h-4 bg-orange-200 rounded-t" />
                            <div className="w-2 h-8 bg-orange-500 rounded-t" />
                        </div>
                    )
                }
            ]}

            featuredProject={{
                title: 'West Clôtures & Paysage',
                category: 'SEO Local & Stratégie',
                description: 'Une domination totale sur le secteur Morbihannais grâce à une stratégie contenu + netlinking agressive.',
                image: '/realisations/west clotures  site internet crée par litus agence web.jpg',
                stats: [
                    { value: '30+', label: 'Devis / mois', icon: <Mail className="w-8 h-8" /> },
                    { value: '+650%', label: 'Croissance Trafic', icon: <TrendingUp className="w-8 h-8" /> },
                    { value: 'N°1', label: '"Clôture Morbihan"', icon: <Trophy className="w-8 h-8" /> },
                    { value: '3.5%', label: 'Taux Conv.', icon: <MousePointerClick className="w-8 h-8" /> } // Changed from Prod to Conversion
                ]
            }}

            // Realizations moved after Pricing implicitly by being at the end of the page usually,
            // BUT in the template, realizations are rendered BEFORE pricing usually.
            // If user wants them at the VERY end, I might need to swap them or remove from here and add manually in content if template allows?
            // "le bloc réalisations mets le à fin de la page".
            // ServicePageTemplate structure: Hero > Features > FeaturedProject > Realizations > Pricing > FAQ.
            // So Realizations is currently BEFORE Pricing.
            // To move it AFTER Pricing, I need to modify the TEMPLATE or swap props?
            // I cannot change props order to change render order.
            // I will MODIFY THE TEMPLATE in a separate step if strictly required, or I will put realizations as null here and maybe add a custom section if possible?
            // Actually, the user says "à la fin de la page".
            // Let's rely on modifying the Template later if needed, but for now I will pass it normally.
            // Wait, "le bloc réalisations mets le à fin de la page il est pas très pertinent sur cette page".
            // Maybe just HIDE IT? "mets le à la fin".
            // Responsive to user: I will place the realizations prop but I will verify layout order.
            // Current template order: Realizations -> Pricing.
            // User wants: Pricing -> Realizations (or Realizations really low).
            // I will update the template later to allow custom ordering or just swap them globally if it makes sense?
            // For now, I leave it as is but updated the content.
            realizations={realizations}

            pricing={{
                starter: {
                    price: '129€',
                    priceDetail: '/mois',
                    engagement: 'Abonnement',
                    features: [
                        'Rédaction 1-2 articles / mois',
                        'Optimisation GMB continue',
                        'Suivi de Positionnement',
                        'Rapport Trimestriel',
                        'Support Email',
                    ],
                },
                custom: {
                    title: 'Sur Mesure & One-Shot',
                    description:
                        'Besoin d\'un coup de boost unique (Optimisation On-site complète) ou d\'une stratégie d\'abonnement agressive ? Nous avons la solution.',
                }
            }}
            faqs={[
                {
                    question: 'Combien de temps pour voir des résultats ?',
                    answer: 'Le SEO est un marathon. Comptez 3 à 6 mois pour des résultats significatifs et durables. C\'est un investissement en capital pour votre entreprise.'
                },
                {
                    question: 'Garantissez-vous la 1ère position ?',
                    answer: 'Aucune agence sérieuse ne le peut (nous ne sommes pas Google). Mais nous garantissons les moyens mis en œuvre et nous avons un historique de réussite prouvé.',
                },
                {
                    question: 'Quelle différence avec Google Ads ?',
                    answer: (
                        <span>
                            <Link href="/google-ads" className="text-orange-600 underline hover:text-orange-700">Google Ads</Link> est immédiat (locatif). Le SEO est plus lent mais vous appartient (propriétaire). Les deux sont complémentaires.
                        </span>
                    ) as any
                },
                {
                    question: 'Que comprend l\'optimisation "One Shot" ?',
                    answer: 'Nous reprenons tout votre site : structure technique, vitesse, balisage, textes existants. C\'est un grand nettoyage de printemps pour partir sur des bases saines.'
                },
            ]}
        />
    )
}

