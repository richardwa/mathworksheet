// page state is stored in the url hash as a json blob after the route:
//   #/worksheet/{"operations":["+","-"],"termLengths":[2,2,2,1],"seed":1}
export const parseState = <T>(stateJson?: string): Partial<T> => {
  try {
    if (!stateJson) return {};
    return JSON.parse(decodeURIComponent(stateJson));
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const setStateInUrl = (path: string, state: Record<string, unknown>) => {
  history.replaceState(null, "", `#${path}/${JSON.stringify(state)}`);
};
