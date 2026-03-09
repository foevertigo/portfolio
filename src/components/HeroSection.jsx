import './HeroSection.css';
import Shuffle from './Shuffle';
import Typewriter from './Typewriter';
import terminalData from '../data/terminalData';

export default function HeroSection() {
    return (
        <section className="hero-section" id="home">
            <div className="hero-content">
                <Shuffle
                    text="Aleena's Portfolio"
                    shuffleDirection="right"
                    duration={0.6}
                    animationMode="evenodd"
                    shuffleTimes={2}
                    ease="power3.out"
                    stagger={0.05}
                    threshold={0.1}
                    triggerOnce={true}
                    triggerOnHover
                    respectReducedMotion={true}
                    loop={false}
                />
                <div className="hero-tagline">
                    <Typewriter
                        text={terminalData.taglines[0]}
                        speed={70}
                        delay={1000}
                    />
                </div>
            </div>

            <div className="scroll-indicator">
                <span>Scroll to Explore</span>
                <div className="scroll-line" />
            </div>
        </section>
    );
}
