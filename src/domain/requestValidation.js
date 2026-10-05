export function validateRequest(input, services) {
  const errors = {}

  const service = services.find(
    (item) => String(item.id) === String(input.serviceId),
  )
  if (!service) {
    errors.serviceId = 'Виберіть наявну послугу з каталогу.'
  }

  const customerName = typeof input.customerName === 'string'
    ? input.customerName.trim()
    : ''
  if (customerName.length === 0) {
    errors.customerName = "Укажіть ім'я."
  } else if (customerName.length < 2 || customerName.length > 50) {
    errors.customerName = "Ім'я має містити від 2 до 50 символів."
  }

  const phoneRaw = typeof input.phone === 'string' ? input.phone.trim() : ''
  const phone = phoneRaw.replace(/[\s\-()]/g, '')
  if (phone.length === 0) {
    errors.phone = 'Укажіть номер телефону.'
  } else if (!/^\+380\d{9}$/.test(phone)) {
    errors.phone = 'Номер має бути у форматі +380XXXXXXXXX.'
  }

  const description = typeof input.description === 'string'
    ? input.description.trim()
    : ''
  if (description.length === 0) {
    errors.description = 'Опишіть, які роботи потрібно виконати.'
  } else if (description.length < 10 || description.length > 500) {
    errors.description = 'Опис має містити від 10 до 500 символів без крайніх пробілів.'
  }

  const areaText = String(input.area ?? '').trim()
  const area = Number(areaText)
  if (areaText === '') {
    errors.area = "Укажіть площу об'єкта."
  } else if (!Number.isInteger(area) || area < 1 || area > 500) {
    errors.area = 'Площа має бути цілим числом від 1 до 500.'
  }

  if (typeof input.needsSurvey !== 'boolean') {
    errors.needsSurvey = 'Ознака виїзду має бути логічним значенням.'
  } else if (!errors.area && area > 100 && !input.needsSurvey) {
    errors.needsSurvey = 'Для площі понад 100 м² позначте потребу у виїзді для замірів.'
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    errors: {},
    value: {
      serviceId: service.id,
      customerName,
      phone,
      description,
      area,
      needsSurvey: input.needsSurvey,
    },
  }
}