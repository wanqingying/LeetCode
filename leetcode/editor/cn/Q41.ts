// 缺失的第一个正数
//给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。 请你实现时间复杂度为
//O(n) 并且只使用常数级别额外空间的解决方案。
//
//
//
// 示例 1：
//
//
//输入：nums = [1,2,0]
//输出：3
//
//
// 示例 2：
//
//
//输入：nums = [3,4,-1,1]
//输出：2
//
//
// 示例 3：
//
//
//输入：nums = [7,8,9,11,12]
//输出：1
//
//
//
//
// 提示：
//
//
// 1 <= nums.length <= 5 * 10⁵
// -2³¹ <= nums[i] <= 2³¹ - 1
//
//
// Related Topics 数组 哈希表 👍 1732 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function firstMissingPositive(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    const ni = nums[i];
    if (ni <= 0) continue;
    if (ni > nums.length) continue;
    if (nums[ni] !== ni) {
      nums[i] = nums[ni];
      nums[ni] = ni;
      // 换过来的值需要重新检测
      i--;
    }
  }
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== i) return i;
  }
  return nums.length;
}
// const b = firstMissingPositive([0, 2, 1]);
// const b = firstMissingPositive([3, 4, -1, 1]);
// const b = firstMissingPositive([7, 8, 9, 11, 12]);
// const b = firstMissingPositive([1]);
// console.log(b);
//leetcode submit region end(Prohibit modification and deletion)
