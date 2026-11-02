import { useEffect, useRef, useState } from 'react'
import { RequestsContext } from '../context/RequestsContext.js'
import { requestService } from '../services/index.js'
import { validateRequest } from '../domain/requestValidation.js'

export default function RequestsProvider({ services, children }) {
  const [requests, setRequests] = useState([])
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refreshIdRef = useRef(0)

  async function refreshRequests() {
    const currentRequestId = ++refreshIdRef.current

    setLoading(true)
    setError('')

    try {
      const data = await requestService.getAll()

      // Застосовуємо результат лише останнього запиту
      if (currentRequestId === refreshIdRef.current) {
        setRequests(data)
      }

      return data
    } catch (error) {
      if (currentRequestId === refreshIdRef.current) {
        setError(error.message || 'Не вдалося завантажити заявки.')
      }

      throw error
    } finally {
      // Старий запит не повинен змінювати стан завантаження
      if (currentRequestId === refreshIdRef.current) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    refreshRequests().catch(() => {})

    return () => {
      // Робимо незавершені запити застарілими при демонтуванні
      refreshIdRef.current += 1
    }
  }, [])

  async function createRequest(input) {
    const validation = validateRequest(input, services)
    if (!validation.ok) return validation

    try {
      const record = await requestService.create(validation.value)
      await refreshRequests()
      setNotice('Заявку створено в локальній колекції.')
      return { ok: true, record }
    } catch (error) {
      return { ok: false, message: error.message }
    }
  }

  async function updateRequest(id, input) {
    const validation = validateRequest(input, services)
    if (!validation.ok) return validation

    try {
      const record = await requestService.update(id, validation.value)
      await refreshRequests()
      setNotice('Зміни заявки збережено.')
      return { ok: true, record }
    } catch (error) {
      return { ok: false, message: error.message }
    }
  }

  async function deleteRequest(id) {
    try {
      await requestService.delete(id)
      await refreshRequests()
      setNotice('Заявку видалено.')
      return { ok: true }
    } catch (error) {
      return { ok: false, message: error.message }
    }
  }

  function dismissNotice() {
    setNotice('')
  }

  return (
    <RequestsContext.Provider
      value={{
        requests,
        loading,
        error,
        refreshRequests,
        createRequest,
        updateRequest,
        deleteRequest,
        notice,
        dismissNotice,
      }}
    >
      {children}
    </RequestsContext.Provider>
  )
}