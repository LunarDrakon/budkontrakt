import { requests as initialRequests } from '../data/requests.js'

const MOCK_CONFIG = {
  delayMs: 700,
  failureRate: 0,
}

let requests = initialRequests.map((request) => ({ ...request }))

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function simulateRequest() {
  await delay(MOCK_CONFIG.delayMs)

  if (Math.random() < MOCK_CONFIG.failureRate) {
    throw new Error('Помилка mock-сервісу. Спробуйте ще раз.')
  }
}

function createId() {
  return `req-${crypto.randomUUID()}`
}

export const requestService = {
  async getAll() {
    await simulateRequest()
    return requests.map((request) => ({ ...request }))
  },

  async getById(id) {
    await simulateRequest()
    const request = requests.find((item) => item.id === id)
    return request ? { ...request } : null
  },

  async create(data) {
    await simulateRequest()

    const record = {
      ...data,
      id: createId(),
    }

    requests = [...requests, record]
    return { ...record }
  },

  async update(id, data) {
    await simulateRequest()

    const current = requests.find((item) => item.id === id)

    if (!current) {
      throw new Error('Заявку для оновлення не знайдено.')
    }

    const record = {
      ...data,
      id: current.id,
    }

    requests = requests.map((item) =>
      item.id === id ? record : item
    )

    return { ...record }
  },

  async delete(id) {
    await simulateRequest()

    if (!requests.some((item) => item.id === id)) {
      throw new Error('Заявку для видалення не знайдено.')
    }

    requests = requests.filter((item) => item.id !== id)
    return true
  },
}