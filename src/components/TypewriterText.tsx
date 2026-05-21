import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;   // initial mount delay
}

export const TypewriterText = ({ text, className = '', delay = 0 }: TypewriterTextProps) => {
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  // On first mount use the passed delay.
  // On language change (text prop changes after wave covers screen),
  // add a small delay (~200ms) so the typewriter starts as the wave begins to retreat.
  const revealDelay = isFirstMount.current ? delay : 0.2;

  return (
    <motion.span
      key={text}                      // re-mounts when text (language) changes
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.018,   // fast, tech-style cadence
            delayChildren: revealDelay,
          },
        },
      }}
      className={className}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden:  { opacity: 0, y: 4 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.12 } },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};
