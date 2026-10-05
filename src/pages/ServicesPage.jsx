import { useSearchParams } from 'react-router'
import { services } from '../data/services.js'
import ServiceList from '../components/ServiceList.jsx'
import Section from '../components/Section.jsx'

function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchText = searchParams.get('search') || ''

  const visibleServices = services.filter((service) => {
    const search = searchText.toLowerCase()

    return (
      service.name.toLowerCase().includes(search) ||
      service.description.toLowerCase().includes(search)
    )
  })

  const handleSearchChange = (event) => {
    const value = event.target.value

    if (value) {
      setSearchParams({ search: value })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="services-page">
      <Section title="Усі послуги компанії">
        <div className="mb-3">
          <label htmlFor="service-search">
            Пошук послуги:
          </label>

          <input
            id="service-search"
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Введіть назву або опис послуги"
            className="form-control"
          />
        </div>

        {visibleServices.length === 0 ? (
          <p>За вашим запитом послуг не знайдено.</p>
        ) : (
          <ServiceList services={visibleServices} />
        )}
      </Section>
    </div>
  )
}

export default ServicesPage