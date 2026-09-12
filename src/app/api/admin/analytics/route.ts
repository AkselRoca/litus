import { withAdmin } from '@/lib/admin/guard'
import { NextResponse } from 'next/server'

export const GET = withAdmin(async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7d' // 24h, 7d, 30d

    try {
        const { prisma } = await import('@/lib/database_final')

        // Calculate date range
        const now = new Date()
        const from = new Date()
        if (period === '24h') from.setHours(from.getHours() - 24)
        else if (period === '7d') from.setDate(from.getDate() - 7)
        else from.setDate(from.getDate() - 30)

        // Get page views from our database
        const pageViews = await prisma.pageView.findMany({
            where: {
                createdAt: { gte: from }
            },
            orderBy: { createdAt: 'desc' }
        })

        // Get unique visitors (by sessionId)
        const uniqueSessionIds = new Set(pageViews.map(pv => pv.sessionId).filter(Boolean))
        const totalVisitors = uniqueSessionIds.size

        // Get Web Vitals
        const webVitals = await prisma.webVital.findMany({
            where: {
                createdAt: { gte: from }
            }
        })

        // Calculate Web Vitals averages
        const vitalsByName: Record<string, { values: number[], ratings: string[] }> = {}
        webVitals.forEach(wv => {
            if (!vitalsByName[wv.name]) {
                vitalsByName[wv.name] = { values: [], ratings: [] }
            }
            vitalsByName[wv.name].values.push(wv.value)
            vitalsByName[wv.name].ratings.push(wv.rating)
        })

        const getAvgVital = (name: string) => {
            const data = vitalsByName[name]
            if (!data || data.values.length === 0) return null
            const avg = data.values.reduce((a, b) => a + b, 0) / data.values.length
            // Determine rating based on majority
            const ratings = data.ratings
            const goodCount = ratings.filter(r => r === 'good').length
            const rating = goodCount > ratings.length / 2 ? 'good' :
                ratings.filter(r => r === 'poor').length > ratings.length / 2 ? 'poor' : 'needs-improvement'
            return { value: Math.round(avg * 100) / 100, rating }
        }

        // Group page views by path
        const pathCounts: Record<string, number> = {}
        pageViews.forEach(pv => {
            pathCounts[pv.path] = (pathCounts[pv.path] || 0) + 1
        })
        const topPages = Object.entries(pathCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([path, views]) => ({
                path,
                views,
                title: path === '/' ? 'Accueil' : path.replace(/^\//, '').charAt(0).toUpperCase() + path.slice(2)
            }))

        // Group by referrer (sources)
        const referrerCounts: Record<string, number> = {}
        pageViews.forEach(pv => {
            const ref = pv.referrer ? new URL(pv.referrer).hostname : 'Direct'
            referrerCounts[ref] = (referrerCounts[ref] || 0) + 1
        })
        const colors = ['#f97316', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444']
        const sources = Object.entries(referrerCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, value], i) => ({ name, value, color: colors[i] }))

        // Group by device (from userAgent)
        const deviceCounts = { Mobile: 0, Desktop: 0, Tablet: 0 }
        pageViews.forEach(pv => {
            if (!pv.userAgent) return
            const ua = pv.userAgent.toLowerCase()
            if (/mobile|android|iphone/.test(ua)) deviceCounts.Mobile++
            else if (/tablet|ipad/.test(ua)) deviceCounts.Tablet++
            else deviceCounts.Desktop++
        })
        const devices = Object.entries(deviceCounts)
            .filter(([_, v]) => v > 0)
            .map(([name, value]) => ({ name, value }))

        // Daily visitors (last 7 days)
        const dailyData: { day: string; visitors: number }[] = []
        for (let i = 6; i >= 0; i--) {
            const d = new Date()
            d.setDate(d.getDate() - i)
            const dayStart = new Date(d.setHours(0, 0, 0, 0))
            const dayEnd = new Date(d.setHours(23, 59, 59, 999))

            const dayViews = pageViews.filter(pv => {
                const pvDate = new Date(pv.createdAt)
                return pvDate >= dayStart && pvDate <= dayEnd
            })
            const daySessions = new Set(dayViews.map(pv => pv.sessionId).filter(Boolean))

            dailyData.push({
                day: dayStart.toLocaleDateString('fr-FR', { weekday: 'short' }),
                visitors: daySessions.size
            })
        }

        return NextResponse.json({
            success: true,
            source: 'database',
            data: {
                visitors: {
                    total: totalVisitors,
                    change: 0,
                },
                pageViews: {
                    total: pageViews.length,
                },
                dailyVisitors: dailyData,
                topPages,
                sources,
                devices,
                metrics: {
                    bounceRate: null,
                    avgDuration: null,
                    pagesPerSession: totalVisitors > 0 ? Math.round((pageViews.length / totalVisitors) * 10) / 10 : null,
                },
                webVitals: {
                    LCP: getAvgVital('LCP'),
                    FID: getAvgVital('FID'),
                    CLS: getAvgVital('CLS'),
                    TTFB: getAvgVital('TTFB'),
                    FCP: getAvgVital('FCP'),
                }
            }
        })

    } catch (error) {
        console.error('[Analytics API] Error:', error)
        return NextResponse.json({
            success: false,
            source: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
        }, { status: 500 })
    }
})
