"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const React = require("react");
const ReactDOM = require("react-dom");
const urlstate_1 = require("./utils/urlstate");
const navbar_1 = require("./components/navbar");
const pages_1 = require("./pages");
const react_1 = require("react");
const pages = {
    Home: pages_1.Welcome,
    Worksheet: pages_1.Worksheet,
    App: pages_1.MathApp,
    'Line Paper': pages_1.LinePaper,
    'Ear Training': pages_1.EarTraining
};
const pageList = Object.keys(pages);
class Main extends react_1.Component {
    constructor(props) {
        super(props);
        this.setPageFns = new Map();
        this.state = {
            page: 'Home'
        };
        pageList.forEach(page => {
            this.setPageFns.set(page, () => this.setState({ page }));
        });
    }
    componentDidMount() {
        urlstate_1.registerComponent('main', this);
    }
    componentWillUnmount() {
        urlstate_1.unregisterComponent('main');
    }
    renderPage() {
        const { page } = this.state;
        const PageComponent = pages[page];
        if (PageComponent) {
            return React.createElement(PageComponent, null);
        }
        else {
            return React.createElement("div", null, "page not found");
        }
    }
    render() {
        const { page } = this.state;
        return (React.createElement("div", null,
            React.createElement(navbar_1.Navbar, null, pageList.map(p => React.createElement(navbar_1.Link, { current: page === p, onclick: this.setPageFns.get(p) }, p))),
            this.renderPage()));
    }
}
exports.Main = Main;
ReactDOM.render(React.createElement(Main, null), document.body);
//# sourceMappingURL=index.js.map