
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'

import App from './App'
import { requestService } from './services'
import { services } from './data/services'

describe('Інтеграційний сценарій створення заявки', () => {
  let savedRequests

  beforeEach(() => {
    savedRequests = []

    vi.spyOn(requestService, 'getAll').mockImplementation(
      async () => [...savedRequests]
    )

    vi.spyOn(requestService, 'create').mockImplementation(
      async (input) => {
        const record = {
          id: 'test-request-001',
          ...input,
        }

        savedRequests.push(record)
        return record
      }
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('створює заявку та відображає її у списку', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/requests/new']}>
        <App />
      </MemoryRouter>
    )

    await user.selectOptions(
      screen.getByLabelText(/Послуга/),
      String(services[0].id)
    )

    await user.type(
      screen.getByLabelText(/Ваше ім'я/),
      'Іван Петренко'
    )

    await user.type(
      screen.getByLabelText(/Номер телефону/),
      '+380501234567'
    )

    await user.type(
      screen.getByLabelText(/Опис робіт/),
      'Ремонт квартири та оздоблення кімнат'
    )

    await user.type(
      screen.getByLabelText(/Площа об'єкта/),
      '80'
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Створити заявку',
      })
    )

    await waitFor(() => {
      expect(requestService.create).toHaveBeenCalledOnce()
    })

    expect(
      await screen.findByText(/Іван Петренко, 80 м²/)
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'Заявки' })
    ).toBeInTheDocument()

    expect(savedRequests).toHaveLength(1)
  })
})
