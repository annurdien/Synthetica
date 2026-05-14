'use client';
import React from 'react';
import dynamic from 'next/dynamic';

import { latexToJS } from '@/app/lib/latexToJS';

const MathQuillEditor = dynamic(
  async () => {
    const jq = await import('jquery');
    if (typeof window !== 'undefined') {
      (window as any).jQuery = jq.default || jq;
      (window as any).$ = jq.default || jq;
    }
    const mod = await import('react-mathquill');
    mod.addStyles();
    return mod.EditableMathField;
  },
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
  const [mq, setMq] = React.useState<any>(null);

  React.useEffect(() => {
    if (mq && value && mq.latex() !== value) {
      mq.latex(value);
      // Double check if MathQuill rejected it
      if (mq.latex() === '') {
        console.warn('MathQuill rejected the latex string, applying fallback for unsupported commands:', value);
        // Fallback for unsupported latex commands like \bmod
        let safeValue = value.replace(/\\bmod/g, '\\text{mod}');
        safeValue = safeValue.replace(/\\floor/g, '\\text{floor}');
        mq.latex(safeValue);
      }
    }
  }, [mq, value]);

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
        mathquillDidMount={(mathField) => {
          setMq(mathField);
          if (value && mathField.latex() !== value) {
            mathField.latex(value);
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
          width: max-content;
          min-width: 100%;
          padding: 0.5rem;
          background: transparent;
        }
        .mq-editable-field.mq-focused {
          box-shadow: none !important;
          outline: none !important;
        }
        /* Fix invisible cursor on dark background */
        .mq-editable-field.mq-focused .mq-cursor {
          border-left-color: currentColor !important;
        }
        .mq-editable-field.mq-focused .mq-cursor.mq-blink {
          border-left-color: transparent !important;
        }
        /* Make selection fit dark mode */
        .mq-selection {
          background: rgba(251, 191, 36, 0.3) !important; /* matches selection:bg-amber-400/30 */
          color: inherit !important;
        }
      `}</style>
    </div>
  );
};

export const MathEditor = MathEditorInner;
