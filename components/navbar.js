import { h } from '../lib/preact.js';
import { setState, getState } from '../js/urlstate.js';
import { createSheet } from '../js/jss.js';

const fontSize = '14pt';
const { classes } = createSheet({
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
  }
});

const print =
  createSheet({ noPrint: { 'display': 'none !important' } }, { media: 'print' });

const settings = {
  operations: ['+', '-'],
  termLengths: [4, 4],
};
const alphabets = Array.from(
  { length: 26 }, (x, i) => String.fromCharCode(i + ('a'.charCodeAt(0))));
const alphabetCaps = Array.from(
  { length: 26 }, (x, i) => String.fromCharCode(i + ('A'.charCodeAt(0))));
const numbers = Array.from({ length: 26 }, (x, i) => `${i % 10}`);

const Link = (name, page, settings) => {
  const state = getState();
  const css = [classes.button];
  if (state.navButton === name) {
    css.push(classes.current);
  }
  return h('button',
    {
      onclick: () => setState({ page, navButton: name, ...settings, seed: Math.floor(Math.random() * 1000) }),
      class: css.join(' ')
    },
    name);
};

const Sep = h('b', null, '|');
const Home = () => Link('Home', './pages/welcome.js');
const PrintAdd = () => Link('Worksheet', './pages/worksheet.js', settings);
const PrintNumber = () =>
  Link('Numbers', './pages/line-paper.js', { lines: numbers });
const PrintAlpha = () =>
  Link('alphabet', './pages/line-paper.js', { lines: alphabets });
const PrintAlphaCaps = () =>
  Link('ALPHABET', './pages/line-paper.js', { lines: alphabetCaps });
const App = () => Link('App', './pages/math-single.js', settings);



export const navbar = () =>
  h('div', { class: [classes.navbar, print.classes.noPrint].join(' ') }, Home(),
    Sep, 'Writing sheets: ', PrintNumber(), PrintAlpha(), PrintAlphaCaps(),
    Sep, 'Math: ', App(), PrintAdd());