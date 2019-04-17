import {h} from '../lib/preact.js';
import {setState, updateState} from '../js/urlstate.js';
import {createSheet} from '../js/jss.js';

const {classes} = createSheet({
  container: {
    'font-size': '18pt',
  },
  a: {
    'text-decoration': 'none',
  }
});

const h1 = (t) => h('h1', null, t);
const h2 = (t) => h('h2', null, t);
const ul = (...li) => h('ul', null, li);
const li = (t) => h('li', null, t);
const a = (attr, ...args) =>
    h('a', {...attr, class: [classes.a], href: 'javascript:;'}, ...args);

const settings = {
  operations: ['+', '-'],
  termLengths: [4, 4],
};

const alphabets = Array.from(
    {length: 26}, (x, i) => String.fromCharCode(i + ('a'.charCodeAt(0))));
const numbers = Array.from({length: 20}, (x, i) => `${i}`);
const page = () => h('div', {class: [classes.container]}, [
  h1('Math World'),
  h2('Print outs'),
  ul(li(a({onclick: () => updateState({page: './pages/worksheet.js', ...settings})},
          'Add/Subtract worksheet')),
     li(a({onclick: () => updateState({page: './pages/line-paper.js', lines: alphabets})},
          'line paper - letters')),
     li(a({onclick: () => updateState({page: './pages/line-paper.js', lines: numbers})},
          'line paper - numbers')), ),
  h2('Online App'),
  ul(li(a({onclick: () => updateState({page: './pages/math-single.js', ...settings})},
          'Add/Subtract practice (tablet optimized)')))
]);

export default page;