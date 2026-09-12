import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { authorizeCron } from '@/lib/editorial/core'
import { runTick, safeError } from '@/lib/editorial/workflow'
import { getBlogArticles } from '@/lib/blog/articles'

export const runtime = 'nodejs'
export const maxDuration = 300
export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  if (!authorizeCron(request.headers.get('authorization'))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const namespace = request.nextUrl.searchParams.get('mode') === 'test' ? 'test' : 'production'
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production' && namespace === 'production') return NextResponse.json({ error: 'Production deployment required' }, { status: 403 })
  try {
    const archive = await getBlogArticles()
    if (!archive.length) return NextResponse.json({ error: 'Existing archive unavailable; generation blocked' }, { status: 503 })
    const result = await runTick(namespace, archive)
    if (result.status === 'published' || result.status === 'updated' || result.status === 'backlinks-processed') {
      revalidatePath('/blog', 'layout')
      revalidatePath('/blog')
      if ('slug' in result && result.slug) revalidatePath(`/blog/${result.slug}`)
      revalidatePath('/blog-sitemap.xml')
    }
    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('[Editorial] tick failed:', safeError(error))
    return NextResponse.json({ error: safeError(error) }, { status: 503 })
  }
}
