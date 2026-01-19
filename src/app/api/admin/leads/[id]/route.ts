import { prisma } from '@/lib/database_final'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/admin/leads/[id] - Détail d'un lead
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const lead = await prisma.lead.findUnique({ where: { id } })
        if (!lead) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            data: {
                ...lead,
                parsedData: lead.data ? JSON.parse(lead.data) : {},
            }
        })

    } catch (error) {
        console.error('Get lead error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

// PATCH /api/admin/leads/[id] - Modifier un lead
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const updateData: any = {}

        // Champs de base
        if (body.treated !== undefined) updateData.treated = body.treated
        if (body.email !== undefined) updateData.email = body.email
        if (body.phone !== undefined) updateData.phone = body.phone
        if (body.type !== undefined) updateData.type = body.type
        if (body.data !== undefined) updateData.data = JSON.stringify(body.data)

        // Champs CRM
        if (body.status !== undefined) updateData.status = body.status
        if (body.oneShot !== undefined) updateData.oneShot = body.oneShot
        if (body.monthlyAmount !== undefined) updateData.monthlyAmount = body.monthlyAmount
        if (body.contractMonths !== undefined) updateData.contractMonths = body.contractMonths
        if (body.notes !== undefined) updateData.notes = body.notes

        // Mise à jour du nom/entreprise dans data
        if (body.parsedData !== undefined) {
            const lead = await prisma.lead.findUnique({ where: { id } })
            const existingData = lead?.data ? JSON.parse(lead.data) : {}
            updateData.data = JSON.stringify({ ...existingData, ...body.parsedData })
        }

        const lead = await prisma.lead.update({
            where: { id },
            data: updateData,
        })

        return NextResponse.json({
            success: true,
            data: {
                ...lead,
                parsedData: lead.data ? JSON.parse(lead.data) : {},
            }
        })

    } catch (error) {
        console.error('Update lead error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

// DELETE /api/admin/leads/[id] - Supprimer un lead
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await prisma.lead.delete({ where: { id } })

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error('Delete lead error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
