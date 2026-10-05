import { useNavigate } from 'react-router'

export default function RequestCreatePage() {
  const navigate = useNavigate()

  return (
    <>
      <h2>Нова заявка</h2>

      <p>Форма створення нової заявки.</p>

      <button
        type="button"
        onClick={() => navigate('/requests')}
      >
        Скасувати
      </button>
    </>
  )
}