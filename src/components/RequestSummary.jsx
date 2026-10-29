export default function RequestSummary({ draft, services }) {
  const service = services.find(
    (item) => String(item.id) === String(draft.serviceId),
  )

  return (
    <div className="request-summary">
      <h3>Підсумок заявки</h3>

      <p>
        <strong>Послуга:</strong> {service ? service.name : 'Не вибрано'}
      </p>
      <p>
        <strong>Ім'я:</strong> {draft.customerName.trim() || 'Не вказано'}
      </p>
      <p>
        <strong>Телефон:</strong> {draft.phone.trim() || 'Не вказано'}
      </p>
      <p>
        <strong>Площа:</strong> {draft.area ? `${draft.area} м²` : 'Не вказано'}
      </p>
      <p>
        <strong>Виїзд для замірів:</strong> {draft.needsSurvey ? 'Так' : 'Ні'}
      </p>
    </div>
  )
}