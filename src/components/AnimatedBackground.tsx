
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
    
    // Line configuration
    const linesCount = 12; // Fewer lines for less distraction
    const lines: {
      startX: number;
      startY: number;
      controlPoint1X: number;
      controlPoint1Y: number;
      controlPoint2X: number;
      controlPoint2Y: number;
      endX: number;
      endY: number;
      width: number;
      progress: number;
      speed: number;
      color: string;
      maxProgress: number;
      delay: number;
    }[] = [];
    
    // Create the curved lines
    for (let i = 0; i < linesCount; i++) {
      // Random start position on the edges of the screen
      const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let startX, startY;
      
      switch (edge) {
        case 0: // top
          startX = Math.random() * canvas.width;
          startY = 0;
          break;
        case 1: // right
          startX = canvas.width;
          startY = Math.random() * canvas.height;
          break;
        case 2: // bottom
          startX = Math.random() * canvas.width;
          startY = canvas.height;
          break;
        default: // left
          startX = 0;
          startY = Math.random() * canvas.height;
          break;
      }
      
      // Generate random end point (opposite edge preferred)
      let endX, endY;
      const oppositeEdge = (edge + 2) % 4;
      
      switch (oppositeEdge) {
        case 0: // top
          endX = Math.random() * canvas.width;
          endY = 0;
          break;
        case 1: // right
          endX = canvas.width;
          endY = Math.random() * canvas.height;
          break;
        case 2: // bottom
          endX = Math.random() * canvas.width;
          endY = canvas.height;
          break;
        default: // left
          endX = 0;
          endY = Math.random() * canvas.height;
          break;
      }
      
      // Generate control points for the bezier curve
      // These determine the curvature of the lines
      const controlPoint1X = startX + (Math.random() - 0.5) * canvas.width * 0.8;
      const controlPoint1Y = startY + (Math.random() - 0.5) * canvas.height * 0.8;
      const controlPoint2X = endX + (Math.random() - 0.5) * canvas.width * 0.8;
      const controlPoint2Y = endY + (Math.random() - 0.5) * canvas.height * 0.8;
      
      // Set line properties
      const lineColor = theme === 'dark' 
        ? `rgba(200, 200, 220, ${0.05 + Math.random() * 0.1})` // Light gray for dark mode
        : `rgba(70, 70, 90, ${0.05 + Math.random() * 0.1})`; // Dark gray for light mode
      
      lines.push({
        startX,
        startY,
        controlPoint1X,
        controlPoint1Y,
        controlPoint2X,
        controlPoint2Y,
        endX,
        endY,
        width: 10 + Math.random() * 20, // Super thick lines (10-30px)
        progress: 0,
        speed: 0.0015 + Math.random() * 0.0015, // Slower for more subtle movement
        color: lineColor,
        maxProgress: 0.8 + Math.random() * 0.2, // Max progress for line drawing
        delay: Math.random() * 5000, // Random delay for staggered animation
      });
    }
    
    let animationStartTime = Date.now();
    let animationFrameId: number;
    
    const animate = () => {
      const currentTime = Date.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw curved lines
      lines.forEach(line => {
        // Apply delay to each line
        if (currentTime - animationStartTime < line.delay) {
          return;
        }
        
        // Update line drawing progress
        line.progress += line.speed;
        
        // Reset line when it reaches maximum progress
        if (line.progress >= line.maxProgress) {
          line.progress = 0;
          
          // Generate new line
          const edge = Math.floor(Math.random() * 4);
          switch (edge) {
            case 0: // top
              line.startX = Math.random() * canvas.width;
              line.startY = 0;
              break;
            case 1: // right
              line.startX = canvas.width;
              line.startY = Math.random() * canvas.height;
              break;
            case 2: // bottom
              line.startX = Math.random() * canvas.width;
              line.startY = canvas.height;
              break;
            default: // left
              line.startX = 0;
              line.startY = Math.random() * canvas.height;
              break;
          }
          
          // Generate new end point
          const oppositeEdge = (edge + 2) % 4;
          switch (oppositeEdge) {
            case 0: // top
              line.endX = Math.random() * canvas.width;
              line.endY = 0;
              break;
            case 1: // right
              line.endX = canvas.width;
              line.endY = Math.random() * canvas.height;
              break;
            case 2: // bottom
              line.endX = Math.random() * canvas.width;
              line.endY = canvas.height;
              break;
            default: // left
              line.endX = 0;
              line.endY = Math.random() * canvas.height;
              break;
          }
          
          // New control points
          line.controlPoint1X = line.startX + (Math.random() - 0.5) * canvas.width * 0.8;
          line.controlPoint1Y = line.startY + (Math.random() - 0.5) * canvas.height * 0.8;
          line.controlPoint2X = line.endX + (Math.random() - 0.5) * canvas.width * 0.8;
          line.controlPoint2Y = line.endY + (Math.random() - 0.5) * canvas.height * 0.8;
          
          // New thickness and speed
          line.width = 10 + Math.random() * 20;
          line.speed = 0.0015 + Math.random() * 0.0015;
          line.delay = currentTime - animationStartTime + Math.random() * 3000;
          
          // New color
          line.color = theme === 'dark' 
            ? `rgba(200, 200, 220, ${0.05 + Math.random() * 0.1})` 
            : `rgba(70, 70, 90, ${0.05 + Math.random() * 0.1})`;
        }
        
        // Draw curve with current progress
        ctx.beginPath();
        
        // Calculate points along the bezier curve for the current progress
        const t = line.progress;
        let currentX, currentY;
        
        // Get coordinates of the point at the current progress along the bezier curve
        const bezierPoint = (t: number, p0: number, p1: number, p2: number, p3: number) => {
          const cX = 3 * (p1 - p0);
          const bX = 3 * (p2 - p1) - cX;
          const aX = p3 - p0 - cX - bX;
          return aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0;
        };
        
        currentX = bezierPoint(t, line.startX, line.controlPoint1X, line.controlPoint2X, line.endX);
        currentY = bezierPoint(t, line.startY, line.controlPoint1Y, line.controlPoint2Y, line.endY);
        
        // Draw the line segment
        ctx.moveTo(line.startX, line.startY);
        ctx.bezierCurveTo(
          line.controlPoint1X, 
          line.controlPoint1Y, 
          line.controlPoint2X, 
          line.controlPoint2Y, 
          currentX, 
          currentY
        );
        
        // Apply line styles
        ctx.lineWidth = line.width;
        ctx.strokeStyle = line.color;
        ctx.lineCap = 'round';
        
        // Adjust global opacity for a fade-in and fade-out effect
        let opacity = 1;
        if (t < 0.2) { // Fade in
          opacity = t / 0.2;
        } else if (t > 0.6) { // Fade out
          opacity = 1 - ((t - 0.6) / 0.4);
        }
        ctx.globalAlpha = opacity;
        
        ctx.stroke();
        ctx.globalAlpha = 1; // Reset global alpha
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
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
