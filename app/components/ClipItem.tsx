'use client';
import { memo, type PointerEvent as ReactPointerEvent } from 'react';
import type { Clip } from '@/app/lib/types';

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
      className={`absolute top-2 bottom-2 rounded shadow-sm text-white overflow-hidden cursor-grab active:cursor-grabbing flex flex-col justify-between transition-none ${isSelected ? 'ring-2 ring-black z-10' : 'hover:brightness-110'}`}
      style={{
        left: `${(clip.startBeat / totalBeats) * 100}%`,
        width: `${(clip.lengthBeats / totalBeats) * 100}%`,
        backgroundColor: clip.color,
      }}
    >
      <div className="p-2 pointer-events-none">
        <span className="text-[10px] font-bold block truncate">{clip.name}</span>
        <span className="font-mono text-[8px] opacity-80 block truncate">{clip.equation}</span>
      </div>

      <div
        onPointerDown={(e) => onPointerDown(e, clip.id, 'resize')}
        className="absolute right-0 top-0 bottom-0 w-4 md:w-2 cursor-ew-resize hover:bg-black/20 bg-black/5 md:bg-transparent"
      />
    </div>
  );
});
