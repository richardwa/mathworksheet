
const getHashState = () => {
  try {
    const s = document.location.hash.substring(1);
    const json = JSON.parse(decodeURIComponent(s));
    return json;
  } catch (e) {
    return undefined;
  }
};

let state = getHashState();

export const getState = (defaultState) => {
  if (state) {
    return state;
  } else {
    setState(defaultState);
  }
};

const listeners = [];
export const onStateChange = f => {
  listeners.push(f);
};

const onhashchange = () => {
  const newState = getHashState();
  listeners.forEach(f => f(newState, state));
  state = newState;
};
window.onhashchange = onhashchange;

export const updateState = (s) => {
  let hasChanges = false;
  for (let k in s) {
    if (state[k] !== s[k]) {
      hasChanges = true;
      break;
    }
  }
  if (hasChanges) {
    setState({...state, ...s});
  }
};

export const setState = (s) => {
  if (s === state) {
    return;
  }
  document.location = `${document.location.pathname}#${JSON.stringify(s)}`;
};
