export const cn = (o: { [k: string]: boolean }) =>
  Object.keys(o).filter(k => o[k]).join(' ');


export const hashCode = (s: string): number => {
  let hash = 0;
  if (s.length == 0) {
    return hash;
  }
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;  // Convert to 32bit integer
  }
  return hash;
}

export const toHex = (i: number): string =>
  (i + 0x10000).toString(16).substr(-4).toUpperCase();