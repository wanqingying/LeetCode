// 寻找旋转排序数组中的最小值 II
//已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,4,4,5,6,7] 在变
//化后可能得到：
//
//
// 若旋转 4 次，则可以得到 [4,5,6,7,0,1,4]
// 若旋转 7 次，则可以得到 [0,1,4,4,5,6,7]
//
//
// 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2],
//..., a[n-2]] 。
//
// 给你一个可能存在 重复 元素值的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。
//
// 你必须尽可能减少整个过程的操作步骤。
//
//
//
// 示例 1：
//
//
//输入：nums = [1,3,5]
//输出：1
//
//
// 示例 2：
//
//
//输入：nums = [2,2,2,0,1]
//输出：0
//
//
//
//
// 提示：
//
//
// n == nums.length
// 1 <= n <= 5000
// -5000 <= nums[i] <= 5000
// nums 原来是一个升序排序的数组，并进行了 1 至 n 次旋转
//
//
//
//
// 进阶：这道题与 寻找旋转排序数组中的最小值 类似，但 nums 可能包含重复元素。允许重复会影响算法的时间复杂度吗？会如何影响，为什么？
//
// Related Topics 数组 二分查找 👍 573 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  function next(i: number) {
    let k = i + 1;
    while (nums[i] === nums[k]) k++;
    return k;
  }

  while (right - left > 1) {
    const mid = Math.floor((right + left) / 2);
    const nx = next(mid);
    if (
      nums[mid] > nums[nx] ||
      (nums[right] < nums[mid] && nums[right] <= nums[left])
    ) {
      left = nx;
    } else {
      right = mid;
    }
  }
  return Math.min(nums[left], nums[right]);
}
// console.log(findMin([2, 2, 2, 3, 4, 5, 6, 6, 6, 6, 7, 0, 1, 2, 2]) === 0);
// console.log(findMin([2, 3, 4, 5, 1]) === 1);
// console.log(findMin([5, 1, 2, 3, 4]) === 1);
// console.log(findMin([3, 4, 5, 1, 2]) === 1);
// console.log(findMin([11, 13, 15, 17]) === 11);
// console.log(findMin([17, 17, 18, 18,19]) === 17);
// console.log(findMin([19,17]) === 17);
//leetcode submit region end(Prohibit modification and deletion)
