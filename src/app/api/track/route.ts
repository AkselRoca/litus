import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { type, data } = body

        // Get client info from headers
        const userAgent = request.headers.get('user-agent') || undefined
        const referer = request.headers.get('referer') || undefined

        const { prisma } = await import('@/lib/database_final')

        if (type === 'pageview') {
            // Track page view
            await prisma.pageView.create({
                data: {
                    path: data.path,
                    referrer: data.referrer || referer,
                    userAgent: userAgent,
                    sessionId: data.sessionId,
                },
            })
            return NextResponse.json({ success: true, type: 'pageview' })
        }

        if (type === 'webvital') {
            // Track Web Vital metric
            await prisma.webVital.create({
                data: {
                    name: data.name,
                    value: data.value,
                    rating: data.rating,
                    path: data.path,
                    sessionId: data.sessionId,
                },
            })
            return NextResponse.json({ success: true, type: 'webvital' })
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })

    } catch (error) {
        console.error('[Track API] Error:', error)
        return NextResponse.json({
            error: 'Failed to track',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

// Disable body size limit for this endpoint
export const runtime = 'nodejs'
