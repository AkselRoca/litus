import { mkdirSync, writeFileSync } from 'node:fs'
import { getBlogArticles } from '../src/lib/blog/articles'
import { runTick } from '../src/lib/editorial/workflow'
import { acquire, getState, listItems, migrate, release, saveItem } from '../src/lib/editorial/store'
import { initialTopics, makeItems } from '../src/lib/editorial/calendar'
import { topicSchema } from '../src/lib/editorial/types'
import { prepareArticle } from '../src/lib/blog/prepare-article'
import { escape, articleSchema } from '../src/lib/editorial/core'

async function main() {
  const action = process.argv[2] || 'status'
  const namespace = process.argv[3] === 'production' ? 'production' : 'test'
  await migrate()
  if (action === 'revalidate-test') {
    if (namespace !== 'test') throw new Error('Test namespace required')
    const owner = await acquire('test')
    if (!owner) throw new Error('Busy')
    try {
      const item = (await listItems('test'))[0]
      await saveItem({ ...item, stage: 'LINKS', status: 'REVIEW', corrections: 0, attempts: 0, error: null, nextAttemptAt: null }, owner)
      console.log('Private draft queued for fresh linking and quality validation')
    } finally { await release('test', owner) }
  } else if (action === 'restart-test') {
    if (namespace !== 'test') throw new Error('Test namespace required')
    const owner = await acquire('test')
    if (!owner) throw new Error('Busy')
    try {
      const state = (await getState('test'))!, item = (await listItems('test'))[0]
      mkdirSync('.tmp/editorial', { recursive: true })
      writeFileSync(`.tmp/editorial/previous-test-${Date.now()}.json`, JSON.stringify(item, null, 2))
      const fresh = makeItems([topicSchema.parse(item)], state, item.scheduledAt)[0]
      await saveItem({ ...fresh, id: item.id }, owner)
      console.log('Private test restarted; earlier draft saved locally')
    } finally { await release('test', owner) }
  } else if (action === 'cycle') {
    if (namespace !== 'test') throw new Error('Full cycle command is test-only')
    const archive = await getBlogArticles()
    if (!archive.length) throw new Error('Archive unavailable; blocked')
    for (let count = 0; count < 20; count++) {
      const result = await runTick('test', archive)
      console.log(JSON.stringify(result))
      if (['test-ready', 'FAILED', 'busy', 'paused'].includes(result.status)) break
    }
  } else if (action === 'tick') {
    const archive = await getBlogArticles()
    if (!archive.length) throw new Error('Archive unavailable; blocked')
    console.log(JSON.stringify(await runTick(namespace, archive)))
  } else if (action === 'retry-stage') {
    const owner = await acquire(namespace)
    if (!owner) throw new Error('Busy')
    try {
      const items = await listItems(namespace)
      const item = items.find(i => i.status === 'FAILED')
      if (item) { await saveItem({ ...item, attempts: 0, nextAttemptAt: new Date().toISOString() }, owner); console.log('Failed stage requeued') }
    } finally { await release(namespace, owner) }
  } else if (action === 'calendar') {
    mkdirSync('docs/editorial', { recursive: true })
    writeFileSync('docs/editorial/initial-calendar.json', JSON.stringify(initialTopics(), null, 2) + '\n')
    console.log('Initial calendar exported')
  } else if (action === 'preview') {
    const item = (await listItems(namespace)).find(i => i.draft && i.content && i.images?.length === 3)
    if (!item) throw new Error('Preview not ready')
    mkdirSync('.tmp/editorial', { recursive: true })
    const content = prepareArticle(item.content!, item.images!.slice(1)).content
    const css = `/blog-reading.css`
    const html = `<!doctype html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(item.seo!.title)}</title><meta name="description" content="${escape(item.seo!.description)}"><link rel="canonical" href="https://litus.fr/blog/${item.slug}"><link rel="stylesheet" href="${css}"><style>:root{--litus-orange:#ef632d;--litus-heading-accent:#b74e27}body{margin:0;background:#fbf8f2;color:#193044;font-family:Georgia,serif}main{width:min(860px,calc(100% - 40px));margin:45px auto}h1{font-size:clamp(30px,5vw,48px);line-height:1.12}img{width:100%;height:auto}a{color:#a64323}.blog-reading-content{--reading-line:#e3dcd0;--reading-surface:#f5f1e9;--reading-muted:#596673;--reading-ink:#193044}figure{margin:30px 0}figcaption{font-size:13px}figcaption small{display:block}</style><script type="application/ld+json">${JSON.stringify(articleSchema(item)).replace(/</g, '\\u003c')}</script></head><body><main><p>APERÇU PRIVÉ · LITUS INSIDE</p><h1>${escape(item.draft!.title)}</h1><p>${escape(item.draft!.excerpt)}</p><img src="${escape(item.images![0].src)}" alt="${escape(item.images![0].alt)}" width="${item.images![0].width}" height="${item.images![0].height}"><article class="blog-reading-content">${content}</article></main></body></html>`
    writeFileSync('.tmp/editorial/preview.html', html)
    writeFileSync('.tmp/editorial/test-result.json', JSON.stringify(item, null, 2))
    console.log(JSON.stringify({ path: '.tmp/editorial/preview.html', status: item.status, score: item.qualityScore, images: item.images!.length, sources: item.research!.sources.length, publishedAt: item.publishedAt }))
  } else {
    const state = await getState(namespace)
    const items = await listItems(namespace)
    console.log(JSON.stringify({ state, items: items.filter(i => i.status !== 'IDEA').map(i => ({ id: i.id, title: i.workingTitle, stage: i.stage, status: i.status, error: i.error, score: i.qualityScore, images: i.images?.length, sources: i.research?.sources.map(s => ({ title: s.title, url: s.url })), gate: i.gate, review: i.review })), total: items.length }, null, 2))
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1 })
