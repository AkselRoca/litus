import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import { Webhook, Database, Receipt, Bell, Mail, Workflow, RefreshCw, Zap, TrendingUp, Trophy, Rocket } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Automatisation & Connexion API (Zapier, Make, n8n) | Litus',
    description:
        'Gagnez des heures chaque semaine en automatisant vos tâches chronophages. Synchronisation CRM, création de devis/factures et notifications automatiques.',
}

// List of realizations mapping for Automation (using generic ones or specific logic if any)
const realizations = [
    { image: '/realisations/brz couverture site internet crée par litus agence web.png', link: '#', title: 'CRM BRZ Couverture' },
    { image: '/realisations/west clotures  site internet crée par litus agence web.jpg', link: '#', title: 'Extranet West Clôtures' },
]

export default function AutomatisationPage() {
    return (
        <ServicePageTemplate
            title="Automatisation de Processus"
            subtitle="Faites travailler les robots. Gagnez du temps, éliminez les erreurs humaines et scalez votre entreprise."
            description="Arrêtez de copier-coller des données entre votre site web, votre CRM et votre outil de facturation. Nous créons des ponts intelligents entre tous vos logiciels."
            heroImage="/hero-team.png"

            // RICH SEO CONTENT
            seoContent={
                <div className="space-y-16">
                    {/* Intro Block */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                                Récupérez vos nuits et vos week-ends
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Trop d'entrepreneurs finissent leurs journées par des heures de gestion administrative redondante. Ajouter un lead dans le CRM, lui envoyer un email de bienvenue, créer le devis sur le logiciel comptable...
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Chez Litus, nous sommes experts en <strong>Zapier, Make, n8n</strong> et en intégrations API sur-mesure. Nous transformons vos processus manuels en workflows instantanés et infaillibles.
                            </p>
                        </div>
                        {/* Visual: Abstract Workflow */}
                        <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-tr from-orange-50 to-orange-100 dark:from-white/5 dark:to-white/10 rounded-2xl overflow-hidden flex items-center justify-center border border-orange-100 dark:border-white/5">
                            <div className="flex flex-col gap-4 items-center">
                                {/* Lead Node */}
                                <div className="px-6 py-3 bg-white dark:bg-[#111] rounded-xl shadow-lg border border-gray-100 dark:border-white/10 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <Mail className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <span className="font-bold text-sm text-gray-900 dark:text-white">Nouveau Lead (Site Web)</span>
                                </div>
                                <div className="h-6 w-0.5 bg-orange-300 dark:bg-orange-500/30" />
                                
                                {/* Process Node */}
                                <div className="p-4 bg-orange-500 text-white rounded-full shadow-lg shadow-orange-500/20">
                                    <Workflow className="w-6 h-6 animate-pulse" />
                                </div>
                                <div className="h-6 w-0.5 bg-orange-300 dark:bg-orange-500/30" />
                                
                                {/* End Nodes Row */}
                                <div className="flex gap-4">
                                    <div className="px-4 py-2 bg-white dark:bg-[#111] rounded-xl shadow-lg border border-gray-100 dark:border-white/10 flex items-center gap-2">
                                        <Database className="w-4 h-4 text-green-500" />
                                        <span className="text-xs font-bold text-gray-900 dark:text-white">Ajout CRM</span>
                                    </div>
                                    <div className="px-4 py-2 bg-white dark:bg-[#111] rounded-xl shadow-lg border border-gray-100 dark:border-white/10 flex items-center gap-2">
                                        <Receipt className="w-4 h-4 text-purple-500" />
                                        <span className="text-xs font-bold text-gray-900 dark:text-white">Génère un Devis</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            // BENTO GRID FEATURES
            features={[
                {
                    title: 'Intégration d\'APIs Exotiques',
                    description: 'Vous utilisez un CRM métier très spécifique ? Si celui-ci possède une API, nous pouvons le connecter à votre site internet de façon invisible.',
                    icon: <Webhook className="w-6 h-6" />,
                    colSpan: "md:col-span-2",
                    visual: (
                        <div className="flex justify-between items-center mt-2 px-8">
                            <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-md">API</div>
                            <div className="flex-1 border-t-2 border-dashed border-orange-400 mx-2 animate-pulse" />
                            <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-md">SITE</div>
                        </div>
                    )
                },
                {
                    title: 'HubSpot, Salesforce, Pipedrive',
                    description: 'Envoi instantané de vos nouveaux prospects dans votre pipeline commercial existant.',
                    icon: <Database className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="space-y-2 mt-2">
                            <div className="h-2 w-full rounded-full bg-blue-500/20" />
                            <div className="h-2 w-3/4 rounded-full bg-orange-500/50" />
                            <div className="h-2 w-1/2 rounded-full bg-green-500/80 text-right" />
                        </div>
                    )
                },
                {
                    title: 'Notifications Temps Réel',
                    description: 'Recevez une notification Slack, Teams ou SMS lorsqu\'un gros client effectue une demande.',
                    icon: <Bell className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex items-center gap-2 mt-2 font-bold text-orange-500 text-xs bg-orange-50 dark:bg-orange-500/10 p-2 rounded">
                            <Bell className="w-4 h-4 fill-orange-500 animate-bounce" />
                            <span>Alerte Prospect</span>
                        </div>
                    )
                },
                {
                    title: 'Devis & Factures Automatiques',
                    description: 'Génération PDF dynamique et envoi des factures sur Stripe, Sellsy, Pennylane, etc.',
                    icon: <Receipt className="w-6 h-6" />,
                    colSpan: "md:col-span-2",
                    visual: (
                        <div className="flex items-center gap-2 mt-2 p-2 bg-gray-50 dark:bg-white/5 rounded border border-gray-100 dark:border-white/5">
                            <Receipt className="w-4 h-4 text-slate-500" />
                            <span className="text-xs font-mono text-gray-500">Facture_client_2026.pdf générée</span>
                        </div>
                    )
                },
                {
                    title: 'Nurturing & Emails',
                    description: 'Relances automatiques si un client ne signe pas ou abandonne son panier.',
                    icon: <Mail className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="flex items-center justify-center mt-2 opacity-60">
                            <Mail className="w-8 h-8 text-orange-500" />
                        </div>
                    )
                },
                {
                    title: 'Robustesse à Toute Épreuve',
                    description: 'Gestion des erreurs et tentatives de répétitions si un service tiers tombe en panne.',
                    icon: <RefreshCw className="w-6 h-6" />,
                    colSpan: "md:col-span-1",
                    visual: (
                        <div className="mt-2 text-xs font-mono bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 font-bold p-2 rounded">
                            [OK] Workflow stable
                        </div>
                    )
                }
            ]}

            featuredProject={{
                title: 'Machine à Leads 100% Automatisée',
                category: 'Architecture Serveurless',
                description: 'Pour cette entreprise, nous avons connecté le site web à un CRM Airtable central, puis généré les espaces clients automatiquement. Les contrats sont préparés tout seuls selon les variables transmises.',
                image: '/realisations/del rio pizzeria site internet crée par litus agence web.png',
                stats: [
                    { value: '-40h', label: 'Temps gagné / mois', icon: <Zap className="w-8 h-8" /> },
                    { value: '0', label: 'Erreur de saisie', icon: <TrendingUp className="w-8 h-8" /> },
                    { value: '+99%', label: 'Réactivité clients', icon: <Trophy className="w-8 h-8" /> },
                    { value: '100%', label: 'Sérénité', icon: <Rocket className="w-8 h-8" /> }
                ]
            }}

            realizations={realizations}

            pricing={{
                starter: {
                    price: '499€',
                    priceDetail: 'A partir de',
                    engagement: 'Paiement Unique',
                    features: [
                        'Cartographie de vos Processus',
                        'Mise en place d\'une stack (Make, Zapier)',
                        'Synchronisation Site / CRM',
                        'Envois d\'Emails Automatisés',
                        'Tests & Recette Complète',
                        'Livrable Documenté',
                    ],
                },
                custom: {
                    title: 'Intégration API / Logiciel Métier',
                    description:
                        'Vous avez besoin d\'un développement backend complexe et de scripts Node.js / Python sur-mesure pour s\'interconnecter avec l\'API de votre franchise ? Nous faisons du sur-mesure.',
                },
            }}
            faqs={[
                {
                    question: 'Zapier, Make ou code sur mesure ?',
                    answer: 'Tout dépend de votre budget et de vos besoins. Zapier et Make nous permettent d\'aller très vite pour brancher les outils SaaS du marché (Hubspot, Stripe). Si le volume de données est colossal, un développement NodeJS sur mesure évitera les facturations abusives liées aux logiciels nocode.'
                },
                {
                    question: 'Est-ce compatible avec mon vieux logiciel sur Windows ?',
                    answer: 'Sauf si ce vieux logiciel possède un accès API ou autorise les flux webhooks, c\'est souvent impossible sans une refonte.'
                },
                {
                    question: 'Mes données seront-elles sécurisées ?',
                    answer: 'Absolument. Nous respectons scrupuleusement la norme RGPD de l\'Europe. Si vos données sont très sensibles, nous privilégions n8n hébergé en France (SecNumCloud) ou nos propres serveurs locaux pour faire le "pont".'
                },
                {
                    question: 'Que se passe-t-il si un pont casse ?',
                    answer: 'Dans le cadre de nos <Link href="/tarifs" className="text-orange-600 underline hover:text-orange-700">Plans de Maintenance</Link>, nous monitorons les webhooks et nous recevons une alerte en temps réel si un scénario bloque, pour intervenir sans que vous ayez à vous en rendre compte.'
                }
            ]}
        />
    )
}
