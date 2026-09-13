import { headingText } from './prepare-article'

/** Only questions and answers visibly present in an explicit FAQ section. */
export function visibleFaqSchema(html: string) {
  const section = /<h2\b[^>]*>[^<]*(?:FAQ|questions fréquentes|questions fréquentes sur)[\s\S]*?<\/h2>([\s\S]*?)(?=<h2\b|$)/i.exec(html)?.[1]
  if (!section) return null
  const questions = [...section.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>\s*<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(match => ({ '@type': 'Question', name: headingText(match[1]), acceptedAnswer: { '@type': 'Answer', text: headingText(match[2]) } })).filter(q => q.name.endsWith('?') && q.acceptedAnswer.text.length > 30)
  return questions.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: questions } : null
}
