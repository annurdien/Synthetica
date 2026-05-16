"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const createReverbImpulse = (ctx: AudioContext) => {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * 2.5; // 2.5 seconds reverb decay
  const impulse = ctx.createBuffer(2, length, sampleRate);
  const left = impulse.getChannelData(0);
  const right = impulse.getChannelData(1);
  for (let i = 0; i < length; i++) {
    const decay = Math.exp(-i / (sampleRate * 0.5));
    left[i] = (Math.random() * 2 - 1) * decay;
    right[i] = (Math.random() * 2 - 1) * decay;
  }
  return impulse;
};

export default function Page() {
  const [equation, setEquation] = useState(PRESETS[0].eq);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [reverb, setReverb] = useState(0.3);
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
  const [projectSaveName, setProjectSaveName] = useState('');
  const [isProjectSavePopupOpen, setIsProjectSavePopupOpen] = useState(false);
  const [userProjects, setUserProjects] = useState<ProjectPreset[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLibraryVisible, setIsLibraryVisible] = useState(true);
  const [isSynthLibraryVisible, setIsSynthLibraryVisible] = useState(true);
  const [editorMode, setEditorMode] = useState<EditorMode>('standard');
  const [libraryTab, setLibraryTab] = useState<LibraryTab>('projects');
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [timelineZoom, setTimelineZoom] = useState(1);
  const [previewingClipId, setPreviewingClipId] = useState<string | null>(null);

  const [tracks, setTracks] = useState<Track[]>(() => PROJECT_PRESETS[0].tracks.map((track) => ({ ...track })));

  const [activeTab, setActiveTab] = useState<ActiveTab>('synth');
  const [synthVisType, setSynthVisType] = useState<SynthVisType>('graph');
  const [clips, setClips] = useState<Clip[]>(() => PROJECT_PRESETS[0].clips.map((clip) => ({ ...clip })));
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);
  const [latexEquation, setLatexEquation] = useState<string>('\\sin(2 \\cdot \\pi \\cdot 440 \\cdot t)');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const wetGainRef = useRef<GainNode | null>(null);
  const dryGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);
  const timeOffsetRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);
  const syncTimerRef = useRef<number | null>(null);
  const pauseTimeRef = useRef<number>(0);
  const timelineMetricsRef = useRef({
    containerWidth: 0,
    contentWidth: 0,
    sidebarWidth: 0,
    rightEdgeBuffer: 50,
  });

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
    const savedProjects = localStorage.getItem('synthetica_user_projects');
    if (savedProjects) {
      try {
        setUserProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('synthetica_user_projects', JSON.stringify(userProjects));
  }, [userProjects]);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'producer') return;
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const updateMetrics = () => {
      const containerWidth = scrollContainer.clientWidth;
      if (containerWidth <= 0) return;

      const contentWidth = containerWidth * (TOTAL_BEATS / 32) * timelineZoom;
      const sidebarWidth = window.innerWidth >= 768 ? 128 : 80;

      timelineMetricsRef.current = {
        containerWidth,
        contentWidth,
        sidebarWidth,
        rightEdgeBuffer: 50,
      };
    };

    updateMetrics();

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(scrollContainer);
    window.addEventListener('resize', updateMetrics);

    return () => {
      window.removeEventListener('resize', updateMetrics);
      resizeObserver.disconnect();
    };
  }, [activeTab, timelineZoom]);

  const updatePlayhead = useCallback(function updatePlayheadFn() {
    if (activeTabRef.current === 'producer' && isPlayingRef.current && audioCtxRef.current) {
      const t = audioCtxRef.current.currentTime - timeOffsetRef.current;
      const currentBeat = t * (bpmRef.current / 60);
      const positionPercentage = (currentBeat / TOTAL_BEATS) * 100;

      if (playheadRef.current) {
        playheadRef.current.style.left = `${positionPercentage}%`;
        
        if (timerRef.current) {
          const totalSeconds = Math.max(0, t);
          const mins = Math.floor(totalSeconds / 60);
          const secs = Math.floor(totalSeconds % 60);
          const ms = Math.floor((totalSeconds % 1) * 100);
          timerRef.current.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
        }
        
        // Auto-scroll logic to follow the seeker
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
          const metrics = timelineMetricsRef.current;
          const containerWidth = metrics.containerWidth || scrollContainer.clientWidth;
          const contentWidth = metrics.contentWidth || scrollContainer.scrollWidth;
          const sidebarWidth = metrics.sidebarWidth || (window.innerWidth >= 768 ? 128 : 80);
          const rightEdgeBuffer = metrics.rightEdgeBuffer ?? 50;

          if (containerWidth > 0 && contentWidth > 0) {
            // Calculate the true absolute pixel position of the playhead from the far left of the full content
            const playheadAbsoluteX = sidebarWidth + (positionPercentage / 100) * (contentWidth - sidebarWidth);
            const rightVisibleEdge = containerWidth - rightEdgeBuffer;

            // Continuous smooth sliding: lock the seeker to the right edge
            // It will stay at 0 until the playhead reaches the right edge, then slide continuously
            if (playheadAbsoluteX > rightVisibleEdge) {
              scrollContainer.scrollLeft = playheadAbsoluteX - rightVisibleEdge;
            } else {
              scrollContainer.scrollLeft = 0;
            }
          }
        }
      }
    } else if (playheadRef.current && !isPlayingRef.current) {
      let t = 0;
      if (pauseTimeRef.current > 0 && audioCtxRef.current) {
        t = pauseTimeRef.current - timeOffsetRef.current;
      }
      const currentBeat = Math.max(0, t) * (bpmRef.current / 60);
      const positionPercentage = (currentBeat / TOTAL_BEATS) * 100;
      playheadRef.current.style.left = `${positionPercentage}%`;
      
      if (timerRef.current) {
        const totalSeconds = Math.max(0, t);
        const mins = Math.floor(totalSeconds / 60);
        const secs = Math.floor(totalSeconds % 60);
        const ms = Math.floor((totalSeconds % 1) * 100);
        timerRef.current.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
      }
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
    
    if (previewingClipId) {
      const clip = library.find(c => c.id === previewingClipId);
      if (clip) {
        workletNodeRef.current.port.postMessage({ type: 'setEquation', equation: clip.eq });
      }
      return;
    }

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
  }, [activeTab, clips, equation, mutedTrackIds, trackVolumes, previewingClipId, library]);

  const moveRequestRef = useRef<number | null>(null);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!draggingRef.current) return;
    
    if (moveRequestRef.current) return;
    
    moveRequestRef.current = requestAnimationFrame(() => {
      moveRequestRef.current = null;
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
            const tracksContainer = timelineRef.current;
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
    wetGainRef.current = null;
    dryGainRef.current = null;
    analyserRef.current = null;
    setAnalyser(null);
  }, []);
  const initAudioIfNeeded = useCallback(async () => {
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

      // Master Reverb Bus
      const convolverNode = ctx.createConvolver();
      convolverNode.buffer = createReverbImpulse(ctx);
      
      const dryGain = ctx.createGain();
      dryGain.gain.value = 1.0 - reverb; // Dry signal slightly reduced to make room for reverb
      dryGainRef.current = dryGain;
      
      const wetGain = ctx.createGain();
      wetGain.gain.value = reverb; // Reverb amount
      wetGainRef.current = wetGain;

      // Routing
      workletNode.connect(dryGain);
      workletNode.connect(convolverNode);
      convolverNode.connect(wetGain);
      
      dryGain.connect(gainNode);
      wetGain.connect(gainNode);
      
      gainNode.connect(analyserNode);
      analyserNode.connect(ctx.destination);

      workletNode.port.onmessage = (event) => {
        if (event.data.type === 'error') {
          setError(event.data.error);
        } else if (event.data.type === 'success') {
          setError(null);
        }
      };

      workletNode.port.postMessage({ type: 'setTempo', bpm });
      if (activeTab === 'synth') {
        workletNode.port.postMessage({ type: 'resetTime' });
      }
    }
    return ctx;
  }, [activeTab, bpm, resetAudioGraph, volume, reverb]);

  const togglePreviewClip = useCallback(async (clipId: string) => {
    if (previewingClipId === clipId) {
      setPreviewingClipId(null);
      if (!isPlayingRef.current && audioCtxRef.current && gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.01);
      }
    } else {
      setPreviewingClipId(clipId);
      try {
        const ctx = await initAudioIfNeeded();
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(volume, ctx.currentTime, 0.01);
          await ctx.resume();
        }
      } catch (err: any) {
        console.error('Audio initialization error:', err);
        setError(err.message || 'Failed to initialize audio');
      }
    }
  }, [initAudioIfNeeded, previewingClipId, volume]);

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
      const ctx = await initAudioIfNeeded();
      
      syncWorklet();
      workletNodeRef.current?.port.postMessage({ type: 'setTempo', bpm });
      if (activeTab === 'synth') {
        workletNodeRef.current?.port.postMessage({ type: 'resetTime' });
      }

      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(volume, ctx.currentTime, 0.01);
        if (pauseTimeRef.current > 0) {
          const pausedDuration = ctx.currentTime - pauseTimeRef.current;
          timeOffsetRef.current += pausedDuration;
          pauseTimeRef.current = 0;
        }
        if (activeTab === 'producer') {
          const correctTime = ctx.currentTime - timeOffsetRef.current;
          workletNodeRef.current?.port.postMessage({ type: 'setTime', time: correctTime });
        }
      }

      await ctx.resume();
      setIsPlaying(true);
    } catch (err: any) {
      console.error('Audio initialization error:', err);
      setError(err.message || 'Failed to initialize audio');
    }
  }, [activeTab, bpm, initAudioIfNeeded, isPlaying, syncWorklet, volume]);

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
    if (wetGainRef.current && audioCtxRef.current) {
      wetGainRef.current.gain.setTargetAtTime(reverb, audioCtxRef.current.currentTime, 0.05);
    }
    if (dryGainRef.current && audioCtxRef.current) {
      dryGainRef.current.gain.setTargetAtTime(1.0 - reverb, audioCtxRef.current.currentTime, 0.05);
    }
  }, [reverb]);

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
        id: clip.id.includes('-') ? clip.id : `${clip.id}-${Math.floor(Math.random() * 1000)}`,
      }));

      setClips(newClips);
      setSelectedClipId(null);
    },
    [stopTimelineAndReset]
  );

  const saveProject = useCallback(() => {
    if (!projectSaveName.trim()) return;
    const newProject: ProjectPreset = {
      name: projectSaveName,
      bpm,
      tracks: [...tracks],
      clips: [...clips],
    };
    setUserProjects((prev) => [...prev, newProject]);
    setProjectSaveName('');
    setIsProjectSavePopupOpen(false);
  }, [bpm, clips, projectSaveName, tracks]);

  const createNewProject = useCallback(async () => {
    if (confirm('Are you sure you want to create a new project? Any unsaved changes will be lost.')) {
      await stopTimelineAndReset();
      setBpm(120);
      setTracks([
        { id: 0, name: 'Lead', muted: false, height: 80, volume: 1 },
        { id: 1, name: 'Bass', muted: false, height: 80, volume: 1 },
        { id: 2, name: 'Drums', muted: false, height: 80, volume: 1 },
        { id: 3, name: 'Atmosphere', muted: false, height: 80, volume: 1 },
      ]);
      setClips([]);
      setSelectedClipId(null);
      setEquation(PRESETS[0].eq);
    }
  }, [stopTimelineAndReset]);

  const allProjects = useMemo(() => [...PROJECT_PRESETS, ...userProjects], [userProjects]);

  const filteredLibrary = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return library.filter((preset) => preset.name.toLowerCase().includes(query) || preset.eq.toLowerCase().includes(query));
  }, [library, searchQuery]);

  const handleSelectSynth = useCallback(() => {
    if (isPlaying) togglePlay();
    setActiveTab('synth');
  }, [isPlaying, togglePlay]);

  const handleSelectProducer = useCallback(() => {
    if (isPlaying) togglePlay();
    setActiveTab('producer');
  }, [isPlaying, togglePlay]);

  const handleSelectPreset = useCallback((preset: LibraryItem) => {
    setEquation(preset.eq);
    setBpm(preset.bpm);
  }, []);

  return (
    <main className="w-full h-screen bg-white dark:bg-black flex flex-col font-sans text-zinc-900 dark:text-zinc-100 overflow-hidden transition-colors duration-500 relative">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-100 dark:from-zinc-900/40 via-white dark:via-black to-white dark:to-black" />
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>
      <AppHeader
        activeTab={activeTab}
        onSelectSynth={handleSelectSynth}
        onSelectProducer={handleSelectProducer}
        bpm={bpm}
        onBpmChange={setBpm}
        volume={volume}
        onVolumeChange={setVolume}
        reverb={reverb}
        onReverbChange={setReverb}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {activeTab === 'synth' ? (
          <>
            <div className="flex-1 bg-transparent flex flex-col p-4 md:p-8 relative overflow-hidden min-w-0 h-full">
              <SynthEditorPanel
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                editorMode={editorMode}
                onToggleEditorMode={() => {
                  if (isPlaying) {
                    togglePlay();
                  }
                  setEditorMode((prev) => (prev === 'desmos' ? 'standard' : 'desmos'));
                }}
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
              projectPresets={allProjects}
              previewingClipId={previewingClipId}
              onTogglePreview={togglePreviewClip}
              onHide={() => setIsLibraryVisible(false)}
              onShow={() => setIsLibraryVisible(true)}
            />

            <div className="flex-1 bg-transparent flex flex-col relative overflow-hidden min-w-0">
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
                onNewProject={createNewProject}
                onSaveProject={() => setIsProjectSavePopupOpen(true)}
                timerRef={timerRef}
              />

              <div className="flex-1 flex flex-col overflow-hidden relative">
                <ProducerTimeline
                  tracks={tracks}
                  clips={clips}
                  selectedClipId={selectedClipId}
                  totalBeats={TOTAL_BEATS}
                  timelineZoom={timelineZoom}
                  timelineRef={timelineRef}
                  scrollContainerRef={scrollContainerRef}
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

      {/* Synth Save Popup */}
      <AnimatePresence>
        {isSavePopupOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-black/5 dark:border-white/10"
            >
              <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">Save Synth Preset</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Give your math equation a name to save it to your library.</p>
              <input
                autoFocus
                type="text"
                placeholder="Synth Name (e.g. Acid Bass)"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveToLibrary()}
                className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl py-4 px-6 text-lg outline-none mb-6 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => setIsSavePopupOpen(false)}
                  className="flex-1 py-4 rounded-2xl font-bold text-zinc-500 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={saveToLibrary}
                  disabled={!saveName.trim()}
                  className="flex-1 py-4 rounded-2xl font-bold bg-black dark:bg-white text-white dark:text-black disabled:opacity-50 transition-all"
                >
                  Save Preset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Project Save Popup */}
      <AnimatePresence>
        {isProjectSavePopupOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-black/5 dark:border-white/10"
            >
              <h3 className="text-xl font-bold mb-2">Save Project</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Give your project a name to save it to your library.</p>
              <input
                autoFocus
                type="text"
                placeholder="Project Name"
                value={projectSaveName}
                onChange={(e) => setProjectSaveName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveProject()}
                className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl py-4 px-6 text-lg outline-none mb-6 placeholder:text-zinc-400"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => setIsProjectSavePopupOpen(false)}
                  className="flex-1 py-4 rounded-2xl font-bold text-zinc-500 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProject}
                  disabled={!projectSaveName.trim()}
                  className="flex-1 py-4 rounded-2xl font-bold bg-black dark:bg-white text-white dark:text-black disabled:opacity-50 transition-all"
                >
                  Save Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
