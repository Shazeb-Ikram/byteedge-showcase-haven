
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Monitor, Smartphone, Server, Palette, Cloud, Cog, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

// Service details database with updated image paths
const servicesData = {
  'web-development': {
    title: 'Web Development',
    icon: <Monitor className="w-16 h-16 text-byteblue" />,
    description: 'Custom websites, web applications, and e-commerce solutions built with cutting-edge technologies.',
    longDescription: `Our web development team creates custom, responsive websites and web applications that are tailored to your business needs. We use the latest technologies and frameworks to ensure your web presence is modern, fast, and secure.`,
    features: [
      'Custom website design and development',
      'Progressive Web Applications (PWAs)',
      'E-commerce solutions',
      'Content Management Systems',
      'Web application development',
      'API integration',
      'Performance optimization'
    ],
    technologies: ['React', 'Angular', 'Vue.js', 'Node.js', 'PHP', 'WordPress', 'Shopify'],
    imagePath: '/lovable-uploads/ae87ccea-5ee3-4a7a-a567-75df1d54bcb3.png'
  },
  'mobile-app-development': {
    title: 'Mobile App Development',
    icon: <Smartphone className="w-16 h-16 text-byteblue" />,
    description: 'Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.',
    longDescription: `We design and develop high-performance mobile applications for both iOS and Android platforms. Our mobile apps are built with a focus on user experience, performance, and security.`,
    features: [
      'Native iOS app development',
      'Native Android app development',
      'Cross-platform app development',
      'UI/UX design for mobile',
      'App store optimization',
      'Mobile app maintenance and support',
      'Integration with backend systems'
    ],
    technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase'],
    imagePath: '/lovable-uploads/25065304-74c0-4d5f-a737-3e9c11c12e9e.png'
  },
  'backend-development': {
    title: 'Backend Development',
    icon: <Server className="w-16 h-16 text-byteblue" />,
    description: 'Robust, scalable, and secure backend systems that power your applications.',
    longDescription: `Our backend development expertise ensures your applications are powered by scalable, secure, and high-performance server-side solutions. We design database architectures and APIs that enable seamless data flow and integration.`,
    features: [
      'API development',
      'Database design and optimization',
      'Authentication and authorization systems',
      'Serverless architecture',
      'Microservices',
      'Real-time data processing',
      'Payment gateway integration'
    ],
    technologies: ['Node.js', 'Python', 'Java', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL'],
    imagePath: '/lovable-uploads/4bc1e7df-bce7-4aac-8229-83d2d16011a9.png'
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    icon: <Palette className="w-16 h-16 text-byteblue" />,
    description: 'Beautiful, intuitive interfaces that enhance user engagement and satisfaction.',
    longDescription: `Our UI/UX design team creates intuitive, engaging user interfaces that not only look beautiful but also provide an exceptional user experience. We focus on understanding your users' needs and creating designs that meet those needs.`,
    features: [
      'User research and personas',
      'Wireframing and prototyping',
      'Visual design',
      'Interaction design',
      'Usability testing',
      'Design systems',
      'Responsive design'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Zeplin'],
    imagePath: '/lovable-uploads/7128c9dd-d86a-4930-91c1-71b87b92ba83.png'
  },
  'cloud-solutions': {
    title: 'Cloud Solutions',
    icon: <Cloud className="w-16 h-16 text-byteblue" />,
    description: 'Cloud infrastructure setup, migration, and management for optimal performance.',
    longDescription: `Our cloud solutions experts help you leverage the power of cloud computing to improve scalability, reduce costs, and enhance your application's performance. We provide end-to-end cloud services from migration to management.`,
    features: [
      'Cloud migration',
      'Infrastructure as Code (IaC)',
      'Cloud architecture design',
      'Serverless computing',
      'Cloud security',
      'Performance optimization',
      'Cost management'
    ],
    technologies: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Kubernetes', 'Docker', 'Terraform'],
    imagePath: '/lovable-uploads/4bc1e7df-bce7-4aac-8229-83d2d16011a9.png'
  },
  'devops': {
    title: 'DevOps',
    icon: <Cog className="w-16 h-16 text-byteblue" />,
    description: 'Streamlined development processes and automated workflows for faster delivery.',
    longDescription: `Our DevOps services help you implement continuous integration and continuous delivery (CI/CD) pipelines, automate testing, and streamline your development workflow. This results in faster delivery of high-quality software.`,
    features: [
      'CI/CD pipeline setup',
      'Infrastructure automation',
      'Configuration management',
      'Containerization',
      'Monitoring and logging',
      'Security automation',
      'Performance testing'
    ],
    technologies: ['Jenkins', 'GitLab CI', 'Docker', 'Kubernetes', 'Ansible', 'Terraform', 'Prometheus'],
    imagePath: '/lovable-uploads/ae87ccea-5ee3-4a7a-a567-75df1d54bcb3.png'
  }
};

const ServicesDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [serviceData, setServiceData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      if (serviceId && serviceId in servicesData) {
        setServiceData(servicesData[serviceId as keyof typeof servicesData]);
      } else {
        // Handle invalid service ID
        console.error("Service not found");
      }
      setIsLoading(false);
    }, 300);
  }, [serviceId]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-byteblue"></div>
      </div>
    );
  }
  
  if (!serviceData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Service not found</h1>
        <Link to="/">
          <Button variant="outline">Return to Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="page-transition min-h-screen">
      <section className="py-16">
        <div className="container-custom">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-byteblue transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all services
          </Link>
          
          <div className="flex flex-col items-center text-center mb-16">
            <div className="mb-6">
              {serviceData.icon}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{serviceData.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{serviceData.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <div className="bg-card rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                <img 
                  src={serviceData.imagePath} 
                  alt={serviceData.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">{serviceData.longDescription}</p>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {serviceData.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-byteblue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/30 p-8 rounded-lg mb-16">
            <h3 className="text-xl font-semibold mb-4">Technologies We Use</h3>
            <div className="flex flex-wrap gap-3">
              {serviceData.technologies.map((tech: string, index: number) => (
                <span key={index} className="px-4 py-2 bg-card rounded-full text-sm font-medium shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6">Ready to get started?</h3>
            <Link to="/contact">
              <Button className="button-primary">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServicesDetail;
