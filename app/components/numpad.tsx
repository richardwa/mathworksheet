import * as React from 'react';
import { FC } from 'react';
import jss from 'jss';

export const key_bs = String.fromCharCode(8592);
export const key_clear = 'C';

const { classes } = jss.createStyleSheet({
  button: {
    'font-size': '40pt',
    'text-align': 'center',
    'margin': '1px',
  },
  container: {
    'display': 'inline-grid',
    'vertical-align': 'top',
    'grid-template-columns': 'repeat(3, 4ch)',
    'grid-template-rows': 'repeat(4, 4ch)',
  },
}).attach();

type Props = {
  onInput: (c: string) => void;
}

export const Numpad: FC<Props> = ({ onInput }) => {

  const Cell: FC<{ c: string }> = ({ c }) =>
    <button className={classes.button} onClick={() => onInput(c)}>
      {c}
    </button>;

  window.onkeydown = function ({ key }) {
    // console.log(arguments);
    if (key === 'Escape') {
      onInput(key_clear);
    } else if (key === 'Backspace') {
      onInput(key_bs);
    } else if (`${key}`.match(/[0-9]/)) {
      onInput(key);
    }
  };

  return <div className={classes.container}>
    <Cell c="7" /><Cell c="8" /><Cell c="9" />
    <Cell c="4" /><Cell c="5" /><Cell c="6" />
    <Cell c="1" /><Cell c="2" /><Cell c="3" />
    <Cell c="0" /><Cell c={key_bs} /><Cell c={key_clear} />
  </div>
}