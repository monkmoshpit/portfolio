import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const WaveTransition = () => {
  const { transitioning } = useLanguage();

  // Organic wave path — flat left edge, curved right edge
  const path = 'M0,0 L700,0 C900,250 600,750 800,1000 L0,1000 Z';

  // Timing calibration:
  // The language switches at 820ms.
  // Each layer must be COVERING the screen at that exact moment.
  // Layer 1 (fastest): crosses in 1.0s  — peaks ~500ms
  // Layer 2 (mid):     crosses in 1.2s  — peaks ~600ms
  // Layer 3 (front):   crosses in 1.55s — peaks at ~820ms (this is the "mask" moment)
  // After the front wave peaks (820ms), language switches underneath.
  // Then the wave continues exiting to the right, revealing fresh content.

  const easing: [number, number, number, number] = [0.76, 0, 0.24, 1];

  return (
    <div className="fixed inset-0 z-[150] pointer-events-none overflow-hidden" aria-hidden>
      <AnimatePresence>
        {transitioning && (
          <motion.div key="wave" className="absolute inset-0">

            {/* Layer 1 — back, lightest, fastest */}
            <motion.svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full"
              style={{ width: '150vw', fill: 'rgba(16,185,129,0.07)' }}
              initial={{ x: '-110vw' }}
              animate={{ x: '120vw' }}
              transition={{ duration: 1.0, ease: easing }}
            >
              <path d={path} />
              {/* subtle outline on wave edge */}
              <path d={path} fill="none" stroke="rgba(16,185,129,0.04)" strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
            </motion.svg>

            {/* Layer 2 — middle */}
            <motion.svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full"
              style={{ width: '150vw', fill: 'rgba(24,24,27,0.65)' }}
              initial={{ x: '-110vw' }}
              animate={{ x: '120vw' }}
              transition={{ duration: 1.2, ease: easing, delay: 0.08 }}
            >
              <path d={path} />
              <path d={path} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
            </motion.svg>

            {/* Layer 3 — front, opaque "mask" layer — language flips while this covers screen */}
            <motion.svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full"
              style={{ width: '150vw', fill: 'rgba(9,9,11,0.97)' }}
              initial={{ x: '-110vw' }}
              animate={{ x: '120vw' }}
              transition={{ duration: 1.55, ease: easing, delay: 0.16 }}
            >
              <path d={path} />
              {/* front outline to soften flat edge on both sides */}
              <path d={path} fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
            </motion.svg>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
