"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { MathEditor } from '@/app/components/MathEditor';
import { Visualizer } from '@/components/Visualizer';
import { latexToJS } from '@/app/lib/latexToJS';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const STEPS = [
  {
    id: 1,
    math: 'Pitch is set by 261.63 (C4). Loudness is the final multiplier. The exponential term shapes the note into a short beat-sized envelope.',
    controls: ['Pitch: 261.63', 'Envelope: exp(-6 * (beat mod 1))', 'Volume: 0.35'],
    equation: '\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot t) \\cdot \\exp(-6 \\cdot (beat \\bmod 1)) \\cdot 0.35',
  },
  {
    id: 2,
    math: 'We multiply the base pitch by 1.05946^2 to move up two semitones. Everything else stays the same.',
    controls: ['Semitones: 1.05946^2', 'Envelope: exp(-6 * (beat mod 1))', 'Volume: 0.35'],
    equation: '\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot 1.05946^{2} \\cdot t) \\cdot \\exp(-6 \\cdot (beat \\bmod 1)) \\cdot 0.35',
  },
  {
    id: 3,
    math: 'A second sine wave wiggles the pitch. Depth controls how wide the wobble is, and rate controls how fast it moves.',
    controls: ['Vibrato depth: 0.4', 'Vibrato rate: 5', 'Envelope: exp(-6 * (beat mod 1))'],
    equation: '\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot 1.05946^{4} \\cdot t + 0.4 \\cdot \\sin(2 \\cdot \\pi \\cdot 5 \\cdot t)) \\cdot \\exp(-6 \\cdot (beat \\bmod 1)) \\cdot 0.33',
  },
  {
    id: 4,
    math: 'Two sine waves are stacked: the main pitch and an octave above at 2x frequency. Their volumes blend the timbre.',
    controls: ['Main volume: 0.28', 'Octave volume: 0.12', 'Envelope: exp(-5 * (beat mod 1))'],
    equation: '(\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot 1.05946^{5} \\cdot t) \\cdot 0.28 + \\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot 1.05946^{5} \\cdot 2 \\cdot t) \\cdot 0.12) \\cdot \\exp(-5 \\cdot (beat \\bmod 1))',
  },
  {
    id: 5,
    math: 'The pitch jumps to 7 semitones above Do. Multiplying beat by 2 shortens the envelope for faster pulses.',
    controls: ['Semitones: 1.05946^7', 'Rhythm: beat * 2', 'Envelope: exp(-8 * ((beat * 2) mod 1))'],
    equation: '\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot 1.05946^{7} \\cdot t) \\cdot \\exp(-8 \\cdot ((beat \\cdot 2) \\bmod 1)) \\cdot 0.3',
  },
  {
    id: 6,
    math: 'Two layers: a lead at 9 semitones above Do, plus a low bass at 110 Hz. Each has its own envelope and volume.',
    controls: ['Lead pitch: 1.05946^9', 'Bass pitch: 110', 'Bass volume: 0.12'],
    equation: '\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot 1.05946^{9} \\cdot t) \\cdot \\exp(-6 \\cdot (beat \\bmod 1)) \\cdot 0.28 + \\sin(2 \\cdot \\pi \\cdot 110 \\cdot t) \\cdot \\exp(-3 \\cdot (beat \\bmod 1)) \\cdot 0.12',
  },
  {
    id: 7,
    math: 'The pitch is 11 semitones above Do. A faster decay makes it feel tight and unresolved.',
    controls: ['Semitones: 1.05946^11', 'Decay: exp(-10 * (beat mod 1))', 'Volume: 0.3'],
    equation: '\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot 1.05946^{11} \\cdot t) \\cdot \\exp(-10 \\cdot (beat \\bmod 1)) \\cdot 0.3',
  },
  {
    id: 8,
    math: 'The melody steps through a scale array while bass and noise add body and rhythm.',
    controls: ['Scale: [0,2,4,5,7,9,11,12]', 'Melody speed: beat * 2', 'Hi-hat: random()'],
    equation: '(\\sin(2 \\cdot \\pi \\cdot 65.41 \\cdot t) \\cdot \\exp(-2 \\cdot (beat \\bmod 1)) \\cdot 0.22) + (\\sin(2 \\cdot \\pi \\cdot 130.81 \\cdot t) \\cdot \\exp(-2 \\cdot (beat \\bmod 1)) \\cdot 0.12) + (\\sin(2 \\cdot \\pi \\cdot 261.63 \\cdot 1.05946^{[0,2,4,5,7,9,11,12][\\floor(beat \\cdot 2) \\bmod 8]} \\cdot t) \\cdot \\exp(-6 \\cdot ((beat \\cdot 2) \\bmod 1)) \\cdot 0.25) + ((\\text{random}() \\cdot 2 - 1) \\cdot \\exp(-32 \\cdot ((beat \\cdot 4) \\bmod 1)) \\cdot 0.05)',
  }
];

