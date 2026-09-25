function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <h3>{service.name}</h3>
      <p className="service-category">{service.category}</p>
      <p>{service.description}</p>
      <p className="service-price">{service.price}</p>
      <p className={service.available ? 'available' : 'unavailable'}>
        {service.available ? 'Доступно' : 'Тимчасово недоступно'}
      </p>
    </div>
  );
}

export default ServiceCard;