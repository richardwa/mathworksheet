"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinePaper = exports.modes = void 0;
const React = require("react");
const react_1 = require("react");
const jss_1 = require("jss");
const urlstate_1 = require("../utils/urlstate");
const size = '30pt';
const { classes } = jss_1.default.createStyleSheet({
    container: {
        'font-size': size,
        'width': '14in'
    },
    label: {
        'display': 'block',
        'text-align': 'left',
        'border-top': '1px solid black',
        'border-bottom': '1px solid black',
        'margin': '10px',
        'height': size,
    },
    text: {
        'font-weight': 'normal',
        'margin-top': '-1.2rem',
        'position': 'absolute',
        'font-family': 'Arial'
    },
    centerline: {
        'height': '50%',
        'border-bottom': '1px dashed black',
    }
}).attach();
const line = (ch) => React.createElement("label", { className: classes.label },
    React.createElement("div", { className: classes.centerline }),
    React.createElement("b", { className: classes.text }, ch));
const blankArray = Object.freeze(Array.from({ length: 26 }));
exports.modes = {
    blank: blankArray.map((x, i) => ''),
    letters: blankArray.map((x, i) => String.fromCharCode(i + ('a'.charCodeAt(0)))),
    capitals: blankArray.map((x, i) => String.fromCharCode(i + ('A'.charCodeAt(0)))),
    numbers: blankArray.map((x, i) => `${i % 10}`)
};
class LinePaper extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "blank"
        };
    }
    componentDidMount() {
        urlstate_1.registerComponent('line', this);
    }
    componentWillUnmount() {
        urlstate_1.unregisterComponent('line');
    }
    render() {
        const { mode } = this.state;
        return React.createElement("div", { className: classes.container }, exports.modes[mode].map(line));
    }
}
exports.LinePaper = LinePaper;
//# sourceMappingURL=line-paper.js.map