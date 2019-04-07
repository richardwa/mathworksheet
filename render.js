window.funcMap = {};

const jx = (() => {
    const funcMapInverse = new Map();
    let counter = 0;
    return {
        render: (f, ...args) => {
            //reset references
            window.funcMap = {};
            funcMapInverse.clear();
            counter = 0;

            //render 
            const s = f(...args);
            if (Array.isArray(s)) {
                document.write(s.join(""));
            } else {
                document.write(s);
            }
        },
        ref: (f) => {
            if (!funcMapInverse.has(f)) {
                const name = '_' + counter;
                counter++;
                funcMapInverse.set(f, name);
                window.funcMap[name] = f;
            }
            return `window.funcMap['${funcMapInverse.get(f)}']()`;
        }
    }
})();