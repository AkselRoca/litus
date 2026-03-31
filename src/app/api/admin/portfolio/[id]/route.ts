import { prisma } from '@/lib/database_final'
import { NextRequest, NextResponse } from 'next/server'
import { deleteImage } from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache'

// PATCH /api/admin/portfolio/[id] - Toggle visibility, etc.
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const updateData: Record<string, any> = {}
        if (body.visible !== undefined) updateData.visible = body.visible
        if (body.featured !== undefined) updateData.featured = body.featured

        const project = await prisma.project.update({
            where: { id },
            data: updateData,
        })

        // Forcer la re-génération des pages qui affichent le portfolio
        revalidatePath('/realisations')
        revalidatePath('/')
        revalidatePath('/admin/portfolio')

        return NextResponse.json({ success: true, data: project })
    } catch (error) {
        console.error('Update project error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

// DELETE /api/admin/portfolio/[id] - Supprimer un projet + image Cloudinary
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Récupérer le projet pour l'image
        const project = await prisma.project.findUnique({ where: { id } })
        if (!project) {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 })
        }

        // Supprimer l'image de Cloudinary
        if (project.imageUrl?.includes('cloudinary.com')) {
            try {
                const match = project.imageUrl.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/)
                if (match?.[1]) {
                    await deleteImage(match[1])
                }
            } catch (e) {
                console.warn('Cloudinary delete failed for project image:', e)
            }
        }

        await prisma.project.delete({ where: { id } })

        revalidatePath('/realisations')
        revalidatePath('/')
        revalidatePath('/admin/portfolio')

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Delete project error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
