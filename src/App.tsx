import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SettingsDrawer } from './components/SettingsDrawer';
import { WaveTransition } from './components/WaveTransition';
import { TypewriterText } from './components/TypewriterText';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import SkillsSection from './components/SkillsSection';
import { SectionNav } from './components/SectionNav';
import { ProjectsSection, ImpactSection } from './components/ProjectsSection';
import { MarqueeStack } from './components/MarqueeStack';
import { ContactSection } from './components/ContactSection';
import { AnimatedGrain } from './components/AnimatedGrain';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { portfolioImages } from './assets/portfolioImages';

const HeroSection = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const content = {
    pt: {
      greeting: 'Guilherme de Oliveira',
      subtitle: 'Engenheiro Full Stack',
      description:
        'Focado em arquitetura escalável, alta performance e modernização de ecossistemas complexos. Experiência real transformando plataformas SaaS legadas, integrando inteligência artificial ao core de negócios e otimizando pipelines de dados de ponta a ponta.',
    },
    en: {
      greeting: 'Guilherme de Oliveira',
      subtitle: 'Full Stack Engineer',
      description:
        'Focused on scalable architecture, high performance, and modernizing complex ecosystems. Proven track record transforming legacy SaaS platforms, integrating AI into business cores, and optimizing end-to-end data pipelines.',
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center py-20 relative overflow-hidden transition-colors duration-400"
      style={{
        background: isDark
          ? 'linear-gradient(to bottom, #18181b, #09090b)'
          : 'linear-gradient(to bottom, #f9fafb, #ffffff)',
      }}
    >
      <AnimatedGrain />

      <WaveTransition />
      <SettingsDrawer />

      <main className="max-w-screen-xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 z-10 relative px-4 md:px-8">

        {/* ── Text ── */}
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left order-2 md:order-1 max-w-full min-w-0 md:w-2/3">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight break-normal whitespace-normal"
            style={{ color: 'var(--text-primary)' }}
          >
            <TypewriterText text={content[language].greeting} delay={0.2} />
            <span style={{ color: 'var(--accent)' }}>.</span>
          </h1>

          <h2 className="text-lg md:text-xl font-light mt-1" style={{ color: 'var(--text-secondary)' }}>
            {content[language].subtitle}
          </h2>

          <p
            className="text-base md:text-lg font-light leading-relaxed max-w-2xl mt-4 break-normal whitespace-normal"
            style={{ color: 'var(--text-secondary)' }}
          >
            <TypewriterText text={content[language].description} delay={1.0} />
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
            <a
              href="https://github.com/monkmoshpit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/guilherme-de-oliveira-nascimento-6611762aa/?skipRedirect=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <FaLinkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* ── Profile image — square, green outline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative shrink-0 order-1 md:order-2 w-56 h-56 md:w-80 md:h-80 xl:w-96 xl:h-96 flex-shrink-0 md:w-1/3"
        >
          <div
            className="w-full h-full border shadow-2xl overflow-hidden"
            style={{
              borderColor: 'var(--border-subtle)',
              backgroundColor: 'var(--bg-surface)',
              outlineOffset: '6px',
              outline: '1px solid rgba(16,185,129,0.4)',
            }}
          >
            <img
              src={portfolioImages.dev}
              alt="Profile"
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-cover aspect-square"
              onError={e => {
                e.currentTarget.src =
                  'https://ui-avatars.com/api/?name=Dev&background=18181b&color=10b981&size=512';
              }}
            />
          </div>
        </motion.div>
      </main>
    </section>
  );
};

// ── Root app (inner, has access to both contexts) ──
const AppInner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!isLoaded && <Loader key="loader" onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-sans min-h-screen"
          style={{ backgroundColor: 'var(--bg-base)' }}
        >
          <SectionNav />
          <HeroSection />
          <MarqueeStack />
          <SkillsSection />
          <ProjectsSection />
          <ImpactSection />
          <ContactSection />
        </motion.div>
      )}
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </ThemeProvider>
  );
}
