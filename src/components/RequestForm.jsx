import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RequestForm({ request, onRequestChange, onClear }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Ваше ім'я</Form.Label>
        <Form.Control
          type="text"
          value={request.name}
          onChange={(event) =>
            onRequestChange({
              ...request,
              name: event.target.value
            })
          }
          placeholder="Введіть ваше ім'я"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Номер телефону</Form.Label>
        <Form.Control
          type="tel"
          value={request.phone}
          onChange={(event) =>
            onRequestChange({
              ...request,
              phone: event.target.value
            })
          }
          placeholder="Введіть номер телефону"
        />
      </Form.Group>

      <Button variant="secondary" type="button" onClick={onClear}>
        Очистити заявку
      </Button>
    </Form>
  );
}

export default RequestForm;