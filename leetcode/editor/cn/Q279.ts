//给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
//
// 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
//
//
//
//
// 示例 1：
//
//
//输入：n = 12
//输出：3
//解释：12 = 4 + 4 + 4
//
// 示例 2：
//
//
//输入：n = 13
//输出：2
//解释：13 = 4 + 9
//
//
//
// 提示：
//
//
// 1 <= n <= 10⁴
//
//
// Related Topics 广度优先搜索 数学 动态规划 👍 1731 👎 0

// 1 4 9 16 25 36 49 64 81 100
// 12  4 4 4
// 13  4 9
// 14  9 4 1
// 15  9 4 1 1
// 16  16
// 17  16 1
// 18  16 1 1
// 35  25 9 1
// 24  16 4 4
// 32  25 4 1 1 1
// 32  16 16

// 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
// 1 2 3 1 2 3 4 2 1 2  3  3  2  3  4

//leetcode submit region begin(Prohibit modification and deletion)
//                     1  2  3  4  5  6  7  8 9 10 11 12 13 14 15
let ns: number[] = [0, 1, 2, 3, 1, 2, 3, 4, 2];
function numSquares(n: number): number {
  if (ns[n]) return ns[n];
  let ni = ns.length;
  while (ni <= n) {
    if (Math.sqrt(ni) % 1 === 0) {
      ns[ni] = 1;
      ni++;
      continue;
    }
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i <= Math.floor(ni / 2); i++) {
      min = Math.min(min, ns[i] + ns[ni - i]);
    }
    ns[ni] = min;
    ni++;
  }
  return ns[n];
}

// 4563 3
// console.log(numSquares(12));
// console.log(numSquares(10));
// console.log(numSquares(4563));
// console.log(numSquares(74));
// console.log(numSquares(10));
// console.log(Math.sqrt(5) % 1 === 0);
// console.log(9999 - 99 * 99);
//leetcode submit region end(Prohibit modification and deletion)
