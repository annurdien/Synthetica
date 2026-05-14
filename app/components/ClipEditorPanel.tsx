'use client';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { 
  PanelRight, 
  PanelRightClose, 
  Settings2, 
  Trash2, 
  Clock, 
  Maximize2,
  Code2,
  Activity
} from 'lucide-react';
import type { Clip } from '@/app/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

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
    <aside
      className={`border-l border-black/5 dark:border-white/10 flex flex-col bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl shrink-0 z-30 transition-all duration-500 absolute md:relative top-0 right-0 bottom-0 ${
        isVisible ? 'w-full sm:w-80 translate-x-0' : 'w-12 translate-x-full md:translate-x-0'
      } shadow-2xl md:shadow-none h-full overflow-hidden`}
    >
      <AnimatePresence mode="wait">
        {isVisible ? (
          selectedClip ? (
            <motion.div 
              key="editor"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Premium Header */}
              <div className="p-6 pb-2 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
                    <Settings2 className="w-4 h-4 text-white dark:text-black" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-[0.2em]">
                      Inspector
                    </h4>
                    <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">Clip Properties</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onDeleteClip}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                    title="Delete Clip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={onHide} 
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    <PanelRightClose className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest px-1">Name</label>
                    <input
                      type="text"
                      value={selectedClip.name}
                      onChange={(e) => onUpdateClip({ name: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/10 dark:focus:border-white/10 rounded-xl py-2.5 px-4 text-xs font-semibold outline-none transition-all placeholder:text-zinc-400"
                      placeholder="Enter clip name..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest px-1 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> Start
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        value={selectedClip.startBeat}
                        onChange={(e) => onUpdateClip({ startBeat: Number(e.target.value) })}
                        className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/10 dark:focus:border-white/10 rounded-xl py-2.5 px-4 text-xs font-mono outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest px-1 flex items-center gap-2">
                        <Maximize2 className="w-3 h-3" /> Length
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0.25"
                        value={selectedClip.lengthBeats}
                        onChange={(e) => onUpdateClip({ lengthBeats: Number(e.target.value) })}
                        className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/10 dark:focus:border-white/10 rounded-xl py-2.5 px-4 text-xs font-mono outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Formula Section */}
                <div className="flex-1 flex flex-col space-y-3 min-h-0">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                      <Code2 className="w-3 h-3" /> Sound Formula
                    </label>
                    <span className="text-[8px] font-mono text-zinc-400 opacity-60">Javascript</span>
                  </div>
                  <div className="flex-1 bg-black/5 dark:bg-white/5 border border-transparent focus-within:border-black/10 dark:focus-within:border-white/10 rounded-2xl shadow-inner transition-all flex flex-col overflow-hidden group/editor">
                    <div className="flex-1 overflow-y-auto max-h-[300px]">
                      <Editor
                        value={selectedClip.equation}
                        onValueChange={(code) => onUpdateClip({ equation: code })}
                        highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
                        padding={24}
                        className="text-zinc-800 dark:text-zinc-100 text-[11px] leading-relaxed outline-none font-mono min-h-full break-all"
                        textareaClassName="outline-none focus:outline-none"
                        style={{
                          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        }}
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-mono text-red-500 break-all leading-relaxed"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="w-3 h-3" />
                        <span className="font-bold uppercase tracking-widest">Error Detail</span>
                      </div>
                      {error}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 relative group">
                <div className="absolute inset-0 bg-black dark:bg-white opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity blur-xl" />
                <Settings2 className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-2">No Clip Selected</h3>
              <p className="text-[10px] text-zinc-400 font-medium leading-relaxed max-w-[200px]">
                Click any clip on the timeline to inspect and edit its mathematical properties.
              </p>
              
              <button 
                onClick={onHide}
                className="mt-8 text-[9px] font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors"
              >
                <PanelRightClose className="w-3.5 h-3.5" /> Close Inspector
              </button>
            </motion.div>
          )
        ) : (
          <motion.div 
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-8 h-full cursor-pointer group" 
            onClick={onShow}
          >
            <PanelRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors mb-8" />
            <div className="flex-1 flex flex-col items-center gap-4">
               <div className="w-px h-full bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors" />
               <span className="[writing-mode:vertical-lr] text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">Inspector</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

