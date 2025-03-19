
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={`flex items-center space-x-2 transition-transform duration-300 hover:scale-105 ${className}`}>
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 bg-gradient-to-br from-byteblue to-blue-700 rounded-lg shadow-lg transform rotate-45"></div>
        <div className="absolute inset-[3px] bg-background rounded-[6px] flex items-center justify-center transform rotate-45">
          <span className="text-byteblue font-bold text-lg transform -rotate-45">BE</span>
        </div>
      </div>
      <h1 className="font-bold text-2xl">
        <span className="text-foreground">Byte</span>
        <span className="text-byteblue">Edge</span>
      </h1>
    </Link>
  );
};

export default Logo;
