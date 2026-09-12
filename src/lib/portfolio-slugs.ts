export function portfolioSlug(title: string) {
  const normalized = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (/west clotures/.test(normalized)) return 'west-clotures-paysage';
  if (/demetis/.test(normalized)) return 'demetis-immo';
  if (/nos travaux/.test(normalized)) return 'nos-travaux';
  return normalized.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
