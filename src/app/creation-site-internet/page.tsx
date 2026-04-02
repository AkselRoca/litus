import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import { Palette, Search, Zap, Smartphone, ShieldCheck, PenTool, LayoutDashboard, Database, Repeat, MapPin, MousePointerClick, TrendingUp, Trophy, Mail, Rocket } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Création de Sites Internet à Lorient, Vannes & Le Mans',
    description:
        'Agence web locale. Création de sites vitrine performants et design pour artisans, PME et professions libérales. Devis gratuit sous 24h.',
}

// List of all realization images
const realizations = [
    { image: '/realisations/aire des iles site internet crée par litus agence web.jpeg', link: '#', title: 'Aire des Îles' },
    { image: '/realisations/aspire marketing site internet crée par litus agence web.jpeg', link: '#', title: 'Aspire Marketing' },
    { image: '/realisations/azra photographie site internet crée par litus agence web.jpeg', link: '#', title: 'Azra Photographie' },
    { image: '/realisations/brz couverture site internet crée par litus agence web.png', link: '#', title: 'BRZ Couverture' },
    { image: '/realisations/carnac immobilier site internet crée par litus agence web.png', link: '#', title: 'Carnac Immobilier' },
    { image: '/realisations/concept coiffure site internet crée par litus agence web.png', link: '#', title: 'Concept Coiffure' },
    { image: '/realisations/del rio pizzeria site internet crée par litus agence web.png', link: '#', title: 'Del Rio Pizzeria' },
    { image: '/realisations/femme des territoires site internet crée par litus agence web.JPG', link: '#', title: 'Femmes des Territoires' },
    { image: '/realisations/geoproxio site internet crée par litus agence web.jpeg', link: '#', title: 'Geoproxio' },
    { image: '/realisations/gite des oiseaux site internet crée par litus agence web.png', link: '#', title: 'Gîte des Oiseaux' },
    { image: '/realisations/menuiserie jerome rio site internet crée par litus agence web.png', link: '#', title: 'Menuiserie Rio' },
    { image: '/realisations/murasaki team site internet crée par litus agence web.png', link: '#', title: 'Murasaki Team' },
]

