// 组合
//给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
//
// 你可以按 任何顺序 返回答案。
//
//
//
// 示例 1：
//
//
//输入：n = 4, k = 2
//输出：
//[
//  [2,4],
//  [3,4],
//  [2,3],
//  [1,2],
//  [1,3],
//  [1,4],
//]
//
// 示例 2：
//
//
//输入：n = 1, k = 1
//输出：[[1]]
//
//
//
// 提示：
//
//
// 1 <= n <= 20
// 1 <= k <= n
//
// Related Topics 回溯 👍 1088 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function combine(n: number, k: number): number[][] {
  const result: number[][] = [];

  function cbn(ni: number, nx: number[]) {
    if (nx.length === k) {
      return result.push(nx);
    }
    for (let i = ni + 1; i <= n; i++) {
      cbn(i, [...nx, i]);
    }
  }
  cbn(0, []);

  return result;
}

// function test() {
//   const json = [
//     {
//       p1: 4,
//       p2: 2,
//       result: [
//         [1, 2],
//         [1, 3],
//         [1, 4],
//         [2, 3],
//         [2, 4],
//         [3, 4],
//       ],
//     },
//     {
//       p1: 4,
//       p2: 3,
//       result: [
//         [1, 2, 3],
//         [1, 2, 4],
//         [1, 3, 4],
//         [2, 3, 4],
//       ],
//     },
//     {
//       p1: 4,
//       p2: 1,
//       result: [[1], [2], [3], [4]],
//     },
//     {
//       p1: 1,
//       p2: 1,
//       result: [[1]],
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     const res = combine(j.p1, j.p2);
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
