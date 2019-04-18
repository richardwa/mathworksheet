import {h} from '../lib/preact.js';
import {createSheet} from '../js/jss.js';

import {getState, setState} from '../js/urlstate.js';
import {rand, pickOne} from '../js/random.js';
import numpad, { key_bs, key_clear }
from './numpad.js';
import {cn} from '../js/util.js';

const fontSize = '40pt';
const {classes} = createSheet({
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
      {'display': 'inline-block', 'width': '10ch', 'margin': '0 1ch 1ch 1ch'},
});

const truncate = (s, n) => s.substring(0, n);

function getExpr(terms = []) {
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
  return h('label', {class: [classes.label]},
           `${op} ${term !== undefined?term.toLocaleString():''}`);
}

function createQuestion({terms, answer}) {
  const fields = terms.map(field);
  return h('div', {class: [classes.questionBox]}, ...fields, h('hr'),
           field({term: answer ? parseInt(answer) : ''}));
}

function next(replace) {
  const state = getState();
  setState({...state, answer: '', terms: generateTerms(state)},
           replace === true);
}

function nextButton() {
  const correct = isCorrect(getState());
  const buttonProps = {
    onclick: next,
    class: cn({[classes.correct]: correct, [classes.button]: true})
  };
  return h('button', buttonProps, correct ? h('b', null, 'CORRECT!') : 'skip');
}

function onInput(key) {
  const state = getState();
  const solution = eval(getExpr(state.terms));
  // use setState(..., true) here so that browser history doesnt grow from key
  // strokes
  if (key === key_clear) {
    setState({...state, answer: ''}, true);
  } else if (key === key_bs) {
    setState(
        {...state, answer: state.answer.substring(0, state.answer.length - 1)},
        true);
  } else {
    let answer = `${state.answer}${key}`;
    answer = truncate(answer, `${solution}`.length + 1);
    answer = `${parseInt(answer)}`;
    setState({...state, answer}, true);
  }
}

export default function render(props) {
  const {terms} = props;
  console.log(props);
  if (terms) {
    return h('div', {class: [classes.container]},
             h('div', {class: [classes.leftBox]}, nextButton(),
               createQuestion(props)),
             numpad({onInput}));
  } else {
    next(true);
    return null;
  }
}
