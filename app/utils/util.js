export const cn =
    (obj) => {
      const clsList = Object.keys(obj).filter(k => obj[k]).join(' ');
      return clsList;
    }

export const hashCode = (s) => {
  var hash = 0;
  if (s.length == 0) {
    return hash;
  }
  for (var i = 0; i < s.length; i++) {
    var char = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;  // Convert to 32bit integer
  }
  return hash;
}

export const toHex=(i) => (i+0x10000).toString(16).substr(-4).toUpperCase();