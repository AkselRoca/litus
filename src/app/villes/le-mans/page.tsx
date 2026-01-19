import { CityPageTemplate, generateCityMetadata } from '@/components/templates/CityPageTemplate'
import { Globe, Search, Megaphone, ShoppingCart } from 'lucide-react'

const lemansData = {
    name: 'Le Mans',
    department: 'Sarthe (72)',
    slug: 'le-mans',
    tagline: 'Votre partenaire digital au cœur de la Sarthe',
    description:
        'Agence web locale au Mans spécialisée dans la transformation digitale des artisans, commerçants et PME sarthoises. Sites web, SEO et publicité en ligne.',
    stats: {
        population: '143 000',
        businesses: '6 500+',
        digitalRate: '38%',
    },
    advantages: [
        'Agence basée au Mans - rencontres faciles dans nos bureaux',
        'Expertise du marché manceau et sarthois',
        'Accompagnement personnalisé et suivi régulier',
        'Prix transparents adaptés aux TPE/PME locales',
        'Réponse rapide à vos questions (moins de 2h)',
        'Partenariats avec acteurs économiques locaux',
    ],
    services: [
        {
            icon: Globe,
            title: 'Sites Web Pro',
            description: 'Site internet moderne et performant pour votre entreprise mancelle.',
            link: '/services/sites-vitrine',
        },
        {
            icon: Search,
            title: 'SEO Sarthe',
            description: 'Référencement local pour dominer Google sur Le Mans et agglomération.',
            link: '/services/seo-local',
        },
        {
            icon: Megaphone,
            title: 'Pub Locale',
            description: 'Campagnes Google Ads ciblées Le Mans pour attirer des clients près de chez vous.',
            link: '/services/google-ads',
        },
        {
            icon: ShoppingCart,
            title: 'Boutique en Ligne',
            description: 'E-commerce clé en main pour vendre vos produits partout en France.',
            link: '/services/e-commerce',
        },
    ],
    testimonial: {
        name: 'Sophie M.',
        business: 'Électricienne au Mans',
        quote:
            'Litus a créé mon site en 2 semaines et optimisé ma fiche Google Business. Résultat : je suis passée de 2-3 appels par mois à 15-20 demandes qualifiées. Incroyable !',
        result: '+600% d\'appels en 4 mois',
    },
}

export const metadata = generateCityMetadata(lemansData)

export default function LeMansPage() {
    return <CityPageTemplate city={lemansData} />
}
