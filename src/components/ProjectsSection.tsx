import { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../projects';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ProjectModal } from './ProjectModal';
import { Terminal } from 'lucide-react';
import type { Project } from '../projects';
import { DecryptText } from './DecryptText';
import { portfolioImages } from '../assets/portfolioImages';

import {
  SiPhp, SiLaravel, SiReact, SiTypescript, SiVite, SiTailwindcss,
  SiDocker, SiRedis, SiMysql, SiSupabase, SiPostgresql, SiOpenai
} from 'react-icons/si';

const getTechIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('php'))      return SiPhp;
  if (n.includes('laravel'))  return SiLaravel;
  if (n.includes('react'))    return SiReact;
  if (n.includes('typescript')) return SiTypescript;
  if (n.includes('tailwind')) return SiTailwindcss;
  if (n.includes('vite'))     return SiVite;
  if (n.includes('redis'))    return SiRedis;
  if (n.includes('mysql'))    return SiMysql;
  if (n.includes('postgresql')) return SiPostgresql;
  if (n.includes('supabase')) return SiSupabase;
  if (n.includes('docker'))   return SiDocker;
  if (n.includes('openai') || n.includes('claude') || n.includes('groq') || n.includes('llama') || n.includes('n8n')) return SiOpenai;
  return null;
};

const projectImageMap: Record<string, string> = {
  multicampus: portfolioImages.multicampus,
  paygate: portfolioImages.paygate,
  readmeforge: portfolioImages.readmeforge,
};

function resolveProjectImage(project: Project) {
  if (project.type === 'case') return portfolioImages.make;
  return projectImageMap[project.githubRepo ?? ''] ?? portfolioImages.dev;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  wide?: boolean;
}

const ProjectCard = memo(function ProjectCard({ project, onClick, wide = false }: ProjectCardProps) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = useState(false);
  const projectImage = resolveProjectImage(project);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative border transition-colors duration-300 cursor-pointer flex flex-col h-full min-w-0 ${wide ? 'md:flex-row' : ''}`}
      style={{
        backgroundColor: isHovered ? 'var(--bg-elevated)' : 'var(--bg-surface)',
        borderColor: isHovered ? 'var(--border-muted)' : 'var(--border-subtle)',
        contain: 'layout paint',
      }}
    >
      <div
        className={`relative overflow-hidden border-b shrink-0 ${wide ? 'md:w-2/5 md:border-b-0 md:border-r h-64' : 'h-48 sm:h-56'}`}
        style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-elevated)' }}
      >
        <img
          src={projectImage}
          alt={project.title}
          decoding="async"
          className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.03] transition-transform duration-500 block"
          style={{ transformOrigin: 'center center', display: 'block' }}
        />
        <div className="absolute top-4 left-4 z-10">
          <div
            className="w-10 h-10 border flex items-center justify-center backdrop-blur-sm"
            style={{
              backgroundColor: isDark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.7)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <Terminal className="w-5 h-5" style={{ color: 'var(--accent)' }} />
          </div>
        </div>
      </div>

      <div className={`p-5 sm:p-6 md:p-8 flex flex-col flex-1 min-w-0 ${wide ? 'md:w-3/5' : ''}`}>
        <h3
          className="text-xl sm:text-2xl font-medium mb-1 transition-colors break-words"
          style={{ color: isHovered ? 'var(--accent)' : 'var(--text-primary)' }}
        >
          <DecryptText text={project.title} isHovered={isHovered} />
        </h3>

        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {project.badges.map((tech, i) => {
            const Icon = getTechIcon(tech);
            return (
              <span
                key={i}
                className="flex items-center gap-1.5 text-[10px] uppercase font-mono px-2.5 py-1 border"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                {Icon && <Icon className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--accent)' }} />}
                {tech}
              </span>
            );
          })}
        </div>

        <p className="text-sm font-light leading-relaxed mt-auto break-words" style={{ color: 'var(--text-secondary)' }}>
          <DecryptText text={project.description[language]} isHovered={isHovered} />
        </p>
      </div>
    </motion.div>
  );
});

export const ProjectsSection = () => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = projectsData.filter(p => p.type === 'project');

  const handleClose = useCallback(() => setSelectedProject(null), []);

  return (
    <section id="projects" className="py-16 sm:py-20 transition-colors duration-400" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-mono block mb-1" style={{ color: 'var(--accent)' }}>
            {language === 'pt' ? 'Repositórios & Produtos' : 'Repositories & Products'}
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {language === 'pt' ? 'Projetos' : 'Projects'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={handleClose} />}
      </AnimatePresence>
    </section>
  );
};

export const ImpactSection = () => {
  const { language } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const cases = projectsData.filter(p => p.type === 'case' && p.id.startsWith('make'));

  return (
    <section id="impact" className="py-16 transition-colors duration-400" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.25em] font-mono block mb-1" style={{ color: 'var(--accent)' }}>
            {language === 'pt' ? 'Impacto Profissional' : 'Professional Impact'}
          </span>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {language === 'pt' ? 'Impacto Profissional' : 'Professional Impact'}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {cases.map(project => {
            const isHovered = hoveredId === project.id;
            return (
              <article
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex flex-col md:flex-row items-start gap-4 md:gap-6 p-3 md:p-4 w-full min-w-0"
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                <div
                  className="w-24 h-24 md:w-36 md:h-36 flex-shrink-0 overflow-hidden aspect-square"
                  style={{ backgroundColor: 'var(--bg-surface)' }}
                >
                  <img
                    src={portfolioImages.make}
                    alt={project.title}
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="w-full md:flex-1 md:min-w-0 flex flex-col">
                  <h3
                    className="text-lg font-medium break-words w-full"
                    style={{ color: 'var(--accent)' }}
                  >
                    <DecryptText text={project.title} isHovered={isHovered} />
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-3 mb-4 w-full">
                    {project.badges.map((tech, i) => {
                      const Icon = getTechIcon(tech);
                      return (
                        <span
                          key={i}
                          className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono rounded max-md:border-0 md:border"
                          style={{
                            backgroundColor: 'var(--bg-base)',
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {Icon && <Icon className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--accent)' }} />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  <p className="text-sm leading-relaxed break-words w-full" style={{ color: 'var(--text-secondary)' }}>
                    <DecryptText text={project.description[language]} isHovered={isHovered} />
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
