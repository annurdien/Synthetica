"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause } from 'lucide-react';
import { MathEditor } from '@/app/components/MathEditor';
import { Visualizer } from '@/components/Visualizer';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { latexToJS } from '@/app/lib/latexToJS';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    id: 1,
    math: "Sound is just a vibrating wave. The 'sin' function is our fundamental building block. It creates a smooth wiggle that oscillates between 1 and -1.",
    controls: ['Time: t', 'Function: sin(t)', 'State: Inaudible'],
    equation: '\\sin(t)',
  },
  {
    id: 2,
    math: "To hear a pitch, we need fast vibrations. We use 2 * pi to make the wave repeat every second, then multiply by 261.63 (Middle C) to set the frequency.",
    controls: ['Cycle: 2 * pi', 'Frequency: 261.63 Hz', 'Note: Middle C'],
    equation: '\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot t)',
  },
  {
    id: 3,
    math: "The wave's height is its 'Amplitude'. Multiplying by 0.3 makes the wave smaller, which we perceive as a lower volume (30% power).",
    controls: ['Volume: 0.3', 'Peak: 1.0 -> 0.3', 'Scale: Linear'],
    equation: '\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot t) \\cdot 0.3',
  },
  {
    id: 4,
    math: "Static tones are boring. We use 'beat' and 'exp' to create an 'Envelope'. This makes the volume spike at the start of every beat and fade away.",
    controls: ['Decay: exp(-6 * x)', 'Rhythm: beat mod 1', 'Shape: Percussive'],
    equation: '\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot t) \\cdot \\exp(-6 \\cdot (beat \\bmod 1)) \\cdot 0.3',
  },
  {
    id: 5,
    math: "Harmonics make sound rich. By adding a second wave at exactly twice the frequency (an octave), we change the 'Timbre' or texture of the sound.",
    controls: ['Fundamental: 261.63', 'Octave: * 2', 'Blend: 0.2 + 0.1'],
    equation: '(\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot t) \\cdot 0.2 + \\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot 2 \\cdot t) \\cdot 0.1) \\cdot \\exp(-5 \\cdot (beat \\bmod 1))',
  },
  {
    id: 6,
    math: "We can 'program' melodies using arrays. The floor function keeps us on one note for a set duration before jumping to the next index in the list.",
    controls: ['Scale: [0, 4, 7]', 'Intervals: Major Triad', 'Logic: floor(beat)'],
    equation: '\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot 1.05946^{[0,4,7][\\floor(beat) \\bmod 3]} \\cdot t) \\cdot \\exp(-6 \\cdot (beat \\bmod 1)) \\cdot 0.3',
  },
  {
    id: 7,
    math: "Percussion comes from chaos. The 'random' function produces white noise. With a very sharp envelope, it sounds like a hi-hat or a snare.",
    controls: ['Noise: random()', 'Attack: Immediate', 'Decay: exp(-40 * x)'],
    equation: '(\\text{random}() \\cdot 2 - 1) \\cdot \\exp(-40 \\cdot (beat \\bmod 1)) \\cdot 0.08',
  },
  {
    id: 8,
    math: "Combining everything: a sub-bass, a mid-range melody, and high-frequency noise creates a full generative composition using only math.",
    controls: ['Bass: 65.41 Hz', 'Melody: Scale Array', 'Percussion: Noise'],
    equation: '(\\sin(2 \\cdot \\pi \\cdot 65.41 \\cdot t) \\cdot \\exp(-2 \\cdot (beat \\bmod 1)) \\cdot 0.22) + (\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot 1.05946^{[0,2,4,5,7,9,11,12][\\floor(beat \\cdot 2) \\bmod 8]} \\cdot t) \\cdot \\exp(-6 \\cdot ((beat \\cdot 2) \\bmod 1)) \\cdot 0.2) + ((\\text{random}() \\cdot 2 - 1) \\cdot \\exp(-32 \\cdot ((beat \\cdot 4) \\bmod 1)) \\cdot 0.05)',
  }
];

