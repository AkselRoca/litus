import { INTERVAL, normalize, similarity } from './core'
import { makeItems } from './calendar'
import { STRATEGY_VERSION, strategyTopics } from './strategy'
import { commitCalendar } from './store'
import type { Item, State } from './types'

type Archive = { title: string; slug: string; excerpt: string }
export function planRebalance(state: State, items: Item[], archive: Archive[], now = new Date()) {
  const replaceable = items.filter(i => i.status === 'IDEA' && !i.draft && !i.content && !i.research && !i.refreshOf && !i.held)
  const ids = new Set(replaceable.map(i => i.id))
  const preserved = items.filter(i => !ids.has(i.id))
  const occupied = preserved.filter(i => !i.refreshOf && !i.held).map(i => Date.parse(i.scheduledAt))
  const known = [...archive.map(a => a.title), ...preserved.flatMap(i => [i.primaryKeyword, i.workingTitle])]
  const topics = strategyTopics().filter(t => !known.some(k => normalize(k) === normalize(t.workingTitle) || similarity(k, t.primaryKeyword) > .85))
  const tomorrow = new Date(now.getTime() + 86400000); tomorrow.setUTCHours(7, 0, 0, 0)
  let slot = Math.max(tomorrow.getTime(), state.lastPublishedAt ? Date.parse(state.lastPublishedAt) + INTERVAL : 0)
  const updates = topics.map((topic, index) => {
    while (occupied.some(date => Math.abs(date - slot) < INTERVAL)) slot += INTERVAL
    const old = replaceable[index]
    const fresh = makeItems([topic], state, new Date(slot).toISOString())[0]
    slot += INTERVAL
    return old ? { ...fresh, id: old.id, createdAt: old.createdAt } : fresh
  })
  // Any surplus old ideas remain in the calendar as held drafts, never deleted.
  updates.push(...replaceable.slice(topics.length).map(item => ({ ...item, held: true, modifiedAt: now.toISOString() })))
  return { items: updates, state: { ...state, strategyVersion: STRATEGY_VERSION, nextPlanningAt: new Date(now.getTime() + INTERVAL).toISOString() }, preserved: preserved.length }
}
export async function rebalanceCalendar(state: State, items: Item[], archive: Archive[], owner: string) {
  if (state.strategyVersion === STRATEGY_VERSION) return false
  const plan = planRebalance(state, items, archive)
  await commitCalendar(plan.state, plan.items, owner, 'CALENDAR_REBALANCED')
  return true
}
