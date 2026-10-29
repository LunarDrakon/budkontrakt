import { useNavigate, useSearchParams } from 'react-router'
import RequestEditor from '../components/RequestEditor'
import useRequests from '../hooks/useRequests'
import { services } from '../data/services'

export default function RequestCreatePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { createRequest } = useRequests()

  const serviceIdParam = searchParams.get('serviceId') ?? ''
  const serviceExists = services.some(
    (service) => String(service.id) === serviceIdParam,
  )

  const initialDraft = {
    serviceId: serviceExists ? serviceIdParam : '',
    customerName: '',
    phone: '',
    description: '',
    area: '',
    needsSurvey: false,
  }

  function handleSave(draft) {
    const result = createRequest(draft)
    if (result.ok) {
      navigate('/requests')
    }
    return result
  }

  return (
    <RequestEditor
      title="Нова заявка"
      idPrefix="create"
      initialDraft={initialDraft}
      onSave={handleSave}
      onCancel={() => navigate('/requests')}
      submitLabel="Створити заявку"
    />
  )
}