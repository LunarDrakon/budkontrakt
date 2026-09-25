import ServiceCard from './ServiceCard'

export default function ServiceList({ services }) {
    return (
        <div className="services-list">
            {services.map((service) => (
                <ServiceCard
                    key={service.id}
                    service={service}
                />
            ))}
        </div>
    )
}