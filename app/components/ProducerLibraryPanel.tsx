'use client';
import { Layers, PanelLeft, PanelLeftClose, Plus, Search, GripVertical } from 'lucide-react';
import type { LibraryItem, LibraryTab, ProjectPreset } from '@/app/lib/types';

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
      className={`border-r border-black/5 dark:border-white/10 flex flex-col bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 absolute md:relative top-0 left-0 bottom-0 ${isVisible ? 'w-80 md:w-80 translate-x-0' : 'w-12 -translate-x-full md:translate-x-0'}`}
    >
      {isVisible ? (
        <>
          <div className="p-0 border-b border-zinc-100 dark:border-zinc-800 dark:border-zinc-200 shrink-0 relative flex flex-col">
            <div className="p-6 pb-0 relative">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4" /> Library
              </h3>
              <button
                onClick={onHide}
                className="absolute top-5 right-4 p-2 md:p-0 md:top-6 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 dark:text-zinc-200 transition"
                title="Hide Library"
                aria-label="Hide library"
              >
                <PanelLeftClose className="w-5 h-5 md:w-4 md:h-4" />
              </button>
            </div>

            <div className="flex border-b border-zinc-100 dark:border-zinc-800 dark:border-zinc-200 px-6">
              <button
                onClick={() => onLibraryTabChange('projects')}
                className={`pb-3 text-[10px] uppercase font-bold tracking-widest flex-1 transition border-b-2 ${libraryTab === 'projects' ? 'border-zinc-800 dark:border-zinc-200 text-zinc-800 dark:text-zinc-200' : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-400 dark:text-zinc-400'}`}
              >
                Projects
              </button>
              <button
                onClick={() => onLibraryTabChange('clips')}
                className={`pb-3 text-[10px] uppercase font-bold tracking-widest flex-1 transition border-b-2 ${libraryTab === 'clips' ? 'border-zinc-800 dark:border-zinc-200 text-zinc-800 dark:text-zinc-200' : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-400 dark:text-zinc-400'}`}
              >
                Clips
              </button>
            </div>

            {libraryTab === 'clips' && (
              <div className="p-6 pt-4 shrink-0">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search clips..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 dark:bg-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-xs outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
                  />
                </div>
                <p className="text-[10px] text-zinc-400 mt-3">Drag a clip to the track timeline.</p>
              </div>
            )}
          </div>

          <div className="p-4 flex-1 relative overflow-y-auto min-h-0 bg-zinc-50 dark:bg-zinc-900 dark:bg-zinc-100/50">
            {libraryTab === 'clips' ? (
              <div className="flex flex-col gap-2">
                {filteredLibrary.map((preset) => (
                  <div
                    key={preset.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/json', JSON.stringify({ eq: preset.eq, name: preset.name }));

                      const ghost = document.createElement('div');
                      ghost.style.width = '100px';
                      ghost.style.height = '40px';
                      ghost.style.background = '#3b82f6';
                      ghost.style.borderRadius = '4px';
                      ghost.style.position = 'absolute';
                      ghost.style.top = '-1000px';
                      document.body.appendChild(ghost);
                      e.dataTransfer.setDragImage(ghost, 50, 20);
                      setTimeout(() => document.body.removeChild(ghost), 0);
                    }}
                    className={`group relative flex items-center p-3 rounded-2xl cursor-grab active:cursor-grabbing transition-all overflow-hidden border border-transparent ${
                      selectedClipEquation === preset.eq
                        ? 'bg-zinc-900/5 dark:bg-white/10 text-zinc-900 dark:text-white shadow-sm border-black/5 dark:border-white/10'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-900/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="shrink-0 mr-3 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="relative z-10 flex flex-col flex-1 min-w-0 pr-12">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-sm font-semibold truncate ${selectedClipEquation === preset.eq ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'}`}>
                          {preset.name}
                        </span>
                      </div>
                      <div className={`font-mono text-[10px] truncate mt-1 ${selectedClipEquation === preset.eq ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-400 dark:text-zinc-500 opacity-60'}`}>
                        {preset.eq}
                      </div>

                      <div className="absolute top-1/2 -translate-y-1/2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onTogglePreview) onTogglePreview(preset.id);
                          }}
                          className={`w-6 h-6 bg-white dark:bg-zinc-950 shadow-sm border border-zinc-100 dark:border-zinc-800 dark:border-zinc-200 rounded flex items-center justify-center transition-all hover:scale-110 shrink-0 z-20 ${previewingClipId === preset.id ? 'text-blue-500' : 'text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 dark:text-zinc-200'}`}
                          title={previewingClipId === preset.id ? 'Stop Preview' : 'Preview Clip'}
                          aria-label={previewingClipId === preset.id ? 'Stop preview' : 'Preview clip'}
                        >
                          {previewingClipId === preset.id ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddClip(0, preset.eq, preset.name);
                          }}
                          className="w-6 h-6 bg-white dark:bg-zinc-950 shadow-sm border border-zinc-100 dark:border-zinc-800 dark:border-zinc-200 rounded flex items-center justify-center transition-all hover:scale-110 shrink-0 z-20 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 dark:text-zinc-200"
                          title="Add to Track 1"
                          aria-label={`Add ${preset.name} to Track 1`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {projectPresets.map((preset, idx) => (
                  <div
                    key={`${preset.name}-${idx}`}
                    className="bg-zinc-50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl p-4 transition-colors cursor-pointer group"
                    onClick={() => onLoadProjectPreset(preset)}
                  >
                    <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 mb-1">{preset.name}</h4>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-3">
                      {preset.bpm} BPM • {preset.tracks.length} Tracks
                    </div>
                    <button className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 text-xs font-bold py-2 rounded-lg transition-colors">
                      Load Project
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          className="flex flex-col items-center py-6 h-full cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 dark:bg-zinc-900 dark:bg-zinc-100 transition-colors"
          onClick={onShow}
          title="Show Library"
        >
          <PanelLeft className="w-4 h-4 text-zinc-400 mb-6" />
          <div className="flex-1 flex items-start justify-center">
            <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Sound Library
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
