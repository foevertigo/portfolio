import { useEffect, useRef } from 'react';

/**
 * A highly optimized canvas-based Faulty Terminal background.
 * Simulates vintage CRT data streams with noise, scanlines, and mouse interaction.
 */
export default function FaultyTerminal({
    scale = 1.5,
    digitSize = 1.2,
    scanlineIntensity = 0.5,
    glitchAmount = 1,
    flickerAmount = 1,
    noiseAmp = 1,
    chromaticAberration = 0,
    dither = 0,
    curvature = 0.1,
    tint = '#A7EF9E',
    mouseReact = true,
    mouseStrength = 0.5,
    brightness = 0.6,
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false });

        let w, h;
        let animId;
        let mouse = { x: -1000, y: -1000, active: false };

        // Characters to draw
        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        const grid = [];

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            const dpr = window.devicePixelRatio || 1;
            const rect = parent.getBoundingClientRect();

            w = rect.width;
            h = rect.height;

            // Ensure canvas is high-res but logical size fits parent
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.scale(dpr, dpr);

            initGrid();
        };

        const cellSize = 16 * scale;
        const fontSize = 14 * scale * digitSize;

        const initGrid = () => {
            grid.length = 0;
            const cols = Math.ceil(w / cellSize);
            const rows = Math.ceil(h / cellSize);
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    grid.push({
                        x: x * cellSize,
                        y: y * cellSize,
                        char: chars[Math.floor(Math.random() * chars.length)],
                        time: Math.random() * 100,
                        rate: 0.5 + Math.random() * glitchAmount,
                        alpha: 0.1 + Math.random() * 0.5 * brightness, // static darkness for some
                    });
                }
            }
        };

        const handleMouseMove = (e) => {
            if (!mouseReact) return;
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        resize();

        let frame = 0;
        const mouseRadius = 150 * mouseStrength;

        const render = () => {
            frame++;

            // Clear with slight trailing effect for motion blur
            ctx.fillStyle = `rgba(0, 0, 0, 0.2)`;
            ctx.fillRect(0, 0, w, h);

            ctx.font = `${fontSize}px var(--font-body)`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Base flicker calculation
            let currentBrightness = brightness;
            if (Math.random() < 0.05 * flickerAmount) {
                currentBrightness += Math.random() * 0.3;
            }

            // Pre-calculate mouse interaction
            for (let i = 0; i < grid.length; i++) {
                const cell = grid[i];
                cell.time += cell.rate;

                // Glitch character change
                if (cell.time > 10) {
                    if (Math.random() < 0.1 * glitchAmount) {
                        cell.char = chars[Math.floor(Math.random() * chars.length)];
                    }
                    cell.time = 0;
                }

                let drawX = cell.x + cellSize / 2;
                let drawY = cell.y + cellSize / 2;
                let drawAlpha = cell.alpha * currentBrightness;
                let isGlitching = false;

                // Mouse interaction displacement
                if (mouse.active) {
                    const dx = drawX - mouse.x;
                    const dy = drawY - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouseRadius) {
                        const force = (1 - dist / mouseRadius);
                        drawX += (Math.random() - 0.5) * 30 * force * glitchAmount;
                        drawY += (Math.random() - 0.5) * 30 * force * glitchAmount;
                        drawAlpha = Math.min(1, drawAlpha + force * 0.8);
                        if (Math.random() < 0.2) cell.char = chars[Math.floor(Math.random() * chars.length)];
                        isGlitching = true;
                    }
                }

                // Global random twitch
                if (Math.random() < 0.002 * glitchAmount) {
                    drawX += (Math.random() - 0.5) * 40;
                    isGlitching = true;
                }

                // Apply tint
                ctx.fillStyle = tint;
                ctx.globalAlpha = Math.max(0, Math.min(1, drawAlpha));

                // Draw character
                if (isGlitching && chromaticAberration > 0) {
                    // Fake chromatic aberration via multiple passes
                    ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
                    ctx.fillText(cell.char, drawX - chromaticAberration * 3, drawY);
                    ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
                    ctx.fillText(cell.char, drawX + chromaticAberration * 3, drawY);
                    ctx.fillStyle = tint; // Reset to tint for center
                }

                ctx.fillText(cell.char, drawX, drawY);
                ctx.globalAlpha = 1.0;
            }

            // TV Scanlines overlay
            if (scanlineIntensity > 0) {
                ctx.fillStyle = `rgba(0, 0, 0, ${scanlineIntensity})`;
                for (let y = 0; y < h; y += 4) {
                    ctx.fillRect(0, y, w, 2);
                }
            }

            // Fast static noise via a single large semi-transparent black-and-transparent pattern
            if (noiseAmp > 0) {
                ctx.fillStyle = `rgba(0,0,0, ${0.05 * noiseAmp})`;
                ctx.fillRect(0, 0, w, h);
            }

            animId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [
        scale, digitSize, scanlineIntensity, glitchAmount, flickerAmount,
        noiseAmp, tint, mouseReact, mouseStrength, brightness, chromaticAberration
    ]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
            <canvas ref={canvasRef} style={{ display: 'block' }} />
        </div>
    );
}
