
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
    
    // Create particles
    const particleCount = 50;
    const particles: {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      opacity: number;
    }[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(particle => {
        // Set particle color based on theme
        const baseColor = theme === 'dark' ? '255, 255, 255' : '14, 134, 240';
        ctx.fillStyle = `rgba(${baseColor}, ${particle.opacity})`;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.dx;
        particle.y += particle.dy;
        
        // Bounce off edges
        if (particle.x + particle.radius > canvas.width || particle.x - particle.radius < 0) {
          particle.dx = -particle.dx;
        }
        
        if (particle.y + particle.radius > canvas.height || particle.y - particle.radius < 0) {
          particle.dy = -particle.dy;
        }
      });
      
      // Draw connecting lines between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const opacity = (1 - distance / maxDistance) * 0.2;
            const baseColor = theme === 'dark' ? '255, 255, 255' : '14, 134, 240';
            ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default AnimatedBackground;
