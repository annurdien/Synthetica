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
    <div className="mb-6 p-4 md:p-8 bg-white border border-zinc-200 rounded-2xl flex flex-col gap-4 shadow-sm shrink-0">
      <div className="flex justify-between items-center relative z-20">
        <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1 md:gap-2">
          <Activity className="w-3.5 h-3.5 md:w-4 md:h-4" /> <span className="hidden sm:inline">Global </span>Synthesizer<span className="hidden md:inline"> Equation</span>
        </h2>
        <div className="flex items-center gap-1.5 md:gap-2 relative">
          <button
            onClick={onTogglePlay}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              isPlaying
                ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
            title={isPlaying ? 'Stop' : 'Play Live'}
            aria-label={isPlaying ? 'Stop live preview' : 'Play live preview'}
          >
            {isPlaying ? <Square className="w-4 h-4" fill="currentColor" /> : <Play className="w-4 h-4 ml-0.5" fill="currentColor" />}
          </button>

          <div className="relative">
            <button
              onClick={onToggleSavePopup}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${isSavePopupOpen ? 'bg-zinc-100 text-zinc-800 border-zinc-200' : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'}`}
              title="Save Beat"
              aria-label="Save beat"
            >
              <Save className="w-4 h-4" />
            </button>

            {isSavePopupOpen && (
              <div className="absolute top-full right-0 mt-2 p-3 bg-white border border-zinc-200 rounded-xl shadow-xl flex flex-col gap-2 w-64 origin-top-right">
                <div className="flex items-center gap-1.5 w-full bg-zinc-50 border border-zinc-200 rounded-xl p-1.5 focus-within:border-zinc-400 focus-within:bg-white transition-all">
                  <input
                    type="text"
                    placeholder="Name beat..."
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
                    className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-white border border-zinc-200 shadow-sm hover:shadow-md focus:outline-none text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 transition-all whitespace-nowrap"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-50 border border-zinc-200 text-zinc-400 hover:text-zinc-800 transition"
            onClick={onShowLibrary}
            title="Show Library"
            aria-label="Show library"
          >
            <Layers className="w-4 h-4" />
          </button>

          <button
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition border ${editorMode === 'desmos' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-zinc-50 border-zinc-200 text-zinc-400 hover:text-zinc-600'}`}
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
        <div className="flex-1 min-w-0 relative w-full group max-h-[300px] overflow-y-auto bg-zinc-50 focus-within:bg-white border rounded-xl shadow-inner transition-colors focus-within:-outline-offset-2 focus-within:outline-blue-500 overflow-hidden flex items-center">
          {editorMode === 'desmos' ? (
            <div className="w-full px-4 py-6">
              <MathEditor value={latexEquation} onChange={onLatexChange} onJsChange={onLatexJsChange} />
            </div>
          ) : (
            <Editor
              value={equation}
              onValueChange={(code) => onEquationChange(code)}
              highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
              padding={24}
              className="w-full text-xl sm:text-2xl md:text-3xl font-mono leading-relaxed outline-none break-all"
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
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 bg-zinc-50 border border-zinc-100 px-2.5 py-1.5 rounded-md">
            Math: <span className="text-zinc-500 font-mono lowercase">sin, cos, tan, abs, floor, random, sign</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 bg-zinc-50 border border-zinc-100 px-2.5 py-1.5 rounded-md">
            Vars: <span className="text-zinc-500 font-mono lowercase">t, beat</span>
          </span>
        </div>
      </div>
    </div>
  );
}
