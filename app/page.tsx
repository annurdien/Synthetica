'use client';
import { useState } from 'react';
import { MusicAnimation } from '@/app/components/MusicAnimation';
import { LandingMusicPlayer } from '@/app/components/LandingMusicPlayer';
import { LaunchButton } from '@/app/components/LaunchButton';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { Scrollytelling } from '@/app/components/Scrollytelling';
import { Activity, ArrowDown } from 'lucide-react';

import type * as Tone from 'tone';

export default function LandingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioNodes, setAudioNodes] = useState<{ waveform: Tone.Waveform } | null>(null);

  return (
    <main className="w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative selection:bg-zinc-200 dark:selection:bg-zinc-800">
      
      {/* Fixed UI Overlays */}
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* SECTION 1: Intro */}
      <section className="w-full h-screen flex flex-col items-center justify-center relative z-10 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Activity className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
          <span className="font-serif text-xl font-bold tracking-tight">Synthetica</span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-center leading-[1.1] mb-6">
          Visualize sound from<br/>
          <span className="italic text-zinc-500 dark:text-zinc-400">
            mathematics.
          </span>
        </h1>

        <p className="font-sans text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl text-center font-light leading-relaxed">
          A powerful audio synthesizer driven entirely by mathematical equations. 
        </p>

        <div className="absolute bottom-12 flex flex-col items-center text-zinc-400 animate-bounce">
          <span className="text-sm font-mono mb-2">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </section>

      {/* SECTION 2: Scrollytelling Experience */}
      <Scrollytelling />

      {/* SECTION 3: The Interactive Climax */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 md:px-8 bg-white dark:bg-zinc-950 py-24">
        
        <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-center mb-16">
          Now it's <span className="italic text-zinc-500 dark:text-zinc-400">your turn.</span>
        </h2>

        <div className="max-w-4xl w-full mx-auto flex flex-col items-center">
          {/* Animation Area */}
          <div className="h-40 md:h-56 w-full flex items-end justify-center mb-12">
            <MusicAnimation playing={isPlaying} audioNodes={audioNodes} />
          </div>

          <p className="font-sans text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl text-center mb-12 font-light leading-relaxed">
            Write functions, create melodies, and sculpt waveforms in real-time inside the studio.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <LaunchButton />
            <LandingMusicPlayer 
              onPlayingChange={setIsPlaying} 
              onInitAnalyser={setAudioNodes} 
            />
          </div>

          <div className="mt-8">
             <a href="/tutorial" className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 font-medium text-sm flex items-center gap-2 group transition-colors">
               <span>New to this? Try the Interactive Beat Tutorial</span>
               <ArrowDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
             </a>
          </div>
        </div>

      </section>
    </main>
  );
}
