import ServiceCard from './ServiceCard.jsx';

export default function ServiceList({ services }) {
  if (!services || services.length === 0) {
    return (
      <div className="empty-services">
        <h3>Послуг поки немає</h3>
        <p>Спробуйте змінити пошуковий запит.</p>
      </div>
    );
  }

  return (
    <div className="services-list">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
        />
      ))}
    </div>
  );
}