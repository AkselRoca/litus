import { prisma } from '@/lib/database_final'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/admin/blog - Liste tous les articles
export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        name: true,
                        avatar: true,
                        role: true,
                    }
                }
            }
        })

        // Adapter le format pour le frontend admin
        const formattedPosts = posts.map(post => ({
            ...post,
            category: 'Blog', // Par défaut, on peut rajouter la gestion des catégories plus tard
            createdAt: post.createdAt.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        }))

        return NextResponse.json({ success: true, data: formattedPosts })
    } catch (error) {
        console.error('Fetch blog error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

// POST /api/admin/blog - Créer un article
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { title, slug, excerpt, content, metaTitle, metaDescription, published, authorId, coverImage, publishedAt } = body

        if (!title || !slug || !content) {
            return NextResponse.json({ success: false, error: 'Titre, slug et contenu requis' }, { status: 400 })
        }

        const newPost = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt: excerpt || '',
                content,
                metaTitle,
                metaDesc: metaDescription,
                published: published || false,
                authorId: authorId || null,
                coverImage: coverImage || null,
                publishedAt: publishedAt ? new Date(publishedAt) : (published ? new Date() : null),
            }
        })

        return NextResponse.json({ success: true, data: newPost })
    } catch (error) {
        console.error('Create blog error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
