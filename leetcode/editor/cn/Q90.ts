// 子集 II
//给你一个整数数组 nums ，其中可能包含重复请你返元素，回该数组所有可能的子集（幂集）。
//
// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
//
//
//
//
//
//
//
// 示例 1：
//
//
//输入：nums = [1,2,2]
//输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
//
//
// 示例 2：
//
//
//输入：nums = [0]
//输出：[[],[0]]
//
//
//
//
// 提示：
//
//
// 1 <= nums.length <= 10
// -10 <= nums[i] <= 10
//
//
// Related Topics 位运算 数组 回溯 👍 943 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function subsetsWithDup(nums: number[]): number[][] {
  const result: number[][] = [[]];
  nums=nums.sort()
  function add(sets: number[]) {
    const exists = result
      .map((r) => r.join(""))
      .some((p) => p === sets.join(""));
    if (!exists) {
      result.push(sets);
    }
  }
  function sets(ids: number[]) {
    add(ids.map((k) => nums[k]));
    const s = ids[ids.length - 1] || 0;
    for (let i = s; i < nums.length; i++) {
      if (!ids.includes(i)) {
        sets([...ids, i]);
      }
    }
  }
  sets([]);
  return result;
}
// console.log(subsetsWithDup([1,2,2,1]));
//leetcode submit region end(Prohibit modification and deletion)
