import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navigation = ({ showNav = true }) => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const navItems = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Interactive', href: '#interactive' },
        { name: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            setScrolled(scrollPos > 30);

            // Active section observer with accurate midpoint offset
            const sections = ['contact', 'interactive', 'projects', 'skills', 'about', 'hero'];
            for (const sectionId of sections) {
                const el = document.getElementById(sectionId);
                if (el) {
                    const top = el.offsetTop - 120;
                    if (scrollPos >= top) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            // Target the section title if present so the title aligns right beneath the navbar
            const headerEl = target.querySelector('.section-title') || target;
            const navEl = document.querySelector('.nav');
            const navHeight = navEl ? navEl.offsetHeight : 65;
            
            // Give 25px breathing room below navbar
            const targetPos = Math.max(0, headerEl.getBoundingClientRect().top + window.pageYOffset - (navHeight + 25));

            if (window.__lenis) {
                window.__lenis.scrollTo(targetPos, { duration: 1.2 });
            } else {
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <motion.nav
            className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={showNav ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="nav-container">
                <motion.a
                    href="#hero"
                    onClick={(e) => handleNavClick(e, '#hero')}
                    className="nav-logo"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {'<KEKICH/>'}
                </motion.a>

                <ul className="nav-links">
                    {navItems.map((item, index) => {
                        const targetId = item.href.replace('#', '');
                        const isActive = activeSection === targetId;

                        return (
                            <motion.li
                                key={item.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 + 0.1 }}
                            >
                                <a
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={`nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="nav-indicator"
                                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </a>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navigation;
