import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
    const [text, setText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const phrases = [
        'FRONT-END DEVELOPER',
        'REACT & TYPESCRIPT SPECIALIST',
        'NEXT.JS & UI ARCHITECT',
        'LOW-LEVEL SYSTEMS ENTHUSIAST',
    ];

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        let timer;

        if (!isDeleting) {
            // Typing characters
            if (text.length < currentPhrase.length) {
                timer = setTimeout(() => {
                    setText(currentPhrase.slice(0, text.length + 1));
                }, 90);
            } else {
                // Pause at complete word before starting to delete
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, 1800);
            }
        } else {
            // Deleting characters
            if (text.length > 0) {
                timer = setTimeout(() => {
                    setText(currentPhrase.slice(0, text.length - 1));
                }, 45);
            } else {
                // Done deleting: pause briefly, switch to next phrase, start typing
                timer = setTimeout(() => {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }, 350);
            }
        }

        return () => clearTimeout(timer);
    }, [text, isDeleting, phraseIndex]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section id="hero" className="section" style={{ minHeight: '100vh' }}>
            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ textAlign: 'center' }}
                >
                    <motion.div variants={itemVariants}>
                        <motion.p
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--accent-primary)',
                                fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                                marginBottom: '0.8rem',
                                letterSpacing: '0.2em',
                            }}
                        >
                            {'> HELLO, WORLD. I AM'}
                        </motion.p>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        style={{
                            marginBottom: '0.5rem',
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        AZAMAT BAYADILOV
                    </motion.h1>

                    <motion.div
                        variants={itemVariants}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.7rem)',
                            color: 'var(--text-primary)',
                            marginBottom: '1.5rem',
                            fontWeight: 600,
                            minHeight: '2.4rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span>{text}</span>
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                            style={{ color: 'var(--accent-primary)', marginLeft: '2px' }}
                        >
                            _
                        </motion.span>
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                            color: 'var(--text-secondary)',
                            marginBottom: '3rem',
                            maxWidth: '750px',
                            margin: '0 auto 3rem',
                            lineHeight: '1.7',
                        }}
                    >
                        Crafting high-performance modern web apps, reactive interfaces, and robust systems architecture with clean code and meticulous precision.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        <motion.a
                            href="#projects"
                            className="btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Projects
                        </motion.a>
                        <motion.a
                            href="#contact"
                            className="btn btn-secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get In Touch
                        </motion.a>
                    </motion.div>

                    {/* Animated Code Brackets */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: '20%',
                            left: '10%',
                            fontSize: '8rem',
                            color: 'var(--accent-primary)',
                            opacity: 0.1,
                            fontFamily: 'var(--font-mono)',
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        {'<'}
                    </motion.div>

                    <motion.div
                        style={{
                            position: 'absolute',
                            bottom: '20%',
                            right: '10%',
                            fontSize: '8rem',
                            color: 'var(--accent-secondary)',
                            opacity: 0.1,
                            fontFamily: 'var(--font-mono)',
                        }}
                        animate={{
                            y: [0, 20, 0],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 2,
                        }}
                    >
                        {'/>'}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
