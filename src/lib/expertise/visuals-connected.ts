import { connectedDefinitions } from './connected-definitions'
import type { ExpertiseSlug } from './types'
import type { ExpertiseScene } from './visuals'

export const connectedScenes = Object.fromEntries(connectedDefinitions.map(d => [d.slug, [
  { file: `${d.slug}-parcours-metier`, width: 1280, height: 800, alt: `Schéma original du parcours ${d.name} : ${d.visual.input.join(', ')} vers ${d.visual.output.join(', ')}`, caption: 'Illustration originale Litus : données fictives, pas une capture du logiciel ni une réalisation client.', title: d.visual.title, text: d.cases[0][1], points: d.deliverables, link: d.service },
  { file: `${d.slug}-atelier-exploitation`, width: 1280, height: 800, alt: `Maquette pédagogique pour ${d.name} montrant ${d.visual.output.join(', ')} et une étape de validation par l’équipe`, caption: 'Maquette pédagogique originale Litus : pas une capture du logiciel, pas une promesse de résultat.', title: d.cases[1][0], text: d.cases[1][1], points: [d.visual.output[0], d.visual.output[1], d.visual.output[2]], link: { href: `/expertise/${d.connections[0].slug}`, label: 'Explorer la connexion complémentaire' } },
]])) as Partial<Record<ExpertiseSlug, [ExpertiseScene, ExpertiseScene]>>
