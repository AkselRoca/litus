'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import { Check, ArrowRight, Zap } from 'lucide-react'

type BillingCycle = 'mensuel' | 'annuel' | 'one-shot'

interface PricingItem {
    name: string
    description: string
    oneShot: { price: number; setup: number } | null
    mensuel: { price: number; setup: number } | null
    annuel: { price: number; setup: number } | null
    features: string[]
    popular?: boolean
}

export function PricingContent() {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('mensuel')

    const pricingData = {
        // Packs
        packStarter: {
            name: 'Pack Starter',
            description: 'Parfait pour démarrer sur le digital',
            oneShot: { price: 2490, setup: 0 },
            mensuel: null,
            annuel: null,
            features: [
                'Site vitrine premium',
                'Google Business optimisé',
                'Formation SEO de base',
                '3 mois maintenance incluse',
                'Support prioritaire',
            ],
            popular: false,
        },
        packGrowth: {
            name: 'Pack Growth',
            description: 'Pour scaler votre business rapidement',
            oneShot: { price: 3990, setup: 0 },
            mensuel: { price: 590, setup: 1000 },
            annuel: { price: 531, setup: 0 },
            features: [
                'Site vitrine OU e-commerce',
                'SEO Local inclus',
                'Google Ads setup',
                '6 mois maintenance incluse',
                'Reporting mensuel',
                'Support prioritaire',
            ],
            popular: true,
        },
        packPremium: {
            name: 'Pack Premium',
            description: 'Solution complète tout-en-un',
            oneShot: { price: 6990, setup: 0 },
            mensuel: { price: 890, setup: 2000 },
            annuel: { price: 801, setup: 0 },
            features: [
                'Site e-commerce complet',
                'SEO Local premium',
                'Google Ads + Meta Ads',
                '12 mois maintenance incluse',
                'Stratégie marketing trimestrielle',
                'Support VIP 24h/24',
            ],
            popular: false,
        },
        // Services
        siteVitrine: {
            name: 'Site Vitrine',
            description: 'Site professionnel responsive',
            oneShot: { price: 1990, setup: 0 },
            mensuel: null,
            annuel: null,
            features: ['Design sur-mesure', '5-7 pages', 'SEO de base', 'Formulaire contact'],
        },
        siteEcommerce: {
            name: 'E-commerce',
            description: 'Boutique en ligne complète',
            oneShot: { price: 3990, setup: 0 },
            mensuel: { price: 199, setup: 1500 },
            annuel: { price: 179, setup: 1500 },
            features: ['Plateforme complète', 'Paiement sécurisé', 'Produits illimités', 'Formation'],
        },
        seoLocal: {
            name: 'SEO Local',
            description: 'Référencement local',
            oneShot: null,
            mensuel: { price: 490, setup: 0 },
            annuel: { price: 441, setup: 0 },
            features: ['Audit SEO', 'Google Business', 'Mots-clés locaux', 'Rapports mensuels'],
        },
        googleAds: {
            name: 'Google Ads',
            description: 'Publicité locale',
            oneShot: null,
            mensuel: { price: 290, setup: 150 },
            annuel: { price: 261, setup: 0 },
            features: ['Campagnes locales', 'Optimisation quotidienne', 'Suivi conversions', 'Budget en sus'],
        },
    }

    const getDisplayPrice = (item: PricingItem) => {
        if (billingCycle === 'one-shot') {
            return item.oneShot
                ? { price: item.oneShot.price, setup: item.oneShot.setup, suffix: '' }
                : null
        } else if (billingCycle === 'mensuel') {
            return item.mensuel
                ? { price: item.mensuel.price, setup: item.mensuel.setup, suffix: '/mois' }
                : null
        } else {
            return item.annuel
                ? {
                    price: item.annuel.price,
                    setup: item.annuel.setup,
                    suffix: '/mois',
                    yearly: item.annuel.price * 12,
                }
                : null
        }
    }

    return (
        <>
            {/* Billing Toggle */}
            <div className="flex justify-center mb-16">
                <div className="inline-flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-900 rounded-xl">
                    <button
                        onClick={() => setBillingCycle('one-shot')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${billingCycle === 'one-shot'
                                ? 'bg-white dark:bg-gray-800 text-primary shadow-md'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        One-Shot
                    </button>
                    <button
                        onClick={() => setBillingCycle('mensuel')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${billingCycle === 'mensuel'
                                ? 'bg-white dark:bg-gray-800 text-primary shadow-md'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        Mensuel
                    </button>
                    <button
                        onClick={() => setBillingCycle('annuel')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all relative ${billingCycle === 'annuel'
                                ? 'bg-white dark:bg-gray-800 text-primary shadow-md'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        Annuel
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            -10%
                        </span>
                    </button>
                </div>
            </div>

            {/* Packs */}
            <section className="py-20 bg-white dark:bg-dark">
                <div className="container-fluid">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Packs Complets</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                Solutions tout-en-un
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[pricingData.packStarter, pricingData.packGrowth, pricingData.packPremium].map((pack, idx) => {
                                const displayPrice = getDisplayPrice(pack)
                                if (!displayPrice) return null

                                return (
                                    <div
                                        key={idx}
                                        className={`relative bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 transition-all ${pack.popular
                                                ? 'border-primary shadow-2xl scale-105'
                                                : 'border-gray-200 dark:border-white/10 hover:border-primary'
                                            }`}
                                    >
                                        {pack.popular && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                                <div className="bg-gradient-to-r from-primary to-orange-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                                                    <Zap className="w-4 h-4" />
                                                    Populaire
                                                </div>
                                            </div>
                                        )}

                                        <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">{pack.description}</p>

                                        <div className="mb-6">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-5xl font-bold text-primary">{displayPrice.price}€</span>
                                                <span className="text-gray-600 dark:text-gray-400">{displayPrice.suffix}</span>
                                            </div>
                                            {displayPrice.setup > 0 && (
                                                <p className="text-sm text-gray-500 mt-1">+ {displayPrice.setup}€ setup</p>
                                            )}
                                        </div>

                                        <ul className="space-y-3 mb-8">
                                            {pack.features.map((feature, fidx) => (
                                                <li key={fidx} className="flex items-start gap-2 text-sm">
                                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                    <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Button href="/contact" variant={pack.popular ? 'primary' : 'secondary'} className="w-full">
                                            Choisir ce pack
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 bg-gray-50 dark:bg-black">
                <div className="container-fluid">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Services à la carte</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[pricingData.siteVitrine, pricingData.siteEcommerce, pricingData.seoLocal, pricingData.googleAds].map((service, idx) => {
                                const displayPrice = getDisplayPrice(service)
                                if (!displayPrice)
                                    return (
                                        <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl p-6 border opacity-50">
                                            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                                            <p className="text-sm text-gray-500">Non dispo en {billingCycle}</p>
                                        </div>
                                    )

                                return (
                                    <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-white/10 hover:border-primary transition-all">
                                        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{service.description}</p>

                                        <div className="mb-4">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-bold text-primary">{displayPrice.price}€</span>
                                                <span className="text-gray-600 text-sm">{displayPrice.suffix}</span>
                                            </div>
                                            {displayPrice.setup > 0 && (
                                                <p className="text-xs text-gray-500">+ {displayPrice.setup}€ setup</p>
                                            )}
                                        </div>

                                        <ul className="space-y-2 mb-4">
                                            {service.features.map((feature, fidx) => (
                                                <li key={fidx} className="flex items-start gap-1.5 text-xs">
                                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                    <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Button href="/contact" variant="secondary" size="sm" className="w-full">
                                            Commander
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
