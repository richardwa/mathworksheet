import {h} from '../lib/preact.js';
import {createSheet} from '../js/jss.js';

const {classes} = createSheet({
  container: {
    'font-size': '18pt',
    'margin': '10px',
  },
  a: {
    'text-decoration': 'none',
  }
});

const h1 = (t) => h('h1', null, t);
const h2 = (t) => h('h2', null, t);
const ul = (...li) => h('ul', null, li);
const li = (t) => h('li', null, t);

const page = () => h('div', {class: [classes.container]}, [
  h1('Math World'),
  h2('Print outs'),
  ul(li('Add/Subtract worksheet'), 
     li('line paper - letters'),
     li('line paper - numbers'), 
  ),
  h2('Online App'),
  ul(
    li('Add/Subtract practice'),
    li(h('a',{href:"/mathworksheet/#{%22page%22:%22./pages/math-single.js%22,%22navButton%22:%22App%22,%22operations%22:[%22*%22],%22termLengths%22:[1,1],%22answer%22:%22%22,%22op%22:%22*%22,%22terms%22:[8,6]}"},
    'times practice'))
    )
]);

export default page;