import { h, render, Component } from './lib/index.js';
import { getState, onStateChange } from './js/urlstate.js';
import { navbar } from './components/navbar.js';


const defaultState = {
  page: './pages/welcome.js',
  navButton: 'Home'
};

class Main extends Component {
  constructor() {
    super();
    console.log('Main::new');
    this.componentCache = new Map();
    const state = getState(defaultState);
    this.fetchPage(state.page);
    onStateChange((newState = defaultState, oldState) => {
      this.fetchPage(newState.page);
      // required for forcing update
      // somehow forceUpdate() does not work here
      // we actually are not using the actual state anywhere
      this.setState(newState);
    });
  }


  fetchPage(page) {
    if (page && !this.componentCache.has(page)) {
      console.log('fetching', page);
      import(page).then((mod) => {
        this.componentCache.set(page, mod.default);
        this.forceUpdate();
      });
    }
  }

  render() {
    const state = getState(defaultState);
    const { page, ...rest } = state;
    const component = this.componentCache.get(page);
    console.log('rendering', page, state);

    return h`
      <div>
        <${navbar}/>
        ${component && h`<${component} ...${rest}/>`}
      </div>
    `;
  }
}
render(h`<${Main}/>`, document.body);