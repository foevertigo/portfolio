import React, { useState, useEffect } from 'react';
import './Typewriter.css';

const Typewriter = ({
    text,
    speed = 50,
    delay = 0,
    className = '',
    onComplete,
    cursor = true
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        if (displayedText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, speed);
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [displayedText, text, speed, started, onComplete]);

    return (
        <span className={`typewriter ${className}`}>
            {displayedText}
            {cursor && <span className="typewriter-cursor">|</span>}
        </span>
    );
};

export default Typewriter;
