import {h} from '../lib/preact.js';
import {createSheet} from '../js/jss.js';

const size = '32pt';
const {classes} = createSheet({
  container: {
    'font-size': size,
    'width':'14in'
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
    'font-weight':'normal',
    'margin-top':'-1.5rem',
    'position':'absolute',
  },
  centerline: {
    'height': '50%',
    'border-bottom': '1px dashed black',
  }
});

function h_line(ch) {
  return h('label', {class: [classes.label]}, 
           h('div', {class: [classes.centerline]}),
           h('b', {class: classes.text}, ch));
}

function render({lines}) {
  return h('div', {class: [classes.container]}, ...lines.map(h_line));
}

export default render;