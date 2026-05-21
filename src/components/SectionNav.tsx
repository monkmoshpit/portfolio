import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const SECTION_IDS = ['home', 'skills', 'projects', 'impact', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

const labels: Record<SectionId, { pt: string; en: string }> = {
  home: { pt: 'Início', en: 'Home' },
  skills: { pt: 'Skills', en: 'Skills' },
  projects: { pt: 'Projetos', en: 'Projects' },
  impact: { pt: 'Impacto', en: 'Impact' },
  contact: { pt: 'Contato', en: 'Contact' },
};

const sections: SectionId[] = [...SECTION_IDS];

const TOP_SCROLL_THRESHOLD = 100;
const ANCHOR_RIGHT = 24;
const ANCHOR_BOTTOM = 24;
const TOP_Y = 20;

/** Mesmo easing em X e Y = trajetória reta (neurônio) */
const easeInOut = [0.42, 0, 0.58, 1] as const;
const travelTransition = {
  duration: 0.4,
  ease: easeInOut,
};

const stackSpring = { type: 'spring' as const, stiffness: 420, damping: 30 };

const stackItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...stackSpring, delay: i * 0.04 },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 8,
    scale: 0.95,
    transition: { duration: 0.14, delay: i * 0.025 },
  }),
};

interface NavItemProps {
  id: SectionId;
  isActive: boolean;
  label: string;
  variant: 'timeline' | 'stack';
  onSelect: (id: SectionId) => void;
}

const NavItem = ({ id, isActive, label, variant, onSelect }: NavItemProps) => {
  const isTimeline = variant === 'timeline';

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      aria-label={label}
      aria-current={isActive ? 'true' : undefined}
      className={`group relative z-10 shrink-0 ${
        isTimeline
          ? 'flex flex-col items-center gap-2 px-2 md:px-3'
          : 'flex flex-row-reverse items-center gap-3'
      }`}
    >
      {isTimeline && (
        <span
          className="font-mono uppercase tracking-widest whitespace-nowrap text-[9px] md:text-[10px] transition-colors duration-200"
          style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
        >
          {label}
        </span>
      )}
      <span
        className="block rounded-full border-2 shrink-0 box-border transition-transform duration-300 group-hover:scale-110"
        style={{
          width: 10,
          height: 10,
          minWidth: 10,
          minHeight: 10,
          borderColor: 'var(--accent)',
          backgroundColor: isActive ? 'var(--accent)' : 'transparent',
          boxShadow: isTimeline ? '0 0 0 3px var(--bg-base)' : undefined,
        }}
      />
      {!isTimeline && (
        <span
          className="font-mono uppercase tracking-widest whitespace-nowrap text-[11px] text-right transition-colors duration-200"
          style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
        >
          {label}
        </span>
      )}
    </button>
  );
};

