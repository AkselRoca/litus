
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const projects = await prisma.project.findMany()
    console.log('--- PROJECTS LIST ---')
    projects.forEach(p => {
        console.log(`ID: ${p.id} | Title: ${p.title} | Link: ${p.link || 'NONE'}`)
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
