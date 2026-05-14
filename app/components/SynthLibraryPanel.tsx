'use client';
import { Layers, PanelRight, PanelRightClose } from 'lucide-react';
import type { LibraryItem } from '@/app/lib/types';

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
      className={`shrink-0 border-l border-black/5 dark:border-white/10 flex flex-col bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl overflow-y-auto transition-all duration-300 z-20 absolute md:relative top-0 right-0 bottom-0 ${isVisible ? 'w-full sm:w-80 translate-x-0' : 'w-12 translate-x-full md:translate-x-0'} shadow-2xl md:shadow-none`}
    >
      {isVisible ? (
        <div className="p-6 space-y-4 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" /> Sound Library
            </h3>
            <button onClick={onHide} className="p-2 md:p-0 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition" title="Hide Library" aria-label="Hide library">
              <PanelRightClose className="w-5 h-5 md:w-4 md:h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {library.map((preset) => {
              const isActive = equation === preset.eq;
              return (
                <div
                  key={preset.id}
                  onClick={() => onSelectPreset(preset)}
                  className={`group relative flex flex-col p-3 rounded-2xl cursor-pointer transition-all border border-transparent ${
                    isActive
                      ? 'bg-zinc-900/5 dark:bg-white/10 text-zinc-900 dark:text-white shadow-sm border-black/5 dark:border-white/10'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-900/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold truncate ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'}`}>
                      {preset.name}
                    </span>
                    <span className={`text-[10px] font-mono opacity-60 ${isActive ? 'text-zinc-900 dark:text-zinc-300' : 'text-zinc-400'}`}>
                      {preset.bpm}
                    </span>
                  </div>
                  <div className={`font-mono text-[10px] truncate mt-1 ${isActive ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-400 dark:text-zinc-500 opacity-60'}`}>
                    {preset.eq}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-6 gap-4">
          <button
            onClick={onShow}
            className="p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            title="Show Library"
            aria-label="Show library"
          >
            <PanelRight className="w-4 h-4" />
          </button>
          <div className="w-px h-8 bg-zinc-200"></div>
          <Layers className="w-4 h-4 text-zinc-300" />
        </div>
      )}
    </aside>
  );
}
