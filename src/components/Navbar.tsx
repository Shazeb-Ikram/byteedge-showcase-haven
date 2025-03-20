
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Monitor, Smartphone, Server, Palette, Cloud, Cog, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const location = useLocation();
  const isMobile = useIsMobile();

  const services = [
    { 
      id: 'web-development', 
      name: 'Web Development', 
      icon: <Monitor className="w-6 h-6 text-byteblue" />,
      description: 'Custom websites, web applications, and e-commerce solutions built with cutting-edge technologies.'
    },
    { 
      id: 'mobile-app-development', 
      name: 'Mobile App Development', 
      icon: <Smartphone className="w-6 h-6 text-byteblue" />,
      description: 'Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.'
    },
    { 
      id: 'backend-development', 
      name: 'Backend Development', 
      icon: <Server className="w-6 h-6 text-byteblue" />,
      description: 'Robust, scalable, and secure backend systems that power your applications.'
    },
    { 
      id: 'ui-ux-design', 
      name: 'UI/UX Design', 
      icon: <Palette className="w-6 h-6 text-byteblue" />,
      description: 'Beautiful, intuitive interfaces that enhance user engagement and satisfaction.'
    },
    { 
      id: 'cloud-solutions', 
      name: 'Cloud Solutions', 
      icon: <Cloud className="w-6 h-6 text-byteblue" />,
      description: 'Cloud infrastructure setup, migration, and management for optimal performance.'
    },
    { 
      id: 'devops', 
      name: 'DevOps', 
      icon: <Cog className="w-6 h-6 text-byteblue" />,
      description: 'Streamlined development processes and automated workflows for faster delivery.'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-background'}`}>
      <div className="container-custom mx-auto">
        <div className="flex justify-between items-center py-4">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-10 items-center">
              <li ref={servicesRef} className="relative">
                <button 
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="nav-link flex items-center"
                  aria-expanded={servicesOpen}
                >
                  Services
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {servicesOpen && (
                  <div className="dropdown-content w-80">
                    <div className="p-2 grid grid-cols-1 gap-2">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.id}`}
                          className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors duration-200"
                        >
                          <div className="flex-shrink-0">
                            {service.icon}
                          </div>
                          <div className="text-left">
                            <h3 className="font-medium">{service.name}</h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
              <li>
                <Link to="/about" className="nav-link">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link">Contact Us</Link>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 px-2 bg-background/95 backdrop-blur-sm animate-fade-in rounded-md mb-4 border border-border">
            <ul className="space-y-4">
              <li>
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                  Services
                </div>
                <div className="mt-1 space-y-1 pl-4">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                    >
                      <div className="flex-shrink-0">
                        {service.icon}
                      </div>
                      <span>{service.name}</span>
                    </Link>
                  ))}
                </div>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
