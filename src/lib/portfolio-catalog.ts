import source from './portfolio-catalog.json';
import peanCase from './case-studies/sarl-pean-j.json';

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
  performance?: {
    metrics: { value: string; label: string; detail: string }[];
    reinvestment: string;
    note: string;
  };
};
// Preserve the requested opening sequence; add the acquisition case afterwards.
export const portfolioCatalog = [
  ...source.slice(0, 16), peanCase, ...source.slice(16),
].map((story, order) => ({ ...story, order })) as PortfolioStory[];
