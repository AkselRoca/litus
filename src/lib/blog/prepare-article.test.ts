import { describe, expect, it } from 'vitest'
import { headingText, prepareArticle } from './prepare-article'
import type { BlogImage } from './articles'

const photo: BlogImage = { src: '/blog/photos/workshop.webp', alt: 'Un atelier & ses outils', caption: 'Le travail de l’artisan.', sourceUrl: 'https://example.com/photo', credit: 'Photographe', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', width: 1200, height: 800 }

describe('article reading structure', () => {
  it('creates unique anchors from accented headings and retains heading levels', () => {
    const prepared = prepareArticle('<h2>Les étapes à vérifier</h2><p>Introduction.</p><h3>Votre <strong>équipe</strong></h3><h2>Les étapes à vérifier</h2>')
    expect(prepared.headings).toEqual([{ id: 'les-etapes-a-verifier', text: 'Les étapes à vérifier', level: 2 }, { id: 'votre-equipe', text: 'Votre équipe', level: 3 }, { id: 'les-etapes-a-verifier-2', text: 'Les étapes à vérifier', level: 2 }])
    prepared.headings.forEach(heading => expect(prepared.content).toContain(`id="${heading.id}"`))
  })
  it('keeps existing anchors, safely decodes entities and preserves surrounding markup', () => {
    const prepared = prepareArticle('<h2 class="intro" id="deja-present">SEO &amp; Google Ads</h2><p>Le contenu reste ici.</p>')
    expect(prepared.headings[0]).toMatchObject({ id: 'deja-present', text: 'SEO & Google Ads' })
    expect(prepared.content).toContain('class="intro"')
    expect(prepared.content).toContain('<p>Le contenu reste ici.</p>')
    expect(headingText('Conseils &#233;ditoriaux &#xE0; suivre')).toBe('Conseils éditoriaux à suivre')
  })
  it('inserts all three photos between complete sections and escapes their metadata', () => {
    const html = Array.from({ length: 7 }, (_, index) => `<h2>Partie ${index}</h2><p>Paragraphe ${index}.</p>`).join('')
    const prepared = prepareArticle(html, [{ ...photo, caption: '<script>texte</script>' }, photo, photo])
    expect(prepared.content.match(/class="blog-editorial-figure"/g)).toHaveLength(3)
    expect(prepared.content).toContain('alt="Un atelier &amp; ses outils"')
    expect(prepared.content).toContain('&lt;script&gt;texte&lt;/script&gt;')
    expect(prepared.content).not.toContain('</h2><figure')
    expect(prepared.content.match(/loading="lazy"/g)).toHaveLength(3)
  })
  it('does not drop photographs when a legacy article has few or no headings', () => {
    const prepared = prepareArticle('<p>Un article ancien.</p>', [photo, photo, photo])
    expect(prepared.headings).toEqual([])
    expect(prepared.content.match(/<figure/g)).toHaveLength(3)
  })
  it('does not mistake a data-id attribute for an anchor', () => {
    const prepared = prepareArticle('<h2 data-id="internal">Un titre lisible</h2>')
    expect(prepared.headings[0].id).toBe('un-titre-lisible')
    expect(prepared.content).toContain('data-id="internal"')
  })
})
