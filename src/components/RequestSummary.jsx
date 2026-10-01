import { useSelectedService } from '../context/SelectedServiceContext';

function RequestSummary({ request }) {
  const { selectedService } = useSelectedService();

  return (
    <div className="request-summary">
      <h3>Підсумок заявки</h3>

      <p>
        <strong>Послуга:</strong>{' '}
        {selectedService
          ? selectedService.name
          : 'Не вибрано'}
      </p>

      <p>
        <strong>Ім'я:</strong>{' '}
        {request.name || 'Не вказано'}
      </p>

      <p>
        <strong>Телефон:</strong>{' '}
        {request.phone || 'Не вказано'}
      </p>
    </div>
  );
}

export default RequestSummary;