// 搜索二维矩阵
//编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
//
//
// 每行中的整数从左到右按升序排列。
// 每行的第一个整数大于前一行的最后一个整数。
//
//
//
//
// 示例 1：
//
//
//输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
//输出：true
//
//
// 示例 2：
//
//
//输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
//输出：false
//
//
//
//
// 提示：
//
//
// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 100
// -10⁴ <= matrix[i][j], target <= 10⁴
//
// Related Topics 数组 二分查找 矩阵 👍 700 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function twoSearch(arr: any[], compare: (t: any) => number) {
  let left = 0;
  let right = arr.length - 1;
  while (right - left > 5) {
    const mid = Math.floor((right - left) / 2) + left;
    console.log("x", left, right);
    const r = compare(arr[mid]);
    if (r > 0) {
      right = mid;
      continue;
    }
    if (r === 0) {
      return mid;
    }
    left = mid;
  }
  for (let i = left; i <= right; i++) {
    const r = compare(arr[i]);
    if (r === 0) {
      return i;
    }
    if (r > 0) {
      return i - 1;
    }
  }
  return right;
}
function searchMatrix(matrix: number[][], target: number): boolean {
  const ly = matrix.length;
  const lx = matrix[0].length;
  const yi = twoSearch(
    new Array(ly).fill(1).map((k, idx) => idx),
    (t) => {
      return matrix[t][0] - target;
    }
  );

  if (yi === -1) {
    return false;
  }
  const xi = twoSearch(matrix[yi], (t) => t - target);
  return matrix[yi][xi] === target;
}

// function test() {
//   const json = [
//     {
//       p1: [
//         [1, 3, 5, 7, 8, 9],
//         [10, 11, 16, 20, 21, 25],
//         [29, 30, 34, 60, 66, 77],
//       ],
//       p2: 5,
//       result: true,
//     },
//     {
//       p1: [
//         [1, 3, 5, 7, 8, 9],
//         [10, 11, 16, 20, 21, 25],
//         [29, 30, 34, 60, 66, 77],
//       ],
//       p2: 1,
//       result: true,
//     },
//     {
//       p1: [
//         [1, 3, 5, 7, 8, 9],
//         [10, 11, 16, 20, 21, 25],
//         [29, 30, 34, 60, 66, 77],
//       ],
//       p2: 0,
//       result: false,
//     },
//     {
//       p1: [
//         [1, 3, 5, 7, 8, 9],
//         [10, 11, 16, 20, 21, 25],
//         [29, 30, 34, 60, 66, 77],
//       ],
//       p2: 4,
//       result: false,
//     },
//     {
//       p1: [
//         [1, 3, 5, 7, 8, 9],
//         [10, 11, 16, 20, 21, 25],
//         [29, 30, 34, 60, 66, 77],
//       ],
//       p2: 77,
//       result: true,
//     },
//     {
//       p1: [
//         [1, 3, 5, 7, 8, 9],
//         [10, 11, 16, 20, 21, 25],
//         [29, 30, 34, 60, 66, 77],
//       ],
//       p2: 88,
//       result: false,
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     const res = searchMatrix(j.p1, j.p2);
//     if (String(res) !== String(j.result)) {
//       console.log(`参数:${JSON.stringify(j.p1)}`);
//       console.log(
//         `idx:${idx}，期望结果:${JSON.stringify(
//           j.result
//         )}，测试结果:${JSON.stringify(res)}`
//       );
//     } else {
//       console.log(`pass ${idx}`);
//     }
//   });
// }
// test();
// console.log(twoSearch([10, 11, 16, 20, 21, 25], (t) => t - 17));
//leetcode submit region end(Prohibit modification and deletion)
