'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  MotionValue,
  useAnimationFrame,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

const VIEWBOX_SIZE = 1000;
const CENTER = VIEWBOX_SIZE / 2;

const PHASE = {
  intro: [0, 0.3],
  modulator: [0.3, 0.55],
  shatter: [0.55, 0.8],
  resolution: [0.8, 1],
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function getResponsivePointCount() {
  if (typeof window === 'undefined') return 900;

  const width = window.innerWidth;

  if (width < 640) return 420;
  if (width < 1024) return 650;

  return 900;
}

function createStaticMandalaPath(pointCount = 700) {
  const points: string[] = [];
  const baseR = 280;
  const carrier = 1;
  const modulator = 7;
  const modIndex = 6;

  for (let i = 0; i <= pointCount; i++) {
    const ratio = i / pointCount;
    const theta = ratio * Math.PI * 2 * 12;

    const radius =
      baseR +
      120 *
      Math.sin(
        carrier * theta + modIndex * Math.sin(modulator * theta),
      );

    const x = CENTER + radius * Math.cos(theta);
    const y = CENTER + radius * Math.sin(theta);

    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return `M ${points.join(' L ')}`;
}

type MathReactorProps = {
  scrollYProgress: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

function MathReactor({ scrollYProgress, containerRef }: MathReactorProps) {
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, {
    amount: 'some',
  });

  const [pointCount, setPointCount] = useState(900);

  const staticPath = useMemo(() => createStaticMandalaPath(700), []);

  const ghostOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 0.4]);

  useEffect(() => {
    const updatePointCount = () => {
      setPointCount(getResponsivePointCount());
    };

    updatePointCount();

    window.addEventListener('resize', updatePointCount);

    return () => {
      window.removeEventListener('resize', updatePointCount);
    };
  }, []);

  useAnimationFrame((time) => {
    if (shouldReduceMotion) return;
    if (!isInView) return;
    if (!path1Ref.current || !path2Ref.current) return;

    const cx = CENTER;
    const cy = CENTER;

    const t = time / 1000;
    const scroll = scrollYProgress.get();

    const modProg = clamp((scroll - 0.28) / 0.25, 0, 1);
    const transProg = clamp((scroll - 0.55) / 0.2, 0, 1);
    const envProg = clamp((scroll - 0.75) / 0.22, 0, 1);

    const shatterProg =
      1 - Math.abs((clamp(scroll, 0.55, 0.8) - 0.675) / 0.125);

    const morph = easeInOut(transProg);

    const points1: string[] = [];
    const points2: string[] = [];

    const baseR = 280;
    const modIndex = modProg * 8;
    const carrier = 1;
    const modulator = 7;

    for (let i = 0; i <= pointCount; i++) {
      const ratio = i / pointCount;

      /**
       * POLAR STATE
       * Dense mandala/spirograph-like geometry.
       */
      const theta = ratio * Math.PI * 2 * 12;

      const radius =
        baseR +
        120 *
        Math.sin(
          carrier * theta -
          t * 1.5 +
          modIndex * Math.sin(modulator * theta + t),
        );

      const polarX = cx + radius * Math.cos(theta);
      const polarY = cy + radius * Math.sin(theta);

      /**
       * CARTESIAN STATE
       * Horizontal waveform across the SVG.
       */
      const linearX = ratio * VIEWBOX_SIZE;
      const nx = ratio * Math.PI * 8;

      const normalizedX = ratio * 2 - 1;

      const envelope =
        1 -
        envProg *
        (1 - Math.exp(-Math.pow(normalizedX * 2.5, 2)));

      const baseWave = Math.sin(
        nx - t * 3 + (modIndex / 2) * Math.sin(nx * 2 - t),
      );

      const linearY = cy + baseWave * 150 * envelope;

      /**
       * SHATTER STATE
       * Deterministic high-frequency displacement.
       */
      const noise = Math.sin(ratio * 9876.5 + t * 20);
      const shatterY = noise * 400 * Math.max(0, shatterProg);

      /**
       * MORPH
       */
      const finalX = polarX + (linearX - polarX) * morph;
      const finalY = polarY + (linearY - polarY) * morph + shatterY;

      points1.push(`${finalX.toFixed(1)},${finalY.toFixed(1)}`);

      /**
       * GHOST WAVE
       * Slightly delayed duplicate wave for the final acoustic-space feel.
       */
      const ghostTime = t - 0.15;

      const baseWaveGhost = Math.sin(
        nx -
        ghostTime * 3 +
        (modIndex / 2) * Math.sin(nx * 2 - ghostTime),
      );

      const ghostY = cy + baseWaveGhost * 150 * envelope;

      const finalGhostX = polarX + (linearX - polarX) * morph;
      const finalGhostY = polarY + (ghostY - polarY) * morph + shatterY;

      points2.push(`${finalGhostX.toFixed(1)},${finalGhostY.toFixed(1)}`);
    }

    path1Ref.current.setAttribute('d', `M ${points1.join(' L ')}`);
    path2Ref.current.setAttribute('d', `M ${points2.join(' L ')}`);
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        className="h-[150vmin] w-[150vmin] opacity-90 mix-blend-multiply dark:mix-blend-screen"
        preserveAspectRatio="xMidYMid meet"
      >
        {!shouldReduceMotion && (
          <motion.path
            ref={path2Ref}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            className="text-zinc-400 dark:text-zinc-600"
            style={{ opacity: ghostOpacity }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        <path
          ref={path1Ref}
          d={shouldReduceMotion ? staticPath : undefined}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="text-zinc-900 dark:text-zinc-100"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

type NarrativeLayersProps = {
  scrollYProgress: MotionValue<number>;
};

function NarrativeLayers({ scrollYProgress }: NarrativeLayersProps) {
  const shouldReduceMotion = useReducedMotion();

  const opIntro = useTransform(
    scrollYProgress,
    [0, 0.08, 0.25, PHASE.intro[1]],
    [0, 1, 1, 0],
  );

  const displayIntro = useTransform(
    scrollYProgress,
    (v) => (v > PHASE.intro[1] + 0.05 ? 'none' : 'block')
  );

  const opModTitle = useTransform(
    scrollYProgress,
    [PHASE.modulator[0], PHASE.modulator[0] + 0.05, PHASE.modulator[1] - 0.05, PHASE.modulator[1]],
    [0, 1, 1, 0],
  );

  const displayModulator = useTransform(
    scrollYProgress,
    (v) => (v < PHASE.modulator[0] - 0.05 || v > PHASE.modulator[1] + 0.05 ? 'none' : 'block')
  );

  const opModInfo = useTransform(
    scrollYProgress,
    [PHASE.modulator[0] + 0.05, PHASE.modulator[0] + 0.12, PHASE.modulator[1] - 0.05, PHASE.modulator[1]],
    [0, 1, 1, 0],
  );

  const xModTitle = useTransform(
    scrollYProgress,
    [PHASE.modulator[0], PHASE.modulator[1]],
    shouldReduceMotion ? ['0vw', '0vw'] : ['120vw', '-250vw'],
  );

  const opShatterTitle = useTransform(
    scrollYProgress,
    [PHASE.shatter[0], PHASE.shatter[0] + 0.05, PHASE.shatter[1] - 0.05, PHASE.shatter[1]],
    [0, 1, 1, 0],
  );

  const displayShatter = useTransform(
    scrollYProgress,
    (v) => (v < PHASE.shatter[0] - 0.05 || v > PHASE.shatter[1] + 0.05 ? 'none' : 'block')
  );

  const opShatterInfo = useTransform(
    scrollYProgress,
    [PHASE.shatter[0] + 0.05, PHASE.shatter[0] + 0.12, PHASE.shatter[1] - 0.05, PHASE.shatter[1]],
    [0, 1, 1, 0],
  );

  const yShatterTitle = useTransform(
    scrollYProgress,
    [PHASE.shatter[0], PHASE.shatter[1]],
    shouldReduceMotion ? ['0vh', '0vh'] : ['100vh', '-300vh'],
  );

  const yShatterInfo = useTransform(
    scrollYProgress,
    [PHASE.shatter[0], PHASE.shatter[1]],
    shouldReduceMotion ? ['0vh', '0vh'] : ['-10vh', '10vh'],
  );

  const opEnvTitle = useTransform(
    scrollYProgress,
    [PHASE.resolution[0], PHASE.resolution[0] + 0.05, 1.0],
    [0, 1, 1],
  );

  const displayResolution = useTransform(
    scrollYProgress,
    (v) => (v < PHASE.resolution[0] - 0.05 ? 'none' : 'block')
  );

  const opEnvInfo = useTransform(
    scrollYProgress,
    [PHASE.resolution[0] + 0.03, PHASE.resolution[0] + 0.08, 1.0],
    [0, 1, 1],
  );

  const yEnvTitle = useTransform(
    scrollYProgress,
    [PHASE.resolution[0], PHASE.resolution[1]],
    shouldReduceMotion ? ['0vh', '0vh'] : ['2vh', '-2vh'],
  );

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <p className="sr-only">
        A scrollytelling animation showing a mathematical waveform
        evolving from pure geometry into a mandala, then shattering into
        frequency bands before resolving into an acoustic wave.
      </p>

      {/* Phase 1: The Seed */}
      <motion.section
        aria-label="Phase 1: The Seed"
        style={{ opacity: opIntro, display: displayIntro }}
        className="absolute inset-0 text-zinc-900 dark:text-white"
      >
        <div className="absolute left-6 top-6 font-mono text-xs uppercase tracking-widest opacity-80 md:left-12 md:top-12 md:text-sm">
          Phase 01
        </div>

        <div className="absolute bottom-6 right-6 max-w-xs text-right font-sans text-sm font-light opacity-90 md:bottom-12 md:right-12 md:text-base">
          It begins with pure geometry. An unending frequency.
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <span className="font-serif text-4xl italic tracking-tight md:text-6xl">
            f(t) = sin(ω·t)
          </span>
        </div>
      </motion.section>

      {/* Phase 2: The Modulator */}
      <motion.section
        aria-label="Phase 2: The Modulator"
        style={{ display: displayModulator }}
        className="absolute inset-0"
      >
        <motion.div
          style={{ opacity: opModTitle, x: xModTitle }}
          className="absolute left-0 top-[20%] whitespace-nowrap text-zinc-900 dark:text-white"
        >
          <h2 className="font-serif text-[15vw] uppercase leading-none tracking-tighter opacity-90">
            The Modulator
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: opModInfo }}
          className="absolute bottom-10 right-6 max-w-sm text-right text-zinc-900 dark:text-zinc-100 md:bottom-24 md:right-24 md:max-w-md"
        >
          <p className="mb-5 font-sans text-base font-light leading-snug sm:text-xl md:text-3xl">
            We inject a modulator. The geometry violently folds in on
            itself, drawing a pure mathematical Mandala.
          </p>

          <div className="font-mono text-xs opacity-80 sm:text-sm">
            R(θ) = sin(ωcθ + I · sin(ωmθ))
          </div>
        </motion.div>
      </motion.section>

      {/* Phase 3: The Shatter */}
      <motion.section
        aria-label="Phase 3: The Chaos"
        style={{ display: displayShatter }}
        className="absolute inset-0"
      >
        <motion.div
          style={{
            opacity: opShatterTitle,
            y: yShatterTitle,
            rotate: -90,
          }}
          className="absolute left-6 top-full origin-bottom-left whitespace-nowrap text-zinc-900 dark:text-white md:left-60"
        >
          <span className="font-serif text-[12vh] uppercase leading-none tracking-tighter opacity-90">
            The Chaos
          </span>
        </motion.div>

        <motion.div
          style={{ opacity: opShatterInfo, y: yShatterInfo }}
          className="absolute bottom-20 right-6 max-w-xs text-right text-zinc-900 dark:text-zinc-100 md:bottom-40 md:right-24 md:max-w-sm"
        >
          <p className="mb-5 font-sans text-base font-light leading-tight sm:text-xl md:text-3xl">
            The geometry spins out of control and mathematically
            shatters into raw frequency bands.
          </p>

          <div className="font-mono text-xs opacity-80 sm:text-sm">
            F(ω) = ∫ f(t) e<sup>-iωt</sup> dt
          </div>
        </motion.div>
      </motion.section>

      {/* Phase 4: The Resolution */}
      <motion.section
        aria-label="Phase 4: The Resolution"
        style={{ display: displayResolution }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-[10vh] md:pt-[12vh]">
          <motion.h2
            style={{ opacity: opEnvTitle, y: yEnvTitle }}
            className="text-center font-serif text-5xl tracking-tight text-zinc-900 dark:text-white md:text-8xl uppercase"
          >
            The Resolution
          </motion.h2>
        </div>

        <motion.div
          style={{ opacity: opEnvInfo }}
          className="absolute bottom-10 right-6 max-w-xs text-right text-zinc-900 dark:text-zinc-100 md:bottom-24 md:right-24 md:max-w-md"
        >
          <p className="font-sans text-base font-light leading-relaxed opacity-90 sm:text-lg md:text-3xl">
            The chaos collapses. An amplitude envelope bounds the
            energy, and algorithmic delays paint the acoustic space.
            The math becomes music.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}

export function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      ref={containerRef}
      className="relative h-[600vh] w-full bg-white dark:bg-zinc-950"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <MathReactor
          scrollYProgress={scrollYProgress}
          containerRef={containerRef}
        />

        <NarrativeLayers scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
