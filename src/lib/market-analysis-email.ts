import 'server-only'
import { CONTACT_RECIPIENT, escapeHtml, sendEmail } from './email'
import type { ContactConfig } from './contact/config'
import type { MarketAnalysis } from './gemini'

export interface MarketRequest {
  metier: string
  ville: string
  email: string
  page_path: string
}

export function marketAnalysisEmails(data: MarketRequest, analysis: MarketAnalysis, from: string, requestedAt: string) {
  const fields = [
    ['Activité', data.metier], ['Ville', data.ville],
    ['Recherches mensuelles estimées', analysis.recherchesMensuelles.toLocaleString('fr-FR')],
    ['Concurrence estimée', analysis.concurrence], ['Tendance estimée', analysis.tendance],
  ]
  const warning = 'Estimation automatique par IA : ces projections ne sont pas des mesures de trafic, ni une garantie de chiffre d’affaires. Un audit est nécessaire pour les confirmer.'
  const amount = `${analysis.potentielAnnuel.toLocaleString('fr-FR')} €`
  const rows = fields.map(([label, value]) => `<tr><td style="padding:12px 0;border-bottom:1px solid #eee7dc;color:#657185">${escapeHtml(label)}</td><td style="padding:12px 0 12px 16px;border-bottom:1px solid #eee7dc;text-align:right;overflow-wrap:anywhere">${escapeHtml(value)}</td></tr>`).join('')
  return [false, true].map(internal => ({
    from: `Litus <${from}>`,
    to: [internal ? CONTACT_RECIPIENT : data.email],
    reply_to: internal ? data.email : CONTACT_RECIPIENT,
    subject: internal ? 'Nouvelle demande de marché local — Litus' : 'Votre estimation de marché local — Litus',
    text: `${internal ? 'Nouvelle demande de marché local' : 'Votre première estimation'}\n\n${internal ? `Email du prospect : ${data.email}\n\n` : ''}${fields.map(([label, value]) => `${label} : ${value}`).join('\n')}\n\nPotentiel annuel estimé : ${amount}\n\n${analysis.analyse}\n\n${warning}\n\n${internal ? `Informations techniques\nDate de la demande (UTC) : ${requestedAt}\nPage du formulaire (déclarée) : ${data.page_path}\nHoneypot : présent et vide\nProtections : origine, validation, limite anti-spam et idempotence validées.\nRépondez directement à cet email pour contacter le prospect.` : 'Pour approfondir votre marché, échangeons au 07 44 98 55 21. Votre email sert uniquement à traiter cette demande, sans inscription à une newsletter.'}\n\nLitus — Stratégie digitale & acquisition\nLorient · Le Mans\nhttps://www.litus.fr`,
    html: `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f7f6f2;color:#142237;font-family:Aptos,'Segoe UI',Arial,sans-serif"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:auto"><tr><td style="text-align:center;padding-bottom:24px"><img src="https://www.litus.fr/logo-sans-fond.png" alt="Litus" width="92" style="width:92px;height:auto"></td></tr><tr><td style="background:#fffdf8;border:1px solid #e7e0d3;border-radius:20px;padding:30px"><p style="color:#c7431b;font-size:12px;letter-spacing:2px">VOTRE MARCHÉ LOCAL</p><h1 style="font-family:Georgia,serif;font-weight:500;font-size:30px;line-height:1.2">${internal ? 'Une nouvelle demande à accompagner.' : 'Une première lecture de votre potentiel.'}</h1>${internal ? `<p>Contact : <a href="mailto:${escapeHtml(data.email)}" style="color:#c7431b">${escapeHtml(data.email)}</a></p>` : ''}<table width="100%" cellspacing="0" cellpadding="0" style="font-size:14px">${rows}</table><div style="margin:24px 0;padding:24px;background:#fff2e9;border:1px solid #efd5c3;border-radius:14px"><p style="margin:0;color:#657185;font-size:13px">Potentiel annuel estimé</p><p style="margin:10px 0;color:#142237;font-size:38px;font-weight:bold">${escapeHtml(amount)}</p><p style="margin:0;color:#657185;font-size:12px">Projection indicative, à confirmer avec un audit.</p></div><p style="font-size:15px;line-height:1.7;overflow-wrap:anywhere">${escapeHtml(analysis.analyse)}</p><p style="color:#657185;font-size:12px;line-height:1.6">${warning}</p>${internal ? `<div style="margin-top:24px;border-top:1px solid #e7e0d3;padding-top:18px"><h2 style="font-size:17px">Informations techniques</h2><p style="font-size:12px;color:#657185;line-height:1.7">Date de la demande (UTC) : ${escapeHtml(requestedAt)}<br>Page du formulaire (déclarée) : ${escapeHtml(data.page_path)}<br>Honeypot : présent et vide.<br>Origine, validation, limite anti-spam et idempotence validées.</p><p style="font-size:13px">Répondez directement à cet email pour contacter le prospect.</p></div>` : `<p style="margin-top:26px"><a href="https://www.litus.fr/contact?objet=audit" style="display:inline-block;background:#c64b20;color:#fff;text-decoration:none;padding:15px 24px;border-radius:30px;font-weight:bold">Approfondir avec Litus</a></p><p style="color:#657185;font-size:12px;line-height:1.6">Votre adresse sert uniquement à traiter cette demande, sans inscription à une newsletter. <a href="https://www.litus.fr/politique-confidentialite" style="color:#657185">Confidentialité</a></p>`}</td></tr><tr><td style="text-align:center;padding:22px;color:#657185;font-size:13px;line-height:1.7"><strong style="color:#142237">Litus — Stratégie digitale &amp; acquisition</strong><br>Lorient · Le Mans<br><a href="tel:+33744985521" style="color:#c7431b">07 44 98 55 21</a> · <a href="https://www.litus.fr" style="color:#c7431b">litus.fr</a></td></tr></table></td></tr></table></body></html>`,
  }))
}

export async function sendMarketAnalysisEmails(data: MarketRequest, analysis: MarketAnalysis, config: ContactConfig, id: string, requestedAt: string) {
  const [customer, notification] = marketAnalysisEmails(data, analysis, config.RESEND_FROM_EMAIL, requestedAt)
  // Identical payloads and provider keys prevent duplicate mail on retries.
  await sendEmail(notification, config, `market/${id}/notification`)
  await sendEmail(customer, config, `market/${id}/customer`)
}
