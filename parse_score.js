const rawText = `E4|E4|E4|E4|E4|E4|E4|E4|
[A3E4A4]|E4|E4|[B3E4B4]|E4|E4|E4|E4|E4|
[A3E4A4]|[B3E4B4]|[C4E4C5]|[B3E4B4]|[A3E4A4]|[B3E4B4]|[C4E4C5]|E4|E4|
[B3E4B4]|E4|E4|E4|E4|E4|
[A3E4A4]|E4|[E4E5]|[C4E4C5]|E4|E4|
[B3E4B4]|E4|E4|E4|E4|E4|
[A3E4A4]|[E4E5]|[C4E4C5]|[B3E4B4]|[A3E4A4]|[B3E4B4]|[C4E4C5]|E4|E4|
[B3E4B4]|E4|E4|E4|E4|E4|
[A3E4A4]|[E4E5]|[C4E4C5]|[B3E4B4]|[A3E4A4]|[B3E4B4]|[C4E4C5]|E4|E4|
[D4E4D5]|E4|E4|[E4E5]|E4|E4|
[A3E4A4] B4 [E4C5] B4 [E4A4] C5
[B3E4B4] A4 [E4G4] A4 [E4B4] G4 [E4B4] A4 [E4G4] A4 [E4B4] G4
[A3E4A4] C5 [B3E4B4] D5 [C4E4C5] A4 [B3E4B4] G4
[A3E4A4] C5 [B3E4B4] D5 [C4E4C5] D5 [E4C5] B4 [E4A4] C5
[B3E4B4] A4 [E4G4] A4 [E4B4] G4 [E4B4] A4 [E4G4] E5 [E4B4] G4
[A3E4A4] B4 [E4C5] B4 [E4E5] B4 [C4E4C5] D5 [E4C5] B4 [E4A4] C5
[B3E4B4] A4 [E4G4] A4 [E4B4] G4 [E4B4] A4 [E4G4] E5 [E4B4] G4
[A3E4A4] C5 [E4E5] B4 [C4E4C5] A4 [B3E4B4] G4
[A3E4A4] C5 [B3E4B4] D5 [C4E4C5] B4 [E4A4] B4 [E4C5] A4
[D4E4D5] C5 [E4B4] C5 [E4D5] B4
[E4E5]|[E4E5]|[E4E5]|[E4E5]|[E4E5]|[E4E5]|[E4E5]|[E4E5]|
[F3E4A4]|[E4E5]|E4|[E4A4]|[E4E5]|E4|
[G3E4B4]|[E4E5]|E4|[E4B4]|[E4E5]|E4|
[A3E4C5]|[E4E5]|E4|[E4C5]|[E4E5]|E4|
[G3E4D5]|[E4E5]|E4|[E4D5]|[E4E5]|[E4B4]|
[F2F3E4A4] E5 [E4E5] E5 E4 E5 [E4A4] E5 [E4E5] E5 E4 E5
[G2G3E4B4] E5 [E4E5] E5 E4 E5 [E4B4] E5 [E4E5] E5 E4 E5
[A2A3E4C5] E5 [E4E5] E5 E4 E5 [E4C5] E5 [E4E5] E5 E4 E5
[G2G3E4D5] E5 [E4E5] E5 E4 E5 [E4D5] E5 [E4E5] E5 E4 E5
[F2A4A5]|[E5E6]||[A4A5]|[E5E6]||
[G2B4B5]|[E5E6]||[B4B5]|[E5E6]||
[A2C5C6]|[E5E6]||[C5C6]|[E5E6]||
[G2D5D6]|[E5E6]||[D5D6]|[E5E6]|B4|
[F2A3]|E5||A3|E5||
[G2B3]|E5||B3|E5||
[A2C4]|E5||C4|E5||
[G2D4]|E5||D4|E5|B4|[E2E4E5]`;

const getFreq = (noteStr) => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const name = noteStr.match(/[A-Z]#?/)[0];
  const oct = parseInt(noteStr.match(/\d/)[0]);
  const semitonesFromC4 = notes.indexOf(name) + (oct - 4) * 12;
  return +(261.63 * Math.pow(1.05946, semitonesFromC4)).toFixed(2);
};

// Colors for tracks
const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#0ea5e9'];

const clips = [];
let clipId = 0;
let currentBeat = 0;
const STEP = 0.5; // Each token is 0.5 beats

// Tokenize the raw text
// A token is separated by spaces or `|`
// Let's process line by line to handle `|` and spaces correctly
const lines = rawText.trim().split('\n');
for (const line of lines) {
  // Replace all spaces with | so we can just split by |
  // Wait, if we replace space with |, consecutive spaces become || which means rest. Is that correct?
  // Let's check: "[A3E4A4] B4 [E4C5]" -> space separates notes. No double space.
  const cleanedLine = line.trim().replace(/\s+/g, '|');
  const tokens = cleanedLine.split('|');
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === '') {
      // It's a rest, advance beat if it's not the very last empty token on a line
      // wait, "A|B|" splits to ['A', 'B', '']. The trailing empty string shouldn't add a rest if it's just the end of the line.
      if (i !== tokens.length - 1) {
        currentBeat += STEP;
      }
    } else {
      // Extract notes. They can be like "E4" or "[A3E4A4]"
      // Regex to find all instances of note patterns like A3, C#4, etc.
      const noteMatches = token.match(/[A-Z]#?\d/g);
      if (noteMatches) {
        // Create a clip for each note at the current beat
        noteMatches.forEach((noteName, idx) => {
          const freq = getFreq(noteName);
          clips.push({
            id: `do_note_${clipId++}`,
            trackId: idx % 6, // Spread across up to 6 tracks visually
            startBeat: currentBeat,
            lengthBeats: 0.5,
            equation: `sin(2*PI*${freq}*t) * 0.15 * exp(-6*(beat - ${currentBeat}))`,
            name: noteName,
            color: colors[idx % colors.length]
          });
        });
      }
      currentBeat += STEP;
    }
  }
}

const preset = {
  name: 'Day One (Exact Score)',
  bpm: 96,
  clips: clips,
  tracks: [
    { id: 0, name: 'Note Voice 1', muted: false, height: 40, volume: 1 },
    { id: 1, name: 'Note Voice 2', muted: false, height: 40, volume: 1 },
    { id: 2, name: 'Note Voice 3', muted: false, height: 40, volume: 1 },
    { id: 3, name: 'Note Voice 4', muted: false, height: 40, volume: 1 },
    { id: 4, name: 'Note Voice 5', muted: false, height: 40, volume: 1 },
    { id: 5, name: 'Note Voice 6', muted: false, height: 40, volume: 1 },
  ]
};

const fs = require('fs');
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
    console.log("Updated presets.ts with exact score!");
  } else {
    console.log("Could not find end of object");
  }
} else {
  console.log("Could not find Day One preset");
}
