import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react'
import { afterEach, describe, it, expect, vi } from 'vitest'
import { EstimatorSection } from '@/components/sections/EstimatorSection'
afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})
async function submitEstimate() {
  fireEvent.change(screen.getByLabelText('Votre activité'), {
    target: { value: 'Électricien' },
  })
  fireEvent.change(screen.getByLabelText('Votre ville'), {
    target: { value: 'Lorient' },
  })
  fireEvent.click(
    screen.getByRole('button', { name: 'Obtenir une estimation' })
  )
}
describe('Agency market estimator', () => {
  it('shows a useful error and allows retry when the service is unavailable', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue({
          ok: false,
          json: async () => ({ success: false }),
        })
    )
    render(<EstimatorSection />)
    await submitEstimate()
    expect(await screen.findByRole('alert')).toHaveTextContent('indisponible')
    expect(
      screen.getByRole('button', { name: 'Obtenir une estimation' })
    ).toBeEnabled()
  })
  it('does not confirm an audit request rejected by the server', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          analysisId: 'local-test',
          analysis: {
            recherchesMensuelles: 120,
            concurrence: 'Moyenne',
            tendance: 'Stable',
            potentielAnnuel: 12000,
            analyse: 'Estimation à confirmer.',
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ success: false }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })
    vi.stubGlobal('fetch', fetchMock)
    render(<EstimatorSection />)
    await submitEstimate()
    await screen.findByRole('heading', { name: 'Votre première estimation' })
    fireEvent.change(
      screen.getByLabelText('Votre e-mail, pour approfondir avec notre équipe'),
      { target: { value: 'test@example.com' } }
    )
    fireEvent.click(screen.getByRole('button', { name: 'Demander un audit' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'n’a pas pu être enregistrée'
    )
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Demander un audit' }))
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(
        'Votre demande est enregistrée'
      )
    )
  })
})
