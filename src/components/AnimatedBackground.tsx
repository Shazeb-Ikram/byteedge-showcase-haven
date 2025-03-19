
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match viewport
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Particle system configuration
    const particleCount = 50; // Number of particles
    const connectionDistance = 200; // Maximum distance to draw connections
    const particles: {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      hue: number;
      hueSpeed: number;
      opacity: number;
    }[] = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        hue: Math.random() * 60 - 30, // Slight color variation
        hueSpeed: (Math.random() - 0.5) * 0.1, // Color changing speed
        opacity: 0.1 + Math.random() * 0.3
      });
    }
    
    const animate = () => {
      // Clear canvas with slight persistence for trailing effect
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(10, 10, 20, 0.05)' 
        : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Update hue
        p.hue += p.hueSpeed;
        
        // Boundary checks with wrapping
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Set particle color based on theme
        const baseColor = theme === 'dark' ? '200, 220, 255' : '30, 60, 110';
        ctx.fillStyle = `rgba(${baseColor}, ${p.opacity})`;
        ctx.fill();
        
        // Create connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Calculate opacity based on distance (closer = more opaque)
            const opacity = (1 - distance / connectionDistance) * 0.4 * (p.opacity + p2.opacity) / 2;
            
            // Draw line connecting particles
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Set line color based on theme
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(180, 210, 255, ${opacity})` 
              : `rgba(50, 90, 160, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Create occasional radial pulses for visual interest (constellation "activations")
      if (Math.random() < 0.01) { // 1% chance per frame
        const pulse = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0,
          maxRadius: 100 + Math.random() * 150,
          growth: 3 + Math.random() * 2
        };
        
        const expandPulse = () => {
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
          ctx.strokeStyle = theme === 'dark' 
            ? `rgba(180, 210, 255, ${0.4 - pulse.radius / pulse.maxRadius * 0.4})` 
            : `rgba(50, 90, 160, ${0.3 - pulse.radius / pulse.maxRadius * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          
          pulse.radius += pulse.growth;
          
          if (pulse.radius < pulse.maxRadius) {
            requestAnimationFrame(expandPulse);
          }
        };
        
        expandPulse();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
