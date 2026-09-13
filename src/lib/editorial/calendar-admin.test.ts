// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { INTERVAL, services } from './core'
import { makeItems } from './calendar'
import { planRebalance } from './rebalance'
import { strategyTopics, pillar } from './strategy'
import { parisInput, parseParis } from './dates'
import { editedItem } from './edit'
import { visibleFaqSchema } from '@/lib/blog/faq-schema'
import type { State } from './types'

const state: State = { namespace: 'test', enabled: true, anchor: '2026-09-14T07:00:00.000Z', lastPublishedAt: null, lastPublishedSlot: null, plannedAfterCount: 0 }
const now = new Date('2026-09-13T10:00:00Z')
const item = () => makeItems([strategyTopics()[0]], state, state.anchor)[0]
describe('Private editorial calendar', () => {
  it('has a three-day cadence and at least forty percent tools', () => {
    expect(INTERVAL).toBe(72 * 3600000)
    const topics = strategyTopics()
    expect(topics.filter(t => pillar(t.targetServicePage) === 'Outils & IA').length / topics.length).toBeGreaterThanOrEqual(.4)
    for (const slug of ['n8n', 'zapier', 'openai', 'codex', 'claude', 'shopify', 'wordpress', 'react', 'nextjs', 'vercel', 'webflow', 'framer']) expect(topics.some(t => t.targetServicePage === `/expertise/${slug}`)).toBe(true)
    expect(topics.every(t => services.some(s => s.path === t.targetServicePage))).toBe(true)
  })
  it('roundtrips Paris winter/summer and rejects impossible or ambiguous wall times', () => {
    expect(parseParis('2026-09-14T09:00')).toBe('2026-09-14T07:00:00.000Z')
    expect(parseParis('2026-12-14T09:00')).toBe('2026-12-14T08:00:00.000Z')
    expect(parisInput('2026-09-14T07:00:00Z')).toBe('2026-09-14T09:00')
    for (const date of ['2026-03-29T02:30', '2026-10-25T02:30', '2026-02-31T09:00', 'invalid']) expect(() => parseParis(date)).toThrow()
  })
  it('preserves prepared and published articles byte for byte during replanning', () => {
    const draft = { ...item(), content: '<p>Texte déjà réalisé</p>', status: 'FAILED' as const }, published = { ...item(), status: 'PUBLISHED' as const, publishedAt: '2026-09-10T07:00:00Z' }, idea = item()
    const before = JSON.stringify([draft, published, idea])
    const plan = planRebalance(state, [draft, published, idea], [], now)
    expect(JSON.stringify([draft, published, idea])).toBe(before)
    expect(plan.items.some(i => i.id === draft.id || i.id === published.id)).toBe(false)
    expect(plan.items.some(i => i.id === idea.id)).toBe(true)
    expect(plan.preserved).toBe(2)
    expect(plan.items.every(i => Date.parse(i.scheduledAt) > now.getTime())).toBe(true)
  })
  it('excludes archive duplicates and keeps a three-day gap between new subjects', () => {
    const title = strategyTopics()[0].workingTitle
    const plan = planRebalance(state, [item()], [{ title, slug: 'exists', excerpt: 'Déjà rédigé' }], now)
    expect(plan.items.some(i => i.workingTitle === title)).toBe(false)
    expect(plan.items.every((i, n) => n === 0 || Date.parse(i.scheduledAt) - Date.parse(plan.items[n - 1].scheduledAt) >= INTERVAL)).toBe(true)
  })
  it('rejects stale edits, date collisions and attempts to edit published content directly', () => {
    const current = item(), form = new FormData()
    form.set('version', current.modifiedAt); form.set('action', 'date'); form.set('scheduledAt', '2026-09-16T09:00')
    const peer = { ...item(), scheduledAt: '2026-09-17T07:00:00.000Z' }
    expect(() => editedItem(current, form, [current, peer], state, now)).toThrow('trop proche')
    form.set('version', 'old')
    expect(() => editedItem(current, form, [current], state, now)).toThrow('changé')
    expect(() => editedItem({ ...current, status: 'PUBLISHED' }, form, [], state, now)).toThrow('actualisation')
  })
  it('reschedules without changing the content or the quality approval', () => {
    const current = { ...item(), content: '<p>Conservé</p>' }, form = new FormData()
    form.set('version', current.modifiedAt); form.set('action', 'date'); form.set('scheduledAt', '2026-09-20T09:00')
    const next = editedItem(current, form, [current], state, now)
    expect(next.content).toBe(current.content)
    expect(next.scheduledAt).toBe('2026-09-20T07:00:00.000Z')
    expect(next.gate).toEqual(current.gate)
  })
  it('only emits FAQ structured data for visible complete questions', () => {
    expect(visibleFaqSchema('<h2>Conclusion</h2><p>Texte</p>')).toBeNull()
    const schema = visibleFaqSchema('<h2>Questions fréquentes</h2><h3>Comment démarrer ?</h3><p>Commencez par documenter un processus et les exceptions à gérer.</p>')
    expect(schema?.mainEntity).toHaveLength(1)
    expect(schema?.mainEntity[0].name).toBe('Comment démarrer ?')
  })
})
