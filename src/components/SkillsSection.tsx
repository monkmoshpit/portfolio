import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, LayoutTemplate, ShieldCheck } from 'lucide-react';
import { skills } from '../skills';
import { useLanguage } from '../context/LanguageContext';
import type { Skill } from '../skills';

export function SkillsSection() {
  const { language } = useLanguage();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    {
      id: 'Core Backend' as const,
      title: language === 'pt' ? 'Arquitetura Backend' : 'Core Backend Architecture',
      icon: Server,
    },
    {
      id: 'Frontend Systems' as const,
      title: language === 'pt' ? 'Sistemas Frontend' : 'Frontend & Client Layers',
      icon: LayoutTemplate,
    },
    {
      id: 'Architecture & DevOps' as const,
      title: language === 'pt' ? 'DevOps & Segurança' : 'Quality, Security & Ops',
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 relative font-sans transition-colors duration-400"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div>
            <span
              className="text-xs uppercase tracking-[0.25em] font-mono block mb-1"
              style={{ color: 'var(--accent)' }}
            >
              {language === 'pt' ? 'Capacidades' : 'Capabilities'}
            </span>
            <h2
              className="text-3xl md:text-5xl font-light tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {language === 'pt' ? 'Stack Técnico' : 'Technical Stack'}
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map(cat => {
            const catSkills = skills.filter(s => s.category === cat.id);
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                className="relative rounded-2xl p-8 flex flex-col justify-between border transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                {/* Category header */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: 'var(--bg-elevated)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-medium leading-tight"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {cat.title}
                      </h3>
                      <span
                        className="text-[10px] font-mono tracking-widest uppercase"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {catSkills.length} {language === 'pt' ? 'Módulos' : 'Modules'}
                      </span>
                    </div>
                  </div>

                  {/* Skill nodes */}
                  <div className="space-y-3">
                    {catSkills.map((skill: Skill) => {
                      const isHovered = hoveredSkill === skill.name[language];
                      return (
                        <div
                          key={skill.name[language]}
                          onMouseEnter={() => setHoveredSkill(skill.name[language])}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className="relative p-3.5 rounded-lg border transition-all duration-200 cursor-none select-none group"
                          style={{
                            backgroundColor: isHovered ? 'var(--bg-elevated)' : 'var(--bg-base)',
                            borderColor: isHovered ? 'var(--border-muted)' : 'var(--border-subtle)',
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className="text-sm font-mono font-medium transition-colors"
                              style={{ color: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                            >
                              {skill.name[language]}
                            </span>
                            <span
                              className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                              style={{ backgroundColor: isHovered ? 'var(--accent)' : 'var(--border-muted)' }}
                            />
                          </div>

                          <motion.div
                            initial={false}
                            animate={{
                              height:    isHovered ? 'auto' : 0,
                              opacity:   isHovered ? 1 : 0,
                              marginTop: isHovered ? 8 : 0,
                            }}
                            transition={{ duration: 0.22, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p
                              className="text-xs leading-relaxed border-t pt-2 font-light"
                              style={{
                                color: 'var(--text-muted)',
                                borderColor: 'var(--border-subtle)',
                              }}
                            >
                              {skill.description[language]}
                            </p>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="mt-8 pt-4 border-t flex justify-between items-center text-[10px] font-mono"
                  style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                >
                  <span>
                    LAYER // 0{cat.id === 'Core Backend' ? 1 : cat.id === 'Frontend Systems' ? 2 : 3}
                  </span>
                  <span style={{ opacity: 0.4 }}>● ● ●</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
