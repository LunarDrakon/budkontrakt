
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

import RequestForm from './RequestForm'

const services = [
  { id: 'srv-001', name: 'Ремонт квартири' },
  { id: 'srv-002', name: 'Будівництво будинку' },
]

const draft = {
  serviceId: '',
  customerName: '',
  phone: '',
  description: '',
  area: '',
  needsSurvey: false,
}

function renderForm(overrides = {}) {
  const props = {
    idPrefix: 'test',
    services,
    draft,
    onChange: vi.fn(),
    onBlur: vi.fn(),
    onSubmit: vi.fn((event) => event.preventDefault()),
    onReset: vi.fn(),
    onCancel: vi.fn(),
    submitLabel: 'Створити заявку',
    cancelLabel: 'Скасувати',
    ...overrides,
  }

  render(<RequestForm {...props} />)
  return props
}

describe('Компонент RequestForm', () => {
  it('відображає всі поля форми', () => {
    renderForm()

    expect(screen.getByLabelText(/Послуга/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Ваше ім'я/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Номер телефону/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Опис робіт/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Площа об'єкта/)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/Потрібен виїзд майстра/)
    ).toBeInTheDocument()
  })

  it('відображає доступні послуги', () => {
    renderForm()

    expect(screen.getByRole('option', {
      name: 'Ремонт квартири',
    })).toBeInTheDocument()

    expect(screen.getByRole('option', {
      name: 'Будівництво будинку',
    })).toBeInTheDocument()
  })

  it('передає зміну текстового поля через onChange', async () => {
    const user = userEvent.setup()
    const props = renderForm()

    await user.type(
      screen.getByLabelText(/Ваше ім'я/),
      'Іван'
    )

    expect(props.onChange).toHaveBeenLastCalledWith(
      'customerName',
      'н'
    )
  })

  it('передає зміну вибраної послуги', async () => {
    const user = userEvent.setup()
    const props = renderForm()

    await user.selectOptions(
      screen.getByLabelText(/Послуга/),
      'srv-001'
    )

    expect(props.onChange).toHaveBeenCalledWith(
      'serviceId',
      'srv-001'
    )
  })

  it('передає зміну стану прапорця', async () => {
    const user = userEvent.setup()
    const props = renderForm()

    await user.click(
      screen.getByLabelText(/Потрібен виїзд майстра/)
    )

    expect(props.onChange).toHaveBeenCalledWith(
      'needsSurvey',
      true
    )
  })

  it('викликає onSubmit при надсиланні форми', async () => {
    const user = userEvent.setup()
    const props = renderForm()

    await user.click(
      screen.getByRole('button', { name: 'Створити заявку' })
    )

    expect(props.onSubmit).toHaveBeenCalled()
  })

  it('показує повідомлення про помилки валідації', () => {
    renderForm({
      errors: {
        customerName: 'Ім’я занадто коротке',
      },
    })

    expect(screen.getByText(
      'Виправте позначені поля.'
    )).toBeInTheDocument()

    expect(screen.getByText(
      'Ім’я занадто коротке'
    )).toBeInTheDocument()
  })

  it('блокує поля та кнопки під час збереження', () => {
    renderForm({ isSaving: true })

    expect(screen.getByLabelText(/Ваше ім'я/)).toBeDisabled()

    expect(
      screen.getByRole('button', { name: 'Створити заявку' })
    ).toBeDisabled()

    expect(
      screen.getByRole('button', { name: 'Відновити початкові поля' })
    ).toBeDisabled()
  })

  it('викликає обробники скидання та скасування', async () => {
    const user = userEvent.setup()
    const props = renderForm()

    await user.click(
      screen.getByRole('button', {
        name: 'Відновити початкові поля',
      })
    )

    await user.click(
      screen.getByRole('button', { name: 'Скасувати' })
    )

    expect(props.onReset).toHaveBeenCalledOnce()
    expect(props.onCancel).toHaveBeenCalledOnce()
  })
})
