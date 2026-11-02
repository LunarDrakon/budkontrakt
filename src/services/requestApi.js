const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    let message = `Помилка сервера: ${response.status}`

    try {
      const errorData = await response.json()
      message = errorData.message || message
    } catch {
      // Сервер міг повернути відповідь без JSON
    }

    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const requestApi = {
  async getAll() {
    return request(`${API_BASE_URL}/requests`)
  },

  async getById(id) {
    try {
      return await request(
        `${API_BASE_URL}/requests/${encodeURIComponent(id)}`
      )
    } catch (error) {
      if (error.message.includes('404')) {
        return null
      }

      throw error
    }
  },

  async create(data) {
    return request(`${API_BASE_URL}/requests`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async update(id, data) {
    return request(
      `${API_BASE_URL}/requests/${encodeURIComponent(id)}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    )
  },

  async delete(id) {
    await request(
      `${API_BASE_URL}/requests/${encodeURIComponent(id)}`,
      {
        method: 'DELETE',
      }
    )

    return true
  },
}