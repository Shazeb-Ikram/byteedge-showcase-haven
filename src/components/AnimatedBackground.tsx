
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
    const particleCount = 100;
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
    }[] = [];
    
    // Set up particles with different properties
    for (let i = 0; i < particleCount; i++) {
      const size = 2 + Math.random() * 8;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        color: theme === 'dark' ? '#2563eb' : '#60a5fa',
        opacity: 0.1 + Math.random() * 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      });
    }
    
    // Add energy lines
    const lineCount = 10;
    const lines: {
      startX: number;
      startY: number;
      length: number;
      angle: number;
      speed: number;
      width: number;
      color: string;
      opacity: number;
    }[] = [];
    
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        startX: Math.random() * canvas.width,
        startY: Math.random() * canvas.height,
        length: 100 + Math.random() * 200,
        angle: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.01,
        width: 1 + Math.random() * 3,
        color: theme === 'dark' ? '#3b82f6' : '#3b82f6',
        opacity: 0.1 + Math.random() * 0.2
      });
    }
    
    // Animation variables
    let time = 0;
    let animationFrameId: number;
    
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient (subtle)
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0, 
        canvas.width / 2, 
        canvas.height / 2, 
        canvas.width * 0.7
      );
      
      if (theme === 'dark') {
        gradient.addColorStop(0, 'rgba(30, 41, 59, 0.1)');
        gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(224, 242, 254, 0.1)');
        gradient.addColorStop(1, 'rgba(240, 249, 255, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw energy lines
      lines.forEach(line => {
        // Update line position
        line.angle += line.speed;
        line.startX += Math.cos(line.angle) * 0.5;
        line.startY += Math.sin(line.angle) * 0.5;
        
        // If line moves off screen, reset position
        if (line.startX < -line.length || line.startX > canvas.width + line.length ||
            line.startY < -line.length || line.startY > canvas.height + line.length) {
          line.startX = Math.random() * canvas.width;
          line.startY = Math.random() * canvas.height;
          line.angle = Math.random() * Math.PI * 2;
        }
        
        // Draw line with glow effect
        const endX = line.startX + Math.cos(line.angle) * line.length;
        const endY = line.startY + Math.sin(line.angle) * line.length;
        
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(endX, endY);
        
        // Create gradient along line
        const lineGradient = ctx.createLinearGradient(line.startX, line.startY, endX, endY);
        
        if (theme === 'dark') {
          lineGradient.addColorStop(0, `rgba(59, 130, 246, ${line.opacity})`);
          lineGradient.addColorStop(0.5, `rgba(96, 165, 250, ${line.opacity * 0.8})`);
          lineGradient.addColorStop(1, `rgba(147, 197, 253, ${line.opacity * 0.2})`);
        } else {
          lineGradient.addColorStop(0, `rgba(14, 134, 240, ${line.opacity})`);
          lineGradient.addColorStop(0.5, `rgba(59, 130, 246, ${line.opacity * 0.8})`);
          lineGradient.addColorStop(1, `rgba(96, 165, 250, ${line.opacity * 0.2})`);
        }
        
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = line.width;
        ctx.stroke();
        
        // Add subtle glow
        ctx.shadowColor = theme === 'dark' ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.5)';
        ctx.shadowBlur = 10;
        ctx.globalCompositeOperation = 'lighter';
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowBlur = 0;
      });
      
      // Draw moving particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Draw particle with pulse effect
        const pulseSize = particle.size * (0.8 + Math.sin(time * 2 + particle.x * 0.01) * 0.2);
        const pulseOpacity = particle.opacity * (0.8 + Math.sin(time * 3 + particle.y * 0.01) * 0.2);
        
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        // Create a shape with glow
        ctx.beginPath();
        
        // Draw a polygon for more interesting shapes
        const sides = Math.floor(Math.random() * 3) + 3; // 3 to 5 sides
        const radius = pulseSize;
        
        ctx.moveTo(radius, 0);
        for (let i = 1; i < sides; i++) {
          const angle = (i * 2 * Math.PI / sides);
          ctx.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
        }
        ctx.closePath();
        
        const particleColor = theme === 'dark' 
          ? `rgba(59, 130, 246, ${pulseOpacity})` 
          : `rgba(59, 130, 246, ${pulseOpacity})`;
        
        // Add glow effect
        ctx.shadowColor = theme === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)';
        ctx.shadowBlur = 15;
        
        ctx.fillStyle = particleColor;
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
        ctx.restore();
      });
      
      // Add occasional energy burst
      if (Math.random() < 0.01) {
        const burstX = Math.random() * canvas.width;
        const burstY = Math.random() * canvas.height;
        const burstRadius = 50 + Math.random() * 100;
        
        const burstGradient = ctx.createRadialGradient(
          burstX, burstY, 0, 
          burstX, burstY, burstRadius
        );
        
        if (theme === 'dark') {
          burstGradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
          burstGradient.addColorStop(0.3, 'rgba(37, 99, 235, 0.2)');
          burstGradient.addColorStop(1, 'rgba(30, 64, 175, 0)');
        } else {
          burstGradient.addColorStop(0, 'rgba(96, 165, 250, 0.4)');
          burstGradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.2)');
          burstGradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
        }
        
        ctx.beginPath();
        ctx.arc(burstX, burstY, burstRadius, 0, Math.PI * 2);
        ctx.fillStyle = burstGradient;
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
