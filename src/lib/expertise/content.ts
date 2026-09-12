import { connectedPages } from './content-connected'
import { technicalPages } from './content-technical'
import { nextjsPages } from './content-nextjs'
import { commercePages } from './content-commerce'
import { interfacePages } from './content-interfaces'
import { platformPages } from './content-platforms'
import type { ExpertisePage } from './types'

export const expertisePages: ExpertisePage[] = [...nextjsPages, ...interfacePages, ...platformPages, ...commercePages, ...technicalPages, ...connectedPages]
export function getExpertisePage(slug: string) {
  return expertisePages.find(page => page.slug === slug)
}
