import * as jx from '../js/render.js';
import {getState, setState} from '../js/urlstate.js';
import {rand, pickOne} from '../js/random.js';
import numpad from './numpad.js';


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
  return `<label>${op} ${term?term.toLocaleString():''}</label>`;
}

function createQuestion({terms, answer}) {
  const fields = terms.map(field).join('');
  return `<div style='width:10ch; padding:2ch'> ${fields} <hr /> ${field({term: parseInt(answer)})}</div>`;
}

function next() {
  const state = getState();
  setState({...state, answer: '', terms: generateTerms(state)})
}

function nextButton() {
  const correct = isCorrect(getState());
  const style = correct ? 'color:green' : '';
  const text = correct ? '<b>CORRECT!</b> next' : 'skip';
  return `<button style='margin:2ch; width:10ch; height:10ch; ${style}' onclick=${jx.ref(next)}>${text}</button>`;
}

function onInput(key) {
  const state = getState();
  if (key === 'C') {
    setState({...state, answer: defaultState.answer});
  } else if (key === '&larr;') {
    setState(
        {...state, answer: state.answer.substring(0, state.answer.length - 1)});
  } else {
    setState({...state, answer: state.answer + key});
  }
}

const defaultState = {
  operations: ['+', '-'],
  termLengths: [3, 2],
  answer: ''
};

export default function render() {
  const state =
      getState(() => ({...defaultState, terms: generateTerms(defaultState)}));

  return [
    '<span style="display:inline-flex">',
    createQuestion(state),
    numpad({onInput}),
    '<br/>',
    nextButton(),
    '</span>',
  ].join('');
}
