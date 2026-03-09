import CertificateCarousel from './components/CertificateCarousel';
import Terminal from './components/Terminal';
import FaultyTerminal from './components/FaultyTerminal';
import HeroSection from './components/HeroSection';
import ContactSection from './components/ContactSection';
import Navbar from './components/Navbar';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      {/* Global FaultyTerminal Background */}
      <div className="global-bg">
        <FaultyTerminal
          scale={1.5}
          digitSize={1.2}
          scanlineIntensity={0.5}
          glitchAmount={1.5}
          flickerAmount={1.5}
          noiseAmp={1}
          chromaticAberration={0.8}
          dither={0}
          curvature={0.1}
          tint="#A7EF9E"
          mouseReact={true}
          mouseStrength={0.6}
          brightness={0.8}
        />
      </div>

      <div className="app-content">
        <Navbar />
        {/* 100vh Hero Section */}
        <HeroSection />

        {/* Terminal Interface */}
        <Terminal />

        <div className="section-divider" />

        {/* Certificate Carousel */}
        <CertificateCarousel />

        <div className="section-divider" />

        {/* Global Contact Section */}
        <ContactSection />

        {/* Footer */}
        <footer className="site-footer">
          2026 Aleena Burney
        </footer>
      </div>
    </div>
  );
}
