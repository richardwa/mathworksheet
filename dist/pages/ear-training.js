"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarTraining = void 0;
const React = require("react");
const react_1 = require("react");
const synth_1 = require("../utils/synth");
const random_1 = require("../utils/random");
const urlstate_1 = require("../utils/urlstate");
const play = ({ base, steps }) => {
    const volume = 80;
    synth_1.synth.noteOn("base", base, volume, 3000);
    setTimeout(() => {
        synth_1.synth.noteOn("top", base + steps, volume, 2000);
    }, 1000);
};
const generate = (seed) => {
    random_1.seedRandom(seed);
    const steps = random_1.randRange(0, 12) + 1;
    const base = random_1.randRange(40, 80 - steps) + 1;
    return { base, steps };
};
class EarTraining extends react_1.Component {
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
        this.onclick = () => {
            const { seed } = this.state;
            const interval = generate(seed);
            play(interval);
        };
        this.state = {
            seed: 1
        };
    }
    componentDidMount() {
        urlstate_1.registerComponent('ear', this);
    }
    componentWillUnmount() {
        urlstate_1.unregisterComponent('ear');
    }
    render() {
        const { seed } = this.state;
        const interval = generate(seed);
        return (React.createElement("div", null,
            React.createElement("button", { onClick: this.prev }, "<"),
            React.createElement("button", { onClick: this.onclick },
                "Play ",
                seed),
            React.createElement("button", { onClick: this.next }, ">")));
    }
}
exports.EarTraining = EarTraining;
//# sourceMappingURL=ear-training.js.map