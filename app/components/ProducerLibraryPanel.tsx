'use client';
import { Layers, PanelLeft, PanelLeftClose, Plus, Search, GripVertical, Play, Square } from 'lucide-react';
import type { LibraryItem, LibraryTab, ProjectPreset } from '@/app/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface ProducerLibraryPanelProps {
  isVisible: boolean;
  libraryTab: LibraryTab;
  onLibraryTabChange: (tab: LibraryTab) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filteredLibrary: LibraryItem[];
  selectedClipEquation?: string | null;
  onAddClip: (trackId: number, eq?: string, name?: string) => void;
  onLoadProjectPreset: (preset: ProjectPreset) => void;
  projectPresets: ProjectPreset[];
  previewingClipId?: string | null;
  onTogglePreview?: (clipId: string) => void;
  onHide: () => void;
  onShow: () => void;
}

export function ProducerLibraryPanel({
  isVisible,
  libraryTab,
  onLibraryTabChange,
  searchQuery,
  onSearchChange,
  filteredLibrary,
  selectedClipEquation,
  onAddClip,
  onLoadProjectPreset,
  projectPresets,
  previewingClipId,
  onTogglePreview,
  onHide,
  onShow,
}: ProducerLibraryPanelProps) {
  return (
    <div
      className={`border-r border-black/5 dark:border-white/10 flex flex-col bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl shrink-0 z-40 transition-all duration-500 ease-in-out absolute md:relative top-0 left-0 bottom-0 ${
        isVisible ? 'w-80 translate-x-0 shadow-2xl' : 'w-16 -translate-x-full md:translate-x-0'
      }`}
    >
      <AnimatePresence mode="wait">
        {isVisible ? (
          <motion.div 
            key="visible"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
          >
            <div className="p-8 pb-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-zinc-400" />
                  <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.3em]">
                    Library
                  </h3>
                </div>
                <button 
                  onClick={onHide} 
                  className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-6 mb-6">
                <button
                  onClick={() => onLibraryTabChange('projects')}
                  className={`pb-2 text-[10px] uppercase font-bold tracking-[0.2em] transition-all border-b-2 ${
                    libraryTab === 'projects' 
                      ? 'border-black dark:border-white text-zinc-900 dark:text-white' 
                      : 'border-transparent text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => onLibraryTabChange('clips')}
                  className={`pb-2 text-[10px] uppercase font-bold tracking-[0.2em] transition-all border-b-2 ${
                    libraryTab === 'clips' 
                      ? 'border-black dark:border-white text-zinc-900 dark:text-white' 
                      : 'border-transparent text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  Clips
                </button>
              </div>

              {libraryTab === 'clips' && (
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search formula..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-full pl-10 pr-4 py-2.5 text-xs outline-none focus:bg-white dark:focus:bg-black focus:border-black/20 dark:focus:border-white/20 transition-all"
                  />
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {libraryTab === 'clips' ? (
                <div className="space-y-3">
                  {filteredLibrary.map((preset) => {
                    const isActive = selectedClipEquation === preset.eq;
                    const isPreviewing = previewingClipId === preset.id;
                    return (
                      <div
                        key={preset.id}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('application/json', JSON.stringify({ eq: preset.eq, name: preset.name }));
                        }}
                        className={`group relative p-4 rounded-2xl transition-all duration-300 border cursor-grab active:cursor-grabbing ${
                          isActive
                            ? 'bg-black dark:bg-white text-white dark:text-black border-transparent shadow-lg'
                            : 'bg-white/50 dark:bg-zinc-800/30 border-black/5 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:border-black/20 dark:hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <GripVertical className="w-3 h-3 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400" />
                            <span className={`text-sm font-semibold truncate ${isActive ? 'text-white dark:text-black' : 'text-zinc-900 dark:text-zinc-100'}`}>
                              {preset.name}
                            </span>
                          </div>
                          <div className="flex gap-1.5 ml-2">
                             <button
                               onClick={(e) => {
                                 e.stopPropagation();
                                 if (onTogglePreview) onTogglePreview(preset.id);
                               }}
                               className={`w-7 h-7 flex items-center justify-center rounded-full transition-all ${
                                 isPreviewing 
                                   ? 'bg-red-500 text-white' 
                                   : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20'
                               }`}
                             >
                               {isPreviewing ? <Square className="w-2.5 h-2.5 fill-current" /> : <Play className="w-2.5 h-2.5 fill-current ml-0.5" />}
                             </button>
                             <button
                               onClick={(e) => {
                                 e.stopPropagation();
                                 onAddClip(0, preset.eq, preset.name);
                               }}
                               className={`w-7 h-7 flex items-center justify-center rounded-full transition-all bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20`}
                             >
                               <Plus className="w-3 h-3" />
                             </button>
                          </div>
                        </div>
                        <div className={`font-mono text-[9px] truncate ${isActive ? 'opacity-60' : 'opacity-30'}`}>
                          {preset.eq}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {projectPresets.map((preset, idx) => (
                    <button
                      key={`${preset.name}-${idx}`}
                      onClick={() => onLoadProjectPreset(preset)}
                      className="w-full text-left p-5 rounded-2xl bg-white/50 dark:bg-zinc-800/30 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 group"
                    >
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:translate-x-1 transition-transform">
                        {preset.name}
                      </h4>
                      <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                        {preset.bpm} BPM • {preset.tracks.length} Tracks
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-8 gap-6"
          >
            <button
              onClick={onShow}
              className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300"
              title="Show Library"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
            <div className="w-px h-12 bg-black/5 dark:bg-white/5"></div>
            <Layers className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
