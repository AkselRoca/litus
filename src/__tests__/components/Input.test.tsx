import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/ui/Input'

describe('Input Component', () => {
    it('renders input element', () => {
        render(<Input name="email" placeholder="Enter email" />)
        expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
    })

    it('handles value changes', () => {
        render(<Input name="name" placeholder="Name" />)
        const input = screen.getByPlaceholderText('Name')
        fireEvent.change(input, { target: { value: 'John' } })
        expect(input).toHaveValue('John')
    })

    it('is disabled when disabled prop is true', () => {
        render(<Input name="field" placeholder="Field" disabled />)
        expect(screen.getByPlaceholderText('Field')).toBeDisabled()
    })

    it('applies custom className', () => {
        render(<Input name="custom" placeholder="Custom" className="custom-class" />)
        expect(screen.getByPlaceholderText('Custom')).toHaveClass('custom-class')
    })

    it('is required when required prop is true', () => {
        render(<Input name="required" placeholder="Required" required />)
        expect(screen.getByPlaceholderText('Required')).toBeRequired()
    })
})
