'use client';
import { 
  Search, 
  Box, 
  Folder, 
  Music2, 
  Clock, 
  Zap,
  ChevronRight,
  Disc,
  Library as LibraryIcon,
  Plus,
  PanelLeftClose,
  PanelLeft,
  Volume2,
  VolumeX
} from 'lucide-react';
import type { LibraryItem, ProjectPreset } from '@/app/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface ProducerLibraryPanelProps {
  isVisible: boolean;
  libraryTab: 'clips' | 'projects';
  onLibraryTabChange: (tab: 'clips' | 'projects') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredLibrary: LibraryItem[];
  selectedClipEquation?: string;
  onAddClip: (trackIndex: number, equation: string, name: string) => void;
  onLoadProjectPreset: (preset: ProjectPreset) => void;
  projectPresets: ProjectPreset[];
  previewingClipId: string | null;
  onTogglePreview: (clipId: string, equation: string) => void;
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
  
  // Grouping logic for clips (mocked categories based on index for variety)
  const categories = [
    { name: 'Synths', icon: Zap, items: filteredLibrary.filter((_, i) => i % 3 === 0) },
    { name: 'Percussion', icon: Disc, items: filteredLibrary.filter((_, i) => i % 3 === 1) },
    { name: 'Textures', icon: Music2, items: filteredLibrary.filter((_, i) => i % 3 === 2) },
  ];

  if (!isVisible) {
    return (
      <aside className="w-16 h-full border-r border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl flex flex-col items-center py-8 gap-6 shrink-0 transition-all duration-500">
        <button
          onClick={onShow}
          className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300"
          title="Show Browser"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
        <div className="w-px h-12 bg-black/5 dark:bg-white/5"></div>
        <LibraryIcon className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />
      </aside>
    );
  }

  return (
    <aside className="w-80 h-full border-r border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl flex flex-col overflow-hidden relative z-20 shrink-0 transition-all duration-500">
      {/* Header Area */}
      <div className="p-6 pb-2 space-y-6 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-black dark:bg-white flex items-center justify-center">
              <LibraryIcon className="w-3.5 h-3.5 text-white dark:text-black" />
            </div>
            <h3 className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-[0.2em]">
              Browser
            </h3>
          </div>
          <button 
            onClick={onHide} 
            className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Tabs */}
        <div className="space-y-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/10 dark:focus:border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs outline-none transition-all placeholder:text-zinc-400"
            />
          </div>

          <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl">
            <button
              onClick={() => onLibraryTabChange('clips')}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                libraryTab === 'clips' 
                  ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white' 
                  : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <Zap className="w-3 h-3" /> Clips
            </button>
            <button
              onClick={() => onLibraryTabChange('projects')}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                libraryTab === 'projects' 
                  ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white' 
                  : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <Folder className="w-3 h-3" /> Projects
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 pt-4">
        <AnimatePresence mode="wait">
          {libraryTab === 'clips' ? (
            <motion.div
              key="clips"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-1"
            >
              {filteredLibrary.map((clip) => {
                const isPreviewing = previewingClipId === clip.id;
                const isSelected = selectedClipEquation === clip.eq;
                
                return (
                  <div
                    key={clip.id}
                    className={`w-full group flex flex-col p-1 rounded-2xl transition-all border ${
                      isSelected 
                        ? 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 shadow-inner' 
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 p-2 rounded-xl transition-all text-left">
                      <button
                        onClick={() => onTogglePreview(clip.id, clip.eq)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          isPreviewing 
                            ? 'bg-black dark:bg-white text-white dark:text-black scale-110' 
                            : 'bg-black/5 dark:bg-white/5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                      >
                        {isPreviewing ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <Music2 className="w-3.5 h-3.5" />}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 truncate transition-colors">
                          {clip.name}
                        </div>
                        <div className="flex items-center gap-2 text-[9px] text-zinc-400 font-mono">
                          <span>{clip.bpm} BPM</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onAddClip(0, clip.eq, clip.name)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/5 text-zinc-400 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all opacity-0 group-hover:opacity-100"
                        title="Add to Track 1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              {projectPresets.map((project, idx) => (
                <button
                  key={`${project.name}-${idx}`}
                  onClick={() => onLoadProjectPreset(project)}
                  className="w-full group relative p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-500 text-left overflow-hidden shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-black dark:bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Folder className="w-5 h-5 text-white dark:text-black" />
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Project</div>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    {project.name}
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                       <Clock className="w-3 h-3 text-zinc-400" />
                       <span className="text-[10px] font-mono text-zinc-500">{project.bpm} BPM</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Box className="w-3 h-3 text-zinc-400" />
                       <span className="text-[10px] font-mono text-zinc-500">{project.tracks.length} Tracks</span>
                    </div>
                  </div>

                  <div className="absolute -right-2 -bottom-2 w-24 h-24 bg-black/5 dark:bg-white/5 rounded-full blur-2xl group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors" />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
