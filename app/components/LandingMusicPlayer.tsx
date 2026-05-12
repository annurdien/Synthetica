'use client';
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { motion } from 'motion/react';

export function LandingMusicPlayer({ 
  onPlayingChange,
  onInitAnalyser 
}: { 
  onPlayingChange?: (playing: boolean) => void,
  onInitAnalyser?: (nodes: { waveform: Tone.Waveform }) => void 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);
  const effectsRef = useRef<Tone.ToneAudioNode[]>([]);

  useEffect(() => {
    return () => {
      if (loopRef.current) loopRef.current.dispose();
      if (synthRef.current) synthRef.current.dispose();
      effectsRef.current.forEach(fx => fx.dispose());
    };
  }, []);

  const togglePlay = async () => {
    if (!isPlaying) {
      await Tone.start();
      
      if (!synthRef.current) {
        // Create a lush, ambient Electric Piano / Bell sound
        synthRef.current = new Tone.PolySynth(Tone.FMSynth, {
          harmonicity: 2,
          modulationIndex: 2.5,
          oscillator: { type: "sine" },
          envelope: { attack: 0.05, decay: 0.4, sustain: 0.4, release: 4 },
          modulation: { type: "triangle" },
          modulationEnvelope: { attack: 0.05, decay: 0.5, sustain: 0.2, release: 4 }
        });

        // Beautiful spatial effects chain
        const filter = new Tone.Filter(1500, "lowpass");
        const chorus = new Tone.Chorus(4, 2.5, 0.5).start();
        const delay = new Tone.PingPongDelay("8n.", 0.3);
        const reverb = new Tone.Reverb({ decay: 6, wet: 0.6 });
        
        // Setup live waveform analyzer
        const waveform = new Tone.Waveform(512);
        
        synthRef.current.chain(chorus, filter, delay, reverb, waveform, Tone.Destination);
        synthRef.current.volume.value = -16; // Very gentle ambient volume
        
        effectsRef.current = [filter, chorus, delay, reverb, waveform];
        
        if (onInitAnalyser) {
          onInitAnalyser({ waveform });
        }
      }

      if (!loopRef.current) {
        // Modern emotional / cinematic progression (Maj9 and Min9 chords)
        const chords = [
          ["C4", "E4", "G4", "B4", "D5"], // CMaj9
          ["A3", "C4", "E4", "G4", "B4"], // Amin9
          ["F3", "A3", "C4", "E4", "G4"], // FMaj9
          ["G3", "B3", "D4", "F4", "A4"]  // G9
        ];
        let step = 0;

        loopRef.current = new Tone.Loop((time) => {
          const chord = chords[step % chords.length];
          // Gentle "strum" effect by staggering notes
          chord.forEach((note, i) => {
             synthRef.current?.triggerAttackRelease(note, "2n", time + i * 0.03);
          });
          step++;
        }, "1m").start(0);
      }

      Tone.Transport.bpm.value = 75; // Slow, breathing tempo
      Tone.Transport.start();
      setIsPlaying(true);
      onPlayingChange?.(true);
    } else {
      Tone.Transport.stop();
      if (synthRef.current) synthRef.current.releaseAll();
      setIsPlaying(false);
      onPlayingChange?.(false);
    }
  };

  return (
    <button 
      onClick={togglePlay}
      className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans font-bold uppercase tracking-widest text-sm transition-colors border-2 overflow-hidden cursor-pointer ${
        isPlaying 
          ? 'border-zinc-200 text-zinc-600 bg-zinc-50 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
          : 'border-zinc-900 text-zinc-900 bg-white hover:bg-zinc-50 dark:border-zinc-100 dark:text-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900'
      }`}
    >
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        initial={false}
      >
        <motion.path
          animate={{
            d: isPlaying
              ? "M 6 6 L 18 6 L 18 18 L 6 18 Z" // Stop Square
              : "M 7 5 L 19 12 L 19 12 L 7 19 Z" // Play Triangle
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.svg>
      <span>{isPlaying ? 'Stop Demo' : 'Play Demo'}</span>
    </button>
  );
}
