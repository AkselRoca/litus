import type { Project } from '@prisma/client';
import { portfolioCatalog, type PortfolioStory } from './portfolio-catalog';
import { portfolioSlug } from './portfolio-slugs';

export type PublicPortfolioProject = Project & { editorial?: PortfolioStory };

// Visibility stays in the CMS; researched copy and local media come from the catalog.
export function curatePublicProjects(rows: Project[]): PublicPortfolioProject[] {
  const indexed = new Map(rows.map((row) => [portfolioSlug(row.title), row]));
  const curated: PublicPortfolioProject[] = [];
  const known = new Set(portfolioCatalog.map((story) => story.slug));
  for (const story of portfolioCatalog) {
    const existing = indexed.get(story.slug);
    if (existing && !existing.visible) continue;
    curated.push({
      id: existing?.id ?? `portfolio-${story.slug}`,
      createdAt: existing?.createdAt ?? new Date(0),
      updatedAt: existing?.updatedAt ?? new Date(0),
      featured: existing?.featured ?? story.order < 3,
      visible: true,
      stats: existing?.stats ?? '[]',
      ...existing,
      title: story.title, description: story.summary,
      categories: JSON.stringify(story.categories), tags: JSON.stringify(story.stack),
      imageUrl: story.cover.src, link: story.sourceUrl, order: story.order, editorial: story,
    });
  }
  for (const row of rows) {
    const slug = portfolioSlug(row.title);
    if (row.visible && !['japan-hunter', 'aspire-marketing'].includes(slug) && !known.has(slug)) curated.push({ ...row, title: row.title.replace(/D[ée]m[ée]tis/gi, 'Demetis') });
  }
  return curated;
}
