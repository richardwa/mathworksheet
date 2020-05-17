
/**
 * @typedef {Object} State
 * @property {}
 * 
 * 
 * 
 */


/** 
 * @param {string} url 
 * @returns {State}
 */
const parseStateFromURL = (url) => {
  try {
    let json;
    const index = url.indexOf('#');
    if (index >= 0) {
      const hash = url.substring(index + 1);
      json = JSON.parse(decodeURIComponent(hash));
    }
    return json;
  } catch (e) {
    return undefined;
  }
};

// initialize state on page load
let state = parseStateFromURL(location.href);

export const getState = (defaultState) => {
  if (state) {
    return state;
  } else {
    const url = `${document.location.pathname}#${JSON.stringify(defaultState)}`;
    history.replaceState(null, null, url);
    state = defaultState;
    return defaultState;
  }
};

const listeners = [];
export const onStateChange = f => {
  listeners.push(f);
};

window.onhashchange = (e) => {
  const json = parseStateFromURL(e.newURL);
  listeners.forEach(f => f(json, state));
  state = json;
};

export const updateState = (s) => {
  let hasChanges = false;
  for (let k in s) {
    if (state[k] !== s[k]) {
      hasChanges = true;
      break;
    }
  }
  if (hasChanges) {
    setState({ ...state, ...s });
  }
};

export const setState = (s, replace) => {
  if (s === state) {
    return;
  }
  const old = state;
  state = s;
  const url = `${document.location.pathname}#${JSON.stringify(s)}`;
  if (replace) {
    history.replaceState(null, null, url);
  } else {
    history.pushState(null, null, url);
  }
  listeners.forEach(f => f(s, old));
};
