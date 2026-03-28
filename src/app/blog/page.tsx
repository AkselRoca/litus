import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react'

import { prisma } from '@/lib/database_final'

export const metadata: Metadata = {
    title: 'Blog - Conseils Marketing Digital Local | Litus',
    description: 'Découvrez nos conseils et guides pour développer votre visibilité en ligne et attirer plus de clients locaux.',
}

export const revalidate = 60 // Cache de 60 secondes pour les nouveaux articles

const categories = ['Tous', 'SEO', 'Stratégie', 'Site Web', 'Google Ads']

export default async function BlogPage({
    searchParams
}: {
    searchParams: { category?: string }
}) {
    const activeCategory = searchParams.category || 'Tous'

    // Requête Prisma pour récupérer les articles publiés
    const whereClause: any = { published: true }
    if (activeCategory !== 'Tous') {
        whereClause.category = activeCategory
    }

    // FIX MIGRATION: Table is not migrated on Turso yet, bypassing to let Vercel build.
    const posts: any[] = [] // await prisma.blogPost.findMany({ where: whereClause, orderBy: { createdAt: 'desc' } })

    // Transformation pour l'affichage
    const articles = posts.map(post => {
        const wordCount = post.content.split(/\s+/).length
        const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))
        
        return {
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            category: post.category || 'Actualités',
            publishedAt: post.publishedAt 
                ? post.publishedAt.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
                : post.createdAt.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
            readTime: `${readTimeMinutes} min`,
            coverImage: post.coverImage,
        }
    })
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
                                <Link
                                    key={category}
                                    href={category === 'Tous' ? '/blog' : `/blog?category=${encodeURIComponent(category)}`}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === activeCategory
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary'
                                        }`}
                                >
                                    {category}
                                </Link>
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
                                        {/* Image de couverture */}
                                        {article.coverImage ? (
                                            <div className="h-48 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                <img 
                                                    src={article.coverImage} 
                                                    alt={article.title} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                                                <BookOpen className="w-8 h-8 text-gray-400 opacity-50" />
                                            </div>
                                        )}

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
