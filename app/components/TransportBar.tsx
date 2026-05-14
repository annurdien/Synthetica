'use client';
import { PanelLeft, Play, Rewind, Settings2, Square, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransportBarProps {
  isPlaying: boolean;
  onRestart: () => void;
  onTogglePlay: () => void;
  totalBeats: number;
  timelineZoom: number;
  onZoomOut: () => void;
  onZoomIn: () => void;
  onShowLibrary: () => void;
  onShowEditor: () => void;
}

export function TransportBar({
  isPlaying,
  onRestart,
  onTogglePlay,
  totalBeats,
  timelineZoom,
  onZoomOut,
  onZoomIn,
  onShowLibrary,
  onShowEditor,
}: TransportBarProps) {
  return (
    <div className="h-20 border-b border-black/5 dark:border-white/10 flex items-center px-6 md:px-10 gap-4 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl shrink-0 z-10 relative transition-colors duration-500">
      <div className="flex items-center gap-3">
        <button
          onClick={onRestart}
          className="w-12 h-12 rounded-full border border-black/5 dark:border-white/10 flex items-center justify-center bg-white/50 dark:bg-zinc-800/50 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:scale-110 transition-all duration-300"
          title="Rewind to Start"
        >
          <Rewind className="w-5 h-5 fill-current" />
        </button>
        <button
          onClick={onTogglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 hover:scale-110 active:scale-95 group ${
            isPlaying 
              ? 'bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/30 text-zinc-900 dark:text-white' 
              : 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black shadow-xl'
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isPlaying ? 'pause' : 'play'}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {isPlaying ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <div className="h-8 w-[1px] bg-black/5 dark:bg-white/5 mx-4 hidden md:block"></div>
      
      <div className="hidden md:flex flex-col gap-1">
        <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-600">Timeline</span>
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          {totalBeats} Beats
        </span>
      </div>

      <div className="ml-auto flex items-center gap-6">
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 rounded-full p-1.5 shadow-inner">
          <button
            onClick={onZoomOut}
            className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white dark:hover:bg-black transition-all duration-300"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 w-14 text-center uppercase tracking-widest">{Math.round(timelineZoom * 100)}%</span>
          <button
            onClick={onZoomIn}
            className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white dark:hover:bg-black transition-all duration-300"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="h-8 w-[1px] bg-black/5 dark:bg-white/5 mx-2 hidden md:block"></div>

        <button className="md:hidden w-10 h-10 rounded-full border border-black/5 dark:border-white/10 flex items-center justify-center bg-white/50 dark:bg-zinc-800/50 text-zinc-400" onClick={onShowEditor}>
          <Settings2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

