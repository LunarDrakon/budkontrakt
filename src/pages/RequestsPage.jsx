
import { Link, useSearchParams } from 'react-router'
import useRequests from '../hooks/useRequests'

export default function RequestsPage() {
  const { requests } = useRequests()
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''

  const rawSurvey = searchParams.get('survey')
  const survey = ['yes', 'no'].includes(rawSurvey)
    ? rawSurvey
    : 'all'

  const rawSort = searchParams.get('sort')
  const sort = ['area-asc', 'area-desc'].includes(rawSort)
    ? rawSort
    : 'name'

  function updateParameter(name, value, defaultValue, replace = false) {
    const nextParams = new URLSearchParams(searchParams)

    if (value === defaultValue) {
      nextParams.delete(name)
    } else {
      nextParams.set(name, value)
    }

    setSearchParams(nextParams, { replace })
  }

  const normalizedQuery = query.trim().toLocaleLowerCase('uk')

  const visibleRequests = requests
    .filter((request) => {
      const searchableText = [
        request.customerName,
        request.description,
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('uk')

      const matchesQuery = searchableText.includes(normalizedQuery)

      const matchesSurvey =
        survey === 'all' ||
        (survey === 'yes' && request.needsSurvey) ||
        (survey === 'no' && !request.needsSurvey)

      return matchesQuery && matchesSurvey
    })
    .sort((a, b) => {
      let result = 0

      if (sort === 'area-asc') {
        result = Number(a.area) - Number(b.area)
      } else if (sort === 'area-desc') {
        result = Number(b.area) - Number(a.area)
      } else {
        result = (a.customerName ?? '').localeCompare(
          b.customerName ?? '',
          'uk'
        )
      }

      return result || String(a.id).localeCompare(String(b.id), 'uk')
    })

  function resetFilters() {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('q')
    nextParams.delete('survey')
    nextParams.delete('sort')
    setSearchParams(nextParams)
  }

  return (
    <>
      <h2>Заявки</h2>
      <p>Список заявок клієнтів.</p>
      <p>Усього заявок у колекції: {requests.length}</p>

      <p>
        <Link to="/requests/new">Нова заявка</Link>
      </p>

      <section>
        <h3>Пошук і фільтрація</h3>

        <p>
          <label htmlFor="request-search">
            Пошук за ім’ям замовника або описом робіт:
          </label>
          <br />
          <input
            id="request-search"
            type="search"
            value={query}
            onChange={(event) =>
              updateParameter('q', event.target.value, '', true)
            }
            placeholder="Введіть текст для пошуку"
          />
        </p>

        <p>
          <label htmlFor="survey-filter">Потреба в замірах:</label>
          <br />
          <select
            id="survey-filter"
            value={survey}
            onChange={(event) =>
              updateParameter('survey', event.target.value, 'all')
            }
          >
            <option value="all">Усі заявки</option>
            <option value="yes">З потрібними замірами</option>
            <option value="no">Без потреби в замірах</option>
          </select>
        </p>

        <p>
          <label htmlFor="request-sort">Сортування:</label>
          <br />
          <select
            id="request-sort"
            value={sort}
            onChange={(event) =>
              updateParameter('sort', event.target.value, 'name')
            }
          >
            <option value="name">За ім’ям замовника</option>
            <option value="area-asc">За площею: від меншої до більшої</option>
            <option value="area-desc">За площею: від більшої до меншої</option>
          </select>
        </p>

        <button type="button" onClick={resetFilters}>
          Скинути фільтри
        </button>
      </section>

      {requests.length === 0 ? (
        <p>
          Заявок поки немає. Створіть першу заявку, щоб вона з’явилася у списку.
        </p>
      ) : visibleRequests.length === 0 ? (
        <p>
          За заданими умовами заявок не знайдено. Спробуйте змінити пошук або
          фільтри.
        </p>
      ) : (
        <>
          <p>Знайдено заявок: {visibleRequests.length}</p>

          <ul>
            {visibleRequests.map((request) => {
              const requestPath =
                `/requests/${encodeURIComponent(request.id)}`

              return (
                <li key={request.id}>
                  <strong>{request.id}</strong>:{' '}
                  {request.customerName}, {request.area} м²
                  {' — '}
                  <Link to={requestPath}>Переглянути</Link>
                  {' | '}
                  <Link to={`${requestPath}/edit`}>Редагувати</Link>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </>
  )
}
