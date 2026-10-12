import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="contact" className="section" ref={ref} style={{ minHeight: '80vh' }}>
            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
                >
                    <motion.h2 className="section-title" variants={itemVariants} style={{ textAlign: 'center' }}>
                        Get In Touch
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                            color: 'var(--text-secondary)',
                            marginBottom: '3rem',
                            lineHeight: '1.8',
                        }}
                    >
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        Feel free to reach out through any of the platforms below!
                    </motion.p>

                    {/* Contact Buttons */}
                    <motion.div className="contact-buttons" variants={itemVariants}>
                        <motion.a
                            href="https://t.me/azzmattt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn contact-btn"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 0 30px var(--accent-glow)',
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaTelegram />
                            Telegram
                        </motion.a>

                        <motion.a
                            href="mailto:azamatbayadilov49@gmail.com"
                            className="btn btn-secondary contact-btn"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 0 30px rgba(255, 107, 0, 0.3)',
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiMail />
                            Gmail
                        </motion.a>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            marginTop: '4rem',
                            padding: '3rem',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Animated Border */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '2px',
                                background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary))',
                            }}
                            animate={{
                                backgroundPosition: ['0% 0%', '200% 0%'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />

                        <h3
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '1.5rem',
                                marginBottom: '1.5rem',
                                color: 'var(--text-primary)',
                            }}
                        >
                            Let's Build Something Amazing Together
                        </h3>

                        <p
                            style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1.1rem',
                                marginBottom: '2rem',
                            }}
                        >
                            Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
                            I'll try my best to get back to you as soon as possible!
                        </p>

                        {/* Quick Info */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '2rem',
                                marginTop: '2rem',
                            }}
                        >
                            {[
                                { icon: <FiSend />, label: 'Response Time', value: '< 24 hours' },
                                { icon: <FiMail />, label: 'Availability', value: 'Open to Work' },
                            ].map((info, index) => (
                                <motion.div
                                    key={info.label}
                                    style={{
                                        textAlign: 'center',
                                        padding: '1.5rem',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        borderColor: 'var(--accent-primary)',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: '2rem',
                                            color: 'var(--accent-primary)',
                                            marginBottom: '0.5rem',
                                        }}
                                    >
                                        {info.icon}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.85rem',
                                            color: 'var(--text-muted)',
                                            marginBottom: '0.3rem',
                                        }}
                                    >
                                        {info.label}
                                    </div>
                                    <div
                                        style={{
                                            color: 'var(--accent-primary)',
                                            fontWeight: '600',
                                        }}
                                    >
                                        {info.value}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            marginTop: '4rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid var(--border-color)',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.9rem',
                                color: 'var(--text-muted)',
                            }}
                        >
                            © {new Date().getFullYear()} Azamat Bayadilov. Built with React + Vite + Framer Motion
                        </p>
                        <motion.p
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.85rem',
                                color: 'var(--accent-primary)',
                                marginTop: '0.5rem',
                            }}
                            animate={{
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        >
                            {'<Designed with precision, passion & clean architecture />'}
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
