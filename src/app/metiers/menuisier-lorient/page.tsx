import { JobPageTemplate, generateJobMetadata } from '@/components/templates/JobPageTemplate'

const menuisierData = {
    name: 'Menuisier',
    slug: 'menuisier',
    city: 'Lorient',
    citySlug: 'lorient',
    description:
        'Escaliers, agencement, meubles sur-mesure... Votre travail artisanal mérite une vitrine digitale à la hauteur de votre talent.',
    challenges: [
        'Difficile de montrer la qualité de vos finitions sans portfolio en ligne',
        'Les clients ne trouvent pas votre atelier quand ils cherchent un menuisier',
        'Vos créations sur-mesure ne sont pas mises en valeur',
        'Vous manquez les gros chantiers de rénovation faute de visibilité',
    ],
    solutions: [
        'Galerie photo HD qui sublime vos réalisations bois',
        'Portfolio détaillé par type de projet (escalier, cuisine, dressing)',
        'SEO optimisé "menuisier Lorient" + "menuiserie sur-mesure"',
        'Formulaire projet avec upload photos pour devis personnalisé',
    ],
    services: [
        {
            name: 'Site Artisan',
            price: 'dès 2 490€',
            description:
                'Site showcase avec galerie projets, savoir-faire, formulaire devis. Design bois et authenticité.',
        },
        {
            name: 'SEO Artisanat',
            price: '590€/mois',
            description:
                'Référencement local + mots-clés métier. Visibilité sur Google pour particuliers et professionnels.',
        },
        {
            name: 'Pack Premium',
            price: 'Sur devis',
            description:
                'Site + Blog projets + SEO. Positionnement expert menuiserie dans votre région.',
        },
    ],
    cta: {
        title: 'Donnez de la visibilité à votre savoir-faire',
        subtitle:
            'Un site qui reflète la qualité de vos créations et attire les bons clients.',
    },
}

export const metadata = generateJobMetadata(menuisierData)

export default function MenuisierLorientPage() {
    return <JobPageTemplate job={menuisierData} />
}
