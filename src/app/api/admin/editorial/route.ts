import { withAdmin } from '@/lib/admin/guard'
import { NextRequest, NextResponse } from 'next/server'
import { authorizeCron, escape } from '@/lib/editorial/core'
import { control, isEditor } from '@/lib/editorial/admin'
import { getState, listItems, recentEvents } from '@/lib/editorial/store'
import { prepareArticle } from '@/lib/blog/prepare-article'

export const dynamic = 'force-dynamic'
export const GET = withAdmin(async function GET(request: NextRequest) {
  if (!authorizeCron(request.headers.get('authorization')) && !await isEditor()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const namespace = request.nextUrl.searchParams.get('mode') === 'test' ? 'test' : 'production'
  const [state, items, events] = await Promise.all([getState(namespace), listItems(namespace), recentEvents(namespace)])
  if (request.nextUrl.searchParams.get('preview') === '1') {
    const item = items.find(i => i.draft && i.content && i.images?.length === 3)
    if (!item) return NextResponse.json({ error: 'Preview not ready' }, { status: 404 })
    const content = prepareArticle(item.content!, item.images!.slice(1)).content
    return new Response(`<!doctype html><html lang="fr"><head><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(item.draft!.title)}</title><style>body{margin:0;background:#fbf8f2;color:#193044;font:18px/1.8 Georgia,serif}main{width:min(850px,calc(100% - 40px));margin:50px auto}h1{font-size:clamp(30px,5vw,48px);line-height:1.12}img{width:100%;height:auto}a{color:#a5411d}figure{margin:28px 0}figcaption{font:13px/1.5 sans-serif}small{display:block}.editorial-table-scroll{overflow:auto}td,th{padding:10px;border:1px solid #ddd}table{border-collapse:collapse}.editorial-context-cta{padding:24px;background:#f2ebe0}</style></head><body><main><p>APERÇU PRIVÉ · LITUS INSIDE</p><h1>${escape(item.draft!.title)}</h1><p>${escape(item.draft!.excerpt)}</p><img src="${escape(item.images![0].src)}" alt="${escape(item.images![0].alt)}" width="${item.images![0].width}" height="${item.images![0].height}"><article>${content}</article></main></body></html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } })
  }
  return NextResponse.json({ state, items, events }, { headers: { 'Cache-Control': 'no-store' } })
})
export const POST = withAdmin(async function POST(request: NextRequest) {
  // Non-browser operations require the cron credential. Browser mutations use CSRF-protected server actions.
  if (!authorizeCron(request.headers.get('authorization'))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const input = await request.json()
  if (!['production', 'test'].includes(input.namespace) || !['pause', 'resume', 'retry', 'refresh'].includes(input.action)) return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  await control(input.namespace, input.action, input.id)
  return NextResponse.json({ success: true })
})
