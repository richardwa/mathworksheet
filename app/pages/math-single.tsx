
import * as React from 'react';
import { Component } from 'react';

import jss from 'jss';

import { registerComponent, unregisterComponent, nextHistoryWillReplace } from '../utils/urlstate';
import { rand, pickOne, seedRandom } from '../utils/random';
import { Numpad, key_bs, key_clear } from '../components/numpad';

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

type OpReturn = {
  symbol: string,
  term1: number,
  term2: number,
  answer: number
};
const operations = {
  '+': (a: number, b: number): OpReturn => ({ symbol: '+', term1: a, term2: b, answer: a + b }),
  '-': (a: number, b: number): OpReturn => ({ symbol: '-', term1: a, term2: b, answer: a + b }),
  '*': (a: number, b: number): OpReturn => ({ symbol: '\u00D7', term1: a, term2: b, answer: a * b }),
  '/': (a: number, b: number): OpReturn => ({ symbol: '\u00F7', term1: a * b, term2: b, answer: b })
};

type State = {
  operation: Array<keyof typeof operations>,
  len1: number,
  len2: number,
  input: string,
  seed: number
}

export class MathApp extends Component<{}, State>{
  answerLength?: number;
  constructor(props) {
    super(props);
    this.state = {
      operation: ['+'],
      len1: 4,
      len2: 4,
      input: "",
      seed: 1
    }
  }

  componentDidMount() {
    registerComponent('app', this);
  }

  componentWillUnmount() {
    unregisterComponent('app');
  }

  next = () => {
    const { seed } = this.state;
    this.setState({ seed: seed + 1, input: "" });
  }

  prev = () => {
    const { seed } = this.state;
    this.setState({ seed: seed - 1, input: "" });
  }

  onInput = (key: string) => {
    const { input } = this.state;

    if (key === key_clear) {
      this.setState({ input: '' });
    } else if (key === key_bs) {
      this.setState({ input: input.substring(0, input.length - 1) });
    } else {
      this.setState({ input: `${input}${key}`.substring(0, this.answerLength || 10) });
    }
    nextHistoryWillReplace();
  }

  renderNextButton(correct: boolean) {
    const cls = [classes.button];
    if (correct) {
      cls.push(classes.correct);
    }
    return (
      <button onClick={this.next} className={cls.join(' ')}>
        <b>{correct ? 'CORRECT!' : 'skip'}</b>
      </button>
    );
  }


  renderQuestion(p: { symbol: string, term1: number, term2: number, input: string }) {
    return (
      <div className={classes.questionBox}>
        <label className={classes.label}> {p.term1.toLocaleString()} </label>
        <label className={classes.label}>{p.symbol} {p.term2.toLocaleString()}</label>
        <hr />
        <label className={classes.label}>{p.input ? parseInt(p.input).toLocaleString() : ""} </label>
      </div>
    );
  }

  render() {
    const { seed, operation, len1, len2, input } = this.state;
    seedRandom(seed);
    const op = pickOne(...operation);
    const expr = operations[op](rand(len1), rand(len2));
    this.answerLength = `${expr.answer}`.length;

    return (
      <div className={classes.container}>
        <div>
          <button onClick={this.prev}>&lt;</button>
          <span> {seed} </span>
          <button onClick={this.next}>&gt;</button>
        </div>
        <div className={classes.leftBox}>
          {this.renderNextButton(expr.answer === parseInt(input))}
          {this.renderQuestion({ symbol: expr.symbol, term1: expr.term1, term2: expr.term2, input })}
        </div>
        <Numpad onInput={this.onInput} />
      </div>
    );
  }
}
