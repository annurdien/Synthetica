const fs = require('fs');

const clips = [];
let clipId = 0;

// Chords
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
  const eq = `(sin(2*PI*${freqs[0]}*t) + sin(2*PI*${freqs[1]}*t) + sin(2*PI*${freqs[2]}*t)) * 0.15 * exp(-0.5*(beat - ${startBeat}))`;
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

// Right hand ostinato (famous rocking melody)
const topFreqs = [392.00, 440.00, 523.25, 587.33]; // G4, A4, C5, D5
const topNames = ['G4', 'A4', 'C5', 'D5'];
const botFreq = 329.63; // E4

for (let bar = 0; bar < 8; bar++) {
  const barStart = bar * 4;
  const topFreq = topFreqs[bar % 4];
  const topName = topNames[bar % 4];

  // 4 pairs of (Top, Bottom) per bar
  for (let i = 0; i < 4; i++) {
    // Top note
    const topBeat = barStart + i * 1.0;
    clips.push({
      id: `do_rht_${clipId++}`,
      trackId: 1,
      startBeat: topBeat,
      lengthBeats: 0.5,
      equation: `sin(2*PI*${topFreq}*t) * 0.2 * exp(-5*(beat - ${topBeat}))`,
      name: topName,
      color: '#0ea5e9'
    });

    // Bottom note (E4)
    const botBeat = barStart + i * 1.0 + 0.5;
    clips.push({
      id: `do_rhb_${clipId++}`,
      trackId: 2,
      startBeat: botBeat,
      lengthBeats: 0.5,
      equation: `sin(2*PI*${botFreq}*t) * 0.2 * exp(-5*(beat - ${botBeat}))`,
      name: 'E4',
      color: '#8b5cf6'
    });
  }
}

const preset = {
  name: 'Day One (Famous Ostinato)',
  bpm: 80, // Perfect emotive speed for the rocking ostinato
  clips: clips,
  tracks: [
    { id: 0, name: 'Left Hand Chords', muted: false, height: 80, volume: 1 },
    { id: 1, name: 'Melody Top Note', muted: false, height: 80, volume: 1 },
    { id: 2, name: 'Melody Bottom (E4)', muted: false, height: 80, volume: 1 },
  ]
};

const presetsFile = './app/lib/presets.ts';
let content = fs.readFileSync(presetsFile, 'utf8');

const match = content.match(/name:\s*'Day One[^']*',/);
if (match) {
  const startIndex = content.lastIndexOf('{', match.index);
  
  let openBraces = 0;
  let endIndex = -1;
  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '{') openBraces++;
    else if (content[i] === '}') {
      openBraces--;
      if (openBraces === 0) {
        endIndex = i;
        break;
      }
    }
  }

  if (endIndex !== -1) {
    const replacement = JSON.stringify(preset, null, 4).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
    content = content.substring(0, startIndex) + replacement + content.substring(endIndex + 1);
    fs.writeFileSync(presetsFile, content);
    console.log("Updated presets.ts with famous ostinato!");
  } else {
    console.log("Could not find end of object");
  }
} else {
  console.log("Could not find Day One preset");
}

