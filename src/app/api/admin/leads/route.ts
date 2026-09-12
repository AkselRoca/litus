import { withAdmin } from '@/lib/admin/guard'
import { prisma } from '@/lib/database_final'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/admin/leads - Liste des leads avec filtres
export const GET = withAdmin(async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        const type = searchParams.get('type')
        const status = searchParams.get('status')
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')
        const search = searchParams.get('search')

        const where: any = {}

        if (type && type !== 'all') {
            where.type = type
        }

        // Filter by CRM status
        if (status && status !== 'all') {
            where.status = status
        }

        if (startDate) {
            where.createdAt = { ...where.createdAt, gte: new Date(startDate) }
        }

        if (endDate) {
            const end = new Date(endDate)
            end.setHours(23, 59, 59, 999)
            where.createdAt = { ...where.createdAt, lte: end }
        }

        if (search) {
            where.OR = [
                { email: { contains: search } },
                { data: { contains: search } },
                { notes: { contains: search } },
            ]
        }

        const leads = await prisma.lead.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        })

        const parsedLeads = leads.map(lead => ({
            ...lead,
            parsedData: lead.data ? JSON.parse(lead.data) : {},
        }))

        // Stats par statut CRM
        const allLeads = await prisma.lead.findMany()
        const stats = {
            total: allLeads.length,
            new: allLeads.filter(l => l.status === 'new').length,
            contacted: allLeads.filter(l => l.status === 'contacted').length,
            quote_sent: allLeads.filter(l => l.status === 'quote_sent').length,
            signed: allLeads.filter(l => l.status === 'signed').length,
            refused: allLeads.filter(l => l.status === 'refused').length,
            // Stats financières
            totalOneShot: allLeads.filter(l => l.status === 'signed').reduce((sum, l) => sum + (l.oneShot || 0), 0),
            totalMonthly: allLeads.filter(l => l.status === 'signed').reduce((sum, l) => sum + (l.monthlyAmount || 0), 0),
        }

        return NextResponse.json({ success: true, data: parsedLeads, stats })

    } catch (error) {
        console.error('List leads error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
})

// POST /api/admin/leads - Créer un lead manuellement
export const POST = withAdmin(async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const lead = await prisma.lead.create({
            data: {
                type: body.type || 'manual',
                email: body.email,
                phone: body.phone || null,
                data: JSON.stringify(body.data || {}),
                source: body.source || 'Admin',
                status: 'new',
                treated: false,
            }
        })

        return NextResponse.json({ success: true, data: lead })

    } catch (error) {
        console.error('Create lead error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
})

