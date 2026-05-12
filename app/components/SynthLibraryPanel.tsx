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
      className={`shrink-0 border-l border-zinc-100 flex flex-col bg-white overflow-y-auto transition-all duration-300 z-20 absolute md:relative top-0 right-0 bottom-0 ${isVisible ? 'w-full sm:w-80 translate-x-0' : 'w-12 translate-x-full md:translate-x-0'} shadow-2xl md:shadow-none`}
    >
      {isVisible ? (
        <div className="p-6 space-y-4 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4" /> My Library
            </h3>
            <button onClick={onHide} className="p-2 md:p-0 text-zinc-400 hover:text-zinc-800 transition" title="Hide Library" aria-label="Hide library">
              <PanelRightClose className="w-5 h-5 md:w-4 md:h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {library.map((preset) => (
              <div
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className="flex flex-col gap-1 p-3 rounded-lg border border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 cursor-pointer text-zinc-700 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${equation === preset.eq ? 'bg-blue-600' : 'bg-zinc-300'}`}></div>
                    <span className="text-sm font-bold truncate">{preset.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">{preset.bpm}</span>
                </div>
                <div className="pl-4 font-mono text-[9px] text-zinc-400 truncate opacity-60">{preset.eq}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-6 gap-4">
          <button
            onClick={onShow}
            className="p-2 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors"
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
