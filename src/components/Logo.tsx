
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
      <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-byteblue/30 group">
        {/* Dynamic background with pulsing gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-byteblue via-blue-500 to-sky-400 opacity-80 animate-pulse"
            style={{ animationDuration: '4s' }} />
        
        {/* Overlaying geometric pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 0L48 24L24 48L0 24L24 0Z" fill="url(#logopattern)" />
            <path d="M24 8L40 24L24 40L8 24L24 8Z" fill="url(#logopattern2)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <circle cx="24" cy="24" r="8" fill="url(#logopattern3)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            <defs>
              <linearGradient id="logopattern" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0E86F0" stopOpacity="0.2" />
                <stop offset="1" stopColor="#0E86F0" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="logopattern2" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" stopOpacity="0.1" />
                <stop offset="1" stopColor="#0E86F0" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="logopattern3" x1="16" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" stopOpacity="0.4" />
                <stop offset="1" stopColor="#0E86F0" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Inner container with frosted glass effect */}
        <div className="absolute inset-[2px] rounded-md backdrop-blur-sm flex items-center justify-center overflow-hidden
                        bg-gradient-to-br from-background/90 via-background/80 to-background/50 transition-all duration-300">
          
          {/* Geometric accents */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 h-[6px] w-[6px] border-t border-r border-byteblue/40 opacity-80"></div>
            <div className="absolute bottom-0 left-0 h-[6px] w-[6px] border-b border-l border-byteblue/40 opacity-80"></div>
          </div>
          
          {/* Animated glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
            <div className="absolute inset-4 rounded-full bg-byteblue/20 blur-md animate-pulse" 
                 style={{ animationDuration: '2s' }}></div>
          </div>
          
          {/* Central logo text */}
          <div className="relative z-10">
            <div className="font-black text-2xl transform text-transparent bg-clip-text 
                           bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
              BE
            </div>
          </div>
          
          {/* Animated highlights */}
          <div className="absolute top-[20%] right-[20%] h-[1px] w-[3px] bg-white/70 animate-pulse" 
               style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-[20%] left-[20%] h-[3px] w-[1px] bg-white/70 animate-pulse" 
               style={{ animationDuration: '4s' }}></div>
        </div>
        
        {/* Interactive hover effect */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-30 
                       transition-opacity duration-300 rounded-md"></div>
      </div>
      
      <h1 className="font-bold text-2xl flex flex-col items-start group">
        <span className="text-foreground relative overflow-hidden group-hover:text-byteblue/90 transition-colors duration-300 flex items-center">
          Byte
          {/* Animated underline */}
          <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-gradient-to-r from-byteblue/10 
                         via-byteblue/80 to-byteblue/10 transform scale-x-0 group-hover:scale-x-100 
                         transition-transform duration-300 origin-left"></span>
          
          {/* Small geometric accent */}
          <svg className="ml-0.5 h-1.5 w-1.5 opacity-70">
            <circle cx="3" cy="3" r="2" fill="#0E86F0" className="animate-pulse" style={{ animationDuration: '3s' }} />
          </svg>
        </span>
        <span className="text-byteblue relative">
          Edge
          {/* Animated underline */}
          <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-gradient-to-r from-byteblue/10 
                         via-byteblue/80 to-byteblue/10 transform scale-x-0 group-hover:scale-x-100 
                         transition-transform duration-300 origin-left delay-100"></span>
        </span>
      </h1>
    </Link>
  );
};

export default Logo;
