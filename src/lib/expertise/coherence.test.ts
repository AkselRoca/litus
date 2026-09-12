import { describe, expect, it } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { expertiseTools, homeTools } from './catalog'
import { expertisePages } from './content'
import { aiPillars, expertiseCategories } from './categories'
import { connectedDefinitions } from './connected-definitions'
import { expertiseScenes } from './visuals'

describe('Home, directory, categories and expertise routes stay aligned', () => {
  it('gives every home technology a complete page and official local identity', () => {
    expect(homeTools).toHaveLength(26)
    expect(expertiseTools).toHaveLength(30)
    for (const tool of homeTools) {
      expect(expertisePages.find(page => page.slug === tool.slug), tool.name).toBeDefined()
      expect(existsSync(path.join(process.cwd(), 'public', tool.logo)), tool.logo).toBe(true)
    }
    expect(homeTools.map(tool => tool.slug)).toEqual(expect.arrayContaining(['tailwind', 'framer', 'vercel', 'stripe', 'shopify', 'wordpress', 'google-workspace', ...aiPillars]))
  })
  it('assigns every technology to a discoverable category', () => {
    const assigned = new Set(expertiseCategories.flatMap(category => category.tools))
    expect([...assigned].sort()).toEqual(expertiseTools.map(tool => tool.slug).sort())
    expect(expertiseCategories.find(category => category.id === 'automation')?.tools).toEqual(['openai', 'codex', 'claude', 'n8n'])
    expect(expertiseCategories.find(category => category.id === 'development')?.tools).toContain('python')
    expect(expertiseCategories.find(category => category.id === 'software')?.tools).toEqual(expect.arrayContaining(['csharp', 'dotnet', 'labview']))
  })
  it('keeps generated lightweight catalogue data aligned with the editorial source', () => {
    for (const definition of connectedDefinitions) {
      const tool = expertiseTools.find(item => item.slug === definition.slug)
      expect(tool).toMatchObject({ name: definition.name, logo: definition.logo, category: definition.category, summary: definition.intro })
      expect(expertiseScenes[definition.slug]).toHaveLength(2)
    }
  })
  it('resolves internal editorial links to real pages and anchors', () => {
    const routes = new Set(expertisePages.map(page => `/expertise/${page.slug}`))
    function resolve(href: string) {
      if (!href.startsWith('/') || href.startsWith('//')) throw new Error(`Invalid internal link: ${href}`)
      const url = new URL(href, 'https://litus.fr')
      if (url.pathname.startsWith('/expertise/')) expect(routes.has(url.pathname), href).toBe(true)
      else expect(existsSync(path.join(process.cwd(), 'src/app', url.pathname, 'page.tsx')), href).toBe(true)
    }
    for (const page of expertisePages) {
      resolve(page.reading.href)
      for (const match of JSON.stringify(page.sections).matchAll(/\]\((\/[^)]+)\)/g)) resolve(match[1])
      for (const scene of expertiseScenes[page.slug]) resolve(scene.link.href)
    }
    for (const category of expertiseCategories) resolve(category.href)
  })
  it('uses the catalogue on the home and outputs a crawlable complete directory', () => {
    const home = readFileSync('src/components/sections/LogoCloud.tsx', 'utf8')
    expect(home).toContain('const tools = homeTools')
    expect(home).toContain('href={expertisePath(tool.slug)}')
    expect(home).not.toContain('linkedTool ?')
    const directory = readFileSync('src/components/expertise/ExpertiseDirectory.tsx', 'utf8')
    expect(directory).not.toContain("'use client'")
    expect(directory).toContain('expertiseTools.map')
  })
})
