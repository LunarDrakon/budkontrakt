import { useParams } from 'react-router'

export default function RequestEditPage() {
  const { requestId } = useParams()

  return (
    <>
      <h2>Редагування заявки</h2>
      <p>Редагується заявка: {requestId}</p>
    </>
  )
}