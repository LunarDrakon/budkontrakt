import { useEffect, useState } from 'react';
import { services } from '../data/services.js';
import ServiceList from '../components/ServiceList.jsx';
import Section from '../components/Section.jsx';
import RequestForm from '../components/RequestForm.jsx';
import RequestSummary from '../components/RequestSummary.jsx';
import { useServiceFilter } from '../hooks/useServiceFilter';
import {
  SelectedServiceProvider,
  useSelectedService
} from '../context/SelectedServiceContext';

function HomePageContent() {
  const [request, setRequest] = useState({
    name: '',
    phone: ''
  });

  const {
    searchText,
    setSearchText,
    visibleServices
  } = useServiceFilter(services);

  const {
    selectedService,
    clearSelectedService
  } = useSelectedService();

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

  const handleClearRequest = () => {
    setRequest({
      name: '',
      phone: ''
    });

    clearSelectedService();
  };

  return (
    <div className="home-page">
      <header className="hero">
        <h1>Ремонтно-будівельна компанія</h1>

        <p>
          Ми виконуємо ремонт квартир, будівництво будинків
          та інші будівельні роботи. Переглядайте наші послуги
          та залишайте заявку.
        </p>
      </header>

      <Section title="Про компанію">
        <p>
          Наша компанія виконує ремонтні та будівельні роботи
          для квартир, приватних будинків та інших об'єктів.
        </p>
      </Section>

      <Section title="Наші послуги">
        <div className="mb-3">
          <label htmlFor="service-search">
            Пошук послуги:
          </label>

          <input
            id="service-search"
            type="text"
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
            placeholder="Введіть назву або опис послуги"
            className="form-control"
          />
        </div>

        {visibleServices.length === 0 ? (
          <p>За вашим запитом послуг не знайдено.</p>
        ) : (
          <ServiceList services={visibleServices} />
        )}

        {selectedService && (
          <p>
            Обрана послуга:{' '}
            <strong>{selectedService.name}</strong>
          </p>
        )}
      </Section>

      <Section title="Залишити заявку">
        <RequestForm
          request={request}
          onRequestChange={setRequest}
          onClear={handleClearRequest}
        />

        <RequestSummary request={request} />
      </Section>
    </div>
  );
}

function HomePage() {
  return (
    <SelectedServiceProvider>
      <HomePageContent />
    </SelectedServiceProvider>
  );
}

export default HomePage;