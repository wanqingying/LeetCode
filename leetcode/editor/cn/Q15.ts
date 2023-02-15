// 三数之和
//给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j !=
//k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
//
// 你返回所有和为 0 且不重复的三元组。
//
// 注意：答案中不可以包含重复的三元组。
//
//
//
//
//
// 示例 1：
//
//
//输入：nums = [-1,0,1,2,-1,-4]
//输出：[[-1,-1,2],[-1,0,1]]
//解释：
//nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
//nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
//nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
//不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
//注意，输出的顺序和三元组的顺序并不重要。
//
//
// 示例 2：
//
//
//输入：nums = [0,1,1]
//输出：[]
//解释：唯一可能的三元组和不为 0 。
//
//
// 示例 3：
//
//
//输入：nums = [0,0,0]
//输出：[[0,0,0]]
//解释：唯一可能的三元组和为 0 。
//
//
//
//
// 提示：
//
//
// 3 <= nums.length <= 3000
// -10⁵ <= nums[i] <= 10⁵
//
//
// Related Topics 数组 双指针 排序 👍 5617 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function threeSum(nums: number[]): number[][] {
  nums = nums.sort((a, b) => a - b);
  const len = nums.length;
  const ret: number[][] = [];
  const ks: Map<string, boolean> = new Map();
  for (let i = 0; i < len; i++) {
    let j = i + 1;
    let k = len - 1;

    while (j < k) {
      const s = nums[i] + nums[j] + nums[k];
      if (s === 0) {
        const si = "" + nums[i] + nums[j] + nums[k];
        if (ks.get(si)) {
          j += 1;
          k -= 1;
          continue;
        }
        ret.push([nums[i], nums[j], nums[k]]);
        ks.set(si, true);
        j += 1;
        k -= 1;
        continue;
      }
      if (s > 0) {
        k -= 1;
        continue;
      }
      if (s < 0) {
        j += 1;
      }
    }
  }
  return ret;
}

//runtime:320 ms
//memory:51.4 MB

//leetcode submit region end(Prohibit modification and deletion)
