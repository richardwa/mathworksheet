"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worksheet = void 0;
const React = require("react");
const react_1 = require("react");
const random_1 = require("../utils/random");
const urlstate_1 = require("../utils/urlstate");
const jss_1 = require("jss");
const { classes } = jss_1.default.createStyleSheet({
    container: {
        'font-size': '20pt',
        'display': 'grid',
        'grid-template-columns': 'auto auto'
    },
    block: {
        'display': 'block',
        'margin': '2ch 1ch',
    },
    field: {
        'padding': '0 1ch',
    },
    center: {
        'text-align': 'center',
    },
    questionNumber: {
        'font-size': '12pt',
        'color': 'gray',
    }
}).attach();
const Field = ({ num }) => React.createElement("label", { className: classes.field }, num.toLocaleString());
const Question = ({ num, operations, termLengths }) => {
    const op = random_1.pickOne(...operations);
    const terms = termLengths.map((size, i) => random_1.rand(size));
    const expr = [];
    const plainExpr = [];
    for (let i in terms) {
        plainExpr.push(terms[i]);
        expr.push(React.createElement(Field, { num: terms[i] }));
        plainExpr.push(`${op}`);
        expr.push(`${op}`);
    }
    expr.pop();
    plainExpr.pop();
    const ans = eval(plainExpr.join(''));
    return (React.createElement("span", { title: ans, className: [classes.block, 'question'].join(' ') },
        React.createElement("i", { className: classes.questionNumber },
            (num + 1).toString().padStart(2, '0'),
            ")"),
        expr,
        React.createElement("b", null, "=")));
};
class Worksheet extends react_1.Component {
    constructor(props) {
        super(props);
        this.next = () => {
            const { seed } = this.state;
            this.setState({ seed: seed + 1 });
        };
        this.prev = () => {
            const { seed } = this.state;
            this.setState({ seed: seed - 1 });
        };
        this.state = {
            operations: ['+', '-'],
            termLengths: [2, 2, 2, 1],
            seed: 1
        };
    }
    componentDidMount() {
        urlstate_1.registerComponent('ws', this);
    }
    componentWillUnmount() {
        urlstate_1.unregisterComponent('ws');
    }
    render() {
        const { operations, termLengths, seed } = this.state;
        random_1.seedRandom(seed);
        const questions = Array.from({ length: 20 }, (x, i) => React.createElement(Question, { num: i, operations: operations, termLengths: termLengths }));
        return [
            React.createElement("div", { className: classes.center },
                React.createElement("button", { onClick: this.prev }, "<"),
                React.createElement("span", null,
                    " ",
                    seed,
                    " "),
                React.createElement("button", { onClick: this.next }, ">")),
            React.createElement("div", { className: classes.container }, questions)
        ];
    }
}
exports.Worksheet = Worksheet;
// conveniet get answers function
// @ts-ignore
window.getAnswers = () => {
    document.querySelectorAll(".question").forEach((v, i) => {
        // @ts-ignore
        console.log(i + 1, v.attributes.title.value);
    });
};
//# sourceMappingURL=worksheet.js.map