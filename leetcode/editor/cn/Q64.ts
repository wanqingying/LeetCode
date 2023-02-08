// 最小路径和
//给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
//
// 说明：每次只能向下或者向右移动一步。
//
//
//
// 示例 1：
//
//
//输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
//输出：7
//解释：因为路径 1→3→1→1→1 的总和最小。
//
//
// 示例 2：
//
//
//输入：grid = [[1,2,3],[4,5,6]]
//输出：12
//
//
//
//
// 提示：
//
//
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 200
// 0 <= grid[i][j] <= 100
//
// Related Topics 数组 动态规划 矩阵 👍 1314 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function minPathSum(grid: number[][]): number {
  //输入：grid = [
  // [1,3,1],
  // [1,5,1],
  // [4,2,1]
  // ]
  // [1,4,5],
  // [1,5,6],
  // [4,2,1]
  //输出：7
  /**
   *
   * os[y,x]=Math.abs((obstacleGrid[y,x]-1))
   *
   * g(y,x)=Math.min(g{})
   *
   */
  let ym = grid.length;
  let xn = grid[0].length;
  let gs = new Array(ym).fill(1).map((t) => new Array(xn).fill(0));
  for (let y = 0; y < ym; y++) {
    for (let x = 0; x < xn; x++) {
      let gsi = grid[y][x];
      const g1 = x > 0 ? gs[y][x - 1] : Number.MAX_SAFE_INTEGER;
      const g2 = y > 0 ? gs[y - 1][x] : Number.MAX_SAFE_INTEGER;

      if (x + y > 0) {
        gsi += Math.min(g1, g2);
      }
      gs[y][x] = gsi;
    }
  }
  return gs[ym - 1][xn - 1];
}
//leetcode submit region end(Prohibit modification and deletion)
