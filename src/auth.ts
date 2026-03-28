import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/database_final'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Mot de passe', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string }
                    })

                    if (!user) {
                        return null
                    }

                    const isValidPassword = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    )

                    if (!isValidPassword) {
                        return null
                    }

                    // Return user object including extra fields needed in session
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.avatar, // Map Prisma "avatar" to NextAuth "image"
                        role: user.role,
                    } as any // Cast to any to bypass strict internal DB types mismatching adapter types if any
                } catch (error) {
                    console.error("Auth DB error:", error)
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: '/login-admin',
    },
    callbacks: {
        // Enriched JWT token with extra user data
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role
                token.picture = user.image
            }
            // Mettre à jour la session si l'utilisateur modifie son profil
            if (trigger === "update" && session) {
                if (session.name) token.name = session.name
                if (session.image) token.picture = session.image
                if (session.role) token.role = session.role
            }
            return token
        },
        // Populate actual session object from JWT token
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string
                ;(session.user as any).role = token.role as string
                if (token.picture) session.user.image = token.picture
            }
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnLogin = nextUrl.pathname === '/login-admin'
            const isOnAdmin = nextUrl.pathname.startsWith('/admin')

            // Allow login page always
            if (isOnLogin) {
                return true
            }

            // Protect all /admin routes
            if (isOnAdmin && !isLoggedIn) {
                return false // Will redirect to login page
            }

            return true
        },
    },
    session: {
        strategy: 'jwt',
    },
})
