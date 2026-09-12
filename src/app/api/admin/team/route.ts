import { prisma } from '@/lib/database_final'
import { ADMIN_EMAIL, ADMIN_NAME } from '@/lib/admin/identity'
import { withAdmin } from '@/lib/admin/guard'
// Kept read-only for existing CRM assignment selectors.
export const GET = withAdmin(async function GET() {
  const user = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL }, select: { id: true, email: true, role: true } })
  return Response.json({ success: true, data: user ? [{ ...user, name: ADMIN_NAME, avatar: null }] : [] })
})
const closed = withAdmin(async function closed() {
  return Response.json({ success: false, error: 'Litus utilise un compte administrateur unique.' }, { status: 410 })
})
export { closed as POST, closed as PATCH, closed as DELETE }
