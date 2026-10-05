import { Link, useParams } from 'react-router'
import { services } from '../data/services.js'

export default function ServiceDetailsPage() {
  const { serviceId } = useParams()

  const service = services.find(
    (item) => String(item.id) === serviceId
  )

  if (!service) {
    return (
      <>
        <h2>Послугу не знайдено</h2>
        <p>Послуга з таким ідентифікатором відсутня.</p>
        <Link to="/services">Повернутися до послуг</Link>
      </>
    )
  }

  return (
    <>
      <h2>{service.name}</h2>
      <p><strong>Категорія:</strong> {service.category}</p>
      <p>{service.description}</p>
      <p><strong>Ціна:</strong> {service.price}</p>
      <p>
        <strong>Статус:</strong>{' '}
        {service.available ? 'Доступно' : 'Тимчасово недоступно'}
      </p>

      <Link to="/services">Повернутися до послуг</Link>
    </>
  )
}