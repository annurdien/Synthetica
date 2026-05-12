'use client';
import { Layers, PanelLeft, PanelLeftClose, Plus, Search } from 'lucide-react';
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
      className={`border-r border-zinc-200 bg-white flex flex-col shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 absolute md:relative top-0 left-0 bottom-0 ${isVisible ? 'w-80 md:w-80 translate-x-0' : 'w-12 -translate-x-full md:translate-x-0'}`}
    >
      {isVisible ? (
        <>
          <div className="p-0 border-b border-zinc-100 shrink-0 relative flex flex-col">
            <div className="p-6 pb-0 relative">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4" /> Library
              </h3>
              <button
                onClick={onHide}
                className="absolute top-5 right-4 p-2 md:p-0 md:top-6 text-zinc-400 hover:text-zinc-800 transition"
                title="Hide Library"
                aria-label="Hide library"
              >
                <PanelLeftClose className="w-5 h-5 md:w-4 md:h-4" />
              </button>
            </div>

            <div className="flex border-b border-zinc-100 px-6">
              <button
                onClick={() => onLibraryTabChange('projects')}
                className={`pb-3 text-[10px] uppercase font-bold tracking-widest flex-1 transition border-b-2 ${libraryTab === 'projects' ? 'border-zinc-800 text-zinc-800' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
              >
                Projects
              </button>
              <button
                onClick={() => onLibraryTabChange('clips')}
                className={`pb-3 text-[10px] uppercase font-bold tracking-widest flex-1 transition border-b-2 ${libraryTab === 'clips' ? 'border-zinc-800 text-zinc-800' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
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
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-9 pr-3 py-2 text-xs outline-none focus:border-zinc-400"
                  />
                </div>
                <p className="text-[10px] text-zinc-400 mt-3">Drag a clip to the track timeline.</p>
              </div>
            )}
          </div>

          <div className="p-4 flex-1 relative overflow-y-auto min-h-0 bg-zinc-50/50">
            {libraryTab === 'clips' ? (
              <div className="grid grid-cols-2 gap-3">
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
                    className="flex flex-col p-3 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md cursor-grab active:cursor-grabbing text-zinc-700 transition-all group aspect-square relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-100/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start justify-between gap-1 mb-2">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${selectedClipEquation === preset.eq ? 'bg-zinc-800' : 'bg-zinc-300'}`}></div>
                          <span className="text-xs font-bold leading-tight line-clamp-2">{preset.name}</span>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <div className="font-mono text-[8px] text-zinc-400 leading-tight line-clamp-3 opacity-60 bg-white/50 p-1.5 rounded border border-zinc-100">
                          {preset.eq}
                        </div>
                      </div>

                      <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onTogglePreview) onTogglePreview(preset.id);
                          }}
                          className={`w-6 h-6 bg-white shadow-sm border border-zinc-100 rounded flex items-center justify-center transition-all hover:scale-110 shrink-0 z-20 ${previewingClipId === preset.id ? 'text-blue-500' : 'text-zinc-400 hover:text-zinc-800'}`}
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
                          className="w-6 h-6 bg-white shadow-sm border border-zinc-100 rounded flex items-center justify-center transition-all hover:scale-110 shrink-0 z-20 text-zinc-400 hover:text-zinc-800"
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
                    className="bg-white border border-zinc-200 rounded-xl p-4 hover:border-zinc-300 hover:shadow-sm transition cursor-pointer"
                    onClick={() => onLoadProjectPreset(preset)}
                  >
                    <h4 className="text-sm font-bold text-zinc-800 mb-1">{preset.name}</h4>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-3">
                      {preset.bpm} BPM • {preset.tracks.length} Tracks
                    </div>
                    <button className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold py-2 rounded-lg transition">
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
          className="flex flex-col items-center py-6 h-full cursor-pointer hover:bg-zinc-50 transition-colors"
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
