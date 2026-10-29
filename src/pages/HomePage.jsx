import { useEffect } from 'react';
import { Link } from 'react-router';
import { services } from '../data/services.js';
import ServiceList from '../components/ServiceList.jsx';
import Section from '../components/Section.jsx';
import { useServiceFilter } from '../hooks/useServiceFilter';
import { useSelectedService } from '../context/SelectedServiceContext';

function HomePageContent() {
  const {
    searchText,
    setSearchText,
    visibleServices,
  } = useServiceFilter(services);

  const { selectedService } = useSelectedService();

  useEffect(() => {
    if (selectedService) {
      document.title = `Послуга: ${selectedService.name}`;
    } else {
      document.title = 'Ремонтно-будівельна компанія';
    }

    return () => {
      document.title = 'Ремонтно-будівельна компанія';
    };
  }, [selectedService]);

  const requestLink = selectedService
    ? `/requests/new?serviceId=${selectedService.id}`
    : '/requests/new';

  return (
    <div className="home-page">
      {/* Головний блок */}
      <header className="hero-section">
        <span className="hero-label">
          НАДІЙНІСТЬ • ЯКІСТЬ • ПРОФЕСІОНАЛІЗМ
        </span>

        <h1>Ремонтно-будівельна компанія</h1>

        <p>
          Ми виконуємо ремонт квартир, будівництво будинків
          та інші будівельні роботи. Переглядайте наші послуги
          та залишайте заявку.
        </p>

        <div className="hero-actions">
          <a className="btn btn-warning" href="#services">
            Переглянути послуги
          </a>

          <Link className="btn btn-light" to={requestLink}>
            Залишити заявку
          </Link>
        </div>
      </header>

      {/* Інформація про компанію */}
      <Section title="Про компанію">
        <p>
          Наша компанія виконує ремонтні та будівельні роботи
          для квартир, приватних будинків та інших об'єктів.
          Ми прагнемо забезпечити якісне виконання робіт
          і зручну взаємодію із замовниками.
        </p>

        <div className="company-features">
          <div className="feature-item">
            <span className="feature-mark">01</span>
            <h3>Якість робіт</h3>
            <p>Увага до деталей на кожному етапі.</p>
          </div>

          <div className="feature-item">
            <span className="feature-mark">02</span>
            <h3>Різні послуги</h3>
            <p>Ремонт і будівництво для різних об'єктів.</p>
          </div>

          <div className="feature-item">
            <span className="feature-mark">03</span>
            <h3>Зручна заявка</h3>
            <p>Опишіть свої потреби через форму на сайті.</p>
          </div>
        </div>
      </Section>

      {/* Каталог послуг */}
      <div id="services" className="services-section">
        <Section title="Наші послуги">
          <p className="section-description">
            Оберіть потрібну послугу або скористайтеся пошуком
            за назвою чи описом.
          </p>

          <div className="service-search">
            <label
              className="form-label"
              htmlFor="service-search"
            >
              Пошук послуги
            </label>

            <input
              id="service-search"
              type="search"
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
              placeholder="Наприклад, ремонт квартири"
              className="form-control"
            />
          </div>

          {visibleServices.length === 0 ? (
            <div className="empty-services">
              <h3>Послуг не знайдено</h3>
              <p>
                Спробуйте змінити пошуковий запит.
              </p>
            </div>
          ) : (
            <ServiceList services={visibleServices} />
          )}

          {selectedService && (
            <div className="selected-service">
              Обрана послуга:{' '}
              <strong>{selectedService.name}</strong>
            </div>
          )}
        </Section>
      </div>

      {/* Заклик залишити заявку */}
      <Section title="Потрібна будівельна послуга?">
        <div className="request-callout">
          <div>
            <h3>Розкажіть нам про свої плани</h3>
            <p>
              Заповніть заявку, вкажіть потрібну послугу
              та опишіть роботи, які необхідно виконати.
            </p>
          </div>

          <Link
            to={requestLink}
            className="btn btn-primary"
          >
            Залишити заявку
          </Link>
        </div>
      </Section>
    </div>
  );
}

function HomePage() {
  return <HomePageContent />;
}

export default HomePage;