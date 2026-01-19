import { JobPageTemplate, generateJobMetadata } from '@/components/templates/JobPageTemplate'

const carreleurData = {
    name: 'Carreleur',
    slug: 'carreleur',
    city: 'Lorient',
    citySlug: 'lorient',
    description:
        'Sols, murs, salles de bains... Vos poses sont parfaites au millimètre. Votre visibilité web devrait l\'être aussi.',
    challenges: [
        'Impossible de montrer la précision de vos joints sans photos HD',
        'Les clients ne trouvent pas votre entreprise pour leurs rénovations',
        'Difficile de se différencier des "poseurs" low cost',
        'Vos belles réalisations (mosaïque, grand format) restent invisibles',
    ],
    solutions: [
        'Portfolio photo HD qui sublime la qualité de vos poses',
        'Page dédiée par type : faïence, grès cérame, mosaïque, terrasse',
        'SEO "carreleur professionnel Lorient" + "pose carrelage grand format"',
        'Galerie tendances pour conseiller et inspirer vos clients',
    ],
    services: [
        {
            name: 'Site Carreleur Pro',
            price: 'dès 2 190€',
            description:
                'Site avec galerie réalisations HD, types de pose, marques partenaires, formulaire projet détaillé.',
        },
        {
            name: 'SEO Finitions',
            price: '590€/mois',
            description:
                'Référencement positionné expertise. Attirer les clients rénovation haut de gamme.',
        },
        {
            name: 'Pack Inspiration',
            price: 'Sur devis',
            description:
                'Site + Blog tendances carrelage + SEO. Devenez LA référence conseil dans votre zone.',
        },
    ],
    cta: {
        title: 'Posez les bases d\'une visibilité solide',
        subtitle:
            'Un site qui reflète la précision et la qualité de votre travail.',
    },
}

export const metadata = generateJobMetadata(carreleurData)

export default function CarreleurLorientPage() {
    return <JobPageTemplate job={carreleurData} />
}
