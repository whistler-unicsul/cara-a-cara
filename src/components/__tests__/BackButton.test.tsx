import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BackButton from '@/components/BackButton'

describe('BackButton', () => {
  it('renderiza o botão Voltar por padrão', () => {
    render(<BackButton onBack={() => {}} />)
    expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument()
  })

  it('chama onBack ao clicar em Voltar', async () => {
    const onBack = vi.fn()
    render(<BackButton onBack={onBack} />)
    await userEvent.setup().click(screen.getByRole('button', { name: 'Voltar' }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('renderiza o botão Início quando onHome é fornecido', () => {
    render(<BackButton onBack={() => {}} onHome={() => {}} />)
    expect(screen.getByRole('button', { name: 'Início' })).toBeInTheDocument()
  })

  it('não renderiza Início quando onHome não é fornecido', () => {
    render(<BackButton onBack={() => {}} />)
    expect(screen.queryByRole('button', { name: 'Início' })).not.toBeInTheDocument()
  })

  it('renderiza Seguinte quando onNext é fornecido', () => {
    render(<BackButton onBack={() => {}} onNext={() => {}} />)
    expect(screen.getByRole('button', { name: 'Seguinte' })).toBeInTheDocument()
  })

  it('Seguinte desabilitado quando nextEnabled=false', () => {
    render(<BackButton onBack={() => {}} onNext={() => {}} nextEnabled={false} />)
    const btn = screen.getByRole('button', { name: 'Seguinte' })
    expect(btn).toHaveAttribute('aria-disabled', 'true')
  })

  it('Seguinte habilitado quando nextEnabled=true', async () => {
    const onNext = vi.fn()
    render(<BackButton onBack={() => {}} onNext={onNext} nextEnabled={true} />)
    await userEvent.setup().click(screen.getByRole('button', { name: 'Seguinte' }))
    expect(onNext).toHaveBeenCalledTimes(1)
  })

  it('aceita um rótulo personalizado via aria-label', () => {
    render(<BackButton onBack={() => {}} />)
    expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument()
  })
})
