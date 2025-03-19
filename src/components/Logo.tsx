
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const { theme } = useTheme();
  
  return (
    <Link to="/" className={`flex items-center space-x-2 transition-all duration-500 hover:scale-105 ${className}`}>
      <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-byteblue/20 group">
        {/* Dynamic background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-byteblue to-blue-600 opacity-80 animate-pulse" 
             style={{ animationDuration: '3s' }}></div>
        
        {/* Inner shape with interactive effects */}
        <div className="absolute inset-[2px] rounded-md backdrop-blur-sm flex items-center justify-center overflow-hidden
                       bg-gradient-to-tr from-background/90 via-background/80 to-background/70">
          
          {/* Animated geometric elements */}
          <div className="absolute top-[3px] left-[3px] h-[2px] w-[10px] bg-byteblue opacity-70"></div>
          <div className="absolute bottom-[3px] right-[3px] h-[2px] w-[10px] bg-byteblue opacity-70"></div>
          <div className="absolute top-[3px] right-[3px] h-[10px] w-[2px] bg-byteblue opacity-70"></div>
          <div className="absolute bottom-[3px] left-[3px] h-[10px] w-[2px] bg-byteblue opacity-70"></div>
          
          {/* Dynamic logo letter with glowing effect */}
          <div className="relative z-10 font-black text-xl transform rotate-0 text-transparent bg-clip-text 
                         bg-gradient-to-r from-blue-600 to-blue-400 animate-pulse"
               style={{ animationDuration: '4s' }}>
            BE
          </div>
          
          {/* Subtle animated particles */}
          <div className="absolute h-[3px] w-[3px] rounded-full bg-byteblue/60 top-[30%] left-[20%] animate-pulse" 
               style={{ animationDuration: '2.5s' }}></div>
          <div className="absolute h-[2px] w-[2px] rounded-full bg-byteblue/60 bottom-[30%] right-[20%] animate-pulse" 
               style={{ animationDuration: '1.8s' }}></div>
        </div>
        
        {/* Outer glow effect on hover */}
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-byteblue/50 to-blue-600/50 opacity-0 
                       group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
      </div>
      
      <h1 className="font-bold text-2xl flex flex-col items-start">
        <span className="text-foreground relative overflow-hidden group-hover:after:left-0">
          Byte
          <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-gradient-to-r from-byteblue/10 
                         via-byteblue/80 to-byteblue/10 transform scale-x-0 group-hover:scale-x-100 
                         transition-transform duration-300 origin-left"></span>
        </span>
        <span className="text-byteblue relative">
          Edge
          <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-gradient-to-r from-byteblue/10 
                         via-byteblue/80 to-byteblue/10 transform scale-x-0 group-hover:scale-x-100 
                         transition-transform duration-300 origin-left delay-100"></span>
        </span>
      </h1>
    </Link>
  );
};

export default Logo;
