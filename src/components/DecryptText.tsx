import { useState, useEffect, useRef, memo } from 'react';
import { useLanguage } from '../context/LanguageContext';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>{}[]";

interface DecryptTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

function useCanHoverDecrypt() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);
    const onChange = () => setCanHover(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return canHover;
}

export const DecryptText = memo(function DecryptText({ text, isHovered, className }: DecryptTextProps) {
  const { language } = useLanguage();
  const canHover = useCanHoverDecrypt();
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!canHover || !isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const totalIterations = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index];
            return char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= totalIterations) {
        clearInterval(intervalRef.current!);
      }

      iteration += Math.max(2, text.length / 15);
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text, language, canHover]);

  return <span className={className}>{displayText}</span>;
});
