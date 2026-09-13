import { describe, expect, it } from 'vitest'
import { brandedTitle, pageMetadata, SITE_ORIGIN } from './metadata'

describe('Public page metadata', () => {
  it('keeps exactly one brand and bypasses inherited title templates', () => {
    expect(brandedTitle('Expert Shopify | Litus | Litus')).toBe('Expert Shopify | Litus')
    expect(brandedTitle('Les outils Litus')).toBe('Les outils Litus')
    expect(pageMetadata('/expertise/shopify', { title: 'Expert Shopify | Litus' }).title).toEqual({ absolute: 'Expert Shopify | Litus' })
  })
  it('replaces inherited or noncanonical URLs consistently', () => {
    const result = pageMetadata('/expertise/react/', { title: 'React', description: 'Des interfaces adaptées.', alternates: { canonical: '/' }, openGraph: { url: 'https://litus.fr/' } })
    expect(result.alternates?.canonical).toBe(`${SITE_ORIGIN}/expertise/react`)
    expect(result.openGraph?.url).toBe(`${SITE_ORIGIN}/expertise/react`)
    expect(result.twitter?.description).toBe(result.description)
    expect(result.keywords).toBeNull()
  })
  it('gives the homepage its own title, description and canonical', () => {
    const result = pageMetadata('/', {})
    expect(result.alternates?.canonical).toBe(`${SITE_ORIGIN}/`)
    expect(result.description).toContain('Lorient')
    expect(result.title).toEqual({ absolute: expect.stringContaining('| Litus') })
  })
  it('preserves noindex and overrides inherited Googlebot indexation', () => {
    expect(pageMetadata('/mentions-legales', { title: 'Mentions légales', robots: { index: false, follow: true, googleBot: { index: true } } }).robots).toEqual({ index: false, follow: true, googleBot: { index: false, follow: true } })
  })
  it('preserves project-specific social images', () => {
    const image = { url: '/portfolio/client.webp', width: 1440, height: 900, alt: 'Site du client' }
    expect(pageMetadata('/realisations/client', { title: 'Client', openGraph: { images: [image] } }).openGraph?.images).toEqual([image])
  })
})
