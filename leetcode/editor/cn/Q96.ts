// 不同的二叉搜索树
//给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
//
//
//
// 示例 1：
//
//
//输入：n = 3
//输出：5
//
//
// 示例 2：
//
//
//输入：n = 1
//输出：1
//
//
//
//
// 提示：
//
//
// 1 <= n <= 19
//
//
// Related Topics 树 二叉搜索树 数学 动态规划 二叉树 👍 1972 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
// [1] [1,2]  [1,2,3]      [1,2,3,4]
//  1  1+1=2  1*2+1+1*2=5  1*5+1*2+2*1+5*1=14
function numTrees(n: number): number {
  const mx: number[] = [1, 1];
  for (let i = 2; i <= n; i++) {
    let mi = 0;
    for (let j = 0; j < i; j++) {
      mi += mx[j] * mx[i - j - 1];
    }
    mx[i] = mi;
  }
  // console.log("mx", mx);
  return mx[mx.length - 1];
}
// function numTrees(n: number): number {
//   const m = new Map<number[], number>();
//   function build(nk: number[]): number {
//     if (nk.length <= 1) return 1;
//     if (nk.length === 2) return 2;
//     const ch = Array.from(m.keys()).find((k) => {
//       return k.every((v, idx) => v === nk[idx]) && k.length === nk.length;
//     });
//     if (ch) {
//       return m.get(ch);
//     }
//     let res = nk.reduce((res, n, idx) => {
//       return res + build(nk.slice(0, idx)) * build(nk.slice(idx + 1));
//     }, 0);
//     m.set(nk, res);
//     return res;
//   }
//   return build(new Array(n).fill(1).map((_, idx) => idx + 1));
// }
// console.log(numTrees(19));
//leetcode submit region end(Prohibit modification and deletion)
