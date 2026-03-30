import { prisma } from '@/lib/database_final'
import { NextResponse } from 'next/server'

// GET /api/admin/dashboard/stats - Stats pour le dashboard
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const startDateStr = searchParams.get('startDate')
        const endDateStr = searchParams.get('endDate')

        const startDate = startDateStr ? new Date(startDateStr + 'T00:00:00') : null
        const endDate = endDateStr ? new Date(endDateStr + 'T23:59:59') : null

        // Créer le filtre de date
        const dateFilter = startDate && endDate ? {
            createdAt: {
                gte: startDate,
                lte: endDate
            }
        } : {}

        // Stats leads (filtrées par date)
        const allLeads = await prisma.lead.findMany()
        const leads = startDate && endDate
            ? allLeads.filter(l => {
                const d = new Date(l.createdAt)
                return d >= startDate && d <= endDate
            })
            : allLeads

        // Calcul des stats de leads
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

        const leadsInPeriod = leads.length
        const leadsThisMonth = allLeads.filter(l => new Date(l.createdAt) >= startOfMonth).length
        const leadsLastMonth = allLeads.filter(l => new Date(l.createdAt) >= lastMonth && new Date(l.createdAt) <= endOfLastMonth).length
        const leadsChange = leadsLastMonth > 0 ? Math.round(((leadsThisMonth - leadsLastMonth) / leadsLastMonth) * 100) : 0

        // Stats CRM (sur les leads filtrés)
        const signedLeads = leads.filter(l => (l as any).status === 'signed')
        const totalOneShot = signedLeads.reduce((sum, l) => sum + ((l as any).oneShot || 0), 0)
        const totalMonthly = signedLeads.reduce((sum, l) => sum + ((l as any).monthlyAmount || 0), 0)

        // Taux de conversion (sur les leads filtrés)
        const conversionRate = leads.length > 0 ? ((signedLeads.length / leads.length) * 100).toFixed(1) : '0'

        // Articles publiés
        const articles = await prisma.blogPost.findMany({ where: { published: true } })
        const articlesInPeriod = startDate && endDate
            ? articles.filter(a => {
                const d = new Date(a.publishedAt || a.createdAt)
                return d >= startDate && d <= endDate
            }).length
            : articles.length

        // Projets
        const projects = await prisma.project.count()

        // Médias (si table existe)
        let mediaCount = 0
        let recentMedia: any[] = []
        try {
            const media = await (prisma as any).media.findMany({
                orderBy: { createdAt: 'desc' },
                take: 6,
            })
            mediaCount = await (prisma as any).media.count()
            recentMedia = media
        } catch (e) {
            // Table media peut ne pas exister
        }

        // Analytics réelles depuis PageView (filtrées par date)
        let visitors = 0
        let pageViews = 0
        try {
            const pvDateFilter = startDate && endDate ? {
                createdAt: { gte: startDate, lte: endDate }
            } : {}

            const pageViewsData = await (prisma as any).pageView.findMany({
                where: pvDateFilter
            })

            pageViews = pageViewsData.length
            const uniqueSessions = new Set(pageViewsData.map((pv: any) => pv.sessionId).filter(Boolean))
            visitors = uniqueSessions.size
        } catch (e) {
            // Table PageView peut ne pas exister
        }

        // Leads récents (toujours les 5 derniers, indépendamment du filtre)
        const recentLeads = allLeads
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
            .map(lead => ({
                ...lead,
                parsedData: lead.data ? JSON.parse(lead.data) : {},
            }))

        // Dernier article
        const lastArticle = articles[0] || null

        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    leadsThisMonth: leadsInPeriod,
                    leadsChange,
                    totalLeads: leads.length,
                    conversionRate: `${conversionRate}%`,
                    publishedArticles: articlesInPeriod,
                    articlesThisMonth: articlesInPeriod,
                    totalOneShot,
                    totalMonthly,
                    projects,
                    media: mediaCount,
                    // Stats par statut CRM
                    newLeads: leads.filter(l => (l as any).status === 'new' || !(l as any).status).length,
                    contacted: leads.filter(l => (l as any).status === 'contacted').length,
                    quoteSent: leads.filter(l => (l as any).status === 'quote_sent').length,
                    signed: signedLeads.length,
                    refused: leads.filter(l => (l as any).status === 'refused').length,
                    // Analytics réelles
                    visitorsToday: visitors,
                    pageViewsToday: pageViews,
                },
                recentLeads,
                lastArticle,
                recentMedia,
            }
        })

    } catch (error) {
        console.error('Dashboard stats error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
