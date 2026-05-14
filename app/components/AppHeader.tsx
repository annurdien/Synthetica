'use client';
import { Activity, Volume2 } from 'lucide-react';
import { StudioThemeToggle } from '@/app/components/StudioThemeToggle';
import type { ActiveTab } from '@/app/lib/types';

interface AppHeaderProps {
  activeTab: ActiveTab;
  onSelectSynth: () => void;
  onSelectProducer: () => void;
  bpm: number;
  onBpmChange: (bpm: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  reverb: number;
  onReverbChange: (reverb: number) => void;
}

export function AppHeader({
  activeTab,
  onSelectSynth,
  onSelectProducer,
  bpm,
  onBpmChange,
  volume,
  onVolumeChange,
  reverb,
  onReverbChange,
}: AppHeaderProps) {
  return (
    <header className="h-auto md:h-16 shrink-0 border-b border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between px-4 md:px-8 py-4 sm:py-0 gap-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl z-30">
      <div className="flex items-center justify-between sm:justify-start gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-xl shadow-sm flex items-center justify-center text-white dark:text-zinc-900 font-bold text-lg shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <span className="font-medium tracking-tight text-lg">Synthetica</span>
        </div>

        <div className="flex sm:hidden items-center gap-4 text-sm font-bold">
          <button
            onClick={onSelectSynth}
            className={`border-b-2 py-1 transition-colors uppercase tracking-widest text-[11px] ${activeTab === 'synth' ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100' : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
          >
            Synth
          </button>
          <button
            onClick={onSelectProducer}
            className={`border-b-2 py-1 transition-colors uppercase tracking-widest text-[11px] flex items-center gap-2 ${activeTab === 'producer' ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100' : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
          >
            Producer
          </button>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-6 text-sm font-bold">
        <button
          onClick={onSelectSynth}
          className={`border-b-2 py-1 transition-colors uppercase tracking-widest text-[11px] ${activeTab === 'synth' ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100' : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
        >
          Synth
        </button>
        <button
          onClick={onSelectProducer}
          className={`border-b-2 py-1 transition-colors uppercase tracking-widest text-[11px] flex items-center gap-2 ${activeTab === 'producer' ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100' : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
        >
          Producer
        </button>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-zinc-400 flex-wrap">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">BPM</span>
          <input
            type="number"
            value={bpm}
            onChange={(e) => onBpmChange(parseInt(e.target.value, 10) || 120)}
            className="w-16 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100/50 dark:border-zinc-800/30/30 rounded px-2 py-1 text-xs outline-none focus:border-zinc-400 dark:focus:border-zinc-500 font-mono text-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Volume2 className="w-4 h-4" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-20 sm:w-24 accent-zinc-900 dark:accent-zinc-100"
            aria-label="Master volume"
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Reverb</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={reverb}
            onChange={(e) => onReverbChange(parseFloat(e.target.value))}
            className="w-20 sm:w-24 accent-zinc-900 dark:accent-zinc-100"
            aria-label="Master reverb"
          />
        </div>
        <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800">
          <StudioThemeToggle />
        </div>
      </div>
    </header>
  );
}
