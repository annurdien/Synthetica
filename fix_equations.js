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
    
    // The broken equation format:
    // equation: 'const dt=beat-0; const f=220; const wave=sin(2*PI*f*t) + 0.5*sin(2*PI*f*2*t) + 0.2*sin(2*PI*f*3*t) + 0.1*sin(2*PI*f*4.01*t); return wave * 0.1 * exp(-4*dt);'
    
    // We want to replace it with a single expression:
    // equation: '(sin(2*PI*220*t) + 0.5*sin(2*PI*220*2*t) + 0.2*sin(2*PI*220*3*t) + 0.1*sin(2*PI*220*4.01*t)) * 0.1 * exp(-4*(beat-0))'
    
    const updatedPresetStr = presetStr.replace(/equation:\s*'const dt=beat-([0-9.]+);\s*const f=([0-9.]+);\s*const wave=[^;]+;\s*return wave \* 0.1 \* exp\(-4\*dt\);'/g, (match, startBeat, freq) => {
      return `equation: '(sin(2*PI*${freq}*t) + 0.5*sin(2*PI*${freq}*2*t) + 0.2*sin(2*PI*${freq}*3*t) + 0.1*sin(2*PI*${freq}*4.01*t)) * 0.1 * exp(-4*(beat-${startBeat}))'`;
    });
    
    content = content.substring(0, startIndex) + updatedPresetStr + content.substring(endIndex + 1);
    fs.writeFileSync(presetsFile, content);
    console.log("Fixed equations to be valid expressions!");
  }
} else {
  console.log("Preset not found.");
}
