import {synth} from '../utils/synth';
import {h} from 'preact';
import {randRange} from '../utils/random';


let counter = 0;
const play = (note, duration) => {
  const id = counter;
  counter++;
  synth.noteOn(id, note, 80);
  setTimeout(() => { synth.noteOff(id); }, duration);
};

const playInterval = (start, steps) => {
  play(start, 3000);
  setTimeout(() => { play(start + steps, 2000); }, 1000)
};

const onclick = () => {
  const interval = randRange(0, 12) + 1;
  const baseNote = randRange(40, 80 - interval) + 1;
  playInterval(baseNote, interval);
};

export default function render(props) {
  return h('div', null, h('button', {onclick}, 'Play'));
}