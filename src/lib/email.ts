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
export interface ContactTechnicalInfo {
  ipAddress: string
  submittedAt: string
  userAgent: string
  browser: string
  device: string
  pageUrl: string
  requestUrl: string
  referrer: string
  location: string
  honeypot: string
  protections: string
}
export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
}
export function contactEmail(data: ContactFormData, from: string, technical?: ContactTechnicalInfo) {
  const fields = [ ['Nom', data.nom], ['Email', data.email], ['Téléphone', data.telephone || 'Non renseigné'],
    ['Entreprise / Site web', data.entreprise || 'Non renseigné'], ['Service souhaité', serviceLabels[data.service]],
    ['Budget estimé', budgetLabels[data.budget]], ['Description du projet', data.message] ]
  const copyPrompt = `Tu es conseiller en stratégie digitale pour Litus, agence web à Lorient et au Mans.

Analyse cette demande de contact et prépare :
1. une synthèse courte du besoin ;
2. les signaux de priorité commerciale ;
3. les questions à poser au prospect ;
4. une réponse email professionnelle, chaleureuse et concise.

Prospect :
- Nom : ${data.nom}
- Email : ${data.email}
- Téléphone : ${data.telephone || 'Non renseigné'}
- Entreprise / site : ${data.entreprise || 'Non renseigné'}
- Projet : ${serviceLabels[data.service]}
- Budget : ${budgetLabels[data.budget]}
- Message : ${data.message}`
  const technicalFields = technical ? [
    ['Adresse IP', technical.ipAddress],
    ['Date et heure exactes', technical.submittedAt],
    ['User-Agent', technical.userAgent],
    ['Navigateur', technical.browser],
    ['Appareil', technical.device],
    ['Page d’origine', technical.pageUrl],
    ['URL du formulaire', technical.requestUrl],
    ['Pays / ville approximative', technical.location],
    ['Referrer', technical.referrer],
    ['Honeypot', technical.honeypot],
    ['Protections anti-spam', technical.protections],
  ] : []
  const fieldsHtml = fields.map(([label, value]) => `<tr><td style="padding:13px 0;border-bottom:1px solid #ece7dc;color:#6b7280;font-size:12px;line-height:1.5">${escapeHtml(label)}</td><td style="padding:13px 0 13px 18px;border-bottom:1px solid #ece7dc;color:#142237;font-size:14px;line-height:1.55;font-weight:600;text-align:right;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word">${escapeHtml(value)}</td></tr>`).join('')
  const technicalText = technicalFields.length ? `\n\nInformations techniques\n\n${technicalFields.map(([label, value]) => `${label} :\n${value}`).join('\n\n')}` : ''
  const technicalHtml = technicalFields.length ? `<tr><td style="padding:0 34px 34px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ece7dc"><tr><td style="padding-top:22px"><h2 style="margin:0 0 8px;color:#142237;font-size:17px;line-height:1.3">Informations techniques</h2><p style="margin:0 0 14px;color:#657185;font-size:12px;line-height:1.55">Données limitées à la vérification de sécurité et à la lutte contre le spam.</p>${technicalFields.map(([label, value]) => `<div style="padding:10px 0;border-bottom:1px solid #f0ece4"><p style="font-size:10px;font-weight:bold;letter-spacing:.5px;text-transform:uppercase;color:#657185;margin:0 0 4px">${label}</p><p style="font-size:12px;line-height:1.55;margin:0;color:#39465a;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word">${escapeHtml(value)}</p></div>`).join('')}</td></tr></table></td></tr>` : ''
  return {
    from: `Litus <${from}>`, to: [CONTACT_RECIPIENT], reply_to: data.email,
    subject: `Nouvelle demande de contact — ${data.nom} — ${serviceLabels[data.service]}`,
    text: `Nouvelle demande de contact — Litus\n\n${fields.map(([label, value]) => `${label} :\n${value}`).join('\n\n')}\n\nPrompt ChatGPT prêt à copier\n\n${copyPrompt}${technicalText}`,
    html: `<!doctype html><html lang="fr"><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta charset="utf-8"></head><body style="margin:0;background:#f7f6f2;color:#142237;font-family:Aptos,'Segoe UI','Helvetica Neue',Arial,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6f2"><tr><td style="padding:34px 14px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:auto"><tr><td style="padding:0 0 18px;text-align:center"><img src="https://www.litus.fr/logo-sans-fond.png" width="92" alt="Litus" style="display:block;width:92px;height:auto;margin:0 auto 12px"><p style="margin:0;color:#c7431b;font-size:11px;font-weight:700;letter-spacing:2.2px;text-transform:uppercase">Nouveau contact</p></td></tr><tr><td style="overflow:hidden;background:#fffdf8;border:1px solid #e7e0d3;border-radius:18px;box-shadow:0 18px 45px rgba(20,34,55,.06)"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:34px 34px 22px;text-align:center;border-bottom:1px solid #eee8dd"><h1 style="margin:0;color:#142237;font-family:Georgia,'Times New Roman',serif;font-size:31px;line-height:1.16;font-weight:500">Nouvelle demande de contact.</h1><p style="margin:16px auto 0;max-width:500px;color:#536176;font-size:15px;line-height:1.7"><strong style="color:#142237">${escapeHtml(data.nom)}</strong> a envoyé une demande concernant <strong style="color:#142237">${escapeHtml(serviceLabels[data.service])}</strong>.</p></td></tr><tr><td style="padding:28px 34px 0"><h2 style="margin:0 0 14px;color:#142237;font-size:18px;line-height:1.3;font-weight:700">Demande prospect</h2><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fbf8f1;border:1px solid #ece4d6;border-radius:14px;padding:4px 18px">${fieldsHtml}</table><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;background:#fff7f0;border:1px solid #f0d8c8;border-radius:14px"><tr><td style="padding:16px;color:#536176;font-size:13px;line-height:1.55">Répondez directement à cet email : la réponse sera envoyée à <strong style="color:#142237">${escapeHtml(data.email)}</strong>.</td></tr></table></td></tr><tr><td style="padding:28px 34px"><h2 style="margin:0 0 10px;color:#142237;font-size:18px;line-height:1.3;font-weight:700">Prompt ChatGPT prêt à copier</h2><p style="margin:0 0 12px;color:#657185;font-size:12px;line-height:1.55">Copiez ce bloc dans ChatGPT pour préparer la synthèse, les questions et une réponse email.</p><pre style="margin:0;padding:18px;background:#142237;color:#f7f6f2;border-radius:14px;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;font-size:12px;line-height:1.65;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word">${escapeHtml(copyPrompt)}</pre></td></tr>${technicalHtml}</table></td></tr></table></td></tr></table></body></html>`,
  }
}

