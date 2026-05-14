'use client';
import { memo, type PointerEvent as ReactPointerEvent } from 'react';
import type { Clip } from '@/app/lib/types';
import { Music4 } from 'lucide-react';

interface ClipItemProps {
  clip: Clip;
  totalBeats: number;
  isSelected: boolean;
  onPointerDown: (event: ReactPointerEvent, clipId: string, type: 'move' | 'resize') => void;
}

export const ClipItem = memo(function ClipItem({ clip, totalBeats, isSelected, onPointerDown }: ClipItemProps) {
  return (
    <div
      onPointerDown={(e) => onPointerDown(e, clip.id, 'move')}
      className={`absolute top-2 bottom-2 rounded-lg shadow-lg text-white overflow-hidden cursor-grab active:cursor-grabbing flex flex-col transition-all duration-300 border border-white/10 ${
        isSelected 
          ? 'ring-2 ring-black dark:ring-white z-10 scale-[1.01] brightness-125' 
          : 'hover:brightness-110'
      }`}
      style={{
        left: `${(clip.startBeat / totalBeats) * 100}%`,
        width: `${(clip.lengthBeats / totalBeats) * 100}%`,
        backgroundColor: clip.color,
        backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
        willChange: 'left, width',
        transform: 'translateZ(0)'
      }}
    >
      <div className="p-2.5 pointer-events-none flex flex-col gap-1">
        <div className="flex items-center gap-1.5 overflow-hidden">
           <Music4 className="w-3 h-3 shrink-0 opacity-60" />
           <span className="text-[10px] font-bold truncate tracking-tight uppercase">{clip.name}</span>
        </div>
        <div className="font-mono text-[8px] opacity-40 italic truncate bg-black/10 px-1 rounded py-0.5">
          {clip.equation}
        </div>
      </div>

      {/* Resize Handle */}
      <div
        onPointerDown={(e) => {
          e.stopPropagation();
          onPointerDown(e, clip.id, 'resize');
        }}
        className="absolute right-0 top-0 bottom-0 w-2.5 cursor-ew-resize hover:bg-white/20 bg-black/5 flex items-center justify-center group"
      >
         <div className="w-0.5 h-4 bg-white/20 rounded-full group-hover:bg-white/40 transition-colors" />
      </div>

      {/* Selected Indicator Bar */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
      )}
    </div>
  );
});

