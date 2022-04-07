"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = exports.Link = void 0;
const React = require("react");
const jss_1 = require("jss");
const fontSize = '14pt';
const { classes: css } = jss_1.default.createStyleSheet({
    navbar: {
        'margin-bottom': '20px',
        'font-size': fontSize,
        'background-color': '#9bc3c8',
        'padding': '10px',
    },
    current: {
        'text-decoration': 'underline',
    },
    button: {
        'cursor': 'pointer',
        'font-size': fontSize,
        'margin': '2px',
    },
    buttonRight: {
        'cursor': 'pointer',
        'font-size': fontSize,
        'margin': '2px',
        'float': 'right'
    }
}).attach();
const { classes: print } = jss_1.default.createStyleSheet({
    noPrint: { 'display': 'none !important' }
}, { media: 'print' }).attach();
exports.Link = ({ onclick, current, children }) => {
    const classes = [css.button];
    if (current) {
        classes.push(css.current);
    }
    return React.createElement("button", { className: classes.join(' '), onClick: onclick }, children);
};
const getURL = () => {
    alert(decodeURI(location.href));
};
exports.Navbar = ({ children }) => React.createElement("div", { className: [css.navbar, print.noPrint].join(' ') },
    children,
    React.createElement("button", { className: css.buttonRight, onClick: getURL }, "Get URL"));
//# sourceMappingURL=navbar.js.map