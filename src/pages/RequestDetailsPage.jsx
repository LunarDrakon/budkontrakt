
import { Link, useNavigate, useParams } from 'react-router'
import useRequests from '../hooks/useRequests'

export default function RequestDetailsPage() {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const { requests, deleteRequest } = useRequests()

  const request = requests.find(
    (item) => String(item.id) === String(requestId)
  )

  if (!request) {
    return (
      <section>
        <h2>Заявку не знайдено</h2>
        <Link to="/requests">Повернутися до заявок</Link>
      </section>
    )
  }

  function handleDelete() {
    if (!window.confirm('Видалити цю заявку?')) return

    if (typeof deleteRequest !== 'function') {
      window.alert('Функція видалення не налаштована.')
      return
    }

    const result = deleteRequest(request.id)

    if (result?.ok === false) {
      window.alert('Не вдалося видалити заявку.')
      return
    }

    navigate('/requests')
  }

  return (
    <section>
      <h2>Перегляд заявки</h2>
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

      <button type="button" onClick={handleDelete}>
        Видалити заявку
      </button>

      <p><Link to="/requests">Назад до списку</Link></p>
    </section>
  )
}
