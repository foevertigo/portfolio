import React, { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
    { label: 'About Me', target: 'about', tab: 'About' },
    { label: 'Skills', target: 'about', tab: 'Skills' },
    { label: 'Projects', target: 'about', tab: 'Projects' },
    { label: 'Certifications', target: 'certifications' },
    { label: 'Contacts', target: 'contacts' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, link) => {
        e.preventDefault();
        const element = document.getElementById(link.target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });

            // If it's a terminal tab, dispatch event
            if (link.tab) {
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('open-terminal-tab', { detail: link.tab }));
                }, 500); // Wait for scroll to settle a bit
            }
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-links">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={`#${link.target}`}
                            onClick={(e) => handleNavClick(e, link)}
                            className="nav-link"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
