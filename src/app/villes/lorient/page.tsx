import { CityPageTemplate, generateCityMetadata } from '@/components/templates/CityPageTemplate'
import { Globe, Search, Megaphone, ShoppingCart } from 'lucide-react'

const lorientData = {
    name: 'Lorient',
    department: 'Morbihan (56)',
    slug: 'lorient',
    tagline: 'L\'agence web qui fait grandir les entreprises',
    description:
        'Agence digitale locale spécialisée dans la création de sites web, le SEO local et Google Ads pour les artisans, PME et commerçants lorientais.',
    stats: {
        population: '58 000',
        businesses: '3 200+',
        digitalRate: '42%',
    },
    advantages: [
        'Rencontres en présentiel à Lorient - proximité totale',
        'Connaissance parfaite du tissu économique local',
        'Disponibilité et réactivité pour vos urgences',
        'Tarifs adaptés aux budgets des PME bretonnes',
        'Support en français, sans intermédiaire',
        'Réseau local de partenaires (photographes, rédacteurs)',
    ],
    services: [
        {
            icon: Globe,
            title: 'Sites Vitrine',
            description: 'Site professionnel responsive pour présenter votre activité à Lorient et alentours.',
            link: '/services/sites-vitrine',
        },
        {
            icon: Search,
            title: 'SEO Local',
            description: 'Référencement Google pour apparaître en 1ère page sur "votre métier + Lorient".',
            link: '/services/seo-local',
        },
        {
            icon: Megaphone,
            title: 'Google Ads',
            description: 'Publicité ciblée Lorient et agglomération pour des leads qualifiés immédiatement.',
            link: '/services/google-ads',
        },
        {
            icon: ShoppingCart,
            title: 'E-commerce',
            description: 'Boutique en ligne professionnelle pour vendre vos produits 24h/24.',
            link: '/services/e-commerce',
        },
    ],
    testimonial: {
        name: 'Pierre L.',
        business: 'Paysagiste à Lorient',
        quote:
            'Depuis que Litus a refait mon site et optimisé mon SEO, je reçois 3 à 4 demandes de devis par semaine directement via Google. Mon planning est plein 2 mois à l\'avance !',
        result: '+250% de leads qualifiés en 6 mois',
    },
}

export const metadata = generateCityMetadata(lorientData)

export default function LorientPage() {
    return <CityPageTemplate city={lorientData} />
}
