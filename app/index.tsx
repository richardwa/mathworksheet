import { h, render, Component } from 'preact';
import { registerComponent, unregisterComponent } from './utils/urlstate';
import { Navbar, Link } from './components/navbar';
import { Welcome } from './pages/welcome';
import { Worksheet } from './pages/worksheet';
import { MathApp } from './pages/math-single';
import { LinePaper } from './pages/line-paper';
import { EarTraining } from './pages/ear-training';

enum Pages {
  home = 'h',
  worksheet = 'ws',
  app = 'app',
  lines = 'line',
  ear = 'ear'
}

export class Main extends Component<{}, { page: Pages }> {
  constructor() {
    super();
    this.state = {
      page: Pages.home
    }
  }

  componentDidMount() {
    registerComponent('main', this);
  }

  componentWillUnmount() {
    unregisterComponent('main');
  }

  setHome = () => {
    this.setState({ page: Pages.home });
  }

  setWorksheet = () => {
    this.setState({ page: Pages.worksheet });
  }

  setApp = () => {
    this.setState({ page: Pages.app });
  }
  setLine = () => {
    this.setState({ page: Pages.lines });
  }
  setEar = () => {
    this.setState({ page: Pages.ear });
  }

  renderPage() {
    const { page } = this.state;
    switch (page) {
      case Pages.home:
        return <Welcome main={this} />;
      case Pages.worksheet:
        return <Worksheet />;
      case Pages.app:
        return <MathApp />;
      case Pages.ear:
        return <EarTraining />;
      case Pages.lines:
        return <LinePaper mode="alpha" />;
      default:
        return <div>page not found</div>
    }
  }
  render() {
    const { page } = this.state;
    return (
      <div>
        <Navbar>
          <Link current={page === Pages.home} onclick={this.setHome}>Home</Link>
          <Link current={page === Pages.worksheet} onclick={this.setWorksheet}>Worksheet</Link>
          <Link current={page === Pages.app} onclick={this.setApp}>App</Link>
          <Link current={page === Pages.lines} onclick={this.setLine}>Line Paper</Link>
          <Link current={page === Pages.ear} onclick={this.setEar}>Ear Training</Link>
        </Navbar>
        {this.renderPage()}
      </div>
    );
  }
}


render(<Main />, document.body);