
import React from 'react';
import { 
  ServerCog, 
  GitBranch, 
  Terminal, 
  Code, 
  Settings, 
  Monitor,
  Smartphone,
  Server,
  Palette,
  Cloud
} from 'lucide-react';

type GalleryType = 'placeholder';

interface ImageGalleryProps {
  type: GalleryType;
  alt: string;
  service: 'web-development' | 'mobile-app-development' | 'backend-development' | 'ui-ux-design' | 'cloud-solutions' | 'devops';
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ type, alt, service }) => {
  // Define service-specific colors and icons
  const serviceConfig = {
    'web-development': {
      icons: [<Monitor key="1" />, <Code key="2" />, <Terminal key="3" />, <Settings key="4" />],
      mainIcon: <Monitor />,
      text: "Modern, responsive web applications with cutting-edge frameworks and technologies"
    },
    'mobile-app-development': {
      icons: [<Smartphone key="1" />, <Code key="2" />, <Settings key="3" />, <Terminal key="4" />],
      mainIcon: <Smartphone />,
      text: "Native and cross-platform mobile applications for iOS and Android platforms"
    },
    'backend-development': {
      icons: [<Server key="1" />, <Code key="2" />, <Terminal key="3" />, <Settings key="4" />],
      mainIcon: <Server />,
      text: "Scalable, secure backend systems and APIs that power your applications"
    },
    'ui-ux-design': {
      icons: [<Palette key="1" />, <Code key="2" />, <Terminal key="3" />, <Settings key="4" />],
      mainIcon: <Palette />,
      text: "Beautiful, intuitive interfaces that enhance user engagement and satisfaction"
    },
    'cloud-solutions': {
      icons: [<Cloud key="1" />, <Server key="2" />, <Terminal key="3" />, <Settings key="4" />],
      mainIcon: <Cloud />,
      text: "Secure, scalable cloud infrastructures and migration strategies"
    },
    'devops': {
      icons: [<ServerCog key="1" />, <GitBranch key="2" />, <Terminal key="3" />, <Code key="4" />],
      mainIcon: <Settings />,
      text: "Automated workflows and continuous integration/delivery pipelines for efficient software development"
    }
  };

  // Get config for current service
  const currentConfig = serviceConfig[service];

  return (
    <div className="relative h-80 md:h-96 w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentConfig.icons.map((icon, index) => (
            <div key={index} className="w-12 h-12 text-byteblue">
              {icon}
            </div>
          ))}
        </div>
        {currentConfig.mainIcon && (
          <div className="w-20 h-20 text-byteblue animate-spin-slow">
            {currentConfig.mainIcon}
          </div>
        )}
        <p className="mt-6 text-lg text-center text-foreground">
          {currentConfig.text}
        </p>
      </div>
    </div>
  );
};

export default ImageGallery;
