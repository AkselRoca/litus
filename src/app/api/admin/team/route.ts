import { prisma } from '@/lib/database_final'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// GET /api/admin/team - Liste des membres
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatar: true,
                emailNotifications: true,
                createdAt: true,
                _count: {
                    select: { assignedLeads: true }
                }
            }
        })

        return NextResponse.json({ success: true, data: users })

    } catch (error) {
        console.error('List team error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

// POST /api/admin/team - Créer un membre
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        if (!body.email || !body.name || !body.password) {
            return NextResponse.json({ success: false, error: 'Champs requis manquants' }, { status: 400 })
        }

        // Vérifier si l'email existe déjà
        const existing = await prisma.user.findUnique({ where: { email: body.email } })
        if (existing) {
            return NextResponse.json({ success: false, error: 'Cet email existe déjà' }, { status: 400 })
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(body.password, 12)

        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: hashedPassword,
                role: body.role || 'commercial',
                avatar: body.avatar || null,
                emailNotifications: body.emailNotifications ?? true,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatar: true,
                emailNotifications: true,
                createdAt: true,
            }
        })

        return NextResponse.json({ success: true, data: user })

    } catch (error) {
        console.error('Create team member error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
