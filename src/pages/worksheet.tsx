
import * as React from 'react';
import { Component } from 'react';

import { rand, pickOne, seedRandom } from '../utils/random';
import { registerComponent, unregisterComponent } from '../utils/urlstate';
import jss from 'jss';

const { classes } = jss.createStyleSheet({
  container: {
    'font-size': '20pt',
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
  center: {
    'text-align': 'center',
  },
  questionNumber: {
    'font-size': '12pt',
    'color': 'gray',
  }
}).attach();


const Field = ({ num }) => <label className={classes.field}>{num.toLocaleString()}</label>;

type QuestionProps = {
  num: number,
  operations: Array<'+' | '-'>,
  termLengths: number[]
}
const Question = ({ num, operations, termLengths }: QuestionProps) => {
  const op = pickOne(...operations);
  const terms = termLengths.map((size, i) => rand(size));
  const expr = [];
  const plainExpr = [];
  for (let i in terms) {
    plainExpr.push(terms[i])
    expr.push(<Field num={terms[i]} />);
    plainExpr.push(`${op}`);
    expr.push(`${op}`);
  }
  expr.pop();
  plainExpr.pop();
  const ans = eval(plainExpr.join(''));

  return (
    <span title={ans} className={[classes.block, 'question'].join(' ')}>
      <i className={classes.questionNumber}>{(num + 1).toString().padStart(2, '0')})</i>
      {expr}
      <b>=</b>
    </span>
  );
}


type State = {
  operations: Array<'+' | '-'>,
  termLengths: number[],
  seed: number
}



export class Worksheet extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      operations: ['+', '-'],
      termLengths: [2, 2, 2, 1],
      seed: 1
    }
  }
  componentDidMount() {
    registerComponent('ws', this);
  }

  componentWillUnmount() {
    unregisterComponent('ws');
  }

  next = () => {
    const { seed } = this.state;
    this.setState({ seed: seed + 1 });
  }

  prev = () => {
    const { seed } = this.state;
    this.setState({ seed: seed - 1 });
  }

  render() {
    const { operations, termLengths, seed } = this.state;
    seedRandom(seed);
    const questions = Array.from({ length: 20 },
      (x, i) => <Question num={i} operations={operations} termLengths={termLengths} />);

    return [
      <div className={classes.center}>
        <button onClick={this.prev}>&lt;</button>
        <span> {seed} </span>
        <button onClick={this.next}>&gt;</button>
      </div>,
      <div className={classes.container}>
        {questions}
      </div>
    ];

  }
}

// conveniet get answers function
// @ts-ignore
window.getAnswers = () => {
  document.querySelectorAll(".question").forEach((v, i) => {
    // @ts-ignore
    console.log(i + 1, v.attributes.title.value);
  })
}