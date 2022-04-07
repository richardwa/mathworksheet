"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathApp = void 0;
const React = require("react");
const react_1 = require("react");
const jss_1 = require("jss");
const urlstate_1 = require("../utils/urlstate");
const random_1 = require("../utils/random");
const numpad_1 = require("../components/numpad");
const fontSize = '40pt';
const { classes } = jss_1.default.createStyleSheet({
    correct: {
        'color': 'green',
    },
    container: {
        'font-size': fontSize,
        'display': 'flex',
        'flex-direction': 'row',
        'justify-content': 'center',
        'flex-wrap': 'wrap',
    },
    button: {
        'font-size': fontSize,
        'height': 'calc(4ch - 2px)',
        'width': '100%',
        'display': 'block',
    },
    label: {
        'display': 'block',
        'padding-right': '0.5ch',
        'height': '2ch',
        'text-align': 'right',
    },
    questionBox: {
        'margin-top': '1ch',
    },
    leftBox: { 'display': 'inline-block', 'width': '10ch', 'margin': '0 1ch 1ch 1ch' },
}).attach();
const operations = {
    '+': (a, b) => ({ symbol: '+', term1: a, term2: b, answer: a + b }),
    '-': (a, b) => ({ symbol: '-', term1: a, term2: b, answer: a + b }),
    '*': (a, b) => ({ symbol: '\u00D7', term1: a, term2: b, answer: a * b }),
    '/': (a, b) => ({ symbol: '\u00F7', term1: a * b, term2: b, answer: b })
};
class MathApp extends react_1.Component {
    constructor(props) {
        super(props);
        this.next = () => {
            const { seed } = this.state;
            this.setState({ seed: seed + 1, input: "" });
        };
        this.prev = () => {
            const { seed } = this.state;
            this.setState({ seed: seed - 1, input: "" });
        };
        this.onInput = (key) => {
            const { input } = this.state;
            if (key === numpad_1.key_clear) {
                this.setState({ input: '' });
            }
            else if (key === numpad_1.key_bs) {
                this.setState({ input: input.substring(0, input.length - 1) });
            }
            else {
                this.setState({ input: `${input}${key}`.substring(0, this.answerLength || 10) });
            }
            urlstate_1.nextHistoryWillReplace();
        };
        this.state = {
            operation: ['+'],
            len1: 4,
            len2: 4,
            input: "",
            seed: 1
        };
    }
    componentDidMount() {
        urlstate_1.registerComponent('app', this);
    }
    componentWillUnmount() {
        urlstate_1.unregisterComponent('app');
    }
    renderNextButton(correct) {
        const cls = [classes.button];
        if (correct) {
            cls.push(classes.correct);
        }
        return (React.createElement("button", { onClick: this.next, className: cls.join(' ') },
            React.createElement("b", null, correct ? 'CORRECT!' : 'skip')));
    }
    renderQuestion(p) {
        return (React.createElement("div", { className: classes.questionBox },
            React.createElement("label", { className: classes.label },
                " ",
                p.term1.toLocaleString(),
                " "),
            React.createElement("label", { className: classes.label },
                p.symbol,
                " ",
                p.term2.toLocaleString()),
            React.createElement("hr", null),
            React.createElement("label", { className: classes.label },
                p.input ? parseInt(p.input).toLocaleString() : "",
                " ")));
    }
    render() {
        const { seed, operation, len1, len2, input } = this.state;
        random_1.seedRandom(seed);
        const op = random_1.pickOne(...operation);
        const expr = operations[op](random_1.rand(len1), random_1.rand(len2));
        this.answerLength = `${expr.answer}`.length;
        return (React.createElement("div", { className: classes.container },
            React.createElement("div", null,
                React.createElement("button", { onClick: this.prev }, "<"),
                React.createElement("span", null,
                    " ",
                    seed,
                    " "),
                React.createElement("button", { onClick: this.next }, ">")),
            React.createElement("div", { className: classes.leftBox },
                this.renderNextButton(expr.answer === parseInt(input)),
                this.renderQuestion({ symbol: expr.symbol, term1: expr.term1, term2: expr.term2, input })),
            React.createElement(numpad_1.Numpad, { onInput: this.onInput })));
    }
}
exports.MathApp = MathApp;
//# sourceMappingURL=math-single.js.map