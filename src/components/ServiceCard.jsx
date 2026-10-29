import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router';
import { useSelectedService } from '../context/SelectedServiceContext';

function ServiceCard({ service }) {
  const { selectService } = useSelectedService();

  return (
    <Card className="service-card h-100">
      <Card.Body className="d-flex flex-column">
        <div className="service-card-heading">
          <Card.Title>
            <Link
              to={`/services/${service.id}`}
              className="service-title-link"
              onClick={() => selectService(service)}
            >
              {service.name}
            </Link>
          </Card.Title>

          <Badge bg="light" text="dark" className="service-category">
            {service.category}
          </Badge>
        </div>

        <Card.Text className="service-description">
          {service.description}
        </Card.Text>

        <div className="service-card-bottom">
          <Card.Text className="service-price">
            <span>Вартість:</span>{' '}
            <strong>{service.price}</strong>
          </Card.Text>

          <div className="service-status">
            <span
              className={
                service.available
                  ? 'availability-dot available-dot'
                  : 'availability-dot unavailable-dot'
              }
              aria-hidden="true"
            />

            <span
              className={
                service.available
                  ? 'available'
                  : 'unavailable'
              }
            >
              {service.available
                ? 'Доступно'
                : 'Тимчасово недоступно'}
            </span>
          </div>
        </div>

        <Button
          as={Link}
          to={`/services/${service.id}`}
          variant="outline-primary"
          className="service-details-button mt-3"
          onClick={() => selectService(service)}
        >
          Детальніше
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ServiceCard;