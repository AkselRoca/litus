import { withAdmin } from '@/lib/admin/guard'
import { prisma } from '@/lib/database_final'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/admin/leads/export - Export CSV des leads
export const GET = withAdmin(async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        // Filtres
        const type = searchParams.get('type')
        const status = searchParams.get('status')
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')

        // Construire le where
        const where: any = {}

        if (type && type !== 'all') {
            where.type = type
        }

        if (status && status !== 'all') {
            where.treated = status === 'treated'
        }

        if (startDate) {
            where.createdAt = { ...where.createdAt, gte: new Date(startDate) }
        }

        if (endDate) {
            const end = new Date(endDate)
            end.setHours(23, 59, 59, 999)
            where.createdAt = { ...where.createdAt, lte: end }
        }

        const leads = await prisma.lead.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        })

        // Générer le CSV
        const headers = ['ID', 'Type', 'Email', 'Téléphone', 'Source', 'Statut', 'Date', 'Nom', 'Entreprise', 'Service', 'Budget', 'Message']

        const rows = leads.map(lead => {
            const data = lead.data ? JSON.parse(lead.data) : {}
            return [
                lead.id,
                lead.type,
                lead.email || '',
                lead.phone || '',
                lead.source,
                lead.treated ? 'Traité' : 'Nouveau',
                new Date(lead.createdAt).toLocaleDateString('fr-FR'),
                data.nom || data.name || '',
                data.entreprise || data.company || '',
                data.service || '',
                data.budget || '',
                `"${(data.message || '').replace(/"/g, '""')}"`,
            ].join(',')
        })

        const csv = [headers.join(','), ...rows].join('\n')

        // Retourner le fichier CSV
        return new NextResponse(csv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`,
            },
        })

    } catch (error) {
        console.error('Export leads error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
})
