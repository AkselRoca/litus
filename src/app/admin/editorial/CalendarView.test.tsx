import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
vi.mock('./actions', () => ({ saveEditorialAction: vi.fn() }))
import CalendarView, { type CalendarEntry } from './CalendarView'
const entry: CalendarEntry = { id: 'one', title: 'Résumé quotidien des emails avec n8n', scheduledAt: '2026-09-14T07:00:00Z', status: 'Planifié', detail: 'Sujet à préparer', cluster: 'n8n', pillar: 'Outils & IA', keyword: 'résumé emails n8n', preview: '/admin/editorial/one', edit: '/admin/editorial/one/edit', version: 'one' }
describe('Editorial calendar UI', () => {
  it('shows title, status, keyword and both private actions', () => {
    render(<CalendarView entries={[entry]} today="2026-09-13" />)
    expect(screen.getByRole('link', { name: 'Prévisualiser' })).toHaveAttribute('href', entry.preview)
    expect(screen.getByRole('link', { name: 'Modifier' })).toHaveAttribute('href', entry.edit)
    expect(screen.getByText('résumé emails n8n')).toBeInTheDocument()
  })
  it('navigates months and keeps all items discoverable in the list', () => {
    render(<CalendarView entries={[entry]} today="2026-09-13" />)
    fireEvent.click(screen.getByRole('button', { name: 'Mois suivant' }))
    expect(screen.queryByRole('link', { name: entry.title })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Liste', exact: true }))
    expect(screen.getByRole('link', { name: entry.title })).toBeInTheDocument()
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'introuvable' } })
    expect(screen.queryByRole('link', { name: entry.title })).not.toBeInTheDocument()
  })
})
