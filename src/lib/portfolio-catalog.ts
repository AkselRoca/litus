import source from './portfolio-catalog.json';

export type PortfolioAsset = {
  src: string; width: number; height: number; alt: string; caption: string;
  kind: 'screen' | 'brand' | 'mobile' | 'archive'; source?: string;
};
export type PortfolioStory = {
  slug: string; title: string; sourceUrl: string | null; sector: string;
  categories: string[]; stack: string[]; headline: string; summary: string; scope: string;
  focus: { title: string; text: string }[];
  links: { label: string; href: string }[];
  cover: PortfolioAsset; gallery: PortfolioAsset[];
  accent: string; tone: string; order: number; scopeOnly: boolean; archived: boolean;
};
export const portfolioCatalog = source as PortfolioStory[];
