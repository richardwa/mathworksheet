import { h, FunctionalComponent } from 'preact';
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
  }
}).attach();

const { classes: print } = jss.createStyleSheet({
  noPrint: { 'display': 'none !important' }
}, { media: 'print' }).attach();


type LinkProps = {
  onclick: () => void;
  current: boolean;
}

export const Link: FunctionalComponent<LinkProps> = ({ onclick, current, children }) => {
  const classes = [css.button];
  if (current) {
    classes.push(css.current);
  }
  return <button class={classes.join(' ')} onClick={onclick}>{children}</button>
};

const getURL = () => {
  alert(decodeURI(location.href));
}

export const Navbar: FunctionalComponent<{}> = ({ children }) =>
  <div class={[css.navbar, print.noPrint].join(' ')}>
    {children}
    <button class={css.button} style="float:right" onClick={getURL}>Get URL</button>
  </div>
