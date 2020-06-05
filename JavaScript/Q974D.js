/*

974. 和可被 K 整除的子数组
给定一个整数数组 A，返回其中元素之和可被 K 整除的（连续、非空）子数组的数目。

示例：
输入：A = [4,5,0,-2,-3,1], K = 5
输出：7
解释：
有 7 个子数组满足其元素之和可被 K = 5 整除：
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]

提示：
1 <= A.length <= 30000
-10000 <= A[i] <= 10000
2 <= K <= 10000

 */

/**
 * 前缀求和问题
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var subarraysDivByK = function (A, K) {
    let count = 0;
    let sums = []
    A.forEach(n => {
        count += n;
        let d = count % K
        if (d < 0) {
            d = K + d
        }
        sums.push(d);
    })
    sums.unshift(0)
    let t = 0;
    const ast = new Map()
    sums.forEach(n => {
        let target = ast.get(n)
        if (target) {
            t += target
            ast.set(n, target + 1)
        } else {
            ast.set(n, 1)
        }
    })
    return t
};

let arr = [-1, -2, -1, 8, 9];
let arr2 = []
console.log(subarraysDivByK(arr, 4));