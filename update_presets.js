const fs = require('fs');

const midiPreset = require('./day_one_midi.json');
const presetsFile = './app/lib/presets.ts';

let content = fs.readFileSync(presetsFile, 'utf8');

// Find the last preset and replace it
const startIdx = content.indexOf("{", content.lastIndexOf("name: 'Day One"));
const match = content.match(/name:\s*'Day One[^']*',/);
if (match) {
  const startIndex = content.lastIndexOf('{', match.index);
  
  // We need to find the matching closing brace
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
    const replacement = JSON.stringify(midiPreset, null, 4).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
    content = content.substring(0, startIndex) + replacement + content.substring(endIndex + 1);
    fs.writeFileSync(presetsFile, content);
    console.log("Updated presets.ts");
  } else {
    console.log("Could not find end of object");
  }
} else {
  console.log("Could not find Day One preset");
}

