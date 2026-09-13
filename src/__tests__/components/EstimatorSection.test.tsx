import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { afterEach, describe, it, expect, vi } from 'vitest'
import { EstimatorSection } from '@/components/sections/EstimatorSection'
vi.mock('next/font/google', () => ({ Caveat: () => ({ variable: 'font-test' }) }))
vi.mock('@/components/sections/home/ReferenceMotion', () => ({ ReferenceReveal: ({ children }: {children: React.ReactNode}) => <div>{children}</div>, ReferenceAnnotation: ({ children }: {children: React.ReactNode}) => <div>{children}</div> }))
afterEach(() => vi.unstubAllGlobals())
function details() {
  fireEvent.change(screen.getByLabelText('Votre activité'), { target: { value: 'Électricien' } })
  fireEvent.change(screen.getByLabelText('Votre ville'), { target: { value: 'Lorient' } })
  fireEvent.click(screen.getByRole('button', { name: 'Obtenir une estimation' }))
}
function email() {
  fireEvent.change(screen.getByLabelText(/Votre email/), { target: { value: 'client@example.com' } })
  fireEvent.click(screen.getByRole('button', { name: 'Recevoir mon estimation' }))
}
const analysis = { recherchesMensuelles: 120, concurrence: 'Moyenne', tendance: 'Stable', potentielAnnuel: 12000, analyse: 'Estimation à confirmer.' }
describe('Mandatory email market estimator', () => {
  it('asks for required email without calling the API or displaying results', () => {
    const fetchMock = vi.fn(); vi.stubGlobal('fetch', fetchMock)
    render(<EstimatorSection />); details()
    expect(screen.getByLabelText(/Votre email/)).toBeRequired()
    expect(fetchMock).not.toHaveBeenCalled()
    expect(screen.queryByRole('heading', { name: 'Votre première estimation' })).not.toBeInTheDocument()
  })
  it('submits the honeypot and email and shows the delivered estimate', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, analysis }) })
    vi.stubGlobal('fetch', fetchMock)
    render(<EstimatorSection />); details(); email()
    await screen.findByRole('heading', { name: 'Votre première estimation' })
    expect(screen.getByRole('status')).toHaveTextContent('client@example.com')
    const body = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(body).toMatchObject({ email: 'client@example.com', website_check: '', metier: 'Électricien', ville: 'Lorient' })
    expect(screen.getByText('12 000 €', { exact: false })).toBeInTheDocument()
  })
  it('keeps the email step and retries the same submission on an uncertain send', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({ ok: false, json: async () => ({ success: false, error: 'Envoi indisponible.' }) }).mockResolvedValueOnce({ ok: true, json: async () => ({ success: true, analysis }) })
    vi.stubGlobal('fetch', fetchMock)
    render(<EstimatorSection />); details(); email()
    expect(await screen.findByRole('alert')).toHaveTextContent('indisponible')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Recevoir mon estimation' }))
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('envoyée'))
    expect(fetchMock.mock.calls[0][1].headers['Idempotency-Key']).toBe(fetchMock.mock.calls[1][1].headers['Idempotency-Key'])
  })
})
