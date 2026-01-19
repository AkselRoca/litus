import { prisma } from '@/lib/database_final'
import { NextResponse } from 'next/server'

// GET /api/admin/dashboard/stats - Stats pour le dashboard
export async function GET() {
    try {
        // Stats leads
        const leads = await prisma.lead.findMany()
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

        const leadsThisMonth = leads.filter(l => new Date(l.createdAt) >= startOfMonth).length
        const leadsLastMonth = leads.filter(l => new Date(l.createdAt) >= lastMonth && new Date(l.createdAt) <= endOfLastMonth).length
        const leadsChange = leadsLastMonth > 0 ? Math.round(((leadsThisMonth - leadsLastMonth) / leadsLastMonth) * 100) : 0

        // Stats CRM
        const signedLeads = leads.filter(l => (l as any).status === 'signed')
        const totalOneShot = signedLeads.reduce((sum, l) => sum + ((l as any).oneShot || 0), 0)
        const totalMonthly = signedLeads.reduce((sum, l) => sum + ((l as any).monthlyAmount || 0), 0)

        // Taux de conversion
        const conversionRate = leads.length > 0 ? ((signedLeads.length / leads.length) * 100).toFixed(1) : '0'

        // Articles publiés
        const articles = await prisma.blogPost.findMany({ where: { published: true } })
        const articlesThisMonth = articles.filter(a => new Date(a.publishedAt || a.createdAt) >= startOfMonth).length

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

        // Leads récents
        const recentLeads = leads
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
                    leadsThisMonth,
                    leadsChange,
                    totalLeads: leads.length,
                    conversionRate: `${conversionRate}%`,
                    publishedArticles: articles.length,
                    articlesThisMonth,
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
