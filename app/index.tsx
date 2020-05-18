import { h, render, Component } from 'preact';
import { registerComponent, unregisterComponent } from './utils/urlstate';
import { Navbar, Link } from './components/navbar';
import { Welcome } from './pages/welcome';
import { Worksheet } from './pages/worksheet';

enum Pages {
  home = 'h',
  worksheet = 'ws',
  app = 'app'
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

  renderPage() {
    const { page } = this.state;
    switch (page) {
      case Pages.home:
        return <Welcome main={this} />;
      case Pages.worksheet:
        return <Worksheet />;
      case Pages.app:
        return <div>app</div>;
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
        </Navbar>
        {this.renderPage()}
      </div>
    );
  }
}


render(<Main />, document.body);