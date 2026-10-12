import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const base = import.meta.env.BASE_URL || '/';

    const projects = [
        {
            title: 'Mafia Game — Online Multiplayer',
            description: 'Real-time multiplayer psychological role-playing game with WebSockets, room management, live chat, voting mechanics, and dynamic roles.',
            tags: ['React 19', 'Vite', 'Socket.IO', 'Express', 'Firebase'],
            image: `${base}projects/mafia.png`,
            github: 'https://github.com/Kek950/mafia-game',
            live: 'https://mafia-game-peach.vercel.app',
        },
        {
            title: 'SnakeGame — Pure Win32 C++',
            description: 'Ultra low-latency desktop Snake game engineered from scratch in pure C++ with the Windows Win32 API, GDI+ double-buffered rendering, and zero runtime bloat.',
            tags: ['C++', 'Win32 API', 'GDI+', 'Double Buffering', 'Native GUI'],
            image: `${base}projects/snake.png`,
            github: 'https://github.com/Kek950/snake-game',
            live: 'https://github.com/Kek950/snake-game',
        },
        {
            title: 'Positivus — Digital Agency Landing',
            description: 'High-conversion marketing landing page with custom responsive Slick carousels, fluid navigation, interactive accordions, and component architecture.',
            tags: ['React', 'JavaScript', 'HTML5', 'CSS3 / SCSS', 'Responsive'],
            image: `${base}projects/positivus.png`,
            github: 'https://github.com/Kek950/positivus',
            live: 'https://kek950.github.io/positivus/',
        },
        {
            title: 'Panto — Modern Living Showcase',
            description: 'E-commerce furniture showcase landing page featuring dynamic OwlCarousel2 multi-breakpoint sliders, interactive item filter catalogs, and custom cart modal.',
            tags: ['JavaScript', 'HTML5', 'CSS3', 'OwlCarousel2', 'Git'],
            image: `${base}projects/panto.png`,
            github: 'https://github.com/Kek950/project1',
            live: 'https://kek950.github.io/project1/',
        },
        {
            title: 'IELTS Preparation Telegram Bot',
            description: 'Interactive AI-powered Telegram exam preparation assistant allowing users to configure custom AI keys for speaking, writing, and vocabulary drills.',
            tags: ['Python', 'Telegram Bot API', 'Firebase', 'AI / LLM', 'Automation'],
            image: `${base}projects/ielts.png`,
            github: 'https://github.com/Kek950/IELTSprepbot',
            live: 'https://github.com/Kek950/IELTSprepbot',
        },
        {
            title: 'OsDev x86 — 32-bit Kernel & Bootloader',
            description: 'From-scratch 16-bit Real Mode to 32-bit Protected Mode bootloader, GDT & IDT interrupt handlers, FAT12 filesystem driver, and standalone C kernel.',
            tags: ['C', 'x86 Assembly', 'QEMU', 'Makefile', 'Watcom Toolchain'],
            image: `${base}projects/osdev.png`,
            github: 'https://github.com/Kek950/cpp-from-0-by-myself',
            live: 'https://github.com/Kek950/cpp-from-0-by-myself',
            clue: 'Press `~` or type `duck` anywhere... trust me.',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id="projects" className="section" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Featured Projects
                </motion.h2>

                <motion.div
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className="project-card"
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                        >
                            <motion.div
                                style={{ overflow: 'hidden', height: '200px' }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="project-image"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </motion.div>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-tags">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="project-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {project.clue && (
                                    <div
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.78rem',
                                            color: 'var(--accent-secondary)',
                                            background: 'rgba(255, 107, 0, 0.08)',
                                            borderLeft: '2px solid var(--accent-secondary)',
                                            padding: '0.35rem 0.6rem',
                                            marginBottom: '1rem',
                                            borderRadius: '0 4px 4px 0',
                                        }}
                                    >
                                        💡 <strong>Secret Clue:</strong> {project.clue}
                                    </div>
                                )}

                                <div className="project-links">
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn"
                                        style={{
                                            padding: '0.6rem 1.5rem',
                                            fontSize: '0.85rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FiGithub /> Code
                                    </motion.a>
                                    <motion.a
                                        href={project.live}
                                        target={project.live.startsWith('http') ? '_blank' : '_self'}
                                        rel="noopener noreferrer"
                                        className="btn btn-secondary"
                                        style={{
                                            padding: '0.6rem 1.5rem',
                                            fontSize: '0.85rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FiExternalLink /> Live
                                    </motion.a>
                                </div>
                            </div>

                            {/* Animated Corner Accent */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    width: '0',
                                    height: '0',
                                    borderStyle: 'solid',
                                    borderWidth: '0 50px 50px 0',
                                    borderColor: 'transparent var(--accent-primary) transparent transparent',
                                    opacity: 0,
                                }}
                                whileHover={{ opacity: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    style={{ textAlign: 'center', marginTop: '4rem' }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 }}
                >
                    <motion.a
                        href="https://github.com/Kek950"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View More on GitHub
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
