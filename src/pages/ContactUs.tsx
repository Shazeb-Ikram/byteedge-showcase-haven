
import { Mail } from 'lucide-react';
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
                  <p className="text-muted-foreground">info@byteedge.services</p>
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-muted-foreground mb-4">
                  Fill out the form or email us directly at info@byteedge.services
                </p>
                <p className="text-muted-foreground">
                  We'll get back to you within 24 hours!
                </p>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="bg-byteblue text-white p-3 rounded-full transition-transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="bg-byteblue text-white p-3 rounded-full transition-transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
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
