export const getState = (defaultFn) => {
  try {
    const s = document.location.hash.substring(1);
    const state = JSON.parse(decodeURIComponent(s));
    if (state) {
      return state;
    } else {
      throw new Error('no state found');
    }
  } catch (e) {
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