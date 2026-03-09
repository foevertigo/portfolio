import { useState, useEffect, useCallback } from 'react';
import terminalData from '../data/terminalData';
import './Terminal.css';
import Typewriter from './Typewriter';

const SECTIONS = ['Skills', 'Projects'];

export default function Terminal() {
    const [activeIdx, setActiveIdx] = useState(-1);
    const [openSection, setOpenSection] = useState(null);

    // Keyboard navigation
    const handleKey = useCallback(
        (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIdx((prev) => prev === -1 ? 0 : (prev + 1) % SECTIONS.length);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIdx((prev) => prev === -1 ? SECTIONS.length - 1 : (prev - 1 + SECTIONS.length) % SECTIONS.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeIdx >= 0) setOpenSection(SECTIONS[activeIdx]);
            } else if (e.key === 'q' || e.key === 'Q') {
                setOpenSection(null);
            }
        },
        [activeIdx]
    );

    useEffect(() => {
        const handleExternalTab = (e) => {
            const tab = e.detail;
            if (SECTIONS.includes(tab)) {
                const idx = SECTIONS.indexOf(tab);
                setActiveIdx(idx);
                setOpenSection(tab);
            } else if (tab === 'About') {
                setOpenSection(null);
                setActiveIdx(-1);
            }
        };
        window.addEventListener('open-terminal-tab', handleExternalTab);

        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
            window.removeEventListener('open-terminal-tab', handleExternalTab);
        };
    }, [handleKey]);

    return (
        <section className="terminal-section" id="about">
            <div className="terminal-window">
                {/* Title bar */}
                <div className="terminal-titlebar">
                    <span className="terminal-dot" />
                    <span className="terminal-dot" />
                    <span className="terminal-dot" />
                    <span className="terminal-title">portfolio</span>
                </div>

                {/* Body */}
                <div className="terminal-body">
                    {/* Content: name + intro */}
                    <div className="terminal-content">
                        <div className="terminal-name-container">
                            <div className="sparkle-cluster left-cluster">
                                <span className="ascii-sparkle s1">⟡</span>
                                <span className="ascii-sparkle s2">⊹</span>
                                <span className="ascii-sparkle s3">₊</span>
                            </div>

                            <pre className="ascii-name-block">
                                {`    ___    __                         ____                             
   /   |  / /__  ___  ____  ____ _   / __ )__  ___________  ___  __  __
  / /| | / / _ \\/ _ \\/ __ \\/ __ \`/  / __  / / / / ___/ __ \\/ _ \\/ / / /
 / ___ |/ /  __/  __/ / / / /_/ /  / /_/ / /_/ / /  / / / /  __/ /_/ / 
/_/  |_/_/\\___/\\___/_/ /_/\\__,_/  /_____/\\__,_/_/  /_/ /_/\\___/\\__, /  
                                                              /____/   `}
                            </pre>

                            <div className="sparkle-cluster right-cluster">
                                <span className="ascii-sparkle s4">₊</span>
                                <span className="ascii-sparkle s5">⊹</span>
                                <span className="ascii-sparkle s6">⟡</span>
                            </div>
                        </div>

                        <div className="terminal-intro">
                            {terminalData.about.map((p, i) => (
                                <p key={i}>
                                    <Typewriter
                                        text={p}
                                        speed={30}
                                        delay={i * 2000 + 500}
                                        cursor={i === terminalData.about.length - 1}
                                    />
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="terminal-nav">
                    <div className="nav-items">
                        {SECTIONS.map((sec, i) => (
                            <button
                                key={sec}
                                className={`nav-item${i === activeIdx ? ' active' : ''}${openSection === sec ? ' selected' : ''
                                    }`}
                                onClick={() => {
                                    setActiveIdx(i);
                                    setOpenSection(sec);
                                }}
                            >
                                {sec}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Section content */}
                {openSection && (
                    <div className="terminal-content" key={openSection}>
                        <SectionContent section={openSection} />
                    </div>
                )}
            </div>
        </section>
    );
}

/* ── Section renderers ────────────────────── */

function SectionContent({ section }) {
    switch (section) {
        case 'Skills':
            return <SkillsSection />;
        case 'Projects':
            return <ProjectsSection />;
        default:
            return null;
    }
}

function SkillsSection() {
    const categories = Object.entries(terminalData.skills);
    return (
        <div>
            <div className="section-header">Skills</div>
            <div className="skills-grid">
                {categories.map(([cat, tools]) => (
                    <div key={cat} className="skill-category">
                        <h4>{cat}</h4>
                        <div className="skill-tags">
                            {tools.map((tool) => (
                                <span key={tool} className="skill-tag">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProjectsSection() {
    return (
        <div>
            <div className="section-header">Projects</div>
            {terminalData.projects.map((proj) => (
                <div key={proj.name} className="project-card">
                    <h3>{proj.name}</h3>
                    {proj.image && (
                        <div className="project-image-container">
                            <img src={proj.image} alt={proj.name} className="project-image" />
                        </div>
                    )}
                    <p>{proj.description}</p>
                    {proj.tools && (
                        <div className="project-tools">
                            <strong>Tools Used:</strong> {proj.tools.join(', ')}
                        </div>
                    )}
                    <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                    >
                        {proj.github}
                    </a>
                </div>
            ))}
        </div>
    );
}


