
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
      <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-byteblue/30 group">
        {/* Dynamic 3D-like background with layered gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-byteblue via-blue-500 to-sky-400 opacity-80" />
        
        {/* Animated pulse overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-transparent opacity-40 animate-pulse"
             style={{ animationDuration: '3s' }}></div>
        
        {/* Inner element with depth */}
        <div className="absolute inset-[2px] rounded-md backdrop-blur-sm flex items-center justify-center overflow-hidden
                        bg-gradient-to-br from-background/90 via-background/80 to-background/50">
          
          {/* Decorative elements that suggest technology/code */}
          <div className="absolute top-0 left-0 h-[8px] w-[1.5px] bg-byteblue/80"></div>
          <div className="absolute top-0 left-0 h-[1.5px] w-[8px] bg-byteblue/80"></div>
          <div className="absolute top-0 right-0 h-[8px] w-[1.5px] bg-byteblue/80"></div>
          <div className="absolute top-0 right-0 h-[1.5px] w-[8px] bg-byteblue/80"></div>
          <div className="absolute bottom-0 left-0 h-[8px] w-[1.5px] bg-byteblue/80"></div>
          <div className="absolute bottom-0 left-0 h-[1.5px] w-[8px] bg-byteblue/80"></div>
          <div className="absolute bottom-0 right-0 h-[8px] w-[1.5px] bg-byteblue/80"></div>
          <div className="absolute bottom-0 right-0 h-[1.5px] w-[8px] bg-byteblue/80"></div>
          
          {/* Diagonal accent lines */}
          <div className="absolute top-[3px] left-[3px] h-[12px] w-[1px] bg-byteblue/50 rotate-45"></div>
          <div className="absolute bottom-[3px] right-[3px] h-[12px] w-[1px] bg-byteblue/50 rotate-45"></div>
          <div className="absolute top-[3px] right-[3px] h-[12px] w-[1px] bg-byteblue/50 -rotate-45"></div>
          <div className="absolute bottom-[3px] left-[3px] h-[12px] w-[1px] bg-byteblue/50 -rotate-45"></div>
          
          {/* Center element with 3D effect */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-byteblue/20 to-transparent rounded-sm transform scale-110"></div>
            <div className="font-black text-xl transform text-transparent bg-clip-text 
                           bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
              BE
            </div>
          </div>
          
          {/* Animated corner dots */}
          <div className="absolute h-[2px] w-[2px] rounded-full bg-byteblue top-[25%] left-[25%] animate-pulse" 
               style={{ animationDuration: '2s' }}></div>
          <div className="absolute h-[2px] w-[2px] rounded-full bg-byteblue bottom-[25%] right-[25%] animate-pulse" 
               style={{ animationDuration: '3s' }}></div>
        </div>
        
        {/* Interactive hover effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-blue-400/40 opacity-0 
                       group-hover:opacity-60 transition-opacity duration-300 rounded-md"></div>
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-30 
                       transition-opacity duration-300 rounded-md"></div>
      </div>
      
      <h1 className="font-bold text-2xl flex flex-col items-start group">
        <span className="text-foreground relative overflow-hidden group-hover:text-byteblue/90 transition-colors duration-300">
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
