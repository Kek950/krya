import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const projects = [
        {
            title: 'Positivus — Digital Marketing Agency',
            description: 'Modern high-conversion landing page with custom responsive Slick carousels, fluid navigation, interactive accordions, and clean component architecture.',
            tags: ['React', 'JavaScript', 'HTML5', 'CSS3 / SCSS', 'Responsive'],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
            github: 'https://github.com/Kek950/positivus',
            live: 'https://kek950.github.io/positivus/',
        },
        {
            title: 'Panto — Modern Minimalist Living',
            description: 'E-commerce furniture showcase landing page featuring dynamic OwlCarousel2 multi-breakpoint sliders, interactive item filter catalogs, and custom shopping cart modal.',
            tags: ['JavaScript', 'HTML5', 'CSS3', 'OwlCarousel2', 'Git'],
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
            github: 'https://github.com/Kek950/project1',
            live: 'https://kek950.github.io/project1/',
        },
        {
            title: 'OsDev x86 — Custom 32-bit Kernel & Bootloader',
            description: 'From-scratch 16-bit Real Mode to 32-bit Protected Mode bootloader, GDT & IDT interrupt handlers, FAT12 filesystem driver, and standalone C kernel environment.',
            tags: ['C', 'x86 Assembly', 'QEMU', 'Makefile', 'Watcom Toolchain'],
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
            github: 'https://github.com/Kek950',
            live: 'https://github.com/Kek950',
            clue: 'Press `~` or type `duck` anywhere... trust me.',
        },
        {
            title: 'Logisim Circuit Simulator & Logic Gates',
            description: 'Digital logic circuits, 3-bit ripple counters, latches, flip-flops, multiplexers, and synthetic schematic parsing with headless automation.',
            tags: ['Digital Logic', 'Java', 'Logisim', 'Python', 'Computer Architecture'],
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
            github: 'https://github.com/Kek950',
            live: 'https://github.com/Kek950',
        },
        {
            title: 'Krya Portfolio Engine & Cyber-Interface',
            description: 'Futuristic responsive personal web hub built with Vite, React, Framer Motion, cyber-grid overlays, dynamic theme switching, and interactive physics playground.',
            tags: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'Figma'],
            image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
            github: 'https://github.com/Kek950',
            live: '#hero',
        },
        {
            title: 'JARVIS Local Neural AI & Second Brain',
            description: 'Local GPU voice assistant running Ollama Qwen2.5 on RTX 3050 and dual-vault Obsidian memory integration with real-time speech and tool execution.',
            tags: ['Python', 'Ollama', 'Obsidian', 'Speech Recognition', 'Fast-Path NLP'],
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
            github: 'https://github.com/Kek950',
            live: 'https://github.com/Kek950',
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
