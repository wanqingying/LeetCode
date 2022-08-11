// 组合总和
//给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的
// 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
//
// candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
//
// 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
//
//
//
// 示例 1：
//
//
//输入：candidates = [2,3,6,7], target = 7
//输出：[[2,2,3],[7]]
//解释：
//2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
//7 也是一个候选， 7 = 7 。
//仅有这两种组合。
//
// 示例 2：
//
//
//输入: candidates = [2,3,5], target = 8
//输出: [[2,2,2,2],[2,3,3],[3,5]]
//
// 示例 3：
//
//
//输入: candidates = [2], target = 1
//输出: []
//
//
//
//
// 提示：
//
//
// 1 <= candidates.length <= 30
// 1 <= candidates[i] <= 200
// candidate 中的每个元素都 互不相同
// 1 <= target <= 500
//
// Related Topics 数组 回溯 👍 2088 👎 0

//leetcode submit region begin(Prohibit modification and deletion)

//输入: candidates = [2,3,5], target = 8
//输出: [[2,2,2,2],[2,3,3],[3,5]]
function combinationSum(candidates: number[], target: number): number[][] {
  const result: string[] = [];

  candidates = candidates.sort((a, b) => a - b);

  function sum(i: number, s: number, q: number[]) {
    if (i >= candidates.length) {
      return;
    }
    const ci = candidates[i];
    if (s < ci) {
      return false;
    }
    if (s === ci) {
      const k = [...q, ci].join(",");
      if (!result.includes(k)) {
        result.push(k);
      }
      return;
    }
    // 继续选择i
    sum(i, s - ci, [...q, ci]);
    // 选择i后, 选择下一个
    sum(i + 1, s - ci, [...q, ci]);
    // 不选择i, 选下一个
    sum(i + 1, s, [...q]);
  }

  for (let i = 0; i < candidates.length; i++) {
    sum(i, target, []);
  }

  return result.map((k) => k.split(",").map(Number));
}

// function test() {
//   const json = [
//     {
//       p1: [2, 3, 6, 7],
//       p2: 7,
//       result: [[2, 2, 3], [7]],
//     },
//     {
//       p1: [2, 3, 5],
//       p2: 8,
//       result: [
//         [2, 2, 2, 2],
//         [2, 3, 3],
//         [3, 5],
//       ],
//     },
//     {
//       p1: [1],
//       p2: 2,
//       result: [1, 1],
//     },
//     {
//       p1: [3],
//       p2: 2,
//       result: [],
//     },
//     {
//       p1: [1],
//       p2: 1,
//       result: [1],
//     },
//     {
//       p1: [3, 5, 8],
//       p2: 11,
//       result: [
//         [3, 3, 5],
//         [3, 8],
//       ],
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     const res = combinationSum(j.p1, j.p2);
//     if (String(res) !== String(j.result)) {
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
