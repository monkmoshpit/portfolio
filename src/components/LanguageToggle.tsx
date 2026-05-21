import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

import ptFlag from '../assets/PT.webp';
import enFlag from '../assets/EN.webp';

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-[60] flex items-center gap-2 p-1.5 rounded-full bg-slate-900/40 backdrop-blur-sm border border-white/10 hover:bg-slate-800/60 transition-colors duration-300 shadow-xl group"
      aria-label="Alternar idioma"
    >
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-slate-800/50">
        <motion.img
          src={ptFlag}
          alt="PT"
          className={`absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80 ${language === 'pt' ? 'opacity-100 z-10' : 'opacity-40 z-0'}`}
        />
      </div>
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-slate-800/50">
        <motion.img
          src={enFlag}
          alt="EN"
          className={`absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80 ${language === 'en' ? 'opacity-100 z-10' : 'opacity-40 z-0'}`}
        />
      </div>
    </button>
  );
};
