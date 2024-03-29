import { Component } from 'react';

let historySkip: number = 0;
export const nextHistoryWillReplace = () => historySkip++;

const defaultEquals = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return JSON.stringify(a) === JSON.stringify(b);
  }
}

type StateMap = {
  [s: string]: any
};

type RegisterParams = {
  originalSetState: Component['setState'],
  component: Component
}

const urlState = (() => {
  const parseStateFromURL = (url: string): StateMap => {
    try {
      const index = url.indexOf('#');
      if (index >= 0) {
        const hash = url.substring(index + 1);
        return JSON.parse(decodeURIComponent(hash));
      } else {
        return {};
      }
    } catch (e) {
      console.log(e);
      return {};
    }
  };

  const setStateIntoURL = (s: StateMap) => {
    const url = `${document.location.pathname}#${JSON.stringify(s)}`;
    if (historySkip > 0) {
      historySkip--;
      window.history.replaceState(null, null, url);
    } else {
      window.history.pushState(null, null, url);
    }
  };

  // initialize state on page load
  let state: StateMap = parseStateFromURL(document.location.href);
  const registry = new Map<string, RegisterParams>();

  window.onhashchange = (e) => {
    const newState = parseStateFromURL(e.newURL);
    registry.forEach(({ originalSetState, component }, key) => {
      if (!defaultEquals(state[key], newState[key])) {
        originalSetState.call(component, newState[key]);
      }
    });
    state = newState;
  };

  return {
    registry: () => registry,
    get: (instanceId: string) => state[instanceId],
    set: (instanceId: string, s: any) => {
      state[instanceId] = s;
      setStateIntoURL(state);
    },
    remove: (instanceId: string) => {
      delete state[instanceId];
      setStateIntoURL(state);
      nextHistoryWillReplace();
    }
  }
})();

export const registerComponent = (instanceId: string, component: Component) => {
  const originalSetState = component.setState;
  component.setState = (a, cb) => {
    originalSetState.call(component, a, () => {
      urlState.set(instanceId, component.state);
      if (cb) {
        cb();
      }
    });
  };
  urlState.registry().set(instanceId, { component, originalSetState });

  // reconcile url state and app state
  const stateFromURL = urlState.get(instanceId);
  if (stateFromURL) {
    component.setState(stateFromURL);
  } else {
    urlState.set(instanceId, component.state);
  }
}

export const unregisterComponent = (instanceId: string) => {
  urlState.registry().delete(instanceId);
  urlState.remove(instanceId);
}