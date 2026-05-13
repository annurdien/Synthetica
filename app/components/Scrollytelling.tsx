'use client';
import { useRef } from 'react';
import { useScroll, useTransform, useAnimationFrame, motion } from 'framer-motion';

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null); // Ghost wave for space
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- SCROLLYTELLING TEXT TIMINGS ---
  
  // Phase 1: The Seed (0.0 -> 0.15)
  const opIntro = useTransform(scrollYProgress, [0, 0.05, 0.1, 0.15], [0, 1, 1, 0]);
  
  // Phase 2: The Modulator (0.15 -> 0.45)
  // Title fades in, but does not fade out—it just slides completely out of frame.
  // Info still fades in and out.
  const opModTitle = useTransform(scrollYProgress, [0.15, 0.2], [0, 1]);
  const opModInfo = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  // Continuously slide from off-screen right to completely off-screen left
  const xModTitle = useTransform(scrollYProgress, [0.15, 0.45], ["100vw", "-150vw"]);
  
  // Phase 3: The Shatter (0.45 -> 0.75)
  // Continuously slide from bottom to top, similar to The Modulator
  const opShatterTitle = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);
  const opShatterInfo = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const yShatterTitle = useTransform(scrollYProgress, [0.45, 0.75], ["100vh", "-200vh"]);
  const yShatterInfo = useTransform(scrollYProgress, [0.45, 0.75], ["-10vh", "10vh"]);
  
  // Phase 4: The Space / Resolution (0.75 -> 1.0)
  const opEnvTitle = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 0]);
  const opEnvInfo = useTransform(scrollYProgress, [0.85, 0.9, 0.95, 1], [0, 1, 1, 0]);
  const yEnvTitle = useTransform(scrollYProgress, [0.75, 1], ["5vh", "-5vh"]);

  // Ghost wave opacity
  const ghostOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 0.4]);

  useAnimationFrame((time) => {
    if (!path1Ref.current || !path2Ref.current) return;
    
    // SVG viewBox="0 0 1000 1000"
    const cx = 500;
    const cy = 500;
    const numPoints = 1200; // Extremely high res for the mandala
    
    const t = time / 1000;
    const scroll = scrollYProgress.get(); // 0 to 1
    
    // Calculate phase progress variables
    const modProg = clamp((scroll - 0.1) / 0.25, 0, 1);    // 0.1 to 0.35 (Mandala forms)
    const transProg = clamp((scroll - 0.45) / 0.2, 0, 1);  // 0.45 to 0.65 (Morph to line)
    const envProg = clamp((scroll - 0.7) / 0.2, 0, 1);     // 0.7 to 0.9 (Envelope pinches)
    
    // The "Shatter" effect peaks exactly in the middle of the transition
    const shatterProg = 1 - Math.abs((clamp(scroll, 0.45, 0.65) - 0.55) / 0.1); 
    
    const morph = easeInOut(transProg);
    
    let points1 = [];
    let points2 = []; // Ghost points

    const baseR = 280;
    const modIndex = modProg * 8; // How extreme the mandala gets
    const carrier = 1;
    const modulator = 7; // 7-fold symmetry

    for (let i = 0; i <= numPoints; i++) {
      const ratio = i / numPoints; // 0 to 1
      
      // --- POLAR STATE (The Mandala) ---
      // 12 full revolutions to create dense, overlapping spirograph lines
      const theta = ratio * Math.PI * 2 * 12; 
      
      // Add `t` to make the mandala spin and breath beautifully
      const R = baseR + 120 * Math.sin(carrier * theta - t * 1.5 + modIndex * Math.sin(modulator * theta + t));
      
      const polarX = cx + R * Math.cos(theta);
      const polarY = cy + R * Math.sin(theta);

      // --- CARTESIAN STATE (The Waveform) ---
      // Map ratio to horizontal line across the 1000px width.
      const linearX = ratio * 1000;
      
      // Linear frequency: 4 full sine waves
      const nx = ratio * Math.PI * 8; 
      
      // Calculate amplitude envelope (bell curve pinching the ends)
      const normalizedX = ratio * 2 - 1; // -1 to 1
      const envelope = 1 - (envProg * (1 - Math.exp(-Math.pow(normalizedX * 2.5, 2))));
      
      // The horizontal wave equation
      const baseWave = Math.sin(nx - t * 3 + (modIndex/2) * Math.sin(nx * 2 - t));
      const linearY = cy + baseWave * 150 * envelope;

      // --- SHATTER EFFECT ---
      // High-frequency deterministic noise to simulate breaking into an FFT spectrum
      const noise = Math.sin(ratio * 9876.5 + t * 20);
      const shatterY = noise * 400 * Math.max(0, shatterProg);

      // --- INTERPOLATION ---
      const finalX = polarX + (linearX - polarX) * morph;
      const finalY = polarY + (linearY - polarY) * morph + shatterY;

      points1.push(`${finalX},${finalY}`);

      // Calculate ghost wave (only visible at the end due to ghostOpacity)
      const baseWaveGhost = Math.sin(nx - (t - 0.15) * 3 + (modIndex/2) * Math.sin(nx * 2 - (t - 0.15)));
      const ghostY = cy + baseWaveGhost * 150 * envelope;
      
      const finalGhostX = polarX + (linearX - polarX) * morph;
      const finalGhostY = polarY + (ghostY - polarY) * morph + shatterY;
      points2.push(`${finalGhostX},${finalGhostY}`);
    }
    
    path1Ref.current.setAttribute('d', `M ${points1[0]} L ` + points1.join(' L '));
    path2Ref.current.setAttribute('d', `M ${points2[0]} L ` + points2.join(' L '));
  });

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-white dark:bg-zinc-950">
      
      {/* STICKY BACKGROUND (The Math Reactor) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Massive SVG Canvas */}
        <svg viewBox="0 0 1000 1000" className="w-[150vmin] h-[150vmin] opacity-90 mix-blend-multiply dark:mix-blend-screen" preserveAspectRatio="xMidYMid meet">
          <motion.path
            ref={path2Ref}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-zinc-400 dark:text-zinc-600"
            style={{ opacity: ghostOpacity }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            ref={path1Ref}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-zinc-900 dark:text-zinc-100"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

      </div>

      {/* FLOATING NARRATIVE BLOCKS (Kinetic Typography) */}
      <div className="sticky top-0 h-screen w-full pointer-events-none z-10 overflow-hidden">
        
        {/* Phase 1: The Seed */}
        <motion.div style={{ opacity: opIntro }} className="absolute inset-0 text-white mix-blend-difference">
          <div className="absolute top-8 left-8 md:top-12 md:left-12 font-mono text-xs md:text-sm tracking-widest opacity-80 uppercase">
            Phase 01
          </div>
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 font-sans text-sm md:text-base font-light text-right max-w-xs opacity-90">
            It begins with pure geometry. An unending frequency.
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="font-serif italic text-4xl md:text-6xl tracking-tight">f(t) = sin(ω·t)</span>
          </div>
        </motion.div>

        {/* Phase 2: The Modulator */}
        <div className="absolute inset-0">
          {/* Parallax Massive Headline (Difference) */}
          <motion.div style={{ opacity: opModTitle, x: xModTitle }} className="absolute top-[20%] left-0 whitespace-nowrap text-white mix-blend-difference">
            <h2 className="font-serif text-[15vw] leading-none tracking-tighter uppercase opacity-90">The Modulator</h2>
          </motion.div>
          {/* Legible Information Block (Raw Text with Text Shadow) */}
          <motion.div style={{ opacity: opModInfo }} className="absolute bottom-12 right-8 md:bottom-24 md:right-24 max-w-sm md:max-w-md text-right text-zinc-900 dark:text-zinc-100 drop-shadow-[0_0_8px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_8px_rgba(0,0,0,1)]">
            <p className="font-sans text-xl md:text-3xl font-light leading-snug mb-5">
              We inject a modulator. The geometry violently folds in on itself, drawing a pure mathematical Mandala.
            </p>
            <div className="font-mono text-sm opacity-80">
              R(θ) = sin(ωcθ + I · sin(ωmθ))
            </div>
          </motion.div>
        </div>

        {/* Phase 3: The Shatter (FFT) */}
        <div className="absolute inset-0">
          {/* Parallax Vertical Text (Difference) */}
          <motion.div style={{ opacity: opShatterTitle, y: yShatterTitle }} className="absolute left-8 top-full md:left-24 origin-bottom-left -rotate-90 whitespace-nowrap text-white mix-blend-difference">
             <span className="font-serif text-[12vh] leading-none uppercase tracking-tighter opacity-90">The Chaos</span>
          </motion.div>
          {/* Legible Information Block */}
          <motion.div style={{ opacity: opShatterInfo, y: yShatterInfo }} className="absolute right-8 top-1/3 md:right-24 max-w-xs md:max-w-sm text-right text-zinc-900 dark:text-zinc-100 drop-shadow-[0_0_8px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_8px_rgba(0,0,0,1)]">
            <p className="font-sans text-xl md:text-3xl font-light leading-tight mb-5">
              The geometry spins out of control and mathematically shatters into raw frequency bands.
            </p>
            <div className="font-mono text-sm opacity-80">
              F(ω) = ∫ f(t) e<sup>-iωt</sup> dt
            </div>
          </motion.div>
        </div>

        {/* Phase 4: The Space / Resolution */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-32 px-4 pointer-events-none">
          <motion.h2 style={{ opacity: opEnvTitle, y: yEnvTitle }} className="font-serif text-5xl md:text-8xl tracking-tight mb-8 text-center text-white mix-blend-difference">
            The Resolution
          </motion.h2>
          <motion.div style={{ opacity: opEnvInfo }} className="text-zinc-900 dark:text-zinc-100 drop-shadow-[0_0_8px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_8px_rgba(0,0,0,1)]">
            <p className="font-sans text-lg md:text-2xl font-light text-center max-w-2xl leading-relaxed opacity-90">
              The chaos collapses. An amplitude envelope bounds the energy, and algorithmic delays paint the acoustic space. The math becomes music.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