export default function TutorialPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [latexEquation, setLatexEquation] = useState(STEPS[0].equation);
  const [equationJs, setEquationJs] = useState(latexToJS(STEPS[0].equation));

  const audioCtxRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const { scrollYProgress } = useScroll();

  // Fade content in and out as we scroll between steps
  const contentOpacity = useTransform(scrollYProgress, (progress) => {
    if (STEPS.length <= 1) return 1;
    const scaled = progress * (STEPS.length - 1);
    const distance = Math.abs(scaled - Math.round(scaled));
    if (distance < 0.1) return 1;
    if (distance > 0.4) return 0;
    return 1 - ((distance - 0.1) / 0.3);
  });

  const yOffset = useTransform(scrollYProgress, (progress) => {
    if (STEPS.length <= 1) return 0;
    const scaled = progress * (STEPS.length - 1);
    const diff = scaled - Math.round(scaled);
    return diff * -40;
  });

  const inverseYOffset = useTransform(yOffset, (y) => -y * 0.5);

  const initAudio = async () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      await ctx.audioWorklet.addModule('/worklet.js');
      const workletNode = new AudioWorkletNode(ctx, 'math-processor');

      const analyserNode = ctx.createAnalyser();
      analyserNode.fftSize = 2048;

      workletNode.connect(analyserNode);
      analyserNode.connect(ctx.destination);

      workletNodeRef.current = workletNode;
      setAnalyser(analyserNode);

      workletNode.port.postMessage({ type: 'setEquation', equation: equationJs });
      workletNode.port.postMessage({ type: 'setTempo', bpm: 120 });
    }
  };

  const handleStart = async () => {
    await initAudio();
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }
      // Force scroll reset and state reset to ensure we start at Step 1
      window.scrollTo(0, 0);
      setCurrentStep(0);
      setLatexEquation(STEPS[0].equation);
      setEquationJs(latexToJS(STEPS[0].equation));

      setIsPlaying(true);
      setHasStarted(true);
    }
  };

  const togglePlay = async () => {
    if (!audioCtxRef.current) await initAudio();
    if (!audioCtxRef.current) return;

    if (isPlaying) {
      await audioCtxRef.current.suspend();
      setIsPlaying(false);
    } else {
      if (workletNodeRef.current) workletNodeRef.current.port.postMessage({ type: 'resetTime' });
      if (audioCtxRef.current.state === 'suspended') await audioCtxRef.current.resume();
      setIsPlaying(true);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const progress = Math.max(0, Math.min(1, latest));
    const stepIndex = Math.round(progress * (STEPS.length - 1));
    if (stepIndex !== currentStep) {
      setCurrentStep(stepIndex);
      const nextLatex = STEPS[stepIndex].equation;
      setLatexEquation(nextLatex);
      setEquationJs(latexToJS(nextLatex));
    }
  });

  useEffect(() => {
    if (workletNodeRef.current) {
      workletNodeRef.current.port.postMessage({ type: 'setEquation', equation: equationJs });
    }
  }, [equationJs]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const snapClass = 'tutorial-scroll-snap';
    document.documentElement.classList.add(snapClass);
    document.body.classList.add(snapClass);
    return () => {
      document.documentElement.classList.remove(snapClass);
      document.body.classList.remove(snapClass);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(console.error);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-white font-sans selection:bg-amber-400/30 min-h-screen transition-colors duration-500">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(15px)' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-black p-6 text-center overflow-hidden"
          >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-200 dark:from-zinc-800/60 via-white dark:via-black to-white dark:to-black" />
              <div
                className="absolute inset-0 opacity-[0.08] dark:opacity-[0.08]"
                style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }}
              />
            </div>

            <div className="relative group mb-12 z-10">
              <motion.div
                animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-black/10 dark:border-white/30"
              />
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.2, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-black/5 dark:border-white/20"
              />
              <button
                onClick={handleStart}
                className="relative z-10 w-28 h-28 flex items-center justify-center border-2 border-black dark:border-white text-black dark:text-white rounded-full transition-all hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:scale-105 active:scale-95 group"
              >
                <Play className="w-10 h-10 fill-none group-hover:fill-current translate-x-1 transition-colors" />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-zinc-400 dark:text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em]">Start Tutorial</p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="fixed inset-0 z-0 opacity-10 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen pointer-events-none">
              {analyser && <Visualizer analyser={analyser} type="oscilloscope" isPlaying={isPlaying} />}
            </div>

            <div className="fixed inset-0 z-10 pointer-events-none">
              <div className="absolute z-50 top-6 right-6 md:top-8 md:right-8 flex items-center gap-4 pointer-events-auto">
                <button
                  onClick={togglePlay}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110 active:scale-95 group ${
                    isPlaying 
                      ? 'bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/30 text-zinc-900 dark:text-white' 
                      : 'bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white text-white dark:text-black'
                  }`}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isPlaying ? 'pause' : 'play'}
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
                    </motion.div>
                  </AnimatePresence>
                </button>
                <ThemeToggle />
              </div>

              <div className="absolute z-40 top-8 left-8 pointer-events-auto">
                <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 font-mono">
                  Phase {currentStep + 1} <span className="opacity-30 mx-2">/</span> {STEPS.length}
                </div>
              </div>

              <div className="relative h-full flex items-center justify-center pointer-events-auto">
                {/* Scroll Indicator (Mouse Style) */}
                {currentStep < STEPS.length - 1 && (
                  <motion.div
                    style={{ opacity: contentOpacity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                  >
                    <div className="w-[18px] h-[30px] border border-zinc-300 dark:border-zinc-500/50 rounded-full flex justify-center p-1">
                      <motion.div
                        animate={{ y: [0, 10, 0], opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-[2px] h-[4px] bg-zinc-400 dark:bg-zinc-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}

                {/* End of Tutorial CTA */}
                {currentStep === STEPS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
                  >
                    <Link
                      href="/studio"
                      className="px-12 py-3 border border-black/10 dark:border-white/20 rounded-full text-sm font-serif tracking-tight text-zinc-900 dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-500"
                    >
                      Enter the Studio
                    </Link>
                  </motion.div>
                )}

                <div className="w-full max-w-7xl h-[70vh] px-6 lg:px-12 flex flex-col justify-between items-center relative">
                  <motion.div className="flex flex-col self-start text-left max-w-md" style={{ opacity: contentOpacity, y: yOffset }}>
                    <p className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-mono mb-3">Math</p>
                    <p className="text-base md:text-xl text-zinc-700 dark:text-zinc-300 font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
                      {STEPS[currentStep].math}
                    </p>
                  </motion.div>

                  <motion.div className="flex flex-col items-center w-full min-w-0 my-auto" style={{ opacity: contentOpacity, y: inverseYOffset }}>
                    <div className="tutorial-math-editor w-full overflow-x-auto overflow-y-hidden pb-3 custom-scrollbar max-w-full">
                      <MathEditor value={latexEquation} onChange={setLatexEquation} onJsChange={setEquationJs} />
                    </div>
                    <p className="mt-4 text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-mono text-center">Try changing a number</p>
                  </motion.div>

                  <motion.div className="flex flex-col items-start self-end text-left" style={{ opacity: contentOpacity, y: yOffset }}>
                    <p className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-mono mb-3">Variables</p>
                    <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-mono leading-loose flex flex-col gap-2">
                      {STEPS[currentStep].controls.map((control) => <div key={control}>{control}</div>)}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="relative z-0">
              {STEPS.map((step) => <div key={step.id} className="h-screen tutorial-snap" />)}
            </div>

            <style jsx global>{`
              .tutorial-scroll-snap { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
              .tutorial-snap { scroll-snap-align: center; }
              .tutorial-math-editor .mq-editable-field {
                font-size: 1.5rem !important; line-height: 1.4 !important; color: currentColor; padding: 0 !important; text-align: center;
              }
              @media (min-width: 768px) { .tutorial-math-editor .mq-editable-field { font-size: 2.5rem !important; } }
              @media (min-width: 1024px) { .tutorial-math-editor .mq-editable-field { font-size: 3rem !important; } }
              .custom-scrollbar::-webkit-scrollbar { height: 10px; }
              .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.5); border-radius: 10px; border: 2px solid transparent; background-clip: padding-box;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.8); background-clip: padding-box; }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
