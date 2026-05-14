'use client';
import React from 'react';
import dynamic from 'next/dynamic';

import { latexToJS } from '@/app/lib/latexToJS';

const MathQuillEditor = dynamic(
  () => import('react-mathquill').then((mod) => {
    mod.addStyles();
    return mod.EditableMathField;
  }),
  { ssr: false, loading: () => <div style={{ width: '100%', height: '3rem' }}></div> }
);

const MathEditorInner = ({
  value,
  onChange,
  onJsChange,
}: {
  value: string;
  onChange: (v: string) => void;
  onJsChange?: (js: string) => void;
}) => {
  return (
    <div style={{ width: '100%', fontSize: '1.5rem', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center' }}>
      <MathQuillEditor
        latex={value}
        onChange={(mathField) => {
          const latexValue = mathField.latex();
          onChange(latexValue);
          if (onJsChange) {
            onJsChange(latexToJS(latexValue));
          }
        }}
        config={{
          spaceBehavesLikeTab: true,
          leftRightIntoCmdGoes: 'up',
          restrictMismatchedBrackets: true,
          supSubsRequireOperand: true,
          charsThatBreakOutOfSupSub: '+-=<>',
          autoSubscriptNumerals: true,
          autoCommands: 'pi theta sqrt sum prod alpha beta gamma delta epsilon',
          autoOperatorNames: 'sin cos tan exp ln log',
        }}
      />
      <style>{`
        .mq-editable-field {
          border: none !important;
          box-shadow: none !important;
          width: 100%;
          padding: 0.5rem;
          background: transparent;
        }
        .mq-editable-field.mq-focused {
          box-shadow: none !important;
          outline: none !important;
        }
      `}</style>
    </div>
  );
};

export const MathEditor = MathEditorInner;
