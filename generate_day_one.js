const clips = [];
let clipId = 0;

const chords = [
  [220.00, 261.63, 329.63], // Am
  [174.61, 220.00, 261.63], // F
  [196.00, 246.94, 293.66], // G
  [220.00, 261.63, 329.63]  // Am
];

for (let bar = 0; bar < 8; bar++) {
  const startBeat = bar * 4;
  const chordIndex = bar % 4;
  const chordNames = ['Am', 'F', 'G', 'Am'];
  const name = chordNames[chordIndex] + ' Chord';
  const freqs = chords[chordIndex];
  const eq = `(sin(2*PI*${freqs[0]}*t) + sin(2*PI*${freqs[1]}*t) + sin(2*PI*${freqs[2]}*t)) * 0.1 * exp(-0.5*(beat - ${startBeat}))`;
  clips.push({
    id: `do_lh_${clipId++}`,
    trackId: 0,
    startBeat: startBeat,
    lengthBeats: 4,
    equation: eq,
    name: name,
    color: '#1e40af'
  });
}

const topFreqs = [392.00, 440.00, 523.25, 587.33];
const topNames = ['G4', 'A4', 'C5', 'D5'];

for (let bar = 0; bar < 8; bar++) {
  const barStart = bar * 4;
  const freq = topFreqs[bar % 4];
  const name = topNames[bar % 4];
  
  clips.push({
    id: `do_rht_${clipId++}`,
    trackId: 1,
    startBeat: barStart + 0,
    lengthBeats: 1.5,
    equation: `sin(2*PI*${freq}*t) * 0.15 * exp(-2*(beat - ${barStart + 0}))`,
    name: name,
    color: '#0ea5e9'
  });
  clips.push({
    id: `do_rht_${clipId++}`,
    trackId: 1,
    startBeat: barStart + 2,
    lengthBeats: 1.5,
    equation: `sin(2*PI*${freq}*t) * 0.15 * exp(-2*(beat - ${barStart + 2}))`,
    name: name,
    color: '#0ea5e9'
  });
}

for (let bar = 0; bar < 8; bar++) {
  const barStart = bar * 4;
  const freq = 329.63;
  
  clips.push({
    id: `do_rhb_${clipId++}`,
    trackId: 2,
    startBeat: barStart + 1.5,
    lengthBeats: 0.5,
    equation: `sin(2*PI*${freq}*t) * 0.15 * exp(-5*(beat - ${barStart + 1.5}))`,
    name: 'E4',
    color: '#8b5cf6'
  });
  clips.push({
    id: `do_rhb_${clipId++}`,
    trackId: 2,
    startBeat: barStart + 3.5,
    lengthBeats: 0.5,
    equation: `sin(2*PI*${freq}*t) * 0.15 * exp(-5*(beat - ${barStart + 3.5}))`,
    name: 'E4',
    color: '#8b5cf6'
  });
}

const preset = {
  name: 'Day One (MIDI Blocks)',
  bpm: 48,
  clips: clips,
  tracks: [
    { id: 0, name: 'Left Hand (Chords)', muted: false, height: 80, volume: 1 },
    { id: 1, name: 'Right Hand (Melody)', muted: false, height: 80, volume: 1 },
    { id: 2, name: 'Right Hand (Ostinato)', muted: false, height: 80, volume: 1 },
  ]
};

console.log(JSON.stringify(preset, null, 2));
