import type { Preset, ProjectPreset } from './types';

export const PRESETS: Preset[] = [
  {
    name: 'Digital Square Bass',
    eq: 'sign(sin(2 * PI * (55 * pow(1.05946, [0,-4,3,-2][floor(beat / 2) % 4])) * t)) * exp(-3 * ((beat * 4) % 1)) * 0.15',
    bpm: 120,
  },
  {
    name: 'Digital Saw Lead',
    eq: '((t * 220 * pow(1.05946, [0,3,7,12,14,12,7,3][floor(beat * 4) % 8])) % 1 * 2 - 1) * exp(-5 * ((beat * 4) % 1)) * 0.15',
    bpm: 120,
  },
  {
    name: 'Dreamy Arp',
    eq: 'sin(2 * PI * (220 * pow(1.05946, [0,3,7,12,  0,3,7,12,  -4,0,3,8,  -4,0,3,8,  3,7,10,15,  3,7,10,15,  -2,2,7,10,  -2,2,7,10][floor(beat * 4) % 32])) * t + 0.5 * sin(2 * PI * (220 * pow(1.05946, [0,3,7,12,  0,3,7,12,  -4,0,3,8,  -4,0,3,8,  3,7,10,15,  3,7,10,15,  -2,2,7,10,  -2,2,7,10][floor(beat * 4) % 32])) * t * 1.01)) * exp(-3 * ((beat * 4) % 1)) * 0.3',
    bpm: 110,
  },
  {
    name: 'Synthwave Bass',
    eq: 'sin(2 * PI * (55 * pow(1.05946, [0,0,0,0,  -4,-4,-4,-4,  3,3,3,3,  -2,-2,-2,-2][floor(beat * 2) % 16])) * t + 3 * exp(-5 * ((beat * 4) % 1)) * sin(2 * PI * (55 * pow(1.05946, [0,0,0,0,  -4,-4,-4,-4,  3,3,3,3,  -2,-2,-2,-2][floor(beat * 2) % 16])) * t)) * exp(-2 * ((beat * 4) % 1)) * 0.4',
    bpm: 120,
  },
  {
    name: 'Lo-Fi Drum Loop',
    eq: '(sin(2 * PI * 55 * t) * exp(-10 * ((beat * 2) % 1)) * ([1,0,0.5,1, 0,0,1,0][floor(beat * 2) % 8]) + (random() * 2 - 1) * exp(-20 * ((beat + 1) % 2)) * 0.5 + (random() * 2 - 1) * exp(-35 * ((beat * 4) % 1)) * ([0.15, 0.05, 0.2, 0.05][floor(beat * 4) % 4]) * 0.1) * 1.0',
    bpm: 85,
  },
  {
    name: 'Slap Bass',
    eq: 'sin(2 * PI * (55 * pow(1.05946, [0,0,-4,-4, 3,3,-2,-2][floor(beat) % 8])) * t + 1.5 * exp(-10 * ((beat * 4) % 1)) * sin(2 * PI * (55 * pow(1.05946, [0,0,-4,-4, 3,3,-2,-2][floor(beat) % 8])) * t)) * exp(-2 * ((beat * 4) % 1)) * ([1, 0.3, 1, 0.8][floor(beat * 4) % 4]) * 0.4',
    bpm: 124,
  },
  {
    name: 'Euphoric Lead',
    eq: '(sin(2 * PI * (440 * pow(1.05946, [12,12,10,12, 15,15,14,10][floor(beat * 2) % 8])) * t) + sin(2 * PI * (440 * pow(1.05946, [12,12,10,12, 15,15,14,10][floor(beat * 2) % 8])) * t * 1.005)) * exp(-1.5 * ((beat * 2) % 1)) * 0.25',
    bpm: 126,
  },
  {
    name: 'Chillwave Pad',
    eq: '(sin(2 * PI * 110 * t) + sin(2 * PI * 110 * pow(1.05946, 7) * t) + sin(2 * PI * 110 * pow(1.05946, 15) * t) + sin(2 * PI * 110 * pow(1.05946, 17) * t)) * 0.05 * (0.6 - 0.4 * cos(2 * PI * beat / 4))',
    bpm: 90,
  },
  {
    name: 'Classic House Chord',
    eq: '(sin(2 * PI * 220 * t) + sin(2 * PI * 220 * pow(1.05946, 3) * t) + sin(2 * PI * 220 * pow(1.05946, 7) * t) + sin(2 * PI * 220 * pow(1.05946, 10) * t)) * exp(-3 * ((beat * 4) % 1)) * ([1,0,0,1, 0,1,0,0][floor(beat * 4) % 8]) * 0.15',
    bpm: 125,
  },
  {
    name: 'Future Pluck',
    eq: 'sin(2 * PI * (440 * pow(1.05946, [0,3,7,12, 14,12,7,3][floor(beat * 4) % 8])) * t) * exp(-8 * ((beat * 4) % 1)) * 0.3',
    bpm: 120,
  },
];

