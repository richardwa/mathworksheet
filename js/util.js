export const numLength = n => n.toString().length;

export const cn = (obj) => {
  const clsList = Object.keys(obj).filter(k => obj[k]).join(' ');
  return clsList;
}