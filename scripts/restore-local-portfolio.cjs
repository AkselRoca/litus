// Restore the portfolio recorded in Git without deleting or replacing local edits.
// Usage: node --env-file=.env scripts/restore-local-portfolio.cjs
const fs = require('node:fs')
const path = require('node:path')
const { PrismaClient } = require('@prisma/client')
const projects = require('../prisma/data/portfolio.json')

const root = path.resolve(__dirname, '..')
const databaseUrl = process.env.DATABASE_URL || ''
if (!databaseUrl.startsWith('file:')) {
  throw new Error('This command only supports a local SQLite database.')
}
const databasePath = path.resolve(root, 'prisma', databaseUrl.slice(5))
const relative = path.relative(root, databasePath)
if (relative.startsWith('..') || path.isAbsolute(relative)) {
  throw new Error('The local database must be inside this project.')
}
if (!fs.existsSync(databasePath))
  throw new Error('Initialize the local database first.')
const backup = path.join(root, '.git', `portfolio-backup-${Date.now()}.db`)
fs.copyFileSync(databasePath, backup)

const prisma = new PrismaClient()
async function main() {
  let added = 0
  await prisma.$transaction(async tx => {
    for (const project of projects) {
      const existing = await tx.project.findFirst({
        where: { title: project.title },
      })
      if (existing) continue
      await tx.project.create({ data: { ...project, visible: true } })
      added++
    }
  })
  console.log(
    `${added} projects restored; ${projects.length - added} existing projects preserved.`
  )
  console.log(
    `Visible projects: ${await prisma.project.count({ where: { visible: true } })}`
  )
}
main()
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
