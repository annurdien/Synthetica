'use client';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { Activity, Code, Layers, Play, Save, Sigma, Square } from 'lucide-react';
import { MathEditor } from '@/app/components/MathEditor';
import type { EditorMode } from '@/app/lib/types';
import { AnimatePresence, motion } from 'framer-motion';

interface SynthEditorPanelProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  editorMode: EditorMode;
  onToggleEditorMode: () => void;
  equation: string;
  onEquationChange: (value: string) => void;
  latexEquation: string;
  onLatexChange: (value: string) => void;
  onLatexJsChange: (value: string) => void;
  error: string | null;
  isSavePopupOpen: boolean;
  onToggleSavePopup: () => void;
  saveName: string;
  onSaveNameChange: (value: string) => void;
  onSave: () => void;
  onCloseSavePopup: () => void;
  onShowLibrary: () => void;
}

export function SynthEditorPanel({
  isPlaying,
  onTogglePlay,
  editorMode,
  onToggleEditorMode,
  equation,
  onEquationChange,
  latexEquation,
  onLatexChange,
  onLatexJsChange,
  error,
  isSavePopupOpen,
  onToggleSavePopup,
  saveName,
  onSaveNameChange,
  onSave,
  onCloseSavePopup,
  onShowLibrary,
}: SynthEditorPanelProps) {
  const handleSave = () => {
    if (!saveName.trim()) return;
    onSave();
    onCloseSavePopup();
  };

  return (
    <div className="flex-1 flex flex-col gap-4 relative z-10 py-2 min-h-0">
      <div className="flex justify-between items-center relative z-20 shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-sm md:text-lg font-serif italic tracking-widest text-zinc-900 dark:text-zinc-100">
            f(t) =
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onTogglePlay}
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 hover:scale-110 active:scale-95 group ${
              isPlaying 
                ? 'bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/30 text-zinc-900 dark:text-white' 
                : 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isPlaying ? 'pause' : 'play'}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
              </motion.div>
            </AnimatePresence>
          </button>

          <button
            onClick={onToggleSavePopup}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-black/5 dark:border-white/10 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all hover:scale-110"
            title="Save to Library"
          >
            <Save className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleEditorMode}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110 ${
              editorMode === 'desmos' 
                ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black' 
                : 'border-black/5 dark:border-white/10 bg-white/50 dark:bg-zinc-800/50 text-zinc-400'
            }`}
            title={editorMode === 'desmos' ? 'Switch to Code Editor' : 'Switch to Math Editor'}
          >
            {editorMode === 'desmos' ? <Sigma className="w-4 h-4" /> : <Code className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 relative w-full group bg-black/5 dark:bg-white/5 focus-within:bg-white dark:focus-within:bg-zinc-900 border border-black/5 dark:border-white/10 focus-within:border-black/20 dark:focus-within:border-white/20 rounded-[2rem] shadow-inner transition-all duration-500 flex items-start overflow-hidden">
        <div className="w-full h-full overflow-y-auto">
          {editorMode === 'desmos' ? (
            <div className="w-full px-8 py-8 flex items-center min-h-[120px]">
              <MathEditor value={latexEquation} onChange={onLatexChange} onJsChange={onLatexJsChange} />
            </div>
          ) : (
            <Editor
              value={equation}
              onValueChange={(code) => onEquationChange(code)}
              highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
              padding={32}
              className="w-full text-2xl sm:text-3xl md:text-4xl font-mono leading-relaxed outline-none break-all text-zinc-800 dark:text-zinc-100"
              textareaClassName="outline-none focus:outline-none"
              style={{
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                minHeight: '120px',
              }}
              placeholder="e.g. sin(2 * PI * 440 * t)"
            />
          )}
        </div>
        {error && (
          <div className="absolute top-full left-0 mt-3 text-red-500 text-[10px] uppercase font-bold tracking-widest bg-white dark:bg-zinc-900 px-4 py-2 border border-red-500/20 rounded-full shadow-lg z-10 animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

