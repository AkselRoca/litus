import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { ADMIN_EMAIL } from '@/lib/admin/identity'

export const proxy = auth(request => {
  const session = request.auth
  if (session?.user?.email !== ADMIN_EMAIL || session.user.role !== 'admin') {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ success: false, error: 'Connexion requise.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } })
    }
    const response = NextResponse.redirect(new URL('/login-admin', request.nextUrl))
    response.headers.set('Cache-Control', 'private, no-store')
    return response
  }
  const response = NextResponse.next()
  response.headers.set('Cache-Control', 'private, no-store')
  return response
})
export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] }
