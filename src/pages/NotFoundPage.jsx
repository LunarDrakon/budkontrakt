import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <>
      <h2>404: сторінку не знайдено</h2>
      <p>Вказана адреса не існує.</p>
      <Link to="/">Повернутися на головну</Link>
    </>
  )
}