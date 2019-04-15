
let count = 10000;
export function createSheet(styles) {
  let sheet = document.createElement('style');
  let classes = {};
  let rules = [];
  let cache = new Map();
  for (let ruleName in styles) {
    let className = ruleName + '_' + count.toString(16);
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
  return {classes};
}