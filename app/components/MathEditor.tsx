'use client';
import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { latexToJS } from '@/app/lib/latexToJS';

const MathEditorInner = ({ value, onChange, onJsChange }: { value: string, onChange: (v: string) => void, onJsChange?: (js: string) => void }) => {
  const mf = useRef<any>(null);
  
  useEffect(() => {
    // Only import on client
    import('mathlive').then(() => {
        if (mf.current) {
            mf.current.value = value;
            mf.current.addEventListener('input', () => {
              const latexValue = mf.current.value;
              onChange(latexValue);
              if (onJsChange) {
                onJsChange(latexToJS(latexValue));
              }
            });
        }
    });

  }, []);

  // Sync value when changed from outside
  useEffect(() => {
     if (mf.current && mf.current.value !== value) {
         mf.current.value = value;
     }
  }, [value]);

  return React.createElement('math-field', { ref: mf, style: { width: '100%', fontSize: '2rem', outline: 'none', background: 'transparent', border: 'none' } });
}

export const MathEditor = dynamic(() => Promise.resolve(MathEditorInner), { ssr: false });
