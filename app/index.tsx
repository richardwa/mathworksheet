import { h, render, Component } from 'preact';
import { getState, onStateChange } from './utils/urlstate.js';
import { Navbar } from './components/navbar';


// set default state into url
const state = getState({
  page: './pages/welcome.js',
  navButton: 'Home'
});


class Main extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}


render(<Main />, document.body);