export default function SitesVitrinePage() {
    return (
        <ServicePageTemplate
            title="Sites Vitrine : Valorisez Votre Image"
            subtitle="Un design premium qui convertit vos visiteurs en clients. Conçu à Lorient & Le Mans."
            description="Votre site web est votre commercial 24h/24. Ne négligez pas la première impression. Nous créons des sites ultra-rapides, esthétiques et optimisés pour Google."
            heroImage="/hero-team.png"

            // RICH SEO CONTENT
            seoContent={
                <div className="space-y-16">
                    {/* Intro Block */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                                Plus qu'un site web, un véritable atout commercial
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Basée entre <strong>Lorient (Morbihan)</strong> et <strong>Le Mans (Sarthe)</strong>, l'agence Litus ne se contente pas de livrer du code.
                                Nous livrons une expérience.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Dans un monde où tout se passe sur écran, l'image que vous renvoyez en ligne détermine la confiance que vos prospects vous accordent.
                                Un site lent ou daté ? C'est un client perdu. Un site Litus ? C'est un client conquis.
                            </p>
                        </div>
                        {/* Visual: Abstract Browser */}
                        <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 dark:border-white/5">
                            <div className="absolute inset-x-8 top-8 bottom-0 bg-white dark:bg-[#0A0A0A] rounded-t-xl shadow-2xl p-6 transform translate-y-4 hover:translate-y-0 transition-transform duration-700">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-1/3 h-4 bg-gray-100 dark:bg-white/10 rounded-full" />
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-32 bg-orange-50 dark:bg-orange-900/10 rounded-lg animate-pulse" />
                                    <div className="h-32 bg-gray-50 dark:bg-white/5 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            // BENTO GRID FEATURES
            features={[
                {
                    title: 'Design Unique & Premium',
                    description: 'Pas de templates douteux. Une identité graphique sur-mesure qui reflète votre excellence et captive vos visiteurs.',
                    icon: <Palette className="w-6 h-6" />,
                    colSpan: "md:col-span-2",
                    visual: (
                        <div className="flex gap-3 mt-2">
                            <div className="h-2 w-16 rounded-full bg-orange-500" />
                            <div className="h-2 w-12 rounded-full bg-blue-500" />
                            <div className="h-2 w-8 rounded-full bg-green-500" />
                            <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-white/10" />
                        </div>
                    )
                },
                {
                    title: 'Ancrage Local',
                    description: 'Basés à Lorient et Le Mans, nous connaissons votre marché.',
                    icon: <MapPin className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="space-y-2 mt-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                <span>Morbihan (56)</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                <span>Sarthe (72)</span>
                            </div>
                        </div>
                    )
                },
                {
                    title: 'Vitesse Éclair',
                    description: 'Score Google PageSpeed 95+. Un site qui se charge instantanément.',
                    icon: <Zap className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="space-y-3 mt-2">
                            <div>
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Litus</span>
                                    <span className="text-green-500 font-bold">98/100</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[98%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs text-gray-500 mb-1 opacity-70">
                                    <span>Standard</span>
                                    <span>45/100</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-gray-400 w-[45%]" />
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    title: 'Optimisation SEO',
                    description: 'Structure technique parfaite (Hn, Meta, Schema) pour Google.',
                    icon: <Search className="w-6 h-6" />,
                    colSpan: "md:col-span-2",
                    visual: (
                        <div className="flex items-center gap-2 mt-2 p-2 bg-gray-50 dark:bg-white/5 rounded border border-gray-100 dark:border-white/5">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-xs font-mono text-gray-500">Indexé par Google - Position 1</span>
                        </div>
                    )
                },
                {
                    title: '100% Mobile First',
                    description: 'Expérience fluide sur tous les écrans (Smartphone, Tablette, Desktop).',
                    icon: <Smartphone className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex items-center gap-4 mt-2 justify-center opacity-60">
                            <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg" />
                            <div className="w-10 h-8 border-2 border-gray-300 dark:border-gray-600 rounded-lg" />
                        </div>
                    )
                },
                {
                    title: 'Admin Facile',
                    description: 'Modifiez vos textes et photos en toute autonomie.',
                    icon: <PenTool className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="mt-2 text-xs font-mono bg-gray-100 dark:bg-white/5 p-2 rounded text-gray-500">
                            /admin
                        </div>
                    )
                },
                {
                    title: 'Sécurité SSL',
                    description: 'Protection maximale, HTTPS et sauvegardes incluses.',
                    icon: <ShieldCheck className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex items-center gap-2 mt-2 text-green-500 text-xs font-bold">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Site Sécurisé</span>
                        </div>
                    )
                }
            ]}

            featuredProject={{
                title: 'West Clôtures & Paysage',
                category: 'Stratégie Globale (Site, Ads, Logiciel)',
                description: 'Transformation totale : Branding, Site vitrine, Campagnes Google Ads rentables et Logiciel métier. Une domination sans partage sur le secteur.',
                image: '/realisations/west clotures  site internet crée par litus agence web.jpg',
                stats: [
                    { value: '30+', label: 'Devis / mois', icon: <Mail className="w-8 h-8" /> },
                    { value: '+650%', label: 'Croissance Trafic', icon: <TrendingUp className="w-8 h-8" /> },
                    { value: 'N°1', label: '"Clôture Morbihan"', icon: <Trophy className="w-8 h-8" /> },
                    { value: '+27%', label: 'Productivité', icon: <Rocket className="w-8 h-8" /> }
                ]
            }}

            realizations={realizations}

            pricing={{
                starter: {
                    price: '59€',
                    priceDetail: '/mois',
                    engagement: 'Engagement 36 mois',
                    features: [
                        'Site One-Page Professionnel',
                        'Design Premium Adapté',
                        'Hébergement & Domaine Inclus',
                        'Maintenance Technique Incluse',
                        'Modifications Illimitées (Texte/Img)',
                        'Certificat SSL Sécurisé',
                    ],
                },
                custom: {
                    title: 'Sur Mesure',
                    description:
                        'Pour les projets ambitieux nécessitant une stratégie complète, un design exclusif ou des fonctionnalités avancées (Espace client, Réservation, etc.). Créons votre avantage injuste.',
                },
            }}
            faqs={[
                {
                    question: 'Pourquoi un abonnement mensuel ?',
                    answer: 'Cette formule permet de lisser l\'investissement et inclut tout : création, hébergement, maintenance et mises à jour. C\'est une solution "Sérénité" idéale pour les PME. Si vous préférez, nous proposons aussi du paiement comptant.'
                },
                {
                    question: 'Êtes-vous une agence classique ?',
                    answer: 'Non. Contrairement aux grosses agences, nous sommes une équipe à taille humaine ultra-réactive. Nous ne sous-traitons rien en Inde ou à Madagascar. Tout est fait maison, entre Lorient et Le Mans.'
                },
                {
                    question: 'Comment référencer mon site sur Google ?',
                    answer: (
                        <span>
                            Chaque site vitrine Litus inclut une base <Link href="/seo-local" className="text-orange-600 underline hover:text-orange-700">SEO technique</Link> solide. Pour aller chercher la 1ère position, nous proposons des stratégies de <Link href="/seo-local" className="text-orange-600 underline hover:text-orange-700">Référencement Local</Link> avancées.
                        </span>
                    ) as any
                },
                {
                    question: 'Puis-je modifier mon site moi-même ?',
                    answer: 'Oui, vous avez un accès administrateur simplifié (/admin) pour changer vos textes et photos. Si vous n\'avez pas le temps, nos forfaits incluent les modifications illimitées.'
                },
                {
                    question: 'Faites-vous du E-commerce ?',
                    answer: (
                        <span>
                            Absolument. Pour la vente en ligne, nous déployons des solutions robustes (Shopify ou Woocommerce sur-mesure). Découvrez notre offre <Link href="/creation-site-ecommerce" className="text-orange-600 underline hover:text-orange-700">E-commerce</Link>.
                        </span>
                    ) as any
                },
                {
                    question: 'Et si je veux faire de la publicité ?',
                    answer: (
                        <span>
                            Le site est le moteur, la publicité est le carburant. Nous gérons vos compagnes <Link href="/google-ads" className="text-orange-600 underline hover:text-orange-700">Google Ads</Link> pour amener du trafic qualifié dès le premier jour.
                        </span>
                    ) as any
                },
            ]}
        />
    )
}

