import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Custom physics configuration for a fluid "lerp/easing" delay effect
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10); // Center the 20px circle
      mouseY.set(e.clientY - 10);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Listen for mouse movement
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Dynamic hover scaling on links, buttons, inputs, and interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('interactive-item') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);

    // Set custom class on body to apply global `cursor: none` styles
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.85)',
        borderColor: isHovered ? 'rgba(16, 185, 129, 0.85)' : 'rgba(16, 185, 129, 0)',
        borderWidth: isHovered ? '1px' : '0px',
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] hidden md:block pointer-events-none"
    />
  );
};
