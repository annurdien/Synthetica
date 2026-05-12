'use client';
import type { RefObject, PointerEvent as ReactPointerEvent } from 'react';

interface TimelineRulerProps {
  totalBeats: number;
  playheadRef: RefObject<HTMLDivElement | null>;
  onScrubStart: (event: ReactPointerEvent) => void;
}

export function TimelineRuler({ totalBeats, playheadRef, onScrubStart }: TimelineRulerProps) {
  return (
    <div className="flex h-8 bg-zinc-100/50 border-b border-zinc-200 sticky top-0 z-40 shrink-0 cursor-ew-resize" onPointerDown={onScrubStart}>
      <div className="w-20 md:w-32 border-r border-zinc-200 shrink-0 bg-zinc-50 pointer-events-none sticky left-0 z-50"></div>
      <div className="flex-1 relative pointer-events-auto" id="timeline-ruler">
        {Array.from({ length: totalBeats }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 border-l border-zinc-200 text-[10px] text-zinc-400 pl-1 pt-1 font-mono pointer-events-none select-none"
            style={{ left: `${(i / totalBeats) * 100}%` }}
          >
            {i}
          </div>
        ))}

        <div
          ref={playheadRef}
          className="absolute top-0 w-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] transform -translate-x-1/2 z-50 pointer-events-none"
          style={{ left: '0%', height: '2000px' }}
        >
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 cursor-ew-resize pointer-events-auto"
            onPointerDown={onScrubStart}
          ></div>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 pointer-events-none"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
