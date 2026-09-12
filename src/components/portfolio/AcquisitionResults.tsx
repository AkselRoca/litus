import { ArrowUpRight, MapPin, Target, TrendingUp } from 'lucide-react';
import type { PortfolioStory } from '@/lib/portfolio-catalog';
import './acquisition-results.css';

export function AcquisitionResults({ title, results, compact = false }: {
  title: string;
  results: NonNullable<PortfolioStory['performance']>;
  compact?: boolean;
}) {
  return <div className={`acquisition-results${compact ? ' is-compact' : ''}`}>
    <div className="acquisition-results-top"><span><Target size={15} aria-hidden="true" /> Google Ads / Acquisition</span><span className="acquisition-results-local"><MapPin size={14} aria-hidden="true" /> Local</span></div>
    <p className="acquisition-results-name">{title}</p>
    <p className="acquisition-results-intro">Des clics aux demandes commerciales.</p>
    <dl className="acquisition-results-metrics">{results.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd><strong>{metric.value}</strong><span>{metric.detail}</span></dd></div>)}</dl>
    <div className="acquisition-results-reinvest"><span className="acquisition-results-growth"><TrendingUp size={23} aria-hidden="true" /></span><p><strong>Des résultats qui donnent envie de réinvestir.</strong><span>Le client augmente progressivement son budget.</span></p><ArrowUpRight size={22} aria-hidden="true" /></div>
    <p className="acquisition-results-signature">Campagnes optimisées et pilotées par Litus</p>
  </div>;
}
