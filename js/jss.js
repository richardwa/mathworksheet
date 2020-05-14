// @ts-check

/**
 * @typedef {Object} Style 
 * 
 * 
 * 
 * @typedef {Object} Attrs
 */


let count = 10000;

/**
 * 
 * @param {Map<string,Style>} styles 
 * @param {Map<string,Attrs>} attrs 
 */
export function createSheet(styles, attrs) {
  let sheet = document.createElement('style');
  if (attrs) {
    for (const key in attrs) {
      sheet.setAttribute(key, attrs[key]);
    }
  }
  let classes = {};
  let rules = [];
  let cache = new Map();
  for (let ruleName in styles) {
    let className = `${ruleName}-${count.toString(16)}`;
    count++;
    let style = styles[ruleName];
    if (cache.has(style)) {
      classes[ruleName] = cache.get(style);
    } else {
      cache.set(style, className);
      classes[ruleName] = className;
      let rule = [];
      for (let j in style) {
        rule.push(`${j}:${style[j]};`);
      }
      rules.push(`.${className} {${rule.join('')}}`);
    }
  }
  sheet.innerHTML = rules.join('\n');
  document.head.appendChild(sheet);
  return { classes };
}