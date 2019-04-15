import {h} from '../lib/preact.js';
import {createSheet} from '../js/jss.js';

const {classes} = createSheet({
  container: {'font-size': '35pt'},
  label: {
    'display': 'block',
    'text-align': 'left',
    'border-top': '1px solid black',
    'border-bottom': '1px solid black',
    'margin': '10px',
    'line-height': '45pt',
  },
  centerline: {
    'width': '14.8in',
    'position': 'absolute',
    'border-top': '1px dashed black',
    'margin-top': '-22pt',
  }
});

function h_line(ch) {
  return h('label', {class: [classes.label]}, ch,
           h('div', {class: [classes.centerline]}));
}

function render({lines}) {
  return h('div', {class: [classes.container]}, ...lines.map(h_line));
}

export default render;