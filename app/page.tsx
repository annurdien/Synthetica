"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as Tone from 'tone';
import { AppHeader } from '@/app/components/AppHeader';
import { SynthEditorPanel } from '@/app/components/SynthEditorPanel';
import { SynthVisualizerPanel } from '@/app/components/SynthVisualizerPanel';
import { SynthLibraryPanel } from '@/app/components/SynthLibraryPanel';
import { ProducerLibraryPanel } from '@/app/components/ProducerLibraryPanel';
import { TransportBar } from '@/app/components/TransportBar';
import { ProducerTimeline } from '@/app/components/ProducerTimeline';
import { ClipEditorPanel } from '@/app/components/ClipEditorPanel';
import { PRESETS, PROJECT_PRESETS } from '@/app/lib/presets';
import { CLIP_COLORS, TOTAL_BEATS } from '@/app/lib/constants';
import type {
  ActiveTab,
  Clip,
  EditorMode,
  LibraryItem,
  LibraryTab,
  ProjectPreset,
  SynthVisType,
  Track,
} from '@/app/lib/types';

export default function Page() {
  const [equation, setEquation] = useState(PRESETS[0].eq);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [bpm, setBpm] = useState(PRESETS[0].bpm);

  const [library, setLibrary] = useState<LibraryItem[]>(() =>
    PRESETS.map((preset, index) => ({
      id: `preset-${index}`,
      name: preset.name,
      eq: preset.eq,
      bpm: preset.bpm,
    }))
  );
  const [saveName, setSaveName] = useState('');
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLibraryVisible, setIsLibraryVisible] = useState(true);
  const [isSynthLibraryVisible, setIsSynthLibraryVisible] = useState(true);
  const [editorMode, setEditorMode] = useState<EditorMode>('standard');
  const [libraryTab, setLibraryTab] = useState<LibraryTab>('projects');
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [timelineZoom, setTimelineZoom] = useState(1);

  const [tracks, setTracks] = useState<Track[]>(() => PROJECT_PRESETS[0].tracks.map((track) => ({ ...track })));

  const [activeTab, setActiveTab] = useState<ActiveTab>('synth');
  const [synthVisType, setSynthVisType] = useState<SynthVisType>('graph');
  const [clips, setClips] = useState<Clip[]>(() => PROJECT_PRESETS[0].clips.map((clip) => ({ ...clip })));
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);
  const [latexEquation, setLatexEquation] = useState<string>('\\sin(2 \\cdot \\pi \\cdot 440 \\cdot t)');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const timelineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const timeOffsetRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);
  const syncTimerRef = useRef<number | null>(null);
  const pauseTimeRef = useRef<number>(0);

  const isPlayingRef = useRef(isPlaying);
  const bpmRef = useRef(bpm);
  const activeTabRef = useRef(activeTab);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  const updatePlayhead = useCallback(function updatePlayheadFn() {
    if (activeTabRef.current === 'producer' && isPlayingRef.current && audioCtxRef.current) {
      const t = audioCtxRef.current.currentTime - timeOffsetRef.current;
      const currentBeat = t * (bpmRef.current / 60);
      const positionPercentage = (currentBeat / TOTAL_BEATS) * 100;

      if (playheadRef.current) {
        playheadRef.current.style.left = `${positionPercentage}%`;
      }
    } else if (playheadRef.current && !isPlayingRef.current) {
      let t = 0;
      if (pauseTimeRef.current > 0 && audioCtxRef.current) {
        t = pauseTimeRef.current - timeOffsetRef.current;
      }
      const currentBeat = Math.max(0, t) * (bpmRef.current / 60);
      const positionPercentage = (currentBeat / TOTAL_BEATS) * 100;
      playheadRef.current.style.left = `${positionPercentage}%`;
    }
    requestRef.current = requestAnimationFrame(updatePlayheadFn);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updatePlayhead);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [updatePlayhead]);

  const draggingRef = useRef<{
    id: string;
    type: 'move' | 'resize';
    startX: number;
    initialStartBeat: number;
    initialLength: number;
    initialTrackId: number;
    timelineWidth: number;
  } | null>(null);

  const mutedTrackIds = useMemo(() => new Set(tracks.filter((track) => track.muted).map((track) => track.id)), [tracks]);
  const trackVolumes = useMemo(() => {
    const map = new Map<number, number>();
    for (const track of tracks) {
      map.set(track.id, track.volume ?? 1);
    }
    return map;
  }, [tracks]);

  const syncWorklet = useCallback(() => {
    if (!workletNodeRef.current) return;
    if (activeTab === 'synth') {
      workletNodeRef.current.port.postMessage({ type: 'setEquation', equation });
    } else {
      const activeClips = clips.filter((clip) => !mutedTrackIds.has(clip.trackId));
      workletNodeRef.current.port.postMessage({
        type: 'setTimeline',
        clips: activeClips.map((clip) => ({
          startBeat: clip.startBeat,
          endBeat: clip.startBeat + clip.lengthBeats,
          equation: clip.equation,
          volume: trackVolumes.get(clip.trackId) ?? 1,
        })),
      });
    }
  }, [activeTab, clips, equation, mutedTrackIds, trackVolumes]);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!draggingRef.current) return;
    const { id, type, startX, initialStartBeat, initialLength, timelineWidth } = draggingRef.current;
    
    const deltaX = e.clientX - startX;
    const beatsDelta = Math.round(((deltaX / timelineWidth) * TOTAL_BEATS) * 4) / 4; 
    
    setClips(prev => {
      return prev.map(c => {
        if (c.id !== id) return c;
        if (type === 'move') {
          let newStart = initialStartBeat + beatsDelta;
          newStart = Math.max(0, Math.min(TOTAL_BEATS - c.lengthBeats, newStart));
          
          let newTrackId = c.trackId;
          const tracksContainer = document.getElementById('tracks-container');
          if (tracksContainer) {
            const rect = tracksContainer.getBoundingClientRect();
            const relativeY = e.clientY - rect.top;
            const maybeTrackIndex = Math.floor(relativeY / 80);
            const numTracks = tracksContainer.children.length;
            if (maybeTrackIndex >= 0 && maybeTrackIndex < numTracks) {
              const trackDiv = tracksContainer.children[maybeTrackIndex] as HTMLElement;
              if (trackDiv && trackDiv.dataset.trackid) {
                newTrackId = parseInt(trackDiv.dataset.trackid);
              }
            }
          }
          return { ...c, startBeat: newStart, trackId: newTrackId };
        } else if (type === 'resize') {
          let newLength = initialLength + beatsDelta;
          newLength = Math.max(0.25, Math.min(TOTAL_BEATS - c.startBeat, newLength));
          return { ...c, lengthBeats: newLength };
        }
        return c;
      });
    });
  }, []);

  const handlePointerUp = useCallback(
    function handlePointerUpFn() {
      draggingRef.current = null;
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUpFn);
    },
    [handlePointerMove]
  );

  const handleScrubStart = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    const ruler = document.getElementById('timeline-ruler');
    if (!ruler) return;
    
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    
    const updatePlayheadPosition = (clientX: number) => {
      const rect = ruler.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const width = rect.width;
      if (width <= 0) return;
      
      let percentage = (offsetX / width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      
      const newBeat = (percentage / 100) * TOTAL_BEATS;
      const newTime = newBeat / (bpmRef.current / 60);
      
      if (workletNodeRef.current) {
          workletNodeRef.current.port.postMessage({ type: 'setTime', time: newTime });
      }
      if (audioCtxRef.current) {
          timeOffsetRef.current = audioCtxRef.current.currentTime - newTime;
          if (!isPlayingRef.current) {
              pauseTimeRef.current = audioCtxRef.current.currentTime;
          }
      }
      
      if (!isPlayingRef.current && playheadRef.current) {
          playheadRef.current.style.left = `${percentage}%`;
      }
    };
    
    updatePlayheadPosition(e.clientX);
    
    const onPointerMove = (moveEvent: PointerEvent) => {
      updatePlayheadPosition(moveEvent.clientX);
    };
    const onPointerUp = (upEvent: PointerEvent) => {
      target.releasePointerCapture(upEvent.pointerId);
      target.removeEventListener('pointermove', onPointerMove);
      target.removeEventListener('pointerup', onPointerUp);
    };
    
    target.addEventListener('pointermove', onPointerMove as EventListener);
    target.addEventListener('pointerup', onPointerUp as EventListener);
  }, []);

  const handlePointerDown = (e: React.PointerEvent, clipId: string, type: 'move' | 'resize') => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedClipId(clipId);
    
    const clip = clips.find(c => c.id === clipId);
    if (!clip || !timelineRef.current) return;
    
    draggingRef.current = {
      id: clipId,
      type,
      startX: e.clientX,
      initialStartBeat: clip.startBeat,
      initialLength: clip.lengthBeats,
      initialTrackId: clip.trackId,
      timelineWidth: timelineRef.current.clientWidth
    };
    
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  const resetAudioGraph = useCallback(() => {
    workletNodeRef.current = null;
    gainNodeRef.current = null;
    analyserRef.current = null;
    setAnalyser(null);
  }, []);

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.01);
        }
        pauseTimeRef.current = audioCtxRef.current.currentTime;
      }
      setIsPlaying(false);
      return;
    }

    try {
      if (audioCtxRef.current?.state === 'closed') {
        audioCtxRef.current = null;
        resetAudioGraph();
      }

      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      let ctx = audioCtxRef.current;

      if (!ctx) {
        try {
          ctx = new AudioContext({ latencyHint: 'interactive' });
        } catch (err) {
          ctx = new AudioContext();
        }
        Tone.setContext(ctx);
        await Tone.start();
        (Tone.getContext() as { lookAhead?: number }).lookAhead = 0;
        audioCtxRef.current = ctx;
      }

      if (!workletNodeRef.current) {
        await ctx.audioWorklet.addModule('/worklet.js');

        const workletNode = new AudioWorkletNode(ctx, 'math-processor');
        workletNodeRef.current = workletNode;

        const gainNode = ctx.createGain();
        gainNode.gain.value = volume;
        gainNodeRef.current = gainNode;

        const analyserNode = ctx.createAnalyser();
        analyserNode.fftSize = 2048;
        analyserRef.current = analyserNode;
        setAnalyser(analyserNode);

        workletNode.connect(gainNode);
        gainNode.connect(analyserNode);
        analyserNode.connect(ctx.destination);

        workletNode.port.onmessage = (event) => {
          if (event.data.type === 'error') {
            setError(event.data.error);
          } else if (event.data.type === 'success') {
            setError(null);
          }
        };

        syncWorklet();
        workletNode.port.postMessage({ type: 'setTempo', bpm });
        if (activeTab === 'synth') {
          workletNode.port.postMessage({ type: 'resetTime' });
        }
      } else {
        syncWorklet();
        workletNodeRef.current?.port.postMessage({ type: 'setTempo', bpm });
        if (activeTab === 'synth') {
          workletNodeRef.current?.port.postMessage({ type: 'resetTime' });
        }
      }

      if (audioCtxRef.current && gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.01);
        if (pauseTimeRef.current > 0) {
          const pausedDuration = audioCtxRef.current.currentTime - pauseTimeRef.current;
          timeOffsetRef.current += pausedDuration;
          pauseTimeRef.current = 0;
        }
        if (activeTab === 'producer') {
          const correctTime = audioCtxRef.current.currentTime - timeOffsetRef.current;
          workletNodeRef.current?.port.postMessage({ type: 'setTime', time: correctTime });
        }
      }

      await audioCtxRef.current?.resume();
      setIsPlaying(true);
    } catch (err: any) {
      console.error('Audio initialization error:', err);
      setError(err.message || 'Failed to initialize audio');
    }
  }, [bpm, isPlaying, resetAudioGraph, syncWorklet, volume]);

  const restartTimeline = useCallback(async () => {
    if (!isPlayingRef.current) {
      await togglePlay();
    }
    workletNodeRef.current?.port.postMessage({ type: 'resetTime' });
    if (audioCtxRef.current) {
      timeOffsetRef.current = audioCtxRef.current.currentTime;
    }
  }, [togglePlay]);

  const stopTimelineAndReset = useCallback(async () => {
    if (isPlayingRef.current) {
      if (audioCtxRef.current && gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.01);
      }
      setIsPlaying(false);
    }
    workletNodeRef.current?.port.postMessage({ type: 'resetTime' });
    if (audioCtxRef.current) {
      timeOffsetRef.current = audioCtxRef.current.currentTime;
    } else {
      timeOffsetRef.current = 0;
    }
    pauseTimeRef.current = 0;
  }, []);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.05);
    }
  }, [volume]);

  useEffect(() => {
    if (workletNodeRef.current) {
      workletNodeRef.current.port.postMessage({ type: 'setTempo', bpm });
    }
  }, [bpm]);

  useEffect(() => {
    if (syncTimerRef.current) {
      window.clearTimeout(syncTimerRef.current);
    }
    if (!workletNodeRef.current) return;

    syncTimerRef.current = window.setTimeout(() => {
      syncWorklet();
    }, 120);

    return () => {
      if (syncTimerRef.current) {
        window.clearTimeout(syncTimerRef.current);
      }
    };
  }, [syncWorklet]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if ((e.key === 'Delete' || e.key === 'Backspace') && activeTab === 'producer' && selectedClipId) {
        setClips(prev => prev.filter(c => c.id !== selectedClipId));
        setSelectedClipId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, selectedClipId]);

  useEffect(() => {
    return () => {
      if (syncTimerRef.current) {
        window.clearTimeout(syncTimerRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => undefined);
        audioCtxRef.current = null;
      }
      resetAudioGraph();
    };
  }, [resetAudioGraph]);

  const selectedClip = useMemo(
    () => clips.find((clip) => clip.id === selectedClipId) ?? null,
    [clips, selectedClipId]
  );

  const updateSelectedClip = useCallback(
    (updates: Partial<Clip>) => {
      setClips((prev) => prev.map((clip) => (clip.id === selectedClipId ? { ...clip, ...updates } : clip)));
    },
    [selectedClipId]
  );

  const addClip = useCallback((trackId: number, eq?: string, name?: string) => {
    let nextId = '';
    setClips((prev) => {
      nextId = `clip-${prev.length}`;
      const color = CLIP_COLORS[prev.length % CLIP_COLORS.length];
      const newClip: Clip = {
        id: nextId,
        trackId,
        startBeat: 0,
        lengthBeats: 4,
        equation: eq || PRESETS[0].eq,
        name: name || 'New Clip',
        color,
      };
      return [...prev, newClip];
    });
    if (nextId) {
      setSelectedClipId(nextId);
    }
  }, []);

  const handleDropPreset = useCallback(
    (payload: { trackId: number; startBeat: number; eq: string; name: string }) => {
      let nextId = '';
      setClips((prev) => {
        nextId = `clip-${prev.length}-${Math.floor(Math.random() * 1000)}`;
        const color = CLIP_COLORS[prev.length % CLIP_COLORS.length];
        const newClip: Clip = {
          id: nextId,
          trackId: payload.trackId,
          startBeat: Math.max(0, Math.min(TOTAL_BEATS - 1, payload.startBeat)),
          lengthBeats: 4,
          equation: payload.eq,
          name: payload.name,
          color,
        };
        return [...prev, newClip];
      });
      if (nextId) {
        setSelectedClipId(nextId);
      }
    },
    []
  );

  const saveToLibrary = useCallback(() => {
    if (!saveName.trim()) return;
    setLibrary((prev) => [
      ...prev,
      {
        id: `user-${prev.length}`,
        name: saveName,
        eq: equation,
        bpm,
      },
    ]);
    setSaveName('');
  }, [bpm, equation, saveName]);

  const addTrack = useCallback(() => {
    setTracks((prev) => {
      const newId = prev.length > 0 ? Math.max(...prev.map((track) => track.id)) + 1 : 0;
      return [...prev, { id: newId, name: `Track ${newId + 1}`, muted: false, height: 80, volume: 1 }];
    });
  }, []);

  const toggleMute = useCallback((trackId: number) => {
    setTracks((prev) => prev.map((track) => (track.id === trackId ? { ...track, muted: !track.muted } : track)));
  }, []);

  const setTrackVolume = useCallback((trackId: number, volume: number) => {
    setTracks((prev) => prev.map((track) => (track.id === trackId ? { ...track, volume } : track)));
  }, []);

  const resizeTrack = useCallback((trackId: number, height: number) => {
    setTracks((prev) => prev.map((track) => (track.id === trackId ? { ...track, height } : track)));
  }, []);

  const loadProjectPreset = useCallback(
    async (preset: ProjectPreset) => {
      await stopTimelineAndReset();
      setBpm(preset.bpm);
      setTracks(preset.tracks.map((track) => ({ ...track })));

      const newClips = preset.clips.map((clip) => ({
        ...clip,
        id: `${clip.id}-${Math.floor(Math.random() * 1000)}`,
      }));

      setClips(newClips);
      setSelectedClipId(null);
    },
    [stopTimelineAndReset]
  );

  const filteredLibrary = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return library.filter((preset) => preset.name.toLowerCase().includes(query) || preset.eq.toLowerCase().includes(query));
  }, [library, searchQuery]);

  const handleSelectSynth = useCallback(() => {
    stopTimelineAndReset();
    setActiveTab('synth');
  }, [stopTimelineAndReset]);

  const handleSelectProducer = useCallback(() => {
    setActiveTab('producer');
  }, []);

  const handleSelectPreset = useCallback((preset: LibraryItem) => {
    setEquation(preset.eq);
    setBpm(preset.bpm);
  }, []);

  return (
    <main className="w-full h-screen bg-white flex flex-col font-sans text-zinc-900 overflow-hidden">
      <AppHeader
        activeTab={activeTab}
        onSelectSynth={handleSelectSynth}
        onSelectProducer={handleSelectProducer}
        bpm={bpm}
        onBpmChange={setBpm}
        volume={volume}
        onVolumeChange={setVolume}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {activeTab === 'synth' ? (
          <>
            <div className="flex-1 bg-zinc-50 flex flex-col p-4 md:p-8 relative overflow-y-auto min-w-0">
              <SynthEditorPanel
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                editorMode={editorMode}
                onToggleEditorMode={() => setEditorMode((prev) => (prev === 'desmos' ? 'standard' : 'desmos'))}
                equation={equation}
                onEquationChange={setEquation}
                latexEquation={latexEquation}
                onLatexChange={setLatexEquation}
                onLatexJsChange={setEquation}
                error={error}
                isSavePopupOpen={isSavePopupOpen}
                onToggleSavePopup={() => setIsSavePopupOpen((prev) => !prev)}
                saveName={saveName}
                onSaveNameChange={setSaveName}
                onSave={saveToLibrary}
                onCloseSavePopup={() => setIsSavePopupOpen(false)}
                onShowLibrary={() => setIsSynthLibraryVisible(true)}
              />

              <SynthVisualizerPanel
                synthVisType={synthVisType}
                onSetSynthVisType={setSynthVisType}
                analyser={analyser}
                equation={equation}
                bpm={bpm}
                isPlaying={isPlaying}
              />
            </div>

            <SynthLibraryPanel
              isVisible={isSynthLibraryVisible}
              library={library}
              equation={equation}
              onSelectPreset={handleSelectPreset}
              onHide={() => setIsSynthLibraryVisible(false)}
              onShow={() => setIsSynthLibraryVisible(true)}
            />
          </>
        ) : (
          <>
            <ProducerLibraryPanel
              isVisible={isLibraryVisible}
              libraryTab={libraryTab}
              onLibraryTabChange={setLibraryTab}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filteredLibrary={filteredLibrary}
              selectedClipEquation={selectedClip?.equation}
              onAddClip={addClip}
              onLoadProjectPreset={loadProjectPreset}
              projectPresets={PROJECT_PRESETS}
              onHide={() => setIsLibraryVisible(false)}
              onShow={() => setIsLibraryVisible(true)}
            />

            <div className="flex-1 bg-zinc-50 flex flex-col relative overflow-hidden min-w-0">
              <TransportBar
                isPlaying={isPlaying}
                onRestart={restartTimeline}
                onTogglePlay={togglePlay}
                totalBeats={TOTAL_BEATS}
                timelineZoom={timelineZoom}
                onZoomOut={() => setTimelineZoom((zoom) => Math.max(0.25, zoom - 0.25))}
                onZoomIn={() => setTimelineZoom((zoom) => Math.min(5, zoom + 0.25))}
                onShowLibrary={() => setIsLibraryVisible(true)}
                onShowEditor={() => setIsEditorVisible(true)}
              />

              <ProducerTimeline
                tracks={tracks}
                clips={clips}
                selectedClipId={selectedClipId}
                totalBeats={TOTAL_BEATS}
                timelineZoom={timelineZoom}
                timelineRef={timelineRef}
                playheadRef={playheadRef}
                onScrubStart={handleScrubStart}
                onClipPointerDown={handlePointerDown}
                onToggleMute={toggleMute}
                onSetTrackVolume={setTrackVolume}
                onAddClip={addClip}
                onDropPreset={handleDropPreset}
                onAddTrack={addTrack}
                onResizeTrack={resizeTrack}
              />
            </div>

            <ClipEditorPanel
              isVisible={isEditorVisible}
              selectedClip={selectedClip}
              error={error}
              onUpdateClip={updateSelectedClip}
              onDeleteClip={() => {
                if (!selectedClip) return;
                setClips((prev) => prev.filter((clip) => clip.id !== selectedClip.id));
                setSelectedClipId(null);
              }}
              onHide={() => setIsEditorVisible(false)}
              onShow={() => setIsEditorVisible(true)}
              totalBeats={TOTAL_BEATS}
            />
          </>
        )}
      </div>
    </main>
  );
}
