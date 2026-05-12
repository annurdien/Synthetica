'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

export function LaunchButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href="/studio"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans font-bold uppercase tracking-widest text-sm transition-colors border-2 border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 overflow-hidden hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer"
    >
      <span>Launch Studio</span>
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M 4 12 L 20 12"
          initial={false}
          animate={{
            pathLength: isHovered ? 1 : 0.4,
            pathOffset: isHovered ? 0 : 0.6,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.path
          d="M 14 6 L 20 12 L 14 18"
          initial={false}
          animate={{
            x: isHovered ? 0 : -6,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.svg>
    </Link>
  );
}
