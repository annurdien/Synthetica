'use client';
import { useEffect, useMemo, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

const MATH_DECLS = Object.getOwnPropertyNames(Math)
  .map((key) => `const ${key} = Math.${key};`)
  .join('\n');

function compileEquation(equation: string) {
  try {
    const fnBody = `
      ${MATH_DECLS}
      return ${equation};
    `;
    const fn = new Function('t', 'beat', fnBody) as (t: number, beat: number) => number;
    fn(0, 0);
    return { fn, error: null } as const;
  } catch (error) {
    return { fn: null, error } as const;
  }
}

export function GraphFunction({
  equation,
  color = '#3b82f6',
  bpm = 120,
  isPlaying = false,
}: {
  equation: string;
  color?: string;
  bpm?: number;
  isPlaying?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);
  const durationRef = useRef<number>(2.0);
  const compiled = useMemo(() => compileEquation(equation), [equation]);
  const wasPlayingRef = useRef(isPlaying);

  useEffect(() => {
    if (isPlaying && !wasPlayingRef.current) {
      timeRef.current = 0;
    }
    wasPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = 1 + (e.deltaY > 0 ? 0.1 : -0.1);
      durationRef.current = Math.max(0.01, Math.min(10.0, durationRef.current * zoomFactor));
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const nextWidth = Math.max(1, Math.floor(rect.width * dpr));
      const nextHeight = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    resizeCanvas();

    canvas.addEventListener('wheel', handleWheel, { passive: false });

    if (!compiled.fn) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#a1a1aa';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Waiting for valid Math equation...', canvas.width / 2, canvas.height / 2);
      return () => {
        canvas.removeEventListener('wheel', handleWheel);
        resizeObserver.disconnect();
      };
    }

    const fn = compiled.fn;
    let animationId: number;
    let localLastTime = performance.now();

    function render(timeMs: number) {
      if (!canvas || !ctx) return;

      const dt = (timeMs - localLastTime) / 1000;
      localLastTime = timeMs;

      if (isPlaying) {
        timeRef.current += Math.max(0, Math.min(0.1, dt));
      }

      const width = canvas.width;
      const height = canvas.height;
      const currentTime = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      const paddingLeft = 60;
      const paddingBottom = 40;
      const paddingTop = 40;
      const paddingRight = 40;
      const graphWidth = width - paddingLeft - paddingRight;
      const graphHeight = height - paddingBottom - paddingTop;

      const duration = durationRef.current;
      const currentPage = Math.floor(currentTime / duration);
      const startT = currentPage * duration;
      const endT = startT + duration;

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#f4f4f5';
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '20px monospace';
      ctx.textBaseline = 'middle';

      ctx.textAlign = 'right';
      const ySteps = 4;
      for (let i = 0; i <= ySteps; i++) {
        const val = 1 - (i / ySteps) * 2;
        const y = paddingTop + (i / ySteps) * graphHeight;

        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(width - paddingRight, y);
        ctx.stroke();

        ctx.fillText(val.toFixed(1), paddingLeft - 10, Math.max(paddingTop + 10, Math.min(paddingTop + graphHeight - 10, y)));
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      let timeStep = 0.5;
      if (duration < 0.1) timeStep = 0.02;
      else if (duration < 0.5) timeStep = 0.1;
      else if (duration > 5) timeStep = 1.0;

      const firstLineT = Math.ceil(startT / timeStep) * timeStep;

      for (let t = firstLineT; t <= endT; t += timeStep) {
        const x = paddingLeft + ((t - startT) / duration) * graphWidth;

        ctx.beginPath();
        ctx.moveTo(x, paddingTop);
        ctx.lineTo(x, paddingTop + graphHeight);
        ctx.stroke();

        ctx.fillText(`${t.toFixed(2)}s`, x, paddingTop + graphHeight + 15);
      }

      ctx.strokeStyle = '#e4e4e7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(paddingLeft, paddingTop + graphHeight / 2);
      ctx.lineTo(width - paddingRight, paddingTop + graphHeight / 2);
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.rect(paddingLeft, paddingTop, graphWidth, graphHeight);
      ctx.clip();

      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.beginPath();

      const samples = graphWidth;
      for (let i = 0; i <= samples; i++) {
        const t = startT + (i / samples) * duration;
        const beat = t * (bpm / 60);
        let v = fn(t, beat);
        if (!isFinite(v)) v = 0;

        const y = paddingTop + graphHeight / 2 - (v * graphHeight / 2.5);
        const x = paddingLeft + i;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (isPlaying) {
        const tracerX = paddingLeft + ((currentTime - startT) / duration) * graphWidth;
        const currentBeat = currentTime * (bpm / 60);
        let currentV = fn(currentTime, currentBeat);
        if (!isFinite(currentV)) currentV = 0;
        const tracerY = paddingTop + graphHeight / 2 - (currentV * graphHeight / 2.5);

        ctx.beginPath();
        ctx.strokeStyle = `${color}80`;
        ctx.lineWidth = 2;
        ctx.moveTo(tracerX, paddingTop);
        ctx.lineTo(tracerX, paddingTop + graphHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.arc(tracerX, tracerY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();

      animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('wheel', handleWheel);
      resizeObserver.disconnect();
    };
  }, [bpm, color, compiled, isPlaying]);

  const handleZoomIn = useCallback(() => {
    durationRef.current = Math.max(0.01, durationRef.current * 0.75);
  }, []);

  const handleZoomOut = useCallback(() => {
    durationRef.current = Math.min(10.0, durationRef.current * 1.25);
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full object-cover rounded-xl" />
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button 
          onClick={handleZoomIn}
          className="p-2 bg-white/90 backdrop-blur border border-zinc-200 rounded-lg shadow-sm text-zinc-600 hover:text-zinc-900 hover:bg-white transition"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-2 bg-white/90 backdrop-blur border border-zinc-200 rounded-lg shadow-sm text-zinc-600 hover:text-zinc-900 hover:bg-white transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
