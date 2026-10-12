import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroScreen = ({ onComplete }) => {
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);

    const fullLine1 = '> HELLO, WORLD. I AM';
    const fullLine2 = 'KEKICH';

    useEffect(() => {
        let i = 0;
        let j = 0;

        // Step 1: Type line 1
        const typeInterval1 = setInterval(() => {
            if (i <= fullLine1.length) {
                setLine1(fullLine1.slice(0, i));
                i++;
            } else {
                clearInterval(typeInterval1);

                // Pause briefly before typing line 2
                setTimeout(() => {
                    const typeInterval2 = setInterval(() => {
                        if (j <= fullLine2.length) {
                            setLine2(fullLine2.slice(0, j));
                            j++;
                        } else {
                            clearInterval(typeInterval2);

                            // Pause to read, then trigger exit
                            setTimeout(() => {
                                onComplete();
                            }, 1000);
                        }
                    }, 85);
                }, 300);
            }
        }, 55);

        // Blinking cursor
        const blinkInterval = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 400);

        return () => {
            clearInterval(typeInterval1);
            clearInterval(blinkInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.05,
                filter: 'blur(10px)',
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#000000',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                userSelect: 'none',
            }}
        >
            <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
                <p
                    style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--accent-primary)',
                        fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                        letterSpacing: '0.2em',
                        marginBottom: '1rem',
                        minHeight: '2rem',
                    }}
                >
                    {line1}
                    {line2.length === 0 && (
                        <span style={{ opacity: cursorVisible ? 1 : 0, color: 'var(--accent-primary)' }}>_</span>
                    )}
                </p>

                <h1
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(3rem, 10vw, 6.5rem)',
                        fontWeight: 900,
                        letterSpacing: '0.05em',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        minHeight: '4.5rem',
                        lineHeight: 1.1,
                    }}
                >
                    {line2}
                    {line2.length > 0 && (
                        <span
                            style={{
                                opacity: cursorVisible ? 1 : 0,
                                WebkitTextFillColor: 'var(--accent-primary)',
                                color: 'var(--accent-primary)',
                                marginLeft: '4px',
                            }}
                        >
                            _
                        </span>
                    )}
                </h1>

                <motion.button
                    onClick={onComplete}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    style={{
                        marginTop: '3.5rem',
                        background: 'transparent',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        borderRadius: '20px',
                        padding: '0.4rem 1.2rem',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        letterSpacing: '0.1em',
                    }}
                >
                    [PRESS TO SKIP]
                </motion.button>
            </div>
        </motion.div>
    );
};

export default IntroScreen;
