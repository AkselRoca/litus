import { pageMetadata } from '@/lib/seo/metadata'
import { notFound } from 'next/navigation';
import { getTrade, trades } from '@/lib/artisan/catalog';
import { artisanMetadata } from '@/lib/artisan/seo';
import TradeLanding from '@/components/artisan/TradeLanding';

export const dynamicParams = false;
export function generateStaticParams() { return trades.map(trade => ({ metier: trade.slug })); }

async function resolvePageMetadata({ params }: { params: Promise<{ metier: string }> }) {
  const trade = getTrade((await params).metier);
  if (!trade) notFound();
  return artisanMetadata(trade.title, trade.description, `/artisan/${trade.slug}`, `/artisan/${trade.slug}-metier.webp`, trade.photoAlt);
}

export default async function ArtisanTradePage({ params }: { params: Promise<{ metier: string }> }) {
  const trade = getTrade((await params).metier);
  if (!trade) notFound();
  return <TradeLanding trade={trade} />;
}

export async function generateMetadata(props: Parameters<typeof resolvePageMetadata>[0]) {
  const params = await props.params
  return pageMetadata("/artisan/" + params.metier, await resolvePageMetadata(props))
}
