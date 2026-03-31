import { prisma } from '@/lib/database_final'
import { NextResponse } from 'next/server'

// Script pour créer les tables sur Turso et peupler les données
export async function GET() {
    try {
        // Créer les tables manuellement avec SQL brut
        // Prisma ne supporte pas encore db push avec LibSQL adapter

        const createTables = `
            CREATE TABLE IF NOT EXISTS User (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                name TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS Lead (
                id TEXT PRIMARY KEY,
                type TEXT NOT NULL,
                email TEXT,
                phone TEXT,
                data TEXT NOT NULL,
                source TEXT NOT NULL,
                status TEXT DEFAULT 'new',
                oneShot REAL,
                monthlyAmount REAL,
                contractMonths INTEGER,
                notes TEXT,
                treated INTEGER DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS BlogPost (
                id TEXT PRIMARY KEY,
                slug TEXT UNIQUE NOT NULL,
                title TEXT NOT NULL,
                excerpt TEXT NOT NULL,
                content TEXT NOT NULL,
                metaTitle TEXT,
                metaDesc TEXT,
                published INTEGER DEFAULT 0,
                publishedAt DATETIME,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS Config (
                id TEXT PRIMARY KEY DEFAULT 'main',
                dispo INTEGER DEFAULT 1,
                nextAvailableDate TEXT
            );
            
            CREATE TABLE IF NOT EXISTS EstimatorData (
                id TEXT PRIMARY KEY,
                metier TEXT NOT NULL,
                ville TEXT NOT NULL,
                searchesPerMonth INTEGER NOT NULL,
                avgBasket INTEGER NOT NULL,
                UNIQUE(metier, ville)
            );
            
            CREATE TABLE IF NOT EXISTS LeadMagnetDownload (
                id TEXT PRIMARY KEY,
                type TEXT NOT NULL,
                email TEXT,
                source TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS Project (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                categories TEXT NOT NULL,
                imageUrl TEXT NOT NULL,
                link TEXT,
                stats TEXT NOT NULL,
                tags TEXT NOT NULL,
                featured INTEGER DEFAULT 0,
                "order" INTEGER DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS Media (
                id TEXT PRIMARY KEY,
                publicId TEXT UNIQUE NOT NULL,
                url TEXT NOT NULL,
                filename TEXT NOT NULL,
                alt TEXT,
                width INTEGER,
                height INTEGER,
                format TEXT,
                bytes INTEGER,
                folder TEXT DEFAULT 'litus',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `

        // Exécuter les créations de tables via Prisma $executeRawUnsafe
        const statements = createTables.split(';').filter(s => s.trim())
        for (const sql of statements) {
            if (sql.trim()) {
                await prisma.$executeRawUnsafe(sql)
            }
        }

        // Créer les index
        const indexes = [
            'CREATE INDEX IF NOT EXISTS Lead_type_idx ON Lead(type)',
            'CREATE INDEX IF NOT EXISTS Lead_createdAt_idx ON Lead(createdAt)',
            'CREATE INDEX IF NOT EXISTS Lead_treated_idx ON Lead(treated)',
            'CREATE INDEX IF NOT EXISTS BlogPost_slug_idx ON BlogPost(slug)',
            'CREATE INDEX IF NOT EXISTS BlogPost_published_idx ON BlogPost(published)',
            'CREATE INDEX IF NOT EXISTS BlogPost_publishedAt_idx ON BlogPost(publishedAt)',
            'CREATE INDEX IF NOT EXISTS EstimatorData_metier_idx ON EstimatorData(metier)',
            'CREATE INDEX IF NOT EXISTS EstimatorData_ville_idx ON EstimatorData(ville)',
            'CREATE INDEX IF NOT EXISTS LeadMagnetDownload_createdAt_idx ON LeadMagnetDownload(createdAt)',
            'CREATE INDEX IF NOT EXISTS Project_featured_idx ON Project(featured)',
            'CREATE INDEX IF NOT EXISTS Media_folder_idx ON Media(folder)',
            'CREATE INDEX IF NOT EXISTS Media_createdAt_idx ON Media(createdAt)',
        ]

        for (const sql of indexes) {
            try {
                await prisma.$executeRawUnsafe(sql)
            } catch (e) {
                // Index peut déjà exister
            }
        }

        // Migrations : ajouter les colonnes manquantes aux tables existantes
        // SQLite ne supporte pas "ADD COLUMN IF NOT EXISTS", on catch l'erreur si déjà présente
        const migrations = [
            'ALTER TABLE Config ADD COLUMN nextAvailableDate TEXT',
            'ALTER TABLE Project ADD COLUMN visible INTEGER DEFAULT 1',
        ]

        for (const sql of migrations) {
            try {
                await prisma.$executeRawUnsafe(sql)
            } catch (e) {
                // Colonne existe déjà — on ignore
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Tables created/migrated successfully. Now call /api/seed to populate data.'
        })

    } catch (error) {
        console.error("Setup Error:", error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
