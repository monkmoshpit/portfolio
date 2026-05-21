import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allPortfolioImageUrls } from '../assets/portfolioImages';
import { preloadImages } from '../utils/preloadImages';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    preloadImages(allPortfolioImageUrls);
  }, []);

  useEffect(() => {
    // Simulate loading progress with variable increments to feel organic
    let currentProgress = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 8) + 2; // Increments of 2-10%
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        // Add a slight delay at 100% for visual satisfaction, then fade out
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 800); // Allow exit animations to finish
        }, 600);
      }
    }, 80); // Speed of count

    return () => clearInterval(interval);
  }, [onComplete]);

  // SVG Circular progress math
  const radius = 60;
  const strokeWidth = 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.02,
            filter: "blur(8px)",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center font-sans overflow-hidden"
        >
          {/* Subtle background noise texture */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

          {/* Central circular loader wrapper */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            
            {/* Pulsing Ripple Waves radiating outward */}
            <AnimatePresence>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0.3 }}
                  animate={{ 
                    scale: [0.8, 2.5], 
                    opacity: [0.35, 0] 
                  }}
                  transition={{ 
                    duration: 3.5, 
                    repeat: Infinity, 
                    delay: i * 1.1,
                    ease: "easeOut"
                  }}
                  style={{
                    border: '1px solid rgba(16, 185, 129, 0.15)', // emerald-500
                  }}
                  className="absolute w-48 h-48 rounded-full pointer-events-none"
                />
              ))}
            </AnimatePresence>

            {/* Circular Progress SVG */}
            <svg className="w-48 h-48 transform -rotate-90">
              {/* Outer static track */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                className="stroke-zinc-800 fill-transparent"
                strokeWidth={strokeWidth}
              />
              {/* Animated active track */}
              <motion.circle
                cx="96"
                cy="96"
                r={radius}
                className="stroke-emerald-500 fill-transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Percentage Counter */}
            <div className="absolute flex flex-col items-center justify-center">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-mono font-extralight tracking-tighter text-zinc-100"
              >
                {progress}%
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
