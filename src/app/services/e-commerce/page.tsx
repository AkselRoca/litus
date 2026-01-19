import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import { ShoppingBag, CreditCard, BarChart2, Zap, Truck, ShieldCheck, Mail, Trophy, Rocket, TrendingUp, Smartphone, Search, Globe } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Création Site E-commerce Lorient & Le Mans - Shopify & WooCommerce',
    description: 'Vendez vos produits en ligne avec une boutique performante et sécurisée. Agence experte Shopify et WooCommerce. Devis gratuit.',
}

const realizations = [
    { image: '/realisations/aire des iles site internet crée par litus agence web.jpeg', link: '#', title: 'Aire des Îles' },
    { image: '/realisations/aspire marketing site internet crée par litus agence web.jpeg', link: '#', title: 'Aspire Marketing' },
    { image: '/realisations/azra photographie site internet crée par litus agence web.jpeg', link: '#', title: 'Azra Photographie' },
    { image: '/realisations/brz couverture site internet crée par litus agence web.png', link: '#', title: 'BRZ Couverture' },
    { image: '/realisations/carnac immobilier site internet crée par litus agence web.png', link: '#', title: 'Carnac Immobilier' },
]

export default function EcommercePage() {
    return (
        <ServicePageTemplate
            title="E-commerce : Vendez 24h/24"
            subtitle="Des boutiques en ligne ultra-rapides conçues pour convertir. Expertise Shopify & WooCommerce."
            description="L'e-commerce ne pardonne pas l'amateurisme. Nous créons des parcours d'achat fluides, sécurisés et optimisés pour maximiser votre panier moyen."
            heroImage="/hero-ecommerce.png"
            heroImagePosition="object-top"

            seoContent={
                <div className="space-y-16">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                                Votre boutique ne dort jamais, vos ventes non plus
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Un site e-commerce n'est pas juste une vitrine, c'est une machine complexe qui doit inspirer confiance instantanément.
                                Design, rapidité, paiement sécurisé : chaque détail compte pour transformer un visiteur en client.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Que vous vendiez 10 ou 10 000 produits, nous bâtissons l'infrastructure technique qui vous permettra de scaler sans douleur. Expert <strong>Shopify</strong> et <strong>WooCommerce</strong>.
                            </p>
                        </div>
                        <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-tr from-green-50 to-emerald-50 dark:from-white/5 dark:to-white/10 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 dark:border-white/5">
                            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                            <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-xl shadow-2xl w-2/3 border border-gray-100 dark:border-white/5 relative z-10 text-center">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                                    <ShoppingBag className="w-8 h-8" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Commande Confirmée</div>
                                <div className="text-gray-500 text-sm mb-4">Merci pour votre achat !</div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-full animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            features={[
                {
                    title: 'Design Conversion',
                    description: 'UX/UI pensée pour la vente. Mise en avant produits, cross-selling et tunnel d\'achat fluide.',
                    icon: <ShoppingBag className="w-6 h-6" />,
                    colSpan: "md:col-span-2 lg:col-span-2",
                    visual: (
                        <div className="flex gap-2 mt-2 justify-center">
                            <div className="w-16 h-20 bg-gray-100 dark:bg-white/5 rounded border border-gray-200 dark:border-white/10" />
                            <div className="w-16 h-20 bg-gray-100 dark:bg-white/5 rounded border border-gray-200 dark:border-white/10 transform scale-110 shadow-lg border-orange-200" />
                            <div className="w-16 h-20 bg-gray-100 dark:bg-white/5 rounded border border-gray-200 dark:border-white/10" />
                        </div>
                    )
                },
                {
                    title: 'Paiements Sécurisés',
                    description: 'Intégration Stripe, PayPal, Apple Pay. Rassurez vos clients au moment de payer.',
                    icon: <CreditCard className="w-6 h-6" />,
                    colSpan: "md:col-span-1 lg:col-span-1",
                    visual: (
                        <div className="mt-2 flex gap-2 justify-center opacity-60">
                            <div className="w-8 h-5 bg-blue-600 rounded" />
                            <div className="w-8 h-5 bg-indigo-600 rounded" />
                            <div className="w-8 h-5 bg-black rounded" />
                        </div>
                    )
                },
                {
                    title: 'Vitesse de Chargement',
                    description: 'Chaque seconde compte. Un site rapide augmente drastiquement les conversions.',
                    icon: <Zap className="w-6 h-6" />,
                    colSpan: "md:col-span-2 lg:col-span-2",
                    visual: (
                        <div className="flex items-center gap-2 mt-2 p-2 bg-gray-50 dark:bg-white/5 rounded border border-gray-100 dark:border-white/5">
                            <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-green-500 h-full w-full" />
                            </div>
                            <span className="text-xs font-bold text-green-500">0.5s</span>
                        </div>
                    )
                },
                {
                    title: 'Gestion Stocks',
                    description: 'Back-office puissant pour gérer vos commandes, stocks et expéditions facilement.',
                    icon: <BarChart2 className="w-6 h-6" />,
                    colSpan: "md:col-span-1 lg:col-span-1",
                    visual: (
                        <div className="mt-2 space-y-1 opacity-60">
                            <div className="flex justify-between text-xs"><span className="w-8 h-1 bg-gray-300 rounded" /><span className="w-2 h-1 bg-green-300 rounded" /></div>
                            <div className="flex justify-between text-xs"><span className="w-6 h-1 bg-gray-300 rounded" /><span className="w-2 h-1 bg-green-300 rounded" /></div>
                        </div>
                    )
                },
                {
                    title: 'Livraison Flexible',
                    description: 'Configuration des frais de port complexes (Poids, Zone, Colissimo, Mondial Relay).',
                    icon: <Truck className="w-6 h-6" />,
                    colSpan: "md:col-span-1 lg:col-span-1",
                    visual: (
                        <div className="flex justify-center mt-2">
                            <Truck className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                        </div>
                    )
                },
                {
                    title: 'Sécurité Maximale',
                    description: 'Protection des données clients et conformité RGPD stricte.',
                    icon: <ShieldCheck className="w-6 h-6" />,
                    colSpan: "md:col-span-2 lg:col-span-2",
                    visual: (
                        <div className="flex items-center gap-2 mt-2 text-green-500 text-xs font-bold justify-center">
                            <ShieldCheck className="w-4 h-4" />
                            <span>SSL + RGPD</span>
                        </div>
                    )
                }
            ]}

            featuredProject={{
                title: 'Japan Hunter',
                category: 'E-commerce Sur-Mesure',
                description: 'Import de produits japonais rares. Une boutique Shopify optimisée qui gère des centaines de références.',
                link: 'https://japanhunter.fr/',
                image: '/realisations/japan hunter boutique en ligne crée par litus agence web.jpg',
                stats: [
                    { value: 'Shopify', label: 'Sur-Mesure', icon: <ShoppingBag className="w-8 h-8" /> },
                    { value: 'Flux', label: 'Automatisés', icon: <Rocket className="w-8 h-8" /> },
                    { value: 'UX/UI', label: 'Premium', icon: <TrendingUp className="w-8 h-8" /> },
                    { value: '100%', label: 'Autonomie', icon: <Trophy className="w-8 h-8" /> }
                ]
            }}

            realizations={realizations}

            pricing={{
                custom: {
                    title: 'Projet E-commerce',
                    description:
                        'Que ce soit pour une refonte ou une création, nous concevons votre boutique sur-mesure. Design, paiement, logistique : nous gérons tout de A à Z.',
                },
            }}
            faqs={[
                {
                    question: 'Shopify ou WooCommerce ?',
                    answer: 'Cela dépend de votre projet. Shopify est idéal pour la simplicité et la maintenance gérée. WooCommerce offre plus de flexibilité et vous restez propriétaire de tout. Nous vous conseillerons la meilleure option.'
                },
                {
                    question: 'Puis-je gérer mes produits seul ?',
                    answer: 'Oui, à 100%. Nous vous formons à l\'utilisation de votre boutique. Ajoutez des produits, gérez les stocks et les promos en toute autonomie.',
                },
                {
                    question: 'Le paiement est-il sécurisé ?',
                    answer: 'Absolument. Nous intégrons les standards bancaires (Stripe, PayPal) avec cryptage SSL. Vos clients peuvent acheter en toute confiance.'
                },
                {
                    question: 'Comment attirer des clients ?',
                    answer: (
                        <span>
                            Une belle boutique vide ne sert à rien. Nous pouvons coupler la création avec une stratégie <Link href="/services/seo-local" className="text-orange-600 underline hover:text-orange-700">SEO</Link> ou <Link href="/services/google-ads" className="text-orange-600 underline hover:text-orange-700">Google Ads</Link> pour générer des ventes dès le lancement.
                        </span>
                    ) as any
                },
                {
                    question: 'Prenez-vous une commission sur les ventes ?',
                    answer: 'Non, jamais. Contrairement à certaines plateformes, chez Litus, votre chiffre d\'affaires est à vous. Nous facturons uniquement la prestation de création.'
                },
            ]}
        />
    )
}
