import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button Component', () => {
    it('renders children correctly', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('renders as a link when href is provided', () => {
        render(<Button href="/contact">Contact</Button>)
        const link = screen.getByRole('link', { name: 'Contact' })
        expect(link).toHaveAttribute('href', '/contact')
    })

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn()
        render(<Button onClick={handleClick}>Click</Button>)
        fireEvent.click(screen.getByText('Click'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('is disabled when disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('renders with primary variant by default', () => {
        const { container } = render(<Button>Primary</Button>)
        expect(container.firstChild).toHaveClass('bg-primary')
    })
})
