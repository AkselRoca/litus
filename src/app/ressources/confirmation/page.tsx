import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Download, ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
    title: 'Merci ! Votre ressource est prête | Litus',
    description: 'Téléchargez votre ressource gratuite et découvrez comment booster votre visibilité locale.',
}

// Mapping des lead magnets vers leurs infos
const magnetInfo: Record<string, { title: string; description: string }> = {
    'audit-google-ads': {
        title: 'Audit Google Ads Gratuit',
        description: 'Découvrez comment optimiser vos campagnes et réduire vos coûts publicitaires.',
    },
    'carto-productivite': {
        title: 'Cartographie Productivité',
        description: 'Identifiez les outils digitaux qui vous feront gagner du temps au quotidien.',
    },
    'guide-appel-offres': {
        title: 'Guide Appel d\'Offres',
        description: 'Tout ce qu\'il faut savoir pour répondre aux marchés publics dans le digital.',
    },
}

export default async function ConfirmationPage({
    searchParams,
}: {
    searchParams: Promise<{ magnet?: string }>
}) {
    const params = await searchParams
    const magnetId = params.magnet || 'audit-google-ads'
    const info = magnetInfo[magnetId] || magnetInfo['audit-google-ads']
    const downloadUrl = `/lead-magnets/${magnetId}.pdf`

    return (
        <div className="min-h-screen-dynamic bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-black">
            {/* Hero Confirmation */}
            <section className="py-20 md:py-32">
                <div className="container-fluid">
                    <div className="max-w-2xl mx-auto text-center">
                        {/* Success Icon */}
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-8">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                Merci pour votre demande !
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Votre ressource <span className="font-semibold text-primary">{info.title}</span> est prête à être téléchargée.
                        </p>

                        {/* Download Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border-2 border-primary/20 mb-8">
                            <h2 className="text-2xl font-bold mb-2">{info.title}</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">{info.description}</p>

                            <a
                                href={downloadUrl}
                                download
                                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-primary to-orange-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <Download className="w-5 h-5" />
                                Télécharger maintenant
                            </a>
                        </div>

                        {/* Next Steps */}
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-white/10">
                            <h3 className="font-bold mb-4">Prochaine étape ?</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Discutons de vos besoins et voyons comment nous pouvons vous aider à développer votre visibilité locale.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button href="/contact" variant="primary">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Réserver un appel
                                </Button>
                                <Button href="/" variant="secondary">
                                    <ArrowRight className="w-4 h-4 mr-2" />
                                    Retour à l'accueil
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
