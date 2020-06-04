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

let w = [0, 2, 3, 4, 5]
let v = [0, 3, 4, 5, 6]
let number = 4;
let capacity = 8;
let va = new Array(number + 1).fill(1).map(v => {
    return new Array(capacity + 1).fill(0)
})

function findMax() {
    // let i;
    // let j;
    for (let i = 1; i <= number; i++) {
        for (let j = 1; j <= capacity; j++) {
            debugger;
            if (j < w[i]) {
                va[i][j] = va[i - 1][j]
            } else {
                let should = va[i - 1][j] > va[i - 1][j - w[i]] + v[i]
                debugger;
                if (should) {
                    va[i][j] = va[i - 1][j]
                } else {
                    va[i][j] = va[i - 1][j - w[i]] + v[i]
                }
            }
            debugger;
        }
    }
}

findMax();
console.log(va);
debugger;