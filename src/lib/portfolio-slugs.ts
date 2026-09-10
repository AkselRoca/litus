export function portfolioSlug(title: string) {
  if (/west cl[oô]tures/i.test(title)) return 'west-clotures-paysage'
  if (/dem[eé]tis/i.test(title)) return 'demetis-immo'
  if (/aspire/i.test(title)) return 'aspire-energie'
  if (/nos travaux/i.test(title)) return 'nos-travaux'
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
