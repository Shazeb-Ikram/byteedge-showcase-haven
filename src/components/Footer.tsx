
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';

const BiaAnimation = () => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState(0);

  // Languages to display "Bia" in
  const languages = [
    { text: "Bia", lang: "English" },
    { text: "비아", lang: "Korean" },
    { text: "бия", lang: "Russian" },
    { text: "ビア", lang: "Japanese" },
    { text: "比亚", lang: "Chinese" },
    { text: "बिया", lang: "Hindi" },
    { text: "بیا", lang: "Persian" }
  ];

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentLang((prev) => (prev + 1) % languages.length);
    }, 1000); // Change language every second

    return () => clearInterval(interval);
  }, [isVisible, languages.length]);

  return (
    <span 
      ref={containerRef}
      className="bia-container relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="w-0 h-0 overflow-hidden opacity-0">Bia</span>
      {isVisible && (
        <span className="bia-animation bia-text">
          {languages[currentLang].text}
        </span>
      )}
    </span>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t border-border pt-12 pb-8">
      <div className="container-custom">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between mb-10 gap-10">
          <div className="mb-6 md:mb-0">
            <Logo className="mb-4 inline-block" />
            <p className="text-muted-foreground max-w-xs text-left">
              Connecting talented remote developers with businesses worldwide to deliver premium software solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-left">
                <li><Link to="/" className="text-muted-foreground hover:text-byteblue transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-byteblue transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-byteblue transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-left">
                <li><Link to="/services/web-development" className="text-muted-foreground hover:text-byteblue transition-colors">Web Development</Link></li>
                <li><Link to="/services/mobile-app-development" className="text-muted-foreground hover:text-byteblue transition-colors">Mobile App Development</Link></li>
                <li><Link to="/services/ui-ux-design" className="text-muted-foreground hover:text-byteblue transition-colors">UI/UX Design</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <p className="text-muted-foreground mb-4 text-left">info@byteedge.services</p>
              <div className="flex space-x-4">
                <a href="#" className="bg-byteblue text-white p-2 rounded-full transition-transform hover:scale-110">
                  <Instagram size={20} />
                </a>
                <a href="#" className="bg-byteblue text-white p-2 rounded-full transition-transform hover:scale-110">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center flex flex-col md:flex-row justify-center items-center gap-2">
          <p className="text-muted-foreground text-sm">
            © {currentYear} ByteEdge. All rights reserved.
          </p>
          <BiaAnimation />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
