import useRequests from '../hooks/useRequests'

export default function RequestsPage() {
  const { requests } = useRequests()

  return (
    <>
      <h2>Заявки</h2>
      <p>Список заявок клієнтів.</p>
      <p>Заявок у колекції: {requests.length}</p>
    </>
  )
}