export function contactConfirmationEmail(data: ContactFormData, from: string) {
  const firstName = escapeHtml(data.nom.trim().split(/\s+/)[0] || data.nom)
  const service = escapeHtml(serviceLabels[data.service])
  const summaryFields = [
    ['Projet', serviceLabels[data.service]],
    ['Entreprise', data.entreprise || ''],
    ['Budget', budgetLabels[data.budget]],
    ['Objectif', data.message],
  ].filter(([, value]) => value)
  const summaryText = summaryFields.map(([label, value]) => `- ${label} : ${value}`).join('\n')
  const summaryHtml = summaryFields.map(([label, value]) => `<tr><td style="padding:11px 0;border-bottom:1px solid #ece7dc;color:#6b7280;font-size:13px;line-height:1.5">${escapeHtml(label)}</td><td style="padding:11px 0 11px 18px;border-bottom:1px solid #ece7dc;color:#142237;font-size:14px;line-height:1.55;font-weight:600;text-align:right;overflow-wrap:anywhere;word-break:break-word">${escapeHtml(value)}</td></tr>`).join('')
  return {
    from: `Litus <${from}>`, to: [data.email], reply_to: CONTACT_RECIPIENT,
    subject: 'Nous avons bien reçu votre demande — Litus',
    text: `Bonjour ${data.nom},\n\nVotre demande concernant « ${serviceLabels[data.service]} » a bien été reçue.\n\nVotre demande\n${summaryText}\n\nEt maintenant ?\nArthur ou Aksel va étudier votre demande et vous recontactera rapidement pour échanger sur votre projet et vous proposer la solution la plus adaptée.\n\nUne précision à ajouter ? Appelez nous au 07 44 98 55 21\n\nLitus — Stratégie digitale & acquisition\nLorient · Le Mans\nlitus.fr`,
    html: `<!doctype html><html lang="fr"><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta charset="utf-8"></head><body style="margin:0;background:#f7f6f2;color:#142237;font-family:Aptos,'Segoe UI','Helvetica Neue',Arial,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6f2"><tr><td style="padding:34px 14px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:auto"><tr><td style="padding:0 0 18px;text-align:center"><img src="https://www.litus.fr/logo-sans-fond.png" width="92" alt="Litus" style="display:block;width:92px;height:auto;margin:0 auto 12px"><p style="margin:0;color:#c7431b;font-size:11px;font-weight:700;letter-spacing:2.2px;text-transform:uppercase">Demande reçue</p></td></tr><tr><td style="overflow:hidden;background:#fffdf8;border:1px solid #e7e0d3;border-radius:18px;box-shadow:0 18px 45px rgba(20,34,55,.06)"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:34px 34px 20px;text-align:center;border-bottom:1px solid #eee8dd"><h1 style="margin:0;color:#142237;font-family:Georgia,'Times New Roman',serif;font-size:31px;line-height:1.16;font-weight:500">Votre demande est entre de bonnes mains.</h1><p style="margin:16px auto 0;max-width:460px;color:#536176;font-size:15px;line-height:1.7">Bonjour <strong style="color:#142237">${firstName}</strong>, nous avons bien reçu votre demande concernant <strong style="color:#142237">${service}</strong>.</p></td></tr><tr><td style="padding:28px 34px 0"><h2 style="margin:0 0 14px;color:#142237;font-size:18px;line-height:1.3;font-weight:700">Votre demande</h2><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fbf8f1;border:1px solid #ece4d6;border-radius:14px;padding:4px 18px">${summaryHtml}</table></td></tr><tr><td style="padding:26px 34px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff7f0;border:1px solid #f0d8c8;border-left:4px solid #e95e2a;border-radius:14px"><tr><td style="padding:21px 22px"><h2 style="margin:0 0 8px;color:#142237;font-size:18px;line-height:1.3;font-weight:700">Et maintenant ?</h2><p style="margin:0;color:#536176;font-size:14px;line-height:1.7">Arthur ou Aksel va étudier votre demande et vous recontactera rapidement pour échanger sur votre projet et vous proposer la solution la plus adaptée.</p></td></tr></table></td></tr><tr><td style="padding:28px 34px 34px;text-align:center"><a href="tel:+33744985521" style="display:inline-block;background:#e95e2a;color:#fff;text-decoration:none;border-radius:999px;padding:15px 22px;font-size:14px;font-weight:800;line-height:1.2">Une précision à ajouter ? Appelez nous au 07 44 98 55 21</a><p style="margin:26px 0 0;color:#142237;font-size:14px;line-height:1.65"><strong>Litus — Stratégie digitale &amp; acquisition</strong><br><span style="color:#657185">Lorient · Le Mans<br><a href="https://www.litus.fr" style="color:#c7431b;text-decoration:none;font-weight:700">litus.fr</a></span></p></td></tr></table></td></tr></table></td></tr></table></body></html>`,
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

export async function sendContactEmails(data: ContactFormData, config: ContactConfig, idempotencyKey: string, technical?: ContactTechnicalInfo) {
  const notificationId = await sendEmail(contactEmail(data, config.RESEND_FROM_EMAIL, technical), config, `${idempotencyKey}/notification`)
  const confirmationId = await sendEmail(contactConfirmationEmail(data, config.RESEND_FROM_EMAIL), config, `${idempotencyKey}/confirmation`)
  return { notificationId, confirmationId }
}
