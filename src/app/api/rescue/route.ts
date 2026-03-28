import { prisma } from '@/lib/database_final'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function GET() {
    try {
        const hashedPassword = await bcrypt.hash('litus2024!', 12)

        const user = await prisma.user.upsert({
            where: { email: 'aksel@litus.fr' },
            update: {
                password: hashedPassword,
                role: 'admin',
                name: 'Aksel'
            },
            create: {
                email: 'aksel@litus.fr',
                name: 'Aksel',
                password: hashedPassword,
                role: 'admin'
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Compte aksel@litus.fr réinitialisé avec succès.',
            password_reset_to: 'litus2024!',
            user_id: user.id
        })
    } catch (error) {
        console.error('Rescue route error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
