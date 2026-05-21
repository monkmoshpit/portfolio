import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../projects';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ProjectModal } from './ProjectModal';
import { Terminal } from 'lucide-react';
import type { Project } from '../projects';
import { DecryptText } from './DecryptText';

import {
  SiPhp, SiLaravel, SiReact, SiTypescript, SiVite, SiTailwindcss,
  SiDocker, SiRedis, SiMysql, SiSupabase, SiPostgresql, SiOpenai
} from 'react-icons/si';

import devImg from '../assets/dev.png';
import multicampusImg from '../assets/multicampus.png';
import paygateImg from '../assets/paygate.png';
import readmeforgeImg from '../assets/readme.png';
import makeImg from '../assets/make.png';


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

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  wide?: boolean;
}

const ProjectCard = ({ project, onClick, wide = false }: ProjectCardProps) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = useState(false);

  const projectImage =
  project.githubRepo === 'multicampus'
    ? multicampusImg
    : project.githubRepo === 'paygate'
    ? paygateImg
    : project.githubRepo === 'readmeforge'
    ? readmeforgeImg
    : devImg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative border transition-all duration-300 cursor-pointer flex flex-col h-full ${wide ? 'md:flex-row' : ''} min-w-0`}
      style={{
        backgroundColor: isHovered ? 'var(--bg-elevated)' : 'var(--bg-surface)',
        borderColor: isHovered ? 'var(--border-muted)' : 'var(--border-subtle)',
        contain: 'layout paint',
      }}
    >
      {/* Cover image */}
      <div
        className={`relative overflow-hidden border-b ${wide ? 'md:w-2/5 md:border-b-0 md:border-r h-64' : 'h-56'}`}
        style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-elevated)' }}
      >
        <img
          src={projectImage}
          alt={project.title}
          className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 block"
          style={{ transformOrigin: 'center center', willChange: 'transform', display: 'block' }}
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

      {/* Body */}
      <div className={`p-6 md:p-8 flex flex-col flex-1 min-w-0 ${wide ? 'md:w-3/5' : ''}`}>
        <h3
          className="text-2xl font-medium mb-1 transition-colors truncate"
          style={{ color: isHovered ? 'var(--accent)' : 'var(--text-primary)', overflow: 'hidden' }}
        >
          <DecryptText text={project.title} isHovered={isHovered} />
        </h3>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.badges.map((tech, i) => {
            const Icon = getTechIcon(tech);
            return (
              <span
                key={i}
                className="flex items-center gap-1.5 text-[10px] uppercase font-mono px-2.5 py-1 border whitespace-nowrap"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                {Icon && <Icon className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--accent)' }} />}
                {tech}
              </span>
            );
          })}
        </div>

        <p className="text-sm font-light leading-relaxed mt-auto break-words " style={{ color: 'var(--text-secondary)' }}>
          <DecryptText text={project.description[language]} isHovered={isHovered} />
        </p>
      </div>
    </motion.div>
  );
};

// ── PROJECTS SECTION (type === 'project') ──
export const ProjectsSection = () => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = projectsData.filter(p => p.type === 'project');

  return (
    <section id="projects" className="py-20 transition-colors duration-400" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-mono block mb-1" style={{ color: 'var(--accent)' }}>
            {language === 'pt' ? 'Repositórios & Produtos' : 'Repositories & Products'}
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {language === 'pt' ? 'Projetos' : 'Projects'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
};

// ── IMPACT SECTION (make cases) ──
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
                className="flex items-start gap-6 p-4 rounded-none"
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                <div className="w-36 h-36 flex-shrink-0 overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                  <img src={makeImg} alt={project.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium mb-1 whitespace-nowrap truncate" style={{ color: 'var(--accent)', overflow: 'hidden' }}>
                    <DecryptText text={project.title} isHovered={isHovered} />
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.badges.map((tech, i) => {
                      const Icon = getTechIcon(tech);
                      return (
                        <span
                          key={i}
                          className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono rounded"
                          style={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
                        >
                          {Icon && <Icon className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--accent)' }} />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  <p className="text-sm mb-0" style={{ color: 'var(--text-secondary)' }}>
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
