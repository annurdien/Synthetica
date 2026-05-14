'use client';
import { useMemo, type RefObject, type PointerEvent as ReactPointerEvent } from 'react';
import { Plus, ListPlus } from 'lucide-react';
import { TimelineRuler } from '@/app/components/TimelineRuler';
import { TrackLane } from '@/app/components/TrackLane';
import type { Clip, Track } from '@/app/lib/types';

interface ProducerTimelineProps {
  tracks: Track[];
  clips: Clip[];
  selectedClipId: string | null;
  totalBeats: number;
  timelineZoom: number;
  timelineRef: RefObject<HTMLDivElement | null>;
  playheadRef: RefObject<HTMLDivElement | null>;
  onScrubStart: (event: ReactPointerEvent) => void;
  onClipPointerDown: (event: ReactPointerEvent, clipId: string, type: 'move' | 'resize') => void;
  onToggleMute: (trackId: number) => void;
  onSetTrackVolume: (trackId: number, volume: number) => void;
  onAddClip: (trackId: number) => void;
  onDropPreset: (payload: { trackId: number; startBeat: number; eq: string; name: string }) => void;
  onAddTrack: () => void;
  onResizeTrack: (trackId: number, height: number) => void;
}

export function ProducerTimeline({
  tracks,
  clips,
  selectedClipId,
  totalBeats,
  timelineZoom,
  timelineRef,
  playheadRef,
  onScrubStart,
  onClipPointerDown,
  onToggleMute,
  onSetTrackVolume,
  onAddClip,
  onDropPreset,
  onAddTrack,
  onResizeTrack,
}: ProducerTimelineProps) {
  const clipsByTrack = useMemo(() => {
    const map = new Map<number, Clip[]>();
    for (const clip of clips) {
      if (!map.has(clip.trackId)) {
        map.set(clip.trackId, []);
      }
      map.get(clip.trackId)?.push(clip);
    }
    return map;
  }, [clips]);

  return (
    <div className="flex-1 overflow-auto relative flex flex-col bg-zinc-100 dark:bg-zinc-950" id="scroll-container">
      <div style={{ width: `${(totalBeats / 32) * timelineZoom * 100}%` }} className="flex flex-col relative h-full shrink-0">
        <TimelineRuler totalBeats={totalBeats} playheadRef={playheadRef} onScrubStart={onScrubStart} />

        <div className="flex-1 flex flex-col relative" id="tracks-container" ref={timelineRef}>
          {/* Global Grid Overlay for Performance */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
            style={{ 
              backgroundImage: `
                linear-gradient(to right, currentColor 2px, transparent 2px),
                linear-gradient(to right, currentColor 1px, transparent 1px)
              `,
              backgroundSize: `calc(100% / ${totalBeats / 4}) 100%, calc(100% / ${totalBeats}) 100%`,
              willChange: 'background-size'
            }}
          />

          {tracks.map((track) => (
            <TrackLane
              key={track.id}
              track={track}
              clips={clipsByTrack.get(track.id) || []}
              totalBeats={totalBeats}
              selectedClipId={selectedClipId}
              onToggleMute={onToggleMute}
              onSetTrackVolume={onSetTrackVolume}
              onAddClip={onAddClip}
              onClipPointerDown={onClipPointerDown}
              onDropPreset={onDropPreset}
              onResizeTrack={onResizeTrack}
            />
          ))}

          {/* Add Track Interaction Area */}
          <div className="flex h-12 border-b border-black/5 dark:border-white/5 group/add transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
            <div className="w-40 border-r border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 sticky left-0 z-20 bg-zinc-50 dark:bg-zinc-900 shadow-sm">
              <button
                onClick={onAddTrack}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
                title="Add New Track"
              >
                <ListPlus className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-widest">New Track</span>
              </button>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

