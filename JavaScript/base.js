function testAll(fn, params) {
    let start = Date.now();
    params.forEach(({param, result}, index) => {
        let res = fn(param);
        if (res === result) {
            // yes
        } else {
            console.log('input:', param, 'right:', result, ', got:', res);
        }
    })
    console.log('done ', Date.now() - start);
}

module.exports = {testAll}