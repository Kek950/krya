import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    SiReact,
    SiJavascript,
    SiTypescript,
    SiHtml5,
    SiCss3,
    SiSass,
    SiTailwindcss,
    SiNextdotjs,
    SiVite,
    SiGit,
    SiFigma,
    SiFramer,
    SiC,
    SiNodedotjs,
    SiLinux,
} from 'react-icons/si';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const skills = [
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
        { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
        { name: 'SCSS', icon: SiSass, color: '#CC6699' },
        { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Vite', icon: SiVite, color: '#646CFF' },
        { name: 'Git', icon: SiGit, color: '#F05032' },
        { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
        { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
        { name: 'C & Systems', icon: SiC, color: '#A8B9CC' },
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Linux / WSL', icon: SiLinux, color: '#FCC624' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id="skills" className="section" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Skills & Technologies
                </motion.h2>

                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {skills.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={skill.name}
                                className="skill-item"
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: [0, -5, 5, 0],
                                    transition: { duration: 0.3 },
                                }}
                                style={{
                                    perspective: '1000px',
                                }}
                            >
                                <motion.div
                                    className="skill-icon"
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <Icon style={{ color: 'var(--accent-primary)' }} />
                                </motion.div>
                                <div className="skill-name">{skill.name}</div>

                                {/* Skill Level Bar */}
                                <motion.div
                                    style={{
                                        marginTop: '1rem',
                                        height: '3px',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: '2px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <motion.div
                                        style={{
                                            height: '100%',
                                            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                                            borderRadius: '2px',
                                        }}
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: '85%' } : {}}
                                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Additional Skills */}
                <motion.div
                    style={{ marginTop: '4rem', textAlign: 'center' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <h3
                        style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-secondary)',
                            marginBottom: '1.5rem',
                            fontSize: '1.2rem',
                        }}
                    >
                        Also Experienced With
                    </h3>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            justifyContent: 'center',
                        }}
                    >
                        {['Webpack', 'REST APIs', 'GraphQL', 'Jest', 'Cypress', 'SASS', 'Responsive Design', 'Web Performance'].map(
                            (tech, index) => (
                                <motion.span
                                    key={tech}
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.9rem',
                                        padding: '0.5rem 1rem',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-secondary)',
                                        borderRadius: '4px',
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 1.2 + index * 0.05 }}
                                    whileHover={{
                                        scale: 1.05,
                                        borderColor: 'var(--accent-primary)',
                                        color: 'var(--accent-primary)',
                                    }}
                                >
                                    {tech}
                                </motion.span>
                            )
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
