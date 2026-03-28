import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { BlogArticleTemplate, generateBlogArticleMetadata } from '@/components/templates/BlogArticleTemplate'
import { prisma } from '@/lib/prisma'

export const revalidate = 60 // Revalidation optionnelle pour la mise en cache (1 minute)

interface PageProps {
    params: {
        slug: string
    }
}

// Génération dynamique des métadonnées
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = await prisma.blogPost.findUnique({
        where: { slug: params.slug },
        include: { author: true } // On a besoin de l'auteur pour les metas
    })

    if (!post) {
        return { title: 'Article introuvable | Litus' }
    }

    return generateBlogArticleMetadata({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        content: <></>, // content not needed for meta
        author: {
            name: post.author?.name || 'Litus',
            role: post.author?.role || 'Équipe Litus',
            avatar: post.author?.avatar,
        },
        publishedAt: post.publishedAt ? post.publishedAt.toLocaleDateString('fr-FR') : post.createdAt.toLocaleDateString('fr-FR'),
        readTime: '5 min', // A implémenter dynamiquement si souhaité
        category: post.category || 'Général',
    })
}

// Fonction pour générer les params statiques au build (optionnel mais bon pour les perfs)
export async function generateStaticParams() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true }
    })
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage({ params }: PageProps) {
    const post = await prisma.blogPost.findUnique({
        where: { slug: params.slug },
        include: { author: true }
    })

    if (!post || !post.published) {
        notFound()
    }

    // Calcul très basique du temps de lecture (approx 200 mots/min)
    const wordCount = post.content.split(/\s+/).length
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))

    const articleData = {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        // Puisque le contenu est censé être du HTML généré depuis l'admin
        content: <div dangerouslySetInnerHTML={{ __html: post.content }} className="custom-html-content" />,
        author: {
            name: post.author?.name || 'Équipe Litus',
            role: post.author?.role || 'Expert Digital',
            avatar: post.author?.avatar,
        },
        publishedAt: post.publishedAt ? post.publishedAt.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : post.createdAt.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        readTime: `${readTimeMinutes} min`,
        category: post.category || 'Actualités',
        relatedArticles: [] // On pourrait fetch 3 articles de la même catégorie ici
    }

    return <BlogArticleTemplate data={articleData} />
}
