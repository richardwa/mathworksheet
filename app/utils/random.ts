import Alea from 'alea';

let arng = Alea(Math.random());
export const seedRandom = (seed: number) => {
  arng = Alea(seed);
};

export const randRange = (min: number, max: number) => {
  return Math.floor(arng() * (max - min)) + min;
};

export const rand = (size: number) => {
  const min = Math.pow(10, size - 1);
  const max = Math.pow(10, size);
  return randRange(min, max);
};

export const pickOne = (...op: any[]) => {
  return op[Math.floor(arng() * op.length)];
};