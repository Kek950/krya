import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
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
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section id="about" className="section" ref={ref}>
            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <motion.h2 className="section-title" variants={itemVariants}>
                        About Me
                    </motion.h2>

                    <motion.div
                        variants={itemVariants}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '2rem',
                            marginTop: '3rem',
                        }}
                    >
                        <div>
                            <motion.p
                                style={{
                                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                                    lineHeight: '1.8',
                                    marginBottom: '1.5rem',
                                }}
                                variants={itemVariants}
                            >
                                I'm Azamat, a front-end and software engineer who transforms complex ideas into elegant,
                                high-performance digital experiences. With a deep mastery of modern web technologies—from React and TypeScript to Next.js, Vite, and SCSS/Tailwind—I build interfaces that are lightning-fast, reactive, and pixel-perfect.
                            </motion.p>

                            <motion.p
                                style={{
                                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                                    lineHeight: '1.8',
                                    marginBottom: '1.5rem',
                                }}
                                variants={itemVariants}
                            >
                                Beyond front-end craft, I bridge the gap between polished user experiences and deep low-level mechanics: dissecting operating systems, writing x86 assembly and C kernels, designing digital circuits in Logisim, and optimizing build pipelines.
                            </motion.p>

                            <motion.p
                                style={{
                                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                                    lineHeight: '1.8',
                                }}
                                variants={itemVariants}
                            >
                                When I'm not architecting web apps or debugging systems, you'll find me exploring computer architecture, discrete mathematics, and building creative software with zero compromises on performance.
                            </motion.p>
                        </div>

                        <motion.div
                            className="card"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            style={{ padding: '2rem' }}
                        >
                            <h3
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--accent-primary)',
                                    marginBottom: '1.5rem',
                                    fontSize: '1.5rem',
                                }}
                            >
                                Quick Facts
                            </h3>

                            <ul style={{ listStyle: 'none', fontSize: '1.1rem' }}>
                                {[
                                    { label: 'Name', value: 'Azamat Bayadilov' },
                                    { label: 'Focus', value: 'React / Next.js / TypeScript' },
                                    { label: 'Specialty', value: 'UI/UX & Systems Eng' },
                                    { label: 'Email', value: 'azamatbayadilov49@gmail.com' },
                                    { label: 'Telegram', value: '@azzmattt' },
                                    { label: 'Status', value: 'Open to Opportunities' },
                                ].map((fact, index) => (
                                    <motion.li
                                        key={fact.label}
                                        style={{
                                            marginBottom: '1rem',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            gap: '1rem',
                                            padding: '0.5rem 0',
                                            borderBottom: '1px solid var(--border-color)',
                                        }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: index * 0.1 + 0.5 }}
                                    >
                                        <span style={{ color: 'var(--text-secondary)' }}>
                                            {fact.label}:
                                        </span>
                                        <span
                                            style={{
                                                color: 'var(--accent-primary)',
                                                fontFamily: 'var(--font-mono)',
                                                textAlign: 'right',
                                                wordBreak: 'break-all',
                                            }}
                                        >
                                            {fact.value}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
