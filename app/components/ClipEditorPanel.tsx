'use client';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { PanelRight, PanelRightClose, Settings2, Trash2 } from 'lucide-react';
import type { Clip } from '@/app/lib/types';

interface ClipEditorPanelProps {
  isVisible: boolean;
  selectedClip: Clip | null;
  error: string | null;
  onUpdateClip: (updates: Partial<Clip>) => void;
  onDeleteClip: () => void;
  onHide: () => void;
  onShow: () => void;
  totalBeats: number;
}

export function ClipEditorPanel({
  isVisible,
  selectedClip,
  error,
  onUpdateClip,
  onDeleteClip,
  onHide,
  onShow,
  totalBeats,
}: ClipEditorPanelProps) {
  return (
    <div
      className={`border-l border-black/5 dark:border-white/10 flex flex-col bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shrink-0 z-20 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 absolute md:relative top-0 right-0 bottom-0 max-w-full ${isVisible ? 'w-full sm:w-80 translate-x-0' : 'w-12 translate-x-full md:translate-x-0'}`}
    >
      {isVisible ? (
        selectedClip ? (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6 shrink-0 relative">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Settings2 className="w-4 h-4" /> Edit Clip
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={onDeleteClip}
                  className="text-red-500 hover:text-red-600 text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition"
                  title="Delete Clip"
                  aria-label="Delete clip"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                <button onClick={onHide} className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition p-2 md:p-1" title="Hide Editor" aria-label="Hide editor">
                  <PanelRightClose className="w-5 h-5 md:w-4 md:h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 h-full">
              <div className="space-y-4 shrink-0">
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest block mb-1.5">Name</label>
                  <input
                    type="text"
                    value={selectedClip.name}
                    onChange={(e) => onUpdateClip({ name: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-black/20 dark:focus:border-white/20 focus:bg-white dark:focus:bg-zinc-800 font-medium transition shadow-inner"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest block mb-1.5">Start (Beat)</label>
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      value={selectedClip.startBeat}
                      onChange={(e) => onUpdateClip({ startBeat: Number(e.target.value) })}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg px-2 text-center py-2 text-sm outline-none focus:border-black/20 dark:focus:border-white/20 focus:bg-white dark:focus:bg-zinc-800 font-mono transition shadow-inner"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest block mb-1.5">Len (Beats)</label>
                    <input
                      type="number"
                      step="0.25"
                      min="0.25"
                      value={selectedClip.lengthBeats}
                      onChange={(e) => onUpdateClip({ lengthBeats: Number(e.target.value) })}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg px-2 text-center py-2 text-sm outline-none focus:border-black/20 dark:focus:border-white/20 focus:bg-white dark:focus:bg-zinc-800 font-mono transition shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col min-h-[200px] min-w-0">
                <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest block mb-1.5">Sound Formula</label>
                <div className="flex-1 overflow-y-auto bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 focus-within:border-black/20 dark:focus-within:border-white/20 rounded-xl shadow-inner transition-colors flex flex-col">
                  <Editor
                    value={selectedClip.equation}
                    onValueChange={(code) => onUpdateClip({ equation: code })}
                    highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
                    padding={16}
                    className="text-zinc-800 dark:text-zinc-100 text-xs leading-relaxed outline-none font-mono min-h-full break-all"
                    textareaClassName="outline-none focus:outline-none"
                    style={{
                      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                    }}
                  />
                </div>

                {error && (
                  <div className="mt-2 text-red-500 bg-red-50 border border-red-100 p-2 rounded text-[10px] font-mono break-all">{error}</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 text-sm p-6 text-center relative">
            <button onClick={onHide} className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-1" title="Hide Editor" aria-label="Hide editor">
              <PanelRightClose className="w-5 h-5 md:w-4 md:h-4" />
            </button>
            <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center mb-4 mt-8">
              <Settings2 className="w-8 h-8 text-zinc-300" />
            </div>
            <h3 className="font-medium text-zinc-600 dark:text-zinc-400 mb-2">Select a Clip</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Click a clip on the timeline to edit its sound, timing, and properties.
            </p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center py-6 h-full cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 dark:bg-zinc-900/50 transition-colors" onClick={onShow} title="Show Editor">
          <PanelRight className="w-4 h-4 text-zinc-400 mb-6" />
          <div className="flex-1 flex items-start justify-center">
            <span className="[writing-mode:vertical-lr] text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Clip Editor</span>
          </div>
        </div>
      )}
    </div>
  );
}
