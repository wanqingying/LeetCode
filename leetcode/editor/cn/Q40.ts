// 组合总和 II
//给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
//
// candidates 中的每个数字在每个组合中只能使用 一次 。
//
// 注意：解集不能包含重复的组合。
//
//
//
// 示例 1:
//
//
//输入: candidates = [10,1,2,7,6,1,5], target = 8,
//输出:
//[
//[1,1,6],
//[1,2,5],
//[1,7],
//[2,6]
//]
//
// 示例 2:
//
//
//输入: candidates = [2,5,2,1,2], target = 5,
//输出:
//[
//[1,2,2],
//[5]
//]
//
//
//
// 提示:
//
//
// 1 <= candidates.length <= 100
// 1 <= candidates[i] <= 50
// 1 <= target <= 30
//
// Related Topics 数组 回溯 👍 1065 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function combinationSum2(candidates: number[], target: number): number[][] {
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
    // sum(i, s - ci, [...q, ci]);
    // 选择i后, 选择下一个
    sum(i + 1, s - ci, [...q, ci]);
    // 不选择i, 选下一个
    let j = i + 1;
    while (candidates[j] === candidates[i]) {
      j++;
    }
    sum(j, s, [...q]);
  }

  for (let i = 0; i < candidates.length; i++) {
    sum(i, target, []);
  }

  return result.map((k) => k.split(",").map(Number));
}

function test() {
  const json = [
    {
      p1: [10, 1, 2, 7, 6, 1, 5],
      p2: 8,
      result: [
        [1, 1, 6],
        [1, 2, 5],
        [1, 7],
        [2, 6],
      ],
    },
    {
      p1: [1, 1, 1, 1, 1, 1, 1],
      p2: 3,
      result: [[1, 1, 1]],
    },
  ];

  json.forEach((j, idx) => {
    const res = combinationSum2(j.p1, j.p2);
    if (String(res) !== String(j.result)) {
      console.log(
        `idx:${idx}，期望结果:${JSON.stringify(
          j.result
        )}，测试结果:${JSON.stringify(res)}`
      );
    } else {
      console.log(`pass ${idx}`);
    }
  });
}
test();
//leetcode submit region end(Prohibit modification and deletion)
