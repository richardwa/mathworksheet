import {h} from '../lib/preact.js';
import {rand, pickOne} from '../js/random.js';
import {createSheet} from '../js/jss.js';

const {classes} = createSheet({
  container: {
    'font-size': '20pt',
    'font-family': 'monospace',
  },
  block: {
    'display': 'block',
    'margin':'1ch',
  },
  field: {
    'padding': '0 1ch',
  },
  questionNumber: {
      'font-size': '12pt',
      'color':'gray',
  }
});

const div = (attr, ...args) => h('div', attr, ...args);
const span = (attr, ...args) =>
    h('span', {...attr, class: classes.block}, ...args);
const field = (num) =>
    h('label', {class: [classes.field]}, num.toLocaleString());
const questionNumber = (i) =>
    h('i', {class:[classes.questionNumber]}, (i + 1).toString().padStart(2, '0') + ')');


function question(num, operations, ...rest) {
  const op = pickOne(...operations);
  const terms = rest.map((size, i) => rand(size));
  const expr = [];
  for (let i in terms) {
    expr.push(field(terms[i]));
    expr.push(`${op}`);
  }
  expr.pop();
  return span(null, questionNumber(num), ...expr, '=');
}

export default function render(state) {
  const {operations, termLengths} = state;
  const createQuestion = (x, i) => question(i, operations, ...termLengths);
  return div({class: classes.container},
             Array.from({length: 20}, createQuestion));
}
