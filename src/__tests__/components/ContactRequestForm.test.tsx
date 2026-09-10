import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContactRequestForm } from '@/app/contact/_components/ContactRequestForm'
import { submitContact } from '@/lib/contact/client'

vi.mock('@/lib/contact/client', () => ({ submitContact: vi.fn() }))
const send = vi.mocked(submitContact)
function fill() {
  fireEvent.change(screen.getByLabelText(/Nom complet/), { target: { value: 'Marie Dupont' } })
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'marie@outlook.com' } })
  fireEvent.change(screen.getByLabelText(/Téléphone/), { target: { value: '06 12 34 56 78' } })
  fireEvent.change(screen.getByLabelText(/Service souhaité/), { target: { value: 'seo' } })
  fireEvent.change(screen.getByLabelText(/Budget estimé/), { target: { value: '1000-3000' } })
  fireEvent.change(screen.getByLabelText(/Votre projet/), { target: { value: 'Je souhaite créer un site pour mon entreprise.' } })
  fireEvent.click(screen.getByRole('checkbox'))
}
beforeEach(() => { send.mockReset() })
describe('ContactRequestForm', () => {
  it('starts empty even with a service context, with an inaccessible honeypot', () => {
    const { container } = render(<ContactRequestForm subject="Référencement naturel SEO" />)
    expect(screen.getByLabelText(/Nom complet/)).toHaveValue('')
    expect(screen.getByLabelText(/Service souhaité/)).toHaveValue('')
    expect(screen.getByLabelText(/Votre projet/)).toHaveValue('')
    expect(screen.getByLabelText(/Téléphone/)).toBeRequired()
    const trap = container.querySelector('#website_check')!
    expect(trap).toHaveAttribute('tabindex', '-1')
    expect(trap).toHaveAttribute('autocomplete', 'off')
    expect(trap.parentElement).toHaveAttribute('aria-hidden', 'true')
  })
  it('keeps sending disabled through two immediate submissions and waits for acceptance', async () => {
    let resolve!: (response: Response) => void
    send.mockImplementation(() => new Promise(done => { resolve = done }))
    const { container } = render(<ContactRequestForm />)
    fill()
    fireEvent.submit(container.querySelector('form')!)
    fireEvent.submit(container.querySelector('form')!)
    await waitFor(() => expect(send).toHaveBeenCalledOnce())
    expect(screen.getByRole('button', { name: /Envoi en cours/ })).toBeDisabled()
    expect(screen.queryByText('Votre demande a bien été envoyée.')).not.toBeInTheDocument()
    await act(async () => resolve(Response.json({ success: true }, { status: 201 })))
    const heading = await screen.findByRole('heading', { name: 'Votre demande a bien été envoyée.' })
    expect(heading).toHaveFocus()
  })
  it('retains input after a provider failure and allows retry', async () => {
    send.mockResolvedValueOnce(Response.json({ success: false }, { status: 503 })).mockResolvedValueOnce(Response.json({ success: true }, { status: 201 }))
    const { container } = render(<ContactRequestForm />)
    fill(); fireEvent.submit(container.querySelector('form')!)
    await screen.findByRole('button', { name: /Réessayer/ })
    expect(screen.getByLabelText(/^Email/)).toHaveValue('marie@outlook.com')
    expect(screen.getByLabelText(/Votre projet/)).toHaveValue('Je souhaite créer un site pour mon entreprise.')
    fireEvent.submit(container.querySelector('form')!)
    await screen.findByText('Votre demande a bien été envoyée.')
    expect(send).toHaveBeenCalledTimes(2)
    expect(send.mock.calls[0][0]).toEqual(send.mock.calls[1][0])
  })
  it('does not treat an HTTP success without explicit confirmation as delivery', async () => {
    send.mockResolvedValue(Response.json({ message: 'Demande prise en compte.' }, { status: 202 }))
    const { container } = render(<ContactRequestForm />)
    fill(); fireEvent.submit(container.querySelector('form')!)
    await screen.findByRole('alert')
    expect(screen.queryByText('Votre demande a bien été envoyée.')).not.toBeInTheDocument()
  })
})
