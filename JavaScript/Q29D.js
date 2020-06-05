/*

29. 顺时针打印矩阵
输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

示例 1：
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]

示例 2：
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]

限制：
0 <= matrix.length <= 100
0 <= matrix[i].length <= 100

*/

/**
 * @param {number|null[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    if (matrix.length === 0) {
        return []
    }
    if (matrix[0].length === 0) {
        return []
    }
    let m = matrix.length;
    let n = matrix[0].length;
    let i = 0;
    let msg = [];
    while (i < Math.min(m / 2, n / 2)) {
        for (let j = 0; j < n; j++) {
            let g = matrix[i][j];
            if (g !== null) {
                msg.push(g)
                matrix[i][j] = null
            }
        }
        for (let j = 0; j < m; j++) {
            let g = matrix[j][n - i - 1];
            if (g !== null) {
                msg.push(g)
                matrix[j][n - i - 1] = null
            }
        }
        for (let j = 0; j < n; j++) {
            let g = matrix[m - i - 1][n - j - 1];
            if (g !== null) {
                msg.push(g)
                matrix[m - i - 1][n - j - 1] = null
            }
        }
        for (let j = 0; j < m; j++) {
            let g = matrix[m - j - 1][i];
            if (g !== null) {
                msg.push(g)
                matrix[m - j - 1][i] = null
            }
        }
        i++
    }
    return msg
};

let matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
let matrix2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
console.log(spiralOrder(matrix));
console.log(spiralOrder(matrix2));