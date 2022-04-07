"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unregisterComponent = exports.registerComponent = exports.nextHistoryWillReplace = void 0;
let historySkip = 0;
exports.nextHistoryWillReplace = () => historySkip++;
const defaultEquals = (a, b) => {
    if (a === b) {
        return true;
    }
    else {
        return JSON.stringify(a) === JSON.stringify(b);
    }
};
const urlState = (() => {
    const parseStateFromURL = (url) => {
        try {
            const index = url.indexOf('#');
            if (index >= 0) {
                const hash = url.substring(index + 1);
                return JSON.parse(decodeURIComponent(hash));
            }
            else {
                return {};
            }
        }
        catch (e) {
            console.log(e);
            return {};
        }
    };
    const setStateIntoURL = (s) => {
        const url = `${document.location.pathname}#${JSON.stringify(s)}`;
        if (historySkip > 0) {
            historySkip--;
            history.replaceState(null, null, url);
        }
        else {
            history.pushState(null, null, url);
        }
    };
    // initialize state on page load
    let state = parseStateFromURL(location.href);
    const registry = new Map();
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
        get: (instanceId) => state[instanceId],
        set: (instanceId, s) => {
            state[instanceId] = s;
            setStateIntoURL(state);
        },
        remove: (instanceId) => {
            delete state[instanceId];
            setStateIntoURL(state);
            exports.nextHistoryWillReplace();
        }
    };
})();
exports.registerComponent = (instanceId, component) => {
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
    }
    else {
        urlState.set(instanceId, component.state);
    }
};
exports.unregisterComponent = (instanceId) => {
    urlState.registry().delete(instanceId);
    urlState.remove(instanceId);
};
//# sourceMappingURL=urlstate.js.map