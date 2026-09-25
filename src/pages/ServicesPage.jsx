import { services } from '../data/services.js';
import ServiceList from '../components/ServiceList.jsx';
import Section from '../components/Section.jsx';

function ServicesPage() {
  return (
    <div className="services-page">
      <Section title="Усі послуги компанії">
        <ServiceList services={services} />
      </Section>
    </div>
  );
}

export default ServicesPage;