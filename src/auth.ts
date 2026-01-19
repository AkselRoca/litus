import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// Hardcoded admin users (for simplicity - in production use DB)
const ADMIN_USERS = [
    {
        id: '1',
        email: 'aksel@litus.fr',
        name: 'Aksel',
        // Password: "litus2024!"
        passwordHash: '$2b$12$z74G5v0Trwj.f24hfCfJM.n34Hevl.UV6ASqP/TM/ywbFFGuSoooK',
    },
    {
        id: '2',
        email: 'arthur@litus.fr',
        name: 'Arthur',
        // Password: "litus2024!"
        passwordHash: '$2b$12$z74G5v0Trwj.f24hfCfJM.n34Hevl.UV6ASqP/TM/ywbFFGuSoooK',
    },
]

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

                const user = ADMIN_USERS.find(
                    (u) => u.email === credentials.email
                )

                if (!user) {
                    return null
                }

                const isValidPassword = await bcrypt.compare(
                    credentials.password as string,
                    user.passwordHash
                )

                if (!isValidPassword) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            },
        }),
    ],
    pages: {
        signIn: '/login-admin',
    },
    callbacks: {
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
