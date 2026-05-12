export type Clip = {
  id: string;
  trackId: number;
  startBeat: number;
  lengthBeats: number;
  equation: string;
  name: string;
  color: string;
};

export type Track = {
  id: number;
  name: string;
  muted: boolean;
  height: number;
};

export type Preset = {
  name: string;
  eq: string;
  bpm: number;
};

export type ProjectPreset = {
  name: string;
  bpm: number;
  clips: Clip[];
  tracks: Track[];
};

export type LibraryItem = {
  id: string;
  name: string;
  eq: string;
  bpm: number;
};

export type ActiveTab = 'synth' | 'producer';
export type EditorMode = 'standard' | 'desmos';
export type SynthVisType = 'oscilloscope' | 'graph' | 'spectrum';
export type LibraryTab = 'beats' | 'projects';
