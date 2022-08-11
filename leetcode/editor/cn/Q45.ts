// 跳跃游戏 II
//给你一个非负整数数组 nums ，你最初位于数组的第一个位置。
//
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
//
// 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
//
// 假设你总是可以到达数组的最后一个位置。
//
//
//
// 示例 1:
//
//
//输入: nums = [2,3,1,1,4]
//输出: 2
//解释: 跳到最后一个位置的最小跳跃数是 2。
//     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
//
//
// 示例 2:
//
//
//输入: nums = [2,3,0,1,4]
//输出: 2
//
//
//
//
// 提示:
//
//
// 1 <= nums.length <= 10⁴
// 0 <= nums[i] <= 1000
//
// Related Topics 贪心 数组 动态规划 👍 1744 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function jump(nums: number[]): number {
  /**
   * 10
   *  0 1 2 3 4 5  6 7 8  9 10
   * [2,3,1,1,4,12,0,1,2, 0, 0 ]
   * [2,4,3,4,8,17,6,8,10,9,10]
   *
   * [[1,2]]
   * [[2,3,4]]
   * [[3],[4,5,6],[]]
   *
   * max(k) = k + nums[k]
   *
   *
   */
  let maxis: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    maxis.push(i + nums[i]);
  }
  let left = nums.length - 1;
  let k = 0;
  while (left > 0) {
    for (let i = 0; i < left; i++) {
      if (maxis[i] >= left) {
        left = i;
        k++;
        break;
      }
    }
  }

  return k;
}
// console.log(jump([2, 3, 1, 1, 4]));
//leetcode submit region end(Prohibit modification and deletion)
