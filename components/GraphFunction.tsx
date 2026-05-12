'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

export function GraphFunction({ equation, color = '#3b82f6', bpm = 120, isPlaying = false }: { equation: string, color?: string, bpm?: number, isPlaying?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(2.0);

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

    canvas.addEventListener('wheel', handleWheel, { passive: false });

    let fn: (t: number, beat: number) => number;
    let mathVals = '';
    try {
      const mathKeys = Object.getOwnPropertyNames(Math);
      mathVals = mathKeys.map(k => `const ${k} = Math.${k};`).join('\n');
      
      const fnBody = `
        ${mathVals}
        return ${equation};
      `;
      fn = new Function('t', 'beat', fnBody) as any;
      fn(0, 0); // test it
    } catch(e) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#a1a1aa';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Waiting for valid Math equation...', canvas.width/2, canvas.height/2);
      canvas.removeEventListener('wheel', handleWheel);
      return;
    }

    let animationId: number;
    let localLastTime = performance.now();

    function render(timeMs: number) {
      if (!canvas || !ctx) return;
      
      const dt = (timeMs - localLastTime) / 1000;
      localLastTime = timeMs;

      if (isPlaying) {
        timeRef.current += Math.max(0, Math.min(0.1, dt));
      }
      
      // Support high-DPI displays
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * 2 || canvas.height !== rect.height * 2) {
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
      }
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Calculate current time in seconds
      const currentTime = timeRef.current;
      
      ctx.clearRect(0, 0, width, height);

      // Setup drawing area
      const paddingLeft = 60; // Space for Y axis labels
      const paddingBottom = 40; // Space for X axis labels
      const graphWidth = width - paddingLeft;
      const graphHeight = height - paddingBottom;
      
      const duration = durationRef.current; // Dynamic based on zoom
      // Use discrete pages for Desmos-like tracing rather than scrolling oscilloscope
      const currentPage = Math.floor(currentTime / duration);
      const startT = currentPage * duration;
      const endT = startT + duration;

      // 1. Draw Grid & Numbers
      ctx.lineWidth = 2; // Thicker lines for scaled canvas
      ctx.strokeStyle = '#f4f4f5'; // zinc-100
      ctx.fillStyle = '#a1a1aa'; // zinc-400
      ctx.font = '20px monospace'; // Scaled font
      ctx.textBaseline = 'middle';

      // Y-axis grid (-1, -0.5, 0, 0.5, 1)
      ctx.textAlign = 'right';
      const ySteps = 4;
      for (let i = 0; i <= ySteps; i++) {
        const val = 1 - (i / ySteps) * 2; 
        const y = (i / ySteps) * graphHeight;
        
        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        
        ctx.fillText(val.toFixed(1), paddingLeft - 10, Math.max(10, Math.min(graphHeight - 10, y)));
      }

      // X-axis grid (scrolling time markers)
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      // Calculate time step to keep number of grid lines reasonable
      let timeStep = 0.5;
      if (duration < 0.1) timeStep = 0.02;
      else if (duration < 0.5) timeStep = 0.1;
      else if (duration > 5) timeStep = 1.0;
      
      const firstLineT = Math.ceil(startT / timeStep) * timeStep;
      
      for (let t = firstLineT; t <= endT; t += timeStep) {
         const x = paddingLeft + ((t - startT) / duration) * graphWidth;
         
         ctx.beginPath();
         ctx.moveTo(x, 0);
         ctx.lineTo(x, graphHeight);
         ctx.stroke();
         
         ctx.fillText(t.toFixed(2) + 's', x, graphHeight + 10);
      }

      // Emphasize Center Line (0)
      ctx.strokeStyle = '#e4e4e7'; // zinc-200
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(paddingLeft, graphHeight / 2);
      ctx.lineTo(width, graphHeight / 2);
      ctx.stroke();

      // 2. Draw the function curve
      // Clip to graph area to prevent drawing over axes
      ctx.save();
      ctx.beginPath();
      ctx.rect(paddingLeft, 0, graphWidth, graphHeight);
      ctx.clip();

      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      
      // Density of sampling: 1 sample per pixel width
      const samples = graphWidth;
      for(let i = 0; i <= samples; i++) {
         const t = startT + (i / samples) * duration;
         const beat = t * (bpm / 60); 
         let v = fn(t, beat); 
         if (!isFinite(v)) v = 0;
         
         // Remap from [-1, 1] to canvas height
         const y = graphHeight / 2 - (v * graphHeight / 2.5);
         const x = paddingLeft + i;
         
         if (i === 0) ctx.moveTo(x, y);
         else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // 3. Draw the Desmos-style playhead (tracer)
      if (isPlaying) {
        const tracerX = paddingLeft + ((currentTime - startT) / duration) * graphWidth;
        const currentBeat = currentTime * (bpm / 60);
        let currentV = fn(currentTime, currentBeat);
        if (!isFinite(currentV)) currentV = 0;
        const tracerY = graphHeight / 2 - (currentV * graphHeight / 2.5);
        
        // Vertical trace line
        ctx.beginPath();
        ctx.strokeStyle = color + '80'; // 50% opacity of the line color
        ctx.lineWidth = 2;
        ctx.moveTo(tracerX, 0);
        ctx.lineTo(tracerX, graphHeight);
        ctx.stroke();
        
        // Tracing point
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
    };

  }, [equation, color, bpm, isPlaying]);

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
