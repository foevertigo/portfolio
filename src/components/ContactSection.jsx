import React from 'react';
import terminalData from '../data/terminalData';
import './ContactSection.css';

export default function ContactSection() {
    return (
        <section className="contact-section-global" id="contacts">
            <h2 className="contact-global-title">Let's Connect</h2>
            <div className="contact-global-links">
                {terminalData.contacts.map((c) => (
                    <a
                        key={c.label}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="generic-btn"
                    >
                        {c.label}
                    </a>
                ))}
            </div>
            <div className="resume-download-wrapper">
                <a
                    href="/resume/AleenaResume.pdf"
                    download="Aleena_Burney_Resume.pdf"
                    className="generic-btn primary-btn"
                >
                    Download Resume
                </a>
            </div>
        </section>
    );
}
