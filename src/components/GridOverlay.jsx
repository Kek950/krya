import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const GridOverlay = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Show grid on mouse movement
            setIsVisible(true);

            // Hide after 2 seconds of no movement
            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, 2000);

            return () => clearTimeout(timeout);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={`grid-overlay ${isVisible ? 'visible' : ''}`} />
    );
};

export default GridOverlay;
