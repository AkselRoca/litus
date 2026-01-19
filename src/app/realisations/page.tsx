import { getProjects } from '@/actions/portfolio'
import { Badge } from '@/components/ui/Badge'
import { PortfolioEditorial } from '@/components/portfolio/PortfolioEditorial'
import { Sparkles } from 'lucide-react'

export const metadata = {
    title: 'Nos Réalisations | Agence Web Litus',
    description: 'Découvrez nos derniers projets : Sites vitrines, E-commerce, Applications web et campagnes Google Ads.',
}

export default async function RealisationsPage() {
    const { success, data: projects, error } = await getProjects()

    if (!success || !projects) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-xl font-bold mb-2">Erreur de chargement</h1>
                <pre className="bg-red-50 p-4 rounded text-red-600 max-w-2xl overflow-auto border border-red-200">
                    {error || "Erreur inconnue"}
                </pre>
            </div>
        )
    }

    // Projects are already sorted by 'order' from getProjects
    // No additional sorting needed here

    return (
        <main className="min-h-screen bg-snow dark:bg-dark selection:bg-primary/30 selection:text-primary-foreground transition-colors duration-700">
            {/* Editorial Showcase (Includes Hero & Filters) */}
            <PortfolioEditorial projects={projects} />

            {/* Footer Call to Action (Simple) */}
            <section className="py-32 text-center">
                <h2 className="text-3xl font-heading font-bold mb-6 text-gray-900 dark:text-white">Votre projet est le prochain ?</h2>
                <a href="/contact" className="inline-block px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform">
                    Démarrer la collaboration
                </a>
            </section>
        </main>
    )
}
