import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import useRequests from '../hooks/useRequests'

export default function RequestDetailsPage() {
  const { requestId } = useParams()
  const navigate = useNavigate()

  const {
    requests,
    loading,
    error,
    refreshRequests,
    deleteRequest,
  } = useRequests()

  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const request = requests.find(
    (item) => String(item.id) === String(requestId)
  )

  if (!request && loading) {
    return <p>Завантаження заявки...</p>
  }

  if (!request && error) {
    return (
      <section>
        <p role="alert">{error}</p>
        <button type="button" onClick={() => refreshRequests()}>
          Повторити завантаження
        </button>
        <p><Link to="/requests">Повернутися до заявок</Link></p>
      </section>
    )
  }

  if (!request) {
    return (
      <section>
        <h2>Заявку не знайдено</h2>
        <Link to="/requests">Повернутися до заявок</Link>
      </section>
    )
  }

  async function handleDelete() {
    if (isDeleting) return

    const confirmed = window.confirm('Видалити цю заявку?')
    if (!confirmed) return

    setIsDeleting(true)
    setDeleteError('')

    try {
      const result = await deleteRequest(request.id)

      if (!result?.ok) {
        setDeleteError(
          result?.message || 'Не вдалося видалити заявку.'
        )
        return
      }

      navigate('/requests')
    } catch (error) {
      setDeleteError(
        error?.message || 'Сталася помилка під час видалення заявки.'
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section>
      <h2>Перегляд заявки</h2>

      {deleteError && (
        <p role="alert">{deleteError}</p>
      )}

      <p><strong>Номер:</strong> {request.id}</p>
      <p><strong>Послуга:</strong> {request.serviceId}</p>
      <p><strong>Замовник:</strong> {request.customerName}</p>
      <p><strong>Телефон:</strong> {request.phone}</p>
      <p><strong>Опис робіт:</strong> {request.description}</p>
      <p><strong>Площа:</strong> {request.area} м²</p>
      <p>
        <strong>Потрібні заміри:</strong>{' '}
        {request.needsSurvey ? 'Так' : 'Ні'}
      </p>

      <p>
        <Link to={`/requests/${encodeURIComponent(request.id)}/edit`}>
          Редагувати заявку
        </Link>
      </p>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Видалення...' : 'Видалити заявку'}
      </button>

      <p><Link to="/requests">Назад до списку</Link></p>
    </section>
  )
}