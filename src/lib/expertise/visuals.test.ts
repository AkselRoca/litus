import { describe, expect, it } from 'vitest'
import { readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { expertiseTools } from './catalog'
import { expertiseScenes } from './visuals'

describe('Expertise visual assets', () => {
  const files = new Set<string>()
  for (const tool of expertiseTools) {
    it(`${tool.name}: two descriptive local scenes and a dedicated social image`, () => {
      const scenes = expertiseScenes[tool.slug]
      expect(scenes).toHaveLength(2)
      for (const scene of scenes) {
        expect(files.has(scene.file)).toBe(false)
        files.add(scene.file)
        expect(scene.alt.length).toBeGreaterThan(55)
        expect(scene.width).toBeLessThanOrEqual(1280)
        expect(scene.height).toBeGreaterThan(500)
        expect(scene.link.href).toMatch(/^\/(?!\/)/)
        expect(statSync(path.join(process.cwd(), 'public/expertise/images', scene.file + '.webp')).size).toBeLessThan(180_000)
        expect(statSync(path.join(process.cwd(), 'public/expertise/images', scene.file + '-thumb.webp')).size).toBeLessThan(40_000)
        if (scene.source) expect(readFileSync(path.join(process.cwd(), 'public', scene.source.license), 'utf8').length).toBeGreaterThan(500)
        else expect(scene.caption).toContain('pas une capture')
      }
      expect(statSync(path.join(process.cwd(), 'public/expertise/images', tool.slug + '-litus-og.png')).size).toBeLessThan(220_000)
    })
  }
})
