// @vitest-environment node
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { mkdirSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { authorizeCron, fingerprint, hash, INTERVAL, nextSlot, renderDraft, services, validInternal } from './core'
import { initialTopics, makeItems } from './calendar'
import { evidenceMatches, validateQuality } from './quality'
import { publicationEligible, runTick, step } from './workflow'
import { acquire, commitPublication, commitRefresh, editorialDb, getState, initialize, listItems, migrate, release, saveItem } from './store'
import { isPublicAddress } from './network'
import type { Item, State } from './types'

vi.mock('./providers', () => ({ model: vi.fn(), research: vi.fn(), officialQuery: (_s: string, q: string) => q }))
vi.mock('./images', () => ({ acquireImages: vi.fn() }))
vi.mock('./backlinks', () => ({ proposeBacklinks: vi.fn() }))
import { model, research } from './providers'

const freshState = (namespace: string): State => ({ namespace, anchor: '2026-09-13T07:00:00.000Z', enabled: true, lastPublishedAt: null, lastPublishedSlot: null, plannedAfterCount: 0 })
function fixture(): Item {
  const now = new Date().toISOString()
  const sourceText = 'Le rapport indique les pages explorées qui ne sont pas indexées. Une redirection permet de retrouver une ressource déplacée. Les liens internes permettent de découvrir les autres pages du site.'
  const item = makeItems([initialTopics().find(t => t.targetServicePage === '/referencement-naturel')!], freshState('test'), now)[0]
  Object.assign(item, { stage: 'READY', status: 'SCHEDULED', slug: 'diagnostic-indexation-fiable',
    research: { queries: ['indexation', 'diagnostic indexation'], searchedAt: now, results: [1, 2, 3].map(i => ({ url: `https://developers.google.com/${i}`, title: 'Documentation', rank: i, description: 'Recherche réelle' })), questions: [], sources: [1, 2, 3].map(i => ({ url: `https://developers.google.com/${i}`, text: sourceText, title: 'Documentation', sha256: hash(sourceText), official: true, fetchedAt: now })) },
    brief: { intent: 'Diagnostiquer', gaps: ['Hiérarchiser le diagnostic', 'Éviter les corrections inutiles'], angle: 'Arbitrer', outline: ['Rapport', 'Technique', 'Contenu'], complexity: 'focused', coverageCriteria: ['Diagnostiquer', 'Vérifier', 'Décider'], cannibalization: { duplicate: false, existingSlug: '', explanation: 'Question complémentaire' } },
    draft: { title: 'Page non indexée : un diagnostic avant de réécrire', excerpt: 'Vérifiez le rapport et la page concernée pour choisir une correction utile avant de réécrire son contenu.', imageQueries: [1, 2, 3].map(i => ({ query: `photographie ${i}`, purpose: 'Expliquer le diagnostic' })), blocks: [
      { type: 'paragraph', text: 'Le diagnostic de référencement commence par la lecture du rapport d’indexation.', items: [], rows: [] },
      { type: 'h2', text: 'Lire le rapport', items: [], rows: [] },
      { type: 'paragraph', text: 'La préparation de la refonte permet de conserver les ressources utiles aux visiteurs.', items: [], rows: [] },
      { type: 'h2', text: 'Examiner les accès', items: [], rows: [] },
      { type: 'paragraph', text: 'Le contrôle des formulaires aide à vérifier la continuité du parcours commercial.', items: [], rows: [] },
      { type: 'h2', text: 'Décider de la correction', items: [], rows: [] },
      { type: 'paragraph', text: 'Une correction technique ne remplace pas la réponse claire à une question précise.', items: [], rows: [] },
    ] },
    seo: { slug: 'diagnostic-indexation-fiable', title: 'Diagnostiquer une page non indexée | Litus', description: 'Identifiez les causes possibles d’une page non indexée et les vérifications utiles avant de modifier son contenu ou ses liens internes.', ctaLabel: 'Examiner votre référencement', ctaText: 'Présentez-nous les pages concernées pour choisir un diagnostic adapté.' },
    links: [{ blockIndex: 0, anchor: 'diagnostic de référencement', href: services.find(s => s.path === '/referencement-naturel')!.path }, { blockIndex: 2, anchor: 'préparation de la refonte', href: '/blog/refonte' }, { blockIndex: 4, anchor: 'contrôle des formulaires', href: '/blog/formulaires' }],
    images: [1, 2, 3].map(i => ({ src: `https://res.cloudinary.com/test/image/upload/${i}.webp`, alt: `Écran de diagnostic présenté dans un atelier numéro ${i}`, caption: 'Le rapport sert à décider de la prochaine vérification.', sourceUrl: `https://commons.wikimedia.org/wiki/File:${i}`, credit: 'Auteur', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', width: 1200, height: 800, sha256: String(i), publicId: String(i) })),
    review: { score: 92, passed: true, issues: [], unsupportedClaims: [], genericPassages: [], coverageComplete: true, imagesRelevant: true, claims: [1, 2, 3].map(i => ({ claim: 'Le rapport renseigne sur l’indexation.', sourceUrl: `https://developers.google.com/${i}`, evidence: 'Le rapport indique les pages explorées qui ne sont pas indexées.', supported: true })) },
  })
  item.content = renderDraft(item.draft!, item.links)
  item.gate = validateQuality(item, new Set(['refonte', 'formulaires']))
  item.qualityScore = item.gate.score
  return item
}

describe('Editorial safety and quality', () => {
  it('creates varied service/tool/trade-backed ideas at exact intervals', () => {
    const topics = initialTopics()
    expect(topics.length).toBeGreaterThanOrEqual(48)
    expect(new Set(topics.map(t => t.targetServicePage)).size).toBeGreaterThan(20)
    expect(topics.every((t, i) => i === 0 || t.cluster !== topics[i - 1].cluster)).toBe(true)
    const items = makeItems(topics, freshState('test'), '2026-12-29T07:00:00.000Z')
    expect(items.every((t, i) => i === 0 || Date.parse(t.scheduledAt) - Date.parse(items[i - 1].scheduledAt) === INTERVAL)).toBe(true)
  })
  it('keeps 72 hours across month, year and daylight-saving boundaries', () => {
    expect(nextSlot('2026-12-29T07:00:00.000Z', new Date('2026-12-29T07:00:00.000Z'))).toBe('2027-01-01T07:00:00.000Z')
    expect(nextSlot('2026-10-23T07:00:00.000Z', new Date('2026-10-25T07:00:00.000Z'))).toBe('2026-10-26T07:00:00.000Z')
  })
  it('fails closed on missing/incorrect cron authentication', () => {
    vi.stubEnv('CRON_SECRET', '')
    expect(authorizeCron('Bearer ')).toBe(false)
    vi.stubEnv('CRON_SECRET', 'a'.repeat(48))
    expect(authorizeCron('Bearer wrong')).toBe(false)
    expect(authorizeCron(`Bearer ${'a'.repeat(48)}`)).toBe(true)
  })
  it('blocks private, metadata and reserved IP ranges', () => {
    for (const address of ['127.0.0.1', '10.1.2.3', '169.254.169.254', '192.168.1.1', '172.16.0.1', '100.64.0.1', '::1', '::ffff:127.0.0.1', 'fc00::1']) expect(isPublicAddress(address)).toBe(false)
    expect(isPublicAddress('8.8.8.8')).toBe(true)
  })
  it('only accepts discovered internal routes', () => {
    expect(validInternal('/referencement-naturel', new Set())).toBe(true)
    for (const href of ['/services/seo-imaginaire', '//evil.com', '/blog/draft', '/admin/editorial']) expect(validInternal(href, new Set())).toBe(false)
  })
  it('renders model text as escaped content', () => {
    const item = fixture()
    item.draft!.blocks[0].text = '<img src=x onerror=alert(1)>'
    expect(renderDraft(item.draft!)).not.toContain('<img src=x')
    expect(renderDraft(item.draft!)).toContain('&lt;img')
  })
  it('accepts a complete, supported article', () => { expect(fixture().gate?.errors).toEqual([]); expect(fixture().gate?.passed).toBe(true) })
  it.each(['research', 'images', 'links', 'seo', 'review'] as const)('rejects missing %s even with a high model score', field => {
    const item = fixture(); delete item[field]
    expect(validateQuality(item, new Set(['refonte', 'formulaires'])).passed).toBe(false)
  })
  it('rejects invented evidence and unsupported claims', () => {
    const item = fixture(); item.review!.claims[0].evidence = 'Cette statistique est entièrement inventée et absente de la source.'
    expect(validateQuality(item, new Set(['refonte', 'formulaires'])).passed).toBe(false)
  })
  it('verifies every quoted segment when an excerpt contains an ellipsis', () => {
    const source = 'First authoritative sentence explaining the setting. Some intermediate explanation. Second authoritative sentence explaining the result.'
    expect(evidenceMatches(source, 'First authoritative sentence explaining the setting. [...] Second authoritative sentence explaining the result.')).toBe(true)
    expect(evidenceMatches(source, 'First authoritative sentence explaining the setting. [...] An entirely invented statistical claim.')).toBe(false)
  })
  it('rejects generic and duplicated paragraphs', () => {
    const item = fixture(); item.draft!.blocks[0].text = 'Dans un monde de plus en plus digital, tout change.'
    item.draft!.blocks[2].text = item.draft!.blocks[0].text
    expect(validateQuality(item, new Set(['refonte', 'formulaires'])).errors).toContain('Duplicate paragraphs')
  })
  it('blocks intros that merely announce the article, including in the excerpt', () => {
    const item = fixture(); item.draft!.excerpt = 'Cet article compare les choix possibles pour comprendre ce sujet important.'
    expect(validateQuality(item, new Set(['refonte', 'formulaires'])).errors).toContain('Introduction announces the article instead of answering the question')
  })
  it('refuses stale sources, duplicate slugs and a second H1', () => {
    const item = fixture(); item.research!.searchedAt = '2020-01-01'; item.content += '<h1>Deuxième titre</h1>'
    const gate = validateQuality(item, new Set([item.slug!, 'refonte', 'formulaires']))
    expect(gate.errors).toContain('Research is stale'); expect(gate.errors).toContain('Invalid or duplicate slug'); expect(gate.errors).toContain('Body must not contain a second H1')
  })
  it('prevents publication before the slot, bursts, and content tampering', () => {
    const item = fixture(), state = freshState('production'), now = new Date()
    item.scheduledAt = new Date(now.getTime() - 1000).toISOString()
    expect(publicationEligible(item, state, now)).toBe(true)
    expect(publicationEligible(item, { ...state, lastPublishedAt: new Date(now.getTime() - 86400000).toISOString() }, now)).toBe(false)
    item.content += '<p>Un changement après validation</p>'
    expect(item.gate?.fingerprint).not.toBe(fingerprint(item))
    expect(publicationEligible(item, state, now)).toBe(false)
  })
  it('does not write when real research fails', async () => {
    vi.mocked(research).mockRejectedValueOnce(new Error('Search unavailable'))
    const item = fixture(); item.stage = 'RESEARCH'
    await expect(step(item, [])).rejects.toThrow('Search unavailable')
    expect(model).not.toHaveBeenCalled()
  })
})

describe('Durability and concurrent cron invocations', () => {
  beforeAll(async () => {
    mkdirSync('.tmp', { recursive: true })
    vi.stubEnv('EDITORIAL_DATABASE_URL', `file:.tmp/editorial-${randomUUID()}.db`)
    await migrate()
  })
  afterAll(() => { editorialDb().close(); vi.unstubAllEnvs() })
  it('allows only one worker to hold the lease', async () => {
    const namespace = randomUUID(); await initialize(freshState(namespace))
    const owners = await Promise.all([acquire(namespace), acquire(namespace), acquire(namespace)])
    expect(owners.filter(Boolean)).toHaveLength(1)
    await release(namespace, owners.find(Boolean)!)
  })
  it('atomically publishes once and updates the clock without double publication', async () => {
    const namespace = randomUUID(), state = freshState(namespace); await initialize(state)
    const owner = (await acquire(namespace))!, item = fixture(); item.namespace = namespace
    await saveItem(item, owner)
    const date = new Date().toISOString(), published = { ...item, status: 'PUBLISHED' as const, publishedAt: date }
    await commitPublication(published, { ...state, lastPublishedAt: date }, owner)
    await expect(commitPublication(published, state, owner)).rejects.toThrow()
    expect((await listItems(namespace))[0].status).toBe('PUBLISHED')
    expect((await getState(namespace))!.lastPublishedAt).toBe(date)
    await release(namespace, owner)
  })
  it('test mode never publishes a ready article even when it is overdue', async () => {
    await initialize(freshState('test'))
    const owner = (await acquire('test'))!, item = fixture(); item.scheduledAt = '2020-01-01T07:00:00.000Z'
    await saveItem(item, owner); await release('test', owner)
    expect((await runTick('test', [])).status).toBe('test-ready')
    expect((await listItems('test'))[0].publishedAt).toBeNull()
    expect((await listItems('test'))[0].status).toBe('SCHEDULED')
  })
  it('updates an article in place without changing its publication date or publication clock', async () => {
    const namespace = randomUUID(), state = freshState(namespace); await initialize(state)
    const owner = (await acquire(namespace))!, original = fixture()
    original.namespace = namespace; original.status = 'PUBLISHED'; original.publishedAt = '2026-08-01T07:00:00.000Z'
    await saveItem(original, owner)
    const revision = { ...fixture(), namespace, refreshOf: original.id, refreshSlug: original.slug!, refreshBaseHash: hash(original.content!), slug: `${original.slug}-revision`, content: original.content + '<p>Une précision substantielle ajoutée au contenu.</p>' }
    await saveItem(revision, owner)
    await commitRefresh(revision, owner)
    const updated = (await listItems(namespace)).find(i => i.id === original.id)!
    expect(updated.publishedAt).toBe(original.publishedAt)
    expect(updated.slug).toBe(original.slug)
    expect(updated.content).toBe(revision.content)
    expect((await getState(namespace))!.lastPublishedAt).toBeNull()
    await release(namespace, owner)
  })
  it('does not replace an article that changed while its revision was prepared', async () => {
    const namespace = randomUUID(); await initialize(freshState(namespace))
    const owner = (await acquire(namespace))!, original = fixture(); original.namespace = namespace; original.status = 'PUBLISHED'
    await saveItem(original, owner)
    const revision = { ...fixture(), namespace, refreshOf: original.id, refreshBaseHash: 'outdated', slug: `${original.slug}-revision` }
    await saveItem(revision, owner)
    await expect(commitRefresh(revision, owner)).rejects.toThrow('changed during revision')
    expect((await listItems(namespace)).find(i => i.id === original.id)!.content).toBe(original.content)
    await release(namespace, owner)
  })
})
