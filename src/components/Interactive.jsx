import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Interactive = () => {
    const ref = useRef(null);
    const canvasRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Active interactive tool tab
    const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'terminal' | 'cyberboard'
    const [clickCount, setClickCount] = useState(0);
    const [easterEggActive, setEasterEggActive] = useState(false);
    const [keySequence, setKeySequence] = useState('');

    // Interactive Terminal State
    const [terminalHistory, setTerminalHistory] = useState([
        { text: 'KRYA OS v3.2.0 [x86_64 architecture]', type: 'system' },
        { text: 'Type "help" for a list of commands, or "duck" for easter egg.', type: 'info' }
    ]);
    const [terminalInput, setTerminalInput] = useState('');
    const terminalBodyRef = useRef(null);

    // Auto-scroll mini console to bottom when new logs appear
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [terminalHistory]);

    // Interactive Sound / Synth Pad notes
    const [activePad, setActivePad] = useState(null);

    // Global Key Listener for "duck" or `~`
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '`' || e.key === '~') {
                setEasterEggActive((prev) => !prev);
                return;
            }

            const updated = (keySequence + e.key.toLowerCase()).slice(-4);
            setKeySequence(updated);
            if (updated === 'duck' || updated === 'krya') {
                setEasterEggActive(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [keySequence]);

    // Interactive Matrix / Particle Canvas Background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = (canvas.width = canvas.parentElement.offsetWidth);
        let height = (canvas.height = canvas.parentElement.offsetHeight);

        const handleResize = () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        };
        window.addEventListener('resize', handleResize);

        // Interactive mouse gravity node
        let mouse = { x: -1000, y: -1000, radius: 140 };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // Cyber particles with interactive velocity
        const particleCount = Math.min(65, Math.floor(width / 18));
        const particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            radius: Math.random() * 2 + 1.2,
            color: Math.random() > 0.4 ? '#00f0ff' : '#ff6b00',
        }));

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Subtle cyber grid lines on canvas
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.035)';
            ctx.lineWidth = 1;
            const gridSize = 40;
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Draw and connect particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Mouse interaction physics
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    p.x -= (dx / dist) * force * 4;
                    p.y -= (dy / dist) * force * 4;
                }

                // Move particle
                p.x += p.vx;
                p.y += p.vy;

                // Bounce boundaries
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw node
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Connect nearby nodes with glowing laser webs
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const djx = p.x - p2.x;
                    const djy = p.y - p2.y;
                    const d = Math.sqrt(djx * djx + djy * djy);

                    if (d < 110) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 240, 255, ${0.25 * (1 - d / 110)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Interactive Terminal Command Parser
    const handleTerminalSubmit = (e) => {
        e.preventDefault();
        const cmd = terminalInput.trim().toLowerCase();
        if (!cmd) return;

        const newHistory = [...terminalHistory, { text: `$ ${terminalInput}`, type: 'user' }];

        switch (cmd) {
            case 'help':
                newHistory.push(
                    { text: 'Available commands:', type: 'system' },
                    { text: '  about      - Brief bio of kekich', type: 'info' },
                    { text: '  skills     - Core tech stack overview', type: 'info' },
                    { text: '  projects   - Highlighted repositories', type: 'info' },
                    { text: '  duck       - Summon the secret debugging duck', type: 'info' },
                    { text: '  matrix     - Activate cyber visualizer', type: 'info' },
                    { text: '  clear      - Clear terminal output', type: 'info' }
                );
                break;
            case 'about':
                newHistory.push({
                    text: 'kekich: Developer building high-performance UIs (React, Next.js, Vite) and low-level systems (x86 C/ASM, Win32).',
                    type: 'system'
                });
                break;
            case 'skills':
                newHistory.push({
                    text: 'Tech: React 19, TypeScript, JavaScript, HTML5, CSS3, SCSS, Tailwind, Next.js, Vite, C/C++, Win32, Git, Figma.',
                    type: 'system'
                });
                break;
            case 'projects':
                newHistory.push({
                    text: '1. Mafia Game (React, Sockets) | 2. SnakeGame (Win32 C++) | 3. Positivus Landing | 4. Panto Store | 5. OsDev x86 Kernel',
                    type: 'system'
                });
                break;
            case 'duck':
            case 'krya':
                setEasterEggActive(true);
                newHistory.push({ text: '🦆 КРЯ! Debugging Duck protocol initialized.', type: 'info' });
                break;
            case 'matrix':
                setActiveTab('matrix');
                newHistory.push({ text: 'Switched active viewport to Cyber Kinetic Grid.', type: 'system' });
                break;
            case 'clear':
                setTerminalHistory([]);
                setTerminalInput('');
                return;
            default:
                newHistory.push({
                    text: `Command not found: "${cmd}". Type "help" for valid options.`,
                    type: 'error'
                });
        }

        setTerminalHistory(newHistory);
        setTerminalInput('');
    };

    // Cyber Synth Pads data
    const soundPads = [
        { id: 1, label: '01 // REACT', desc: 'Component Mount', color: '#00f0ff', tone: 261.63 },
        { id: 2, label: '02 // KERNEL', desc: 'Ring 0 Interrupt', color: '#ff6b00', tone: 329.63 },
        { id: 3, label: '03 // SOCKET', desc: 'Bi-dir Handshake', color: '#00ff88', tone: 392.00 },
        { id: 4, label: '04 // WIN32', desc: 'WM_PAINT Dispatch', color: '#ff0077', tone: 523.25 },
        { id: 5, label: '05 // DUCK', desc: 'КРЯ Trigger', color: '#ffd000', tone: 587.33 },
        { id: 6, label: '06 // SHIFT', desc: 'Bitwise Pulse', color: '#7000ff', tone: 659.25 },
    ];

    // Trigger synthetic audio pulse via Web Audio API
    const playSynthTone = (pad) => {
        setActivePad(pad.id);
        setClickCount((prev) => prev + 1);

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = pad.id === 5 ? 'sawtooth' : 'sine';
                osc.frequency.setValueAtTime(pad.tone, ctx.currentTime);

                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start();
                osc.stop(ctx.currentTime + 0.35);
            }
        } catch {
            // Audio context blocked or unsupported
        }

        if (pad.id === 5 || clickCount + 1 >= 5) {
            setEasterEggActive(true);
        }

        setTimeout(() => setActivePad(null), 300);
    };

    return (
        <section
            id="interactive"
            className="section"
            ref={ref}
            style={{
                position: 'relative',
                background: 'var(--bg-primary)',
                overflow: 'hidden',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5rem 0',
            }}
        >
            {/* Soft Ambient Radial Glow to seamlessly blend without hard edges */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.05) 0%, transparent 75%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* Interactive Canvas Grid Background */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'auto',
                    zIndex: 0,
                    opacity: 0.65,
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        Cyber Playground
                    </motion.h2>

                    <motion.p
                        style={{
                            maxWidth: '650px',
                            margin: '0 auto',
                            color: 'var(--text-secondary)',
                            fontSize: '0.95rem',
                        }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        Real-time canvas physics, an interactive CLI terminal, and audio-reactive sound pads. Move your mouse across the grid to bend light particles.
                    </motion.p>

                    {/* Mode Selector Tabs */}
                    <div
                        style={{
                            display: 'inline-flex',
                            gap: '0.5rem',
                            marginTop: '1.5rem',
                            background: 'rgba(0, 0, 0, 0.6)',
                            padding: '0.35rem',
                            borderRadius: '30px',
                            border: '1px solid var(--border-color)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        {[
                            { id: 'matrix', label: '⚡ KINETIC CANVAS' },
                            { id: 'terminal', label: '>_ LIVE TERMINAL' },
                            { id: 'cyberboard', label: '🎛️ SYNTH PADS' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.8rem',
                                    padding: '0.45rem 1.1rem',
                                    borderRadius: '20px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: activeTab === tab.id ? 'var(--accent-primary)' : 'transparent',
                                    color: activeTab === tab.id ? '#000000' : 'var(--text-secondary)',
                                    fontWeight: activeTab === tab.id ? 700 : 500,
                                    transition: 'all 0.25s ease',
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab 1: Kinetic Canvas Highlight / Live Metrics */}
                {activeTab === 'matrix' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            background: 'rgba(10, 16, 26, 0.75)',
                            border: '1px solid rgba(0, 240, 255, 0.25)',
                            borderRadius: '12px',
                            padding: '2rem',
                            backdropFilter: 'blur(12px)',
                            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(0, 240, 255, 0.05)',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontSize: '0.85rem' }}>
                                    ● LIVE GRAVITY FIELD ACTIVE
                                </span>
                                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', marginTop: '0.3rem' }}>
                                    Particle Displacement Web
                                </h3>
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                Cursor X/Y forces node repulsion
                            </div>
                        </div>

                        {/* Interactive Physics Info Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {[
                                { label: 'Active Field Particles', val: '65 Nodes', sub: 'Calculated 60 FPS' },
                                { label: 'Proximity Threshold', val: '110px Max', sub: 'Laser Web Strands' },
                                { label: 'Spring Easing', val: 'Damped Inertia', sub: 'Interactive Elasticity' },
                                { label: 'Click Counter', val: `${clickCount} Actions`, sub: clickCount >= 3 ? 'Duck near...' : 'Interact to trigger' },
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ translateY: -3, borderColor: 'var(--accent-primary)' }}
                                    style={{
                                        background: 'rgba(0, 0, 0, 0.5)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '8px',
                                        padding: '1.2rem',
                                        fontFamily: 'var(--font-mono)',
                                    }}
                                >
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.4rem' }}>{stat.label}</div>
                                    <div style={{ color: 'var(--accent-primary)', fontSize: '1.25rem', fontWeight: 700 }}>{stat.val}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.2rem' }}>{stat.sub}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Tab 2: Live Interactive CLI Terminal */}
                {activeTab === 'terminal' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            background: '#03070d',
                            border: '1px solid rgba(0, 240, 255, 0.3)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.1)',
                        }}
                    >
                        {/* Terminal Header */}
                        <div
                            style={{
                                background: '#0a101d',
                                padding: '0.65rem 1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
                            }}
                        >
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
                            </div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                bash: kekich@krya-terminal:~
                            </span>
                            <div style={{ width: 40 }} />
                        </div>

                        {/* Terminal Body */}
                        <div
                            ref={terminalBodyRef}
                            style={{
                                padding: '1.25rem',
                                minHeight: '300px',
                                maxHeight: '420px',
                                overflowY: 'auto',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.85rem',
                                lineHeight: '1.6',
                                scrollBehavior: 'smooth',
                            }}
                        >
                            {terminalHistory.map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        color:
                                            item.type === 'user'
                                                ? 'var(--accent-primary)'
                                                : item.type === 'error'
                                                ? '#ff4444'
                                                : item.type === 'info'
                                                ? 'var(--accent-secondary)'
                                                : 'var(--text-secondary)',
                                        marginBottom: '0.3rem',
                                    }}
                                >
                                    {item.text}
                                </div>
                            ))}

                            {/* Prompt Input Form */}
                            <form onSubmit={handleTerminalSubmit} style={{ display: 'flex', alignItems: 'center', marginTop: '0.8rem' }}>
                                <span style={{ color: 'var(--accent-primary)', marginRight: '0.5rem' }}>$</span>
                                <input
                                    type="text"
                                    value={terminalInput}
                                    onChange={(e) => setTerminalInput(e.target.value)}
                                    placeholder="Type 'help', 'about', 'skills', or 'duck'..."
                                    style={{
                                        flex: 1,
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        color: '#ffffff',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.85rem',
                                    }}
                                    autoFocus
                                />
                            </form>
                        </div>
                    </motion.div>
                )}

                {/* Tab 3: Audio Synth Pads */}
                {activeTab === 'cyberboard' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            background: 'rgba(10, 16, 26, 0.75)',
                            border: '1px solid rgba(0, 240, 255, 0.25)',
                            borderRadius: '12px',
                            padding: '2rem',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontSize: '0.8rem' }}>
                                [ WEB AUDIO SYNTHESIZER ]
                            </span>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                                Tap the pads to trigger real-time frequencies. Pad 05 summons the duck.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                            {soundPads.map((pad) => {
                                const isActive = activePad === pad.id;
                                return (
                                    <motion.button
                                        key={pad.id}
                                        onClick={() => playSynthTone(pad)}
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            background: isActive ? pad.color : 'rgba(0, 0, 0, 0.6)',
                                            border: `2px solid ${isActive ? '#ffffff' : pad.color}`,
                                            borderRadius: '8px',
                                            padding: '1.4rem 1rem',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            boxShadow: isActive ? `0 0 30px ${pad.color}` : 'none',
                                            transition: 'background 0.15s, border-color 0.15s, box-shadow 0.15s',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.9rem',
                                                fontWeight: 700,
                                                color: isActive ? '#000000' : pad.color,
                                                marginBottom: '0.3rem',
                                            }}
                                        >
                                            {pad.label}
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.75rem',
                                                color: isActive ? '#111111' : 'var(--text-muted)',
                                            }}
                                        >
                                            {pad.desc}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Secret Easter Egg Meme Modal */}
                <AnimatePresence>
                    {easterEggActive && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEasterEggActive(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0, 0, 0, 0.88)',
                                backdropFilter: 'blur(12px)',
                                zIndex: 100000,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1.5rem',
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.5, rotate: -10, y: 50 }}
                                animate={{ scale: 1, rotate: 0, y: 0 }}
                                exit={{ scale: 0.5, rotate: 10, y: 50 }}
                                transition={{ type: 'spring', damping: 15 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    background: '#090e17',
                                    border: '2px solid var(--accent-primary)',
                                    borderRadius: '16px',
                                    padding: '2.2rem',
                                    maxWidth: '480px',
                                    width: '100%',
                                    textAlign: 'center',
                                    boxShadow: '0 0 60px rgba(0, 240, 255, 0.45)',
                                }}
                            >
                                <motion.div
                                    animate={{
                                        rotate: [0, -12, 12, -12, 0],
                                        scale: [1, 1.18, 1],
                                    }}
                                    transition={{ duration: 1.4, repeat: Infinity }}
                                    style={{ fontSize: '4.5rem', marginBottom: '0.8rem', cursor: 'pointer' }}
                                >
                                    🦆
                                </motion.div>

                                <h3
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--accent-primary)',
                                        fontSize: '1.6rem',
                                        marginBottom: '0.6rem',
                                    }}
                                >
                                    КРЯ! YOU FOUND THE SECRET!
                                </h3>

                                <p
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--accent-secondary)',
                                        fontSize: '0.95rem',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    "Peace was never an option." — Untitled Duck Protocol
                                </p>

                                <p
                                    style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.6',
                                        marginBottom: '1.8rem',
                                    }}
                                >
                                    Congratulations! You discovered kekich's rubber duck debugging terminal. Legend has it that explaining your Protected Mode faults, Win32 paint dispatches, and Vite build errors to this duck instantly resolves all segmentation faults.
                                </p>

                                <motion.button
                                    onClick={() => setEasterEggActive(false)}
                                    className="btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        padding: '0.65rem 1.8rem',
                                        fontSize: '0.85rem',
                                    }}
                                >
                                    КРЯ-КРЯ (Dismiss Duck)
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Interactive;
