
import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import { Users, Heart, Target, Sparkles, MapPin, Coffee, Mail, Trophy, Rocket, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
    title: 'À Propos de Litus | Agence Web Lorient & Le Mans',
    description: 'Découvrez l\'équipe derrière Litus. Une agence à taille humaine, passionnée par le web et la réussite de ses clients locaux.',
}

// Reusing realized projects for consistency
const realizations = [
    { image: '/realisations/aire des iles site internet crée par litus agence web.jpeg', link: '#', title: 'Aire des Îles' },
    { image: '/realisations/aspire marketing site internet crée par litus agence web.jpeg', link: '#', title: 'Aspire Marketing' },
    { image: '/realisations/azra photographie site internet crée par litus agence web.jpeg', link: '#', title: 'Azra Photographie' },
    { image: '/realisations/murasaki team site internet crée par litus agence web.png', link: '#', title: 'Murasaki Team' },
]

export default function AboutPage() {
    return (
        <ServicePageTemplate
            title="L'Agence qui parle votre langue"
            subtitle="Pas de jargon, pas de bla-bla. Juste des résultats."
            description="Nous sommes une petite équipe d'experts basés à Lorient et Le Mans. Notre mission ? Aider les artisans et PME à se digitaliser sans se faire arnaquer."
            heroImage="/hero-team.png"

            features={[
                {
                    title: 'Proximité',
                    description: 'Nous connaissons le tissu local. On peut se voir autour d\'un café à Lorient ou Le Mans.',
                    icon: <MapPin className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex justify-center mt-2">
                            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                <Coffee className="w-8 h-8 text-orange-600" />
                            </div>
                        </div>
                    )
                },
                {
                    title: 'Transparence',
                    description: 'Les prix sont clairs, les délais respectés. Vous restez propriétaire de votre site.',
                    icon: <Users className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex flex-col gap-1 mt-2 p-2 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded mx-4 shadow-sm">
                            <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded" />
                            <div className="h-2 w-2/3 bg-gray-100 dark:bg-white/10 rounded" />
                            <div className="mt-1 text-[10px] text-green-600 font-bold text-right">✔ Validé</div>
                        </div>
                    )
                },
                {
                    title: 'Passion',
                    description: 'On ne fait pas juste des sites, on construit des business. Votre réussite est la nôtre.',
                    icon: <Heart className="w-6 h-6" />,
                    colSpan: "md:col-span-2",
                    visual: (
                        <div className="flex items-center justify-center mt-2 gap-4">
                            <div className="text-4xl font-bold text-orange-500">100%</div>
                            <div className="text-sm font-medium text-gray-500">Clients<br />Satisfaits</div>
                        </div>
                    )
                },
                {
                    title: 'Expertise Technique',
                    description: 'Du code propre, des serveurs rapides et une sécurité militaire.',
                    icon: <Target className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex justify-center mt-2 font-mono text-xs text-blue-500">
                            &lt;Code /&gt;
                        </div>
                    )
                },
                {
                    title: 'Innovation',
                    description: 'IA, automatisation, design... On utilise les meilleurs outils du moment.',
                    icon: <Sparkles className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex justify-center mt-2">
                            <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                        </div>
                    )
                }
            ]}

            // KEEP GLOBAL SUCCESS CASE STUDY - Shows we deliver
            featuredProject={{
                title: 'Notre Fierté : West Clôtures',
                category: 'Success Story',
                description: 'La preuve qu\'une stratégie digitale bien menée peut transformer une PME locale en leader régional.',
                image: '/realisations/west clotures  site internet crée par litus agence web.jpg',
                stats: [
                    { value: '30+', label: 'Devis / mois', icon: <Mail className="w-8 h-8" /> },
                    { value: '+650%', label: 'Croissance Trafic', icon: <TrendingUp className="w-8 h-8" /> },
                    { value: 'N°1', label: '"Clôture Morbihan"', icon: <Trophy className="w-8 h-8" /> },
                    { value: '+27%', label: 'Productivité', icon: <Rocket className="w-8 h-8" /> }
                ]
            }}

            realizations={realizations}

            // Simplified pricing or CTA for 'About'
            pricing={{
                starter: {
                    price: 'Simple',
                    priceDetail: '',
                    engagement: 'Efficace',
                    features: [
                        'Écoute active',
                        'Conseils francs',
                        'Disponibilité',
                        'Expertise 360°',
                        'Bonne humeur',
                    ],
                },
                custom: {
                    title: 'Rejoignez-nous',
                    description: 'Vous avez un projet ? Nous serions ravis d\'en discuter. Le premier rendez-vous est toujours gratuit et sans engagement.',
                },
            }}
            faqs={[
                {
                    question: 'Où sont vos bureaux ?',
                    answer: 'Nous sommes basés principalement à Lorient (Morbihan) et avons une antenne au Mans. Mais nous travaillons avec des clients dans toute la France grâce à la visio !'
                },
                {
                    question: 'Depuis combien de temps existez-vous ?',
                    answer: 'Litus a été fondée par Aksel. Depuis, l\'agence a aidé des dizaines d\'artisans et PME à décoller sur le web.',
                },
                {
                    question: 'Recrutez-vous ?',
                    answer: 'Nous sommes toujours à l\'affût de talents (freelance ou alternance). Envoyez-nous votre portfolio !'
                },
            ]}
        />
    )
}
