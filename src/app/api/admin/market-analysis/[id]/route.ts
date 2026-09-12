import { withAdmin } from '@/lib/admin/guard'
/**
 * API Admin - Suppression d'une analyse de marché
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export const DELETE = withAdmin(async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        const { id } = await params
        const { prisma } = await import('@/lib/database_final')

        await prisma.marketAnalysis.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('[Admin Market Analysis Delete] Error:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la suppression' },
            { status: 500 }
        )
    }
})
