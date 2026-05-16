'use client';
import { 
  Play, 
  Rewind, 
  Square, 
  ZoomIn, 
  ZoomOut,
  Clock,
  Plus,
  Save
} from 'lucide-react';
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
  onNewProject: () => void;
  onSaveProject: () => void;
  timerRef?: RefObject<HTMLSpanElement | null>;
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
  onNewProject,
  onSaveProject,
  timerRef,
}: TransportBarProps) {
  return (
    <div className="h-16 border-b border-black/5 dark:border-white/10 flex items-center px-6 gap-6 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl shrink-0 z-10 relative transition-all duration-500">
      {/* Project Actions Group */}
      <div className="flex items-center gap-2 pr-6 border-r border-black/5 dark:border-white/5">
        <button
          onClick={onNewProject}
          className="w-10 h-10 rounded-xl border border-black/5 dark:border-white/5 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
          title="New Project"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={onSaveProject}
          className="w-10 h-10 rounded-xl border border-black/5 dark:border-white/5 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
          title="Save Project"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      {/* Main Playback Controls */}
      <div className="flex-1 flex items-center justify-center gap-4">
        <button
          onClick={onRestart}
          className="w-10 h-10 rounded-xl border border-black/5 dark:border-white/5 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 active:scale-90"
          title="Rewind to Start"
        >
          <Rewind className="w-4 h-4 fill-current" />
        </button>

        <button
          onClick={onTogglePlay}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 active:scale-95 shadow-2xl relative overflow-hidden group ${
            isPlaying 
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-black' 
              : 'bg-black dark:bg-white text-white dark:text-black'
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isPlaying ? 'pause' : 'play'}
              initial={{ opacity: 0, scale: 0.8, rotate: isPlaying ? -90 : 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: isPlaying ? 0 : 90 }}
              transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
            >
              {isPlaying ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
            </motion.div>
          </AnimatePresence>
        </button>

        <div className="hidden sm:flex flex-col items-center gap-1 min-w-[80px]">
           <div className="flex items-center gap-2">
             <Clock className="w-3 h-3 text-zinc-400" />
             <span ref={timerRef} className="text-[10px] font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tighter">00:00:00</span>
           </div>
           <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">{totalBeats} Beats</span>
        </div>
      </div>

      {/* Utility Area */}
      <div className="flex items-center gap-6 shrink-0">
        <div className="hidden md:flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl p-1 shrink-0">
          <button
            onClick={onZoomOut}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-300"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 w-10 text-center tracking-tighter">{Math.round(timelineZoom * 100)}%</span>
          <button
            onClick={onZoomIn}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-300"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
