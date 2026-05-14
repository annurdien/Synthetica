'use client';
import { PanelLeft, Play, Rewind, Settings2, Square, ZoomIn, ZoomOut } from 'lucide-react';

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
    <div className="h-16 border-b border-black/5 dark:border-white/10 flex items-center px-4 md:px-6 gap-2 md:gap-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shrink-0 z-10 shadow-sm relative overflow-x-auto">
      <button className="md:hidden p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100" onClick={onShowLibrary} title="Show Library" aria-label="Show library">
        <PanelLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onRestart}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-100/50 dark:border-zinc-800/30/30 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 transition shrink-0"
        title="Rewind to Start"
        aria-label="Rewind to start"
      >
        <Rewind className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" />
      </button>
      <button
        onClick={onTogglePlay}
        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white dark:text-zinc-900 shadow-sm transition shrink-0 ${isPlaying ? 'bg-zinc-700 hover:bg-zinc-800 dark:bg-zinc-200' : 'bg-blue-600 hover:bg-blue-700'}`}
        aria-label={isPlaying ? 'Stop timeline' : 'Play timeline'}
      >
        {isPlaying ? <Square className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" /> : <Play className="w-3 h-3 md:w-4 md:h-4 ml-1" fill="currentColor" />}
      </button>

      <div className="h-6 w-px bg-zinc-200 lg:mx-2 hidden sm:block shrink-0"></div>
      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 whitespace-nowrap hidden sm:inline-block shrink-0">
        Beats: {totalBeats}
      </span>

      <div className="ml-auto flex items-center gap-1 md:gap-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100/50 dark:border-zinc-800/30/30 rounded-lg p-1 shrink-0">
        <button
          onClick={onZoomOut}
          className="w-8 h-8 md:w-6 md:h-6 flex items-center justify-center rounded text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-100 transition"
          title="Zoom Out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4 md:w-3.5 md:h-3.5" />
        </button>
        <span className="text-[10px] font-bold text-zinc-400 w-10 md:w-12 text-center uppercase tracking-widest">{Math.round(timelineZoom * 100)}%</span>
        <button
          onClick={onZoomIn}
          className="w-8 h-8 md:w-6 md:h-6 flex items-center justify-center rounded text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-100 transition"
          title="Zoom In"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4 md:w-3.5 md:h-3.5" />
        </button>
      </div>
      <button className="md:hidden p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 shrink-0" onClick={onShowEditor} title="Show Editor" aria-label="Show editor">
        <Settings2 className="w-5 h-5" />
      </button>
    </div>
  );
}
