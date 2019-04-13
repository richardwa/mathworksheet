const funcMap = new Map();
const funcMapInverse = new Map();
const globalExec = '_jx_exec';
let counter = 0;

export const render = (f) => {
  const _render = () => {
    // reset references
    funcMap.clear();
    funcMapInverse.clear();
    counter = 0;

    // render
    const s = f();
    document.body.innerHTML = s;
    console.log('rendered');
  };
  _render();
  window[globalExec] = function(fname, elem) {
    const {f, args} = funcMap.get(fname);
    return f.call(elem, ...args);
  };
  return _render;
};

export const ref = (f, ...args) => {
  if (!funcMapInverse.has(f)) {
    const name = '_' + counter;
    counter++;

    funcMap.set(name, {f, args});
    funcMapInverse.set(f, name);
  }
  return `"${globalExec}('${funcMapInverse.get(f)}', this)"`;
};
