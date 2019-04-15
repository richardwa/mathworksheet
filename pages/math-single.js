import {h} from '../lib/preact.js';
import {createSheet} from '../js/jss.js';

import {getState, setState} from '../js/urlstate.js';
import {rand, pickOne} from '../js/random.js';
import numpad, {key_bs, key_clear} from './numpad.js';
import {cn} from '../js/util.js';

const {classes} = createSheet({
  correct: {
    'color': 'green',
  },
});


function getExpr(terms) {
  return terms.map(({term, op}) => `${op} ${term}`).join(' ');
};

function isCorrect({answer, terms}) {
  const expr = getExpr(terms);
  const solution = eval(expr);
  const correct = `${solution}` === `${answer}`;
  return correct;
}

function generateTerms({operations, termLengths}) {
  for (let i = 0; i < 10000; i++) {
    const terms = termLengths.map(
        size => ({term: rand(size), op: pickOne(...operations)}));

    const expr = getExpr(terms);

    if (eval(expr) > 0) {
      return terms;
    }
  }
  throw new Error('unable to generate terms with a positive solution');
}

function field({term, op = ''}) {
  return h('label', null, `${op} ${term?term.toLocaleString():''}`);
}

function createQuestion({terms, answer}) {
  const fields = terms.map(field);
  return h('div', null, ...fields, h('hr'), field({term: parseInt(answer)}));
}

function next() {
  const state = getState();
  setState({...state, answer: '', terms: generateTerms(state)})
}

function nextButton() {
  const correct = isCorrect(getState());
  return h('button', {onclick: next, class: cn({[classes.correct]: correct})},
           correct ? h('b', null, 'CORRECT!') : '',
           correct ? 'next' : 'skip', );
}

function onInput(key) {
  const state = getState();
  if (key === key_clear) {
    setState({...state, answer: ''});
  } else if (key === key_bs) {
    setState(
        {...state, answer: state.answer.substring(0, state.answer.length - 1)});
  } else {
    setState({...state, answer: state.answer + key});
  }
}

export default function render(state) {
  const {terms} = state;
  if (terms) {
    return h('span', null, createQuestion(state), numpad({onInput}), h('br'),
             nextButton());
  } else {
    next();
    return null;
  }
}
