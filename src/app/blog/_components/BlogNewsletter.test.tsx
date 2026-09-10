import '@testing-library/jest-dom/vitest'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { BlogNewsletter } from './BlogNewsletter'

afterEach(() => { vi.unstubAllGlobals() })

function fillSubscription() {
  fireEvent.change(screen.getByLabelText('Votre adresse email'), { target: { value: 'Reader@example.com' } })
  fireEvent.click(screen.getByRole('checkbox'))
}

describe('BlogNewsletter with intercepted requests only', () => {
  it('requires a valid email and explicit consent without sending invalid data', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    render(<BlogNewsletter />)
    fireEvent.click(screen.getByRole('button', { name: 'S’abonner' }))
    expect(await screen.findByText('Indiquez une adresse email valide.')).toBeVisible()
    expect(screen.getByText('Votre accord est nécessaire pour vous abonner.')).toBeVisible()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('shows pending, retains entered data on failure and only confirms a successful save', async () => {
    let resolveRequest!: (response: Response) => void
    const fetchMock = vi.fn().mockImplementationOnce(() => new Promise<Response>((resolve) => { resolveRequest = resolve }))
    vi.stubGlobal('fetch', fetchMock)
    render(<BlogNewsletter />)
    fillSubscription()
    fireEvent.click(screen.getByRole('button', { name: 'S’abonner' }))
    expect(await screen.findByRole('button', { name: 'Inscription…' })).toBeDisabled()
    expect(screen.getByLabelText('Votre adresse email')).toBeDisabled()
    expect(fetchMock).toHaveBeenCalledWith('/api/newsletter', expect.objectContaining({ method: 'POST', body: JSON.stringify({ email: 'reader@example.com', consent: true }) }))

    await act(async () => { resolveRequest(new Response(JSON.stringify({ success: false }), { status: 503 })) })
    expect(await screen.findByRole('alert')).toHaveTextContent('Votre inscription n’a pas pu être enregistrée.')
    expect(screen.getByLabelText('Votre adresse email')).toHaveValue('Reader@example.com')
    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()

    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), { status: 200 }))
    fireEvent.click(screen.getByRole('button', { name: 'S’abonner' }))
    expect(await screen.findByRole('status')).toHaveTextContent('Votre inscription est bien enregistrée.')
    await waitFor(() => { expect(screen.getByText('Votre inscription est bien enregistrée.')).toHaveFocus() })
    expect(screen.queryByRole('button', { name: 'S’abonner' })).not.toBeInTheDocument()
  })

  it('rejects a nominal HTTP 200 without an explicit successful registration response', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({}), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)
    render(<BlogNewsletter />)
    fillSubscription()
    fireEvent.click(screen.getByRole('button', { name: 'S’abonner' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Votre inscription n’a pas pu être enregistrée.')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
