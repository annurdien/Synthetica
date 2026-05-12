'use client';
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export function LandingMusicPlayer({ onPlayingChange }: { onPlayingChange: (playing: boolean) => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<Tone.FMSynth | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);
  const filterRef = useRef<Tone.Filter | null>(null);

  useEffect(() => {
    return () => {
      synthRef.current?.dispose();
      loopRef.current?.dispose();
      filterRef.current?.dispose();
    };
  }, []);

  const togglePlay = async () => {
    if (isPlaying) {
      Tone.Transport.stop();
      setIsPlaying(false);
      onPlayingChange(false);
      return;
    }

    await Tone.start();

    if (!synthRef.current) {
      // Create a lush, ambient FM synth
      const synth = new Tone.FMSynth({
        harmonicity: 1.5,
        modulationIndex: 3.5,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.1, decay: 0.3, sustain: 0.2, release: 2 },
        modulation: { type: 'square' },
        modulationEnvelope: { attack: 0.2, decay: 0.1, sustain: 0.2, release: 0.5 },
      });
      
      const filter = new Tone.Filter(800, "lowpass");
      const reverb = new Tone.Reverb({ decay: 4, wet: 0.4 }).toDestination();
      const delay = new Tone.FeedbackDelay("8n", 0.4).connect(reverb);
      
      synth.chain(filter, delay, reverb);
      
      synthRef.current = synth;
      filterRef.current = filter;

      const notes = ['C4', 'E4', 'G4', 'B4', 'C5', 'G4'];
      let index = 0;

      const loop = new Tone.Loop((time) => {
        synth.triggerAttackRelease(notes[index], '8n', time, 0.4);
        filter.frequency.rampTo(400 + Math.random() * 1200, 0.1);
        index = (index + 1) % notes.length;
      }, '16n');

      loopRef.current = loop;
    }

    Tone.Transport.bpm.value = 100;
    Tone.Transport.start();
    loopRef.current?.start(0);
    setIsPlaying(true);
    onPlayingChange(true);
  };

  return (
    <button 
      onClick={togglePlay}
      className={`px-8 py-4 rounded-full font-sans font-bold uppercase tracking-widest text-sm transition-colors border-2 ${
        isPlaying 
          ? 'border-zinc-200 text-zinc-600 bg-zinc-50 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
          : 'border-zinc-900 text-zinc-900 bg-white hover:bg-zinc-50 dark:border-zinc-100 dark:text-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900'
      }`}
    >
      {isPlaying ? 'Stop Demo' : 'Play Demo'}
    </button>
  );
}
