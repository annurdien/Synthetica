'use client';
import { Layers, PanelRight, PanelRightClose } from 'lucide-react';
import type { LibraryItem } from '@/app/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface SynthLibraryPanelProps {
  isVisible: boolean;
  library: LibraryItem[];
  equation: string;
  onSelectPreset: (preset: LibraryItem) => void;
  onHide: () => void;
  onShow: () => void;
}

export function SynthLibraryPanel({
  isVisible,
  library,
  equation,
  onSelectPreset,
  onHide,
  onShow,
}: SynthLibraryPanelProps) {
  return (
    <aside
      className={`shrink-0 border-l border-black/5 dark:border-white/10 flex flex-col bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl transition-all duration-500 z-20 absolute md:relative top-0 right-0 bottom-0 ${
        isVisible ? 'w-full sm:w-80 translate-x-0' : 'w-16 translate-x-full md:translate-x-0'
      } shadow-2xl md:shadow-none h-full`}
    >
      <AnimatePresence mode="wait">
        {isVisible ? (
          <motion.div 
            key="visible"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full overflow-hidden"
          >
            {/* Sticky Header */}
            <div className="p-8 pb-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-zinc-400" />
                <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.3em]">
                  Library
                </h3>
              </div>
              <button 
                onClick={onHide} 
                className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300"
              >
                <PanelRightClose className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-3">
              {library.map((preset) => {
                const isActive = equation === preset.eq;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onSelectPreset(preset)}
                    className={`w-full text-left group relative flex flex-col p-4 rounded-2xl transition-all duration-300 border ${
                      isActive
                        ? 'bg-black dark:bg-white text-white dark:text-black border-transparent shadow-xl scale-[1.02]'
                        : 'bg-white/50 dark:bg-zinc-800/30 border-black/5 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:border-black/20 dark:hover:border-white/20 hover:scale-[1.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-semibold tracking-tight ${isActive ? 'text-white dark:text-black' : 'text-zinc-900 dark:text-zinc-100'}`}>
                        {preset.name}
                      </span>
                      <span className={`text-[10px] font-mono ${isActive ? 'opacity-70' : 'opacity-40'}`}>
                        {preset.bpm}
                      </span>
                    </div>
                    <div className={`font-mono text-[9px] truncate ${isActive ? 'opacity-60' : 'opacity-30'}`}>
                      {preset.eq}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-8 gap-6"
          >
            <button
              onClick={onShow}
              className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300"
              title="Show Library"
            >
              <PanelRight className="w-5 h-5" />
            </button>
            <div className="w-px h-12 bg-black/5 dark:bg-white/5"></div>
            <Layers className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
