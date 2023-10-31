//给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
//
// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子
//序列。
//
// 示例 1：
//
//
//输入：nums = [10,9,2,5,3,7,101,18]
//输出：4
//解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
//
//
// 示例 2：
//
//
//输入：nums = [0,1,0,3,2,3]
//输出：4
//
//
// 示例 3：
//
//
//输入：nums = [7,7,7,7,7,7,7]
//输出：1
//
//
//
//
// 提示：
//
//
// 1 <= nums.length <= 2500
// -10⁴ <= nums[i] <= 10⁴
//
//
//
//
// 进阶：
//
//
// 你能将算法的时间复杂度降低到 O(n log(n)) 吗?
//
//
// Related Topics 数组 二分查找 动态规划 👍 3247 👎 0

//leetcode submit region begin(Prohibit modification and deletion)

//输入：nums = [10,9,20,50,70,50,60,70,50,101,18,22]

// 动态规划 dp[i] 表示以nums[i]结尾的最长递增子序列的长度 且nums[i]必须被选取
function lengthOfLIS_dp(nums: number[]): number {
  let result = 1;
  const dp: number[] = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    let max = 1;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        max = Math.max(dp[j] + 1, max);
      }
    }
    dp[i] = max;
    result = Math.max(result, max);
  }
  return result;
}

// 贪心 + 二分查找
function lengthOfLIS(nums: number[]): number {
  const arr: number[] = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    if (num > arr[arr.length - 1]) {
      arr.push(num);
    } else {
      const idx = arr.findIndex((n) => n >= num);
      if (idx !== -1) {
        arr[idx] = num;
      }
    }
  }
  return arr.length;
}
// console.log(
//   lengthOfLIS([10, 7, 3, 3, 3, 3, 3, 5, 2, 7, 8, 4, 2, 3, 4, 5, 8, 9, 0, 34])
// ); //7
// console.log([2, 3, 4].findIndex((n) => n > 0));
//leetcode submit region end(Prohibit modification and deletion)
//输入：nums = [10,9,2,5,6,3,4,5,101,18,22]
//输出：4
//解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
