import { createClient } from '@libsql/client'
import { NextResponse } from 'next/server'

// GET /api/migrate-lead-crm - Ajoute les colonnes CRM à la table Lead existante
export async function GET() {
    try {
        const databaseUrl = process.env.TURSO_DATABASE_URL
        const authToken = process.env.TURSO_AUTH_TOKEN

        if (!databaseUrl) {
            return NextResponse.json({ error: 'TURSO_DATABASE_URL not configured' }, { status: 500 })
        }

        const client = createClient({
            url: databaseUrl,
            authToken: authToken,
        })

        // Ajouter les nouvelles colonnes (ignore si elles existent déjà)
        const alterStatements = [
            // Lead CRM columns
            `ALTER TABLE Lead ADD COLUMN status TEXT DEFAULT 'new'`,
            `ALTER TABLE Lead ADD COLUMN oneShot REAL`,
            `ALTER TABLE Lead ADD COLUMN monthlyAmount REAL`,
            `ALTER TABLE Lead ADD COLUMN contractMonths INTEGER`,
            `ALTER TABLE Lead ADD COLUMN notes TEXT`,
            `ALTER TABLE Lead ADD COLUMN assignedToId TEXT`,
            // User team columns
            `ALTER TABLE User ADD COLUMN role TEXT DEFAULT 'admin'`,
            `ALTER TABLE User ADD COLUMN avatar TEXT`,
            `ALTER TABLE User ADD COLUMN emailNotifications INTEGER DEFAULT 1`,
        ]

        const results = []
        for (const sql of alterStatements) {
            try {
                await client.execute(sql)
                results.push({ sql, status: 'success' })
            } catch (e: any) {
                // "duplicate column name" est OK
                if (e.message?.includes('duplicate column')) {
                    results.push({ sql, status: 'already exists' })
                } else {
                    results.push({ sql, status: 'error', error: e.message })
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Migration CRM terminée',
            results,
        })

    } catch (error) {
        console.error('Migration error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
