
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={`flex items-center space-x-2 transition-all duration-500 hover:opacity-90 ${className}`}>
      <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
        <span className="relative">
          ByteEdge
          <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-gradient-to-r from-byteblue/10 
                         via-byteblue/80 to-byteblue/10 transform scale-x-0 group-hover:scale-x-100 
                         transition-transform duration-300 origin-left"></span>
        </span>
      </h1>
    </Link>
  );
};

export default Logo;
