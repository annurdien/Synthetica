'use client';
import { Activity, Volume2 } from 'lucide-react';
import { ThemeToggle } from '@/app/components/ThemeToggle';
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
    <header className="h-auto md:h-20 shrink-0 border-b border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between px-6 md:px-10 py-4 sm:py-0 gap-6 bg-white dark:bg-black z-30 transition-colors duration-500">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 group cursor-default">
          <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black transition-transform group-hover:scale-110 duration-500">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-serif text-2xl font-medium tracking-tight">Synthetica</span>
        </div>

        <nav className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full border border-black/5 dark:border-white/5">
          <button
            onClick={onSelectSynth}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === 'synth'
              ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
          >
            Synth
          </button>
          <button
            onClick={onSelectProducer}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === 'producer'
              ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
          >
            Producer
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden lg:flex items-start pt-2 gap-8">
          <div className="flex flex-col gap-1.5">
            <div className="h-3 flex items-center">
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-600">Tempo (BPM)</span>
            </div>
            <input
              type="number"
              value={bpm}
              onChange={(e) => onBpmChange(parseInt(e.target.value, 10) || 120)}
              className="w-16 bg-transparent border-none p-0 text-base outline-none font-mono text-zinc-900 dark:text-zinc-100 focus:ring-0"
            />
          </div>

          <div className="flex flex-col gap-4 w-28">
            <div className="h-3 flex justify-between items-center">
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-600">Volume</span>
              <Volume2 className="w-3 h-3 text-zinc-400" />
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
            />
          </div>

          <div className="flex flex-col gap-4 w-28">
            <div className="h-3 flex items-center">
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-600">Space (Reverb)</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={reverb}
              onChange={(e) => onReverbChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
            />
          </div>
        </div>

        <div className="h-10 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

        <ThemeToggle />
      </div>
    </header>
  );
}

