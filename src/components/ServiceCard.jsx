import Card from 'react-bootstrap/Card';
import { Link } from 'react-router';
import { useSelectedService } from '../context/SelectedServiceContext';

function ServiceCard({ service }) {
  const { selectService } = useSelectedService();

  return (
    <Card
      className="service-card"
      onClick={() => selectService(service)}
    >
      <Card.Body>
        <Card.Title>
          <Link to={`/services/${service.id}`}>
            {service.name}
          </Link>
        </Card.Title>

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
          className={
            service.available
              ? 'available'
              : 'unavailable'
          }
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