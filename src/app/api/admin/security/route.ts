import QRCode from 'qrcode'
import { withAdmin } from '@/lib/admin/guard'
import { beginEnrollment, checkPassword, confirmEnrollment, disableFactor, getSecurity, SecurityError, takeAttempt } from '@/lib/admin/security'

export const runtime = 'nodejs'
export const GET = withAdmin(async function GET() {
  const state = await getSecurity()
  if (!state) return Response.json({ success: false, error: 'Compte Litus non configuré.' }, { status: 503 })
  return Response.json({ success: true, enabled: !!state.secret, recoveryCodesRemaining: (JSON.parse(state.recoveryHashes) as string[]).length })
})
export const POST = withAdmin(async function POST(request: Request) {
  try {
    if (!await takeAttempt('security:litus', 10)) throw new SecurityError('Trop de tentatives. Réessayez dans cinq minutes.', 429)
    const text = await request.text()
    if (text.length > 2048) throw new SecurityError('Requête trop volumineuse.', 413)
    let body: { action?: unknown; password?: unknown; code?: unknown }
    try { body = JSON.parse(text) } catch { throw new SecurityError('Requête invalide.') }
    if (!body || typeof body.password !== 'string' || !await checkPassword(body.password)) {
      throw new SecurityError('Mot de passe incorrect.', 403)
    }
    const state = await getSecurity()
    if (!state) throw new SecurityError('Compte Litus non configuré.', 503)
    if (body.action === 'begin') {
      const setup = await beginEnrollment(state)
      // Local QR generation: never disclose the seed to another service.
      const qr = await QRCode.toDataURL(setup.uri, { width: 256, margin: 2, errorCorrectionLevel: 'M' })
      return Response.json({ success: true, secret: setup.secret, qr, expiresAt: setup.expiresAt })
    }
    if (typeof body.code !== 'string' || body.code.length > 64) throw new SecurityError('Saisissez votre code.')
    if (body.action === 'confirm') {
      const recoveryCodes = await confirmEnrollment(state, body.code)
      return Response.json({ success: true, enabled: true, recoveryCodes, reconnect: true })
    }
    if (body.action === 'disable') {
      await disableFactor(state, body.code)
      return Response.json({ success: true, enabled: false, reconnect: true })
    }
    throw new SecurityError('Action inconnue.')
  } catch (error) {
    if (error instanceof SecurityError) return Response.json({ success: false, error: error.message }, { status: error.status })
    return Response.json({ success: false, error: 'Configuration de sécurité indisponible. Réessayez plus tard.' }, { status: 503 })
  }
})
