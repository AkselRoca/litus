// @vitest-environment node

import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { PrismaClient, type Prisma, type Lead } from '@prisma/client'
import { NextRequest } from 'next/server'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { NEWSLETTER_CONSENT_TEXT, NEWSLETTER_CONSENT_VERSION } from '@/lib/validations/newsletter'
import { POST } from './route'

const store = vi.hoisted(() => ({
  upsert: vi.fn<(args: Prisma.LeadUpsertArgs) => Promise<Lead>>(),
  findUnique: vi.fn<(args: Prisma.LeadFindUniqueArgs) => Promise<Lead | null>>(),
}))
vi.mock('@/lib/database_final', () => ({ prisma: { lead: store } }))

let directory: string
let prisma: PrismaClient

function request(payload: unknown) {
  return new NextRequest('http://localhost/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

beforeAll(async () => {
  // The configured application database is never imported or contacted.
  directory = await mkdtemp(path.join(tmpdir(), 'litus-newsletter-test-'))
  prisma = new PrismaClient({ datasources: { db: { url: `file:${path.join(directory, 'newsletter.db').replaceAll('\\', '/')}` } } })
  await prisma.$executeRawUnsafe(`CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY, "type" TEXT NOT NULL, "email" TEXT, "phone" TEXT,
    "data" TEXT NOT NULL, "source" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'new',
    "oneShot" REAL, "monthlyAmount" REAL, "contractMonths" INTEGER, "notes" TEXT,
    "assignedToId" TEXT, "treated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL
  )`)
})

beforeEach(async () => {
  await prisma.lead.deleteMany()
  store.upsert.mockReset().mockImplementation((args) => prisma.lead.upsert(args))
  store.findUnique.mockReset().mockImplementation((args) => prisma.lead.findUnique(args))
})
afterEach(() => { vi.restoreAllMocks() })
afterAll(async () => {
  await prisma?.$disconnect()
  const safePrefix = path.join(tmpdir(), 'litus-newsletter-test-')
  if (directory && path.resolve(directory).startsWith(path.resolve(safePrefix))) await rm(directory, { recursive: true, force: true })
})

describe('POST /api/newsletter with an isolated SQLite subscriber register', () => {
  it.each([
    { email: 'invalid', consent: true },
    { email: 'reader@example.com', consent: false },
    { email: 'reader@example.com' },
    { email: 'reader@example.com', consent: 'true' },
  ])('rejects an invalid request before writing: %j', async (payload) => {
    const response = await POST(request(payload))
    expect(response.status).toBe(400)
    expect((await response.json()).success).toBe(false)
    expect(await prisma.lead.count()).toBe(0)
  })

  it('rejects malformed JSON without recording a subscription', async () => {
    const response = await POST(new NextRequest('http://localhost/api/newsletter', { method: 'POST', body: '{' }))
    expect(response.status).toBe(400)
    expect(await prisma.lead.count()).toBe(0)
  })

  it('persists the normalized email and the exact consent before acknowledging success', async () => {
    const response = await POST(request({ email: ' Reader@Example.com ', consent: true }))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: true, message: 'Votre inscription est bien enregistrée.' })
    const saved = await prisma.lead.findFirstOrThrow()
    expect(saved).toMatchObject({ email: 'reader@example.com', type: 'newsletter', source: 'Blog — newsletter' })
    const consent = JSON.parse(saved.data)
    expect(consent).toMatchObject({ subscriptionStatus: 'subscribed', consent: true, consentText: NEWSLETTER_CONSENT_TEXT, consentVersion: NEWSLETTER_CONSENT_VERSION, privacyPolicy: '/politique-confidentialite' })
    expect(Number.isNaN(Date.parse(consent.consentedAt))).toBe(false)

    // Confirm the record survives a disconnect/reconnect; not an in-memory success.
    await prisma.$disconnect()
    expect(await prisma.lead.count({ where: { email: 'reader@example.com' } })).toBe(1)
  })

  it('records concurrent and repeated requests once, preserving the first consent and CRM notes', async () => {
    await POST(request({ email: 'reader@example.com', consent: true }))
    const first = await prisma.lead.findFirstOrThrow()
    await prisma.lead.update({ where: { id: first.id }, data: { notes: 'Conserver cette note CRM.' } })
    const responses = await Promise.all(Array.from({ length: 4 }, () => POST(request({ email: 'READER@example.com', consent: true }))))
    expect(responses.every((response) => response.status === 200)).toBe(true)
    expect(await prisma.lead.count()).toBe(1)
    const saved = await prisma.lead.findFirstOrThrow()
    expect(saved.data).toBe(first.data)
    expect(saved.notes).toBe('Conserver cette note CRM.')
  })

  it('creates only one subscription when the first requests arrive concurrently', async () => {
    const responses = await Promise.all(Array.from({ length: 4 }, () => POST(request({ email: 'new-reader@example.com', consent: true }))))
    expect(responses.every((response) => response.status === 200)).toBe(true)
    expect(await prisma.lead.count({ where: { email: 'new-reader@example.com' } })).toBe(1)
  })

  it('returns an error when persistence fails, without revealing database details', async () => {
    store.upsert.mockRejectedValueOnce(new Error('private database connection details'))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const response = await POST(request({ email: 'reader@example.com', consent: true }))
    expect(response.status).toBe(503)
    const body = await response.json()
    expect(body.success).toBe(false)
    expect(JSON.stringify(body)).not.toContain('private database')
    expect(await prisma.lead.count()).toBe(0)
  })

  it('does not turn an unconfirmed duplicate-key error into a false success', async () => {
    store.upsert.mockRejectedValueOnce({ code: 'P2002' })
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const response = await POST(request({ email: 'reader@example.com', consent: true }))
    expect(response.status).toBe(503)
    expect((await response.json()).success).toBe(false)
  })
})
