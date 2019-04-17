import {h} from '../lib/preact.js';
import {createSheet} from '../js/jss.js';

export const key_bs = String.fromCharCode(8592);
export const key_clear = 'C';

const {classes} = createSheet({
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
});

function numpad({onInput}) {
  const cell = (content) =>
      h('button', {class: [classes.button], onclick: () => onInput(content)},
        content);


  window.onkeydown = function({key}) {
    // console.log(arguments);
    if (key === 'Escape') {
      onInput(key_clear);
    } else if (key === 'Backspace') {
      onInput(key_bs);
    } else if (`${key}`.match(/[0-9]/)) {
      onInput(key);
    }
  };

  return h('div', {class: [classes.container]},
           // 789
           cell(7), cell(8), cell(9),
           // 456
           cell(4), cell(5), cell(6),
           // 123
           cell(1), cell(2), cell(3),
           // 0bc
           cell(0), cell(key_bs), cell(key_clear), );
}

export default numpad;