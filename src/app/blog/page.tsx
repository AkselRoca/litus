import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Blog - Conseils Marketing Digital Local | Litus',
    description: 'Découvrez nos conseils et guides pour développer votre visibilité en ligne et attirer plus de clients locaux.',
}

const articles = [
    {
        slug: 'seo-local-guide-2024',
        title: 'Guide Complet du SEO Local en 2024',
        excerpt: 'Tout ce que vous devez savoir pour apparaître en première page Google dans votre zone géographique.',
        category: 'SEO',
        publishedAt: '10 janvier 2024',
        readTime: '8 min',
    },
    {
        slug: 'google-ads-vs-seo',
        title: 'Google Ads vs SEO : Que Choisir ?',
        excerpt: 'Comparatif détaillé pour vous aider à choisir la meilleure stratégie selon votre budget et vos objectifs.',
        category: 'Stratégie',
        publishedAt: '5 janvier 2024',
        readTime: '6 min',
    },
    {
        slug: 'site-vitrine-artisan',
        title: 'Pourquoi un Site Vitrine est Indispensable pour les Artisans',
        excerpt: 'Les 5 raisons pour lesquelles chaque artisan devrait avoir un site web professionnel en 2024.',
        category: 'Site Web',
        publishedAt: '2 janvier 2024',
        readTime: '5 min',
    },
]

const categories = ['Tous', 'SEO', 'Stratégie', 'Site Web', 'Google Ads']

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero */}
            <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
                </div>

                <div className="container-fluid relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                            <BookOpen className="w-4 h-4" />
                            Ressources & Conseils
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Notre <span className="text-primary">Blog</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Conseils pratiques et guides pour développer votre visibilité locale
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-8 border-b border-gray-200 dark:border-white/10">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === 'Tous'
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-20">
                <div className="container-fluid">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/blog/${article.slug}`}
                                    className="group block"
                                >
                                    <article className="
                                        h-full rounded-2xl overflow-hidden
                                        bg-gray-50 dark:bg-gray-900
                                        border border-gray-200 dark:border-white/10
                                        hover:border-primary/50
                                        hover:shadow-xl hover:shadow-primary/10
                                        transition-all duration-500
                                        hover:-translate-y-1
                                    ">
                                        {/* Image placeholder */}
                                        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />

                                        <div className="p-6">
                                            {/* Category */}
                                            <div className="inline-flex px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                                                {article.category}
                                            </div>

                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                                                {article.title}
                                            </h2>

                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                                {article.excerpt}
                                            </p>

                                            {/* Meta */}
                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {article.publishedAt}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {article.readTime}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-20 bg-gray-50 dark:bg-gray-950">
                <div className="container-fluid">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Restez informé
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            Recevez nos meilleurs conseils directement dans votre boîte mail.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="votre@email.fr"
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                            >
                                S'inscrire
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
