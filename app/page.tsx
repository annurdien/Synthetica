'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; // Add basic prism styling
import { MathEditor } from '@/app/components/MathEditor';

import { Play, Square, Activity, Info, Volume2, Plus, FastForward, Rewind, Layers, Trash2, Search, VolumeX, PanelLeftClose, PanelLeft, PanelRightClose, PanelRight, ZoomIn, ZoomOut, Settings2, Save, Sigma, Code } from 'lucide-react';
import { Visualizer } from '@/components/Visualizer';
import { GraphFunction } from '@/components/GraphFunction';

const TOTAL_BEATS = 128;

const PRESETS = [
  { name: 'Digital Square Bass', eq: 'sign(sin(2 * PI * (55 * pow(1.05946, [0,-4,3,-2][floor(beat / 2) % 4])) * t)) * exp(-3 * ((beat * 4) % 1)) * 0.15', bpm: 120 },
  { name: 'Digital Saw Lead', eq: '((t * 220 * pow(1.05946, [0,3,7,12,14,12,7,3][floor(beat * 4) % 8])) % 1 * 2 - 1) * exp(-5 * ((beat * 4) % 1)) * 0.15', bpm: 120 },
  { name: 'Dreamy Arp', eq: 'sin(2 * PI * (220 * pow(1.05946, [0,3,7,12,  0,3,7,12,  -4,0,3,8,  -4,0,3,8,  3,7,10,15,  3,7,10,15,  -2,2,7,10,  -2,2,7,10][floor(beat * 4) % 32])) * t + 0.5 * sin(2 * PI * (220 * pow(1.05946, [0,3,7,12,  0,3,7,12,  -4,0,3,8,  -4,0,3,8,  3,7,10,15,  3,7,10,15,  -2,2,7,10,  -2,2,7,10][floor(beat * 4) % 32])) * t * 1.01)) * exp(-3 * ((beat * 4) % 1)) * 0.3', bpm: 110 },
  { name: 'Synthwave Bass', eq: 'sin(2 * PI * (55 * pow(1.05946, [0,0,0,0,  -4,-4,-4,-4,  3,3,3,3,  -2,-2,-2,-2][floor(beat * 2) % 16])) * t + 3 * exp(-5 * ((beat * 4) % 1)) * sin(2 * PI * (55 * pow(1.05946, [0,0,0,0,  -4,-4,-4,-4,  3,3,3,3,  -2,-2,-2,-2][floor(beat * 2) % 16])) * t)) * exp(-2 * ((beat * 4) % 1)) * 0.4', bpm: 120 },
  { name: 'Lo-Fi Drum Loop', eq: '(sin(2 * PI * 55 * t) * exp(-10 * ((beat * 2) % 1)) * ([1,0,0.5,1, 0,0,1,0][floor(beat * 2) % 8]) + (random() * 2 - 1) * exp(-20 * ((beat + 1) % 2)) * 0.5 + (random() * 2 - 1) * exp(-35 * ((beat * 4) % 1)) * ([0.15, 0.05, 0.2, 0.05][floor(beat * 4) % 4]) * 0.1) * 1.0', bpm: 85 },
  { name: 'Slap Bass', eq: 'sin(2 * PI * (55 * pow(1.05946, [0,0,-4,-4, 3,3,-2,-2][floor(beat) % 8])) * t + 1.5 * exp(-10 * ((beat * 4) % 1)) * sin(2 * PI * (55 * pow(1.05946, [0,0,-4,-4, 3,3,-2,-2][floor(beat) % 8])) * t)) * exp(-2 * ((beat * 4) % 1)) * ([1, 0.3, 1, 0.8][floor(beat * 4) % 4]) * 0.4', bpm: 124 },
  { name: 'Euphoric Lead', eq: '(sin(2 * PI * (440 * pow(1.05946, [12,12,10,12, 15,15,14,10][floor(beat * 2) % 8])) * t) + sin(2 * PI * (440 * pow(1.05946, [12,12,10,12, 15,15,14,10][floor(beat * 2) % 8])) * t * 1.005)) * exp(-1.5 * ((beat * 2) % 1)) * 0.25', bpm: 126 },
  { name: 'Chillwave Pad', eq: '(sin(2 * PI * 110 * t) + sin(2 * PI * 110 * pow(1.05946, 7) * t) + sin(2 * PI * 110 * pow(1.05946, 15) * t) + sin(2 * PI * 110 * pow(1.05946, 17) * t)) * 0.05 * (0.6 - 0.4 * cos(2 * PI * beat / 4))', bpm: 90 },
  { name: 'Classic House Chord', eq: '(sin(2 * PI * 220 * t) + sin(2 * PI * 220 * pow(1.05946, 3) * t) + sin(2 * PI * 220 * pow(1.05946, 7) * t) + sin(2 * PI * 220 * pow(1.05946, 10) * t)) * exp(-3 * ((beat * 4) % 1)) * ([1,0,0,1, 0,1,0,0][floor(beat * 4) % 8]) * 0.15', bpm: 125 },
  { name: 'Future Pluck', eq: 'sin(2 * PI * (440 * pow(1.05946, [0,3,7,12, 14,12,7,3][floor(beat * 4) % 8])) * t) * exp(-8 * ((beat * 4) % 1)) * 0.3', bpm: 120 }
];

