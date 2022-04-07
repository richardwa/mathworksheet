"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Numpad = exports.key_clear = exports.key_bs = void 0;
const React = require("react");
const jss_1 = require("jss");
exports.key_bs = String.fromCharCode(8592);
exports.key_clear = 'C';
const { classes } = jss_1.default.createStyleSheet({
    button: {
        'font-size': '40pt',
        'text-align': 'center',
        'margin': '1px',
    },
    container: {
        'display': 'inline-grid',
        'vertical-align': 'top',
        'grid-template-columns': 'repeat(3, 4ch)',
        'grid-template-rows': 'repeat(4, 4ch)',
    },
}).attach();
exports.Numpad = ({ onInput }) => {
    const Cell = ({ c }) => React.createElement("button", { className: classes.button, onClick: () => onInput(c) }, c);
    window.onkeydown = function ({ key }) {
        // console.log(arguments);
        if (key === 'Escape') {
            onInput(exports.key_clear);
        }
        else if (key === 'Backspace') {
            onInput(exports.key_bs);
        }
        else if (`${key}`.match(/[0-9]/)) {
            onInput(key);
        }
    };
    return React.createElement("div", { className: classes.container },
        React.createElement(Cell, { c: "7" }),
        React.createElement(Cell, { c: "8" }),
        React.createElement(Cell, { c: "9" }),
        React.createElement(Cell, { c: "4" }),
        React.createElement(Cell, { c: "5" }),
        React.createElement(Cell, { c: "6" }),
        React.createElement(Cell, { c: "1" }),
        React.createElement(Cell, { c: "2" }),
        React.createElement(Cell, { c: "3" }),
        React.createElement(Cell, { c: "0" }),
        React.createElement(Cell, { c: exports.key_bs }),
        React.createElement(Cell, { c: exports.key_clear }));
};
//# sourceMappingURL=numpad.js.map