import 'server-only'
import type { ContactFormData } from './validations/contact'
import type { ContactConfig } from './contact/config'

export const CONTACT_RECIPIENT = 'litusagency@gmail.com'
export const serviceLabels: Record<ContactFormData['service'], string> = {
  'sites-vitrine': 'Création de site vitrine', 'e-commerce': 'Site e-commerce', refonte: 'Refonte de site',
  'landing-page': 'Création de landing page', seo: 'Référencement naturel SEO', 'seo-local': 'SEO local',
  'google-business-profile': 'Google Business Profile', 'google-ads': 'Google Ads', maintenance: 'Maintenance / Support',
  'outils-ia': 'Création d’outils IA', 'applications-web': 'Application web sur mesure', automatisation: 'Automatisation',
  'developpement-web': 'Développement web sur mesure', 'integrations-api': 'Intégrations & API', audit: 'Audit', autre: 'Autre besoin',
}
const budgetLabels: Record<ContactFormData['budget'], string> = {
  'moins-1000': 'Moins de 1 000 €', '1000-3000': 'Entre 1 000 € et 3 000 €', '3000-10000': 'Entre 3 000 € et 10 000 €',
  '10000-30000': 'Entre 10 000 € et 30 000 €', 'plus-30000': 'Plus de 30 000 €', 'ne-sais-pas': 'Je ne sais pas encore',
}
export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
}
export function contactEmail(data: ContactFormData, from: string) {
  const fields = [ ['Nom', data.nom], ['Email', data.email], ['Téléphone', data.telephone || 'Non renseigné'],
    ['Entreprise / Site web', data.entreprise || 'Non renseigné'], ['Service souhaité', serviceLabels[data.service]],
    ['Budget estimé', budgetLabels[data.budget]], ['Description du projet', data.message] ]
  return {
    from: `Litus <${from}>`, to: [CONTACT_RECIPIENT], reply_to: data.email,
    subject: `Nouvelle demande de contact — ${data.nom} — ${serviceLabels[data.service]}`,
    text: `Nouvelle demande de contact — Litus\n\n${fields.map(([label, value]) => `${label} :\n${value}`).join('\n\n')}`,
    html: `<!doctype html><html lang="fr"><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta charset="utf-8"></head><body style="margin:0;background:#f7f6f2;color:#142237;font-family:Arial,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:28px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:auto;background:#fff;border:1px solid #e1e3e6;border-radius:18px"><tr><td style="padding:30px;border-bottom:3px solid #e95e2a"><p style="margin:0 0 12px;color:#c7431b;font-size:12px;font-weight:bold;letter-spacing:2px">LITUS · NOUVEAU PROJET</p><h1 style="font-size:26px;line-height:1.2;margin:0;color:#142237">Voici la nouvelle demande reçue.</h1><p style="margin:10px 0 0;color:#657185;font-size:14px;line-height:1.6">Toutes les informations utiles sont regroupées ci-dessous.</p></td></tr><tr><td style="padding:8px 30px 26px">${fields.map(([label, value]) => `<div style="padding:16px 0;border-bottom:1px solid #eceeef"><p style="font-size:11px;font-weight:bold;letter-spacing:.6px;text-transform:uppercase;color:#c7431b;margin:0 0 6px">${label}</p><p style="font-size:15px;line-height:1.6;margin:0;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word">${escapeHtml(value)}</p></div>`).join('')}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#fff5ef;border-radius:12px"><tr><td style="padding:16px;color:#536176;font-size:13px;line-height:1.55">Répondez directement à cet email : la réponse sera envoyée à <strong>${escapeHtml(data.email)}</strong>.</td></tr></table></td></tr></table></td></tr></table></body></html>`,
  }
}

export function contactConfirmationEmail(data: ContactFormData, from: string) {
  const firstName = escapeHtml(data.nom.trim().split(/\s+/)[0] || data.nom)
  const service = escapeHtml(serviceLabels[data.service])
  return {
    from: `Litus <${from}>`, to: [data.email], reply_to: CONTACT_RECIPIENT,
    subject: 'Nous avons bien reçu votre demande — Litus',
    text: `Bonjour ${data.nom},\n\nVotre demande concernant « ${serviceLabels[data.service]} » a bien été reçue.\n\nOn s’occupe de tout : Arthur ou Aksel va relire les informations transmises et vous recontactera pour comprendre votre projet, répondre à vos questions et vous proposer la suite la plus adaptée.\n\nVous pouvez répondre directement à cet email ou nous joindre au 07 44 98 55 21.\n\nÀ très bientôt,\nArthur & Aksel\nLitus — Agence web à Lorient et au Mans`,
    html: `<!doctype html><html lang="fr"><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta charset="utf-8"></head><body style="margin:0;background:#f7f6f2;color:#142237;font-family:Arial,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:28px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;overflow:hidden;background:#fff;border:1px solid #e1e3e6;border-radius:18px"><tr><td style="padding:30px 30px 26px;border-bottom:3px solid #e95e2a"><p style="margin:0 0 12px;color:#c7431b;font-size:12px;font-weight:bold;letter-spacing:2px">LITUS · VOTRE PROJET</p><h1 style="margin:0;color:#142237;font-size:28px;line-height:1.2">Votre demande est entre de bonnes mains.</h1></td></tr><tr><td style="padding:30px"><p style="margin:0 0 18px;font-size:17px;line-height:1.65">Bonjour <strong>${firstName}</strong>,</p><p style="margin:0 0 18px;color:#536176;font-size:15px;line-height:1.7">Nous avons bien reçu votre demande concernant <strong style="color:#142237">${service}</strong>.</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;background:#fff4ed;border-left:4px solid #e95e2a;border-radius:10px"><tr><td style="padding:20px"><p style="margin:0 0 7px;color:#c7431b;font-size:15px;font-weight:bold">On s’occupe de tout.</p><p style="margin:0;color:#536176;font-size:14px;line-height:1.65">Arthur ou Aksel va relire les informations transmises et vous recontactera pour comprendre votre projet, répondre à vos questions et vous proposer la suite la plus adaptée.</p></td></tr></table><p style="margin:0;color:#536176;font-size:14px;line-height:1.7">Vous pouvez répondre directement à cet email ou nous appeler au <a href="tel:+33744985521" style="color:#c7431b;font-weight:bold">07 44 98 55 21</a>.</p><p style="margin:28px 0 0;color:#142237;font-size:14px;line-height:1.6"><strong>Arthur &amp; Aksel</strong><br><span style="color:#657185">Litus · Agence web à Lorient et au Mans</span></p></td></tr></table></td></tr></table></body></html>`,
  }
}

async function sendEmail(payload: ReturnType<typeof contactEmail> | ReturnType<typeof contactConfirmationEmail>, config: ContactConfig, idempotencyKey: string) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${config.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(12000), cache: 'no-store',
  })
  const result = await response.json()
  if (!response.ok || typeof result.id !== 'string' || !result.id) throw new Error('Email not accepted')
  return result.id as string
}

export async function sendContactEmails(data: ContactFormData, config: ContactConfig, idempotencyKey: string) {
  const notificationId = await sendEmail(contactEmail(data, config.RESEND_FROM_EMAIL), config, `${idempotencyKey}/notification`)
  const confirmationId = await sendEmail(contactConfirmationEmail(data, config.RESEND_FROM_EMAIL), config, `${idempotencyKey}/confirmation`)
  return { notificationId, confirmationId }
}
