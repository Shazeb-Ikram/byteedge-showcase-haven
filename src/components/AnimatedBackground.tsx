
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

    // Star configuration
    const stars = [
      { name: 'Bellatrix', x: canvas.width * 0.3, y: canvas.height * 0.3, radius: 2.5, maxRadius: 3.5, 
        pulseSpeed: 0.02, pulseDirection: 1, pulseFactor: 0, hue: 210 },
      { name: 'Izar', x: canvas.width * 0.7, y: canvas.height * 0.4, radius: 2.2, maxRadius: 3.2, 
        pulseSpeed: 0.015, pulseDirection: 1, pulseFactor: 0.5, hue: 200 },
      { name: 'Atria', x: canvas.width * 0.5, y: canvas.height * 0.7, radius: 2.8, maxRadius: 3.8, 
        pulseSpeed: 0.025, pulseDirection: 1, pulseFactor: 0.8, hue: 220 }
    ];
    
    // Dust particles
    const dustParticles = [];
    const dustCount = 80; // Reduced number for less intensity
    
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 0.1, // Smaller particles
        speedX: (Math.random() - 0.5) * 0.2, // Slower movement
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: 0.05 + Math.random() * 0.15 // Lower opacity
      });
    }
    
    // Draw connection between stars (constellation lines)
    const drawConstellationLines = () => {
      // Draw lines between stars with a very subtle opacity
      ctx.beginPath();
      ctx.moveTo(stars[0].x, stars[0].y);
      ctx.lineTo(stars[1].x, stars[1].y);
      ctx.lineTo(stars[2].x, stars[2].y);
      
      // Set line style based on theme
      const baseColor = theme === 'dark' ? '180, 200, 255' : '30, 60, 140';
      const lineOpacity = theme === 'dark' ? 0.04 : 0.03; // Very subtle
      
      ctx.strokeStyle = `rgba(${baseColor}, ${lineOpacity})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };
    
    let frameCount = 0;
    
    const animate = () => {
      frameCount++;
      
      // Clear canvas with very high persistence for minimal trailing
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(10, 10, 20, 0.1)' 
        : 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars with gentle pulsing
      stars.forEach(star => {
        // Update pulsing effect (very subtle)
        star.pulseFactor += star.pulseSpeed * star.pulseDirection;
        if (star.pulseFactor >= 1) {
          star.pulseDirection = -1;
        } else if (star.pulseFactor <= 0) {
          star.pulseDirection = 1;
        }
        
        // Calculate current radius with pulsing
        const currentRadius = star.radius + (star.maxRadius - star.radius) * star.pulseFactor;
        
        // Draw star center
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, currentRadius * 5
        );
        
        // Set colors based on theme
        const baseColor = theme === 'dark' ? '180, 210, 255' : '30, 90, 180';
        
        gradient.addColorStop(0, `rgba(${baseColor}, ${0.6 + star.pulseFactor * 0.3})`);
        gradient.addColorStop(0.4, `rgba(${baseColor}, ${0.2 + star.pulseFactor * 0.1})`);
        gradient.addColorStop(1, `rgba(${baseColor}, 0)`);
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius * 5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'dark' 
          ? `rgba(220, 235, 255, ${0.7 + star.pulseFactor * 0.3})` 
          : `rgba(50, 120, 220, ${0.6 + star.pulseFactor * 0.3})`;
        ctx.fill();
      });
      
      // Draw constellation lines every frame (very subtle)
      if (frameCount % 3 === 0) { // Reduce frequency of redrawing lines
        drawConstellationLines();
      }
      
      // Update and draw dust particles
      dustParticles.forEach(particle => {
        // Update position (very slow movement)
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check with wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
        // Set particle color based on theme
        const baseColor = theme === 'dark' ? '180, 210, 255' : '30, 90, 180';
        ctx.fillStyle = `rgba(${baseColor}, ${particle.opacity})`;
        ctx.fill();
      });
      
      // Occasional subtle shimmer effect on constellation lines (very rare)
      if (Math.random() < 0.003) { // 0.3% chance per frame
        const shimmerStart = Math.floor(Math.random() * stars.length);
        const shimmerEnd = (shimmerStart + 1) % stars.length;
        
        const shimmerLength = 200;
        const shimmerSteps = 20;
        
        // Shimmer animation
        let step = 0;
        const shimmerInterval = setInterval(() => {
          if (step >= shimmerSteps || !ctx) {
            clearInterval(shimmerInterval);
            return;
          }
          
          // Calculate shimmer opacity
          const progress = step / shimmerSteps;
          const shimmerOpacity = Math.sin(progress * Math.PI) * 0.15; // Max 15% opacity
          
          // Draw shimmering line segment
          ctx.beginPath();
          ctx.moveTo(stars[shimmerStart].x, stars[shimmerStart].y);
          ctx.lineTo(stars[shimmerEnd].x, stars[shimmerEnd].y);
          
          const baseColor = theme === 'dark' ? '180, 210, 255' : '30, 90, 180';
          ctx.strokeStyle = `rgba(${baseColor}, ${shimmerOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          step++;
        }, 50);
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
