import { NextResponse } from 'next/server'
import { createClient } from '@libsql/client'

// Endpoint pour migrer le schéma de la base Turso
// À exécuter UNE FOIS après le déploiement
export async function GET() {
    // Protection : seulement si on a les credentials Turso
    if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
        return NextResponse.json({ error: 'Turso credentials not configured' }, { status: 500 })
    }

    const logs: string[] = []

    try {
        const client = createClient({
            url: process.env.TURSO_DATABASE_URL,
            authToken: process.env.TURSO_AUTH_TOKEN,
        })

        logs.push('Connected to Turso')

        // Migrations SQL pour ajouter les nouvelles colonnes au modèle Lead
        const migrations = [
            // Ajout des colonnes CRM au modèle Lead
            `ALTER TABLE Lead ADD COLUMN status TEXT DEFAULT 'new'`,
            `ALTER TABLE Lead ADD COLUMN oneShot REAL`,
            `ALTER TABLE Lead ADD COLUMN monthlyAmount REAL`,
            `ALTER TABLE Lead ADD COLUMN contractMonths INTEGER`,
            `ALTER TABLE Lead ADD COLUMN notes TEXT`,
            `ALTER TABLE Lead ADD COLUMN assignedToId TEXT`,

            // Ajout des colonnes pour le nouveau CMS Blog
            `ALTER TABLE BlogPost ADD COLUMN category TEXT DEFAULT 'SEO'`,
            `ALTER TABLE BlogPost ADD COLUMN coverImage TEXT`,
            `ALTER TABLE BlogPost ADD COLUMN tableOfContents TEXT`,
            `ALTER TABLE BlogPost ADD COLUMN authorId TEXT`,
            `ALTER TABLE BlogPost ADD COLUMN publishedAt DATETIME`,

            // Création de la table MarketAnalysis
            `CREATE TABLE IF NOT EXISTS MarketAnalysis (
                id TEXT PRIMARY KEY,
                metier TEXT NOT NULL,
                ville TEXT NOT NULL,
                keyword TEXT NOT NULL,
                searchVolume INTEGER NOT NULL,
                cpc REAL NOT NULL,
                competition TEXT NOT NULL,
                competitionIndex INTEGER NOT NULL,
                dataSource TEXT NOT NULL,
                panierMoyen INTEGER NOT NULL,
                tauxConversion REAL NOT NULL,
                tauxCapture REAL NOT NULL,
                potentielMensuel INTEGER NOT NULL,
                potentielAnnuel INTEGER NOT NULL,
                tendance TEXT NOT NULL,
                analyse TEXT NOT NULL,
                conseils TEXT NOT NULL,
                leadId TEXT UNIQUE,
                email TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )`,

            // Index pour MarketAnalysis
            `CREATE INDEX IF NOT EXISTS idx_market_analysis_metier ON MarketAnalysis(metier)`,
            `CREATE INDEX IF NOT EXISTS idx_market_analysis_ville ON MarketAnalysis(ville)`,
            `CREATE INDEX IF NOT EXISTS idx_market_analysis_created ON MarketAnalysis(createdAt)`,
        ]

        for (const sql of migrations) {
            try {
                await client.execute(sql)
                logs.push(`✅ ${sql.substring(0, 50)}...`)
            } catch (error) {
                const msg = error instanceof Error ? error.message : String(error)
                // Ignorer si la colonne existe déjà
                if (msg.includes('duplicate column') || msg.includes('already exists')) {
                    logs.push(`⏭️ Skipped (already exists): ${sql.substring(0, 40)}...`)
                } else {
                    logs.push(`❌ Error: ${sql.substring(0, 40)}... - ${msg}`)
                }
            }
        }

        // Vérifier les colonnes de la table Lead
        const result = await client.execute(`PRAGMA table_info(Lead)`)
        const columns = result.rows.map(row => row.name)
        logs.push(`Columns in Lead table: ${columns.join(', ')}`)

        return NextResponse.json({
            success: true,
            message: 'Migration completed',
            logs
        })

    } catch (error) {
        logs.push(`FATAL ERROR: ${error instanceof Error ? error.message : String(error)}`)
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            logs
        }, { status: 500 })
    }
}
