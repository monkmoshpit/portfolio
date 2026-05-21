import { motion } from 'framer-motion';

export const AnimatedGrain = () => (
  <motion.div
    className="pointer-events-none absolute -inset-[20%] z-[1] opacity-[0.065] mix-blend-soft-light bg-noise-fine"
    aria-hidden
    animate={{
      x: [0, -10, 0],
      y: [0, 10, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);
