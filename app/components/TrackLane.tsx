'use client';
import { memo, type PointerEvent as ReactPointerEvent } from 'react';
import { Plus, Volume2, VolumeX, MoreVertical, SlidersHorizontal, Activity } from 'lucide-react';
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
      className={`flex border-b border-black/5 dark:border-white/5 group relative transition-colors duration-500 ${
        track.muted ? 'bg-zinc-100/50 dark:bg-zinc-900/50' : 'bg-white dark:bg-zinc-950'
      }`}
    >
      {/* Sophisticated Track Header */}
      <div className="w-40 border-r border-black/5 dark:border-white/10 flex flex-col shrink-0 relative bg-zinc-50 dark:bg-zinc-900 sticky left-0 z-20 overflow-hidden shadow-sm">
        <div className="flex-1 p-3 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest truncate">
              {track.name}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-auto">
            <button
              onClick={() => onToggleMute(track.id)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg border-0 transition-all duration-300 shrink-0 ${
                track.muted 
                  ? 'bg-red-500 text-white shadow-lg scale-105' 
                  : 'bg-black/5 dark:bg-white/5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
              title={track.muted ? 'Unmute' : 'Mute'}
            >
              {track.muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            
            <div className="flex-1 flex flex-col gap-1.5">
               <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono text-zinc-400">{volumePercent}%</span>
               </div>
               <input
                type="range"
                min={0}
                max={100}
                value={volumePercent}
                onChange={(e) => onSetTrackVolume(track.id, parseInt(e.target.value) / 100)}
                className="w-full h-1 cursor-pointer rounded-full accent-zinc-800 dark:accent-zinc-200 bg-black/5 dark:bg-white/5 appearance-none"
              />
            </div>
          </div>
        </div>

        {/* Add clip button (shows on hover) */}
        <button
          onClick={() => onAddClip(track.id)}
          className="opacity-0 group-hover:opacity-100 absolute right-2 top-2 w-6 h-6 rounded-lg bg-black dark:bg-white text-white dark:text-black shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          title="Add Clip"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Modernized Clip area */}
      <div
        className="flex-1 relative transition-colors duration-500"
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add('bg-black/[0.02]', 'dark:bg-white/[0.02]');
        }}
        onDragLeave={(e) => {
          e.currentTarget.classList.remove('bg-black/[0.02]', 'dark:bg-white/[0.02]');
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove('bg-black/[0.02]', 'dark:bg-white/[0.02]');
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
        className="absolute bottom-0 left-0 right-0 h-1 cursor-ns-resize hover:bg-black/10 dark:hover:bg-white/10 z-30 opacity-0 hover:opacity-100 transition-opacity"
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

