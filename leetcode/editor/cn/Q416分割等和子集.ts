//给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
//
//
//
// 示例 1：
//
//
//输入：nums = [1,5,11,5]
//输出：true
//解释：数组可以分割成 [1, 5, 5] 和 [11] 。
//
// 示例 2：
//
//
//输入：nums = [1,2,3,5]
//输出：false
//解释：数组不能分割成两个元素和相等的子集。
//
//
//
//
// 提示：
//
//
// 1 <= nums.length <= 200
// 1 <= nums[i] <= 100
//
//
// Related Topics 数组 动态规划 👍 1800 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function canPartition(nums: number[]): boolean {
  nums.sort();
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  if (nums[nums.length - 1] > target) return false;

  const dp = new Array(nums.length)
    .fill(1)
    .map(() => new Array(target + 1).fill(false));
  dp[0][nums[0]] = true;
  for (let i = 1; i < nums.length; i++) {
    dp[i][0] = true;
    for (let j = 1; j <= target; j++) {
      if (j === nums[i]) {
        dp[i][j] = true;
      }
      if (j > nums[i]) {
        // nums[i] 可以 不选择   或者  选择
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]];
      }
      if (j < nums[i]) {
        // nums[i] 不可以选择
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[nums.length - 1][target];
}

// console.log(Math.pow(2,200))

console.log(canPartition([1, 5, 11, 5]));
console.log(canPartition([1, 2, 3, 5]));
console.log(canPartition([1, 5, 11, 5, 3]));

//leetcode submit region end(Prohibit modification and deletion)
