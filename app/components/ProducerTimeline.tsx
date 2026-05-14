'use client';
import { useMemo, useEffect, useState, type RefObject, type PointerEvent as ReactPointerEvent } from 'react';
import { Plus, ListPlus } from 'lucide-react';
import { TimelineRuler } from '@/app/components/TimelineRuler';
import { TrackLane } from '@/app/components/TrackLane';
import type { Clip, Track } from '@/app/lib/types';

const OVERSCAN_BEATS = 8;

interface TimelineViewport {
  startBeat: number;
  endBeat: number;
  containerWidth: number;
  contentWidth: number;
  beatWidth: number;
  scrollLeft: number;
}

function useTimelineViewport(
  scrollContainerRef: RefObject<HTMLDivElement | null>,
  totalBeats: number,
  timelineZoom: number
) {
  const [viewport, setViewport] = useState<TimelineViewport | null>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let frame = 0;

    const computeViewport = () => {
      const containerWidth = scrollContainer.clientWidth;
      if (containerWidth <= 0) return null;

      const contentWidth = containerWidth * (totalBeats / 32) * timelineZoom;
      const beatWidth = contentWidth / totalBeats;
      const scrollLeft = scrollContainer.scrollLeft;
      const startBeat = Math.max(0, Math.floor(scrollLeft / beatWidth) - OVERSCAN_BEATS);
      const endBeat = Math.min(totalBeats, Math.ceil((scrollLeft + containerWidth) / beatWidth) + OVERSCAN_BEATS);

      return {
        startBeat,
        endBeat,
        containerWidth,
        contentWidth,
        beatWidth,
        scrollLeft,
      };
    };

    const update = () => {
      frame = 0;
      const next = computeViewport();
      if (!next) return;

      setViewport((prev) => {
        if (
          prev &&
          prev.startBeat === next.startBeat &&
          prev.endBeat === next.endBeat &&
          prev.containerWidth === next.containerWidth &&
          prev.contentWidth === next.contentWidth
        ) {
          return prev;
        }
        return next;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    const resizeObserver = new ResizeObserver(() => update());
    resizeObserver.observe(scrollContainer);

    return () => {
      scrollContainer.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [scrollContainerRef, totalBeats, timelineZoom]);

  return viewport;
}

interface ProducerTimelineProps {
  tracks: Track[];
  clips: Clip[];
  selectedClipId: string | null;
  totalBeats: number;
  timelineZoom: number;
  timelineRef: RefObject<HTMLDivElement | null>;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
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
  scrollContainerRef,
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
  const viewport = useTimelineViewport(scrollContainerRef, totalBeats, timelineZoom);
  const visibleStartBeat = viewport?.startBeat ?? 0;
  const visibleEndBeat = viewport?.endBeat ?? totalBeats;

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
    <div
      className="flex-1 overflow-auto relative flex flex-col bg-zinc-100 dark:bg-zinc-950"
      id="scroll-container"
      ref={scrollContainerRef}
    >
      <div style={{ width: `${(totalBeats / 32) * timelineZoom * 100}%` }} className="flex flex-col relative h-full shrink-0">
        <TimelineRuler
          totalBeats={totalBeats}
          playheadRef={playheadRef}
          onScrubStart={onScrubStart}
          visibleStartBeat={visibleStartBeat}
          visibleEndBeat={visibleEndBeat}
        />

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
              visibleStartBeat={visibleStartBeat}
              visibleEndBeat={visibleEndBeat}
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

