import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, ArrowRight, Share2, Facebook, Twitter, Linkedin, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface BlogArticleData {
    slug: string
    title: string
    excerpt: string
    content: React.ReactNode
    author: {
        name: string
        role: string
        avatar?: string | null
    }
    publishedAt: string
    readTime: string
    category: string
    coverImage?: string | null
    tableOfContents?: string | null
    relatedArticles?: { slug: string; title: string, coverImage?: string | null, excerpt?: string }[]
}

interface BlogArticleTemplateProps {
    data: BlogArticleData
}

export function generateBlogArticleMetadata(data: BlogArticleData): Metadata {
    return {
        title: `${data.title} | Blog Litus`,
        description: data.excerpt,
        openGraph: {
            title: data.title,
            description: data.excerpt,
            type: 'article',
            publishedTime: data.publishedAt,
            authors: [data.author.name],
            images: data.coverImage ? [data.coverImage] : [],
        },
    }
}

export function BlogArticleTemplate({ data }: BlogArticleTemplateProps) {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 relative overflow-hidden">
            {/* BACKGROUND EFFECTS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] sm:top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow"></div>
                <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] opacity-30"></div>
            </div>

            <div className="relative z-10 pt-32 pb-24">
                <div className="container-fluid max-w-7xl mx-auto">
                    
                    {/* --- HEADER ARTICLE --- */}
                    <div className="max-w-4xl mx-auto mb-16 space-y-8">
                        {/* Back link */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium tracking-wide">Retour au blog</span>
                        </Link>

                        <div className="space-y-6">
                            <div className="inline-flex items-center px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
                                {data.category}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
                                {data.title}
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
                                {data.excerpt}
                            </p>
                        </div>

                        {/* Author & Meta */}
                        <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
                            <div className="flex items-center gap-4">
                                {data.author.avatar ? (
                                    <img src={data.author.avatar} alt={data.author.name} className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-primary/30 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shrink-0 border border-white/10">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </div>
                                )}
                                <div>
                                    <div className="text-white font-semibold text-lg">{data.author.name}</div>
                                    <div className="text-primary text-sm font-medium">{data.author.role}</div>
                                </div>
                            </div>
                            
                            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
                            
                            <div className="flex items-center gap-6 text-sm text-gray-400 font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span>{data.publishedAt}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span>{data.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- MAIN LAYOUT (Content + Sidebar) --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        
                        {/* COLUMN: ARTICLE CONTENT */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Cover Image */}
                            {data.coverImage && (
                                <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                                    <img src={data.coverImage} alt={data.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                                </div>
                            )}

                            {/* Prose Content */}
                            <article className="prose prose-lg md:prose-xl prose-invert max-w-none 
                                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
                                prose-h3:text-2xl prose-h3:text-gray-200
                                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-white prose-strong:font-semibold
                                prose-ul:text-gray-300 prose-li:my-2
                                prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-gray-300 prose-blockquote:font-medium prose-blockquote:not-italic
                            ">
                                {data.content}
                            </article>

                            {/* Share & Tags Footer */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-400">Partager cet article :</span>
                                    <div className="flex gap-2">
                                        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all">
                                            <Twitter className="w-4 h-4" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all">
                                            <Linkedin className="w-4 h-4" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all">
                                            <Facebook className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COLUMN: SIDEBAR */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-32 space-y-8">
                                
                                {/* Sommaire (Table of Contents) */}
                                {data.tableOfContents && (
                                    <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl relative overflow-hidden group">
                                        {/* Glow effect */}
                                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[50px] group-hover:bg-primary/30 transition-colors"></div>
                                        
                                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                            <div className="w-1.5 h-6 rounded-full bg-primary mb-0.5"></div>
                                            Sommaire
                                        </h3>
                                        
                                        <div 
                                            className="prose prose-sm prose-invert max-w-none
                                                prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-3 prose-li:pl-0
                                                prose-a:text-gray-400 prose-a:no-underline hover:prose-a:text-primary prose-a:transition-colors prose-a:flex prose-a:items-start prose-a:gap-2
                                            "
                                            dangerouslySetInnerHTML={{ __html: data.tableOfContents }}
                                        />
                                    </div>
                                )}

                                {/* Lead Magnet CTA (Generateur Audit / RDV) */}
                                <div className="p-1 rounded-3xl bg-gradient-to-b from-primary/30 to-transparent relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent blur-md"></div>
                                    <div className="relative p-8 rounded-[23px] bg-black/90 backdrop-blur-2xl border border-white/5 text-center shadow-2xl">
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)]">
                                            <CheckCircle2 className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Besoin d'un coup de pouce ?</h3>
                                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                            Obtenez une stratégie sur-mesure pour votre entreprise. Nos experts analysent gratuitement votre visibilité.
                                        </p>
                                        <Button href="/contact" variant="primary" className="w-full justify-center group/btn shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.6)]">
                                            Demander un Audit Gratuit
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RELATED ARTICLES --- */}
            {data.relatedArticles && data.relatedArticles.length > 0 && (
                <div className="relative z-10 py-24 border-t border-white/5 bg-black/50 backdrop-blur-3xl">
                    <div className="container-fluid max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-bold text-white">Articles recommandés</h2>
                            <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 text-primary font-medium hover:text-white transition-colors">
                                Voir tout le blog <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {data.relatedArticles.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/blog/${article.slug}`}
                                    className="group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_10px_30px_-10px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-1"
                                >
                                    {article.coverImage && (
                                        <div className="h-48 overflow-hidden">
                                            <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                                        {article.excerpt && <p className="text-sm text-gray-400 line-clamp-2">{article.excerpt}</p>}
                                    </div>
                                </Link>
                            ))}
                        </div>
                        
                        <div className="mt-8 text-center sm:hidden">
                            <Button href="/blog" variant="outline" className="w-full justify-center">
                                Voir tous les articles
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    )
}
