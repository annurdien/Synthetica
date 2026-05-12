const fs = require('fs');

const presetsFile = './app/lib/presets.ts';
let content = fs.readFileSync(presetsFile, 'utf8');

// Find the preset Day One (Exact Score)
const match = content.match(/name:\s*'Day One \(Exact Score\)'/);
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
    const presetStr = content.substring(startIndex, endIndex + 1);
    
    // We can evaluate it to an object by creating a function
    // But since it's TypeScript, it might have type annotations? No, the previous script generated it cleanly.
    // Instead of parsing it, we can just use regex to replace the equations!
    // The equation looks like:
    // equation: 'sin(2*PI*220*t) * 0.15 * exp(-6*(beat - 0))'
    
    const updatedPresetStr = presetStr.replace(/equation:\s*'sin\(2\*PI\*([0-9.]+)\*t\)\s*\*\s*[0-9.]+\s*\*\s*exp\(-6\*\s*\(beat\s*-\s*([0-9.]+)\)\)'/g, (match, freq, startBeat) => {
      // Create a rich piano equation
      // Using an envelope that has a sharp attack and smooth decay
      // And 4 harmonics
      return `equation: 'const dt=beat-${startBeat}; const f=${freq}; const wave=sin(2*PI*f*t) + 0.5*sin(2*PI*f*2*t) + 0.2*sin(2*PI*f*3*t) + 0.1*sin(2*PI*f*4.01*t); return wave * 0.1 * exp(-4*dt);'`;
    });
    
    content = content.substring(0, startIndex) + updatedPresetStr + content.substring(endIndex + 1);
    fs.writeFileSync(presetsFile, content);
    console.log("Updated equations to piano synths!");
  }
} else {
  console.log("Preset not found.");
}
