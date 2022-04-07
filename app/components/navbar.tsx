import * as React from 'react';
import { FC } from 'react';
import jss from 'jss';

const fontSize = '14pt';

const { classes: css } = jss.createStyleSheet({
  navbar: {
    'margin-bottom': '20px',
    'font-size': fontSize,
    'background-color': '#9bc3c8',
    'padding': '10px',
  },
  current: {
    'text-decoration': 'underline',
  },
  button: {
    'cursor': 'pointer',
    'font-size': fontSize,
    'margin': '2px',
  },
  buttonRight: {
    'cursor': 'pointer',
    'font-size': fontSize,
    'margin': '2px',
    'float': 'right'
  }
}).attach();

const { classes: print } = jss.createStyleSheet({
  noPrint: { 'display': 'none !important' }
}, { media: 'print' }).attach();


type LinkProps = {
  onclick: () => void;
  current: boolean;
}

export const Link: FC<LinkProps> = ({ onclick, current, children }) => {
  const classes = [css.button];
  if (current) {
    classes.push(css.current);
  }
  return <button className={classes.join(' ')} onClick={onclick}>{children}</button>
};

const getURL = () => {
  alert(decodeURI(location.href));
}

export const Navbar: FC<{}> = ({ children }) =>
  <div className={[css.navbar, print.noPrint].join(' ')}>
    {children}
    <button className={css.buttonRight} onClick={getURL}>Get URL</button>
  </div>
