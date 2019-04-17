import {h} from '../lib/preact.js';
import {setState, updateState} from '../js/urlstate.js';
import {createSheet} from '../js/jss.js';

const fontSize = '14pt';
const {classes} = createSheet({
  navbar: {
    'margin-bottom': '20px',
    'font-size': fontSize,
  },
  button: {
    'font-size': fontSize,
    'text-decoration': 'none',
  }
});


const settings = {
  operations: ['+', '-'],
  termLengths: [4, 4],
};
const alphabets = Array.from(
    {length: 26}, (x, i) => String.fromCharCode(i + ('a'.charCodeAt(0))));
const numbers = Array.from({length: 20}, (x, i) => `${i}`);

const Link = (name, url, settings) =>
    h('button', {onclick: () => setState({page: url, ...settings}), class:[classes.button]}, name);
const Sep = h('b', null, '|');
const Home = Link('Home', './pages/welcome.js');
const PrintAdd = Link('Worksheet', './pages/worksheet.js', settings);
const PrintAlpha =
    Link('Numbers', './pages/line-paper.js', {lines: numbers});
const PrintNumber =
    Link('Alphabets', './pages/line-paper.js', {lines: alphabets});
const App = Link('Quiz', './pages/math-single.js', settings);



export const navbar = () => h('div', {class: [classes.navbar, 'no-print'].join(' ')}, [
  Home,
  Sep,
  'Print Outs: ',
  PrintAdd,
  PrintNumber,
  PrintAlpha,
  Sep,
  'App: ',
  App,
]);
