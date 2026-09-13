/** All admin dates are explicit Europe/Paris wall time, independent of browser/server TZ. */
export function parisInput(iso: string) {
  if (!Number.isFinite(Date.parse(iso))) return ''
  const parts = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(iso))
  const p = Object.fromEntries(parts.map(part => [part.type, part.value]))
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`
}
export function parseParis(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) throw new Error('Date et heure invalides.')
  const naive = Date.parse(`${value}:00Z`)
  const candidates = [60, 120].map(offset => new Date(naive - offset * 60000)).filter(date => Number.isFinite(date.getTime()) && parisInput(date.toISOString()) === value)
  if (candidates.length !== 1) throw new Error('Cette heure est inexistante ou ambiguë lors du changement d’heure. Choisissez une autre heure.')
  return candidates[0].toISOString()
}
export function displayDate(iso: string) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Paris' }).format(new Date(iso))
}
