import { h, render, Component } from 'preact';
import { registerComponent, unregisterComponent } from './utils/urlstate';
import { Navbar, Link } from './components/navbar';
import { Welcome } from './pages/welcome';
import { Worksheet } from './pages/worksheet';
import { MathApp } from './pages/math-single';
import { LinePaper } from './pages/line-paper';
import { EarTraining } from './pages/ear-training';

const pages = {
  Home: Welcome,
  Worksheet: Worksheet,
  App: MathApp,
  'Line Paper': LinePaper,
  'Ear Training': EarTraining
}
type Pages = keyof typeof pages;
const pageList = Object.keys(pages) as Pages[];

export class Main extends Component<{}, { page: Pages }> {
  setPageFns = new Map<Pages, () => void>();
  constructor() {
    super();
    this.state = {
      page: 'Home'
    }
    pageList.forEach(page => {
      this.setPageFns.set(page, () => this.setState({ page }));
    });
  }

  componentDidMount() {
    registerComponent('main', this);
  }

  componentWillUnmount() {
    unregisterComponent('main');
  }

  renderPage() {
    const { page } = this.state;
    const Component = pages[page];
    if (Component) {
      return <Component />;
    } else {
      return <div>page not found</div>;
    }
  }

  render() {
    const { page } = this.state;
    return (
      <div>
        <Navbar>
          {pageList.map(p =>
            <Link current={page === p} onclick={this.setPageFns.get(p)}>{p}</Link>)}
        </Navbar>
        {this.renderPage()}
      </div>
    );
  }
}


render(<Main />, document.body);