import Card from 'react-bootstrap/Card';
import { useSelectedService } from '../context/SelectedServiceContext';

function ServiceCard({ service }) {
  const { selectService } = useSelectedService();

  return (
    <Card
      className="service-card"
      onClick={() => selectService(service)}
      style={{ cursor: 'pointer' }}
    >
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

        <Card.Text
          className={service.available ? 'available' : 'unavailable'}
        >
          {service.available
            ? 'Доступно'
            : 'Тимчасово недоступно'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ServiceCard;