const PROJECT_PRESETS = [
  {
    name: "Midnight Drive (Synthwave)",
    bpm: 115,
    clips: [
      { id: 'm_arp1', trackId: 0, startBeat: 0, lengthBeats: 32, equation: 'sin(2 * PI * (220 * pow(1.05946, ([0,-4,3,-2][floor(beat / 8) % 4]) + ([0,7,12,7][floor(beat * 4) % 4]))) * t) * exp(-4 * ((beat * 4) % 1)) * 0.15', name: 'Dreamy Arp', color: '#8b5cf6' },
      { id: 'm_arp2', trackId: 0, startBeat: 32, lengthBeats: 32, equation: 'sin(2 * PI * (220 * pow(1.05946, ([0,-4,3,-2][floor(beat / 8) % 4]) + ([0,7,12,7][floor(beat * 4) % 4]))) * t) * exp(-4 * ((beat * 4) % 1)) * 0.15', name: 'Dreamy Arp', color: '#8b5cf6' },
      { id: 'm_chords1', trackId: 1, startBeat: 16, lengthBeats: 16, equation: '(sin(2 * PI * (110 * pow(1.05946, [0,-4,3,-2][floor(beat / 8) % 4])) * t) + sin(2 * PI * (110 * pow(1.05946, [3,0,7,2][floor(beat / 8) % 4])) * t) + sin(2 * PI * (110 * pow(1.05946, [7,3,10,5][floor(beat / 8) % 4])) * t)) * 0.05 * (0.5 - 0.5 * cos(2 * PI * (beat % 8) / 8))', name: 'Pad Swell', color: '#ec4899' },
      { id: 'm_chords2', trackId: 1, startBeat: 32, lengthBeats: 32, equation: '(sin(2 * PI * (110 * pow(1.05946, [0,-4,3,-2][floor(beat / 8) % 4])) * t) + sin(2 * PI * (110 * pow(1.05946, [3,0,7,2][floor(beat / 8) % 4])) * t) + sin(2 * PI * (110 * pow(1.05946, [7,3,10,5][floor(beat / 8) % 4])) * t)) * 0.05 * (0.5 - 0.5 * cos(2 * PI * (beat % 8) / 8))', name: 'Pad Swell', color: '#ec4899' },
      { id: 'm_bass', trackId: 2, startBeat: 32, lengthBeats: 32, equation: 'sin(2 * PI * (55 * pow(1.05946, [0,-4,3,-2][floor(beat / 8) % 4])) * t + 3 * exp(-5 * ((beat * 4) % 1)) * sin(2 * PI * (55 * pow(1.05946, [0,-4,3,-2][floor(beat / 8) % 4])) * t)) * exp(-2 * ((beat * 4) % 1)) * 0.35', name: 'Synthwave Bass', color: '#f59e0b' },
      { id: 'm_kick', trackId: 3, startBeat: 32, lengthBeats: 32, equation: 'sin(2 * PI * 55 * t) * exp(-10 * (beat % 1)) * 0.8', name: 'Retro Kick', color: '#ef4444' },
      { id: 'm_snare', trackId: 4, startBeat: 32, lengthBeats: 32, equation: '((random() * 2 - 1) * 0.7 + 0.3 * sin(2 * PI * 180 * t)) * exp(-30 * ((beat + 1) % 2)) * 0.4', name: 'Gated Snare', color: '#f97316' },
      { id: 'm_hats', trackId: 5, startBeat: 32, lengthBeats: 32, equation: '(random() * 2 - 1) * exp(-40 * ((beat * 4) % 1)) * ([0.3, 0.1, 0.5, 0.1][floor(beat * 4) % 4]) * 0.15', name: '16th Hats', color: '#10b981' }
    ],
    tracks: [
      { id: 0, name: 'Arpeggiator', muted: false, height: 80 },
      { id: 1, name: 'Synth Pad', muted: false, height: 80 },
      { id: 2, name: 'Synth Bass', muted: false, height: 80 },
      { id: 3, name: 'Kick Drum', muted: false, height: 80 },
      { id: 4, name: 'Snare Drum', muted: false, height: 80 },
      { id: 5, name: 'Hi-Hats', muted: false, height: 80 }
    ]
  },
  {
    name: "Lo-Fi Study Vibes",
    bpm: 82,
    clips: [
      { id: 'l_keys1', trackId: 0, startBeat: 0, lengthBeats: 16, equation: '((sin(2*PI*(220*pow(1.05946,[5,10,3,-4][floor(beat/4)%4]))*t) + sin(2*PI*(220*pow(1.05946,[8,14,7,0][floor(beat/4)%4]))*t) + sin(2*PI*(220*pow(1.05946,[12,17,10,3][floor(beat/4)%4]))*t) + sin(2*PI*(220*pow(1.05946,[15,20,14,7][floor(beat/4)%4]))*t))) * exp(-1.5 * ((beat * 2) % 1)) * ([1,0,0.5,0, 0.8,0,0,0][floor(beat * 2) % 8]) * 0.1', name: 'Electric Piano', color: '#3b82f6' },
      { id: 'l_keys2', trackId: 0, startBeat: 16, lengthBeats: 16, equation: '((sin(2*PI*(220*pow(1.05946,[5,10,3,-4][floor(beat/4)%4]))*t) + sin(2*PI*(220*pow(1.05946,[8,14,7,0][floor(beat/4)%4]))*t) + sin(2*PI*(220*pow(1.05946,[12,17,10,3][floor(beat/4)%4]))*t) + sin(2*PI*(220*pow(1.05946,[15,20,14,7][floor(beat/4)%4]))*t))) * exp(-1.5 * ((beat * 2) % 1)) * ([1,0,0.5,0, 0.8,0,0,0][floor(beat * 2) % 8]) * 0.1', name: 'Electric Piano', color: '#3b82f6' },
      { id: 'l_drums', trackId: 1, startBeat: 0, lengthBeats: 32, equation: 'sin(2 * PI * 55 * t) * exp(-10 * ((beat * 2) % 1)) * ([1,0,0,0, 1,0.8,0,0][floor(beat * 2) % 8]) * 0.6 + (random() * 2 - 1) * exp(-20 * ((beat + 1) % 2)) * 0.4 + (random() * 2 - 1) * exp(-35 * ((beat * 4) % 1)) * ([0.15, 0.05, 0.2, 0.05][floor(beat * 4) % 4]) * 0.1', name: 'Smooth Drum Loop', color: '#ef4444' },
      { id: 'l_bass', trackId: 2, startBeat: 16, lengthBeats: 16, equation: 'sin(2 * PI * (55 * pow(1.05946, [5,10,3,-4][floor(beat/4)%4])) * t) * exp(-1.5 * ((beat * 2) % 1)) * ([1,0,0,0, 1,1,0,0][floor(beat * 2) % 8]) * 0.4', name: 'Sub Bass', color: '#f59e0b' }
    ],
    tracks: [
      { id: 0, name: 'Rhodes Keys', muted: false, height: 80 },
      { id: 1, name: 'Drum Break', muted: false, height: 80 },
      { id: 2, name: 'Warm Bass', muted: false, height: 80 }
    ]
  },
  {
    name: 'Slap House Banger',
    bpm: 124,
    clips: [
      { id: 'sh_kick', trackId: 0, startBeat: 0, lengthBeats: 32, equation: 'sin(2 * PI * 60 * t) * exp(-10 * (beat % 1)) * 0.9', name: 'Punchy Kick', color: '#ef4444' },
      { id: 'sh_bass', trackId: 1, startBeat: 0, lengthBeats: 32, equation: 'sin(2 * PI * (55 * pow(1.05946, [0,-4,3,-2][floor(beat / 4) % 4])) * t + 1.5 * exp(-10 * ((beat * 4) % 1)) * sin(2 * PI * (55 * pow(1.05946, [0,-4,3,-2][floor(beat / 4) % 4])) * t)) * exp(-3 * ((beat * 2) % 1)) * ([0, 1][floor(beat * 2) % 2]) * 0.5', name: 'Off-Beat Donk', color: '#f59e0b' },
      { id: 'sh_clap', trackId: 2, startBeat: 0, lengthBeats: 32, equation: '(random() * 2 - 1) * exp(-40 * ((beat + 1) % 2)) * 0.4', name: 'House Clap', color: '#f97316' },
      { id: 'sh_hats', trackId: 3, startBeat: 16, lengthBeats: 16, equation: '(random() * 2 - 1) * exp(-40 * ((beat * 4) % 1)) * ([0.1, 0.1, 0.4, 0.1][floor(beat * 4) % 4]) * 0.15', name: 'Off-Beat Hats', color: '#10b981' },
      { id: 'sh_lead', trackId: 4, startBeat: 16, lengthBeats: 16, equation: 'sin(2 * PI * (110 * pow(1.05946, [12,15,19,17, 12,10,7,3][floor(beat * 2) % 8] + [0,-4,3,-2][floor(beat / 4) % 4])) * t) * exp(-8 * ((beat * 2) % 1)) * ([1, 0, 1, 1,  1, 0, 1, 0][floor(beat * 2) % 8]) * 0.35', name: 'Plucky Lead', color: '#8b5cf6' }
    ],
    tracks: [
      { id: 0, name: 'Kick', muted: false, height: 80 },
      { id: 1, name: 'Donk Bass', muted: false, height: 80 },
      { id: 2, name: 'Clap', muted: false, height: 80 },
      { id: 3, name: 'Hi-Hats', muted: false, height: 80 },
      { id: 4, name: 'Plucky Lead', muted: false, height: 80 }
    ]
  }
];

