import { Alea } from '../lib/alea.js';

let arng;
export const seedRandom = (seed) => {
  arng = new Alea(seed || Math.random());
};
seedRandom();

export const randRange = (min, max) => {
  return Math.floor(arng.next() * (max - min)) + min;
};

export const rand = (size) => {
  const min = Math.pow(10, size - 1);
  const max = Math.pow(10, size);
  return randRange(min, max);
};

export const pickOne = (...op) => {
  return op[Math.floor(arng.next() * op.length)];
};