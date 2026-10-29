
import { Link, useParams } from 'react-router'
import { services } from '../data/services.js'

export default function ServiceDetailsPage() {
  const { serviceId } = useParams()

  const service = services.find(
    (item) => String(item.id) === String(serviceId)
  )

  if (!service) {
    return (
      <section>
        <h2>Послугу не знайдено</h2>
        <p>
          Такої послуги немає або її ідентифікатор неправильний.
        </p>
        <Link to="/services">
          Повернутися до послуг
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h2>{service.name}</h2>

      <p>
        <strong>Категорія:</strong> {service.category}
      </p>

      <p>
        <strong>Опис:</strong> {service.description}
      </p>

      <p>
        <strong>Ціна:</strong> {service.price}
      </p>

      {service.available !== undefined && (
        <p>
          <strong>Доступність:</strong>{' '}
          {service.available
            ? 'Доступно'
            : 'Тимчасово недоступно'}
        </p>
      )}

      <p>
        <Link to="/services">
          Повернутися до всіх послуг
        </Link>
      </p>

      <p>
        <Link to="/requests/new">
          Залишити заявку
        </Link>
      </p>
    </section>
  )
}
