import Card from 'react-bootstrap/Card';

function ServiceCard({ service }) {
  return (
    <Card className="service-card">
      <Card.Body>
        <Card.Title>{service.name}</Card.Title>

        <Card.Text className="service-category">
          {service.category}
        </Card.Text>

        <Card.Text>
          {service.description}
        </Card.Text>

        <Card.Text className="service-price">
          {service.price}
        </Card.Text>

        <Card.Text className={service.available ? 'available' : 'unavailable'}>
          {service.available ? 'Доступно' : 'Тимчасово недоступно'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ServiceCard;