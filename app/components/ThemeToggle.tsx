'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-12 h-12" />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden hover:scale-110 transition-transform duration-300"
      aria-label="Toggle theme"
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{
          rotate: isDark ? 40 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <mask id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <motion.circle
            cx="12"
            cy="12"
            r="5"
            fill="black"
            initial={false}
            animate={{
              cx: isDark ? 16 : 24, // Slides in from the right to cut the circle
              cy: isDark ? 8 : 4,   // Slides in from the top
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          />
        </mask>
        
        {/* Main Sun/Moon body */}
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#moon-mask)"
          initial={false}
          animate={{
            r: isDark ? 9 : 5, // Expands into a larger moon
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        />

        {/* Sun Rays */}
        <motion.g
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.3 : 1,
          }}
          style={{ originX: '12px', originY: '12px' }}
          transition={{ duration: 0.3, ease: 'backIn' }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      </motion.svg>
    </button>
  );
}
