window.funcMap = {};

const jx = (() => {
  const funcMapInverse = new Map();
  let counter = 0;
  const _jx = {
    render: (f, ...args) => {
      // reset references
      window.funcMap = {};
      funcMapInverse.clear();
      counter = 0;

      // render
      const s = f(...args);
      document.write(s);
    },
    ref: (f) => {
      if (!funcMapInverse.has(f)) {
        const name = '_' + counter;
        counter++;
        funcMapInverse.set(f, name);
        window.funcMap[name] = f;
      }
      return `window.funcMap['${funcMapInverse.get(f)}']()`;
    },

    // plugins/utils
    getURLState: () => {
      if (document.location.search) {
        const[state] =
            [
              document.location.search.substring(1)
            ].map(decodeURIComponent)
                .map(JSON.parse);
        return state;
      }
    },
    setURLState: (state) => {
      document.location = `${document.location}?${JSON.stringify(state)}`;
    },
    random: Math.random,
    rand: (size) => {
      const min = Math.pow(10, size - 1);
      const max = Math.pow(10, size);
      return Math.floor(_jx.random() * (max - min)) + min;
    },
    pickOne: (...op) => { return op[Math.floor(_jx.random() * op.length)]; }
  };
  return _jx;
})();