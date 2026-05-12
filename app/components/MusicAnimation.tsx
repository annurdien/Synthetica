'use client';
import { useEffect, useRef } from 'react';

export function MusicAnimation({ playing = false }: { playing?: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime = performance.now();

    const render = (time: number) => {
      if (!pathRef.current) return;
      
      const elapsed = (time - startTime) / 1000;
      
      // Generate a smooth mathematical wave
      // Width: 800, Height: 200
      const width = 800;
      const height = 200;
      const midY = height / 2;
      const points = [];
      const resolution = width / 200; // Step size
      
      for (let x = 0; x <= width; x += resolution) {
        // Normalize x from 0 to 4*PI
        const nx = (x / width) * Math.PI * 4;
        
        // When not playing, just a gentle idle sine wave
        let y = Math.sin(nx - elapsed * 0.5) * 15; 
        
        if (playing) {
          // When playing, add complex mathematical harmonics (Fourier synthesis)
          y += Math.sin(nx * 2 + elapsed * 3) * 20;
          y += Math.cos(nx * 4 - elapsed * 5) * 10;
          y += Math.sin(nx * 8 + elapsed * 8) * 5;
          
          // Modulate amplitude with a slow envelope
          y *= (1 + Math.sin(elapsed * 1.5) * 0.4);
        }
        
        points.push(`${x},${midY - y}`);
      }
      
      // Create SVG path data
      const pathData = `M 0,${midY} L ` + points.join(' L ');
      pathRef.current.setAttribute('d', pathData);
      
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [playing]);

  return (
    <div className="w-full h-40 md:h-56 flex flex-col items-center justify-center max-w-4xl mx-auto overflow-hidden opacity-80 relative">
      
      {/* Mathematical Equation Display */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 font-serif text-sm md:text-base text-zinc-500 dark:text-zinc-400 transition-all duration-500">
        {playing ? (
          <div className="flex items-center gap-2">
            <span className="italic">f(t) =</span>
            <span>
              sin(2<span className="font-sans">π</span>t) + 
              cos(4<span className="font-sans">π</span>t) + 
              sin(8<span className="font-sans">π</span>t)
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="italic">f(t) =</span>
            <span>sin(<span className="font-sans">π</span>t)</span>
          </div>
        )}
      </div>

      <svg 
        viewBox="0 0 800 200" 
        preserveAspectRatio="none" 
        className="w-full h-full mt-8"
      >
        {/* Draw mathematical axes */}
        <line x1="0" y1="100" x2="800" y2="100" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800 stroke-1" strokeDasharray="4 4" />
        <line x1="400" y1="0" x2="400" y2="200" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800 stroke-1" strokeDasharray="4 4" />
        
        <path
          ref={pathRef}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-900 dark:text-zinc-100 transition-colors duration-500"
        />
      </svg>
    </div>
  );
}
