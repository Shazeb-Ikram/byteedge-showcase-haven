
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ id, icon, title, description }: ServiceCardProps) => {
  console.log(`Rendering ServiceCard: ${id}`);
  return (
    <div className="service-card group">
      <Link to={`/services/${id}`} className="flex flex-col items-center">
        <div className="service-card-icon">{icon}</div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-byteblue transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </Link>
    </div>
  );
};

export default ServiceCard;
