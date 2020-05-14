import { h, render, Component } from './preact.js';
import htm from './htm.js';

const html = htm.bind(h);
export { html as h, render, Component };