import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navigation = ({ theme, toggleTheme }) => {
    const navItems = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Interactive', href: '#interactive' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            className="nav"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="nav-container">
                <motion.a
                    href="#hero"
                    className="nav-logo"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {'<DEV/>'}
                </motion.a>

                <ul className="nav-links">
                    {navItems.map((item, index) => (
                        <motion.li
                            key={item.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                        >
                            <a href={item.href} className="nav-link">
                                {item.name}
                            </a>
                        </motion.li>
                    ))}

                    <motion.li
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <motion.button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                        </motion.button>
                    </motion.li>
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navigation;
