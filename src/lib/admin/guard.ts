import { auth } from '@/auth'
import { ADMIN_EMAIL } from './identity'

export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  return !!origin && origin === new URL(request.url).origin
}

// Preserve the handler's exact signature, including dynamic route params.
export function withAdmin<Args extends unknown[]>(handler: (...args: Args) => Promise<Response>) {
  return async (...args: Args): Promise<Response> => {
    try {
      const session = await auth()
      if (session?.user?.email !== ADMIN_EMAIL || session.user.role !== 'admin') {
        return Response.json({ success: false, error: 'Connexion requise.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } })
      }
      const request = args[0] as Request | undefined
      if (request && !['GET', 'HEAD', 'OPTIONS'].includes(request.method) && !sameOrigin(request)) {
        return Response.json({ success: false, error: 'Origine non autorisée.' }, { status: 403 })
      }
      const response = await handler(...args)
      response.headers.set('Cache-Control', 'private, no-store')
      return response
    } catch {
      return Response.json({ success: false, error: 'Service temporairement indisponible.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
    }
  }
}
