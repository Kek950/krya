import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Interactive from './components/Interactive';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import GridOverlay from './components/GridOverlay';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="app">
      <GridOverlay />
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      {/* Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
          transformOrigin: '0%',
          scaleX: scrollYProgress,
          zIndex: 9999,
        }}
      />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Interactive />
        <Contact />
      </main>

      {/* Floating Background Elements */}
      <motion.div
        style={{
          position: 'fixed',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: -1,
          y: backgroundY,
        }}
      />
      
      <motion.div
        style={{
          position: 'fixed',
          bottom: '20%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: -1,
          y: backgroundY,
        }}
      />
    </div>
  );
}

export default App;
