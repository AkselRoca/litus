import { Check, X } from 'lucide-react'

export function UnfairAdvantageSection() {
    const comparison = {
        autresAgences: {
            title: 'Autres Agences',
            items: [
                'Basées à Paris ou grandes villes',
                'Rendez-vous uniquement en visio',
                'Délais de réponse lents',
                'Tarifs gonflés par les frais généraux',
                'Accompagnement standard',
            ],
        },
        litus: {
            title: 'Litus',
            items: [
                'Basés à Lorient & Le Mans',
                'Rencontres en présentiel possibles',
                'Réponse sous 24h maximum',
                'Tarifs adaptés aux PME locales',
                'Accompagnement personnalisé',
            ],
        },
    }

    return (
        <section className="py-20 bg-white dark:bg-dark">
            <div className="container-fluid">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Pourquoi une agence locale ?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            L'avantage de la proximité pour votre business
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Autres Agences */}
                        <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border-2 border-red-200 dark:border-red-900/20">
                            <h3 className="text-2xl font-bold mb-6 text-red-900 dark:text-red-100">
                                {comparison.autresAgences.title}
                            </h3>
                            <ul className="space-y-4">
                                {comparison.autresAgences.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-200">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Litus */}
                        <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-8 border-2 border-green-200 dark:border-green-900/20">
                            <h3 className="text-2xl font-bold mb-6 text-green-900 dark:text-green-100">
                                {comparison.litus.title}
                            </h3>
                            <ul className="space-y-4">
                                {comparison.litus.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-200 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
