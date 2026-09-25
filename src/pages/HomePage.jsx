import { services } from '../data/services.js';
import ServiceList from '../components/ServiceList.jsx';
import Section from '../components/Section.jsx';

function HomePage() {
  return (
    <div className="home-page">
      <header className="hero">
        <h1>Ремонтно-будівельна компанія</h1>
        <p>
          Ми виконуємо ремонт квартир, будівництво будинків та інші будівельні
          роботи. Переглядайте наші послуги та залишайте заявку.
        </p>
      </header>

      <Section title="Про компанію">
        <p>
          Наша компанія виконує ремонтні та будівельні роботи
          для квартир, приватних будинків та інших об'єктів.
        </p>
      </Section>

      <Section title="Наші послуги">
        {services.length === 0 ? (
          <p>Наразі послуги не додано.</p>
        ) : (
          <ServiceList services={services} />
        )}
      </Section>
    </div>
  );
}

export default HomePage;