export const PROJECT_PRESETS: ProjectPreset[] = [
  {
    name: 'Midnight Drive (Synthwave)',
    bpm: 115,
    clips: [
      {
        id: 'm_arp1',
        trackId: 0,
        startBeat: 0,
        lengthBeats: 32,
        equation:
          'sin(2 * PI * (220 * pow(1.05946, ([0,-4,3,-2][floor(beat / 8) % 4]) + ([0,7,12,7][floor(beat * 4) % 4]))) * t) * exp(-4 * ((beat * 4) % 1)) * 0.15',
        name: 'Dreamy Arp',
        color: '#8b5cf6',
      },
      {
        id: 'm_arp2',
        trackId: 0,
        startBeat: 32,
        lengthBeats: 32,
        equation:
          'sin(2 * PI * (220 * pow(1.05946, ([0,-4,3,-2][floor(beat / 8) % 4]) + ([0,7,12,7][floor(beat * 4) % 4]))) * t) * exp(-4 * ((beat * 4) % 1)) * 0.15',
        name: 'Dreamy Arp',
        color: '#8b5cf6',
      },
      {
        id: 'm_chords1',
        trackId: 1,
        startBeat: 16,
        lengthBeats: 16,
        equation:
          '(sin(2 * PI * (110 * pow(1.05946, [0,-4,3,-2][floor(beat / 8) % 4])) * t) + sin(2 * PI * (110 * pow(1.05946, [3,0,7,2][floor(beat / 8) % 4])) * t) + sin(2 * PI * (110 * pow(1.05946, [7,3,10,5][floor(beat / 8) % 4])) * t)) * 0.05 * (0.5 - 0.5 * cos(2 * PI * (beat % 8) / 8))',
        name: 'Pad Swell',
        color: '#ec4899',
      },
      {
        id: 'm_chords2',
        trackId: 1,
        startBeat: 32,
        lengthBeats: 32,
        equation:
          '(sin(2 * PI * (110 * pow(1.05946, [0,-4,3,-2][floor(beat / 8) % 4])) * t) + sin(2 * PI * (110 * pow(1.05946, [3,0,7,2][floor(beat / 8) % 4])) * t) + sin(2 * PI * (110 * pow(1.05946, [7,3,10,5][floor(beat / 8) % 4])) * t)) * 0.05 * (0.5 - 0.5 * cos(2 * PI * (beat % 8) / 8))',
        name: 'Pad Swell',
        color: '#ec4899',
      },
      {
        id: 'm_bass',
        trackId: 2,
        startBeat: 32,
        lengthBeats: 32,
        equation:
          'sin(2 * PI * (55 * pow(1.05946, [0,-4,3,-2][floor(beat / 8) % 4])) * t + 3 * exp(-5 * ((beat * 4) % 1)) * sin(2 * PI * (55 * pow(1.05946, [0,-4,3,-2][floor(beat / 8) % 4])) * t)) * exp(-2 * ((beat * 4) % 1)) * 0.35',
        name: 'Synthwave Bass',
        color: '#f59e0b',
      },
      {
        id: 'm_kick',
        trackId: 3,
        startBeat: 32,
        lengthBeats: 32,
        equation: 'sin(2 * PI * 55 * t) * exp(-10 * (beat % 1)) * 0.8',
        name: 'Retro Kick',
        color: '#ef4444',
      },
      {
        id: 'm_snare',
        trackId: 4,
        startBeat: 32,
        lengthBeats: 32,
        equation:
          '((random() * 2 - 1) * 0.7 + 0.3 * sin(2 * PI * 180 * t)) * exp(-30 * ((beat + 1) % 2)) * 0.4',
        name: 'Gated Snare',
        color: '#f97316',
      },
      {
        id: 'm_hats',
        trackId: 5,
        startBeat: 32,
        lengthBeats: 32,
        equation:
          '(random() * 2 - 1) * exp(-40 * ((beat * 4) % 1)) * ([0.3, 0.1, 0.5, 0.1][floor(beat * 4) % 4]) * 0.15',
        name: '16th Hats',
        color: '#10b981',
      },
    ],
    tracks: [
      { id: 0, name: 'Arpeggiator', muted: false, height: 80 },
      { id: 1, name: 'Synth Pad', muted: false, height: 80 },
      { id: 2, name: 'Synth Bass', muted: false, height: 80 },
      { id: 3, name: 'Kick Drum', muted: false, height: 80 },
      { id: 4, name: 'Snare Drum', muted: false, height: 80 },
      { id: 5, name: 'Hi-Hats', muted: false, height: 80 },
    ],
  },
  {
    name: 'Lo-Fi Study Vibes',
    bpm: 82,
    clips: [
      {
        id: 'l_keys1',
        trackId: 0,
        startBeat: 0,
        lengthBeats: 16,
        equation:
          '((sin(2*PI*(220*pow(1.05946,[5,10,3,-4][floor(beat/4)%4]))*t) + sin(2*PI*(220*pow(1.05946,[8,14,7,0][floor(beat/4)%4]))*t) + sin(2*PI*(220*pow(1.05946,[12,17,10,3][floor(beat/4)%4]))*t) + sin(2*PI*(220*pow(1.05946,[15,20,14,7][floor(beat/4)%4]))*t))) * exp(-1.5 * ((beat * 2) % 1)) * ([1,0,0.5,0, 0.8,0,0,0][floor(beat * 2) % 8]) * 0.1',
        name: 'Electric Piano',
        color: '#3b82f6',
      },
      {
        id: 'l_keys2',
        trackId: 0,
        startBeat: 16,
        lengthBeats: 16,
        equation:
          '((sin(2*PI*(220*pow(1.05946,[5,10,3,-4][floor(beat/4)%4]))*t) + sin(2*PI*(220*pow(1.05946,[8,14,7,0][floor(beat/4)%4]))*t) + sin(2*PI*(220*pow(1.05946,[12,17,10,3][floor(beat/4)%4]))*t) + sin(2*PI*(220*pow(1.05946,[15,20,14,7][floor(beat/4)%4]))*t))) * exp(-1.5 * ((beat * 2) % 1)) * ([1,0,0.5,0, 0.8,0,0,0][floor(beat * 2) % 8]) * 0.1',
        name: 'Electric Piano',
        color: '#3b82f6',
      },
      {
        id: 'l_drums',
        trackId: 1,
        startBeat: 0,
        lengthBeats: 32,
        equation:
          'sin(2 * PI * 55 * t) * exp(-10 * ((beat * 2) % 1)) * ([1,0,0,0, 1,0.8,0,0][floor(beat * 2) % 8]) * 0.6 + (random() * 2 - 1) * exp(-20 * ((beat + 1) % 2)) * 0.4 + (random() * 2 - 1) * exp(-35 * ((beat * 4) % 1)) * ([0.15, 0.05, 0.2, 0.05][floor(beat * 4) % 4]) * 0.1',
        name: 'Smooth Drum Loop',
        color: '#ef4444',
      },
      {
        id: 'l_bass',
        trackId: 2,
        startBeat: 16,
        lengthBeats: 16,
        equation:
          'sin(2 * PI * (55 * pow(1.05946, [5,10,3,-4][floor(beat/4)%4])) * t) * exp(-1.5 * ((beat * 2) % 1)) * ([1,0,0,0, 1,1,0,0][floor(beat * 2) % 8]) * 0.4',
        name: 'Sub Bass',
        color: '#f59e0b',
      },
    ],
    tracks: [
      { id: 0, name: 'Rhodes Keys', muted: false, height: 80 },
      { id: 1, name: 'Drum Break', muted: false, height: 80 },
      { id: 2, name: 'Warm Bass', muted: false, height: 80 },
    ],
  },
  {
    name: 'Slap House Banger',
    bpm: 124,
    clips: [
      {
        id: 'sh_kick',
        trackId: 0,
        startBeat: 0,
        lengthBeats: 32,
        equation: 'sin(2 * PI * 60 * t) * exp(-10 * (beat % 1)) * 0.9',
        name: 'Punchy Kick',
        color: '#ef4444',
      },
      {
        id: 'sh_bass',
        trackId: 1,
        startBeat: 0,
        lengthBeats: 32,
        equation:
          'sin(2 * PI * (55 * pow(1.05946, [0,-4,3,-2][floor(beat / 4) % 4])) * t + 1.5 * exp(-10 * ((beat * 4) % 1)) * sin(2 * PI * (55 * pow(1.05946, [0,-4,3,-2][floor(beat / 4) % 4])) * t)) * exp(-3 * ((beat * 2) % 1)) * ([0, 1][floor(beat * 2) % 2]) * 0.5',
        name: 'Off-Beat Donk',
        color: '#f59e0b',
      },
      {
        id: 'sh_clap',
        trackId: 2,
        startBeat: 0,
        lengthBeats: 32,
        equation: '(random() * 2 - 1) * exp(-40 * ((beat + 1) % 2)) * 0.4',
        name: 'House Clap',
        color: '#f97316',
      },
      {
        id: 'sh_hats',
        trackId: 3,
        startBeat: 16,
        lengthBeats: 16,
        equation:
          '(random() * 2 - 1) * exp(-40 * ((beat * 4) % 1)) * ([0.1, 0.1, 0.4, 0.1][floor(beat * 4) % 4]) * 0.15',
        name: 'Off-Beat Hats',
        color: '#10b981',
      },
      {
        id: 'sh_lead',
        trackId: 4,
        startBeat: 16,
        lengthBeats: 16,
        equation:
          'sin(2 * PI * (110 * pow(1.05946, [12,15,19,17, 12,10,7,3][floor(beat * 2) % 8] + [0,-4,3,-2][floor(beat / 4) % 4])) * t) * exp(-8 * ((beat * 2) % 1)) * ([1, 0, 1, 1,  1, 0, 1, 0][floor(beat * 2) % 8]) * 0.35',
        name: 'Plucky Lead',
        color: '#8b5cf6',
      },
    ],
    tracks: [
      { id: 0, name: 'Kick', muted: false, height: 80 },
      { id: 1, name: 'Donk Bass', muted: false, height: 80 },
      { id: 2, name: 'Clap', muted: false, height: 80 },
      { id: 3, name: 'Hi-Hats', muted: false, height: 80 },
      { id: 4, name: 'Plucky Lead', muted: false, height: 80 },
    ],
  },
];