export const SectionNav = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<SectionId>('home');
  const [isAtTop, setIsAtTop] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [topHovered, setTopHovered] = useState(false);
  const [travel, setTravel] = useState({ x: 0, y: 0 });

  const isDockedTop = isAtTop;
  const showCornerStack = !isDockedTop && expanded;
  const navOpacity = isDockedTop ? (topHovered ? 1 : isDark ? 0.42 : 0.62) : 1;
  const timelineLineOpacity = topHovered ? (isDark ? 0.55 : 0.85) : isDark ? 0.32 : 0.5;

  const measureTravel = useCallback(() => {
    const el = navRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const anchoredX = window.innerWidth - ANCHOR_RIGHT - rect.width;
    const anchoredY = window.innerHeight - ANCHOR_BOTTOM - rect.height;

    if (isDockedTop) {
      const targetX = window.innerWidth / 2 - rect.width / 2;
      setTravel({
        x: targetX - anchoredX,
        y: TOP_Y - anchoredY,
      });
    } else {
      setTravel({ x: 0, y: 0 });
    }
  }, [isDockedTop]);

  useLayoutEffect(() => {
    measureTravel();
    const id = requestAnimationFrame(() => requestAnimationFrame(measureTravel));
    return () => cancelAnimationFrame(id);
  }, [measureTravel, isDockedTop, language, expanded]);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measureTravel);
    ro.observe(el);
    window.addEventListener('resize', measureTravel);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measureTravel);
    };
  }, [measureTravel]);

  useEffect(() => {
    const onScroll = () => setIsAtTop(window.scrollY < TOP_SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const setup = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        entries => {
          const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible[0]?.target.id) {
            setActive(visible[0].target.id as SectionId);
          }
        },
        { threshold: [0.08, 0.2, 0.4], rootMargin: '-8% 0px -55% 0px' }
      );

      SECTION_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer!.observe(el);
      });
    };

    setup();
    const retry = window.setTimeout(setup, 400);
    return () => {
      window.clearTimeout(retry);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isDockedTop) setExpanded(false);
  }, [isDockedTop]);

  const scrollTo = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <motion.nav
      ref={navRef}
      aria-label={language === 'pt' ? 'Navegação por seções' : 'Section navigation'}
      className="fixed z-[100] select-none pointer-events-auto w-max"
      style={{ right: ANCHOR_RIGHT, bottom: ANCHOR_BOTTOM }}
      initial={false}
      animate={{
        x: travel.x,
        y: travel.y,
        opacity: navOpacity,
      }}
      transition={{
        x: travelTransition,
        y: travelTransition,
        opacity: { duration: 0.22 },
      }}
      onMouseEnter={() => {
        if (isDockedTop) setTopHovered(true);
        else setExpanded(true);
      }}
      onMouseLeave={() => {
        if (isDockedTop) setTopHovered(false);
        else setExpanded(false);
      }}
    >
      <div className="relative">
        <motion.div
          aria-hidden={!isDockedTop}
          className="relative w-max max-w-[calc(100vw-2rem)]"
          initial={false}
          animate={{ opacity: isDockedTop ? 1 : 0 }}
          transition={{ duration: 0.2, ease: easeInOut }}
          style={{
            display: isDockedTop ? 'block' : 'none',
            pointerEvents: isDockedTop ? 'auto' : 'none',
          }}
        >
          <div
            className="absolute h-px pointer-events-none transition-opacity duration-300"
            style={{
              left: 20,
              right: 20,
              bottom: 5,
              backgroundColor: 'var(--accent)',
              opacity: timelineLineOpacity,
            }}
          />
          <div className="relative flex flex-row items-end justify-center gap-1 sm:gap-2 md:gap-4">
            {sections.map(id => (
              <NavItem
                key={id}
                id={id}
                isActive={active === id}
                label={labels[id][language]}
                variant="timeline"
                onSelect={scrollTo}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          aria-hidden={isDockedTop}
          className="flex flex-col items-end"
          initial={false}
          animate={{ opacity: isDockedTop ? 0 : 1 }}
          transition={{ duration: 0.2, ease: easeInOut }}
          style={{
            display: isDockedTop ? 'none' : 'flex',
            pointerEvents: isDockedTop ? 'none' : 'auto',
          }}
        >
          <AnimatePresence>
            {showCornerStack &&
              sections.map((id, i) => (
                <motion.div
                  key={id}
                  custom={i}
                  variants={stackItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mb-2.5"
                >
                  <NavItem
                    id={id}
                    isActive={active === id}
                    label={labels[id][language]}
                    variant="stack"
                    onSelect={scrollTo}
                  />
                </motion.div>
              ))}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {!showCornerStack && (
              <motion.button
                key="anchor-dot"
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.12 }}
                onClick={() => setExpanded(true)}
                aria-label={labels[active][language]}
                aria-expanded={false}
                className="block w-3.5 h-3.5 min-w-[14px] min-h-[14px] rounded-full border-2 bg-transparent hover:scale-110 transition-transform shrink-0 box-border"
                style={{ borderColor: 'var(--accent)' }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.nav>
  );
};
