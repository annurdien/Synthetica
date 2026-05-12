import type { Preset, ProjectPreset } from './types';

export const PRESETS: Preset[] = [
  {
    name: 'Velvet FM Rhodes',
    eq: '(sin(2*PI*(220*pow(1.05946,[5,10,3,0][floor(beat/4)%4]))*t + (0.5+3*exp(-6*((beat*2)%1)))*sin(2*PI*(220*pow(1.05946,[5,10,3,0][floor(beat/4)%4]))*t)) + 0.6*sin(2*PI*(220*pow(1.05946,[8,14,7,3][floor(beat/4)%4]))*t + (0.3+2*exp(-6*((beat*2)%1)))*sin(2*PI*(220*pow(1.05946,[8,14,7,3][floor(beat/4)%4]))*t))) * exp(-2*((beat*2)%1)) * ([1,0,0.6,0, 0.8,0,0.4,0][floor(beat*2)%8]) * 0.2',
    bpm: 88,
  },
  {
    name: 'Hypersaw Anthem',
    eq: '(((t*440*pow(1.05946,[0,3,7,12,15,12,7,3][floor(beat*4)%8]))%1*2-1) + ((t*440*pow(1.05946,[0,3,7,12,15,12,7,3][floor(beat*4)%8])*1.007)%1*2-1) + ((t*440*pow(1.05946,[0,3,7,12,15,12,7,3][floor(beat*4)%8])*0.993)%1*2-1)) * exp(-4*((beat*4)%1)) * 0.1',
    bpm: 138,
  },
  {
    name: '303 Acid Line',
    eq: 'sign(sin(2*PI*(110*pow(1.05946,[0,0,12,0, 3,3,15,3, 5,5,17,5, 3,3,15,0][floor(beat*2)%16]))*t)) * exp(-6*((beat*2)%1)) * ([1,0.3,0.8,0.2, 1,0.2,0.6,0.3][floor(beat*2)%8]) * 0.12',
    bpm: 132,
  },
  {
    name: 'Cosmic Drift Pad',
    eq: '(sin(2*PI*110*t+0.15*sin(2*PI*0.3*t)) + sin(2*PI*110*pow(1.05946,7)*t+0.12*sin(2*PI*0.35*t)) + sin(2*PI*110*pow(1.05946,12)*t+0.1*sin(2*PI*0.25*t)) + sin(2*PI*110*pow(1.05946,16)*t+0.13*sin(2*PI*0.28*t))) * 0.06 * (0.5+0.5*sin(2*PI*beat/16))',
    bpm: 70,
  },
  {
    name: 'Crystal Sequence',
    eq: 'sin(2*PI*(880*pow(1.05946,[0,5,7,12, 0,3,7,10, -2,2,5,10, -2,3,7,14][floor(beat*4)%16]))*t + 4*exp(-10*((beat*4)%1))*sin(2*PI*(880*pow(1.05946,[0,5,7,12, 0,3,7,10, -2,2,5,10, -2,3,7,14][floor(beat*4)%16]))*3.5*t)) * exp(-8*((beat*4)%1)) * 0.25',
    bpm: 120,
  },
  {
    name: 'Reese Engine',
    eq: '(sin(2*PI*(55*pow(1.05946,[0,0,-5,-5, 3,3,-2,-2][floor(beat)%8]))*t) + sin(2*PI*(55*pow(1.05946,[0,0,-5,-5, 3,3,-2,-2][floor(beat)%8]))*t*1.012)) * exp(-1.5*((beat*2)%1)) * 0.3',
    bpm: 140,
  },
  {
    name: 'Glass Gamelan',
    eq: 'sin(2*PI*(440*pow(1.05946,[0,5,9,14, 2,7,11,16][floor(beat*2)%8]))*t + 5*exp(-8*((beat*2)%1))*sin(2*PI*(440*pow(1.05946,[0,5,9,14, 2,7,11,16][floor(beat*2)%8]))*4.17*t)) * exp(-4*((beat*2)%1)) * 0.25',
    bpm: 95,
  },
  {
    name: 'Tape Strings',
    eq: '(sin(2*PI*220*pow(1.05946,[0,5,3,-2][floor(beat/4)%4])*t+0.08*sin(2*PI*5.5*t)) + sin(2*PI*220*pow(1.05946,[7,12,10,5][floor(beat/4)%4])*t+0.08*sin(2*PI*5.2*t)) + sin(2*PI*220*pow(1.05946,[12,17,15,10][floor(beat/4)%4])*t+0.08*sin(2*PI*4.8*t))) * 0.07 * (0.4+0.6*min(1,(beat%4)/2))',
    bpm: 80,
  },
  {
    name: 'Analog Brass Stab',
    eq: '(sin(2*PI*(110*pow(1.05946,[0,0,5,5, 7,7,3,3][floor(beat*2)%8]))*t) + 0.5*sin(2*PI*(110*pow(1.05946,[0,0,5,5, 7,7,3,3][floor(beat*2)%8]))*2*t) + 0.25*sin(2*PI*(110*pow(1.05946,[0,0,5,5, 7,7,3,3][floor(beat*2)%8]))*3*t) + 0.12*sin(2*PI*(110*pow(1.05946,[0,0,5,5, 7,7,3,3][floor(beat*2)%8]))*4*t)) * exp(-3*((beat*2)%1)) * ([1,0,0.7,0, 1,0,0.5,0][floor(beat*2)%8]) * 0.15',
    bpm: 116,
  },
  {
    name: 'Midnight Organ',
    eq: '(sin(2*PI*(220*pow(1.05946,[0,4,7,12, 5,9,12,17, 3,7,10,15, 0,4,7,12][floor(beat)%16]))*t+0.06*sin(2*PI*6*t)) + 0.8*sin(2*PI*(220*pow(1.05946,[0,4,7,12, 5,9,12,17, 3,7,10,15, 0,4,7,12][floor(beat)%16]))*2*t) + 0.4*sin(2*PI*(220*pow(1.05946,[0,4,7,12, 5,9,12,17, 3,7,10,15, 0,4,7,12][floor(beat)%16]))*4*t)) * 0.08',
    bpm: 108,
  },
];

