// @ts-check

let count = 10000;

/**
 * 
 * @template {Object<string, any>} C
 * @param {C} styles 
 * @param {Object<string, any>} [attrs] 
 * @returns {{classes: C}}
 */
export function createSheet(styles, attrs) {
  let sheet = document.createElement('style');
  if (attrs) {
    for (const key in attrs) {
      sheet.setAttribute(key, attrs[key]);
    }
  }

  /** @type Object<keyof C, string> */
  const classes = {};
  const rules = [];
  const cache = new Map();
  for (const ruleName in styles) {
    const className = `${ruleName}-${count.toString(16)}`;
    count++;
    const style = styles[ruleName];
    if (cache.has(style)) {
      classes[ruleName] = cache.get(style);
    } else {
      cache.set(style, className);
      classes[ruleName] = className;
      const rule = [];
      for (const j in style) {
        rule.push(`${j}:${style[j]};`);
      }
      rules.push(`.${className} {${rule.join('')}}`);
    }
  }
  sheet.innerHTML = rules.join('\n');
  document.head.appendChild(sheet);
  return { classes };
}