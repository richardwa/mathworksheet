import { h, Component } from 'preact';
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
      <div class={classes.container}>
        <h1>Math World</h1>

        <h2>Print outs</h2>
        <ul>
          <li>Add/Subtract worksheet</li>
          <li>line paper - letters</li>
          <li>line paper - numbers</li>
        </ul>

        <h2>Online App</h2>
        <ul>
          <li>practice a single problem at a time</li>
        </ul>

        <h2>Shortcuts</h2>
        <ul>
          <li>
            <a class={classes.a}
              href='#{"main":{"page":"Worksheet"},"ws":{"operations":["+","-"],"termLengths":[2,2,2,1],"seed":1}}'>
              Add/Subtract worksheet
            </a>
          </li>
          <li>
            <a class={classes.a}
              href='#{"main":{"page":"Worksheet"},"ws":{"operations":["*"],"termLengths":[2,1],"seed":1}}'>
              times worksheet
            </a>
          </li>
        </ul>
      </div>);
  }
}

