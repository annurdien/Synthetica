'use client';
import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { latexToJS } from '@/app/lib/latexToJS';

const MathEditorInner = ({
  value,
  onChange,
  onJsChange,
}: {
  value: string;
  onChange: (v: string) => void;
  onJsChange?: (js: string) => void;
}) => {
  const mf = useRef<any>(null);
  
  useEffect(() => {
    let disposed = false;
    let cleanup = () => undefined;

    const attach = async () => {
      await import('mathlive');
      if (disposed || !mf.current) return;

      const field = mf.current;
      const handleInput = () => {
        const latexValue = field.value || '';
        onChange(latexValue);
        if (onJsChange) {
          onJsChange(latexToJS(latexValue));
        }
      };

      field.value = value;
      field.addEventListener('input', handleInput);
      cleanup = () => field.removeEventListener('input', handleInput);
    };

    attach();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [onChange, onJsChange]);

  // Sync value when changed from outside
  useEffect(() => {
     if (mf.current && mf.current.value !== value) {
         mf.current.value = value;
     }
  }, [value]);

  return React.createElement('math-field', {
    ref: mf,
    style: { width: '100%', fontSize: '2rem', outline: 'none', background: 'transparent', border: 'none' },
  });
};

export const MathEditor = dynamic(() => Promise.resolve(MathEditorInner), { ssr: false });
