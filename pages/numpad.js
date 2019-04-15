import {h} from '../lib/preact.js';
import {createSheet} from '../js/jss.js';

export const key_bs = String.fromCharCode(8592);
export const key_clear = 'C';
const {classes} = createSheet({
  button: {
    'height': '4ch',
    'width': '4ch',
    'text-align': 'center',
  },
});
function row(...cells) {
  return h('tr', null, ...cells);
}

function numpad({onInput}) {

  function cell(content) {
    return h('td',null, h('button',{class:[classes.button], onclick: ()=> onInput(content)},content));
  }

  window.onkeydown = function({key}) {
    // console.log(arguments);
    if (key === 'Escape') {
      onInput(key_clear);
    }
    if (key === 'Backspace') {
      onInput(key_bs);
    } else if (`${key}`.match(/[0-9]/)) {
      onInput(key);
    }
  };

  return h('table',null,
    row(cell(7), cell(8), cell(9)),
    row(cell(4), cell(5), cell(6)),
    row(cell(1), cell(2), cell(3)),
    row(cell(0), cell(key_bs), cell(key_clear)),
  );
}

export default numpad;