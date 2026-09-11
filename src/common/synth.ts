type Phase = {
  ramp: "exponentialRampToValueAtTime" | "linearRampToValueAtTime";
  duration: number;
  level: number;
};

type Voice = {
  baseFreq: number;
  freqSocket: AudioParam;
  gainSocket: GainNode;
  stop: (when: number) => void;
};

export const synth = (function (audioCtx: AudioContext) {
  const masterVolume = audioCtx.createGain(),
    currentNotes: Record<string, () => number> = {};

  function carrier(freq: number): Voice {
    const gain = audioCtx.createGain(),
      osc = audioCtx.createOscillator();

    gain.connect(masterVolume);
    osc.connect(gain);
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.start(0);
    return {
      baseFreq: freq,
      freqSocket: osc.frequency,
      gainSocket: gain,
      stop: (x) => osc.stop(x),
    };
  }

  //multiplier and depth are relative to node base freq
  function fmod(node: Voice, multiplier: number, depth: number): Voice {
    const gain = audioCtx.createGain(),
      osc = audioCtx.createOscillator(),
      freq = node.baseFreq;

    gain.connect(node.freqSocket);
    gain.gain.value = depth * freq;
    osc.frequency.value = multiplier * freq;
    osc.connect(gain);
    osc.type = "sine";
    osc.start(0);

    return {
      baseFreq: freq,
      freqSocket: osc.frequency,
      gainSocket: gain,
      stop: (x) => osc.stop(x),
    };
  }

  //parameter constructor
  function p(duration: number, level: number, exponential = true): Phase {
    if (exponential) {
      return {
        ramp: "exponentialRampToValueAtTime",
        duration: duration,
        //exponentials cannot be set to zero
        level: level === 0 ? 0.0001 : level,
      };
    }

    return {
      ramp: "linearRampToValueAtTime",
      duration: duration,
      level: level,
    };
  }

  //node is oscillator being modified
  //phases: adsr env
  function adsr(node: Voice, ...phases: Phase[]) {
    const gain = node.gainSocket,
      param = gain.gain;
    let now = audioCtx.currentTime;

    function schedule(state: Phase) {
      now += state.duration / 1000;
      param[state.ramp](state.level, now);
    }
    param.cancelScheduledValues(now);
    param.value = 0;
    //schedule all except last phase
    phases.slice(0, phases.length - 1).forEach(schedule);
    return {
      stop: () => {
        now = audioCtx.currentTime;
        param.cancelScheduledValues(now);
        //schedule last phase - release
        schedule(phases[phases.length - 1]);
        return now;
      },
    };
  }

  masterVolume.gain.value = 0.05;
  masterVolume.connect(audioCtx.destination);

  return {
    noteOn: function (
      id: string,
      midiKey: number,
      velocity: number,
      duration?: number,
    ) {
      const hz = Math.floor(Math.pow(2, (midiKey - 69) / 12) * 440),
        level = velocity / 127,
        carry = carrier(hz),
        mod = fmod(carry, 2.1, 0.3),
        env = adsr(carry, p(10, level, false), p(500, 0, false));

      const release = function () {
        const release = env.stop() + 0.01;
        carry.stop(release);
        mod.stop(release);
        return release;
      };

      //save release function
      currentNotes[id] = release;

      if (duration) {
        setTimeout(() => {
          release();
          delete currentNotes[id];
        }, duration);
      }
    },
    noteOff: function (id: string) {
      const release = currentNotes[id];
      if (release) {
        release();
      }
      delete currentNotes[id];
    },
    setVolume: function (val: number) {
      masterVolume.gain.value = (0.1 * val) / 100;
    },
    createAnalyser: function () {
      const analyser = audioCtx.createAnalyser();
      masterVolume.connect(analyser);
      analyser.fftSize = 2048;
      return analyser;
    },
  };
})(new AudioContext());
