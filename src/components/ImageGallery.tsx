
import React from 'react';
import { 
  ServerCog, 
  GitBranch, 
  Terminal, 
  Code, 
  Settings 
} from 'lucide-react';

type GalleryType = 'overlapping' | 'stacked' | 'single' | 'split' | 'placeholder';

interface ImageGalleryProps {
  type: GalleryType;
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ type, images, alt }) => {
  if (type === 'overlapping' && images.length > 0) {
    return (
      <div className="relative h-80 md:h-96 w-full">
        {images.map((img, index) => (
          <div 
            key={index}
            className="absolute rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:z-10 hover:shadow-xl"
            style={{
              top: `${index * 5}%`,
              left: `${index * 5}%`,
              width: '90%',
              height: '90%',
              transform: `rotate(${index % 2 === 0 ? 2 : -2}deg)`,
              zIndex: index,
            }}
          >
            <img 
              src={img} 
              alt={`${alt} ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'stacked' && images.length > 0) {
    return (
      <div className="relative h-80 md:h-96 w-full perspective">
        {images.map((img, index) => (
          <div 
            key={index}
            className="absolute rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:z-10 hover:shadow-xl"
            style={{
              top: '10%',
              left: '10%',
              width: '80%',
              height: '80%',
              transform: `translateZ(${-20 * (images.length - index - 1)}px) translateY(${-10 * (images.length - index - 1)}px)`,
              zIndex: index,
            }}
          >
            <img 
              src={img} 
              alt={`${alt} ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'single' && images.length > 0) {
    return (
      <div className="relative h-80 md:h-96 w-full">
        <div className="absolute inset-0 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
          <img 
            src={images[0]} 
            alt={alt} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  if (type === 'split' && images.length > 0) {
    return (
      <div className="relative h-80 md:h-96 w-full">
        {images.slice(0, 2).map((img, index) => (
          <div 
            key={index}
            className="absolute rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:z-10 hover:shadow-xl"
            style={{
              top: '10%',
              left: index === 0 ? '5%' : '30%',
              width: '70%',
              height: '80%',
              transform: `rotate(${index === 0 ? -5 : 5}deg)`,
              zIndex: index,
            }}
          >
            <img 
              src={img} 
              alt={`${alt} ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'placeholder') {
    return (
      <div className="relative h-80 md:h-96 w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-center p-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <ServerCog className="w-12 h-12 text-byteblue" />
            <GitBranch className="w-12 h-12 text-byteblue" />
            <Terminal className="w-12 h-12 text-byteblue" />
            <Code className="w-12 h-12 text-byteblue" />
          </div>
          <Settings className="w-20 h-20 text-byteblue animate-spin-slow" />
          <p className="mt-6 text-lg text-center text-foreground">
            Automated workflows and continuous integration/delivery pipelines for efficient software development
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default ImageGallery;
