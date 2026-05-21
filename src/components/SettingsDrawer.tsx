import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

import ptFlag from '../assets/PT.jpeg';
import enFlag from '../assets/EN.jpeg';

export const SettingsDrawer = () => {
  const { language, transitioning, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { damping: 20, stiffness: 200, mass: 0.15 };
  const mx = useSpring(x, springCfg);
  const my = useSpring(y, springCfg);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top  + r.height / 2)) * 0.25);
  };

  const onLeave = () => {
    setIsOpen(false);
    x.set(0);
    y.set(0);
  };

  const isDark = theme === 'dark';

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[90] select-none">
      <motion.div
        ref={containerRef}
        style={{ x: mx, y: my }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={onLeave}
        onMouseMove={onMouseMove}
        className="flex flex-col items-end"
      >
        {/* Outer capsule */}
        <motion.div
          layout
          className="overflow-hidden shadow-2xl border"
          style={{
            backgroundColor: isDark ? 'rgba(9,9,11,0.92)' : 'rgba(255,255,255,0.92)',
            borderColor: isDark ? '#27272a' : '#e5e7eb',
            backdropFilter: 'blur(20px)',
          }}
          animate={{
            width:  isOpen ? 228 : 48,
            height: isOpen ? 'auto' : 48,
            borderRadius: 28,
          }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.45 }}
        >
          {/* Collapsed: "g." logo */}
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full flex items-center justify-center"
            >
              <span className="text-[var(--accent)] font-mono font-bold text-xl">g.</span>
            </motion.div>
          )}

          {/* Expanded: sliders */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.06 }}
              className="flex flex-col gap-4 p-5 pb-6 w-full"
            >
              {/* ── THEME PILL ── */}
              <div className="flex flex-col gap-1.5">
                <span
                  className="text-[9px] uppercase tracking-[0.2em] font-mono pl-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Theme
                </span>

                {/* The pill container itself — 2 equal halves that fill it */}
                <div
                  className="relative flex w-full h-9 rounded-full overflow-hidden border cursor-pointer"
                  style={{ borderColor: isDark ? '#27272a' : '#e5e7eb', backgroundColor: isDark ? '#09090b' : '#f3f4f6' }}
                  onClick={toggleTheme}
                >
                  {/* Sliding highlight */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-1/2 rounded-full"
                    style={{ backgroundColor: 'var(--accent-dim)', border: '1px solid var(--accent)' }}
                    animate={{ left: isDark ? 0 : '50%' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />

                  {/* Left: Moon (Dark) */}
                  <div className={`relative z-10 flex-1 flex items-center justify-center transition-opacity duration-200 ${isDark ? 'opacity-100' : 'opacity-30'}`}>
                    <Moon className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                  </div>

                  {/* Right: Sun (Light) */}
                  <div className={`relative z-10 flex-1 flex items-center justify-center transition-opacity duration-200 ${!isDark ? 'opacity-100' : 'opacity-30'}`}>
                    <Sun className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span
                  className="text-[9px] uppercase tracking-[0.2em] font-mono pl-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Language
                </span>
                <div
                  className={`relative flex w-full h-9 rounded-full overflow-hidden cursor-pointer transition-opacity duration-300 ${transitioning ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
                  style={{ border: `1px solid ${isDark ? '#27272a' : '#e5e7eb'}` }}
                  onClick={toggleLanguage}
                >
                  <div className={`relative flex-1 overflow-hidden transition-all duration-300 ${language === 'pt' ? 'opacity-100' : 'opacity-25 brightness-50'}`}>
                    <img src={ptFlag} alt="PT" className="absolute inset-0 w-full h-full object-cover" />
                  </div>

                  {/* Divider */}
                  <div className="absolute inset-y-0 left-1/2 w-px z-20" style={{ backgroundColor: isDark ? '#27272a' : '#e5e7eb' }} />
                  <div className={`relative flex-1 overflow-hidden transition-all duration-300 ${language === 'en' ? 'opacity-100' : 'opacity-25 brightness-50'}`}>
                    <img src={enFlag} alt="EN" className="absolute inset-0 w-full h-full object-cover" />
                  </div>

                  {/* Active side ring */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-1/2 rounded-full z-10 pointer-events-none"
                    style={{ border: '2px solid var(--accent)', opacity: 0.7 }}
                    animate={{ left: language === 'pt' ? 0 : '50%' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
