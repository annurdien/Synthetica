'use client';
import { memo, type PointerEvent as ReactPointerEvent } from 'react';
import { Plus, Volume2, VolumeX } from 'lucide-react';
import { ClipItem } from '@/app/components/ClipItem';
import type { Clip, Track } from '@/app/lib/types';

interface TrackLaneProps {
  track: Track;
  clips: Clip[];
  totalBeats: number;
  selectedClipId: string | null;
  onToggleMute: (trackId: number) => void;
  onAddClip: (trackId: number) => void;
  onClipPointerDown: (event: ReactPointerEvent, clipId: string, type: 'move' | 'resize') => void;
  onDropPreset: (payload: { trackId: number; startBeat: number; eq: string; name: string }) => void;
  onResizeTrack: (trackId: number, height: number) => void;
}

export const TrackLane = memo(function TrackLane({
  track,
  clips,
  totalBeats,
  selectedClipId,
  onToggleMute,
  onAddClip,
  onClipPointerDown,
  onDropPreset,
  onResizeTrack,
}: TrackLaneProps) {
  return (
    <div
      data-trackid={track.id}
      style={{ height: track.height }}
      className={`flex border-b border-zinc-100 group relative ${track.muted ? 'bg-zinc-100 opacity-50' : 'bg-white'}`}
    >
      <div className="w-20 md:w-32 border-r border-zinc-100 flex flex-col items-center justify-center shrink-0 relative bg-zinc-50 sticky left-0 z-20 overflow-hidden">
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400 truncate w-full text-center px-1 md:px-0">
          {track.name}
        </span>
        <button
          onClick={() => onToggleMute(track.id)}
          className={`mt-1 flex items-center gap-1 text-[9px] px-1 md:px-1.5 py-0.5 rounded border border-zinc-200 transition-colors ${track.muted ? 'bg-zinc-200 text-zinc-500' : 'bg-white text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50'}`}
          aria-label={track.muted ? `Unmute ${track.name}` : `Mute ${track.name}`}
        >
          {track.muted ? <VolumeX className="w-2.5 h-2.5 md:w-3 md:h-3" /> : <Volume2 className="w-2.5 h-2.5 md:w-3 md:h-3" />} <span className="hidden md:inline">{track.muted ? 'Muted' : 'Mute'}</span>
        </button>
        <button
          onClick={() => onAddClip(track.id)}
          className="opacity-100 md:opacity-0 group-hover:opacity-100 absolute right-1 top-1 w-4 h-4 md:w-6 md:h-6 rounded bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-opacity"
          title="Add Clip"
          aria-label={`Add clip to ${track.name}`}
        >
          <Plus className="w-2.5 h-2.5 md:w-3 md:h-3" />
        </button>
      </div>
      <div
        className="flex-1 relative hover:bg-zinc-50/30 transition-colors"
        style={{ backgroundImage: 'linear-gradient(to right, #f4f4f5 1px, transparent 1px)', backgroundSize: `calc(100% / ${totalBeats}) 100%` }}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add('bg-blue-50/50');
        }}
        onDragLeave={(e) => {
          e.currentTarget.classList.remove('bg-blue-50/50');
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove('bg-blue-50/50');
          try {
            const data = JSON.parse(e.dataTransfer.getData('application/json')) as { eq?: string; name?: string };
            if (data.eq && data.name) {
              const rect = e.currentTarget.getBoundingClientRect();
              const relativeX = e.clientX - rect.left;
              const startBeat = Math.round(((relativeX / rect.width) * totalBeats) * 4) / 4;
              onDropPreset({ trackId: track.id, startBeat, eq: data.eq, name: data.name });
            }
          } catch (err) {
            return;
          }
        }}
      >
        {clips.map((clip) => (
          <ClipItem
            key={clip.id}
            clip={clip}
            totalBeats={totalBeats}
            isSelected={selectedClipId === clip.id}
            onPointerDown={onClipPointerDown}
          />
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1 cursor-ns-resize hover:bg-blue-500/50 z-30 opacity-0 hover:opacity-100 transition-opacity"
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const target = e.currentTarget as HTMLElement;
          target.setPointerCapture(e.pointerId);

          const startY = e.clientY;
          const startHeight = track.height;

          const onMove = (moveEvent: PointerEvent) => {
            const deltaY = moveEvent.clientY - startY;
            const newHeight = Math.max(60, Math.min(300, startHeight + deltaY));
            onResizeTrack(track.id, newHeight);
          };

          const onUp = (upEvent: PointerEvent) => {
            target.releasePointerCapture(upEvent.pointerId);
            target.removeEventListener('pointermove', onMove);
            target.removeEventListener('pointerup', onUp);
          };

          target.addEventListener('pointermove', onMove);
          target.addEventListener('pointerup', onUp);
        }}
      ></div>
    </div>
  );
});
