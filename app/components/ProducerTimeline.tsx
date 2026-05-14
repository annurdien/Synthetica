'use client';
import { useMemo, type RefObject, type PointerEvent as ReactPointerEvent } from 'react';
import { Plus } from 'lucide-react';
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
    <div className="flex-1 overflow-auto relative flex flex-col bg-zinc-50/50 dark:bg-zinc-950/50" id="scroll-container">
      <div style={{ width: `${(totalBeats / 32) * timelineZoom * 100}%` }} className="flex flex-col relative h-full shrink-0">
        <TimelineRuler totalBeats={totalBeats} playheadRef={playheadRef} onScrubStart={onScrubStart} />

        <div className="flex-1 flex flex-col" id="tracks-container" ref={timelineRef}>
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

          <div className="flex h-10 border-b border-black/5 dark:border-white/10 bg-transparent">
            <div className="w-20 md:w-32 border-r border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 sticky left-0 z-20 bg-zinc-50 dark:bg-zinc-900">
              <button
                onClick={onAddTrack}
                className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700/50 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors"
                title="Add Track"
                aria-label="Add track"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