type Clip = {
  id: string;
  trackId: number;
  startBeat: number;
  lengthBeats: number;
  equation: string;
  name: string;
  color: string;
};

type Track = {
  id: number;
  name: string;
  muted: boolean;
  height: number;
};

export default function Page() {
  const [equation, setEquation] = useState(PRESETS[0].eq);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [bpm, setBpm] = useState(PRESETS[0].bpm);

  const [library, setLibrary] = useState(PRESETS.map((p, i) => ({ id: `preset-${i}`, name: p.name, eq: p.eq, bpm: p.bpm })));
  const [saveName, setSaveName] = useState('');
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLibraryVisible, setIsLibraryVisible] = useState(true);
  const [isSynthLibraryVisible, setIsSynthLibraryVisible] = useState(true);
  const [editorMode, setEditorMode] = useState<'standard' | 'desmos'>('standard');
  const [libraryTab, setLibraryTab] = useState<'beats' | 'projects'>('beats');
  const [isEditorVisible, setIsEditorVisible] = useState(true);
  const [timelineZoom, setTimelineZoom] = useState(1);

  const [tracks, setTracks] = useState<Track[]>(PROJECT_PRESETS[0].tracks);

  const [activeTab, setActiveTab] = useState<'synth' | 'producer'>('synth');
  const [synthVisType, setSynthVisType] = useState<'oscilloscope' | 'graph' | 'spectrum'>('graph');
  const [clips, setClips] = useState<Clip[]>(PROJECT_PRESETS[0].clips);
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
  
  const isPlayingRef = useRef(isPlaying);
  const bpmRef = useRef(bpm);
  const activeTabRef = useRef(activeTab);

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);
  useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);

  const updatePlayhead = useCallback(function updatePlayheadFn() {
    if (activeTabRef.current === 'producer' && isPlayingRef.current && audioCtxRef.current) {
      const t = audioCtxRef.current.currentTime - timeOffsetRef.current;
      const currentBeat = t * (bpmRef.current / 60);
      const positionPercentage = (currentBeat / TOTAL_BEATS) * 100;

      if (playheadRef.current) {
        playheadRef.current.style.left = `${positionPercentage}%`;
      }
    } else if (playheadRef.current && !isPlayingRef.current) {
        const t = audioCtxRef.current ? audioCtxRef.current.currentTime - timeOffsetRef.current : 0;
        const currentBeat = t * (bpmRef.current / 60);
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

  const draggingRef = useRef<{ id: string, type: 'move'|'resize', startX: number, initialStartBeat: number, initialLength: number, initialTrackId: number, timelineWidth: number } | null>(null);

  const syncWorklet = useCallback(() => {
    if (!workletNodeRef.current) return;
    if (activeTab === 'synth') {
      workletNodeRef.current.port.postMessage({ type: 'setEquation', equation });
    } else {
      const activeClips = clips.filter(c => {
         const track = tracks.find(t => t.id === c.trackId);
         return !(track?.muted);
      });
      workletNodeRef.current.port.postMessage({ 
        type: 'setTimeline', 
        clips: activeClips.map(c => ({
          startBeat: c.startBeat,
          endBeat: c.startBeat + c.lengthBeats,
          equation: c.equation
        }))
      });
    }
  }, [equation, clips, activeTab, tracks]);

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

  const handlePointerUp = useCallback(function handlePointerUpFn() {
     draggingRef.current = null;
     document.removeEventListener('pointermove', handlePointerMove);
     document.removeEventListener('pointerup', handlePointerUpFn);
  }, [handlePointerMove]);

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

  const togglePlay = async () => {
    if (isPlaying) {
      if (audioCtxRef.current) {
        await audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const nativeCtx = new AudioContext();
        Tone.setContext(nativeCtx);
        await Tone.start();
        
        const ctx = nativeCtx;
        audioCtxRef.current = ctx;

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
        
        // Enhance audio processing engine for high quality sound
        // Applying a mastering chain: EQ -> Compressor -> Lowpass (to remove aliasing harshness) -> StereoWidener -> Limiter
        const eq = new Tone.EQ3({ low: 2, mid: -1, high: 1 });
        const comp = new Tone.Compressor({ threshold: -20, ratio: 3, attack: 0.05, release: 0.15 });
        const lowpass = new Tone.Filter({ frequency: 16000, type: 'lowpass', rolloff: -24 });
        const widener = new Tone.StereoWidener(0.3);
        const limiter = new Tone.Limiter(-0.5);
        
        Tone.connect(analyserNode, eq as any);
        eq.chain(comp, lowpass, widener, limiter, Tone.getDestination());

        workletNode.port.onmessage = (event) => {
          if (event.data.type === 'error') {
            setError(event.data.error);
          } else if (event.data.type === 'success') {
            setError(null);
          }
        };

        syncWorklet();
        workletNode.port.postMessage({ type: 'setTempo', bpm });
      } else {
        syncWorklet();
        workletNodeRef.current?.port.postMessage({ type: 'setTempo', bpm });
      }

      await audioCtxRef.current.resume();
      setIsPlaying(true);
    } catch (err: any) {
      console.error('Audio initialization error:', err);
      setError(err.message || 'Failed to initialize audio');
    }
  };

  const restartTimeline = async () => {
    if (!isPlaying) {
      await togglePlay();
    }
    workletNodeRef.current?.port.postMessage({ type: 'resetTime' });
    if (audioCtxRef.current) {
       timeOffsetRef.current = audioCtxRef.current.currentTime;
    }
  };

  const stopTimelineAndReset = async () => {
    if (isPlayingRef.current) {
      if (audioCtxRef.current) {
        await audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    }
    workletNodeRef.current?.port.postMessage({ type: 'resetTime' });
    if (audioCtxRef.current) {
      timeOffsetRef.current = audioCtxRef.current.currentTime;
    } else {
      timeOffsetRef.current = 0;
    }
  };

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
    syncWorklet();
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
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const selectedClip = clips.find(c => c.id === selectedClipId);

  const updateSelectedClip = (updates: Partial<Clip>) => {
    setClips(prev => prev.map(c => c.id === selectedClipId ? { ...c, ...updates } : c));
  };

  const addClip = (trackId: number, eq?: string, name?: string) => {
    const newColor = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][clips.length % 5];
    
    // Use a simple incrementing id to avoid React compiler complaints about impure functions
    const nextId = 'clip-' + clips.length;
    
    const newClip: Clip = {
      id: nextId,
      trackId,
      startBeat: 0,
      lengthBeats: 4,
      equation: eq || PRESETS[0].eq,
      name: name || 'New Clip',
      color: newColor
    };
    setClips(prev => [...prev, newClip]);
    setSelectedClipId(newClip.id);
  };

  const saveToLibrary = () => {
    if (!saveName.trim()) return;
    const newId = 'user-' + library.length;
    setLibrary([...library, { id: newId, name: saveName, eq: equation, bpm }]);
    setSaveName('');
  };

  const addTrack = () => {
    const newId = tracks.length > 0 ? Math.max(...tracks.map(t => t.id)) + 1 : 0;
    setTracks([...tracks, { id: newId, name: `Track ${newId + 1}`, muted: false, height: 80 }]);
  };

  const toggleMute = (trackId: number) => {
    setTracks(prev => prev.map(t => t.id === trackId ? { ...t, muted: !t.muted } : t));
  };

  const loadProjectPreset = async (preset: typeof PROJECT_PRESETS[0]) => {
      await stopTimelineAndReset();
      setBpm(preset.bpm);
      setTracks(preset.tracks);
      
      const newClips = preset.clips.map(c => ({
        ...c,
        id: c.id + '-' + Math.floor(Math.random()*1000)
      }));
      
      setClips(newClips);
      setSelectedClipId(null);
  };

  const filteredLibrary = library.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.eq.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main className="w-full h-screen bg-white flex flex-col font-sans text-zinc-900 overflow-hidden">
      {/* Header / Nav */}
      <header className="h-auto md:h-16 shrink-0 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between px-4 md:px-8 py-4 sm:py-0 gap-4">
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-sm flex items-center justify-center text-white font-bold text-lg shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <span className="font-medium tracking-tight text-lg">Synthetica</span>
          </div>
          
          <div className="flex sm:hidden items-center gap-4 text-sm font-bold">
            <button 
              onClick={() => {
                stopTimelineAndReset();
                setActiveTab('synth');
              }} 
              className={`border-b-2 py-1 transition-colors uppercase tracking-widest text-[11px] ${activeTab === 'synth' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
            >
              Synth
            </button>
            <button 
              onClick={() => setActiveTab('producer')} 
              className={`border-b-2 py-1 transition-colors uppercase tracking-widest text-[11px] flex items-center gap-2 ${activeTab === 'producer' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
            >
              Producer
            </button>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-6 text-sm font-bold">
          <button 
            onClick={() => {
              stopTimelineAndReset();
              setActiveTab('synth');
            }} 
            className={`border-b-2 py-1 transition-colors uppercase tracking-widest text-[11px] ${activeTab === 'synth' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
          >
            Synth
          </button>
          <button 
            onClick={() => setActiveTab('producer')} 
            className={`border-b-2 py-1 transition-colors uppercase tracking-widest text-[11px] flex items-center gap-2 ${activeTab === 'producer' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
          >
            Producer
          </button>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-zinc-400 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-3">
             <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">BPM</span>
             <input type="number" value={bpm} onChange={(e) => setBpm(parseInt(e.target.value) || 120)} className="w-16 bg-zinc-50 border border-zinc-200 rounded px-2 py-1 text-xs outline-none focus:border-zinc-400 font-mono text-zinc-900" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
             <Volume2 className="w-4 h-4" />
             <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-20 sm:w-24 accent-zinc-900" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {activeTab === 'synth' ? (
          <>
              <div className="flex-1 bg-zinc-50 flex flex-col p-4 md:p-8 relative overflow-y-auto min-w-0">
              <div className="mb-6 p-4 md:p-8 bg-white border border-zinc-200 rounded-2xl flex flex-col gap-4 shadow-sm shrink-0">
                <div className="flex justify-between items-center relative z-20">
                  <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1 md:gap-2">
                    <Activity className="w-3.5 h-3.5 md:w-4 md:h-4" /> <span className="hidden sm:inline">Global </span>Synthesizer<span className="hidden md:inline"> Equation</span>
                  </h2>
                  <div className="flex items-center gap-1.5 md:gap-2 relative">
                    <button
                      onClick={togglePlay}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isPlaying 
                          ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200' 
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                      title={isPlaying ? 'Stop' : 'Play Live'}
                    >
                      {isPlaying ? <Square className="w-4 h-4" fill="currentColor" /> : <Play className="w-4 h-4 ml-0.5" fill="currentColor" />}
                    </button>
                    
                    <div className="relative">
                      <button
                        onClick={() => setIsSavePopupOpen(!isSavePopupOpen)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${isSavePopupOpen ? 'bg-zinc-100 text-zinc-800 border-zinc-200' : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'}`}
                        title="Save Beat"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      
                      {isSavePopupOpen && (
                        <div className="absolute top-full right-0 mt-2 p-3 bg-white border border-zinc-200 rounded-xl shadow-xl flex flex-col gap-2 w-64 origin-top-right">
                           <div className="flex items-center gap-1.5 w-full bg-zinc-50 border border-zinc-200 rounded-xl p-1.5 focus-within:border-zinc-400 focus-within:bg-white transition-all">
                             <input 
                               type="text" 
                               placeholder="Name beat..." 
                               value={saveName} 
                               onChange={e => setSaveName(e.target.value)} 
                               className="bg-transparent px-2 py-1 text-xs outline-none w-full font-medium"
                               autoFocus
                               onKeyDown={e => {
                                 if (e.key === 'Enter' && saveName.trim()) {
                                    saveToLibrary();
                                    setIsSavePopupOpen(false);
                                 }
                               }}
                             />
                             <button
                               onClick={() => {
                                 saveToLibrary();
                                 setIsSavePopupOpen(false);
                               }}
                               disabled={!saveName.trim()}
                               className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-white border border-zinc-200 shadow-sm hover:shadow-md focus:outline-none text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 transition-all whitespace-nowrap"
                             >
                               Save
                             </button>
                           </div>
                        </div>
                      )}
                    </div>
                    
                    <button className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-50 border border-zinc-200 text-zinc-400 hover:text-zinc-800 transition" onClick={() => setIsSynthLibraryVisible(true)} title="Show Library">
                      <Layers className="w-4 h-4" />
                    </button>
                    
                    <button 
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition border ${editorMode === 'desmos' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-zinc-50 border-zinc-200 text-zinc-400 hover:text-zinc-600'}`}
                      onClick={() => setEditorMode(editorMode === 'desmos' ? 'standard' : 'desmos')}
                      title={editorMode === 'desmos' ? 'Switch to Code Editor' : 'Switch to Math Editor'}
                    >
                      {editorMode === 'desmos' ? <Code className="w-4 h-4" /> : <Sigma className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <div className="text-3xl sm:text-4xl font-serif italic text-blue-500 shrink-0 mt-0 sm:mt-3 select-none">f(t) =</div>
                  <div className="flex-1 min-w-0 relative w-full group max-h-[300px] overflow-y-auto bg-zinc-50 focus-within:bg-white border rounded-xl shadow-inner transition-colors focus-within:-outline-offset-2 focus-within:outline-blue-500 overflow-hidden flex items-center">
                    {editorMode === 'desmos' ? (
                      <div className="w-full px-4 py-6">
                        <MathEditor 
                          value={latexEquation} 
                          onChange={setLatexEquation} 
                          onJsChange={setEquation} 
                        />
                      </div>
                    ) : (
                      <Editor
                        value={equation}
                        onValueChange={(code) => setEquation(code)}
                        highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
                        padding={24}
                        className="w-full text-xl sm:text-2xl md:text-3xl font-mono leading-relaxed outline-none break-all"
                        style={{
                          fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                          minHeight: '100px'
                        }}
                        placeholder="e.g. sin(2 * PI * 440 * t)"
                      />
                    )}
                    {error && <div className="absolute top-full mt-2 text-red-500 text-sm font-medium bg-red-50 px-3 py-2 border border-red-100 rounded-lg shadow-sm z-10">{error}</div>}
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-4 ml-0 md:ml-[88px]">
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 bg-zinc-50 border border-zinc-100 px-2.5 py-1.5 rounded-md">Math: <span className="text-zinc-500 font-mono lowercase">sin, cos, tan, abs, floor, random, sign</span></span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 bg-zinc-50 border border-zinc-100 px-2.5 py-1.5 rounded-md">Vars: <span className="text-zinc-500 font-mono lowercase">t, beat</span></span>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-white border border-zinc-200 rounded-2xl relative overflow-hidden flex flex-col shadow-sm min-h-[300px]">
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex items-center bg-white/90 backdrop-blur border border-zinc-200 rounded-lg overflow-hidden shadow-sm p-1">
                  <button 
                    onClick={() => setSynthVisType('graph')}
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition ${synthVisType === 'graph' ? 'bg-zinc-100 text-zinc-800' : 'text-zinc-400 hover:text-zinc-600'}`}
                  >
                    Graph
                  </button>
                  <button 
                    onClick={() => setSynthVisType('oscilloscope')}
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition ${synthVisType === 'oscilloscope' ? 'bg-zinc-100 text-zinc-800' : 'text-zinc-400 hover:text-zinc-600'}`}
                  >
                    Oscillo
                  </button>
                  <button 
                    onClick={() => setSynthVisType('spectrum')}
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition ${synthVisType === 'spectrum' ? 'bg-zinc-100 text-zinc-800' : 'text-zinc-400 hover:text-zinc-600'}`}
                  >
                    Spectrum
                  </button>
                </div>
                
                <div className="flex-1 w-full h-full p-4 pt-16">
                  {synthVisType === 'oscilloscope' ? (
                    <Visualizer analyser={analyser} type="oscilloscope" color="#3b82f6" />
                  ) : synthVisType === 'spectrum' ? (
                    <Visualizer analyser={analyser} type="spectrum" color="#10b981" />
                  ) : (
                    <GraphFunction equation={equation} color="#3b82f6" bpm={bpm} isPlaying={isPlaying} />
                  )}
                </div>
              </div>
            </div>
            {/* Right Column: Library */}
            <aside className={`shrink-0 border-l border-zinc-100 flex flex-col bg-white overflow-y-auto transition-all duration-300 z-20 absolute md:relative top-0 right-0 bottom-0 ${isSynthLibraryVisible ? 'w-full sm:w-80 translate-x-0' : 'w-12 translate-x-full md:translate-x-0'} shadow-2xl md:shadow-none`}>
              {isSynthLibraryVisible ? (
                <div className="p-6 space-y-4 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2"><Layers className="w-4 h-4" /> My Library</h3>
                    <button onClick={() => setIsSynthLibraryVisible(false)} className="p-2 md:p-0 text-zinc-400 hover:text-zinc-800 transition" title="Hide Library">
                      <PanelRightClose className="w-5 h-5 md:w-4 md:h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                     {library.map(preset => (
                      <div
                        key={preset.id}
                        onClick={() => {
                          setEquation(preset.eq);
                          setBpm(preset.bpm);
                        }}
                        className="flex flex-col gap-1 p-3 rounded-lg border border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 cursor-pointer text-zinc-700 transition"
                      >
                         <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${equation === preset.eq ? 'bg-blue-600' : 'bg-zinc-300'}`}></div>
                             <span className="text-sm font-bold truncate">{preset.name}</span>
                           </div>
                           <span className="text-[10px] font-mono text-zinc-400">{preset.bpm}</span>
                         </div>
                         <div className="pl-4 font-mono text-[9px] text-zinc-400 truncate opacity-60">
                           {preset.eq}
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-6 gap-4">
                  <button 
                    onClick={() => setIsSynthLibraryVisible(true)} 
                    className="p-2 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors"
                    title="Show Library"
                  >
                    <PanelRight className="w-4 h-4" />
                  </button>
                  <div className="w-px h-8 bg-zinc-200"></div>
                  <Layers className="w-4 h-4 text-zinc-300" />
                </div>
              )}
            </aside>
          </>
        ) : (
          <>
            {/* Left Column: Library in Producer Mode */}
            <div className={`border-r border-zinc-200 bg-white flex flex-col shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 absolute md:relative top-0 left-0 bottom-0 ${isLibraryVisible ? 'w-80 md:w-80 translate-x-0' : 'w-12 -translate-x-full md:translate-x-0'}`}>
              {isLibraryVisible ? (
                  <>
                  <div className="p-0 border-b border-zinc-100 shrink-0 relative flex flex-col">
                    <div className="p-6 pb-0 relative">
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 mb-4"><Layers className="w-4 h-4" /> Library</h3>
                      <button onClick={() => setIsLibraryVisible(false)} className="absolute top-5 right-4 p-2 md:p-0 md:top-6 text-zinc-400 hover:text-zinc-800 transition" title="Hide Library">
                        <PanelLeftClose className="w-5 h-5 md:w-4 md:h-4" />
                      </button>
                    </div>
                    
                    <div className="flex border-b border-zinc-100 px-6">
                      <button 
                        onClick={() => setLibraryTab('beats')}
                        className={`pb-3 text-[10px] uppercase font-bold tracking-widest flex-1 transition border-b-2 ${libraryTab === 'beats' ? 'border-zinc-800 text-zinc-800' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
                      >
                        Beats
                      </button>
                      <button 
                        onClick={() => setLibraryTab('projects')}
                        className={`pb-3 text-[10px] uppercase font-bold tracking-widest flex-1 transition border-b-2 ${libraryTab === 'projects' ? 'border-zinc-800 text-zinc-800' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
                      >
                        Projects
                      </button>
                    </div>
                    
                    {libraryTab === 'beats' && (
                      <div className="p-6 pt-4 shrink-0">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                          <input type="text" placeholder="Search beats..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-9 pr-3 py-2 text-xs outline-none focus:border-zinc-400" />
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-3">Drag a beat to the track timeline.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex-1 relative overflow-y-auto min-h-0 bg-zinc-50/50">
                    {libraryTab === 'beats' ? (
                       <div className="grid grid-cols-2 gap-3">
                         {filteredLibrary.map(preset => (
                          <div
                            key={preset.id}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData('application/json', JSON.stringify({ eq: preset.eq, name: preset.name }));
                              
                              const ghost = document.createElement('div');
                              ghost.style.width = '100px';
                              ghost.style.height = '40px';
                              ghost.style.background = '#3b82f6';
                              ghost.style.borderRadius = '4px';
                              ghost.style.position = 'absolute';
                              ghost.style.top = '-1000px';
                              document.body.appendChild(ghost);
                              e.dataTransfer.setDragImage(ghost, 50, 20);
                              setTimeout(() => document.body.removeChild(ghost), 0);
                            }}
                            className="flex flex-col p-3 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md cursor-grab active:cursor-grabbing text-zinc-700 transition-all group aspect-square relative overflow-hidden"
                          >
                             <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-100/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             <div className="relative z-10 flex flex-col h-full">
                               <div className="flex items-start justify-between gap-1 mb-2">
                                 <div className="flex items-center gap-1.5 overflow-hidden">
                                   <div className={`w-2 h-2 rounded-full shrink-0 ${selectedClip?.equation === preset.eq ? 'bg-zinc-800' : 'bg-zinc-300'}`}></div>
                                   <span className="text-xs font-bold leading-tight line-clamp-2">{preset.name}</span>
                                 </div>
                               </div>
                               <div className="mt-auto">
                                 <div className="font-mono text-[8px] text-zinc-400 leading-tight line-clamp-3 opacity-60 bg-white/50 p-1.5 rounded border border-zinc-100">
                                   {preset.eq}
                                 </div>
                               </div>
                               
                               <button 
                                 onClick={(e) => { e.stopPropagation(); addClip(0, preset.eq, preset.name); }} 
                                 className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 w-6 h-6 bg-white shadow-sm border border-zinc-100 rounded flex items-center justify-center transition-all hover:scale-110 shrink-0 z-20 text-zinc-400 hover:text-zinc-800"
                                 title="Add to Track 1"
                               >
                                 <Plus className="w-3.5 h-3.5" />
                               </button>
                             </div>
                          </div>
                        ))}
                       </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {PROJECT_PRESETS.map((preset, idx) => (
                           <div key={idx} className="bg-white border border-zinc-200 rounded-xl p-4 hover:border-zinc-300 hover:shadow-sm transition cursor-pointer" onClick={() => loadProjectPreset(preset)}>
                             <h4 className="text-sm font-bold text-zinc-800 mb-1">{preset.name}</h4>
                             <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-3">
                               {preset.bpm} BPM • {preset.tracks.length} Tracks
                             </div>
                             <button className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold py-2 rounded-lg transition">
                               Load Project
                             </button>
                           </div>
                        ))}
                      </div>
                    )}
                  </div>
                  </>
              ) : (
                <div className="flex flex-col items-center py-6 h-full cursor-pointer hover:bg-zinc-50 transition-colors" onClick={() => setIsLibraryVisible(true)} title="Show Library">
                  <PanelLeft className="w-4 h-4 text-zinc-400 mb-6" />
                  <div className="flex-1 flex items-start justify-center">
                     <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                       Beats Library
                     </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 bg-zinc-50 flex flex-col relative overflow-hidden min-w-0">
            <div className="h-16 border-b border-zinc-200 flex items-center px-4 md:px-6 gap-2 md:gap-4 bg-white shrink-0 z-10 shadow-sm relative overflow-x-auto">
               <button className="md:hidden p-2 text-zinc-400 hover:text-zinc-800" onClick={() => setIsLibraryVisible(true)} title="Show Library">
                 <PanelLeft className="w-5 h-5" />
               </button>
               <button
                  onClick={restartTimeline}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 text-zinc-700 transition shrink-0"
                  title="Rewind to Start"
                >
                  <Rewind className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" />
                </button>
                <button
                  onClick={togglePlay}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white shadow-sm transition shrink-0 ${isPlaying ? 'bg-zinc-700 hover:bg-zinc-800' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isPlaying ? <Square className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" /> : <Play className="w-3 h-3 md:w-4 md:h-4 ml-1" fill="currentColor" />}
                </button>
                
                <div className="h-6 w-px bg-zinc-200 lg:mx-2 hidden sm:block shrink-0"></div>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 whitespace-nowrap hidden sm:inline-block shrink-0">Beats: {TOTAL_BEATS}</span>
                
                <div className="ml-auto flex items-center gap-1 md:gap-2 bg-zinc-50 border border-zinc-200 rounded-lg p-1 shrink-0">
                  <button onClick={() => setTimelineZoom(z => Math.max(0.25, z - 0.25))} className="w-8 h-8 md:w-6 md:h-6 flex items-center justify-center rounded text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800 transition" title="Zoom Out">
                    <ZoomOut className="w-4 h-4 md:w-3.5 md:h-3.5" />
                  </button>
                  <span className="text-[10px] font-bold text-zinc-400 w-10 md:w-12 text-center uppercase tracking-widest">{Math.round(timelineZoom * 100)}%</span>
                  <button onClick={() => setTimelineZoom(z => Math.min(5, z + 0.25))} className="w-8 h-8 md:w-6 md:h-6 flex items-center justify-center rounded text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800 transition" title="Zoom In">
                    <ZoomIn className="w-4 h-4 md:w-3.5 md:h-3.5" />
                  </button>
                </div>
                <button className="md:hidden p-2 text-zinc-400 hover:text-zinc-800 shrink-0" onClick={() => setIsEditorVisible(true)} title="Show Editor">
                 <Settings2 className="w-5 h-5" />
               </button>
            </div>

            {/* Timeline Body */}
            <div className="flex-1 overflow-auto relative flex flex-col bg-zinc-50" id="scroll-container">
               <div style={{ width: `${(TOTAL_BEATS / 32) * timelineZoom * 100}%` }} className="flex flex-col relative h-full shrink-0">
                  <div 
                    className="flex h-8 bg-zinc-100/50 border-b border-zinc-200 sticky top-0 z-40 shrink-0 cursor-ew-resize"
                    onPointerDown={handleScrubStart}
                  >
                    <div className="w-20 md:w-32 border-r border-zinc-200 shrink-0 bg-zinc-50 pointer-events-none sticky left-0 z-50"></div>
                    <div className="flex-1 relative pointer-events-auto" id="timeline-ruler">
                      {Array.from({ length: TOTAL_BEATS }).map((_, i) => (
                        <div key={i} className="absolute top-0 bottom-0 border-l border-zinc-200 text-[10px] text-zinc-400 pl-1 pt-1 font-mono pointer-events-none select-none" style={{ left: `${(i / TOTAL_BEATS) * 100}%` }}>
                          {i}
                        </div>
                      ))}
                      
                      {/* Playhead */}
                      <div 
                        ref={playheadRef}
                        className="absolute top-0 w-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] transform -translate-x-1/2 z-50 pointer-events-none"
                        style={{ left: '0%', height: '2000px' }}
                      >
                        <div 
                          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 cursor-ew-resize pointer-events-auto" 
                          onPointerDown={handleScrubStart}
                        ></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tracks */}
                  <div className="flex-1 flex flex-col" id="tracks-container" ref={timelineRef}>
                    {tracks.map(track => (
                      <div key={track.id} data-trackid={track.id} style={{ height: track.height }} className={`flex border-b border-zinc-100 group relative ${track.muted ? 'bg-zinc-100 opacity-50' : 'bg-white'}`}>
                        <div className="w-20 md:w-32 border-r border-zinc-100 flex flex-col items-center justify-center shrink-0 relative bg-zinc-50 sticky left-0 z-20 overflow-hidden">
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400 truncate w-full text-center px-1 md:px-0">{track.name}</span>
                          <button onClick={() => toggleMute(track.id)} className={`mt-1 flex items-center gap-1 text-[9px] px-1 md:px-1.5 py-0.5 rounded border border-zinc-200 transition-colors ${track.muted ? 'bg-zinc-200 text-zinc-500' : 'bg-white text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50'}`}>
                             {track.muted ? <VolumeX className="w-2.5 h-2.5 md:w-3 md:h-3" /> : <Volume2 className="w-2.5 h-2.5 md:w-3 md:h-3" />} <span className="hidden md:inline">{track.muted ? 'Muted' : 'Mute'}</span>
                          </button>
                          <button onClick={() => addClip(track.id)} className="opacity-100 md:opacity-0 group-hover:opacity-100 absolute right-1 top-1 w-4 h-4 md:w-6 md:h-6 rounded bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-opacity" title="Add Clip">
                            <Plus className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          </button>
                        </div>
                        <div 
                          className="flex-1 relative hover:bg-zinc-50/30 transition-colors" 
                          style={{ backgroundImage: 'linear-gradient(to right, #f4f4f5 1px, transparent 1px)', backgroundSize: `calc(100% / ${TOTAL_BEATS}) 100%` }}
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
                              const data = JSON.parse(e.dataTransfer.getData('application/json'));
                              if (data.eq && data.name) {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const relativeX = e.clientX - rect.left;
                                const startBeat = Math.round(((relativeX / rect.width) * TOTAL_BEATS) * 4) / 4;
                                
                                const newColor = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][clips.length % 5];
                                const nextId = 'clip-' + clips.length + '-' + Math.floor(Math.random()*1000);
                                
                                const newClip: Clip = {
                                  id: nextId,
                                  trackId: track.id,
                                  startBeat: Math.max(0, Math.min(TOTAL_BEATS - 1, startBeat)),
                                  lengthBeats: 4,
                                  equation: data.eq,
                                  name: data.name,
                                  color: newColor
                                };
                                setClips(prev => [...prev, newClip]);
                                setSelectedClipId(nextId);
                              }
                            } catch (err) {}
                          }}
                        >
                           {clips.filter(c => c.trackId === track.id).map(clip => (
                             <div 
                               key={clip.id} 
                               onPointerDown={(e) => handlePointerDown(e, clip.id, 'move')}
                               className={`absolute top-2 bottom-2 rounded shadow-sm text-white overflow-hidden cursor-grab active:cursor-grabbing flex flex-col justify-between transition-none ${selectedClipId === clip.id ? 'ring-2 ring-black z-10' : 'hover:brightness-110'}`} 
                               style={{ 
                                 left: `${(clip.startBeat / TOTAL_BEATS) * 100}%`, 
                                 width: `${(clip.lengthBeats / TOTAL_BEATS) * 100}%`,
                                 backgroundColor: clip.color
                               }}
                             >
                               <div className="p-2 pointer-events-none">
                                 <span className="text-[10px] font-bold block truncate">{clip.name}</span>
                                 <span className="font-mono text-[8px] opacity-80 block truncate">{clip.equation}</span>
                               </div>
                               
                               {/* Resize Handle - Right */}
                               <div 
                                  onPointerDown={(e) => handlePointerDown(e, clip.id, 'resize')}
                                  className="absolute right-0 top-0 bottom-0 w-4 md:w-2 cursor-ew-resize hover:bg-black/20 bg-black/5 md:bg-transparent"
                               />
                             </div>
                           ))}
                        </div>
                        
                        {/* Track Resize Handle */}
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
                              setTracks(prev => prev.map(t => t.id === track.id ? { ...t, height: newHeight } : t));
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
                    ))}
                    
                    {/* Add Track Button */}
                    <div className="flex h-10 border-b border-zinc-100 bg-zinc-50/30">
                       <div className="w-20 md:w-32 border-r border-zinc-100 flex items-center justify-center shrink-0 sticky left-0 z-20">
                         <button onClick={addTrack} className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:bg-zinc-200/50 hover:text-zinc-800 transition-colors" title="Add Track">
                           <Plus className="w-4 h-4" />
                         </button>
                       </div>
                       <div className="flex-1"></div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Clip Editor Sidebar */}
          <div className={`border-l border-zinc-200 bg-white flex flex-col shrink-0 z-20 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 absolute md:relative top-0 right-0 bottom-0 max-w-full ${isEditorVisible ? 'w-full sm:w-80 translate-x-0' : 'w-12 translate-x-full md:translate-x-0'}`}>
            {isEditorVisible ? (
              selectedClip ? (
                <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                   <div className="flex items-center justify-between mb-6 shrink-0 relative">
                     <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2"><Settings2 className="w-4 h-4"/> Edit Clip</h4>
                     <div className="flex items-center gap-2">
                       <button onClick={() => {
                         setClips(clips.filter(c => c.id !== selectedClip.id));
                         setSelectedClipId(null);
                       }} className="text-red-500 hover:text-red-600 text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition" title="Delete Clip">
                         <Trash2 className="w-3 h-3" />
                       </button>
                       <button onClick={() => setIsEditorVisible(false)} className="text-zinc-400 hover:text-zinc-800 transition p-2 md:p-1" title="Hide Editor">
                         <PanelRightClose className="w-5 h-5 md:w-4 md:h-4" />
                       </button>
                     </div>
                   </div>
                   
                   <div className="flex flex-col gap-6 h-full">
                      <div className="space-y-4 shrink-0">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest block mb-1.5">Name</label>
                          <input type="text" value={selectedClip.name} onChange={e => updateSelectedClip({ name: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded px-3 py-2 text-sm outline-none focus:border-zinc-400 focus:bg-white font-medium transition" />
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest block mb-1.5">Start (Beat)</label>
                            <input type="number" step="0.25" min="0" max={TOTAL_BEATS - 0.25} value={selectedClip.startBeat} onChange={e => updateSelectedClip({ startBeat: Number(e.target.value) })} className="w-full bg-zinc-50 border border-zinc-200 rounded px-2 text-center py-2 text-sm outline-none focus:border-zinc-400 focus:bg-white font-mono transition" />
                          </div>
                          <div className="flex-1">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest block mb-1.5">Len (Beats)</label>
                            <input type="number" step="0.25" min="0.25" max={TOTAL_BEATS} value={selectedClip.lengthBeats} onChange={e => updateSelectedClip({ lengthBeats: Number(e.target.value) })} className="w-full bg-zinc-50 border border-zinc-200 rounded px-2 text-center py-2 text-sm outline-none focus:border-zinc-400 focus:bg-white font-mono transition" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col min-h-[200px] min-w-0">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest block mb-1.5">Equation f(t)</label>
                        <div className="flex-1 overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 shadow-inner">
                          <Editor 
                            value={selectedClip.equation} 
                            onValueChange={code => updateSelectedClip({ equation: code })}
                            highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
                            padding={16}
                            className="text-zinc-100 text-xs leading-relaxed outline-none font-mono min-h-full break-all"
                            style={{
                              fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                            }}
                          />
                        </div>

                        {error && (
                          <div className="mt-2 text-red-500 bg-red-50 border border-red-100 p-2 rounded text-[10px] font-mono break-all">{error}</div>
                        )}
                        {!error && (
                          <div className="mt-2 text-zinc-400 text-[10px] px-1">Tip: Use <code className="bg-zinc-100 px-1 rounded text-zinc-600">t</code> for time, <code className="bg-zinc-100 px-1 rounded text-zinc-600">beat</code> for current beat, and math functions like <code className="bg-zinc-100 px-1 rounded text-zinc-600">sin</code>, <code className="bg-zinc-100 px-1 rounded text-zinc-600">cos</code>.</div>
                        )}
                      </div>
                   </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 text-sm p-6 text-center relative">
                  <button onClick={() => setIsEditorVisible(false)} className="text-zinc-400 hover:text-zinc-800 transition absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-1" title="Hide Editor">
                    <PanelRightClose className="w-5 h-5 md:w-4 md:h-4" />
                  </button>
                  <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-4 mt-8">
                    <Settings2 className="w-8 h-8 text-zinc-300" />
                  </div>
                  <h3 className="font-medium text-zinc-600 mb-2">No Clip Selected</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">Select a clip on the timeline or drag a beat from the library to edit its properties and equation.</p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center py-6 h-full cursor-pointer hover:bg-zinc-50 transition-colors" onClick={() => setIsEditorVisible(true)} title="Show Editor">
                <PanelRight className="w-4 h-4 text-zinc-400 mb-6" />
                <div className="flex-1 flex items-start justify-center">
                   <span className="[writing-mode:vertical-lr] text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                     Clip Editor
                   </span>
                </div>
              </div>
            )}
          </div>
          </>
        )}
      </div>
    </main>
  );
}
