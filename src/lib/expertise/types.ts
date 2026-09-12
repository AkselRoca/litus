export type ExpertiseSlug = 'nextjs' | 'react' | 'typescript' | 'tailwind' | 'framer' | 'vercel' | 'stripe' | 'shopify' | 'wordpress'

export type ExpertiseTool = {
  slug: ExpertiseSlug
  name: string
  logo: string
  category: string
  summary: string
}

type SectionBase = { id: string; nav: string; eyebrow: string; title: string; intro?: string }
export type ExpertiseSection = SectionBase & (
  | { kind: 'cards'; items: { title: string; text: string; detail?: string }[] }
  | { kind: 'issues'; items: { symptom: string; diagnosis: string; action: string }[] }
  | { kind: 'workflow'; steps: { title: string; text: string }[]; note: string }
  | { kind: 'prose'; paragraphs: string[]; note?: { title: string; text: string } }
  | { kind: 'code'; filename: string; code: string; paragraphs: string[]; note: string }
  | { kind: 'choice'; yes: string[]; no: string[] }
)

export type ExpertisePage = {
  slug: ExpertiseSlug
  title: string
  description: string
  headline: string
  accent: string
  intro: string
  action: string
  deliverables: string[]
  sections: ExpertiseSection[]
  faq: { question: string; answer: string }[]
  connections: { slug: ExpertiseSlug; reason: string }[]
  reading: { href: string; label: string; reason: string }
  sources: { label: string; href: string }[]
  cta: { title: string; text: string; label: string }
}
