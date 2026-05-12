'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MusicAnimation } from '@/app/components/MusicAnimation';
import { LandingMusicPlayer } from '@/app/components/LandingMusicPlayer';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { ArrowRight, Activity } from 'lucide-react';

export default function LandingPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <main className="w-full min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col relative overflow-hidden selection:bg-zinc-200 dark:selection:bg-zinc-800">
      
      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 md:px-8 max-w-5xl mx-auto w-full">
        
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <Activity className="w-8 h-8 text-zinc-900 dark:text-zinc-100" />
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight">Synthetica</span>
        </div>

        {/* Animation Area */}
        <div className="h-40 md:h-56 w-full flex items-end justify-center mb-12">
          <MusicAnimation playing={isPlaying} />
        </div>

        {/* Fancy Typography Hero */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-center leading-[1.1] mb-6">
          Visualize sound from<br/>
          <span className="italic text-zinc-500 dark:text-zinc-400">
            mathematics.
          </span>
        </h1>

        <p className="font-sans text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl text-center mb-12 font-light leading-relaxed">
          A powerful audio synthesizer driven entirely by mathematical equations. 
          Write functions, create melodies, and sculpt waveforms in real-time.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Link 
            href="/studio"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-sans font-bold uppercase tracking-widest text-sm transition-colors border-2 border-zinc-900 dark:border-zinc-100"
          >
            Launch Studio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <LandingMusicPlayer onPlayingChange={setIsPlaying} />
        </div>
      </div>
    </main>
  );
}
