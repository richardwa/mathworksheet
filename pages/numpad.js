import * as jx from '../js/render.js';

function row(...cells) {
  return `<tr>${cells.join('')}</tr>`;
}

function numpad({onInput, size = 4}) {
  console.log('numpad');
  const style = `height:${size}ch; width:${size}ch; text-align:center`;
  function cell(content, ...attr) {
    return `<td ${(attr||[]).join(' ')} style='${style}' onclick=${jx.ref(() => onInput(content))}>${content}</td>`;
  }

  window.onkeypress = function({key}) {
    // console.log(arguments);
    if (key === 'Enter') {
      onInput('C');
    }
    if (key === 'Backspace') {
      onInput('🡠');
    } else if (`${key}`.match(/[0-9]/)) {
      onInput(key);
    }
  };

  return [
    `<table border=true>`,
    row(cell(7), cell(8), cell(9)),
    row(cell(4), cell(5), cell(6)),
    row(cell(1), cell(2), cell(3)),
    row(cell(0), cell('🡠'), cell('C')),
    '</table>'
  ].join('');
}

export default numpad;