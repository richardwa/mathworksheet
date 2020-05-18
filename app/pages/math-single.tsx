import { h } from 'preact';
import jss from 'jss';

import { getState, setState } from '../utils/urlstate';
import { rand, pickOne, seedRandom } from '../utils/random';
import numpad, { key_bs, key_clear } from '../components/numpad';
import { cn } from '../utils/util';

const fontSize = '40pt';
const { classes } = jss.createStyleSheet({
  correct: {
    'color': 'green',
  },
  container: {
    'font-size': fontSize,
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'center',
    'flex-wrap': 'wrap',
  },
  button: {
    'font-size': fontSize,
    'height': 'calc(4ch - 2px)',
    'width': '100%',
    'display': 'block',
  },
  label: {
    'display': 'block',
    'padding-right': '0.5ch',
    'height': '2ch',
    'text-align': 'right',
  },
  questionBox: {
    'margin-top': '1ch',
  },
  leftBox:
    { 'display': 'inline-block', 'width': '10ch', 'margin': '0 1ch 1ch 1ch' },
}).attach();

const operations = {
  '+': (a, b) => [a, '+', b, '=', a + b],
  '-': (a, b) => {
    const x = Math.max(a, b);
    const y = Math.min(a, b);
    return [x, '-', y, '=', x - y];
  },
  '*': (a, b) => [a, '\u00D7', b, '=', a * b],
  '/': (a, b) => {
    const x = a * b;
    const y = a;
    return [x, '\u00F7', y, '=', b];
  }
};

function isCorrect({ answer, terms, op }) {
  const expr = operations[op](...terms);
  const correct = `${expr[4]}` === `${answer}`;
  return correct;
}

function field(term, op = '') {
  return h('label', { class: [classes.label] },
    `${op} ${term ? term.toLocaleString() : ''}`);
}

function createQuestion({ terms, op, answer }) {
  const expr = operations[op](...terms);
  const firstField = field(expr[0]);
  const secondField = field(expr[2], expr[1]);

  return h('div', { class: [classes.questionBox] }, firstField, secondField,
    h('hr'), field(parseInt(answer)));
}

function next(replace) {
  const state = getState();
  const { operations, termLengths } = state;
  const op = pickOne(...operations);
  const terms = termLengths.map(rand);
  const seed = Math.random();
  setState({ ...state, answer: '', op, terms, seed }, replace === true);
}

function nextButton() {
  const correct = isCorrect(getState());
  return h('button',
    {
      onclick: next,
      class: cn({ [classes.correct]: correct, [classes.button]: true })
    },
    correct ? h('b', null, 'CORRECT!') : 'skip');
}

function onInput(key) {
  const state = getState();
  // use setState(..., true) here so that browser history doesnt grow from key
  // strokes
  if (key === key_clear) {
    setState({ ...state, answer: '' }, true);
  } else if (key === key_bs) {
    setState(
      { ...state, answer: state.answer.substring(0, state.answer.length - 1) },
      true);
  } else {
    const { terms, op } = state;
    const answer = operations[op](...terms)[4];
    const maxLength = `${answer}`.length + 1;
    setState({ ...state, answer: `${state.answer}${key}`.substring(0, maxLength) },
      true);
  }
}

export default function render(props) {
  const { terms , seed} = props;
  seedRandom(seed);
  console.log(props);
  if (terms) {
    return h('div', { class: [classes.container] },
      h('div', { class: [classes.leftBox] }, nextButton(),
        createQuestion(props)),
      numpad({ onInput }));
  } else {
    next(true);
    return null;
  }
}
