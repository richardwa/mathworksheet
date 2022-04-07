"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickOne = exports.rand = exports.randRange = exports.seedRandom = void 0;
const alea_1 = require("alea");
let arng = alea_1.default(Math.random());
exports.seedRandom = (seed) => {
    arng = alea_1.default(seed);
};
exports.randRange = (min, max) => {
    return Math.floor(arng() * (max - min)) + min;
};
exports.rand = (size) => {
    const min = Math.pow(10, size - 1) + 1;
    const max = Math.pow(10, size);
    return exports.randRange(min, max);
};
exports.pickOne = (...op) => {
    return op[Math.floor(arng() * op.length)];
};
//# sourceMappingURL=random.js.map