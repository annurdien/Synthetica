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
  onSetTrackVolume: (trackId: number, volume: number) => void;
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
  onSetTrackVolume,
  onAddClip,
  onClipPointerDown,
  onDropPreset,
  onResizeTrack,
}: TrackLaneProps) {
  const volumePercent = Math.round((track.volume ?? 1) * 100);

  return (
    <div
      data-trackid={track.id}
      style={{ height: track.height }}
      className={`flex border-b border-zinc-100 group relative ${track.muted ? 'bg-zinc-100 opacity-50' : 'bg-white'}`}
    >
      {/* Track header */}
      <div className="w-20 md:w-32 border-r border-zinc-100 flex flex-col justify-center shrink-0 relative bg-zinc-50 sticky left-0 z-20 overflow-hidden px-1.5 md:px-2 py-1 gap-1">
        {/* Row 1: Track name */}
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400 truncate">
          {track.name}
        </span>

        {/* Row 2: Mute button + volume % */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleMute(track.id)}
            className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded border transition-colors shrink-0 ${track.muted ? 'bg-red-100 border-red-300 text-red-500' : 'bg-white border-zinc-200 text-zinc-400 hover:text-zinc-600 hover:border-zinc-300'}`}
            aria-label={track.muted ? `Unmute ${track.name}` : `Mute ${track.name}`}
            title={track.muted ? 'Unmute' : 'Mute'}
          >
            {track.muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={volumePercent}
            onChange={(e) => onSetTrackVolume(track.id, parseInt(e.target.value) / 100)}
            className="flex-1 min-w-0 h-1 cursor-pointer"
            style={{
              WebkitAppearance: 'none',
              appearance: 'none',
              background: `linear-gradient(to right, ${track.muted ? '#d4d4d8' : '#71717a'} ${volumePercent}%, #e4e4e7 ${volumePercent}%)`,
              borderRadius: '2px',
              height: '3px',
            }}
            aria-label={`Volume for ${track.name}`}
          />
          <span className="text-[8px] text-zinc-400 font-mono tabular-nums w-5 md:w-6 text-right shrink-0">{volumePercent}</span>
        </div>

        {/* Add clip button (top-right corner, shows on hover) */}
        <button
          onClick={() => onAddClip(track.id)}
          className="opacity-100 md:opacity-0 group-hover:opacity-100 absolute right-1 top-1 w-4 h-4 md:w-5 md:h-5 rounded bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 transition-opacity"
          title="Add Clip"
          aria-label={`Add clip to ${track.name}`}
        >
          <Plus className="w-2.5 h-2.5 md:w-3 md:h-3" />
        </button>
      </div>

      {/* Clip area */}
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

      {/* Track resize handle */}
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
