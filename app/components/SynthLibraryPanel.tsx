'use client';
import { useState } from 'react';
import { 
  Layers, 
  PanelRight, 
  PanelRightClose, 
  Search, 
  Zap, 
  Waves, 
  Wind,
  Library as LibraryIcon,
  ChevronLeft,
  Music4
} from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLibrary = library.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.eq.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Grouping logic (mocked categories for visual structure)
  const categories = [
    { name: 'Lead & Pluck', icon: Zap, items: filteredLibrary.filter((_, i) => i % 3 === 0) },
    { name: 'Bass & Low', icon: Waves, items: filteredLibrary.filter((_, i) => i % 3 === 1) },
    { name: 'Atmosphere', icon: Wind, items: filteredLibrary.filter((_, i) => i % 3 === 2) },
  ];

  return (
    <aside
      className={`shrink-0 border-l border-black/5 dark:border-white/10 flex flex-col bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl transition-all duration-500 z-20 absolute md:relative top-0 right-0 bottom-0 ${
        isVisible ? 'w-full sm:w-80 translate-x-0' : 'w-16 translate-x-full md:translate-x-0'
      } shadow-2xl md:shadow-none h-full overflow-hidden`}
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
            {/* Header Area */}
            <div className="p-6 pb-2 space-y-6 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-black dark:bg-white flex items-center justify-center">
                    <LibraryIcon className="w-3.5 h-3.5 text-white dark:text-black" />
                  </div>
                  <h3 className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-[0.2em]">
                    Sound Browser
                  </h3>
                </div>
                <button 
                  onClick={onHide} 
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300"
                >
                  <PanelRightClose className="w-4 h-4" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  placeholder="Search sounds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/10 dark:focus:border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs outline-none transition-all placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-1">
              {filteredLibrary.map((preset) => {
                const isActive = equation === preset.eq;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onSelectPreset(preset)}
                    className={`w-full group flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                      isActive 
                        ? 'bg-black dark:bg-white shadow-xl scale-[1.02]' 
                        : 'hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-white/20 dark:bg-black/20 text-white dark:text-black' 
                        : 'bg-black/5 dark:bg-white/5 text-zinc-400 group-hover:scale-110'
                    }`}>
                      <Music4 className="w-3.5 h-3.5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold truncate transition-colors ${
                        isActive ? 'text-white dark:text-black' : 'text-zinc-700 dark:text-zinc-300'
                      }`}>
                        {preset.name}
                      </div>
                      <div className={`flex items-center gap-2 text-[9px] font-mono transition-opacity ${
                        isActive ? 'text-white/60 dark:text-black/60' : 'text-zinc-400'
                      }`}>
                        <span>{preset.bpm} BPM</span>
                        <span className="opacity-40 italic truncate">{preset.eq}</span>
                      </div>
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
            className="flex flex-col items-center py-8 gap-6 h-full cursor-pointer group"
            onClick={onShow}
          >
            <button
              className="w-10 h-10 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-all duration-300"
              title="Show Sound Browser"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-px h-12 bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors"></div>
            <div className="flex-1 flex items-start justify-center">
               <span className="[writing-mode:vertical-lr] text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">Browser</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

