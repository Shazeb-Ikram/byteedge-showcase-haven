
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';

const BiaAnimation = () => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

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

  // Handle fade in/out transitions
  useEffect(() => {
    if (!isVisible) {
      setOpacity(0);
      setIsChanging(false);
      return;
    }

    // Initial fade in
    const fadeIn = () => {
      let op = 0;
      const timer = setInterval(() => {
        if (op >= 1) {
          clearInterval(timer);
          setTimeout(() => setIsChanging(true), 3000); // Wait 3 seconds before changing
          return;
        }
        op += 0.05;
        setOpacity(op);
      }, 50); // Slower fade-in
    };

    fadeIn();
  }, [isVisible]);

  // Handle language changes with transitions
  useEffect(() => {
    if (!isChanging || !isVisible) return;

    // Fade out current language
    const fadeOut = () => {
      let op = 1;
      const timer = setInterval(() => {
        if (op <= 0) {
          clearInterval(timer);
          // Change language after fade out completes
          setCurrentLang((prev) => (prev + 1) % languages.length);
          setTimeout(fadeIn, 300); // Small delay before fading in
          return;
        }
        op -= 0.05;
        setOpacity(op);
      }, 50); // Slower fade-out
    };

    // Fade in new language
    const fadeIn = () => {
      let op = 0;
      const timer = setInterval(() => {
        if (op >= 1) {
          clearInterval(timer);
          setTimeout(() => fadeOut(), 3000); // Wait 3 seconds before fading out
          return;
        }
        op += 0.05;
        setOpacity(op);
      }, 50); // Slower fade-in
    };

    setTimeout(() => fadeOut(), 3000); // Start the first fadeOut after 3 seconds
  }, [isChanging, languages.length, isVisible]);

  return (
    <span 
      ref={containerRef}
      className="relative inline-block ml-1"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => {
        setIsVisible(false);
        setIsChanging(false);
      }}
    >
      <span className="w-0 h-0 overflow-hidden opacity-0">Bia</span>
      {isVisible && (
        <span 
          className="absolute text-byteblue romantic-text"
          style={{ 
            opacity: opacity, 
            transition: 'opacity 0.5s ease-in-out',
            transform: 'translateY(-2px)'
          }}
        >
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
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground text-sm inline-flex items-center justify-center">
            © {currentYear} ByteEdge. All rights reserved.<BiaAnimation />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
