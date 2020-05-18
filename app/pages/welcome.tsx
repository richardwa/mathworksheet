import { h } from 'preact';
import jss from 'jss';
import { Main } from '..';

const { classes } = jss.createStyleSheet({
  container: {
    'font-size': '18pt',
    'margin': '10px',
  },
  a: {
    'text-decoration': 'none',
  }
}).attach();

type Props = {
  main: Main
}

export const Welcome = ({ main }: Props) =>
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
      <li>Add/Subtract practice</li>
      <li><a class={classes.a} href='javascript:;' onClick={main.setWorksheet}>times practice</a></li>
    </ul>
  </div>;
