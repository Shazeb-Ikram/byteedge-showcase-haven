
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

    // Star configuration with purplish-lava glow color
    const stars = [
      { 
        name: 'Bellatrix', 
        x: canvas.width * 0.3, 
        y: canvas.height * 0.3, 
        radius: 2.5, 
        maxRadius: 3.5, 
        pulseSpeed: 0.004, // Slower pulse
        pulseDirection: 1, 
        pulseFactor: 0, 
        hue: 280, // Purplish-lava hue
        displayName: false,
        nameOpacity: 0
      },
      { 
        name: 'Izar', 
        x: canvas.width * 0.7, 
        y: canvas.height * 0.4, 
        radius: 2.2, 
        maxRadius: 3.2, 
        pulseSpeed: 0.003, // Slower pulse
        pulseDirection: 1, 
        pulseFactor: 0.5, 
        hue: 290, // Purplish-lava hue
        displayName: false,
        nameOpacity: 0
      },
      { 
        name: 'Atria', 
        x: canvas.width * 0.5, 
        y: canvas.height * 0.7, 
        radius: 2.8, 
        maxRadius: 3.8, 
        pulseSpeed: 0.0035, // Slower pulse
        pulseDirection: 1, 
        pulseFactor: 0.8, 
        hue: 270, // Purplish-lava hue
        displayName: false,
        nameOpacity: 0
      }
    ];
    
    // Enhanced background lines (cosmic streams)
    const cosmicStreams = [];
    const streamCount = 10; // Fewer, more deliberate streams
    
    for (let i = 0; i < streamCount; i++) {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height;
      
      // Create curved paths using control points
      const controlPoints = [];
      const pointCount = Math.floor(Math.random() * 3) + 2; // 2-4 control points
      
      for (let j = 0; j < pointCount; j++) {
        controlPoints.push({
          x: startX + (Math.random() - 0.5) * 300,
          y: startY + (Math.random() - 0.5) * 300
        });
      }
      
      cosmicStreams.push({
        startX,
        startY,
        controlPoints,
        width: Math.random() * 1.2 + 0.6, // Thinner lines
        length: Math.random() * 200 + 100,
        progress: 0,
        speed: Math.random() * 0.001 + 0.0003, // Slower moving
        opacity: Math.random() * 0.12 + 0.03, // Lower base opacity
        hue: Math.random() * 60 + 240 // Blue to purple range
      });
    }
    
    // Dust particles for atmosphere
    const dustParticles = [];
    const dustCount = 40; // Reduced for cleaner look
    
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 0.6 + 0.1, // Smaller particles
        speedX: (Math.random() - 0.5) * 0.08, // Slower movement
        speedY: (Math.random() - 0.5) * 0.08,
        opacity: 0.02 + Math.random() * 0.08 // Lower opacity
      });
    }
    
    // Draw connection between stars (constellation lines)
    const drawConstellationLines = () => {
      // Draw lines between stars with a very subtle opacity
      ctx.beginPath();
      ctx.moveTo(stars[0].x, stars[0].y);
      ctx.lineTo(stars[1].x, stars[1].y);
      ctx.lineTo(stars[2].x, stars[2].y);
      ctx.lineTo(stars[0].x, stars[0].y);
      
      // Set line style
      const lineOpacity = 0.05; // Very subtle
      ctx.strokeStyle = `rgba(220, 200, 255, ${lineOpacity})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };
    
    // Function to draw the cosmic streams (curved background lines)
    const drawCosmicStreams = () => {
      cosmicStreams.forEach(stream => {
        // Advance the progress of the stream
        stream.progress += stream.speed;
        
        // If the stream has completed, reset it
        if (stream.progress >= 1) {
          stream.progress = 0;
          stream.startX = Math.random() * canvas.width;
          stream.startY = Math.random() * canvas.height;
          
          // Generate new control points
          stream.controlPoints = [];
          const pointCount = Math.floor(Math.random() * 3) + 2;
          
          for (let j = 0; j < pointCount; j++) {
            stream.controlPoints.push({
              x: stream.startX + (Math.random() - 0.5) * 300,
              y: stream.startY + (Math.random() - 0.5) * 300
            });
          }
        }
        
        // Calculate the drawing progress based on easing function
        // Using sine to start slow, go fast in the middle, and end slow
        const drawProgress = Math.sin(stream.progress * Math.PI);
        
        // Calculate color
        const baseColor = `${Math.floor(stream.hue)}, ${Math.floor(70 + stream.hue * 0.2)}, ${Math.floor(140 + stream.hue * 0.4)}`;
        
        // Calculate opacity fade-in and fade-out
        let opacity = stream.opacity;
        if (stream.progress < 0.2) {
          opacity *= (stream.progress / 0.2); // Fade in
        } else if (stream.progress > 0.8) {
          opacity *= ((1 - stream.progress) / 0.2); // Fade out
        }
        
        // Draw the curved path using quadratic curves
        ctx.beginPath();
        ctx.moveTo(stream.startX, stream.startY);
        
        for (let i = 0; i < stream.controlPoints.length - 1; i++) {
          const cp = stream.controlPoints[i];
          const next = stream.controlPoints[i + 1];
          
          // Use quadratic curve between points
          ctx.quadraticCurveTo(
            cp.x, cp.y,
            cp.x + (next.x - cp.x) * drawProgress,
            cp.y + (next.y - cp.y) * drawProgress
          );
        }
        
        ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
        ctx.lineWidth = stream.width;
        ctx.lineCap = 'round';
        ctx.stroke();
      });
    };
    
    // Handle star hover effects
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      stars.forEach(star => {
        // Check if mouse is near the star
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 50) { // 50px hover area
          if (!star.displayName) {
            star.displayName = true;
          }
          // Fade in the name more slowly
          star.nameOpacity = Math.min(star.nameOpacity + 0.03, 1); // Slower fade in
        } else if (star.displayName) {
          // Fade out the name more slowly
          star.nameOpacity -= 0.02; // Slower fade out
          if (star.nameOpacity <= 0) {
            star.displayName = false;
            star.nameOpacity = 0;
          }
        }
      });
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    let frameCount = 0;
    
    const animate = () => {
      frameCount++;
      
      // Clear canvas with high persistence for minimal trailing
      ctx.fillStyle = 'rgba(10, 10, 20, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw the cosmic streams (background curved lines)
      if (frameCount % 3 === 0) { // Reduce frequency for performance
        drawCosmicStreams();
      }
      
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
        
        // Draw star center with purplish-lava glow
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, currentRadius * 5
        );
        
        // Set colors for purplish-lava glow
        const glowIntensity = 0.4 + star.pulseFactor * 0.2;
        
        gradient.addColorStop(0, `rgba(230, 180, 255, ${glowIntensity})`); // Purplish core
        gradient.addColorStop(0.4, `rgba(180, 120, 220, ${glowIntensity * 0.7})`); // Mid purple
        gradient.addColorStop(1, `rgba(120, 80, 180, 0)`); // Outer edge
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius * 5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw star core with purplish-white
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 220, 255, ${0.7 + star.pulseFactor * 0.3})`; // Bright purplish white
        ctx.fill();
        
        // Draw star name if hovering - improved visibility
        if (star.displayName && star.nameOpacity > 0) {
          ctx.font = '16px Arial'; // Slightly larger font
          ctx.textAlign = 'center';
          ctx.fillStyle = `rgba(255, 255, 255, ${star.nameOpacity})`;
          
          // Draw a subtle background for better readability
          const textWidth = ctx.measureText(star.name).width;
          ctx.fillStyle = `rgba(10, 10, 30, ${star.nameOpacity * 0.6})`;
          ctx.fillRect(star.x - textWidth/2 - 5, star.y + 10, textWidth + 10, 22);
          
          // Draw text
          ctx.fillStyle = `rgba(255, 255, 255, ${star.nameOpacity})`;
          ctx.fillText(star.name, star.x, star.y + 25); // Position below the star
        }
      });
      
      // Draw constellation lines every few frames (very subtle)
      if (frameCount % 4 === 0) { // Reduce frequency of redrawing lines
        drawConstellationLines();
      }
      
      // Update and draw dust particles occasionally
      if (frameCount % 2 === 0) {
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
          
          // Set particle color
          ctx.fillStyle = `rgba(180, 160, 220, ${particle.opacity})`;
          ctx.fill();
        });
      }
      
      // Occasional subtle shimmer effect on constellation lines (very rare)
      if (Math.random() < 0.0005) { // 0.05% chance per frame
        const shimmerStart = Math.floor(Math.random() * stars.length);
        const shimmerEnd = (shimmerStart + 1) % stars.length;
        
        const shimmerSteps = 40; // Slower shimmer
        
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
          
          ctx.strokeStyle = `rgba(220, 190, 255, ${shimmerOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          step++;
        }, 80); // Slower animation (80ms per step)
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
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
