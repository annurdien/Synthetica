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
    <div className="flex-1 bg-white border border-zinc-200 rounded-2xl relative overflow-hidden flex flex-col shadow-sm min-h-[300px]">
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex items-center bg-white/90 backdrop-blur border border-zinc-200 rounded-lg overflow-hidden shadow-sm p-1">
        <button
          onClick={() => onSetSynthVisType('graph')}
          className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition ${synthVisType === 'graph' ? 'bg-zinc-100 text-zinc-800' : 'text-zinc-400 hover:text-zinc-600'}`}
        >
          Graph
        </button>
        <button
          onClick={() => onSetSynthVisType('oscilloscope')}
          className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition ${synthVisType === 'oscilloscope' ? 'bg-zinc-100 text-zinc-800' : 'text-zinc-400 hover:text-zinc-600'}`}
        >
          Oscillo
        </button>
        <button
          onClick={() => onSetSynthVisType('spectrum')}
          className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition ${synthVisType === 'spectrum' ? 'bg-zinc-100 text-zinc-800' : 'text-zinc-400 hover:text-zinc-600'}`}
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
