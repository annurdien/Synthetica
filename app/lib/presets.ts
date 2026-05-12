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
    bpm: 63,
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
      {
        id: 'rd_vinyl', trackId: 0, startBeat: 0, lengthBeats: 64,
        equation: '(random()*2-1)*0.04 + (random()*2-1)*exp(-50*((beat*8+0.3)%1))*0.06',
        name: 'Vinyl Dust', color: '#64748b'
      },
      // Keys - intro solo then full song
      {
        id: 'rd_keys1', trackId: 1, startBeat: 0, lengthBeats: 16,
        equation: '(sin(2*PI*(220*pow(1.05946,[5,10,3,0][floor(beat/4)%4]))*t+(0.4+2.5*exp(-5*((beat*2)%1)))*sin(2*PI*(220*pow(1.05946,[5,10,3,0][floor(beat/4)%4]))*t)) + 0.5*sin(2*PI*(220*pow(1.05946,[8,14,7,3][floor(beat/4)%4]))*t)) * exp(-2*((beat*2)%1)) * ([1,0,0.5,0, 0.7,0,0.3,0][floor(beat*2)%8]) * 0.18',
        name: 'Dusty Rhodes', color: '#3b82f6'
      },
      {
        id: 'rd_keys2', trackId: 1, startBeat: 16, lengthBeats: 48,
        equation: '(sin(2*PI*(220*pow(1.05946,[5,10,3,0][floor(beat/4)%4]))*t+(0.4+2.5*exp(-5*((beat*2)%1)))*sin(2*PI*(220*pow(1.05946,[5,10,3,0][floor(beat/4)%4]))*t)) + 0.5*sin(2*PI*(220*pow(1.05946,[8,14,7,3][floor(beat/4)%4]))*t)) * exp(-2*((beat*2)%1)) * ([1,0,0.5,0, 0.7,0,0.3,0][floor(beat*2)%8]) * 0.18',
        name: 'Dusty Rhodes', color: '#3b82f6'
      },
      // Bass enters at verse
      {
        id: 'rd_bass', trackId: 2, startBeat: 16, lengthBeats: 32,
        equation: 'sin(2*PI*(27.5*pow(1.05946,[5,10,3,0][floor(beat/4)%4]))*t) * exp(-1.5*((beat*2)%1)) * ([1,0,0,0, 1,0.5,0,0][floor(beat*2)%8]) * 0.5',
        name: 'Warm Sub', color: '#8b5cf6'
      },
      // Kick enters at verse
      {
        id: 'rd_kick', trackId: 3, startBeat: 16, lengthBeats: 32,
        equation: 'sin(2*PI*(40*t - 3*exp(-20*(beat%1)))) * exp(-12*(beat%1)) * 0.75',
        name: 'Muffled Kick', color: '#ef4444'
      },
      // Rimshot on 2 and 4
      {
        id: 'rd_rim', trackId: 4, startBeat: 16, lengthBeats: 32,
        equation: '((random()*2-1)*0.3 + sin(2*PI*380*t)*0.5) * exp(-40*((beat+1)%2)) * 0.35',
        name: 'Rimshot', color: '#f97316'
      },
      // Hats - verse through outro
      {
        id: 'rd_hats', trackId: 5, startBeat: 16, lengthBeats: 48,
        equation: '(random()*2-1) * exp(-35*((beat*2)%1)) * ([0.12,0.05,0.15,0.04][floor(beat*4)%4]) * 0.2',
        name: 'Lazy Hats', color: '#10b981'
      },
      // Lead melody enters at chorus
      {
        id: 'rd_lead', trackId: 6, startBeat: 32, lengthBeats: 32,
        equation: 'sin(2*PI*(220*pow(1.05946,[5,9,7,5, 3,0,-1,3, 5,7,9,12, 10,7,5,3][floor(beat)%16]))*t + 0.12*sin(2*PI*5*t)) * exp(-3*(beat%1)) * 0.2',
        name: 'Mellow Flute', color: '#f59e0b'
      },
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
      {
        id: 'ne_arp', trackId: 0, startBeat: 0, lengthBeats: 64,
        equation: 'sin(2*PI*(220*pow(1.05946,([0,-5,3,-2][floor(beat/8)%4])+([0,7,12,7,0,7,15,12][floor(beat*4)%8])))*t) * exp(-5*((beat*4)%1)) * 0.18',
        name: 'Neon Arp', color: '#8b5cf6'
      },
      // Pad - builds in
      {
        id: 'ne_pad', trackId: 1, startBeat: 16, lengthBeats: 48,
        equation: '(sin(2*PI*(110*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4]))*t) + sin(2*PI*(110*pow(1.05946,[7,2,10,5][floor(beat/8)%4]))*t) + sin(2*PI*(110*pow(1.05946,[12,7,15,10][floor(beat/8)%4]))*t)) * 0.06 * (0.4+0.6*min(1,(beat%8)/3))',
        name: 'Warm Pad', color: '#ec4899'
      },
      // Bass
      {
        id: 'ne_bass', trackId: 2, startBeat: 16, lengthBeats: 48,
        equation: 'sin(2*PI*(55*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4]))*t + 2.5*exp(-4*((beat*4)%1))*sin(2*PI*(55*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4]))*t)) * exp(-2*((beat*4)%1)) * 0.4',
        name: 'Synthwave Bass', color: '#f59e0b'
      },
      // Kick
      {
        id: 'ne_kick', trackId: 3, startBeat: 16, lengthBeats: 48,
        equation: 'sin(2*PI*(50*t - 4*exp(-25*(beat%1)))) * exp(-10*(beat%1)) * 0.85',
        name: 'Retro Kick', color: '#ef4444'
      },
      // Snare
      {
        id: 'ne_snare', trackId: 4, startBeat: 16, lengthBeats: 48,
        equation: '((random()*2-1)*0.6 + sin(2*PI*200*t)*0.3) * exp(-25*((beat+1)%2)) * 0.45',
        name: 'Gated Snare', color: '#f97316'
      },
      // Hats
      {
        id: 'ne_hats', trackId: 5, startBeat: 16, lengthBeats: 48,
        equation: '(random()*2-1) * exp(-40*((beat*4)%1)) * ([0.3,0.08,0.4,0.08, 0.3,0.08,0.5,0.12][floor(beat*4)%8]) * 0.18',
        name: '16th Hats', color: '#10b981'
      },
      // Lead melody - chorus only
      {
        id: 'ne_lead', trackId: 6, startBeat: 32, lengthBeats: 32,
        equation: '(sin(2*PI*(440*pow(1.05946,[12,12,10,12, 15,15,14,10, 12,15,19,17, 15,12,10,7][floor(beat*2)%16]))*t) + 0.3*sin(2*PI*(440*pow(1.05946,[12,12,10,12, 15,15,14,10, 12,15,19,17, 15,12,10,7][floor(beat*2)%16]))*t*1.005)) * exp(-2*((beat*2)%1)) * 0.22',
        name: 'Hero Lead', color: '#06b6d4'
      },
      // Clap layers
      {
        id: 'ne_clap', trackId: 7, startBeat: 32, lengthBeats: 32,
        equation: '(random()*2-1) * exp(-35*((beat+1)%2)) * 0.3',
        name: 'Layered Clap', color: '#a855f7'
      },
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
      {
        id: 'dc_kick', trackId: 0, startBeat: 0, lengthBeats: 64,
        equation: 'sin(2*PI*(50*t - 4*exp(-25*(beat%1)))) * exp(-8*(beat%1)) * 0.85',
        name: 'Deep Kick', color: '#ef4444'
      },
      // Offbeat bass
      {
        id: 'dc_bass', trackId: 1, startBeat: 0, lengthBeats: 64,
        equation: 'sin(2*PI*(55*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4]))*t + 1.5*exp(-8*((beat*2)%1))*sin(2*PI*(55*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4]))*t)) * exp(-3*((beat*2)%1)) * ([0,1][floor(beat*2)%2]) * 0.45',
        name: 'Offbeat Donk', color: '#f59e0b'
      },
      // Clap on 2 and 4
      {
        id: 'dc_clap', trackId: 2, startBeat: 0, lengthBeats: 64,
        equation: '(random()*2-1) * exp(-35*((beat+1)%2)) * 0.4',
        name: 'House Clap', color: '#f97316'
      },
      // Shaker
      {
        id: 'dc_shaker', trackId: 3, startBeat: 16, lengthBeats: 48,
        equation: '(random()*2-1) * exp(-30*((beat*4)%1)) * ([0.08,0.04,0.12,0.04][floor(beat*4)%4]) * 0.2',
        name: 'Shaker', color: '#10b981'
      },
      // Chord stab
      {
        id: 'dc_chord', trackId: 4, startBeat: 16, lengthBeats: 48,
        equation: '(sin(2*PI*220*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4])*t) + sin(2*PI*220*pow(1.05946,[3,0,7,2][floor(beat/8)%4])*t) + sin(2*PI*220*pow(1.05946,[7,3,10,5][floor(beat/8)%4])*t) + sin(2*PI*220*pow(1.05946,[10,7,14,9][floor(beat/8)%4])*t)) * exp(-3*((beat*4)%1)) * ([1,0,0,1, 0,1,0,0][floor(beat*4)%8]) * 0.1',
        name: 'House Chords', color: '#3b82f6'
      },
      // Pad swell
      {
        id: 'dc_pad', trackId: 5, startBeat: 32, lengthBeats: 32,
        equation: '(sin(2*PI*110*pow(1.05946,[0,-5,3,-2][floor(beat/8)%4])*t) + sin(2*PI*110*pow(1.05946,[7,2,10,5][floor(beat/8)%4])*t)) * 0.08 * (0.4+0.6*min(1,(beat%8)/4))',
        name: 'Warm Swell', color: '#ec4899'
      },
      // Perc loop
      {
        id: 'dc_perc', trackId: 6, startBeat: 32, lengthBeats: 32,
        equation: 'sin(2*PI*800*t) * exp(-50*((beat*4+0.5)%1)) * ([0,0.3,0,0.15, 0.3,0,0.2,0][floor(beat*4)%8]) * 0.2',
        name: 'Bongo Hit', color: '#a855f7'
      },
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
      {
        id: 'so_drone', trackId: 0, startBeat: 0, lengthBeats: 64,
        equation: '(sin(2*PI*55*t+0.2*sin(2*PI*0.1*t)) + 0.5*sin(2*PI*55*pow(1.05946,7)*t+0.15*sin(2*PI*0.13*t)) + 0.3*sin(2*PI*55*pow(1.05946,12)*t+0.1*sin(2*PI*0.17*t))) * 0.08',
        name: 'Deep Drone', color: '#1e40af'
      },
      // Evolving pad
      {
        id: 'so_pad', trackId: 1, startBeat: 8, lengthBeats: 56,
        equation: '(sin(2*PI*220*t+0.1*sin(2*PI*0.2*t)) + sin(2*PI*220*pow(1.05946,7)*t+0.1*sin(2*PI*0.25*t)) + sin(2*PI*220*pow(1.05946,16)*t+0.08*sin(2*PI*0.18*t))) * 0.05 * (0.3+0.7*sin(2*PI*beat/32)*sin(2*PI*beat/32))',
        name: 'Celestial Pad', color: '#7c3aed'
      },
      // Crystal bells
      {
        id: 'so_bells', trackId: 2, startBeat: 16, lengthBeats: 48,
        equation: 'sin(2*PI*(880*pow(1.05946,[0,7,12,0, 5,12,17,5, 7,14,19,7, 12,19,24,12][floor(beat)%16]))*t + 4*exp(-8*(beat%1))*sin(2*PI*(880*pow(1.05946,[0,7,12,0, 5,12,17,5, 7,14,19,7, 12,19,24,12][floor(beat)%16]))*3.5*t)) * exp(-5*(beat%1)) * 0.15',
        name: 'Glass Bells', color: '#06b6d4'
      },
      // Sub pulse
      {
        id: 'so_sub', trackId: 3, startBeat: 16, lengthBeats: 32,
        equation: 'sin(2*PI*27.5*t) * (0.3+0.7*exp(-3*(beat%2))) * 0.35',
        name: 'Sub Pulse', color: '#059669'
      },
      // Texture
      {
        id: 'so_tex', trackId: 4, startBeat: 0, lengthBeats: 64,
        equation: '(random()*2-1) * 0.02 * (0.3+0.7*abs(sin(2*PI*beat/16)))',
        name: 'Wind Texture', color: '#64748b'
      },
      // High shimmer
      {
        id: 'so_shim', trackId: 5, startBeat: 32, lengthBeats: 32,
        equation: '(sin(2*PI*1760*t+0.5*sin(2*PI*1760*1.5*t)*exp(-3*(beat%1))) + sin(2*PI*1760*pow(1.05946,7)*t+0.4*sin(2*PI*1760*pow(1.05946,7)*1.5*t)*exp(-3*(beat%1)))) * exp(-4*(beat%1)) * ([0.15,0,0,0.1, 0,0.12,0,0][floor(beat)%8]) * 0.15',
        name: 'Star Dust', color: '#fbbf24'
      },
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
  {
    name: 'Day One Interstellar Main Theme',
    bpm: 63,
    clips: [
      {
        id: 'do_note_0',
        trackId: 0,
        startBeat: 0,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-0))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_1',
        trackId: 0,
        startBeat: 0.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-0.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_2',
        trackId: 0,
        startBeat: 1,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-1))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_3',
        trackId: 0,
        startBeat: 1.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-1.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_4',
        trackId: 0,
        startBeat: 2,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-2))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_5',
        trackId: 0,
        startBeat: 2.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-2.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_6',
        trackId: 0,
        startBeat: 3,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-3))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_7',
        trackId: 0,
        startBeat: 3.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-3.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_8',
        trackId: 0,
        startBeat: 4,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-4))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_9',
        trackId: 1,
        startBeat: 4,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-4))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_10',
        trackId: 2,
        startBeat: 4,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-4))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_11',
        trackId: 0,
        startBeat: 4.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-4.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_12',
        trackId: 0,
        startBeat: 5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_13',
        trackId: 0,
        startBeat: 5.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-5.5))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_14',
        trackId: 1,
        startBeat: 5.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-5.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_15',
        trackId: 2,
        startBeat: 5.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-5.5))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_16',
        trackId: 0,
        startBeat: 6,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-6))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_17',
        trackId: 0,
        startBeat: 6.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-6.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_18',
        trackId: 0,
        startBeat: 7,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-7))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_19',
        trackId: 0,
        startBeat: 7.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-7.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_20',
        trackId: 0,
        startBeat: 8,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-8))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_21',
        trackId: 0,
        startBeat: 8.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-8.5))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_22',
        trackId: 1,
        startBeat: 8.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-8.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_23',
        trackId: 2,
        startBeat: 8.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-8.5))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_24',
        trackId: 0,
        startBeat: 9,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-9))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_25',
        trackId: 1,
        startBeat: 9,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-9))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_26',
        trackId: 2,
        startBeat: 9,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-9))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_27',
        trackId: 0,
        startBeat: 9.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-9.5))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_28',
        trackId: 1,
        startBeat: 9.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-9.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_29',
        trackId: 2,
        startBeat: 9.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-9.5))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_30',
        trackId: 0,
        startBeat: 10,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-10))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_31',
        trackId: 1,
        startBeat: 10,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-10))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_32',
        trackId: 2,
        startBeat: 10,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-10))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_33',
        trackId: 0,
        startBeat: 10.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-10.5))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_34',
        trackId: 1,
        startBeat: 10.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-10.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_35',
        trackId: 2,
        startBeat: 10.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-10.5))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_36',
        trackId: 0,
        startBeat: 11,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-11))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_37',
        trackId: 1,
        startBeat: 11,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-11))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_38',
        trackId: 2,
        startBeat: 11,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-11))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_39',
        trackId: 0,
        startBeat: 11.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-11.5))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_40',
        trackId: 1,
        startBeat: 11.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-11.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_41',
        trackId: 2,
        startBeat: 11.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-11.5))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_42',
        trackId: 0,
        startBeat: 12,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-12))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_43',
        trackId: 0,
        startBeat: 12.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-12.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_44',
        trackId: 0,
        startBeat: 13,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-13))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_45',
        trackId: 1,
        startBeat: 13,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-13))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_46',
        trackId: 2,
        startBeat: 13,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-13))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_47',
        trackId: 0,
        startBeat: 13.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-13.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_48',
        trackId: 0,
        startBeat: 14,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-14))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_49',
        trackId: 0,
        startBeat: 14.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-14.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_50',
        trackId: 0,
        startBeat: 15,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-15))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_51',
        trackId: 0,
        startBeat: 15.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-15.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_52',
        trackId: 0,
        startBeat: 16,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-16))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_53',
        trackId: 1,
        startBeat: 16,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-16))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_54',
        trackId: 2,
        startBeat: 16,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-16))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_55',
        trackId: 0,
        startBeat: 16.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-16.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_56',
        trackId: 0,
        startBeat: 17,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-17))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_57',
        trackId: 1,
        startBeat: 17,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-17))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_58',
        trackId: 0,
        startBeat: 17.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-17.5))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_59',
        trackId: 1,
        startBeat: 17.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-17.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_60',
        trackId: 2,
        startBeat: 17.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-17.5))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_61',
        trackId: 0,
        startBeat: 18,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-18))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_62',
        trackId: 0,
        startBeat: 18.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-18.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_63',
        trackId: 0,
        startBeat: 19,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-19))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_64',
        trackId: 1,
        startBeat: 19,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-19))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_65',
        trackId: 2,
        startBeat: 19,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-19))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_66',
        trackId: 0,
        startBeat: 19.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-19.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_67',
        trackId: 0,
        startBeat: 20,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-20))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_68',
        trackId: 0,
        startBeat: 20.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-20.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_69',
        trackId: 0,
        startBeat: 21,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-21))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_70',
        trackId: 0,
        startBeat: 21.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-21.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_71',
        trackId: 0,
        startBeat: 22,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-22))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_72',
        trackId: 1,
        startBeat: 22,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-22))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_73',
        trackId: 2,
        startBeat: 22,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-22))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_74',
        trackId: 0,
        startBeat: 22.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-22.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_75',
        trackId: 1,
        startBeat: 22.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-22.5))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_76',
        trackId: 0,
        startBeat: 23,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-23))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_77',
        trackId: 1,
        startBeat: 23,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-23))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_78',
        trackId: 2,
        startBeat: 23,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-23))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_79',
        trackId: 0,
        startBeat: 23.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-23.5))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_80',
        trackId: 1,
        startBeat: 23.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-23.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_81',
        trackId: 2,
        startBeat: 23.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-23.5))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_82',
        trackId: 0,
        startBeat: 24,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-24))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_83',
        trackId: 1,
        startBeat: 24,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-24))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_84',
        trackId: 2,
        startBeat: 24,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-24))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_85',
        trackId: 0,
        startBeat: 24.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-24.5))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_86',
        trackId: 1,
        startBeat: 24.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-24.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_87',
        trackId: 2,
        startBeat: 24.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-24.5))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_88',
        trackId: 0,
        startBeat: 25,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-25))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_89',
        trackId: 1,
        startBeat: 25,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-25))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_90',
        trackId: 2,
        startBeat: 25,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-25))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_91',
        trackId: 0,
        startBeat: 25.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-25.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_92',
        trackId: 0,
        startBeat: 26,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-26))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_93',
        trackId: 0,
        startBeat: 26.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-26.5))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_94',
        trackId: 1,
        startBeat: 26.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-26.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_95',
        trackId: 2,
        startBeat: 26.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-26.5))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_96',
        trackId: 0,
        startBeat: 27,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-27))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_97',
        trackId: 0,
        startBeat: 27.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-27.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_98',
        trackId: 0,
        startBeat: 28,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-28))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_99',
        trackId: 0,
        startBeat: 28.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-28.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_100',
        trackId: 0,
        startBeat: 29,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-29))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_101',
        trackId: 0,
        startBeat: 29.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-29.5))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_102',
        trackId: 1,
        startBeat: 29.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-29.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_103',
        trackId: 2,
        startBeat: 29.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-29.5))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_104',
        trackId: 0,
        startBeat: 30,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-30))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_105',
        trackId: 1,
        startBeat: 30,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-30))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_106',
        trackId: 0,
        startBeat: 30.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-30.5))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_107',
        trackId: 1,
        startBeat: 30.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-30.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_108',
        trackId: 2,
        startBeat: 30.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-30.5))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_109',
        trackId: 0,
        startBeat: 31,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-31))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_110',
        trackId: 1,
        startBeat: 31,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-31))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_111',
        trackId: 2,
        startBeat: 31,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-31))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_112',
        trackId: 0,
        startBeat: 31.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-31.5))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_113',
        trackId: 1,
        startBeat: 31.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-31.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_114',
        trackId: 2,
        startBeat: 31.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-31.5))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_115',
        trackId: 0,
        startBeat: 32,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-32))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_116',
        trackId: 1,
        startBeat: 32,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-32))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_117',
        trackId: 2,
        startBeat: 32,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-32))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_118',
        trackId: 0,
        startBeat: 32.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-32.5))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_119',
        trackId: 1,
        startBeat: 32.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-32.5))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_120',
        trackId: 2,
        startBeat: 32.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-32.5))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_121',
        trackId: 0,
        startBeat: 33,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-33))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_122',
        trackId: 0,
        startBeat: 33.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-33.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_123',
        trackId: 0,
        startBeat: 34,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*293.67*t) + 0.5*sin(2*PI*293.67*2*t) + 0.2*sin(2*PI*293.67*3*t) + 0.1*sin(2*PI*293.67*4.01*t)) * 0.1 * exp(-4*(beat-34))',
        name: 'D4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_124',
        trackId: 1,
        startBeat: 34,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-34))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_125',
        trackId: 2,
        startBeat: 34,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-34))',
        name: 'D5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_126',
        trackId: 0,
        startBeat: 34.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-34.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_127',
        trackId: 0,
        startBeat: 35,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-35))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_128',
        trackId: 0,
        startBeat: 35.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-35.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_129',
        trackId: 1,
        startBeat: 35.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-35.5))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_130',
        trackId: 0,
        startBeat: 36,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-36))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_131',
        trackId: 0,
        startBeat: 36.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-36.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_132',
        trackId: 0,
        startBeat: 37,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-37))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_133',
        trackId: 1,
        startBeat: 37,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-37))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_134',
        trackId: 2,
        startBeat: 37,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-37))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_135',
        trackId: 0,
        startBeat: 37.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-37.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_136',
        trackId: 0,
        startBeat: 38,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-38))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_137',
        trackId: 1,
        startBeat: 38,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-38))',
        name: 'C5',
        color: '#10b981'
      },
      {
        id: 'do_note_138',
        trackId: 0,
        startBeat: 38.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-38.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_139',
        trackId: 0,
        startBeat: 39,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-39))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_140',
        trackId: 1,
        startBeat: 39,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-39))',
        name: 'A4',
        color: '#10b981'
      },
      {
        id: 'do_note_141',
        trackId: 0,
        startBeat: 39.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-39.5))',
        name: 'C5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_142',
        trackId: 0,
        startBeat: 40,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-40))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_143',
        trackId: 1,
        startBeat: 40,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-40))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_144',
        trackId: 2,
        startBeat: 40,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-40))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_145',
        trackId: 0,
        startBeat: 40.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-40.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_146',
        trackId: 0,
        startBeat: 41,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-41))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_147',
        trackId: 1,
        startBeat: 41,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-41))',
        name: 'G4',
        color: '#10b981'
      },
      {
        id: 'do_note_148',
        trackId: 0,
        startBeat: 41.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-41.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_149',
        trackId: 0,
        startBeat: 42,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-42))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_150',
        trackId: 1,
        startBeat: 42,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-42))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_151',
        trackId: 0,
        startBeat: 42.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-42.5))',
        name: 'G4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_152',
        trackId: 0,
        startBeat: 43,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-43))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_153',
        trackId: 1,
        startBeat: 43,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-43))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_154',
        trackId: 0,
        startBeat: 43.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-43.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_155',
        trackId: 0,
        startBeat: 44,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-44))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_156',
        trackId: 1,
        startBeat: 44,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-44))',
        name: 'G4',
        color: '#10b981'
      },
      {
        id: 'do_note_157',
        trackId: 0,
        startBeat: 44.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-44.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_158',
        trackId: 0,
        startBeat: 45,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-45))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_159',
        trackId: 1,
        startBeat: 45,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-45))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_160',
        trackId: 0,
        startBeat: 45.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-45.5))',
        name: 'G4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_161',
        trackId: 0,
        startBeat: 46,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-46))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_162',
        trackId: 1,
        startBeat: 46,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-46))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_163',
        trackId: 2,
        startBeat: 46,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-46))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_164',
        trackId: 0,
        startBeat: 46.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-46.5))',
        name: 'C5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_165',
        trackId: 0,
        startBeat: 47,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-47))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_166',
        trackId: 1,
        startBeat: 47,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-47))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_167',
        trackId: 2,
        startBeat: 47,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-47))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_168',
        trackId: 0,
        startBeat: 47.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-47.5))',
        name: 'D5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_169',
        trackId: 0,
        startBeat: 48,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-48))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_170',
        trackId: 1,
        startBeat: 48,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-48))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_171',
        trackId: 2,
        startBeat: 48,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-48))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_172',
        trackId: 0,
        startBeat: 48.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-48.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_173',
        trackId: 0,
        startBeat: 49,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-49))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_174',
        trackId: 1,
        startBeat: 49,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-49))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_175',
        trackId: 2,
        startBeat: 49,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-49))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_176',
        trackId: 0,
        startBeat: 49.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-49.5))',
        name: 'G4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_177',
        trackId: 0,
        startBeat: 50,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-50))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_178',
        trackId: 1,
        startBeat: 50,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-50))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_179',
        trackId: 2,
        startBeat: 50,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-50))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_180',
        trackId: 0,
        startBeat: 50.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-50.5))',
        name: 'C5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_181',
        trackId: 0,
        startBeat: 51,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-51))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_182',
        trackId: 1,
        startBeat: 51,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-51))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_183',
        trackId: 2,
        startBeat: 51,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-51))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_184',
        trackId: 0,
        startBeat: 51.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-51.5))',
        name: 'D5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_185',
        trackId: 0,
        startBeat: 52,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-52))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_186',
        trackId: 1,
        startBeat: 52,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-52))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_187',
        trackId: 2,
        startBeat: 52,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-52))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_188',
        trackId: 0,
        startBeat: 52.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-52.5))',
        name: 'D5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_189',
        trackId: 0,
        startBeat: 53,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-53))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_190',
        trackId: 1,
        startBeat: 53,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-53))',
        name: 'C5',
        color: '#10b981'
      },
      {
        id: 'do_note_191',
        trackId: 0,
        startBeat: 53.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-53.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_192',
        trackId: 0,
        startBeat: 54,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-54))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_193',
        trackId: 1,
        startBeat: 54,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-54))',
        name: 'A4',
        color: '#10b981'
      },
      {
        id: 'do_note_194',
        trackId: 0,
        startBeat: 54.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-54.5))',
        name: 'C5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_195',
        trackId: 0,
        startBeat: 55,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-55))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_196',
        trackId: 1,
        startBeat: 55,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-55))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_197',
        trackId: 2,
        startBeat: 55,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-55))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_198',
        trackId: 0,
        startBeat: 55.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-55.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_199',
        trackId: 0,
        startBeat: 56,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-56))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_200',
        trackId: 1,
        startBeat: 56,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-56))',
        name: 'G4',
        color: '#10b981'
      },
      {
        id: 'do_note_201',
        trackId: 0,
        startBeat: 56.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-56.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_202',
        trackId: 0,
        startBeat: 57,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-57))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_203',
        trackId: 1,
        startBeat: 57,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-57))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_204',
        trackId: 0,
        startBeat: 57.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-57.5))',
        name: 'G4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_205',
        trackId: 0,
        startBeat: 58,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-58))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_206',
        trackId: 1,
        startBeat: 58,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-58))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_207',
        trackId: 0,
        startBeat: 58.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-58.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_208',
        trackId: 0,
        startBeat: 59,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-59))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_209',
        trackId: 1,
        startBeat: 59,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-59))',
        name: 'G4',
        color: '#10b981'
      },
      {
        id: 'do_note_210',
        trackId: 0,
        startBeat: 59.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-59.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_211',
        trackId: 0,
        startBeat: 60,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-60))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_212',
        trackId: 1,
        startBeat: 60,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-60))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_213',
        trackId: 0,
        startBeat: 60.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-60.5))',
        name: 'G4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_214',
        trackId: 0,
        startBeat: 61,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-61))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_215',
        trackId: 1,
        startBeat: 61,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-61))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_216',
        trackId: 2,
        startBeat: 61,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-61))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_217',
        trackId: 0,
        startBeat: 61.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-61.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_218',
        trackId: 0,
        startBeat: 62,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-62))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_219',
        trackId: 1,
        startBeat: 62,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-62))',
        name: 'C5',
        color: '#10b981'
      },
      {
        id: 'do_note_220',
        trackId: 0,
        startBeat: 62.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-62.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_221',
        trackId: 0,
        startBeat: 63,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-63))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_222',
        trackId: 1,
        startBeat: 63,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-63))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_223',
        trackId: 0,
        startBeat: 63.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-63.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_224',
        trackId: 0,
        startBeat: 64,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-64))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_225',
        trackId: 1,
        startBeat: 64,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-64))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_226',
        trackId: 2,
        startBeat: 64,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-64))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_227',
        trackId: 0,
        startBeat: 64.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-64.5))',
        name: 'D5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_228',
        trackId: 0,
        startBeat: 65,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-65))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_229',
        trackId: 1,
        startBeat: 65,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-65))',
        name: 'C5',
        color: '#10b981'
      },
      {
        id: 'do_note_230',
        trackId: 0,
        startBeat: 65.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-65.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_231',
        trackId: 0,
        startBeat: 66,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-66))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_232',
        trackId: 1,
        startBeat: 66,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-66))',
        name: 'A4',
        color: '#10b981'
      },
      {
        id: 'do_note_233',
        trackId: 0,
        startBeat: 66.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-66.5))',
        name: 'C5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_234',
        trackId: 0,
        startBeat: 67,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-67))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_235',
        trackId: 1,
        startBeat: 67,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-67))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_236',
        trackId: 2,
        startBeat: 67,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-67))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_237',
        trackId: 0,
        startBeat: 67.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-67.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_238',
        trackId: 0,
        startBeat: 68,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-68))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_239',
        trackId: 1,
        startBeat: 68,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-68))',
        name: 'G4',
        color: '#10b981'
      },
      {
        id: 'do_note_240',
        trackId: 0,
        startBeat: 68.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-68.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_241',
        trackId: 0,
        startBeat: 69,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-69))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_242',
        trackId: 1,
        startBeat: 69,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-69))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_243',
        trackId: 0,
        startBeat: 69.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-69.5))',
        name: 'G4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_244',
        trackId: 0,
        startBeat: 70,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-70))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_245',
        trackId: 1,
        startBeat: 70,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-70))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_246',
        trackId: 0,
        startBeat: 70.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-70.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_247',
        trackId: 0,
        startBeat: 71,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-71))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_248',
        trackId: 1,
        startBeat: 71,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-71))',
        name: 'G4',
        color: '#10b981'
      },
      {
        id: 'do_note_249',
        trackId: 0,
        startBeat: 71.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-71.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_250',
        trackId: 0,
        startBeat: 72,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-72))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_251',
        trackId: 1,
        startBeat: 72,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-72))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_252',
        trackId: 0,
        startBeat: 72.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-72.5))',
        name: 'G4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_253',
        trackId: 0,
        startBeat: 73,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-73))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_254',
        trackId: 1,
        startBeat: 73,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-73))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_255',
        trackId: 2,
        startBeat: 73,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-73))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_256',
        trackId: 0,
        startBeat: 73.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-73.5))',
        name: 'C5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_257',
        trackId: 0,
        startBeat: 74,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-74))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_258',
        trackId: 1,
        startBeat: 74,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-74))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_259',
        trackId: 0,
        startBeat: 74.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-74.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_260',
        trackId: 0,
        startBeat: 75,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-75))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_261',
        trackId: 1,
        startBeat: 75,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-75))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_262',
        trackId: 2,
        startBeat: 75,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-75))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_263',
        trackId: 0,
        startBeat: 75.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-75.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_264',
        trackId: 0,
        startBeat: 76,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-76))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_265',
        trackId: 1,
        startBeat: 76,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-76))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_266',
        trackId: 2,
        startBeat: 76,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-76))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_267',
        trackId: 0,
        startBeat: 76.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*391.99*t) + 0.5*sin(2*PI*391.99*2*t) + 0.2*sin(2*PI*391.99*3*t) + 0.1*sin(2*PI*391.99*4.01*t)) * 0.1 * exp(-4*(beat-76.5))',
        name: 'G4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_268',
        trackId: 0,
        startBeat: 77,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-77))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_269',
        trackId: 1,
        startBeat: 77,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-77))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_270',
        trackId: 2,
        startBeat: 77,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-77))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_271',
        trackId: 0,
        startBeat: 77.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-77.5))',
        name: 'C5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_272',
        trackId: 0,
        startBeat: 78,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-78))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_273',
        trackId: 1,
        startBeat: 78,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-78))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_274',
        trackId: 2,
        startBeat: 78,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-78))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_275',
        trackId: 0,
        startBeat: 78.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-78.5))',
        name: 'D5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_276',
        trackId: 0,
        startBeat: 79,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-79))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_277',
        trackId: 1,
        startBeat: 79,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-79))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_278',
        trackId: 2,
        startBeat: 79,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-79))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_279',
        trackId: 0,
        startBeat: 79.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-79.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_280',
        trackId: 0,
        startBeat: 80,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-80))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_281',
        trackId: 1,
        startBeat: 80,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-80))',
        name: 'A4',
        color: '#10b981'
      },
      {
        id: 'do_note_282',
        trackId: 0,
        startBeat: 80.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-80.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_283',
        trackId: 0,
        startBeat: 81,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-81))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_284',
        trackId: 1,
        startBeat: 81,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-81))',
        name: 'C5',
        color: '#10b981'
      },
      {
        id: 'do_note_285',
        trackId: 0,
        startBeat: 81.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-81.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_286',
        trackId: 0,
        startBeat: 82,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*293.67*t) + 0.5*sin(2*PI*293.67*2*t) + 0.2*sin(2*PI*293.67*3*t) + 0.1*sin(2*PI*293.67*4.01*t)) * 0.1 * exp(-4*(beat-82))',
        name: 'D4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_287',
        trackId: 1,
        startBeat: 82,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-82))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_288',
        trackId: 2,
        startBeat: 82,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-82))',
        name: 'D5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_289',
        trackId: 0,
        startBeat: 82.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-82.5))',
        name: 'C5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_290',
        trackId: 0,
        startBeat: 83,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-83))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_291',
        trackId: 1,
        startBeat: 83,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-83))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_292',
        trackId: 0,
        startBeat: 83.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-83.5))',
        name: 'C5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_293',
        trackId: 0,
        startBeat: 84,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-84))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_294',
        trackId: 1,
        startBeat: 84,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-84))',
        name: 'D5',
        color: '#10b981'
      },
      {
        id: 'do_note_295',
        trackId: 0,
        startBeat: 84.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-84.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_296',
        trackId: 0,
        startBeat: 85,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-85))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_297',
        trackId: 1,
        startBeat: 85,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-85))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_298',
        trackId: 0,
        startBeat: 85.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-85.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_299',
        trackId: 1,
        startBeat: 85.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-85.5))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_300',
        trackId: 0,
        startBeat: 86,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-86))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_301',
        trackId: 1,
        startBeat: 86,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-86))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_302',
        trackId: 0,
        startBeat: 86.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-86.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_303',
        trackId: 1,
        startBeat: 86.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-86.5))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_304',
        trackId: 0,
        startBeat: 87,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-87))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_305',
        trackId: 1,
        startBeat: 87,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-87))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_306',
        trackId: 0,
        startBeat: 87.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-87.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_307',
        trackId: 1,
        startBeat: 87.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-87.5))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_308',
        trackId: 0,
        startBeat: 88,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-88))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_309',
        trackId: 1,
        startBeat: 88,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-88))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_310',
        trackId: 0,
        startBeat: 88.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-88.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_311',
        trackId: 1,
        startBeat: 88.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-88.5))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_312',
        trackId: 0,
        startBeat: 89,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*174.62*t) + 0.5*sin(2*PI*174.62*2*t) + 0.2*sin(2*PI*174.62*3*t) + 0.1*sin(2*PI*174.62*4.01*t)) * 0.1 * exp(-4*(beat-89))',
        name: 'F3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_313',
        trackId: 1,
        startBeat: 89,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-89))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_314',
        trackId: 2,
        startBeat: 89,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-89))',
        name: 'A4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_315',
        trackId: 0,
        startBeat: 89.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-89.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_316',
        trackId: 1,
        startBeat: 89.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-89.5))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_317',
        trackId: 0,
        startBeat: 90,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-90))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_318',
        trackId: 0,
        startBeat: 90.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-90.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_319',
        trackId: 1,
        startBeat: 90.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-90.5))',
        name: 'A4',
        color: '#10b981'
      },
      {
        id: 'do_note_320',
        trackId: 0,
        startBeat: 91,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-91))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_321',
        trackId: 1,
        startBeat: 91,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-91))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_322',
        trackId: 0,
        startBeat: 91.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-91.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_323',
        trackId: 0,
        startBeat: 92,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*196*t) + 0.5*sin(2*PI*196*2*t) + 0.2*sin(2*PI*196*3*t) + 0.1*sin(2*PI*196*4.01*t)) * 0.1 * exp(-4*(beat-92))',
        name: 'G3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_324',
        trackId: 1,
        startBeat: 92,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-92))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_325',
        trackId: 2,
        startBeat: 92,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-92))',
        name: 'B4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_326',
        trackId: 0,
        startBeat: 92.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-92.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_327',
        trackId: 1,
        startBeat: 92.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-92.5))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_328',
        trackId: 0,
        startBeat: 93,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-93))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_329',
        trackId: 0,
        startBeat: 93.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-93.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_330',
        trackId: 1,
        startBeat: 93.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-93.5))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_331',
        trackId: 0,
        startBeat: 94,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-94))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_332',
        trackId: 1,
        startBeat: 94,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-94))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_333',
        trackId: 0,
        startBeat: 94.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-94.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_334',
        trackId: 0,
        startBeat: 95,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-95))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_335',
        trackId: 1,
        startBeat: 95,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-95))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_336',
        trackId: 2,
        startBeat: 95,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-95))',
        name: 'C5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_337',
        trackId: 0,
        startBeat: 95.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-95.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_338',
        trackId: 1,
        startBeat: 95.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-95.5))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_339',
        trackId: 0,
        startBeat: 96,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-96))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_340',
        trackId: 0,
        startBeat: 96.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-96.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_341',
        trackId: 1,
        startBeat: 96.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-96.5))',
        name: 'C5',
        color: '#10b981'
      },
      {
        id: 'do_note_342',
        trackId: 0,
        startBeat: 97,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-97))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_343',
        trackId: 1,
        startBeat: 97,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-97))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_344',
        trackId: 0,
        startBeat: 97.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-97.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_345',
        trackId: 0,
        startBeat: 98,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*196*t) + 0.5*sin(2*PI*196*2*t) + 0.2*sin(2*PI*196*3*t) + 0.1*sin(2*PI*196*4.01*t)) * 0.1 * exp(-4*(beat-98))',
        name: 'G3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_346',
        trackId: 1,
        startBeat: 98,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-98))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_347',
        trackId: 2,
        startBeat: 98,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-98))',
        name: 'D5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_348',
        trackId: 0,
        startBeat: 98.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-98.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_349',
        trackId: 1,
        startBeat: 98.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-98.5))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_350',
        trackId: 0,
        startBeat: 99,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-99))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_351',
        trackId: 0,
        startBeat: 99.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-99.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_352',
        trackId: 1,
        startBeat: 99.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-99.5))',
        name: 'D5',
        color: '#10b981'
      },
      {
        id: 'do_note_353',
        trackId: 0,
        startBeat: 100,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-100))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_354',
        trackId: 1,
        startBeat: 100,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-100))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_355',
        trackId: 0,
        startBeat: 100.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-100.5))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_356',
        trackId: 1,
        startBeat: 100.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-100.5))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_357',
        trackId: 0,
        startBeat: 101,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*87.31*t) + 0.5*sin(2*PI*87.31*2*t) + 0.2*sin(2*PI*87.31*3*t) + 0.1*sin(2*PI*87.31*4.01*t)) * 0.1 * exp(-4*(beat-101))',
        name: 'F2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_358',
        trackId: 1,
        startBeat: 101,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*174.62*t) + 0.5*sin(2*PI*174.62*2*t) + 0.2*sin(2*PI*174.62*3*t) + 0.1*sin(2*PI*174.62*4.01*t)) * 0.1 * exp(-4*(beat-101))',
        name: 'F3',
        color: '#10b981'
      },
      {
        id: 'do_note_359',
        trackId: 2,
        startBeat: 101,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-101))',
        name: 'E4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_360',
        trackId: 3,
        startBeat: 101,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-101))',
        name: 'A4',
        color: '#ef4444'
      },
      {
        id: 'do_note_361',
        trackId: 0,
        startBeat: 101.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-101.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_362',
        trackId: 0,
        startBeat: 102,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-102))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_363',
        trackId: 1,
        startBeat: 102,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-102))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_364',
        trackId: 0,
        startBeat: 102.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-102.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_365',
        trackId: 0,
        startBeat: 103,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-103))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_366',
        trackId: 0,
        startBeat: 103.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-103.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_367',
        trackId: 0,
        startBeat: 104,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-104))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_368',
        trackId: 1,
        startBeat: 104,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-104))',
        name: 'A4',
        color: '#10b981'
      },
      {
        id: 'do_note_369',
        trackId: 0,
        startBeat: 104.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-104.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_370',
        trackId: 0,
        startBeat: 105,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-105))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_371',
        trackId: 1,
        startBeat: 105,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-105))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_372',
        trackId: 0,
        startBeat: 105.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-105.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_373',
        trackId: 0,
        startBeat: 106,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-106))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_374',
        trackId: 0,
        startBeat: 106.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-106.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_375',
        trackId: 0,
        startBeat: 107,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*98.01*t) + 0.5*sin(2*PI*98.01*2*t) + 0.2*sin(2*PI*98.01*3*t) + 0.1*sin(2*PI*98.01*4.01*t)) * 0.1 * exp(-4*(beat-107))',
        name: 'G2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_376',
        trackId: 1,
        startBeat: 107,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*196*t) + 0.5*sin(2*PI*196*2*t) + 0.2*sin(2*PI*196*3*t) + 0.1*sin(2*PI*196*4.01*t)) * 0.1 * exp(-4*(beat-107))',
        name: 'G3',
        color: '#10b981'
      },
      {
        id: 'do_note_377',
        trackId: 2,
        startBeat: 107,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-107))',
        name: 'E4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_378',
        trackId: 3,
        startBeat: 107,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-107))',
        name: 'B4',
        color: '#ef4444'
      },
      {
        id: 'do_note_379',
        trackId: 0,
        startBeat: 107.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-107.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_380',
        trackId: 0,
        startBeat: 108,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-108))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_381',
        trackId: 1,
        startBeat: 108,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-108))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_382',
        trackId: 0,
        startBeat: 108.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-108.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_383',
        trackId: 0,
        startBeat: 109,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-109))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_384',
        trackId: 0,
        startBeat: 109.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-109.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_385',
        trackId: 0,
        startBeat: 110,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-110))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_386',
        trackId: 1,
        startBeat: 110,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-110))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_387',
        trackId: 0,
        startBeat: 110.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-110.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_388',
        trackId: 0,
        startBeat: 111,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-111))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_389',
        trackId: 1,
        startBeat: 111,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-111))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_390',
        trackId: 0,
        startBeat: 111.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-111.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_391',
        trackId: 0,
        startBeat: 112,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-112))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_392',
        trackId: 0,
        startBeat: 112.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-112.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_393',
        trackId: 0,
        startBeat: 113,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*110.01*t) + 0.5*sin(2*PI*110.01*2*t) + 0.2*sin(2*PI*110.01*3*t) + 0.1*sin(2*PI*110.01*4.01*t)) * 0.1 * exp(-4*(beat-113))',
        name: 'A2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_394',
        trackId: 1,
        startBeat: 113,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-113))',
        name: 'A3',
        color: '#10b981'
      },
      {
        id: 'do_note_395',
        trackId: 2,
        startBeat: 113,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-113))',
        name: 'E4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_396',
        trackId: 3,
        startBeat: 113,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-113))',
        name: 'C5',
        color: '#ef4444'
      },
      {
        id: 'do_note_397',
        trackId: 0,
        startBeat: 113.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-113.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_398',
        trackId: 0,
        startBeat: 114,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-114))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_399',
        trackId: 1,
        startBeat: 114,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-114))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_400',
        trackId: 0,
        startBeat: 114.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-114.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_401',
        trackId: 0,
        startBeat: 115,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-115))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_402',
        trackId: 0,
        startBeat: 115.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-115.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_403',
        trackId: 0,
        startBeat: 116,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-116))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_404',
        trackId: 1,
        startBeat: 116,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-116))',
        name: 'C5',
        color: '#10b981'
      },
      {
        id: 'do_note_405',
        trackId: 0,
        startBeat: 116.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-116.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_406',
        trackId: 0,
        startBeat: 117,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-117))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_407',
        trackId: 1,
        startBeat: 117,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-117))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_408',
        trackId: 0,
        startBeat: 117.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-117.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_409',
        trackId: 0,
        startBeat: 118,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-118))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_410',
        trackId: 0,
        startBeat: 118.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-118.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_411',
        trackId: 0,
        startBeat: 119,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*98.01*t) + 0.5*sin(2*PI*98.01*2*t) + 0.2*sin(2*PI*98.01*3*t) + 0.1*sin(2*PI*98.01*4.01*t)) * 0.1 * exp(-4*(beat-119))',
        name: 'G2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_412',
        trackId: 1,
        startBeat: 119,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*196*t) + 0.5*sin(2*PI*196*2*t) + 0.2*sin(2*PI*196*3*t) + 0.1*sin(2*PI*196*4.01*t)) * 0.1 * exp(-4*(beat-119))',
        name: 'G3',
        color: '#10b981'
      },
      {
        id: 'do_note_413',
        trackId: 2,
        startBeat: 119,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-119))',
        name: 'E4',
        color: '#f59e0b'
      },
      {
        id: 'do_note_414',
        trackId: 3,
        startBeat: 119,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-119))',
        name: 'D5',
        color: '#ef4444'
      },
      {
        id: 'do_note_415',
        trackId: 0,
        startBeat: 119.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-119.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_416',
        trackId: 0,
        startBeat: 120,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-120))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_417',
        trackId: 1,
        startBeat: 120,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-120))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_418',
        trackId: 0,
        startBeat: 120.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-120.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_419',
        trackId: 0,
        startBeat: 121,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-121))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_420',
        trackId: 0,
        startBeat: 121.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-121.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_421',
        trackId: 0,
        startBeat: 122,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-122))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_422',
        trackId: 1,
        startBeat: 122,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-122))',
        name: 'D5',
        color: '#10b981'
      },
      {
        id: 'do_note_423',
        trackId: 0,
        startBeat: 122.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-122.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_424',
        trackId: 0,
        startBeat: 123,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-123))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_425',
        trackId: 1,
        startBeat: 123,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-123))',
        name: 'E5',
        color: '#10b981'
      },
      {
        id: 'do_note_426',
        trackId: 0,
        startBeat: 123.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-123.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_427',
        trackId: 0,
        startBeat: 124,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-124))',
        name: 'E4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_428',
        trackId: 0,
        startBeat: 124.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-124.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_429',
        trackId: 0,
        startBeat: 125,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*87.31*t) + 0.5*sin(2*PI*87.31*2*t) + 0.2*sin(2*PI*87.31*3*t) + 0.1*sin(2*PI*87.31*4.01*t)) * 0.1 * exp(-4*(beat-125))',
        name: 'F2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_430',
        trackId: 1,
        startBeat: 125,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-125))',
        name: 'A4',
        color: '#10b981'
      },
      {
        id: 'do_note_431',
        trackId: 2,
        startBeat: 125,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*879.96*t) + 0.5*sin(2*PI*879.96*2*t) + 0.2*sin(2*PI*879.96*3*t) + 0.1*sin(2*PI*879.96*4.01*t)) * 0.1 * exp(-4*(beat-125))',
        name: 'A5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_432',
        trackId: 0,
        startBeat: 125.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-125.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_433',
        trackId: 1,
        startBeat: 125.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*1318.42*t) + 0.5*sin(2*PI*1318.42*2*t) + 0.2*sin(2*PI*1318.42*3*t) + 0.1*sin(2*PI*1318.42*4.01*t)) * 0.1 * exp(-4*(beat-125.5))',
        name: 'E6',
        color: '#10b981'
      },
      {
        id: 'do_note_434',
        trackId: 0,
        startBeat: 126.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*440*t) + 0.5*sin(2*PI*440*2*t) + 0.2*sin(2*PI*440*3*t) + 0.1*sin(2*PI*440*4.01*t)) * 0.1 * exp(-4*(beat-126.5))',
        name: 'A4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_435',
        trackId: 1,
        startBeat: 126.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*879.96*t) + 0.5*sin(2*PI*879.96*2*t) + 0.2*sin(2*PI*879.96*3*t) + 0.1*sin(2*PI*879.96*4.01*t)) * 0.1 * exp(-4*(beat-126.5))',
        name: 'A5',
        color: '#10b981'
      },
      {
        id: 'do_note_436',
        trackId: 0,
        startBeat: 127,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-127))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_437',
        trackId: 1,
        startBeat: 127,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*1318.42*t) + 0.5*sin(2*PI*1318.42*2*t) + 0.2*sin(2*PI*1318.42*3*t) + 0.1*sin(2*PI*1318.42*4.01*t)) * 0.1 * exp(-4*(beat-127))',
        name: 'E6',
        color: '#10b981'
      },
      {
        id: 'do_note_438',
        trackId: 0,
        startBeat: 128,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*98.01*t) + 0.5*sin(2*PI*98.01*2*t) + 0.2*sin(2*PI*98.01*3*t) + 0.1*sin(2*PI*98.01*4.01*t)) * 0.1 * exp(-4*(beat-128))',
        name: 'G2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_439',
        trackId: 1,
        startBeat: 128,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-128))',
        name: 'B4',
        color: '#10b981'
      },
      {
        id: 'do_note_440',
        trackId: 2,
        startBeat: 128,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*987.72*t) + 0.5*sin(2*PI*987.72*2*t) + 0.2*sin(2*PI*987.72*3*t) + 0.1*sin(2*PI*987.72*4.01*t)) * 0.1 * exp(-4*(beat-128))',
        name: 'B5',
        color: '#f59e0b'
      },
      {
        id: 'do_note_441',
        trackId: 0,
        startBeat: 128.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-128.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_442',
        trackId: 1,
        startBeat: 128.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*1318.42*t) + 0.5*sin(2*PI*1318.42*2*t) + 0.2*sin(2*PI*1318.42*3*t) + 0.1*sin(2*PI*1318.42*4.01*t)) * 0.1 * exp(-4*(beat-128.5))',
        name: 'E6',
        color: '#10b981'
      },
      {
        id: 'do_note_443',
        trackId: 0,
        startBeat: 129.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-129.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_444',
        trackId: 1,
        startBeat: 129.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*987.72*t) + 0.5*sin(2*PI*987.72*2*t) + 0.2*sin(2*PI*987.72*3*t) + 0.1*sin(2*PI*987.72*4.01*t)) * 0.1 * exp(-4*(beat-129.5))',
        name: 'B5',
        color: '#10b981'
      },
      {
        id: 'do_note_445',
        trackId: 0,
        startBeat: 130,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-130))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_446',
        trackId: 1,
        startBeat: 130,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*1318.42*t) + 0.5*sin(2*PI*1318.42*2*t) + 0.2*sin(2*PI*1318.42*3*t) + 0.1*sin(2*PI*1318.42*4.01*t)) * 0.1 * exp(-4*(beat-130))',
        name: 'E6',
        color: '#10b981'
      },
      {
        id: 'do_note_447',
        trackId: 0,
        startBeat: 131,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*110.01*t) + 0.5*sin(2*PI*110.01*2*t) + 0.2*sin(2*PI*110.01*3*t) + 0.1*sin(2*PI*110.01*4.01*t)) * 0.1 * exp(-4*(beat-131))',
        name: 'A2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_448',
        trackId: 1,
        startBeat: 131,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-131))',
        name: 'C5',
        color: '#10b981'
      },
      {
        id: 'do_note_449',
        trackId: 2,
        startBeat: 131,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*1046.45*t) + 0.5*sin(2*PI*1046.45*2*t) + 0.2*sin(2*PI*1046.45*3*t) + 0.1*sin(2*PI*1046.45*4.01*t)) * 0.1 * exp(-4*(beat-131))',
        name: 'C6',
        color: '#f59e0b'
      },
      {
        id: 'do_note_450',
        trackId: 0,
        startBeat: 131.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-131.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_451',
        trackId: 1,
        startBeat: 131.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*1318.42*t) + 0.5*sin(2*PI*1318.42*2*t) + 0.2*sin(2*PI*1318.42*3*t) + 0.1*sin(2*PI*1318.42*4.01*t)) * 0.1 * exp(-4*(beat-131.5))',
        name: 'E6',
        color: '#10b981'
      },
      {
        id: 'do_note_452',
        trackId: 0,
        startBeat: 132.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*523.24*t) + 0.5*sin(2*PI*523.24*2*t) + 0.2*sin(2*PI*523.24*3*t) + 0.1*sin(2*PI*523.24*4.01*t)) * 0.1 * exp(-4*(beat-132.5))',
        name: 'C5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_453',
        trackId: 1,
        startBeat: 132.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*1046.45*t) + 0.5*sin(2*PI*1046.45*2*t) + 0.2*sin(2*PI*1046.45*3*t) + 0.1*sin(2*PI*1046.45*4.01*t)) * 0.1 * exp(-4*(beat-132.5))',
        name: 'C6',
        color: '#10b981'
      },
      {
        id: 'do_note_454',
        trackId: 0,
        startBeat: 133,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-133))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_455',
        trackId: 1,
        startBeat: 133,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*1318.42*t) + 0.5*sin(2*PI*1318.42*2*t) + 0.2*sin(2*PI*1318.42*3*t) + 0.1*sin(2*PI*1318.42*4.01*t)) * 0.1 * exp(-4*(beat-133))',
        name: 'E6',
        color: '#10b981'
      },
      {
        id: 'do_note_456',
        trackId: 0,
        startBeat: 134,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*98.01*t) + 0.5*sin(2*PI*98.01*2*t) + 0.2*sin(2*PI*98.01*3*t) + 0.1*sin(2*PI*98.01*4.01*t)) * 0.1 * exp(-4*(beat-134))',
        name: 'G2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_457',
        trackId: 1,
        startBeat: 134,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-134))',
        name: 'D5',
        color: '#10b981'
      },
      {
        id: 'do_note_458',
        trackId: 2,
        startBeat: 134,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*1174.59*t) + 0.5*sin(2*PI*1174.59*2*t) + 0.2*sin(2*PI*1174.59*3*t) + 0.1*sin(2*PI*1174.59*4.01*t)) * 0.1 * exp(-4*(beat-134))',
        name: 'D6',
        color: '#f59e0b'
      },
      {
        id: 'do_note_459',
        trackId: 0,
        startBeat: 134.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-134.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_460',
        trackId: 1,
        startBeat: 134.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*1318.42*t) + 0.5*sin(2*PI*1318.42*2*t) + 0.2*sin(2*PI*1318.42*3*t) + 0.1*sin(2*PI*1318.42*4.01*t)) * 0.1 * exp(-4*(beat-134.5))',
        name: 'E6',
        color: '#10b981'
      },
      {
        id: 'do_note_461',
        trackId: 0,
        startBeat: 135.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*587.32*t) + 0.5*sin(2*PI*587.32*2*t) + 0.2*sin(2*PI*587.32*3*t) + 0.1*sin(2*PI*587.32*4.01*t)) * 0.1 * exp(-4*(beat-135.5))',
        name: 'D5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_462',
        trackId: 1,
        startBeat: 135.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*1174.59*t) + 0.5*sin(2*PI*1174.59*2*t) + 0.2*sin(2*PI*1174.59*3*t) + 0.1*sin(2*PI*1174.59*4.01*t)) * 0.1 * exp(-4*(beat-135.5))',
        name: 'D6',
        color: '#10b981'
      },
      {
        id: 'do_note_463',
        trackId: 0,
        startBeat: 136,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-136))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_464',
        trackId: 1,
        startBeat: 136,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*1318.42*t) + 0.5*sin(2*PI*1318.42*2*t) + 0.2*sin(2*PI*1318.42*3*t) + 0.1*sin(2*PI*1318.42*4.01*t)) * 0.1 * exp(-4*(beat-136))',
        name: 'E6',
        color: '#10b981'
      },
      {
        id: 'do_note_465',
        trackId: 0,
        startBeat: 136.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-136.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_466',
        trackId: 0,
        startBeat: 137,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*87.31*t) + 0.5*sin(2*PI*87.31*2*t) + 0.2*sin(2*PI*87.31*3*t) + 0.1*sin(2*PI*87.31*4.01*t)) * 0.1 * exp(-4*(beat-137))',
        name: 'F2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_467',
        trackId: 1,
        startBeat: 137,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-137))',
        name: 'A3',
        color: '#10b981'
      },
      {
        id: 'do_note_468',
        trackId: 0,
        startBeat: 137.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-137.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_469',
        trackId: 0,
        startBeat: 138.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*220.01*t) + 0.5*sin(2*PI*220.01*2*t) + 0.2*sin(2*PI*220.01*3*t) + 0.1*sin(2*PI*220.01*4.01*t)) * 0.1 * exp(-4*(beat-138.5))',
        name: 'A3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_470',
        trackId: 0,
        startBeat: 139,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-139))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_471',
        trackId: 0,
        startBeat: 140,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*98.01*t) + 0.5*sin(2*PI*98.01*2*t) + 0.2*sin(2*PI*98.01*3*t) + 0.1*sin(2*PI*98.01*4.01*t)) * 0.1 * exp(-4*(beat-140))',
        name: 'G2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_472',
        trackId: 1,
        startBeat: 140,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-140))',
        name: 'B3',
        color: '#10b981'
      },
      {
        id: 'do_note_473',
        trackId: 0,
        startBeat: 140.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-140.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_474',
        trackId: 0,
        startBeat: 141.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*246.95*t) + 0.5*sin(2*PI*246.95*2*t) + 0.2*sin(2*PI*246.95*3*t) + 0.1*sin(2*PI*246.95*4.01*t)) * 0.1 * exp(-4*(beat-141.5))',
        name: 'B3',
        color: '#3b82f6'
      },
      {
        id: 'do_note_475',
        trackId: 0,
        startBeat: 142,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-142))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_476',
        trackId: 0,
        startBeat: 143,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*110.01*t) + 0.5*sin(2*PI*110.01*2*t) + 0.2*sin(2*PI*110.01*3*t) + 0.1*sin(2*PI*110.01*4.01*t)) * 0.1 * exp(-4*(beat-143))',
        name: 'A2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_477',
        trackId: 1,
        startBeat: 143,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-143))',
        name: 'C4',
        color: '#10b981'
      },
      {
        id: 'do_note_478',
        trackId: 0,
        startBeat: 143.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-143.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_479',
        trackId: 0,
        startBeat: 144.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*261.63*t) + 0.5*sin(2*PI*261.63*2*t) + 0.2*sin(2*PI*261.63*3*t) + 0.1*sin(2*PI*261.63*4.01*t)) * 0.1 * exp(-4*(beat-144.5))',
        name: 'C4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_480',
        trackId: 0,
        startBeat: 145,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-145))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_481',
        trackId: 0,
        startBeat: 146,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*98.01*t) + 0.5*sin(2*PI*98.01*2*t) + 0.2*sin(2*PI*98.01*3*t) + 0.1*sin(2*PI*98.01*4.01*t)) * 0.1 * exp(-4*(beat-146))',
        name: 'G2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_482',
        trackId: 1,
        startBeat: 146,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*293.67*t) + 0.5*sin(2*PI*293.67*2*t) + 0.2*sin(2*PI*293.67*3*t) + 0.1*sin(2*PI*293.67*4.01*t)) * 0.1 * exp(-4*(beat-146))',
        name: 'D4',
        color: '#10b981'
      },
      {
        id: 'do_note_483',
        trackId: 0,
        startBeat: 146.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-146.5))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_484',
        trackId: 0,
        startBeat: 147.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*293.67*t) + 0.5*sin(2*PI*293.67*2*t) + 0.2*sin(2*PI*293.67*3*t) + 0.1*sin(2*PI*293.67*4.01*t)) * 0.1 * exp(-4*(beat-147.5))',
        name: 'D4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_485',
        trackId: 0,
        startBeat: 148,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-148))',
        name: 'E5',
        color: '#3b82f6'
      },
      {
        id: 'do_note_486',
        trackId: 0,
        startBeat: 148.5,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*493.88*t) + 0.5*sin(2*PI*493.88*2*t) + 0.2*sin(2*PI*493.88*3*t) + 0.1*sin(2*PI*493.88*4.01*t)) * 0.1 * exp(-4*(beat-148.5))',
        name: 'B4',
        color: '#3b82f6'
      },
      {
        id: 'do_note_487',
        trackId: 0,
        startBeat: 149,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*82.41*t) + 0.5*sin(2*PI*82.41*2*t) + 0.2*sin(2*PI*82.41*3*t) + 0.1*sin(2*PI*82.41*4.01*t)) * 0.1 * exp(-4*(beat-149))',
        name: 'E2',
        color: '#3b82f6'
      },
      {
        id: 'do_note_488',
        trackId: 1,
        startBeat: 149,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*329.63*t) + 0.5*sin(2*PI*329.63*2*t) + 0.2*sin(2*PI*329.63*3*t) + 0.1*sin(2*PI*329.63*4.01*t)) * 0.1 * exp(-4*(beat-149))',
        name: 'E4',
        color: '#10b981'
      },
      {
        id: 'do_note_489',
        trackId: 2,
        startBeat: 149,
        lengthBeats: 0.5,
        equation: '(sin(2*PI*659.24*t) + 0.5*sin(2*PI*659.24*2*t) + 0.2*sin(2*PI*659.24*3*t) + 0.1*sin(2*PI*659.24*4.01*t)) * 0.1 * exp(-4*(beat-149))',
        name: 'E5',
        color: '#f59e0b'
      }
    ],
    tracks: [
      {
        id: 0,
        name: 'Note Voice 1',
        muted: false,
        height: 40,
        volume: 1
      },
      {
        id: 1,
        name: 'Note Voice 2',
        muted: false,
        height: 40,
        volume: 1
      },
      {
        id: 2,
        name: 'Note Voice 3',
        muted: false,
        height: 40,
        volume: 1
      },
      {
        id: 3,
        name: 'Note Voice 4',
        muted: false,
        height: 40,
        volume: 1
      },
      {
        id: 4,
        name: 'Note Voice 5',
        muted: false,
        height: 40,
        volume: 1
      },
      {
        id: 5,
        name: 'Note Voice 6',
        muted: false,
        height: 40,
        volume: 1
      }
    ]
  },
];
