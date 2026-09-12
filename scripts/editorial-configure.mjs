import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { randomBytes } from 'node:crypto'

const project = JSON.parse(readFileSync('.vercel/project.json', 'utf8'))
if (!process.env.VERCEL_API_TOKEN) throw new Error('Vercel API token is required')
const runtime = '.env.editorial.local'
if (!existsSync(runtime)) writeFileSync(runtime, `CRON_SECRET=${randomBytes(48).toString('hex')}\nEDITORIAL_ENABLED=true\nEDITORIAL_MODEL=gemini-2.5-flash\nEDITORIAL_SEARCH_PROVIDER=gemini\n`)
process.loadEnvFile(runtime)
for (const key of ['CRON_SECRET', 'EDITORIAL_ENABLED', 'EDITORIAL_MODEL', 'EDITORIAL_SEARCH_PROVIDER']) {
  const response = await fetch(`https://api.vercel.com/v10/projects/${project.projectId}/env?teamId=${project.orgId}&upsert=true`, {
    method: 'POST', headers: { Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value: process.env[key], target: ['production'], type: 'encrypted' }),
  })
  if (!response.ok) throw new Error(`Vercel env ${key}: HTTP ${response.status}`)
  console.log(`${key}: configured for production (value hidden)`)
}
