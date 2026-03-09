import { useEffect, useRef } from 'react';

/**
 * Subtle floating geometric shapes rendered on a canvas behind all content.
 * Adds depth without being distracting — thin wireframe shapes that drift slowly.
 */
export default function BackgroundGrid() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;

        const particles = [];
        const PARTICLE_COUNT = 30;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 3; // cover scrollable area
        }
        resize();
        window.addEventListener('resize', resize);

        // Initialize particles — small geometric shapes
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 4 + Math.random() * 16,
                speedX: (Math.random() - 0.5) * 0.15,
                speedY: (Math.random() - 0.5) * 0.1,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.003,
                opacity: 0.03 + Math.random() * 0.04,
                shape: Math.floor(Math.random() * 3), // 0=triangle, 1=square, 2=diamond
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.rotation += p.rotSpeed;

                // Wrap around
                if (p.x < -30) p.x = canvas.width + 30;
                if (p.x > canvas.width + 30) p.x = -30;
                if (p.y < -30) p.y = canvas.height + 30;
                if (p.y > canvas.height + 30) p.y = -30;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.lineWidth = 0.5;

                ctx.beginPath();
                if (p.shape === 0) {
                    // Triangle
                    ctx.moveTo(0, -p.size);
                    ctx.lineTo(p.size * 0.866, p.size * 0.5);
                    ctx.lineTo(-p.size * 0.866, p.size * 0.5);
                    ctx.closePath();
                } else if (p.shape === 1) {
                    // Square
                    const h = p.size * 0.7;
                    ctx.rect(-h, -h, h * 2, h * 2);
                } else {
                    // Diamond
                    ctx.moveTo(0, -p.size);
                    ctx.lineTo(p.size * 0.6, 0);
                    ctx.lineTo(0, p.size);
                    ctx.lineTo(-p.size * 0.6, 0);
                    ctx.closePath();
                }
                ctx.stroke();
                ctx.restore();
            });

            // A few thin horizontal lines
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
            ctx.lineWidth = 0.5;
            for (let y = 200; y < canvas.height; y += 340) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            animId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
}
