import { z } from 'zod'

export const statuses = ['IDEA', 'RESEARCHING', 'DRAFTING', 'REVIEW', 'SCHEDULED', 'PUBLISHED', 'FAILED'] as const
export type Status = typeof statuses[number]
export type Stage = 'RESEARCH' | 'BRIEF' | 'DRAFT' | 'FACTCHECK' | 'EDIT' | 'LINKS' | 'METADATA' | 'IMAGES' | 'QUALITY' | 'READY'
export const topicSchema = z.object({
  topic: z.string().min(12), primaryKeyword: z.string().min(5), secondaryKeywords: z.array(z.string()).max(8),
  searchIntent: z.string().min(12), cluster: z.string(), targetServicePage: z.string(), workingTitle: z.string().min(15),
  angle: z.string().min(25), reason: z.string().min(25), priority: z.number().min(1).max(100),
})
export type Topic = z.infer<typeof topicSchema>
export const blockSchema = z.object({
  type: z.enum(['paragraph', 'h2', 'h3', 'list', 'table', 'quote']),
  text: z.string(), items: z.array(z.string()), rows: z.array(z.array(z.string())),
})
export const draftSchema = z.object({
  title: z.string().min(15).max(130), excerpt: z.string().min(50).max(800),
  blocks: z.array(blockSchema).min(7).max(100),
  imageQueries: z.array(z.object({ query: z.string(), purpose: z.string() })).length(3),
})
export type Draft = z.infer<typeof draftSchema>
export type Source = { url: string; title: string; text: string; fetchedAt: string; sha256: string; official: boolean }
export type SearchResult = { url: string; title: string; description: string; rank: number }
export type Research = { queries: string[]; searchedAt: string; results: SearchResult[]; questions: string[]; sources: Source[]; provider?: string }
export const briefSchema = z.object({ intent: z.string(), gaps: z.array(z.string()).min(2), angle: z.string(), outline: z.array(z.string()).min(3),
  complexity: z.enum(['focused', 'guide']), coverageCriteria: z.array(z.string()).min(3),
  cannibalization: z.object({ duplicate: z.boolean(), existingSlug: z.string(), explanation: z.string() }) })
export type Brief = z.infer<typeof briefSchema>
export const reviewSchema = z.object({ score: z.number().min(0).max(100), passed: z.boolean(),
  issues: z.array(z.string()), unsupportedClaims: z.array(z.string()), genericPassages: z.array(z.string()),
  claims: z.array(z.object({ claim: z.string(), sourceUrl: z.string(), evidence: z.string(), supported: z.boolean() })).min(3),
  coverageComplete: z.boolean(), imagesRelevant: z.boolean() })
export type Review = z.infer<typeof reviewSchema>
export const linkSchema = z.object({ blockIndex: z.number().int().min(0), anchor: z.string().min(3), href: z.string() })
export type InternalLink = z.infer<typeof linkSchema>
export const seoSchema = z.object({ slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100),
  title: z.string().min(20).max(65), description: z.string().min(80).max(165), ctaLabel: z.string().min(10).max(80), ctaText: z.string().min(25).max(260) })
export type Seo = z.infer<typeof seoSchema>
export type EditorialImage = { src: string; alt: string; caption: string; sourceUrl: string; credit: string; license: string; licenseUrl: string; width: number; height: number; sha256: string; publicId: string }
export type Gate = { passed: boolean; score: number; errors: string[]; checkedAt: string; fingerprint: string }
export type Item = Topic & { id: string; namespace: string; status: Status; stage: Stage; scheduledAt: string; publishedAt: string | null;
  slug: string | null; articleId: string | null; createdAt: string; modifiedAt: string; attempts: number; corrections: number;
  nextAttemptAt: string | null; error: string | null; research?: Research; brief?: Brief; draft?: Draft; review?: Review;
  links?: InternalLink[]; seo?: Seo; images?: EditorialImage[]; gate?: Gate; qualityScore?: number;
  content?: string; backlinkDone?: boolean; refreshOf?: string; refreshSlug?: string; refreshBaseHash?: string;
}
export type State = { namespace: string; anchor: string; enabled: boolean; lastPublishedAt: string | null; lastPublishedSlot: string | null;
  plannedAfterCount: number; lastPlanResearch?: Research; planningError?: string; nextPlanningAt?: string; pausedReason?: string }
