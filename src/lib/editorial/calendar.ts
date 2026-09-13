import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { INTERVAL, nextSlot, services, similarity } from './core'
import { model, officialQuery, research } from './providers'
import { topicSchema, type Item, type State, type Topic } from './types'
import { pillar, strategyInstruction, strategyTopics } from './strategy'

export function initialTopics(): Topic[] { return strategyTopics() }
export function makeItems(topics: Topic[], state: State, start: string): Item[] {
  return topics.map((topic, i) => ({ ...topic, id: randomUUID(), namespace: state.namespace, status: 'IDEA', stage: 'RESEARCH', scheduledAt: new Date(Date.parse(start) + i * INTERVAL).toISOString(),
    publishedAt: null, slug: null, articleId: null, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString(), attempts: 0, corrections: 0, nextAttemptAt: null, error: null }))
}
export async function replenish(state: State, existing: Item[], archive: { slug: string; title: string; excerpt: string }[]) {
  const counts = services.map(service => ({ service, count: existing.filter(i => i.targetServicePage === service.path).length }))
    .sort((a, b) => a.count - b.count)
  const selected = counts[state.plannedAfterCount % counts.length].service
  const evidence = await research([`${selected.title} problèmes entreprise questions`, `${selected.title} nouveautés ${new Date().getUTCFullYear()}`, officialQuery(selected.path, selected.title)])
  const planned = await model(strategyInstruction + ' Renouvelle le calendrier avec 12 sujets informationnels précis. Utilise les opportunités observées dans la recherche et les offres existantes. Alterne les clusters. Aucun doublon d’intention avec le catalogue. Ne prétends pas connaître volume ou concurrence chiffrés. Les priorités sont des estimations éditoriales. Chaque reason explique potentiel, pertinence commerciale, angle complémentaire et concurrence qualitativement observée ou encore inconnue.',
    { services, research: evidence, existing: [...existing.map(i => ({ title: i.workingTitle, keyword: i.primaryKeyword, intent: i.searchIntent })), ...archive] }, z.object({ topics: z.array(topicSchema).min(10).max(16) }))
  const accepted: Topic[] = []
  for (const topic of planned.topics) {
    if (!services.some(s => s.path === topic.targetServicePage)) continue
    if ([...existing.map(i => i.primaryKeyword), ...archive.map(a => a.title), ...accepted.map(t => t.primaryKeyword)].some(t => similarity(t, topic.primaryKeyword) > 0.82)) continue
    const previous = accepted.at(-1)
    if (previous && pillar(previous.targetServicePage) === pillar(topic.targetServicePage)) continue
    accepted.push(topic)
  }
  if (accepted.length < 5 || accepted.filter(t => pillar(t.targetServicePage) === 'Outils & IA').length / accepted.length < .4) throw new Error('Planning needs distinct topics and at least 40% tools/automation')
  const last = existing.reduce((max, i) => i.scheduledAt > max ? i.scheduledAt : max, state.anchor)
  const start = nextSlot(state.anchor, new Date(Math.max(Date.parse(last), Date.now())))
  return { items: makeItems(accepted, state, start), evidence }
}
