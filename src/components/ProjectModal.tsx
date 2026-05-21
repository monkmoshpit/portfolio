import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DecryptText } from './DecryptText';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { githubRepoUrl, type Project } from '../projects';

import {
  SiPhp, SiLaravel, SiReact, SiTypescript, SiTailwindcss,
  SiDocker, SiRedis, SiMysql, SiSupabase, SiPostgresql, SiOpenai, SiVite
} from 'react-icons/si';

import devImg from '../assets/dev.png';
import multicampusImg from '../assets/multicampus.png';
import paygateImg from '../assets/paygate.png';
import readmeforgeImg from '../assets/readme.png';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const getTechIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('php')) return SiPhp;
  if (n.includes('laravel')) return SiLaravel;
  if (n.includes('react')) return SiReact;
  if (n.includes('typescript')) return SiTypescript;
  if (n.includes('tailwind')) return SiTailwindcss;
  if (n.includes('vite')) return SiVite;
  if (n.includes('redis')) return SiRedis;
  if (n.includes('mysql')) return SiMysql;
  if (n.includes('postgresql')) return SiPostgresql;
  if (n.includes('supabase')) return SiSupabase;
  if (n.includes('docker')) return SiDocker;
  if (n.includes('openai') || n.includes('claude') || n.includes('groq') || n.includes('llama') || n.includes('n8n')) return SiOpenai;
  return null;
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 28 } },
};

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = useState(false);

  const githubUrl = project.githubRepo ? githubRepoUrl(project.githubRepo) : null;

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  const panelBorder = isDark ? '#27272a' : '#059669';
  const dividerColor = isDark ? '#27272a' : '#6ee7b7';

  const projectImage =
  project.githubRepo === 'multicampus'
    ? multicampusImg
    : project.githubRepo === 'paygate'
    ? paygateImg
    : project.githubRepo === 'readmeforge'
    ? readmeforgeImg
    : devImg;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 overscroll-none">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="absolute inset-0 backdrop-blur-md"
          style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.45)' }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain scrollbar-none rounded-2xl border shadow-2xl z-10"
          style={{
            backgroundColor: isDark ? '#09090b' : '#ffffff',
            borderColor: panelBorder,
          }}
          onClick={e => e.stopPropagation()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="sticky top-0 z-20 flex justify-end p-4 md:p-5 pointer-events-none">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="pointer-events-auto p-1.5 rounded-lg transition-colors group"
              style={{
                color: isDark ? '#52525b' : '#047857',
                backgroundColor: isDark ? 'rgba(9,9,11,0.85)' : 'rgba(255,255,255,0.9)',
              }}
            >
              <X className="w-5 h-5 group-hover:rotate-90 group-hover:text-emerald-600 transition-all duration-200" />
            </button>
          </div>

          <div className="-mt-12 md:-mt-14 w-full aspect-video overflow-hidden shrink-0 bg-[var(--bg-elevated)]">
            <img
              src={projectImage}
              alt={project.title}
              className="w-full h-full object-cover pointer-events-none select-none"
              draggable={false}
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 md:p-8 pt-4 space-y-6"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--accent)' }}>
                <Code2 className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-widest">
                  {project.type === 'case'
                    ? (language === 'pt' ? 'Case Profissional' : 'Professional Case')
                    : 'Project'}
                </span>
              </div>
              <h2
                className="text-2xl md:text-3xl font-light tracking-tight leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                <DecryptText text={project.title} isHovered={isHovered} />
              </h2>
              {project.subtitle && (
                <p
                  className="mt-2 text-xs font-mono uppercase tracking-widest pl-3 border-l-2"
                  style={{ color: 'var(--text-secondary)', borderColor: 'var(--accent)' }}
                >
                  <DecryptText text={project.subtitle[language]} isHovered={isHovered} />
                </p>
              )}
            </motion.div>

            <motion.hr variants={itemVariants} style={{ borderColor: dividerColor }} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={itemVariants} className="md:col-span-2 space-y-2">
                <span
                  className="text-[10px] uppercase tracking-[0.2em] font-mono"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {language === 'pt' ? 'Visão Geral' : 'Overview'}
                </span>
                <p
                  className="text-sm leading-relaxed font-light"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <DecryptText text={project.description[language]} isHovered={isHovered} />
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3">
                <span
                  className="text-[10px] uppercase tracking-[0.2em] font-mono"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {language === 'pt' ? 'Tecnologias' : 'Tech Stack'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.badges.map((badge, i) => {
                    const Icon = getTechIcon(badge);
                    return (
                      <span
                        key={i}
                        className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono rounded border"
                        style={{
                          backgroundColor: 'var(--bg-elevated)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {Icon && <Icon className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--accent)' }} />}
                        {badge}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {githubUrl && (
              <motion.div
                variants={itemVariants}
                className="pt-4 flex justify-end border-t"
                style={{ borderColor: dividerColor }}
              >
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors hover:opacity-80 shrink-0"
                  style={{ color: 'var(--accent)' }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {language === 'pt' ? 'Ver no GitHub' : 'View on GitHub'}
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
