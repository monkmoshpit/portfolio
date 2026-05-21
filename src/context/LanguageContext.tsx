import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextProps {
  language: Language;
  transitioning: boolean;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('pt')) {
      setTimeout(() => {
        setLanguage('pt');
      }, 0);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    if (transitioning) return; // block double-clicks during transition

    setTransitioning(true);

    // Switch language AFTER the front wave layer covers the screen (~820ms)
    const switchDelay = 820;
    const doneDelay   = 1700;

    const switchTimer = setTimeout(() => {
      setTimeout(() => {
        setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
      }, 0);
    }, switchDelay);

    const doneTimer = setTimeout(() => {
      setTransitioning(false);
    }, doneDelay);

    return () => {
      clearTimeout(switchTimer);
      clearTimeout(doneTimer);
    };
  }, [transitioning]);

  return (
    <LanguageContext.Provider value={{ language, transitioning, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
};
