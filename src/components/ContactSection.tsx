import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { DecryptText } from './DecryptText';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { AnimatedGrain } from './AnimatedGrain';

export const WHATSAPP_URL = 'https://wa.me/5511965450513';

export const ContactSection = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [titleHovered, setTitleHovered] = useState(false);

  const copy = {
    pt: {
      tag: '// contato',
      line1: 'DISPONÍVEL PARA',
      line2: '',
      line3: 'NOVOS PROJETOS.',
      support:
        'Freelance, produto ou arquitetura — se o problema é técnico e tem escopo, faz sentido conversar. Chama no WhatsApp com contexto do projeto.',
      cta: 'ENTRAR EM CONTATO',
    },
    en: {
      tag: '// contact',
      line1: 'OPEN FOR',
      line2: '',
      line3: 'NEW PROJECTS.',
      support:
        'Freelance, product work, or architecture — if the problem is technical and scoped, it is worth a chat. Message on WhatsApp with project context.',
      cta: 'GET IN TOUCH',
    },
  };

  const t = copy[language];

  /** Cores invertidas em relação ao tema global */
  const inv = {
    bg: isDark ? '#f9fafb' : '#09090b',
    border: isDark ? '#e6e8eb' : '#27272a',
    textPrimary: isDark ? '#0f1724' : '#fafafa',
    textSecondary: isDark ? '#374151' : '#a1a1aa',
    stroke: isDark ? 'rgba(15, 23, 36, 0.9)' : 'rgba(250, 250, 250, 0.85)',
    accent: isDark ? '#059669' : '#10b981',
    /** Site light → seção escura → botão verde sólido */
    btnBg: isDark ? 'rgba(5, 150, 105, 0.12)' : '#059669',
    btnBorder: isDark ? 'rgba(5, 150, 105, 0.4)' : '#047857',
    btnColor: isDark ? '#059669' : '#ffffff',
  };

  return (
    <section
      id="contact"
      className="relative min-h-[75vh] flex flex-col transition-colors duration-400 overflow-hidden border-t"
      style={{
        backgroundColor: inv.bg,
        borderColor: inv.border,
        color: inv.textPrimary,
      }}
    >
      <AnimatedGrain />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24 lg:py-28 text-center">
        <p
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] mb-6 md:mb-8"
          style={{ color: inv.accent }}
          onMouseEnter={() => setTitleHovered(true)}
          onMouseLeave={() => setTitleHovered(false)}
        >
          <DecryptText text={t.tag} isHovered={titleHovered} />
        </p>

        <h2
          className="font-sans font-bold uppercase tracking-tight leading-[0.95] mb-8 md:mb-10"
          style={{ color: inv.textPrimary }}
        >
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            {t.line1}
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-1 md:mt-2">
            {t.line2}
          </span>
          <span
            className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-1 md:mt-2 text-transparent"
            style={{ WebkitTextStroke: `1.5px ${inv.stroke}` }}
          >
            {t.line3}
          </span>
        </h2>

        <p
          className="max-w-xl mx-auto text-sm md:text-base lg:text-lg font-light leading-relaxed mb-10 md:mb-12"
          style={{ color: inv.textSecondary }}
        >
          {t.support}
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-4.5 rounded-full font-mono text-xs md:text-sm font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:opacity-90 active:scale-[0.98]"
          style={{
            backgroundColor: inv.btnBg,
            border: `1px solid ${inv.btnBorder}`,
            color: inv.btnColor,
            boxShadow: 'none',
          }}
        >
          <FaWhatsapp className="w-5 h-5 shrink-0" aria-hidden />
          {t.cta}
        </a>
      </div>

      <div
        className="relative z-10 w-full py-8 text-center border-t shrink-0"
        style={{ borderColor: inv.border }}
      >
        <p className="text-xs font-mono tracking-wide" style={{ color: inv.textSecondary }}>
          {language === 'pt'
            ? '© 2026 Guilherme de Oliveira. Todos os direitos reservados.'
            : '© 2026 Guilherme de Oliveira. All rights reserved.'}
        </p>
      </div>
    </section>
  );
};
