export function getRandomInts(seed, ...termLengths) {}

export const rand = (size) => {
  const min = Math.pow(10, size - 1);
  const max = Math.pow(10, size);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const pickOne = (...op) => {
  return op[Math.floor(Math.random() * op.length)];
};