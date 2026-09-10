import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'
import { articles2026A } from './articles-2026-a'
import { articles2026B } from './articles-2026-b'
import { calculateReadTime, localArticles } from './local-articles'
import { withArticlePhotos } from './article-photos'
import { prepareArticle } from './prepare-article'

const newArticles = [...articles2026A, ...articles2026B].map(article => ({ ...article, readTimeMinutes: calculateReadTime(article.content) }))
const articles = [...localArticles, ...newArticles].map(withArticlePhotos)

describe('editorial blog catalogue', () => {
  it('retains six articles and adds fifteen distinct, fully written subjects', () => {
    expect(localArticles).toHaveLength(6)
    expect(newArticles).toHaveLength(15)
    expect(new Set(articles.map(article => article.slug)).size).toBe(21)
    for (const article of articles) {
      expect(article.content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length, article.slug).toBeGreaterThan(650)
      expect(article.content).toContain('<h2>')
      expect(article.content).toContain('<h3>')
      expect(article.content).toContain('href="/contact')
      expect(article.metaTitle, article.slug).toBeTruthy()
      expect(article.metaDescription, article.slug).toBeTruthy()
      expect(article.readTimeMinutes).toBeGreaterThanOrEqual(4)
    }
  })
  it('uses one distinct cover and at least four real local photos per article', () => {
    expect(new Set(articles.map(article => article.coverImage)).size).toBe(21)
    const photoHash = (src: string) => createHash('sha256').update(readFileSync(join(process.cwd(), 'public', src))).digest('hex')
    expect(new Set(articles.map(article => photoHash(article.coverImage))).size).toBe(21)
    for (const article of articles) {
      expect(article.images, article.slug).toHaveLength(3)
      expect(new Set([article.coverImage, ...article.images!.map(image => image.src)]).size, article.slug).toBe(4)
      expect(new Set([article.coverImage, ...article.images!.map(image => image.src)].map(photoHash)).size, article.slug).toBe(4)
      expect(article.coverImageAlt.length).toBeGreaterThan(10)
      expect(article.imageSource).toMatch(/^https:\/\//)
      const { content, headings } = prepareArticle(article.content, article.images)
      expect(content.match(/class="blog-editorial-figure"/g), article.slug).toHaveLength(3)
      expect(new Set(headings.map(heading => heading.id)).size).toBe(headings.length)
      for (const src of [article.coverImage, ...article.images!.map(image => image.src)]) {
        expect(src).toMatch(/^\/blog\/photos\/.+\.webp$/)
        expect(existsSync(join(process.cwd(), 'public', src)), src).toBe(true)
      }
      for (const image of article.images!) {
        expect(image.sourceUrl).toMatch(/^https:\/\//)
        expect(image.licenseUrl).toMatch(/^https:\/\//)
        expect(image.credit).toBeTruthy()
        expect(image.width).toBeGreaterThan(500)
        expect(image.height).toBeGreaterThan(250)
      }
    }
  })
  it('records the requested editorial calendar and current modification date separately', () => {
    expect(new Set(newArticles.map(article => article.publishedAt)).size).toBe(15)
    for (const article of articles) {
      expect(new Date(article.publishedAt).getTime()).toBeGreaterThanOrEqual(new Date('2026-04-07').getTime())
      expect(new Date(article.publishedAt).getTime()).toBeLessThanOrEqual(new Date('2026-09-09').getTime())
      expect(article.updatedAt).toBe('2026-09-09')
    }
  })
})
