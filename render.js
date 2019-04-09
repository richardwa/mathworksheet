const jx = (() => {
    const funcMap = new Map();
    const funcMapInverse = new Map();
    let counter = 0;
    let fRender = null;
    let fRenderArgs = null;
    const _jx = {
        render: (f, ...args) => {
            fRender = f;
            fRenderArgs = args;
            _jx.rerender();
        },
        rerender: () => {
            // reset references
            funcMap.clear();
            funcMapInverse.clear();
            counter = 0;

            // render
            const s = fRender(...fRenderArgs);
            document.body.innerHTML = s;
            console.log('rendered');

        },
        ref: (f) => {
            if (!funcMapInverse.has(f)) {
                const name = '_' + counter;
                counter++;
                funcMap.set(name, f);
                funcMapInverse.set(f, name);
            }
            return `"jx.exec('${funcMapInverse.get(f)}', this)"`;
        },
        exec: function (fname, elem) {
            setTimeout(_jx.rerender, 0);
            return funcMap.get(fname).call(this, elem);
        },
        // plugins/utils
        getURLState: () => {
            if (document.location.hash) {
                const [state] = [
                    document.location.hash.substring(1)
                ].map(decodeURIComponent)
                    .map(JSON.parse);
                return state;
            }
        },
        setURLState: (state) => {
            document.location = `${document.location.pathname}#${JSON.stringify(state)}`;
        },
        numLength: n => n.toString().length,
        random: Math.random,
        rand: (size) => {
            const min = Math.pow(10, size - 1);
            const max = Math.pow(10, size);
            return Math.floor(_jx.random() * (max - min)) + min;
        },
        pickOne: (...op) => {
            return op[Math.floor(_jx.random() * op.length)];
        },
        cn: (obj) => `"${Object.keys(obj).filter(k => obj[k]).join(' ')}"`,
    };
    return _jx;
})();