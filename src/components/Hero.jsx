import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
    const [text, setText] = useState('');
    const fullText = 'FRONT-END DEVELOPER';

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

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
                        }}
                    >
                        <span>{text}</span>
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            style={{ color: 'var(--accent-primary)' }}
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
