import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Interactive from './components/Interactive';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import GridOverlay from './components/GridOverlay';
import IntroScreen from './components/IntroScreen';
import './index.css';

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for scroll progress and parallax movements
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Soft subtle parallax effect for background glows
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '40%']);

  // Inertial smooth scroll damping via Lenis:
  // - duration: 1.5s adds weighted cinematic inertia
  // - wheelMultiplier: 0.7 prevents the user from blitzing through sections too quickly
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.2,
      infinite: false,
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <div className="app">
      {/* Intro Screen Overlay */}
      <AnimatePresence>
        {!introFinished && (
          <IntroScreen onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      <GridOverlay />
      <Navigation showNav={introFinished} />
      
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
          scaleX: smoothProgress,
          zIndex: 9999,
        }}
      />

      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Interactive />
        <Contact />
      </motion.main>

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
