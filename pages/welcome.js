
import {h} from '../lib/preact.js';
import {setState, updateState} from '../js/urlstate.js';

const h1 = (t) => h('h1', null, t);
const h2 = (t) => h('h2', null, t);
const ul = (...li) => h('ul', null, li);
const li = (t) => h('li', null, t);
const a = (attr, ...args) => h('a', {...attr, href: 'javascript:;'}, ...args);

const settings = {
  operations: ['+', '-'],
  termLengths: [2, 2],
};

const alphabets = Array.from({length:26},(x,i) => String.fromCharCode(i+('a'.charCodeAt(0))));
const numbers = Array.from({length:20},(x,i) => `${i}`);
const page = () => h('div', null, [
  h1('Math World'),
  h2('Worksheets - Print outs'),
  ul(
     li(a({onclick: () => updateState({page: 'worksheet', ...settings})},
      'math worksheet (2 digits)')),
     li(a({onclick: () => updateState({page: 'line-paper', lines: alphabets})}, 
      'writing letters')),
     li(a({onclick: () => updateState({page: 'line-paper', lines: numbers})}, 
      'writing numbers')),
  ),
  h2('Online Problems'),
  ul(
     li(a({onclick: () => updateState({page: 'math-single', ...settings})},
       'Add and Subtracting excercises')))
]);

export default page;