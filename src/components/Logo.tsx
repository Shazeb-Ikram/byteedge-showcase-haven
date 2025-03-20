
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={`flex items-center space-x-2 transition-all duration-500 hover:opacity-90 ${className}`}>
      <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-byteblue to-purple-400">
        ByteEdge
      </h1>
    </Link>
  );
};

export default Logo;
