import {h, render, Component, rerender} from './lib/preact.js';
import {getState, onStateChange} from './js/urlstate.js';

const defaultState = {};

class Main extends Component {
  constructor() {
    super();
    this.setState(getState(defaultState));
    this.componentCache = new Map();
    this.fetchPage(this.state.page);
    onStateChange((newState) => {
      this.fetchPage(newState.page);
      this.setState(newState);
    });
  }


  fetchPage(page) {
    const componentName = page || 'welcome';
    if (!this.componentCache.has(componentName)) {
      import(`./pages/${componentName}.js`) .then((mod) => {
        this.componentCache.set(componentName, mod.default);
        this.setState({loaded: componentName});
      });
    }
  }

  render(props, state) {
    console.log('rendering');
    const {page, ...rest} = state;
    const componentName = page || 'welcome';
    const component = this.componentCache.get(componentName);
    return component? component(rest): null;
  }
}
render(h(Main), document.body);