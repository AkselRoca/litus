export { auth as middleware } from '@/auth'

export const config = {
    // Exclude login page from middleware protection
    matcher: [
        '/admin/((?!login).*)',
    ],
}
