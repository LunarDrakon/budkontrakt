import { useState } from 'react'
import RequestForm from './RequestForm'
import RequestSummary from './RequestSummary'
import { services } from '../data/services'
import { validateRequest } from '../domain/requestValidation'

const emptyDraft = {
  serviceId: '',
  customerName: '',
  phone: '',
  description: '',
  area: '',
  needsSurvey: false,
}

export default function RequestEditor({
  title,
  idPrefix,
  initialDraft = emptyDraft,
  onSave,
  onCancel,
  submitLabel,
  cancelLabel = 'Вийти без збереження',
}) {
  const [draft, setDraft] = useState(initialDraft)
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [operationError, setOperationError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const validation = validateRequest(draft, services)
  const errors = {}

  for (const [field, message] of Object.entries(validation.errors)) {
    if (submitAttempted || touched[field]) {
      errors[field] = message
    }
  }

  function handleChange(name, value) {
    setDraft((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleBlur(event) {
    const { name } = event.target
    if (!name) return

    setTouched((previous) => (
      previous[name]
        ? previous
        : { ...previous, [name]: true }
    ))
  }

  function handleReset() {
    setDraft(initialDraft)
    setTouched({})
    setSubmitAttempted(false)
    setOperationError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitAttempted(true)
    setOperationError('')

    if (!validation.ok || isSaving) return

    setIsSaving(true)

    try {
      const result = await onSave(draft)

      if (!result?.ok) {
        setOperationError(
          result?.message || 'Не вдалося зберегти заявку.'
        )
      }
    } catch (error) {
      setOperationError(
        error?.message || 'Сталася помилка під час збереження заявки.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="request-editor">
      <h2 className="request-editor-title">{title}</h2>

      <div className="card request-form-card mb-4">
        <div className="card-body">
          <RequestForm
            idPrefix={idPrefix}
            services={services}
            draft={draft}
            errors={errors}
            operationError={operationError}
            isSaving={isSaving}
            onChange={handleChange}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            onReset={handleReset}
            onCancel={onCancel}
            submitLabel={isSaving ? 'Збереження...' : submitLabel}
            cancelLabel={cancelLabel}
          />
        </div>
      </div>

      <div className="card request-summary-card">
        <div className="card-body">
          <h3 className="request-summary-title">
            Попередній перегляд заявки
          </h3>

          <RequestSummary
            draft={draft}
            services={services}
          />
        </div>
      </div>
    </div>
  )
}