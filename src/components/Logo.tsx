
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
      <div className="relative h-11 w-11 overflow-hidden">
        {/* Animated logo shape with glow effect */}
        <div className="absolute inset-0 rounded-lg shadow-lg bg-gradient-to-br from-byteblue to-blue-700 animate-pulse" style={{ animationDuration: '3s' }}></div>
        
        {/* Inner shape with hover animation */}
        <div className="absolute inset-[2px] rounded-[6px] backdrop-blur-sm flex items-center justify-center overflow-hidden
                       bg-gradient-to-tr from-background via-background to-background/90 group-hover:from-background/90">
          
          {/* Animated accent lines */}
          <div className="absolute top-0 left-[5px] h-[2px] w-[15px] bg-byteblue opacity-70"></div>
          <div className="absolute bottom-0 right-[5px] h-[2px] w-[15px] bg-byteblue opacity-70"></div>
          
          {/* Logo letter with glow */}
          <div className="relative z-10 font-extrabold text-xl transform rotate-0 text-transparent bg-clip-text bg-gradient-to-r from-byteblue to-blue-500">
            BE
          </div>
          
          {/* Subtle animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-byteblue/10 to-transparent opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
        </div>
        
        {/* Subtle animated border glow */}
        <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-byteblue/50 to-blue-600/50 opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500"></div>
      </div>
      
      <h1 className="font-bold text-2xl">
        <span className="text-foreground">Byte</span>
        <span className="text-byteblue relative">
          Edge
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-byteblue/0 via-byteblue to-byteblue/0 transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-center"></span>
        </span>
      </h1>
    </Link>
  );
};

export default Logo;
