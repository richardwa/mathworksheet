import {Alea} from '../lib/alea.js';

let arng = new Alea(Math.random());
export const seedRandom = (seed) => {
  arng = new Alea(seed);
};

export const rand = (size) => {
  const min = Math.pow(10, size - 1);
  const max = Math.pow(10, size);
  return Math.floor(arng.next() * (max - min)) + min;
};

export const pickOne = (...op) => {
  return op[Math.floor(arng.next() * op.length)];
};