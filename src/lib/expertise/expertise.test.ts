import { describe, expect, it } from 'vitest'
import { expertiseTools, expertiseContact, expertisePath } from './catalog'
import { expertisePages, getExpertisePage } from './content'
import { expertiseMetadata, expertiseSchema } from './seo'

describe('Expertise cluster', () => {
  it('publishes the nine technologies with unique routes', () => {
    expect(expertiseTools.map(tool => tool.slug).sort()).toEqual(['framer', 'nextjs', 'react', 'shopify', 'stripe', 'tailwind', 'typescript', 'vercel', 'wordpress'])
    expect(new Set(expertisePages.map(page => page.slug)).size).toBe(9)
    expect(expertisePages).toHaveLength(9)
    expect(getExpertisePage('unknown')).toBeUndefined()
  })
  it('has independent titles, descriptions, headlines and FAQ questions', () => {
    for (const key of ['title', 'description', 'headline'] as const) expect(new Set(expertisePages.map(page => page[key])).size).toBe(9)
    const questions = expertisePages.flatMap(page => page.faq.map(faq => faq.question))
    expect(new Set(questions).size).toBe(questions.length)
    expect(new Set(expertisePages.map(page => page.sections.map(section => section.kind).join(','))).size).toBeGreaterThanOrEqual(5)
  })
  it('builds a safe contextual contact URL', () => {
    const url = new URL(expertiseContact('Stripe & API'), 'https://litus.fr')
    expect(url.pathname).toBe('/contact')
    expect(url.searchParams.get('objet')).toBe('Expertise Stripe & API')
  })
  it('uses no FAQ, rating or invented review structured data', () => {
    for (const page of expertisePages) {
      const serialized = JSON.stringify(expertiseSchema(page))
      expect(serialized).not.toMatch(/FAQPage|AggregateRating|Review|ratingValue/)
      expect(() => JSON.parse(serialized)).not.toThrow()
    }
  })
  it('has a coherent hub breadcrumb and CollectionPage', () => {
    const schema = expertiseSchema()
    expect(schema['@graph'][0]['@type']).toBe('CollectionPage')
    expect(schema['@graph'].find(item => item['@type'] === 'BreadcrumbList')).toMatchObject({ itemListElement: [{ position: 1 }, { position: 2 }] })
  })
  for (const page of expertisePages) describe(page.slug, () => {
    it('contains substantive, individually written sections', () => {
      expect(page.sections.length).toBeGreaterThanOrEqual(5)
      expect(page.sections.some(section => section.kind === 'workflow')).toBe(true)
      expect(page.sections.some(section => section.kind === 'choice')).toBe(true)
      expect(page.faq.length).toBeGreaterThanOrEqual(5)
      expect(page.sections.map(section => JSON.stringify(section)).join(' ').split(/\s+/).length).toBeGreaterThan(400)
      const ids = page.sections.map(section => section.id)
      expect(new Set(ids).size).toBe(ids.length)
      expect(ids.every(id => /^[a-z0-9-]+$/.test(id))).toBe(true)
    })
    it('resolves the complementary technology links and gives sources', () => {
      expect(page.connections.length).toBeGreaterThanOrEqual(3)
      for (const item of page.connections) {
        expect(item.slug).not.toBe(page.slug)
        expect(getExpertisePage(item.slug)).toBeDefined()
      }
      expect(page.sources.length).toBeGreaterThanOrEqual(3)
      for (const source of page.sources) expect(new URL(source.href).protocol).toBe('https:')
    })
    it('sets an explicit canonical, OG and Twitter metadata', () => {
      const path = expertisePath(page.slug)
      const metadata = expertiseMetadata(page.title, page.description, path)
      expect(metadata.alternates?.canonical).toBe(path)
      expect(metadata.openGraph).toMatchObject({ title: page.title, url: `https://litus.fr${path}` })
      expect(metadata.twitter).toMatchObject({ title: page.title, description: page.description })
      expect(page.title.length).toBeLessThanOrEqual(85)
      expect(page.description.length).toBeLessThanOrEqual(180)
    })
    it('connects WebPage, Service and a three-level breadcrumb', () => {
      const graph = expertiseSchema(page)['@graph']
      expect(graph.map(item => item['@type'])).toEqual(['WebPage', 'BreadcrumbList', 'Service'])
      expect(graph[1]).toMatchObject({ itemListElement: [{ position: 1 }, { position: 2 }, { position: 3, item: `https://litus.fr/expertise/${page.slug}` }] })
      expect(graph[0]).toMatchObject({ mainEntity: { '@id': `https://litus.fr/expertise/${page.slug}#service` } })
    })
  })
})
