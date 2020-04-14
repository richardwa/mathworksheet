import { h } from '../lib/preact.js';
import { rand, pickOne, seedRandom } from '../js/random.js';
import { createSheet } from '../js/jss.js';
import { setState, updateState } from '../js/urlstate.js';

const { classes } = createSheet({
  container: {
    'font-size': '20pt',
    'font-family': 'monospace',
    'display': 'grid',
    'grid-template-columns': 'auto auto'
  },
  block: {
    'display': 'block',
    'margin': '2ch 1ch',
  },
  field: {
    'padding': '0 1ch',
  },
  questionNumber: {
    'font-size': '12pt',
    'color': 'gray',
  }
});

const div = (attr, ...args) => h('div', attr, ...args);
const span = (attr, ...args) =>
  h('span', { ...attr, class: classes.block }, ...args);
const field = (num) =>
  h('label', { class: [classes.field] }, num.toLocaleString());
const questionNumber = (i) => h('i', { class: [classes.questionNumber] },
  (i + 1).toString().padStart(2, '0') + ')');


function question(num, operations, ...rest) {
  const op = pickOne(...operations);
  const terms = rest.map((size, i) => rand(size));
  const expr = [];
  const plainExpr = [];
  for (let i in terms) {
    plainExpr.push(terms[i])
    expr.push(field(terms[i]));
    plainExpr.push(`${op}`);
    expr.push(`${op}`);
  }
  expr.pop();
  plainExpr.pop();
  const ans = eval(plainExpr.join(''));
  return span({ans}, questionNumber(num), ...expr, h('b', { title:  ans}, '='));
}

function pageNav(seed) {
  return h('center', null,
    h('button', { onClick: () => updateState({ seed: seed - 1 }) }, '<'),
    h('span', null, ` ${seed} `),
    h('button', { onClick: () => updateState({ seed: seed + 1 }) }, '>'),
  );

}

export default function render(state) {
  const { operations, termLengths, seed } = state;
  seedRandom(seed);
  const questions = Array.from({ length: 20 }, (x, i) => question(i, operations, ...termLengths));

  // conveniet get answers function
  window.getAnswers = () => questions.reduce((a, v, i) => {
    const ans = v.attributes.ans;
    a[i + 1] = ans;
    return a;
  }, {});

  return h('div', null,
    pageNav(seed),
    div({ class: classes.container },
      questions)
  );
}
