import React, { useEffect, useRef } from 'react';

const Backdrop = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    window.addEventListener('resize', setCanvasSize);

    // Line particles
    const particles = [];
    const particleCount = 100;

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.speed = 0.1 + Math.random() * 2;
        this.radius = 0.5 + Math.random() * 1;
        this.opacity = 0.1 + Math.random() * 0.4;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }

      update() {
        this.y -= this.speed;
        
        // Create trailing effect
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 10);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.02})`;
        ctx.stroke();

        // Reset particle when it goes off screen
        if (this.y < -10) {
          this.reset();
        }

        // Connect nearby particles
        particles.forEach(particle => {
          const dx = this.x - particle.x;
          const dy = this.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.strokeStyle = `rgba(139, 212, 80, ${(1 - distance / 100) * 0.2})`;
            ctx.stroke();
          }
        });
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.draw();
        particle.update();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

return (
  <canvas
    ref={canvasRef}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -5,
    }}
  />
);
};

export default Backdrop;