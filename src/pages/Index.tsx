
import { Monitor, Smartphone, Server, Palette, Cloud, Cog } from 'lucide-react';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import Footer from '@/components/Footer';

const Index = () => {
  const services = [
    {
      id: 'web-development',
      icon: <Monitor className="w-12 h-12" />,
      title: 'Web Development',
      description: 'Custom websites, web applications, and e-commerce solutions built with cutting-edge technologies.'
    },
    {
      id: 'mobile-app-development',
      icon: <Smartphone className="w-12 h-12" />,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.'
    },
    {
      id: 'backend-development',
      icon: <Server className="w-12 h-12" />,
      title: 'Backend Development',
      description: 'Robust, scalable, and secure backend systems that power your applications.'
    },
    {
      id: 'ui-ux-design',
      icon: <Palette className="w-12 h-12" />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that enhance user engagement and satisfaction.'
    },
    {
      id: 'cloud-solutions',
      icon: <Cloud className="w-12 h-12" />,
      title: 'Cloud Solutions',
      description: 'Cloud infrastructure setup, migration, and management for optimal performance.'
    },
    {
      id: 'devops',
      icon: <Cog className="w-12 h-12" />,
      title: 'DevOps',
      description: 'Streamlined development processes and automated workflows for faster delivery.'
    }
  ];

  return (
    <div className="page-transition min-h-screen">
      <Hero />
      
      <section className="py-20 bg-muted/30" id="services">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide end-to-end software development services tailored to your business needs and goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
