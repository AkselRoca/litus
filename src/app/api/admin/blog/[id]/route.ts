import { prisma } from '@/lib/database_final'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const post = await prisma.blogPost.findUnique({
            where: { id: params.id },
            include: {
                author: {
                    select: { name: true, avatar: true }
                }
            }
        })

        if (!post) {
            return NextResponse.json({ success: false, error: 'Article introuvable' }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: post })
    } catch (error) {
        console.error('Fetch single blog error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()
        const { title, slug, excerpt, content, metaTitle, metaDescription, published, authorId, coverImage, publishedAt } = body

        // Handle publishedAt logic: if published and no publishedAt yet, set to now. 
        // If the user sends a specific date, we use it.
        let actualPublishedAt = publishedAt ? new Date(publishedAt) : undefined;
        if (published && !actualPublishedAt) {
            actualPublishedAt = new Date();
        } else if (!published) {
            actualPublishedAt = null as any; // Reset published date if unpublished
        }

        const dataToUpdate: any = {
            title,
            slug,
            excerpt,
            content,
            metaTitle,
            metaDesc: metaDescription,
            published,
            authorId: authorId || null,
            coverImage: coverImage !== undefined ? coverImage : undefined,
        }

        if (actualPublishedAt !== undefined) {
            dataToUpdate.publishedAt = actualPublishedAt;
        }

        const updatedPost = await prisma.blogPost.update({
            where: { id: params.id },
            data: dataToUpdate
        })

        return NextResponse.json({ success: true, data: updatedPost })
    } catch (error) {
        console.error('Update blog error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.blogPost.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Delete blog error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
