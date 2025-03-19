
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
    
    // Create flowing wave patterns
    const waveCount = 3;
    const waves: {
      amplitude: number;
      frequency: number;
      speed: number;
      phase: number;
      color: string;
      opacity: number;
    }[] = [];
    
    // Setup waves with different properties
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        amplitude: 10 + Math.random() * 20,
        frequency: 0.005 + Math.random() * 0.005,
        speed: 0.05 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2,
        color: theme === 'dark' ? '#2563eb' : '#60a5fa',
        opacity: 0.03 + Math.random() * 0.03
      });
    }
    
    // Animation loop
    let animationFrameId: number;
    let time = 0;
    
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background (just for a subtle touch)
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (theme === 'dark') {
        gradient.addColorStop(0, 'rgba(15, 23, 42, 0)');
        gradient.addColorStop(1, 'rgba(30, 41, 59, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(240, 249, 255, 0)');
        gradient.addColorStop(1, 'rgba(224, 242, 254, 0)');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw flowing waves
      waves.forEach((wave, index) => {
        ctx.beginPath();
        
        const baseY = canvas.height / 2;
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = baseY + 
            Math.sin(x * wave.frequency + wave.phase + time * wave.speed) * wave.amplitude + 
            Math.sin(x * wave.frequency * 2 + wave.phase + time * wave.speed * 1.5) * wave.amplitude * 0.5;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Complete the wave path
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Different colors for different waves
        const waveGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        if (theme === 'dark') {
          waveGradient.addColorStop(0, `rgba(30, 64, 175, ${wave.opacity})`);
          waveGradient.addColorStop(0.5, `rgba(37, 99, 235, ${wave.opacity})`);
          waveGradient.addColorStop(1, `rgba(59, 130, 246, ${wave.opacity})`);
        } else {
          waveGradient.addColorStop(0, `rgba(14, 134, 240, ${wave.opacity})`);
          waveGradient.addColorStop(0.5, `rgba(59, 130, 246, ${wave.opacity})`);
          waveGradient.addColorStop(1, `rgba(96, 165, 250, ${wave.opacity})`);
        }
        
        ctx.fillStyle = waveGradient;
        ctx.fill();
      });
      
      // Add subtle floating particles
      const particleCount = 30;
      const baseColor = theme === 'dark' ? '59, 130, 246' : '14, 134, 240';
      
      for (let i = 0; i < particleCount; i++) {
        const x = (Math.sin(time * 0.2 + i * 0.4) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.3 + i * 0.5) * 0.5 + 0.5) * canvas.height;
        const size = 1 + Math.sin(time * 0.1 + i) * 1;
        const opacity = 0.1 + Math.sin(time * 0.2 + i * 0.3) * 0.05;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${opacity})`;
        ctx.fill();
      }
      
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
