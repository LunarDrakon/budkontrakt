import { Link, useNavigate, useParams } from 'react-router'
import RequestEditor from '../components/RequestEditor'
import useRequests from '../hooks/useRequests'

export default function RequestEditPage() {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const { requests, updateRequest } = useRequests()

  const request = requests.find((item) => item.id === requestId)

  if (!request) {
    return (
      <>
        <h2>Заявку не знайдено</h2>
        <p>Заявки з ідентифікатором {requestId} немає в поточній колекції.</p>
        <Link to="/requests">Повернутися до заявок</Link>
      </>
    )
  }

  const initialDraft = {
    serviceId: String(request.serviceId),
    customerName: request.customerName,
    phone: request.phone,
    description: request.description,
    area: String(request.area),
    needsSurvey: request.needsSurvey,
  }

  function handleSave(draft) {
    const result = updateRequest(request.id, draft)
    if (result.ok) {
      navigate('/requests')
    }
    return result
  }

  return (
    <RequestEditor
      title="Редагування заявки"
      idPrefix="edit"
      initialDraft={initialDraft}
      onSave={handleSave}
      onCancel={() => navigate('/requests')}
      submitLabel="Зберегти зміни"
    />
  )
}