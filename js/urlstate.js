export const getState = (defaultFn) => {
  if (document.location.hash) {
    const s = document.location.hash.substring(1);
    return JSON.parse(decodeURIComponent(s));
  } else {
    const state = defaultFn ? defaultFn() : null;
    setState(state);
    return state;
  }
};

export const setState = (state) => {
  document.location = `${document.location.pathname}#${JSON.stringify(state)}`;
  return state;
};

const listeners = [];
export const onStateChange = f => {
  listeners.push(f);
};

window.onhashchange = function() {
  const state = getState();
  listeners.forEach(f => f(state));
}