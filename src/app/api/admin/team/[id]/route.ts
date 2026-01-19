import { prisma } from '@/lib/database_final'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// GET /api/admin/team/[id] - Détail d'un membre
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatar: true,
                emailNotifications: true,
                createdAt: true,
                assignedLeads: {
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                }
            }
        })

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: user })

    } catch (error) {
        console.error('Get team member error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

// PATCH /api/admin/team/[id] - Modifier un membre
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const updateData: any = {}

        if (body.name !== undefined) updateData.name = body.name
        if (body.email !== undefined) updateData.email = body.email
        if (body.role !== undefined) updateData.role = body.role
        if (body.avatar !== undefined) updateData.avatar = body.avatar
        if (body.emailNotifications !== undefined) updateData.emailNotifications = body.emailNotifications

        // Si nouveau mot de passe, le hasher
        if (body.password) {
            updateData.password = await bcrypt.hash(body.password, 12)
        }

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatar: true,
                emailNotifications: true,
                createdAt: true,
            }
        })

        return NextResponse.json({ success: true, data: user })

    } catch (error) {
        console.error('Update team member error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

// DELETE /api/admin/team/[id] - Supprimer un membre
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Désassigner les leads avant de supprimer
        await prisma.lead.updateMany({
            where: { assignedToId: id },
            data: { assignedToId: null }
        })

        await prisma.user.delete({ where: { id } })

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error('Delete team member error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
