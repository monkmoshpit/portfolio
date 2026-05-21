import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>{}[]";

interface DecryptTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

export const DecryptText = ({ text, isHovered, className }: DecryptTextProps) => {
  const { language } = useLanguage();
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const measurerRef = useRef<HTMLSpanElement | null>(null);
  const [measured, setMeasured] = useState({ width: 0, height: 0 });

  // Trigger effect when hovered or when language changes
  useEffect(() => {
    let iteration = 0;
    const totalIterations = text.length;
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    if (isHovered) {
      intervalRef.current = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        
        if (iteration >= totalIterations) {
          clearInterval(intervalRef.current!);
        }
        
        iteration += Math.max(2, text.length / 15); // Dynamic speed based on length
      }, 30);
    } else {
      setTimeout(() => {
        setDisplayText(text);
      }, 0);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text, language]);

  // Measure original text to lock dimensions during animation
  const measure = () => {
    requestAnimationFrame(() => {
      const m = measurerRef.current;
      if (m) {
        setMeasured({ width: m.offsetWidth, height: m.offsetHeight });
      }
    });
  };

  useLayoutEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [text]);

  const style: React.CSSProperties = measured.width
    ? {
        display: 'inline-block',
        width: measured.width,
        minHeight: measured.height,
        whiteSpace: 'inherit',
        wordBreak: 'normal',
        overflowWrap: 'normal',
      }
    : { whiteSpace: 'pre-wrap' };

  return (
    <>
      <span ref={measurerRef} style={{ position: 'absolute', visibility: 'hidden', height: 'auto', whiteSpace: 'pre-wrap' }} aria-hidden>
        {text}
      </span>
      <span className={className} style={style}>
        {displayText}
      </span>
    </>
  );
};