export const PROJECT_PRESETS: ProjectPreset[] = [
  {
    name: 'Rainy Day Tape (Lo-Fi)',
    bpm: 82,
    clips: [
      // Atmosphere - full song vinyl crackle
      { id: 'rd_vinyl', trackId: 0, startBeat: 0, lengthBeats: 64,
        equation: '(random()*2-1)*0.04 + (random()*2-1)*exp(-50*((beat*8+0.3)%1))*0.06',
        name: 'Vinyl Dust', color: '#64748b' },
      // Keys - intro solo then full song
      { id: 'rd_keys1', trackId: 1, startBeat: 0, lengthBeats: 16,
        equation: '(sin(2*PI*(220*pow(1.05946,[5,10,3,0][floor(beat/4)%4]))*t+(0.4+2.5*exp(-5*((beat*2)%1)))*sin(2*PI*(220*pow(1.05946,[5,10,3,0][floor(beat/4)%4]))*t)) + 0.5*sin(2*PI*(220*pow(1.05946,[8,14,7,3][floor(beat/4)%4]))*t)) * exp(-2*((beat*2)%1)) * ([1,0,0.5,0, 0.7,0,0.3,0][floor(beat*2)%8]) * 0.18',
        name: 'Dusty Rhodes', color: '#3b82f6' },
      { id: 'rd_keys2', trackId: 1, startBeat: 16, lengthBeats: 48,
        equation: '(sin(2*PI*(220*pow(1.05946,[5,10,3,0][floor(beat/4)%4]))*t+(0.4+2.5*exp(-5*((beat*2)%1)))*sin(2*PI*(220*pow(1.05946,[5,10,3,0][floor(beat/4)%4]))*t)) + 0.5*sin(2*PI*(220*pow(1.05946,[8,14,7,3][floor(beat/4)%4]))*t)) * exp(-2*((beat*2)%1)) * ([1,0,0.5,0, 0.7,0,0.3,0][floor(beat*2)%8]) * 0.18',
        name: 'Dusty Rhodes', color: '#3b82f6' },
      // Bass enters at verse
      { id: 'rd_bass', trackId: 2, startBeat: 16, lengthBeats: 32,
        equation: 'sin(2*PI*(27.5*pow(1.05946,[5,10,3,0][floor(beat/4)%4]))*t) * exp(-1.5*((beat*2)%1)) * ([1,0,0,0, 1,0.5,0,0][floor(beat*2)%8]) * 0.5',
        name: 'Warm Sub', color: '#8b5cf6' },
      // Kick enters at verse
      { id: 'rd_kick', trackId: 3, startBeat: 16, lengthBeats: 32,
        equation: 'sin(2*PI*(40*t - 3*exp(-20*(beat%1)))) * exp(-12*(beat%1)) * 0.75',
        name: 'Muffled Kick', color: '#ef4444' },
      // Rimshot on 2 and 4
      { id: 'rd_rim', trackId: 4, startBeat: 16, lengthBeats: 32,
        equation: '((random()*2-1)*0.3 + sin(2*PI*380*t)*0.5) * exp(-40*((beat+1)%2)) * 0.35',
        name: 'Rimshot', color: '#f97316' },
      // Hats - verse through outro
      { id: 'rd_hats', trackId: 5, startBeat: 16, lengthBeats: 48,
        equation: '(random()*2-1) * exp(-35*((beat*2)%1)) * ([0.12,0.05,0.15,0.04][floor(beat*4)%4]) * 0.2',
        name: 'Lazy Hats', color: '#10b981' },
      // Lead melody enters at chorus
      { id: 'rd_lead', trackId: 6, startBeat: 32, lengthBeats: 32,
        equation: 'sin(2*PI*(220*pow(1.05946,[5,9,7,5, 3,0,-1,3, 5,7,9,12, 10,7,5,3][floor(beat)%16]))*t + 0.12*sin(2*PI*5*t)) * exp(-3*(beat%1)) * 0.2',
        name: 'Mellow Flute', color: '#f59e0b' },
    ],
    tracks: [
      { id: 0, name: 'Atmosphere', muted: false, height: 80, volume: 1 },
      { id: 1, name: 'Rhodes Keys', muted: false, height: 80, volume: 1 },
      { id: 2, name: 'Sub Bass', muted: false, height: 80, volume: 1 },
      { id: 3, name: 'Kick', muted: false, height: 80, volume: 1 },
      { id: 4, name: 'Rimshot', muted: false, height: 80, volume: 1 },
      { id: 5, name: 'Hi-Hats', muted: false, height: 80, volume: 1 },
      { id: 6, name: 'Lead Melody', muted: false, height: 80, volume: 1 },
    ],
  },
  {
    name: 'Neon Expressway (Synthwave)',
    bpm: 118,
    clips: [
      // Arp - full song
      { id: 'ne_arp', trackId: 0, startBeat: 0, lengthBeats: 64,
        equation: 'sin(2*PI*(220*pow(1.05946,([0,-5,3,-2][floor(beat/8)%4])+([0,7,12,7,0,7,15,12][floor(beat*4)%8])))*t) * exp(-5*((beat*4)%1)) * 0.18',
        name: 'Neon Arp', color: '#8b5cf6' },
      // Pad - builds in
      { id: 'ne_pad', trackId: 1, startBeat: 16, lengthBeats: 48,
        equation: '(sin(2*PI*(110*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4]))*t) + sin(2*PI*(110*pow(1.05946,[7,2,10,5][floor(beat/8)%4]))*t) + sin(2*PI*(110*pow(1.05946,[12,7,15,10][floor(beat/8)%4]))*t)) * 0.06 * (0.4+0.6*min(1,(beat%8)/3))',
        name: 'Warm Pad', color: '#ec4899' },
      // Bass
      { id: 'ne_bass', trackId: 2, startBeat: 16, lengthBeats: 48,
        equation: 'sin(2*PI*(55*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4]))*t + 2.5*exp(-4*((beat*4)%1))*sin(2*PI*(55*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4]))*t)) * exp(-2*((beat*4)%1)) * 0.4',
        name: 'Synthwave Bass', color: '#f59e0b' },
      // Kick
      { id: 'ne_kick', trackId: 3, startBeat: 16, lengthBeats: 48,
        equation: 'sin(2*PI*(50*t - 4*exp(-25*(beat%1)))) * exp(-10*(beat%1)) * 0.85',
        name: 'Retro Kick', color: '#ef4444' },
      // Snare
      { id: 'ne_snare', trackId: 4, startBeat: 16, lengthBeats: 48,
        equation: '((random()*2-1)*0.6 + sin(2*PI*200*t)*0.3) * exp(-25*((beat+1)%2)) * 0.45',
        name: 'Gated Snare', color: '#f97316' },
      // Hats
      { id: 'ne_hats', trackId: 5, startBeat: 16, lengthBeats: 48,
        equation: '(random()*2-1) * exp(-40*((beat*4)%1)) * ([0.3,0.08,0.4,0.08, 0.3,0.08,0.5,0.12][floor(beat*4)%8]) * 0.18',
        name: '16th Hats', color: '#10b981' },
      // Lead melody - chorus only
      { id: 'ne_lead', trackId: 6, startBeat: 32, lengthBeats: 32,
        equation: '(sin(2*PI*(440*pow(1.05946,[12,12,10,12, 15,15,14,10, 12,15,19,17, 15,12,10,7][floor(beat*2)%16]))*t) + 0.3*sin(2*PI*(440*pow(1.05946,[12,12,10,12, 15,15,14,10, 12,15,19,17, 15,12,10,7][floor(beat*2)%16]))*t*1.005)) * exp(-2*((beat*2)%1)) * 0.22',
        name: 'Hero Lead', color: '#06b6d4' },
      // Clap layers
      { id: 'ne_clap', trackId: 7, startBeat: 32, lengthBeats: 32,
        equation: '(random()*2-1) * exp(-35*((beat+1)%2)) * 0.3',
        name: 'Layered Clap', color: '#a855f7' },
    ],
    tracks: [
      { id: 0, name: 'Arpeggiator', muted: false, height: 80, volume: 1 },
      { id: 1, name: 'Synth Pad', muted: false, height: 80, volume: 1 },
      { id: 2, name: 'Bass', muted: false, height: 80, volume: 1 },
      { id: 3, name: 'Kick', muted: false, height: 80, volume: 1 },
      { id: 4, name: 'Snare', muted: false, height: 80, volume: 1 },
      { id: 5, name: 'Hi-Hats', muted: false, height: 80, volume: 1 },
      { id: 6, name: 'Lead Synth', muted: false, height: 80, volume: 1 },
      { id: 7, name: 'Clap', muted: false, height: 80, volume: 1 },
    ],
  },
  {
    name: 'Deep Current (House)',
    bpm: 122,
    clips: [
      // Four-on-floor kick - full song
      { id: 'dc_kick', trackId: 0, startBeat: 0, lengthBeats: 64,
        equation: 'sin(2*PI*(50*t - 4*exp(-25*(beat%1)))) * exp(-8*(beat%1)) * 0.85',
        name: 'Deep Kick', color: '#ef4444' },
      // Offbeat bass
      { id: 'dc_bass', trackId: 1, startBeat: 0, lengthBeats: 64,
        equation: 'sin(2*PI*(55*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4]))*t + 1.5*exp(-8*((beat*2)%1))*sin(2*PI*(55*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4]))*t)) * exp(-3*((beat*2)%1)) * ([0,1][floor(beat*2)%2]) * 0.45',
        name: 'Offbeat Donk', color: '#f59e0b' },
      // Clap on 2 and 4
      { id: 'dc_clap', trackId: 2, startBeat: 0, lengthBeats: 64,
        equation: '(random()*2-1) * exp(-35*((beat+1)%2)) * 0.4',
        name: 'House Clap', color: '#f97316' },
      // Shaker
      { id: 'dc_shaker', trackId: 3, startBeat: 16, lengthBeats: 48,
        equation: '(random()*2-1) * exp(-30*((beat*4)%1)) * ([0.08,0.04,0.12,0.04][floor(beat*4)%4]) * 0.2',
        name: 'Shaker', color: '#10b981' },
      // Chord stab
      { id: 'dc_chord', trackId: 4, startBeat: 16, lengthBeats: 48,
        equation: '(sin(2*PI*220*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4])*t) + sin(2*PI*220*pow(1.05946,[3,0,7,2][floor(beat/8)%4])*t) + sin(2*PI*220*pow(1.05946,[7,3,10,5][floor(beat/8)%4])*t) + sin(2*PI*220*pow(1.05946,[10,7,14,9][floor(beat/8)%4])*t)) * exp(-3*((beat*4)%1)) * ([1,0,0,1, 0,1,0,0][floor(beat*4)%8]) * 0.1',
        name: 'House Chords', color: '#3b82f6' },
      // Pad swell
      { id: 'dc_pad', trackId: 5, startBeat: 32, lengthBeats: 32,
        equation: '(sin(2*PI*110*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4])*t) + sin(2*PI*110*pow(1.05946,[7,2,10,5][floor(beat/8)%4])*t)) * 0.08 * (0.4+0.6*min(1,(beat%8)/4))',
        name: 'Warm Swell', color: '#ec4899' },
      // Perc loop
      { id: 'dc_perc', trackId: 6, startBeat: 32, lengthBeats: 32,
        equation: 'sin(2*PI*800*t) * exp(-50*((beat*4+0.5)%1)) * ([0,0.3,0,0.15, 0.3,0,0.2,0][floor(beat*4)%8]) * 0.2',
        name: 'Bongo Hit', color: '#a855f7' },
    ],
    tracks: [
      { id: 0, name: 'Kick', muted: false, height: 80, volume: 1 },
      { id: 1, name: 'Bass', muted: false, height: 80, volume: 1 },
      { id: 2, name: 'Clap', muted: false, height: 80, volume: 1 },
      { id: 3, name: 'Shaker', muted: false, height: 80, volume: 1 },
      { id: 4, name: 'Chord Stab', muted: false, height: 80, volume: 1 },
      { id: 5, name: 'Pad', muted: false, height: 80, volume: 1 },
      { id: 6, name: 'Percussion', muted: false, height: 80, volume: 1 },
    ],
  },
  {
    name: 'Solaris (Ambient)',
    bpm: 68,
    clips: [
      // Drone foundation
      { id: 'so_drone', trackId: 0, startBeat: 0, lengthBeats: 64,
        equation: '(sin(2*PI*55*t+0.2*sin(2*PI*0.1*t)) + 0.5*sin(2*PI*55*pow(1.05946,7)*t+0.15*sin(2*PI*0.13*t)) + 0.3*sin(2*PI*55*pow(1.05946,12)*t+0.1*sin(2*PI*0.17*t))) * 0.08',
        name: 'Deep Drone', color: '#1e40af' },
      // Evolving pad
      { id: 'so_pad', trackId: 1, startBeat: 8, lengthBeats: 56,
        equation: '(sin(2*PI*220*t+0.1*sin(2*PI*0.2*t)) + sin(2*PI*220*pow(1.05946,7)*t+0.1*sin(2*PI*0.25*t)) + sin(2*PI*220*pow(1.05946,16)*t+0.08*sin(2*PI*0.18*t))) * 0.05 * (0.3+0.7*sin(2*PI*beat/32)*sin(2*PI*beat/32))',
        name: 'Celestial Pad', color: '#7c3aed' },
      // Crystal bells
      { id: 'so_bells', trackId: 2, startBeat: 16, lengthBeats: 48,
        equation: 'sin(2*PI*(880*pow(1.05946,[0,7,12,0, 5,12,17,5, 7,14,19,7, 12,19,24,12][floor(beat)%16]))*t + 4*exp(-8*(beat%1))*sin(2*PI*(880*pow(1.05946,[0,7,12,0, 5,12,17,5, 7,14,19,7, 12,19,24,12][floor(beat)%16]))*3.5*t)) * exp(-5*(beat%1)) * 0.15',
        name: 'Glass Bells', color: '#06b6d4' },
      // Sub pulse
      { id: 'so_sub', trackId: 3, startBeat: 16, lengthBeats: 32,
        equation: 'sin(2*PI*27.5*t) * (0.3+0.7*exp(-3*(beat%2))) * 0.35',
        name: 'Sub Pulse', color: '#059669' },
      // Texture
      { id: 'so_tex', trackId: 4, startBeat: 0, lengthBeats: 64,
        equation: '(random()*2-1) * 0.02 * (0.3+0.7*abs(sin(2*PI*beat/16)))',
        name: 'Wind Texture', color: '#64748b' },
      // High shimmer
      { id: 'so_shim', trackId: 5, startBeat: 32, lengthBeats: 32,
        equation: '(sin(2*PI*1760*t+0.5*sin(2*PI*1760*1.5*t)*exp(-3*(beat%1))) + sin(2*PI*1760*pow(1.05946,7)*t+0.4*sin(2*PI*1760*pow(1.05946,7)*1.5*t)*exp(-3*(beat%1)))) * exp(-4*(beat%1)) * ([0.15,0,0,0.1, 0,0.12,0,0][floor(beat)%8]) * 0.15',
        name: 'Star Dust', color: '#fbbf24' },
    ],
    tracks: [
      { id: 0, name: 'Drone', muted: false, height: 80, volume: 1 },
      { id: 1, name: 'Evolving Pad', muted: false, height: 80, volume: 1 },
      { id: 2, name: 'Crystal Bells', muted: false, height: 80, volume: 1 },
      { id: 3, name: 'Sub Pulse', muted: false, height: 80, volume: 1 },
      { id: 4, name: 'Wind', muted: false, height: 80, volume: 1 },
      { id: 5, name: 'Shimmer', muted: false, height: 80, volume: 1 },
    ],
  },
];
