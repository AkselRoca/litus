import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react'

import { prisma } from '@/lib/database_final'

export const metadata: Metadata = {
    title: 'Blog - Conseils SEO & Web | Litus',
    description: 'Découvrez nos conseils premium et guides tactiques pour dominer votre marché local grâce au digital.',
}

export const revalidate = 60

const categories = ['Tous', 'SEO', 'Stratégie', 'Site Web', 'Google Ads']

export default async function BlogPage({
    searchParams
}: {
    searchParams: { category?: string }
}) {
    // await for Next.js 15+ searchParams
    const resolvedSearchParams = await searchParams
    const activeCategory = resolvedSearchParams.category || 'Tous'

    const whereClause: any = { published: true }
    if (activeCategory !== 'Tous') {
        whereClause.category = activeCategory
    }

    // Ré-activation de Prisma après la migration DB
    const postsResult = await prisma.blogPost.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        include: { author: true }
    })
    
    const posts = postsResult as any[]

    const articles = posts.map(post => {
        const wordCount = post.content.split(/\s+/).length
        const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))

        return {
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            category: post.category || 'Actualités',
            author: post.author,
            publishedAt: post.publishedAt
                ? post.publishedAt.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
                : post.createdAt.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
            readTime: `${readTimeMinutes} min`,
            coverImage: post.coverImage,
        }
    })

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 relative overflow-hidden">
            {/* --- EFFETS DE FOND (Glow & Gradients) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] sm:top-[-20%] left-[-10%] w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-primary/20 rounded-full blur-[100px] sm:blur-[150px] opacity-50 animate-pulse-slow"></div>
                <div className="absolute top-[40%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-purple-600/10 rounded-full blur-[100px] sm:blur-[150px] opacity-40"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] opacity-50"></div>
            </div>

            <div className="relative z-10 pt-32 pb-24">
                <div className="container-fluid max-w-7xl mx-auto">
                    
                    {/* --- HERO SECTION --- */}
                    <div className="text-center mb-16 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg shadow-black/20">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-xs font-medium tracking-wide text-gray-300 uppercase">Litus Inside</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                            Explorez nos <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">stratégies digitales</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Astuces, études de cas et méthodes éprouvées pour propulser votre entreprise au sommet.
                        </p>
                    </div>

                    {/* --- CATEGORIES (Glass Pills) --- */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                        {categories.map((category) => {
                            const isActive = category === activeCategory;
                            return (
                                <Link
                                    key={category}
                                    href={category === 'Tous' ? '/blog' : `/blog?category=${encodeURIComponent(category)}`}
                                    className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden group border ${
                                        isActive 
                                            ? 'border-primary/50 text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]' 
                                            : 'border-white/10 text-gray-400 hover:text-white hover:border-white/30 bg-white/5 backdrop-blur-md'
                                    }`}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-90"></div>
                                    )}
                                    <span className="relative z-10">{category}</span>
                                </Link>
                            )
                        })}
                    </div>

                    {/* --- ARTICLES GRID --- */}
                    {articles.length === 0 ? (
                        <div className="text-center py-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                            <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-medium text-white mb-2">Aucun article trouvé</h3>
                            <p className="text-gray-400">Revenez bientôt pour de nouveaux contenus dans cette catégorie.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {articles.map((article, idx) => (
                                <Link
                                    key={article.slug}
                                    href={`/blog/${article.slug}`}
                                    className="group flex flex-col h-full bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(var(--primary-rgb),0.4)] relative"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    {/* Hover Glow inside card */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                    {/* Cover Image */}
                                    <div className="relative h-60 overflow-hidden bg-white/5">
                                        {article.coverImage ? (
                                            <img 
                                                src={article.coverImage} 
                                                alt={article.title} 
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                                                <BookOpen className="w-10 h-10 text-white/20" />
                                            </div>
                                        )}
                                        {/* Category Badge overlay */}
                                        <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
                                            {article.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-6 md:p-8 flex flex-col">
                                        
                                        <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
                                            {article.title}
                                        </h2>
                                        
                                        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                                            {article.excerpt}
                                        </p>

                                        {/* Bottom Meta */}
                                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                            
                                            {/* Author Info */}
                                            <div className="flex items-center gap-3">
                                                {article.author?.avatar ? (
                                                    <img src={article.author.avatar} alt={article.author.name} className="w-8 h-8 rounded-full border border-white/20 object-cover" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-800 to-gray-600 flex items-center justify-center border border-white/10">
                                                        <span className="text-xs font-bold text-white">
                                                            {article.author?.name ? article.author.name.charAt(0).toUpperCase() : 'L'}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-gray-200">{article.author?.name || "L'équipe Litus"}</span>
                                                    <span className="text-[10px] text-gray-500">{article.publishedAt}</span>
                                                </div>
                                            </div>

                                            {/* Read time / Read more */}
                                            <div className="flex items-center gap-2 text-xs font-medium text-gray-400 group-hover:text-primary transition-colors">
                                                <span>{article.readTime}</span>
                                                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                            </div>

                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* --- NEWSLETTER SECTION (Glassmorphism) --- */}
            <div className="relative z-10 py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-black/80 backdrop-blur-xl">
                <div className="container-fluid max-w-4xl mx-auto">
                    <div className="relative p-10 md:p-16 rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden text-center">
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] opacity-40 mix-blend-screen pointer-events-none"></div>
                        
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Prenez une longueur d'avance
                        </h2>
                        <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg hover:text-gray-300 transition-colors">
                            Recevez nos meilleures stratégies SEO et acquisition une fois par mois. Désabonnement en un clic.
                        </p>
                        
                        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto relative z-20">
                            <input
                                type="email"
                                placeholder="votre@email.com"
                                className="flex-1 px-6 py-4 rounded-xl md:rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-primary text-white font-bold rounded-xl md:rounded-2xl hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 group"
                            >
                                S'abonner
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
