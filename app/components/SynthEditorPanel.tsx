'use client';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { Activity, Code, Layers, Play, Save, Sigma, Square } from 'lucide-react';
import { MathEditor } from '@/app/components/MathEditor';
import type { EditorMode } from '@/app/lib/types';

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
    <div className="mb-6 p-4 md:p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl flex flex-col gap-4 shadow-lg shrink-0">
      <div className="flex justify-between items-center relative z-20">
        <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1 md:gap-2">
          <Activity className="w-3.5 h-3.5 md:w-4 md:h-4" /> <span className="hidden sm:inline">Sound </span>Editor
        </h2>
        <div className="flex items-center gap-1.5 md:gap-2 relative">
          <button
            onClick={onTogglePlay}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
              isPlaying
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            title={isPlaying ? 'Stop' : 'Play Live'}
            aria-label={isPlaying ? 'Stop live preview' : 'Play live preview'}
          >
            {isPlaying ? <Square className="w-4 h-4" fill="currentColor" /> : <Play className="w-4 h-4 ml-0.5" fill="currentColor" />}
          </button>

          <div className="relative">
            <button
              onClick={onToggleSavePopup}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm border ${isSavePopupOpen ? 'bg-zinc-900/10 dark:bg-white/10 text-zinc-900 dark:text-white border-transparent' : 'bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700'}`}
              title="Save to Library"
              aria-label="Save to library"
            >
              <Save className="w-4 h-4" />
            </button>

            {isSavePopupOpen && (
              <div className="absolute top-full right-0 mt-2 p-3 bg-white dark:bg-zinc-950 border border-zinc-100/50 dark:border-zinc-800/30/30 rounded-xl shadow-xl flex flex-col gap-2 w-64 origin-top-right">
                <div className="flex items-center gap-1.5 w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 focus-within:border-black/20 dark:focus-within:border-white/20 rounded-xl p-1.5 focus-within:bg-white dark:focus-within:bg-zinc-900 transition-all shadow-inner">
                  <input
                    type="text"
                    placeholder="Give it a name..."
                    value={saveName}
                    onChange={(e) => onSaveNameChange(e.target.value)}
                    className="bg-transparent px-2 py-1 text-xs outline-none w-full font-medium"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && saveName.trim()) {
                        handleSave();
                      }
                    }}
                  />
                  <button
                    onClick={handleSave}
                    disabled={!saveName.trim()}
                    className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-white dark:bg-zinc-950 border border-zinc-100/50 dark:border-zinc-800/30/30 shadow-sm hover:shadow-md focus:outline-none text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 dark:bg-zinc-900/50 disabled:opacity-50 transition-all whitespace-nowrap"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition"
            onClick={onShowLibrary}
            title="Show Library"
            aria-label="Show library"
          >
            <Layers className="w-4 h-4" />
          </button>

          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center transition shadow-sm border ${editorMode === 'desmos' ? 'bg-indigo-500 border-indigo-600 text-white' : 'bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md border-black/5 dark:border-white/10 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
            onClick={onToggleEditorMode}
            title={editorMode === 'desmos' ? 'Switch to Code Editor' : 'Switch to Math Editor'}
            aria-label={editorMode === 'desmos' ? 'Switch to code editor' : 'Switch to math editor'}
          >
            {editorMode === 'desmos' ? <Code className="w-4 h-4" /> : <Sigma className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
        <div className="text-3xl sm:text-4xl font-serif italic text-blue-500 shrink-0 mt-0 sm:mt-3 select-none">f(t) =</div>
        <div className="flex-1 min-w-0 relative w-full group max-h-[300px] overflow-y-auto bg-black/5 dark:bg-white/5 focus-within:bg-white dark:focus-within:bg-zinc-900 border border-black/5 dark:border-white/10 focus-within:border-black/20 dark:focus-within:border-white/20 rounded-xl shadow-inner transition-colors flex items-start">
          {editorMode === 'desmos' ? (
            <div className="w-full px-4 py-6 flex items-center min-h-[100px]">
              <MathEditor value={latexEquation} onChange={onLatexChange} onJsChange={onLatexJsChange} />
            </div>
          ) : (
            <Editor
              value={equation}
              onValueChange={(code) => onEquationChange(code)}
              highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
              padding={24}
              className="w-full text-xl sm:text-2xl md:text-3xl font-mono leading-relaxed outline-none break-all"
              textareaClassName="outline-none focus:outline-none"
              style={{
                fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                minHeight: '100px',
              }}
              placeholder="e.g. sin(2 * PI * 440 * t)"
            />
          )}
          {error && (
            <div className="absolute top-full mt-2 text-red-500 text-sm font-medium bg-red-50 px-3 py-2 border border-red-100 rounded-lg shadow-sm z-10">
              {error}
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-4 ml-0 md:ml-[88px]">
        <div className="flex gap-2 flex-wrap">
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100/50 dark:border-zinc-800/30/50 px-2.5 py-1.5 rounded-md">
            Functions: <span className="text-zinc-500 dark:text-zinc-400 font-mono lowercase">sin, cos, tan, abs, floor, random, sign</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100/50 dark:border-zinc-800/30/50 px-2.5 py-1.5 rounded-md">
            Variables: <span className="text-zinc-500 dark:text-zinc-400 font-mono lowercase">t, beat</span>
          </span>
        </div>
      </div>
    </div>
  );
}
