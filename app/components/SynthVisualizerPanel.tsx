'use client';
import { Visualizer } from '@/components/Visualizer';
import { GraphFunction } from '@/components/GraphFunction';
import type { SynthVisType } from '@/app/lib/types';
import { useTheme } from 'next-themes';

interface SynthVisualizerPanelProps {
  synthVisType: SynthVisType;
  onSetSynthVisType: (type: SynthVisType) => void;
  analyser: AnalyserNode | null;
  equation: string;
  bpm: number;
  isPlaying: boolean;
}

export function SynthVisualizerPanel({
  synthVisType,
  onSetSynthVisType,
  analyser,
  equation,
  bpm,
  isPlaying,
}: SynthVisualizerPanelProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const visColor = isDark ? '#ffffff' : '#000000';

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col min-h-[400px] py-4">
      <div className="absolute top-8 left-0 z-10 flex items-center bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-full p-1">
        <button
          onClick={() => onSetSynthVisType('graph')}
          className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full transition-all duration-300 ${
            synthVisType === 'graph' 
              ? 'bg-white dark:bg-black shadow-sm text-zinc-900 dark:text-white' 
              : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
          }`}
        >
          Graph
        </button>
        <button
          onClick={() => onSetSynthVisType('oscilloscope')}
          className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full transition-all duration-300 ${
            synthVisType === 'oscilloscope' 
              ? 'bg-white dark:bg-black shadow-sm text-zinc-900 dark:text-white' 
              : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
          }`}
        >
          Oscillo
        </button>
        <button
          onClick={() => onSetSynthVisType('spectrum')}
          className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full transition-all duration-300 ${
            synthVisType === 'spectrum' 
              ? 'bg-white dark:bg-black shadow-sm text-zinc-900 dark:text-white' 
              : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
          }`}
        >
          Spectrum
        </button>
      </div>

      <div className="flex-1 w-full h-full p-0 pt-16">
        <div className="w-full h-full opacity-60 dark:opacity-90 transition-opacity duration-700">
          {synthVisType === 'oscilloscope' ? (
            <Visualizer analyser={analyser} type="oscilloscope" color={visColor} />
          ) : synthVisType === 'spectrum' ? (
            <Visualizer analyser={analyser} type="spectrum" color={visColor} />
          ) : (
            <GraphFunction equation={equation} color={visColor} bpm={bpm} isPlaying={isPlaying} />
          )}
        </div>
      </div>
    </div>
  );
}
