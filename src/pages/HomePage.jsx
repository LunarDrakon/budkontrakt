import { services } from '../data/services.js';
import ServiceCard from '../components/ServiceCard.jsx';

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

      <section className="services-section">
        <h2>Наші послуги</h2>
        {services.length === 0 ? (
          <p>Наразі послуги не додано.</p>
        ) : (
          <div className="services-list">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;