export default function TutorialPage() {
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
    // Fully visible exactly at the step (distance = 0)
    if (distance < 0.1) return 1;
    // Fade out completely when halfway between steps (distance = 0.5)
    if (distance > 0.4) return 0;
    return 1 - ((distance - 0.1) / 0.3);
  });

  // Parallax up/down floating effect for the text
  const yOffset = useTransform(scrollYProgress, (progress) => {
    if (STEPS.length <= 1) return 0;
    const scaled = progress * (STEPS.length - 1);
    const diff = scaled - Math.round(scaled);
    // Smooth transition that crosses 0 exactly at the step
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

      // Send initial state
      workletNode.port.postMessage({ type: 'setEquation', equation: equationJs });
      workletNode.port.postMessage({ type: 'setTempo', bpm: 120 });
    }
  };

  const togglePlay = async () => {
    if (!audioCtxRef.current) {
      await initAudio();
    }
    
    if (!audioCtxRef.current) return;

    if (isPlaying) {
      await audioCtxRef.current.suspend();
      setIsPlaying(false);
    } else {
      if (workletNodeRef.current) {
        workletNodeRef.current.port.postMessage({ type: 'resetTime' });
      }
      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }
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
      
      try {
        if (typeof window !== 'undefined' && window.navigator && window.navigator.userActivation) {
          if (window.navigator.userActivation.hasBeenActive) {
            window.navigator.vibrate?.(50); // tiny haptic feedback if mobile
          }
        } else {
          window.navigator.vibrate?.(50);
        }
      } catch (e) {
        // Ignore vibrate errors
      }
    }
  });

  useEffect(() => {
    if (workletNodeRef.current) {
      workletNodeRef.current.port.postMessage({ type: 'setEquation', equation: equationJs });
    }
  }, [equationJs]);

  // Clean up audio context when leaving the tutorial
  useEffect(() => {
    window.scrollTo(0, 0); // Reset tutorial to step 1 on reload
    const snapClass = 'tutorial-scroll-snap';
    document.documentElement.classList.add(snapClass);
    document.body.classList.add(snapClass);
    return () => {
      document.documentElement.classList.remove(snapClass);
      document.body.classList.remove(snapClass);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(console.error);
      }
    };
  }, []);

  return (
    <div className="bg-black text-white font-sans selection:bg-amber-400/30 min-h-screen">
      <div className="relative">
        <div className="fixed inset-0 z-0 opacity-25 mix-blend-screen pointer-events-none">
          {analyser && <Visualizer analyser={analyser} type="oscilloscope" isPlaying={isPlaying} />}
        </div>

        <div className="fixed inset-0 z-10 pointer-events-none">
          {/* Top Info Bar */}
          <div className="absolute z-50 top-0 left-0 right-0 p-6 flex justify-between items-center pointer-events-auto">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
              Step {currentStep + 1} of {STEPS.length}
              {currentStep === 0 && <span className="ml-4 text-zinc-400">Scroll to advance</span>}
            </div>
            <button
              onClick={togglePlay}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all border backdrop-blur-sm ${
                isPlaying ? 'bg-white/10 text-white border-white/30' : 'bg-white text-black border-white hover:bg-zinc-200'
              }`}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>

          <div className="relative h-full flex items-center justify-center pointer-events-auto">
            {/* Diagonal Layout: Math (Top-Left), Equation (Center), Variables (Bottom-Right) */}
            <div className="w-full max-w-7xl h-[70vh] px-6 lg:px-12 flex flex-col justify-between items-center relative">
              
              {/* Top-Left: Math Explanation */}
              <motion.div 
                className="flex flex-col self-start text-left max-w-md" 
                style={{ opacity: contentOpacity, y: yOffset }}
              >
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-3">Math</p>
                <p className="text-base md:text-xl text-zinc-300 font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
                  {STEPS[currentStep].math}
                </p>
              </motion.div>

              {/* Center: Equation */}
              <motion.div 
                className="flex flex-col items-center w-full min-w-0 my-auto" 
                style={{ opacity: contentOpacity, y: inverseYOffset }}
              >
                <div className="tutorial-math-editor w-full overflow-x-auto overflow-y-hidden pb-6 custom-scrollbar max-w-full">
                  <MathEditor value={latexEquation} onChange={setLatexEquation} onJsChange={setEquationJs} />
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-widest text-zinc-500 font-mono text-center">
                  Try changing a number
                </p>
              </motion.div>

              {/* Bottom-Right: Controls */}
              <motion.div 
                className="flex flex-col items-start self-end text-left" 
                style={{ opacity: contentOpacity, y: yOffset }}
              >
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-3">Variables</p>
                <div className="text-sm md:text-base text-zinc-300 font-mono leading-loose flex flex-col gap-2">
                  {STEPS[currentStep].controls.map((control) => (
                    <div key={control}>
                      {control}
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Scroll Snap Sections */}
        <div className="relative z-0">
          {STEPS.map((step) => (
            <div key={step.id} className="h-screen tutorial-snap" />
          ))}
        </div>

        <style jsx global>{`
          .tutorial-scroll-snap {
            scroll-snap-type: y mandatory;
            scroll-behavior: smooth;
          }
          .tutorial-snap {
            scroll-snap-align: center;
          }
          .tutorial-math-editor .mq-editable-field {
            font-size: 1.5rem !important;
            line-height: 1.4 !important;
            color: #f4f4f5;
            padding: 0 !important;
            text-align: center;
          }
          @media (min-width: 768px) {
            .tutorial-math-editor .mq-editable-field {
              font-size: 2.5rem !important;
            }
          }
          @media (min-width: 1024px) {
            .tutorial-math-editor .mq-editable-field {
              font-size: 3rem !important;
            }
          }
          /* Custom horizontal scrollbar for long equations */
          .custom-scrollbar::-webkit-scrollbar {
            height: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        `}</style>
      </div>
    </div>
  );
}

