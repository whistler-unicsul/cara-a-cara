import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BackButton from '@/components/BackButton'

describe('BackButton', () => {
  it('renderiza um botão acessível "Voltar"', () => {
    render(<BackButton onClick={() => {}} />)
    expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument()
  })

  it('chama onClick ao clicar', async () => {
    const onClick = vi.fn()
    render(<BackButton onClick={onClick} />)
    await userEvent.setup().click(screen.getByRole('button', { name: 'Voltar' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('aceita um rótulo personalizado', () => {
    render(<BackButton onClick={() => {}} label="Sair da sala" />)
    expect(screen.getByRole('button', { name: 'Sair da sala' })).toBeInTheDocument()
  })
})
