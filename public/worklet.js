class MathProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.t = 0;
    this.evalFunc = null;
    this.bpm = 120;
    this.mode = 'single';
    this.clips = [];

    this.port.onmessage = (event) => {
      const mathPrefix = `const { E, LN10, LN2, LOG10E, LOG2E, PI, SQRT1_2, SQRT2, abs, acos, acosh, asin, asinh, atan, atan2, atanh, cbrt, ceil, clz32, cos, cosh, exp, expm1, floor, fround, hypot, imul, log, log10, log1p, log2, max, min, pow, random, round, sign, sin, sinh, sqrt, tan, tanh, trunc } = Math;`;

      if (event.data.type === 'setEquation') {
        try {
          const body = `
            ${mathPrefix}
            return function(t, bpm) {
              const bps = bpm / 60;
              const beat = t * bps;
              return ${event.data.equation};
            }
          `;
          this.evalFunc = new Function(body)();
          // Test evaluation at t=0 to quickly catch syntax/runtime errors
          this.evalFunc(0, this.bpm);
          this.mode = 'single';
          this.port.postMessage({ type: 'success' });
        } catch (err) {
          this.port.postMessage({ type: 'error', error: err.message });
        }
      } else if (event.data.type === 'setTimeline') {
        try {
          this.clips = event.data.clips.map(clip => {
            const body = `
              ${mathPrefix}
              return function(t, bpm) {
                const bps = bpm / 60;
                const beat = t * bps;
                return ${clip.equation};
              }
            `;
            const func = new Function(body)();
            func(0, this.bpm);
            return {
              startBeat: clip.startBeat,
              endBeat: clip.endBeat,
              volume: clip.volume !== undefined ? clip.volume : 1,
              evalFunc: func
            };
          });
          this.mode = 'timeline';
          this.port.postMessage({ type: 'success' });
        } catch (err) {
          this.port.postMessage({ type: 'error', error: err.message });
        }
      } else if (event.data.type === 'resetTime') {
        this.t = 0;
      } else if (event.data.type === 'setTime') {
        this.t = event.data.time;
      } else if (event.data.type === 'setTempo') {
        this.bpm = event.data.bpm;
      }
    };
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const sampleRateLocal = sampleRate || 44100;
    const dt = 1 / sampleRateLocal;
    const dtSub = dt / 4; // 4x oversampling
    
    // First figure out how many channels and frames we have
    const frameCount = output[0]?.length || 128;
    const numChannels = output.length;
    
    // We compute the waveform for one frame and write it to all channels
    for (let i = 0; i < frameCount; ++i) {
      let sumVal = 0;
      for (let step = 0; step < 4; ++step) {
        let val = 0;
        try {
          let tSub = this.t + step * dtSub;
          if (this.mode === 'single' && this.evalFunc) {
            val = this.evalFunc(tSub, this.bpm);
          } else if (this.mode === 'timeline') {
            const currentBeat = tSub * (this.bpm / 60);
            for (let c = 0; c < this.clips.length; ++c) {
              const clip = this.clips[c];
              if (currentBeat >= clip.startBeat && currentBeat < clip.endBeat) {
                val += clip.evalFunc(tSub, this.bpm) * clip.volume;
              }
            }
          }
          if (Number.isNaN(val)) val = 0;
          // Apply soft-clipping to prevent harsh distortion when tracks add up
          val = Math.tanh(val);
        } catch (e) {
          val = 0;
        }
        sumVal += val;
      }
      
      const frameVal = sumVal / 4;
      this.t += dt; 
      
      // Copy to all channels
      for (let channel = 0; channel < numChannels; ++channel) {
        output[channel][i] = frameVal;
      }
    }
    
    return true;
  }
}

registerProcessor('math-processor', MathProcessor);
