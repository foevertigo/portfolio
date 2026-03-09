import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import certificates from '../data/certificateData';
import './CertificateCarousel.css';

const CARD_COUNT = certificates.length;
// Fan: cards radiate from bottom-center like pages of an open book
const TOTAL_SPREAD = 180; // wider spread
const ANGLE_STEP = TOTAL_SPREAD / (CARD_COUNT - 1);
const START_ANGLE = -TOTAL_SPREAD / 2;
export default function CertificateCarousel() {
    const [sway, setSway] = useState(0);
    const [expanded, setExpanded] = useState(null);
    const [imgErrors, setImgErrors] = useState({});

    const rafRef = useRef(null);
    const swayRef = useRef(0);
    const speedRef = useRef(0);

    // Hover-controlled rotation animation
    const animate = useCallback(() => {
        if (expanded === null && speedRef.current !== 0) {
            swayRef.current += speedRef.current;

            // Limit the total possible sway to outer cards bounds
            const limit = (CARD_COUNT / 2) * 16;
            swayRef.current = Math.max(-limit, Math.min(limit, swayRef.current));

            setSway(swayRef.current);
        }
        rafRef.current = requestAnimationFrame(animate);
    }, [expanded]);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [animate]);

    // Escape key
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') setExpanded(null);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const handleImgError = (id) => {
        setImgErrors((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <section className="carousel-section" id="certifications">
            <h2>Certifications</h2>

            <div
                className="carousel-viewport"
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const center = rect.width / 2;
                    const offset = (e.clientX - rect.left - center) / center; // -1 to 1
                    // Deadzone in the center so it stays still without perfectly pinpointing
                    if (Math.abs(offset) < 0.15) {
                        speedRef.current = 0;
                    } else {
                        // speed multiplier controls how fast it spins
                        speedRef.current = offset * 1.5;
                    }
                }}
                onMouseLeave={() => {
                    speedRef.current = 0;
                }}
            >
                <div
                    className="carousel-ring"
                    style={{ transform: `rotateY(${sway}deg)` }}
                >
                    {certificates.map((cert, i) => {
                        // Horizontal arc layout (coverflow style)
                        // Cards are spread horizontally and pushed back/rotated towards center
                        const centerOffset = i - (CARD_COUNT - 1) / 2;
                        const translateX = centerOffset * 220; // 220px horizontal spread
                        const translateZ = -Math.abs(centerOffset) * 100 + 20; // push outer cards back
                        const rotateY = centerOffset * -15; // angle towards user

                        return (
                            <div
                                key={cert.id}
                                className="carousel-card"
                                style={{
                                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                                    zIndex: CARD_COUNT - Math.abs(centerOffset),
                                }}
                                onClick={() => setExpanded(cert)}
                            >
                                {imgErrors[cert.id] ? (
                                    <div className="card-placeholder">
                                        <span>{cert.title}</span>
                                    </div>
                                ) : (
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        onError={() => handleImgError(cert.id)}
                                        loading="lazy"
                                    />
                                )}
                                <div className="card-info">
                                    <div className="card-title">{cert.title}</div>
                                    <div className="card-issuer">{cert.issuer}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="carousel-hint">hover left/right to rotate speed / click to expand</div>

            {/* Expanded overlay */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        className="carousel-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setExpanded(null);
                        }}
                    >
                        <motion.div
                            className="expanded-card"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {imgErrors[expanded.id] ? (
                                <div className="card-placeholder" style={{ height: 400 }}>
                                    <span>{expanded.title}</span>
                                </div>
                            ) : (
                                <img src={expanded.image} alt={expanded.title} />
                            )}
                            <div className="expanded-info">
                                <div>
                                    <div className="expanded-title">{expanded.title}</div>
                                    <div className="expanded-issuer">{expanded.issuer}</div>
                                    {expanded.verifyUrl && (
                                        <a
                                            href={expanded.verifyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="verify-link"
                                        >
                                            verify certificate
                                        </a>
                                    )}
                                </div>
                                <button
                                    className="close-btn"
                                    onClick={() => setExpanded(null)}
                                >
                                    esc
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
