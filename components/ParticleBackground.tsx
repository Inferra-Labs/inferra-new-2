import React, { useRef, useEffect } from 'react';
// FIX: Corrected import path.
import { Theme } from '../App';

interface ParticleBackgroundProps {
    theme: Theme;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ theme }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // FIX: Changed useRef to be initialized with null and have a compatible type.
    const animationFrameIdRef = useRef<number | null>(null);

    // Parallax scroll effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            canvas.style.transform = `translateY(${scrollY * 0.5}px)`; // Slower scroll speed (0.5 means half the speed)
        };
        
        handleScroll(); // Apply transform on initial load

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Particle animation logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            // Make canvas taller than the viewport to avoid empty space when scrolling with parallax
            canvas.height = window.innerHeight * 1.5;
        };
        resizeCanvas();

        const mouse = {
            x: -200,
            y: -200,
            radius: 120
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            // Adjust mouse Y-coordinate to account for the canvas's parallax translation
            mouse.y = event.clientY + (window.scrollY * 0.5);
        };
        
        const colors = {
            particle: theme === 'light' ? '#052659' : '#7DA0CA',
            line: theme === 'light' ? 'rgba(5, 38, 89, OPACITY)' : 'rgba(125, 160, 202, OPACITY)',
            mouseLine: theme === 'light' ? 'rgba(84, 131, 179, OPACITY)' : 'rgba(193, 232, 255, OPACITY)'
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            baseSpeed: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.baseSpeed = 0.2;
                this.speedX = (Math.random() - 0.5) * this.baseSpeed;
                this.speedY = (Math.random() - 0.5) * this.baseSpeed;
                this.color = colors.particle;
            }

            update(particles: Particle[]) {
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
                
                const dxMouse = this.x - mouse.x;
                const dyMouse = this.y - mouse.y;
                const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distanceMouse < mouse.radius) {
                    const forceDirectionX = dxMouse / distanceMouse;
                    const forceDirectionY = dyMouse / distanceMouse;
                    const force = (mouse.radius - distanceMouse) / mouse.radius;
                    const directionX = forceDirectionX * force * 0.5;
                    const directionY = forceDirectionY * force * 0.5;
                    this.x += directionX;
                    this.y += directionY;
                }

                particles.forEach(other => {
                    if (this === other) return;
                    const dx = other.x - this.x;
                    const dy = other.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        const force = -0.025; 
                        this.speedX += (dx / distance) * force;
                        this.speedY += (dy / distance) * force;
                    } 
                    else if (distance < 250) {
                        const force = 0.0005;
                        this.speedX += (dx / distance) * force;
                        this.speedY += (dy / distance) * force;
                    }
                });

                this.speedX *= 0.99;
                this.speedY *= 0.99;
                const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
                if (speed > this.baseSpeed) {
                    this.speedX = (this.speedX / speed) * this.baseSpeed;
                    this.speedY = (this.speedY / speed) * this.baseSpeed;
                }

                this.x += this.speedX;
                this.y += this.speedY;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        let particlesArray: Particle[] = [];
        
        const init = () => {
            particlesArray = [];
            const particleDensity = canvas.width < 768 ? 80 : 40;
            const numberOfParticles = Math.floor(canvas.width / particleDensity);
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        };
        
        const connect = () => {
            if (!ctx) return;
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = Math.sqrt(
                        Math.pow(particlesArray[a].x - particlesArray[b].x, 2) +
                        Math.pow(particlesArray[a].y - particlesArray[b].y, 2)
                    );
                    if (distance < 160) {
                        opacityValue = 1 - (distance / 160);
                        ctx.strokeStyle = colors.line.replace('OPACITY', opacityValue.toString());
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
            for (let i = 0; i < particlesArray.length; i++) {
                let distance = Math.sqrt(
                    Math.pow(particlesArray[i].x - mouse.x, 2) +
                    Math.pow(particlesArray[i].y - mouse.y, 2)
                );
                 if (distance < 280) {
                     opacityValue = 1 - (distance / 280);
                     ctx.strokeStyle = colors.mouseLine.replace('OPACITY', (opacityValue * 0.5).toString());
                     ctx.lineWidth = 1;
                     ctx.beginPath();
                     ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                     ctx.lineTo(mouse.x, mouse.y);
                     ctx.stroke();
                 }
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => {
                p.update(particlesArray);
                p.draw();
            });
            connect();
            animationFrameIdRef.current = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            resizeCanvas();
            init();
        };

        init();
        animate();
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            if(animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [theme]);

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed top-0 left-0 w-full z-0"
            style={{ height: '150vh' }} // Taller canvas for parallax
        />
    );
};

export default ParticleBackground;
