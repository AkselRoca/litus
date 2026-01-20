import { NextResponse } from 'next/server'

// Vercel Analytics API endpoint
const VERCEL_ANALYTICS_API = 'https://vercel.com/api/web-analytics'

interface VercelAnalyticsResponse {
    data: any
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7d' // 24h, 7d, 30d

    // Check for Vercel token
    const token = process.env.VERCEL_API_TOKEN
    const projectId = process.env.VERCEL_PROJECT_ID
    const teamId = process.env.VERCEL_TEAM_ID // Optional

    if (!token || !projectId) {
        // Return mock data if no token configured
        return NextResponse.json({
            success: true,
            source: 'mock',
            message: 'Vercel API token not configured - showing demo data',
            data: getMockData(period)
        })
    }

    try {
        // Calculate date range
        const now = new Date()
        const from = new Date()
        if (period === '24h') from.setHours(from.getHours() - 24)
        else if (period === '7d') from.setDate(from.getDate() - 7)
        else from.setDate(from.getDate() - 30)

        const fromStr = from.toISOString()
        const toStr = now.toISOString()

        // Build URL with team ID if present
        const baseUrl = `${VERCEL_ANALYTICS_API}/timeseries`
        const queryParams = new URLSearchParams({
            from: fromStr,
            to: toStr,
            projectId: projectId,
            ...(teamId && { teamId })
        })

        // Fetch visitors data
        const visitorsRes = await fetch(`${baseUrl}?${queryParams}&metric=visitors`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        // Fetch page views data
        const pageViewsRes = await fetch(`${baseUrl}?${queryParams}&metric=pageViews`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        // Fetch top pages
        const topPagesUrl = `${VERCEL_ANALYTICS_API}/pages?${queryParams}&limit=10`
        const topPagesRes = await fetch(topPagesUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        // Fetch referrer data (sources)
        const referrersUrl = `${VERCEL_ANALYTICS_API}/referrers?${queryParams}&limit=10`
        const referrersRes = await fetch(referrersUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        // Fetch device data
        const devicesUrl = `${VERCEL_ANALYTICS_API}/devices?${queryParams}`
        const devicesRes = await fetch(devicesUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        // Parse all responses
        const [visitorsData, pageViewsData, topPagesData, referrersData, devicesData] = await Promise.all([
            visitorsRes.ok ? visitorsRes.json() : null,
            pageViewsRes.ok ? pageViewsRes.json() : null,
            topPagesRes.ok ? topPagesRes.json() : null,
            referrersRes.ok ? referrersRes.json() : null,
            devicesRes.ok ? devicesRes.json() : null,
        ])

        // Calculate totals
        let totalVisitors = 0
        let totalPageViews = 0
        const dailyData: { day: string; visitors: number }[] = []

        if (visitorsData?.data) {
            visitorsData.data.forEach((item: any) => {
                totalVisitors += item.value || 0
                dailyData.push({
                    day: new Date(item.timestamp).toLocaleDateString('fr-FR', { weekday: 'short' }),
                    visitors: item.value || 0
                })
            })
        }

        if (pageViewsData?.data) {
            pageViewsData.data.forEach((item: any) => {
                totalPageViews += item.value || 0
            })
        }

        // Format top pages
        const topPages = topPagesData?.data?.map((page: any) => ({
            path: page.key,
            views: page.value,
            title: page.key === '/' ? 'Accueil' : page.key
        })) || []

        // Format sources
        const sources = referrersData?.data?.map((ref: any, i: number) => ({
            name: ref.key || 'Direct',
            value: ref.value,
            color: ['#f97316', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444'][i % 5]
        })) || []

        // Format devices
        const devices = devicesData?.data?.map((device: any) => ({
            name: device.key,
            value: device.value
        })) || []

        return NextResponse.json({
            success: true,
            source: 'vercel',
            data: {
                visitors: {
                    total: totalVisitors,
                    change: 0, // Would need comparison data
                },
                pageViews: {
                    total: totalPageViews,
                },
                dailyVisitors: dailyData.slice(-7), // Last 7 days
                topPages: topPages.slice(0, 6),
                sources,
                devices,
                metrics: {
                    bounceRate: 42, // Not available in basic API
                    avgDuration: '2m 34s', // Not available in basic API
                    pagesPerSession: totalPageViews / (totalVisitors || 1),
                }
            }
        })

    } catch (error) {
        console.error('[Analytics API] Error:', error)
        return NextResponse.json({
            success: false,
            source: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
            data: getMockData(period)
        }, { status: 500 })
    }
}

function getMockData(period: string) {
    const multiplier = period === '24h' ? 1 : period === '7d' ? 7 : 30

    return {
        visitors: {
            total: 47 * multiplier,
            change: 12,
        },
        pageViews: {
            total: 156 * multiplier,
        },
        dailyVisitors: [
            { day: 'Lun', visitors: 42 },
            { day: 'Mar', visitors: 38 },
            { day: 'Mer', visitors: 56 },
            { day: 'Jeu', visitors: 48 },
            { day: 'Ven', visitors: 62 },
            { day: 'Sam', visitors: 35 },
            { day: 'Dim', visitors: 31 },
        ],
        topPages: [
            { path: '/', views: 456, title: 'Accueil' },
            { path: '/services', views: 234, title: 'Services' },
            { path: '/contact', views: 189, title: 'Contact' },
            { path: '/blog', views: 156, title: 'Blog' },
            { path: '/realisations', views: 134, title: 'Réalisations' },
            { path: '/estimateur', views: 98, title: 'Estimateur' },
        ],
        sources: [
            { name: 'Direct', value: 45, color: '#f97316' },
            { name: 'Google', value: 32, color: '#3b82f6' },
            { name: 'Réseaux sociaux', value: 15, color: '#8b5cf6' },
            { name: 'Referral', value: 8, color: '#10b981' },
        ],
        devices: [
            { name: 'Mobile', value: 58 },
            { name: 'Desktop', value: 38 },
            { name: 'Tablet', value: 4 },
        ],
        metrics: {
            bounceRate: 42,
            avgDuration: '2m 34s',
            pagesPerSession: 2.8,
        }
    }
}
