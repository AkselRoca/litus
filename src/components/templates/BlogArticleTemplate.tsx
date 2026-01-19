import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface BlogArticleData {
    slug: string
    title: string
    excerpt: string
    content: React.ReactNode
    author: {
        name: string
        role: string
    }
    publishedAt: string
    readTime: string
    category: string
    relatedArticles?: { slug: string; title: string }[]
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
        },
    }
}

export function BlogArticleTemplate({ data }: BlogArticleTemplateProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero */}
            <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black">
                <div className="container-fluid">
                    <div className="max-w-3xl mx-auto">
                        {/* Back link */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour au blog
                        </Link>

                        {/* Category */}
                        <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
                            {data.category}
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            {data.title}
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            {data.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <span>{data.author.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>{data.publishedAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{data.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container-fluid">
                    <div className="max-w-3xl mx-auto">
                        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                            {data.content}
                        </article>
                    </div>
                </div>
            </section>

            {/* Related Articles */}
            {data.relatedArticles && data.relatedArticles.length > 0 && (
                <section className="py-16 bg-gray-50 dark:bg-gray-950">
                    <div className="container-fluid">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                                Articles similaires
                            </h2>
                            <div className="space-y-4">
                                {data.relatedArticles.map((article) => (
                                    <Link
                                        key={article.slug}
                                        href={`/blog/${article.slug}`}
                                        className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-colors group"
                                    >
                                        <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                            {article.title}
                                        </span>
                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16">
                <div className="container-fluid">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Besoin d'aide pour votre projet ?
                            </h2>
                            <p className="text-gray-300 mb-8">
                                Nos experts sont là pour vous accompagner dans votre stratégie digitale.
                            </p>
                            <Button href="/contact" variant="primary" size="lg">
                                Demander un devis gratuit
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
