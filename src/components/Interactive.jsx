import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Interactive = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [clickCount, setClickCount] = useState(0);
    const [easterEggActive, setEasterEggActive] = useState(false);
    const [keySequence, setKeySequence] = useState('');

    const codeLines = [
        'const developer = {',
        '  name: "kekich",',
        '  handle: "kryakich (@azzmattt)",',
        '  stack: ["React", "TypeScript", "Next.js", "Vite", "SCSS", "C"],',
        '  status: "Shipping clean code & low-level wonders",',
        '  secretClue: "Try clicking the Duck 5 times or type \\"duck\\"",',
        '};',
    ];

    const interactiveBoxes = [
        { id: 1, color: 'var(--accent-primary)', label: 'Hover Me' },
        { id: 2, color: 'var(--accent-secondary)', label: 'Click Me' },
        { id: 3, color: '#00ff88', label: 'Drag Me' },
        { id: 4, color: '#ffb703', label: '🦆 КРЯ (Quack)' },
    ];

    // Global Key Listener for "duck" or `~`
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '`' || e.key === '~') {
                setEasterEggActive((prev) => !prev);
                return;
            }

            const updated = (keySequence + e.key.toLowerCase()).slice(-4);
            setKeySequence(updated);
            if (updated === 'duck' || updated === 'krya') {
                setEasterEggActive(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [keySequence]);

    return (
        <section id="interactive" className="section" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Interactive Playground
                </motion.h2>

                <motion.p
                    style={{
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '3rem',
                    }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}
                >
                    Explore the interactive elements below - hover, click, and drag!
                </motion.p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {/* Code Animation */}
                    <motion.div
                        className="card"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        style={{ padding: '2rem' }}
                    >
                        <h3
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--accent-primary)',
                                marginBottom: '1.5rem',
                            }}
                        >
                            {'> Live Code'}
                        </h3>
                        <div
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.9rem',
                                lineHeight: '1.8',
                            }}
                        >
                            {codeLines.map((line, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    style={{
                                        color: line.includes(':') ? 'var(--text-secondary)' : 'var(--accent-primary)',
                                    }}
                                >
                                    {line}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Interactive Boxes */}
                    <motion.div
                        className="card"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        style={{ padding: '2rem' }}
                    >
                        <h3
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--accent-primary)',
                                marginBottom: '1.5rem',
                            }}
                        >
                            {'> Interactive Elements'}
                        </h3>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem',
                            }}
                        >
                            {interactiveBoxes.map((box, index) => (
                                <motion.div
                                    key={box.id}
                                    drag
                                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                    dragElastic={0.7}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 5,
                                        boxShadow: `0 0 25px ${box.color}40`,
                                    }}
                                    whileTap={{ scale: 0.9, rotate: -5 }}
                                    onHoverStart={() => setHoveredIndex(index)}
                                    onHoverEnd={() => setHoveredIndex(null)}
                                    onClick={() => {
                                        setClickCount((prev) => prev + 1);
                                        if (box.id === 4 || clickCount + 1 >= 5) {
                                            setEasterEggActive(true);
                                        }
                                    }}
                                    style={{
                                        background: 'var(--bg-tertiary)',
                                        border: `2px solid ${hoveredIndex === index ? box.color : 'var(--border-color)'}`,
                                        padding: '2rem 1rem',
                                        textAlign: 'center',
                                        cursor: 'grab',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.85rem',
                                        color: hoveredIndex === index ? box.color : 'var(--text-secondary)',
                                        transition: 'all 0.3s ease',
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                >
                                    {box.label}
                                </motion.div>
                            ))}
                        </div>
                        <motion.p
                            style={{
                                marginTop: '1.5rem',
                                textAlign: 'center',
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--accent-secondary)',
                                fontSize: '0.9rem',
                            }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Interactions: {clickCount} {clickCount >= 3 && '🦆 (duck almost summoned)'}
                        </motion.p>
                    </motion.div>
                </div>

                {/* Particle Effect */}
                <motion.div
                    style={{
                        marginTop: '4rem',
                        height: '300px',
                        position: 'relative',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: 'var(--bg-primary)',
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                        }}
                    >
                        <motion.h3
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '2rem',
                                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        >
                            Hover Over This Area
                        </motion.h3>
                    </div>

                    {/* Animated Particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            style={{
                                position: 'absolute',
                                width: '4px',
                                height: '4px',
                                background: i % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)',
                                borderRadius: '50%',
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, Math.random() * 40 - 20, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </motion.div>

                {/* Stats Counter */}
                <motion.div
                    style={{
                        marginTop: '3rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
                    }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 }}
                >
                    {[
                        { label: 'Projects Completed', value: 50 },
                        { label: 'Lines of Code', value: 100000 },
                        { label: 'Coffee Cups', value: 999 },
                        { label: 'Kernel Bugs Fixed', value: 47 },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="card"
                            style={{ textAlign: 'center', padding: '2rem' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.h4
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '3rem',
                                    color: 'var(--accent-primary)',
                                    marginBottom: '0.5rem',
                                }}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 1.2 + index * 0.1 }}
                            >
                                {stat.value.toLocaleString()}+
                            </motion.h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Easter Egg Meme Modal */}
                <AnimatePresence>
                    {easterEggActive && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEasterEggActive(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0, 0, 0, 0.85)',
                                backdropFilter: 'blur(10px)',
                                zIndex: 10000,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1rem',
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.5, rotate: -15, y: 50 }}
                                animate={{ scale: 1, rotate: 0, y: 0 }}
                                exit={{ scale: 0.5, rotate: 15, y: 50 }}
                                transition={{ type: 'spring', damping: 15 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    background: 'var(--bg-secondary)',
                                    border: '2px solid var(--accent-primary)',
                                    borderRadius: '16px',
                                    padding: '2.5rem',
                                    maxWidth: '520px',
                                    width: '100%',
                                    textAlign: 'center',
                                    boxShadow: '0 0 50px rgba(0, 240, 255, 0.4)',
                                    position: 'relative',
                                }}
                            >
                                <motion.div
                                    animate={{
                                        rotate: [0, -10, 10, -10, 0],
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{ fontSize: '5rem', marginBottom: '1rem', cursor: 'pointer' }}
                                >
                                    🦆
                                </motion.div>

                                <h3
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--accent-primary)',
                                        fontSize: '1.8rem',
                                        marginBottom: '0.8rem',
                                    }}
                                >
                                    КРЯ! YOU FOUND THE SECRET!
                                </h3>

                                <p
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--accent-secondary)',
                                        fontSize: '1rem',
                                        marginBottom: '1.2rem',
                                    }}
                                >
                                    "Peace was never an option." — Untitled Goose / Duck Game
                                </p>

                                <p
                                    style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.6',
                                        marginBottom: '2rem',
                                    }}
                                >
                                    Congratulations! You discovered kekich's rubber duck debugging terminal. Legend says that explaining your x86 Protected Mode faults and Slick slider breakpoints to this duck instantly resolves all segmentation faults.
                                </p>

                                <motion.button
                                    onClick={() => setEasterEggActive(false)}
                                    className="btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        padding: '0.75rem 2rem',
                                    }}
                                >
                                    КРЯ-КРЯ (Close Protocol)
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Interactive;
