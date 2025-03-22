
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
  Cloud,
  FileCheck,
  Layers,
  Edit,
  Zap,
  Gauge,
  Package,
  Rocket,
  CheckCircle2,
  Workflow,
  Puzzle,
  Users,
  Database,
  ArrowRight
} from 'lucide-react';

type GalleryType = 'placeholder';

interface ImageGalleryProps {
  type: GalleryType;
  alt: string;
  service: 'web-development' | 'mobile-app-development' | 'backend-development' | 'ui-ux-design' | 'cloud-solutions' | 'devops';
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ type, alt, service }) => {
  // Define the delivery process flowchart for each service
  const serviceFlowcharts = {
    'web-development': {
      stages: [
        { icon: <Puzzle className="flowchart-icon" />, name: "Discovery", description: "Requirements gathering and project planning" },
        { icon: <Edit className="flowchart-icon" />, name: "Design", description: "UI/UX wireframing and prototyping" },
        { icon: <Code className="flowchart-icon" />, name: "Development", description: "Frontend and backend implementation" },
        { icon: <Gauge className="flowchart-icon" />, name: "Testing", description: "QA and performance optimization" },
        { icon: <Rocket className="flowchart-icon" />, name: "Deployment", description: "Launch and client training" }
      ],
      color: "from-blue-500/20 to-indigo-500/20"
    },
    'mobile-app-development': {
      stages: [
        { icon: <Users className="flowchart-icon" />, name: "User Research", description: "Identifying target audience needs" },
        { icon: <Layers className="flowchart-icon" />, name: "Prototyping", description: "Interactive mockups and user flows" },
        { icon: <Smartphone className="flowchart-icon" />, name: "Development", description: "Native or cross-platform coding" },
        { icon: <Zap className="flowchart-icon" />, name: "Testing", description: "Device-specific and usability testing" },
        { icon: <Package className="flowchart-icon" />, name: "Store Release", description: "App store submission and optimization" }
      ],
      color: "from-purple-500/20 to-pink-500/20"
    },
    'backend-development': {
      stages: [
        { icon: <Workflow className="flowchart-icon" />, name: "Architecture", description: "System design and data modeling" },
        { icon: <Database className="flowchart-icon" />, name: "Database Design", description: "Schema development and optimization" },
        { icon: <Server className="flowchart-icon" />, name: "API Development", description: "Endpoints and service integration" },
        { icon: <Terminal className="flowchart-icon" />, name: "Testing", description: "Load testing and security audits" },
        { icon: <CheckCircle2 className="flowchart-icon" />, name: "Documentation", description: "API docs and developer resources" }
      ],
      color: "from-emerald-500/20 to-teal-500/20"
    },
    'ui-ux-design': {
      stages: [
        { icon: <Users className="flowchart-icon" />, name: "User Research", description: "Personas and journey mapping" },
        { icon: <Puzzle className="flowchart-icon" />, name: "Information Architecture", description: "Site mapping and content hierarchy" },
        { icon: <Edit className="flowchart-icon" />, name: "Wireframing", description: "Low-fidelity layouts and interactions" },
        { icon: <Palette className="flowchart-icon" />, name: "Visual Design", description: "High-fidelity mockups and UI elements" },
        { icon: <FileCheck className="flowchart-icon" />, name: "Usability Testing", description: "User feedback and iterations" }
      ],
      color: "from-amber-500/20 to-orange-500/20"
    },
    'cloud-solutions': {
      stages: [
        { icon: <Puzzle className="flowchart-icon" />, name: "Assessment", description: "Infrastructure evaluation and planning" },
        { icon: <Cloud className="flowchart-icon" />, name: "Architecture", description: "Cloud-native design and security" },
        { icon: <ServerCog className="flowchart-icon" />, name: "Migration", description: "Data and application transition" },
        { icon: <Settings className="flowchart-icon" />, name: "Optimization", description: "Performance tuning and cost management" },
        { icon: <Gauge className="flowchart-icon" />, name: "Monitoring", description: "Ongoing maintenance and support" }
      ],
      color: "from-sky-500/20 to-cyan-500/20"
    },
    'devops': {
      stages: [
        { icon: <GitBranch className="flowchart-icon" />, name: "Version Control", description: "Code repository and branching strategy" },
        { icon: <Workflow className="flowchart-icon" />, name: "CI/CD Pipeline", description: "Automated build and deployment" },
        { icon: <ServerCog className="flowchart-icon" />, name: "Infrastructure", description: "Infrastructure as code and automation" },
        { icon: <Gauge className="flowchart-icon" />, name: "Monitoring", description: "Logging, metrics, and alerting" },
        { icon: <Zap className="flowchart-icon" />, name: "Optimization", description: "Performance tuning and scaling" }
      ],
      color: "from-rose-500/20 to-red-500/20"
    }
  };

  // Get config for current service
  const currentFlowchart = serviceFlowcharts[service];

  return (
    <div className="relative h-96 md:h-120 w-full">
      <div className={`absolute inset-0 bg-gradient-to-br ${currentFlowchart.color} rounded-lg overflow-hidden shadow-lg p-6`}>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-6 text-foreground">Our Delivery Process</h3>
          
          <div className="w-full flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-start">
            {currentFlowchart.stages.map((stage, index) => (
              <div 
                key={index} 
                className="flowchart-stage flex flex-col items-center text-center"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-card rounded-full shadow-md mb-3 text-byteblue p-4">
                  {stage.icon}
                </div>
                <h4 className="font-semibold text-foreground">{stage.name}</h4>
                <p className="text-xs md:text-sm text-muted-foreground max-w-[120px] mt-1">
                  {stage.description}
                </p>
                
                {index < currentFlowchart.stages.length - 1 && (
                  <div className="flowchart-arrow hidden md:block absolute top-1/3 left-[calc(20%*2*index+10%)] transform -translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-byteblue" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
