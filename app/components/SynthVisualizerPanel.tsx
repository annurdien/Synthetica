'use client';
import { Visualizer } from '@/components/Visualizer';
import { GraphFunction } from '@/components/GraphFunction';
import type { SynthVisType } from '@/app/lib/types';

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
  return (
    <div className="flex-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl relative overflow-hidden flex flex-col shadow-lg min-h-[300px]">
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex items-center bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-xl overflow-hidden shadow-sm p-1">
        <button
          onClick={() => onSetSynthVisType('graph')}
          className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition ${synthVisType === 'graph' ? 'bg-white shadow-sm dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
        >
          Graph
        </button>
        <button
          onClick={() => onSetSynthVisType('oscilloscope')}
          className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition ${synthVisType === 'oscilloscope' ? 'bg-white shadow-sm dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
        >
          Oscillo
        </button>
        <button
          onClick={() => onSetSynthVisType('spectrum')}
          className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition ${synthVisType === 'spectrum' ? 'bg-white shadow-sm dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
        >
          Spectrum
        </button>
      </div>

      <div className="flex-1 w-full h-full p-4 pt-16">
        {synthVisType === 'oscilloscope' ? (
          <Visualizer analyser={analyser} type="oscilloscope" color="#3b82f6" />
        ) : synthVisType === 'spectrum' ? (
          <Visualizer analyser={analyser} type="spectrum" color="#10b981" />
        ) : (
          <GraphFunction equation={equation} color="#3b82f6" bpm={bpm} isPlaying={isPlaying} />
        )}
      </div>
    </div>
  );
}
