'use client';
import { useEffect, useRef } from 'react';

interface VisualizerProps {
  analyser: AnalyserNode | null;
  color?: string;
  type?: 'oscilloscope' | 'spectrum';
}

export function Visualizer({ analyser, type = 'oscilloscope', color = '#22d3ee' }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    const freqArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      
      const width = canvas.width;
      const height = canvas.height;

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      if (type === 'spectrum') {
        analyser.getByteFrequencyData(freqArray);
        const barWidth = Math.ceil(width / bufferLength * 2.5);
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (freqArray[i] / 255) * height;
          // Subtly colored bars based on frequency and provided base color
          ctx.fillStyle = color;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
          if (x > width) break;
        }
      } else {
        // Oscilloscope
        analyser.getFloatTimeDomainData(dataArray);
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.beginPath();
        
        const sliceWidth = width * 1.0 / bufferLength;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i]; // -1.0 to 1.0
          const y = (v * height / 2) + height / 2;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.stroke();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [analyser, type, color]);

  return (
    <canvas 
      ref={canvasRef} 
      width={1024} 
      height={300} 
      className="w-full h-full object-cover rounded-xl"
    />
  );
}
