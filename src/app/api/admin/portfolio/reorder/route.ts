import { auth } from '@/auth'
import { prisma } from '@/lib/database_final'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
    const session = await auth()
    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const updates = await req.json()

        // Use a transaction to update all items efficiently and safely
        await prisma.$transaction(
            updates.map((update: { id: string; order: number }) =>
                prisma.project.update({
                    where: { id: update.id },
                    data: { order: update.order },
                })
            )
        )

        revalidatePath('/realisations')
        revalidatePath('/admin/portfolio')
        revalidatePath('/')

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('[PROJECT_REORDER]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
