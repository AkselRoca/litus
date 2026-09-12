import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { ADMIN_EMAIL, ADMIN_NAME } from '@/lib/admin/identity'
import { checkPassword, consumeFactor, getSecurity, takeAttempt } from '@/lib/admin/security'

const maxAge = 7 * 24 * 60 * 60

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  // Keep the same HTTPS cookie policy in handlers, navigation and server components.
  useSecureCookies: Boolean(process.env.VERCEL) || Boolean(process.env.AUTH_URL?.startsWith('https://')),
  pages: { signIn: '/login-admin' },
  session: { strategy: 'jwt', maxAge },
  jwt: { maxAge },
  providers: [Credentials({
    name: 'Litus',
    credentials: {
      email: { label: 'Compte', type: 'email' },
      password: { label: 'Mot de passe', type: 'password' },
      code: { label: 'Code Google Authenticator ou code de secours', type: 'text' },
    },
    async authorize(credentials) {
      const email = typeof credentials.email === 'string' ? credentials.email.trim().toLowerCase() : ''
      const password = typeof credentials.password === 'string' ? credentials.password : ''
      const code = typeof credentials.code === 'string' ? credentials.code : ''
      if (email !== ADMIN_EMAIL || !password || password.length > 256 || code.length > 64) return null
      try {
        if (!await takeAttempt('login:litus') || !await checkPassword(password)) return null
        const state = await getSecurity()
        if (!state || (state.secret && !await consumeFactor(state, code))) return null
        return {
          id: state.userId, email: ADMIN_EMAIL, name: ADMIN_NAME, image: null,
          role: 'admin', securityVersion: Number(state.version), twoFactorVerified: !!state.secret,
        }
      } catch {
        console.error('Admin authentication unavailable')
        return null
      }
    },
  })],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.securityVersion = user.securityVersion
        token.twoFactorVerified = user.twoFactorVerified
      }
      const state = await getSecurity()
      if (!state || token.email !== ADMIN_EMAIL || (token.id ?? token.sub) !== state.userId) return null
      if (Number(token.securityVersion ?? 0) !== Number(state.version)) return null
      if (state.secret && token.twoFactorVerified !== true) return null
      token.id = state.userId
      token.role = 'admin'
      token.name = ADMIN_NAME
      token.picture = null
      // Never trust security flags, roles or identities from session.update().
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.name = ADMIN_NAME
      session.user.email = ADMIN_EMAIL
      session.user.image = null
      session.user.role = 'admin'
      session.user.securityVersion = Number(token.securityVersion ?? 0)
      session.user.twoFactorVerified = token.twoFactorVerified === true
      return session
    },
  },
})
