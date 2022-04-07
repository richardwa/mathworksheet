import * as React from 'react';
import { Component } from 'react';

import { registerComponent, unregisterComponent } from './utils/urlstate';
import { Navbar, Link } from './components/navbar';
import { Welcome, Worksheet, MathApp, EarTraining, LinePaper, } from './pages'

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
    super({});
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
    const PageComponent = pages[page];
    if (PageComponent) {
      return <PageComponent />;
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
            <Link current={page === p} onclick={this.setPageFns.get(p) as () => void }>{p}</Link>)}
        </Navbar>
        {this.renderPage()}
      </div>
    );
  }
}


export default Main;