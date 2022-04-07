
import * as React from 'react';
import { Component } from 'react';

import jss from 'jss';
import { registerComponent, unregisterComponent } from '../utils/urlstate';

const size = '30pt';
const { classes } = jss.createStyleSheet({
  container: {
    'font-size': size,
    'width': '14in'
  },
  label: {
    'display': 'block',
    'text-align': 'left',
    'border-top': '1px solid black',
    'border-bottom': '1px solid black',
    'margin': '10px',
    'height': size,
  },
  text: {
    'font-weight': 'normal',
    'margin-top': '-1.2rem',
    'position': 'absolute',
    'font-family': 'Arial'
  },
  centerline: {
    'height': '50%',
    'border-bottom': '1px dashed black',
  }
}).attach();

const line = (ch: string) =>
  <label className={classes.label} >
    <div className={classes.centerline} />
    <b className={classes.text}>{ch}</b>
  </label>;

const blankArray = Object.freeze(Array.from({ length: 26 }));
export const modes = {
  blank: blankArray.map((x, i) => ''),
  letters: blankArray.map((x, i) => String.fromCharCode(i + ('a'.charCodeAt(0)))),
  capitals: blankArray.map((x, i) => String.fromCharCode(i + ('A'.charCodeAt(0)))),
  numbers: blankArray.map((x, i) => `${i % 10}`)
}
type State = {
  mode: keyof typeof modes;
}

export class LinePaper extends Component<{}, State>{
  constructor(props) {
    super(props);
    this.state = {
      mode: "blank"
    }
  }
  componentDidMount() {
    registerComponent('line', this);
  }

  componentWillUnmount() {
    unregisterComponent('line');
  }
  render() {
    const { mode } = this.state;
    return < div className={classes.container} >{...modes[mode].map(line)}</div>
  }
}