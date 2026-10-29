import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function RequestForm({
  idPrefix,
  services,
  draft,
  errors = {},
  operationError,
  onChange,
  onBlur,
  onSubmit,
  onReset,
  onCancel,
  submitLabel,
  cancelLabel,
}) {
  const hasErrors = Object.keys(errors).length > 0

  return (
    <Form noValidate onSubmit={onSubmit} aria-label="Форма заявки">
      {hasErrors && (
        <p role="alert">Виправте позначені поля.</p>
      )}

      {operationError && (
        <p role="alert">{operationError}</p>
      )}

      <Form.Group className="mb-3" controlId={`${idPrefix}-service`}>
        <Form.Label>Послуга (обов'язково)</Form.Label>
        <Form.Select
          name="serviceId"
          value={draft.serviceId}
          onChange={(event) => onChange('serviceId', event.target.value)}
          onBlur={onBlur}
          isInvalid={Boolean(errors.serviceId)}
          aria-invalid={Boolean(errors.serviceId)}
        >
          <option value="">Виберіть послугу</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.serviceId}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId={`${idPrefix}-name`}>
        <Form.Label>Ваше ім'я (обов'язково)</Form.Label>
        <Form.Control
          type="text"
          name="customerName"
          value={draft.customerName}
          onChange={(event) => onChange('customerName', event.target.value)}
          onBlur={onBlur}
          placeholder="Введіть ваше ім'я"
          isInvalid={Boolean(errors.customerName)}
          aria-invalid={Boolean(errors.customerName)}
        />
        <Form.Text muted>Від 2 до 50 символів.</Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.customerName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId={`${idPrefix}-phone`}>
        <Form.Label>Номер телефону (обов'язково)</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={draft.phone}
          onChange={(event) => onChange('phone', event.target.value)}
          onBlur={onBlur}
          placeholder="+380501234567"
          isInvalid={Boolean(errors.phone)}
          aria-invalid={Boolean(errors.phone)}
        />
        <Form.Text muted>Формат: +380XXXXXXXXX.</Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId={`${idPrefix}-description`}>
        <Form.Label>Опис робіт (обов'язково)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={draft.description}
          onChange={(event) => onChange('description', event.target.value)}
          onBlur={onBlur}
          isInvalid={Boolean(errors.description)}
          aria-invalid={Boolean(errors.description)}
        />
        <Form.Text muted>
          Від 10 до 500 символів без крайніх пробілів.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId={`${idPrefix}-area`}>
        <Form.Label>Площа об'єкта, м² (обов'язково)</Form.Label>
        <Form.Control
          type="number"
          name="area"
          min={1}
          max={500}
          step={1}
          value={draft.area}
          onChange={(event) => onChange('area', event.target.value)}
          onBlur={onBlur}
          isInvalid={Boolean(errors.area)}
          aria-invalid={Boolean(errors.area)}
        />
        <Form.Text muted>Ціле число від 1 до 500.</Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.area}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id={`${idPrefix}-survey`}
          name="needsSurvey"
          label="Потрібен виїзд майстра для замірів"
          checked={draft.needsSurvey}
          onChange={(event) => onChange('needsSurvey', event.target.checked)}
          onBlur={onBlur}
          isInvalid={Boolean(errors.needsSurvey)}
          feedback={errors.needsSurvey}
          feedbackType="invalid"
        />
        <Form.Text muted>
          Для площі понад 100 м² виїзд обов'язковий.
        </Form.Text>
      </Form.Group>

      <div className="d-flex gap-2 justify-content-center">
        <Button type="submit">{submitLabel}</Button>

        <Button variant="secondary" type="button" onClick={onReset}>
          Відновити початкові поля
        </Button>

        <Button variant="outline-secondary" type="button" onClick={onCancel}>
          {cancelLabel}
        </Button>
      </div>
    </Form>
  )
}