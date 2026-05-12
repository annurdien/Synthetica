'use client';
import { useEffect, useRef } from 'react';
import type * as Tone from 'tone';

export function MusicAnimation({ playing = false, audioNodes }: { playing?: boolean, audioNodes?: { waveform: Tone.Waveform } | null }) {
  const wavePathRef = useRef<SVGPathElement>(null);
  const envPathRef = useRef<SVGPathElement>(null);
  const timeHudRef = useRef<HTMLSpanElement>(null);
  const ampHudRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime = performance.now();

    const render = (time: number) => {
      if (!wavePathRef.current) return;
      
      const elapsed = (time - startTime) / 1000;
      
      const width = 800;
      const height = 200;
      const midY = height / 2;
      const numPoints = 800; 
      
      const waveform = audioNodes?.waveform;
      const buffer = waveform ? waveform.getValue() as Float32Array : null;
      
      let hasSignal = false;
      let maxAmp = 0;

      if (playing && buffer && buffer.length > 0) {
        for (let i = 0; i < buffer.length; i++) {
          const absVal = Math.abs(buffer[i]);
          if (absVal > maxAmp) maxAmp = absVal;
          if (absVal > 0.005) hasSignal = true;
        }
      }

      // 1. Update Live HUD (only when playing to save idle performance)
      if (playing) {
        if (timeHudRef.current) timeHudRef.current.innerText = elapsed.toFixed(2) + 's';
        if (ampHudRef.current) ampHudRef.current.innerText = maxAmp.toFixed(3);
      }

      // 2. Draw Amplitude Envelope A(t)
      if (envPathRef.current) {
        if (hasSignal) {
          const envHeight = maxAmp * 120;
          const envPath = `M 0,${midY - envHeight} L ${width},${midY - envHeight} L ${width},${midY + envHeight} L 0,${midY + envHeight} Z`;
          envPathRef.current.setAttribute('d', envPath);
        } else {
          envPathRef.current.setAttribute('d', '');
        }
      }

      // 3. Draw Oscilloscope Waveform
      const points = [];
      for (let i = 0; i <= numPoints; i++) {
        let x = (i / numPoints) * width;
        let y = 0;
        
        if (hasSignal && buffer) {
          const bufferIndex = Math.floor((i / numPoints) * (buffer.length - 1));
          y = buffer[bufferIndex] * 120; 
        } else {
          const nx = (x / width) * Math.PI * 4;
          y = Math.sin(nx - elapsed * 0.5) * 15; 
        }
        
        points.push(`${x},${midY - y}`);
      }
      
      const pathData = `M 0,${midY} L ` + points.join(' L ');
      wavePathRef.current.setAttribute('d', pathData);
      
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [playing, audioNodes]);

  return (
    <div className="w-full h-40 md:h-56 flex flex-col items-center justify-center max-w-4xl mx-auto overflow-hidden opacity-90 relative">
      
      {/* Mathematical Equation & HUD Display */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 transition-all duration-500 z-10 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl shadow-sm">
        {playing ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-serif text-sm md:text-base text-zinc-900 dark:text-zinc-100">
              <span className="italic">f(t) =</span>
              <span>
                A(t) · sin(ω<sub className="font-sans text-[10px]">c</sub> t + I · sin(ω<sub className="font-sans text-[10px]">m</sub> t))
              </span>
            </div>
            
            {/* Live Variable HUD */}
            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
              <span className="opacity-60 text-right">t =</span>
              <span ref={timeHudRef}>0.00s</span>
              
              <span className="opacity-60 text-right">A(t) =</span>
              <span ref={ampHudRef}>0.000</span>
              
              <span className="opacity-60 text-right">I =</span>
              <span>2.500</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 font-serif text-sm md:text-base text-zinc-500 dark:text-zinc-400">
            <span className="italic">f(t) =</span>
            <span>sin(<span className="font-sans">π</span>t)</span>
          </div>
        )}
      </div>

      <svg 
        viewBox="0 0 800 200" 
        preserveAspectRatio="none" 
        className="w-full h-full mt-8"
      >
        {/* Draw mathematical axes */}
        <line x1="0" y1="100" x2="800" y2="100" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800 stroke-1" strokeDasharray="4 4" />
        <line x1="400" y1="0" x2="400" y2="200" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800 stroke-1" strokeDasharray="4 4" />

        {/* Amplitude Envelope A(t) */}
        <path
          ref={envPathRef}
          className="fill-zinc-200/40 dark:fill-zinc-800/40 transition-all duration-75"
        />

        {/* Main Audio Waveform */}
        <path
          ref={wavePathRef}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-900 dark:text-zinc-100 transition-colors duration-500 drop-shadow-sm"
        />
      </svg>
    </div>
  );
}
