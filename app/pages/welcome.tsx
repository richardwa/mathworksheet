import * as React from 'react';
import { Component } from 'react';

import { modes } from './line-paper';
import jss from 'jss';

const { classes } = jss.createStyleSheet({
  container: {
    'font-size': '18pt',
    'margin': '10px',
  },
  a: {
    'text-decoration': 'none',
  }
}).attach();

export class Welcome extends Component<{}, {}>{
  render() {
    return (
      <div className={classes.container}>
        <h1>Math World</h1>

        <h2>Print outs</h2>
        <ul>
          <li>
            <a className={classes.a}
              href='#{"main":{"page":"Worksheet"},"ws":{"operations":["+","-"],"termLengths":[2,2,2,1],"seed":1}}'>
              add/subtract
            </a>
          </li>
          <li>
            <a className={classes.a}
              href='#{"main":{"page":"Worksheet"},"ws":{"operations":["*"],"termLengths":[2,1],"seed":1}}'>
              times
            </a>
          </li>
          {Object.keys(modes).map(mode => (<li>
            <a className={classes.a}
              href={`#{"main":{"page":"Line Paper"},"line":{"mode":"${mode}"}}`}>
              line paper - {mode}
            </a>
          </li>))}
        </ul>

        <h2>Online App</h2>
        <ul>
          <li>
            <a className={classes.a}
              href='#{"main":{"page":"App"},"app":{"operation":["+"],"len1":4,"len2":4,"input":"","seed":1}}'>
              addition
            </a>
          </li>
          <li>
            <a className={classes.a}
              href='#{"main":{"page":"App"},"app":{"operation":["+","-"],"len1":4,"len2":4,"input":"","seed":1}}'>
              add/subtract
            </a>
          </li>
          <li>
            <a className={classes.a}
              href='#{"main":{"page":"App"},"app":{"operation":["*"],"len1":2,"len2":1,"input":"","seed":1}}'>
              times
            </a>
          </li>
        </ul>

      </div>);
  }
}

