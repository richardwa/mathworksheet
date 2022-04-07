"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Welcome = void 0;
const React = require("react");
const react_1 = require("react");
const line_paper_1 = require("./line-paper");
const jss_1 = require("jss");
const { classes } = jss_1.default.createStyleSheet({
    container: {
        'font-size': '18pt',
        'margin': '10px',
    },
    a: {
        'text-decoration': 'none',
    }
}).attach();
class Welcome extends react_1.Component {
    render() {
        return (React.createElement("div", { className: classes.container },
            React.createElement("h1", null, "Math World"),
            React.createElement("h2", null, "Print outs"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { className: classes.a, href: '#{"main":{"page":"Worksheet"},"ws":{"operations":["+","-"],"termLengths":[2,2,2,1],"seed":1}}' }, "add/subtract")),
                React.createElement("li", null,
                    React.createElement("a", { className: classes.a, href: '#{"main":{"page":"Worksheet"},"ws":{"operations":["*"],"termLengths":[2,1],"seed":1}}' }, "times")),
                Object.keys(line_paper_1.modes).map(mode => (React.createElement("li", null,
                    React.createElement("a", { className: classes.a, href: `#{"main":{"page":"Line Paper"},"line":{"mode":"${mode}"}}` },
                        "line paper - ",
                        mode))))),
            React.createElement("h2", null, "Online App"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { className: classes.a, href: '#{"main":{"page":"App"},"app":{"operation":["+"],"len1":4,"len2":4,"input":"","seed":1}}' }, "addition")),
                React.createElement("li", null,
                    React.createElement("a", { className: classes.a, href: '#{"main":{"page":"App"},"app":{"operation":["+","-"],"len1":4,"len2":4,"input":"","seed":1}}' }, "add/subtract")),
                React.createElement("li", null,
                    React.createElement("a", { className: classes.a, href: '#{"main":{"page":"App"},"app":{"operation":["*"],"len1":2,"len2":1,"input":"","seed":1}}' }, "times")))));
    }
}
exports.Welcome = Welcome;
//# sourceMappingURL=welcome.js.map