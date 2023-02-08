// 不同路径 II
//一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
//
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。
//
// 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
//
// 网格中的障碍物和空位置分别用 1 和 0 来表示。
//
//
//
// 示例 1：
//
//
//输入：obstacleGrid =
// [
// [0,0,0],
// [0,1,0],
// [0,0,0]
// ]
//输出：2
//解释：3x3 网格的正中间有一个障碍物。
//从左上角到右下角一共有 2 条不同的路径：
//1. 向右 -> 向右 -> 向下 -> 向下
//2. 向下 -> 向下 -> 向右 -> 向右
//
//
// 示例 2：
//
//
//输入：obstacleGrid = [[0,1],[0,0]]
//输出：1
//
//
//
//
// 提示：
//
//
// m == obstacleGrid.length
// n == obstacleGrid[i].length
// 1 <= m, n <= 100
// obstacleGrid[i][j] 为 0 或 1
//
// Related Topics 数组 动态规划 矩阵 👍 856 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  //输入：obstacleGrid =
  // [
  // [0,0,0],
  // [0,1,0],
  // [0,0,0]
  // ]
  //输出：2
  /**
   *
   * os[y,x]=Math.abs((obstacleGrid[y,x]-1))
   *
   * s(y,x)=s(y,x-1)*os[y,x-1] +s(y-1,x)*os[y-1,x]
   *
   */
  let ym = obstacleGrid.length;
  let xn = obstacleGrid[0].length;
  let grid = new Array(ym).fill(1).map((t) => new Array(xn).fill(0));
  grid[0][0] = 1;
  function os(y: number, x: number) {
    return Math.abs(obstacleGrid[y][x] - 1);
  }

  for (let y = 0; y < ym; y++) {
    for (let x = 0; x < xn; x++) {
      if (x === 0 && y === 0) {
        grid[y][x] = obstacleGrid[y][x] === 1 ? 0 : 1;
        continue;
      }
      if (obstacleGrid[y][x] === 1) {
        grid[y][x] = 0;
      } else {
        const g1 = x > 0 ? grid[y][x - 1] * os(y, x - 1) : 0;
        const g2 = y > 0 ? grid[y - 1][x] * os(y - 1, x) : 0;
        grid[y][x] = g1 + g2;
      }
    }
  }
  return grid[ym - 1][xn - 1];
}

// function test() {
//   const json = [
//     {
//       p1: [
//         [0, 0, 0],
//         [0, 1, 0],
//         [0, 0, 0],
//       ],
//       result: 2,
//     },
//     {
//       p1: [
//         [0, 0, 0],
//         [0, 1, 0],
//         [0, 0, 0],
//         [0, 0, 0],
//       ],
//       result: 4,
//     },
//     {
//       p1: [
//         [0, 0],
//         [0, 0],
//       ],
//       result: 2,
//     },
//     {
//       p1: [
//         [0, 1],
//         [1, 0],
//       ],
//       result: 0,
//     },
//     {
//       p1: [[1]],
//       result: 0,
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     const res = uniquePathsWithObstacles(j.p1);
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
//leetcode submit region end(Prohibit modification and deletion)
