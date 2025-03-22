
import { Mail, Instagram, Facebook } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const ContactUs = () => {
  return (
    <div className="page-transition min-h-screen">
      <section className="py-20">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            Contact Us
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-byteblue p-3 rounded-full text-white">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Direct Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:info@byteedge.services" className="hover:text-byteblue transition-colors">
                      info@byteedge.services
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-muted-foreground mb-4">
                  Fill out the form or email us directly at{' '}
                  <a href="mailto:info@byteedge.services" className="text-byteblue hover:underline">
                    info@byteedge.services
                  </a>
                </p>
                <p className="text-muted-foreground">
                  We'll get back to you within 24 hours!
                </p>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="bg-byteblue text-white p-3 rounded-full transition-transform hover:scale-110" aria-label="Instagram">
                  <Instagram size={24} />
                </a>
                <a href="#" className="bg-byteblue text-white p-3 rounded-full transition-transform hover:scale-110" aria-label="Facebook">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-md">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactUs;
