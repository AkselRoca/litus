import { mkdirSync, writeFileSync } from 'node:fs'
import { getBlogArticles } from '../src/lib/blog/articles'
import { acquire, editorialDb, getState, listItems, migrate, release } from '../src/lib/editorial/store'
import { planRebalance, rebalanceCalendar } from '../src/lib/editorial/rebalance'
import { STRATEGY_VERSION, pillar } from '../src/lib/editorial/strategy'

async function main() {
  const apply = process.argv.includes('--apply')
  if (apply && !process.argv.includes('--production')) throw new Error('Applying requires --apply --production and an explicitly configured database.')
  if (apply) await migrate()
  const state = await getState('production')
  if (!state) throw new Error('Production calendar not initialized')
  const existing = await listItems('production'), archive = await getBlogArticles()
  if (!archive.length) throw new Error('Archive unavailable; no changes allowed')
  if (state.strategyVersion !== STRATEGY_VERSION) {
    const plan = planRebalance(state, existing, archive)
    console.log(JSON.stringify({ mode: apply ? 'apply' : 'dry-run', existing: existing.length, preserved: plan.preserved, futureSubjects: plan.items.filter(i => !i.held).length, pillars: plan.items.reduce<Record<string, number>>((counts, i) => { const p = pillar(i.targetServicePage); counts[p] = (counts[p] || 0) + 1; return counts }, {}) }))
    if (apply) {
      const owner = await acquire('production')
      if (!owner) throw new Error('Worker busy; retry after its current step')
      try {
        const current = (await getState('production'))!, items = await listItems('production')
        mkdirSync('.tmp/editorial', { recursive: true })
        writeFileSync(`.tmp/editorial/before-118-${Date.now()}.json`, JSON.stringify({ state: current, items }))
        await rebalanceCalendar(current, items, archive, owner)
      } finally { await release('production', owner) }
    }
  } else console.log(JSON.stringify({ mode: 'already-applied', strategyVersion: STRATEGY_VERSION, items: existing.length }))
  if (apply) {
    const after = await listItems('production')
    const kept = existing.filter(i => i.status !== 'IDEA' || i.draft || i.content || i.research || i.refreshOf || i.held)
    if (kept.some(i => !after.some(p => p.id === i.id && JSON.stringify(p) === JSON.stringify(i)))) throw new Error('Preservation check failed; inspect snapshots before any further operation')
    console.log(JSON.stringify({ strategyVersion: (await getState('production'))?.strategyVersion, articlesPreserved: kept.length, archiveRetained: archive.length, items: after.length, next: after.filter(i => i.status === 'IDEA' && !i.held).slice(0, 6).map(i => ({ title: i.workingTitle, at: i.scheduledAt })) }))
  }
}
main().catch(error => { console.error(error instanceof Error ? error.message : 'Operation failed'); process.exitCode = 1 }).finally(() => editorialDb().close())
